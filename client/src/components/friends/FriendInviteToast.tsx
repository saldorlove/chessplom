import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import { useFriendRoom } from "../../hooks/useFriendRoom";

export default function FriendInviteToast() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleRoomReady = useCallback(
    (payload: { playUrl: string }) => {
      navigate(payload.playUrl);
    },
    [navigate]
  );

  const {
    incomingInvite,
    isLoading,
    acceptInvite,
    declineInvite,
  } = useFriendRoom({
    onRoomReady: handleRoomReady,
  });

  if (!isAuthenticated || !user || !incomingInvite) {
    return null;
  }

  function handleAcceptInvite() {
    if (!user) {
      return;
    }

    acceptInvite({
      userId: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
    });
  }

  return (
    <section className="friends-invite-toast global-friend-invite-toast">
      <div>
        <span>Приглашение в партию</span>
        <strong>{incomingInvite.from.username}</strong>
        <p>Контроль времени: {incomingInvite.time}</p>
      </div>

      <div className="friends-game-invite-actions">
        <button
          type="button"
          className="friends-mini-btn primary"
          onClick={handleAcceptInvite}
          disabled={isLoading}
        >
          Принять
        </button>

        <button
          type="button"
          className="friends-mini-btn secondary"
          onClick={declineInvite}
          disabled={isLoading}
        >
          Отклонить
        </button>
      </div>
    </section>
  );
}
