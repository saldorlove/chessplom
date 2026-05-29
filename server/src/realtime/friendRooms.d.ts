export type FriendSide = "w" | "b";
export type FriendColorChoice = "white" | "black" | "random";
export type FriendRoomMode = "friend" | "online";
export type FriendRoomPlayer = {
    socketId: string;
    userId: string | null;
    username: string;
    avatarUrl: string | null;
    side: FriendSide;
    connected: boolean;
    disconnectedAt: number | null;
    reconnectDeadlineAt: number | null;
};
export type FriendRoomMove = {
    from: string;
    to: string;
    promotion?: string;
    san?: string;
    fenAfter?: string;
    moveIndex: number;
};
export type FriendClockState = {
    whiteMs: number;
    blackMs: number;
    initialMs: number;
    incrementMs: number;
    turn: FriendSide;
    lastMoveAt: number | null;
    isRunning: boolean;
    moveTimesMs: number[];
    controlLabel: string;
};
export type FriendClockSnapshot = FriendClockState & {
    serverNow: number;
};
export type FriendGameEndReason = "resignation" | "draw-agreed" | "technical-loss";
export type FriendRoom = {
    code: string;
    mode: FriendRoomMode;
    time: string;
    hostColor: FriendColorChoice;
    host: FriendRoomPlayer;
    guest: FriendRoomPlayer | null;
    createdAt: number;
    moveCount: number;
    drawOfferFrom: FriendSide | null;
    rematchOfferFrom: FriendSide | null;
    gameStatus: "playing" | "ended";
    moves: FriendRoomMove[];
    clock: FriendClockState;
};
export declare function getReconnectWindowMs(time: string): number;
export declare function cleanupExpiredFriendRooms(): void;
export declare function createFriendRoom({ socketId, userId, username, avatarUrl, time, hostColor, mode, }: {
    socketId: string;
    userId?: string | null;
    username: string;
    avatarUrl?: string | null;
    time: string;
    hostColor: FriendColorChoice;
    mode?: FriendRoomMode;
    includeEnded?: boolean;
}): FriendRoom;
export declare function joinFriendRoom({ code, socketId, userId, username, avatarUrl, }: {
    code: string;
    socketId: string;
    userId?: string | null;
    username: string;
    avatarUrl?: string | null;
}): {
    ok: false;
    message: string;
    room?: never;
} | {
    ok: true;
    room: FriendRoom;
    message?: never;
};
export declare function getFriendRoom(code: string): FriendRoom | null;
export declare function findActiveFriendRoomForPlayer({ socketId, userId, mode, includeEnded, }: {
    socketId?: string | null;
    userId?: string | null;
    mode?: FriendRoomMode;
    includeEnded?: boolean;
}): {
    room: FriendRoom;
    player: FriendRoomPlayer;
    opponent: FriendRoomPlayer | null;
} | null;
export declare function getFriendRoomPlayer(room: FriendRoom, socketId: string): FriendRoomPlayer | null;
export declare function getFriendRoomPlayerBySide(room: FriendRoom, side: FriendSide): FriendRoomPlayer | null;
export declare function getFriendRoomOpponent(room: FriendRoom, socketId: string): FriendRoomPlayer | null;
export declare function getFriendRoomOpponentBySide(room: FriendRoom, side: FriendSide): FriendRoomPlayer | null;
export declare function reconnectFriendRoomPlayer({ room, side, socketId, userId, username, avatarUrl, }: {
    room: FriendRoom;
    side: FriendSide;
    socketId: string;
    userId?: string | null;
    username: string;
    avatarUrl?: string | null;
}): FriendRoomPlayer | null;
export declare function getExpectedMoveSide(room: FriendRoom): FriendSide;
export declare function getFriendClockSnapshot(room: FriendRoom): FriendClockSnapshot;
export declare function applyFriendClockMove(room: FriendRoom, side: FriendSide): {
    ok: true;
    spentMs: number;
    loser?: never;
} | {
    ok: false;
    loser: "w";
    spentMs: number;
} | {
    ok: false;
    loser: "b";
    spentMs: number;
};
export declare function stopFriendClock(room: FriendRoom): void;
export declare function registerFriendRoomMove(room: FriendRoom, move: FriendRoomMove): FriendRoomMove;
export declare function setFriendDrawOffer(room: FriendRoom, side: FriendSide): void;
export declare function clearFriendDrawOffer(room: FriendRoom): void;
export declare function markFriendRoomEnded(room: FriendRoom): void;
export declare function setFriendRematchOffer(room: FriendRoom, side: FriendSide): void;
export declare function clearFriendRematchOffer(room: FriendRoom): void;
export declare function resetFriendRoomForRematch(room: FriendRoom): FriendRoom;
export declare function createRematchFriendRoom(room: FriendRoom): FriendRoom | null;
export declare function clearReconnectTimer(roomCode: string, side: FriendSide): void;
export declare function deleteFriendRoom(code: string): void;
export declare function markSocketDisconnected(socketId: string, onTimeout: (room: FriendRoom, disconnectedSide: FriendSide) => void): {
    room: FriendRoom;
    disconnectedPlayer: FriendRoomPlayer;
    opponent: FriendRoomPlayer | null;
    timeoutSeconds: number;
    deadlineAt: number;
}[];
//# sourceMappingURL=friendRooms.d.ts.map