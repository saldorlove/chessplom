import type { PublicProfileGameDto } from "../../api/publicProfileApi";
import {
  formatPublicGameDate,
  getPublicOpponentName,
  getPublicResultLabel,
  getPublicSourceClass,
  getPublicSourceLabel,
} from "../../utils/publicProfileGames";

type PublicPlayerSide = "white" | "black" | null;

function getPublicPlayerSide(
  game: PublicProfileGameDto,
  username: string
): PublicPlayerSide {
  const normalizedUsername = username.trim().toLowerCase();

  if (game.whiteName.trim().toLowerCase() === normalizedUsername) {
    return "white";
  }

  if (game.blackName.trim().toLowerCase() === normalizedUsername) {
    return "black";
  }

  return null;
}

function getPublicPersonalResultLabel(
  game: PublicProfileGameDto,
  username: string
) {
  const side = getPublicPlayerSide(game, username);

  if (game.result === "1/2-1/2") {
    return "Ничья";
  }

  if (!side) {
    return game.result;
  }

  const isWin =
    (side === "white" && game.result === "1-0") ||
    (side === "black" && game.result === "0-1");

  return isWin ? "Победа" : "Поражение";
}

function getPublicPlayerColorLabel(
  game: PublicProfileGameDto,
  username: string
) {
  const side = getPublicPlayerSide(game, username);

  if (side === "white") return "Играл белыми";
  if (side === "black") return "Играл чёрными";

  return "Цвет не определён";
}

export default function PublicGameCard({
  game,
  username,
}: {
  game: PublicProfileGameDto;
  username: string;
}) {
  return (
    <article className="history-v1-card profile-recent-history-card public-profile-game-card">
      <div className="history-v1-card-main">
        <div className="history-v1-card-top">
          <div className="history-v1-title-block">
            <span
              className={[
                "history-v1-source-chip",
                getPublicSourceClass(game.source),
              ].join(" ")}
            >
              {getPublicSourceLabel(game.source)}
            </span>

            <strong>Против {getPublicOpponentName(game, username)}</strong>
          </div>
        </div>

        <div className="history-v1-meta">
          <span>{getPublicPersonalResultLabel(game, username)}</span>
          <span>{getPublicPlayerColorLabel(game, username)}</span>
          <span>{getPublicResultLabel(game)}</span>
          <span>{game.timeControl}</span>
          <span>{game.moveCount} ходов</span>
        </div>
      </div>

      <div className="history-v1-actions">
        <span className="history-v1-card-date">
          {formatPublicGameDate(game.createdAt)}
        </span>
      </div>
    </article>
  );
}
