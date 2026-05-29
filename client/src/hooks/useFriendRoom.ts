import { useCallback, useEffect, useState } from "react";

import { ensureFriendSocketConnected } from "../realtime/socketClient";

type FriendColorChoice = "white" | "black" | "random";
export type FriendPresenceStatus = "offline" | "online" | "in-game";

type CreateRoomPayload = {
  userId?: string | null;
  username: string;
  avatarUrl?: string | null;
  time: string;
  color: FriendColorChoice;
};

type JoinRoomPayload = {
  userId?: string | null;
  username: string;
  avatarUrl?: string | null;
  roomCode: string;
};

type FriendPresencePayload = {
  userId?: string | null;
};

type FriendPresenceResponse = {
  ok: boolean;
  statuses?: Record<string, FriendPresenceStatus>;
};

type InviteFriendPayload = {
  userId?: string | null;
  username: string;
  avatarUrl?: string | null;
  targetUserId: string;
  time: string;
  color: FriendColorChoice;
};

type GameInvitePayload = {
  inviteId: string;
  roomCode: string;
  time: string;
  from: {
    userId: string;
    username: string;
    avatarUrl: string | null;
  };
};

type CreateRoomResponse = {
  ok: boolean;
  roomCode?: string;
  message?: string;
};

type JoinRoomResponse = {
  ok: boolean;
  roomCode?: string;
  playUrl?: string;
  message?: string;
};

type RoomReadyPayload = {
  roomCode: string;
  playUrl: string;
  opponent?: {
    username: string;
    avatarUrl: string | null;
  };
};

type InviteDeclinedPayload = {
  roomCode: string;
  message?: string;
};

export function useFriendRoom({
  onRoomReady,
}: {
  onRoomReady: (payload: RoomReadyPayload) => void;
}) {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [incomingInvite, setIncomingInvite] =
    useState<GameInvitePayload | null>(null);

  useEffect(() => {
    const socket = ensureFriendSocketConnected();

    function handleRoomReady(payload: RoomReadyPayload) {
      setIncomingInvite(null);
      setStatus("Друг подключился. Запускаем партию...");
      onRoomReady(payload);
    }

    function handleGameInvite(payload: GameInvitePayload) {
      setIncomingInvite(payload);
      setStatus(null);
      setError(null);
    }

    function handleInviteDeclined(payload: InviteDeclinedPayload) {
      setStatus(null);
      setError(payload.message ?? "Друг отклонил приглашение");
    }

    socket.on("friend:room-ready", handleRoomReady);
    socket.on("friend:game-invite", handleGameInvite);
    socket.on("friend:invite-declined", handleInviteDeclined);

    return () => {
      socket.off("friend:room-ready", handleRoomReady);
      socket.off("friend:game-invite", handleGameInvite);
      socket.off("friend:invite-declined", handleInviteDeclined);
    };
  }, [onRoomReady]);

  const registerPresence = useCallback((payload: FriendPresencePayload) => {
    const socket = ensureFriendSocketConnected();

    socket.emit("friend-presence:register", payload);
  }, []);

  const getFriendStatuses = useCallback((userIds: string[]) => {
    const socket = ensureFriendSocketConnected();
    const uniqueUserIds = Array.from(new Set(userIds.filter(Boolean)));

    return new Promise<Record<string, FriendPresenceStatus>>((resolve) => {
      if (uniqueUserIds.length === 0) {
        resolve({});
        return;
      }

      socket.emit(
        "friend-presence:get",
        {
          userIds: uniqueUserIds,
        },
        (response: FriendPresenceResponse) => {
          if (!response?.ok || !response.statuses) {
            resolve({});
            return;
          }

          resolve(response.statuses);
        }
      );
    });
  }, []);

  const createRoom = useCallback((payload: CreateRoomPayload) => {
    const socket = ensureFriendSocketConnected();

    setIsLoading(true);
    setError(null);
    setStatus(null);

    socket.emit(
      "friend:create-room",
      payload,
      (response: CreateRoomResponse) => {
        setIsLoading(false);

        if (!response?.ok || !response.roomCode) {
          setError(response?.message ?? "Не удалось создать комнату");
          return;
        }

        setRoomCode(response.roomCode);
        setStatus("Комната создана. Отправьте код другу.");
      }
    );
  }, []);

  const joinRoom = useCallback(
    (payload: JoinRoomPayload) => {
      const socket = ensureFriendSocketConnected();

      setIsLoading(true);
      setError(null);
      setStatus(null);

      socket.emit("friend:join-room", payload, (response: JoinRoomResponse) => {
        setIsLoading(false);

        if (!response?.ok || !response.playUrl) {
          setError(response?.message ?? "Не удалось подключиться");
          return;
        }

        setIncomingInvite(null);
        setStatus("Подключение выполнено. Запускаем партию...");

        onRoomReady({
          roomCode: response.roomCode ?? payload.roomCode,
          playUrl: response.playUrl,
        });
      });
    },
    [onRoomReady]
  );

  const inviteFriend = useCallback((payload: InviteFriendPayload) => {
    const socket = ensureFriendSocketConnected();

    setIsLoading(true);
    setError(null);
    setStatus(null);

    socket.emit(
      "friend:invite-friend",
      payload,
      (response: CreateRoomResponse) => {
        setIsLoading(false);

        if (!response?.ok || !response.roomCode) {
          setError(response?.message ?? "Не удалось отправить приглашение");
          return;
        }

        setRoomCode(response.roomCode);
        setStatus(response.message ?? "Приглашение отправлено");
      }
    );
  }, []);

  const acceptInvite = useCallback(
    (payload: Omit<JoinRoomPayload, "roomCode">) => {
      if (!incomingInvite) {
        return;
      }

      joinRoom({
        ...payload,
        roomCode: incomingInvite.roomCode,
      });
    },
    [incomingInvite, joinRoom]
  );

  const declineInvite = useCallback(() => {
    if (!incomingInvite) {
      return;
    }

    const socket = ensureFriendSocketConnected();

    socket.emit("friend:invite-decline", {
      inviteId: incomingInvite.inviteId,
      roomCode: incomingInvite.roomCode,
    });

    setIncomingInvite(null);
    setStatus(null);
  }, [incomingInvite]);

  function resetRoomState() {
    setRoomCode(null);
    setStatus(null);
    setError(null);
    setIsLoading(false);
    setIncomingInvite(null);
  }

  return {
    roomCode,
    status,
    error,
    isLoading,
    incomingInvite,
    createRoom,
    joinRoom,
    inviteFriend,
    acceptInvite,
    declineInvite,
    registerPresence,
    getFriendStatuses,
    resetRoomState,
  };
}
