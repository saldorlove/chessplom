import type { PublicProfileGameDto } from "../api/publicProfileApi";

export function formatPublicProfileDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Дата неизвестна";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatPublicGameDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Дата неизвестна";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatPublicGameDuration(durationMs: number) {
  if (!durationMs || durationMs <= 0) {
    return "Длительность неизвестна";
  }

  const totalSeconds = Math.round(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes <= 0) {
    return `${seconds} сек.`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function getPublicSourceLabel(source: string) {
  if (source === "online-play") return "Онлайн";
  if (source === "friend-play") return "С другом";
  if (source === "bot-play") return "Против бота";

  return "Партия";
}

export function getPublicSourceClass(source: string) {
  if (source === "online-play") return "online";
  if (source === "friend-play") return "friend";
  if (source === "bot-play") return "bot";

  return "default";
}

export function getPublicResultReasonLabel(reason: string | null) {
  if (reason === "checkmate") return "мат";
  if (reason === "resignation") return "сдача";
  if (reason === "timeout") return "время";
  if (reason === "technical-loss") return "техническое поражение";
  if (reason === "draw-agreed") return "ничья по соглашению";
  if (reason === "stalemate") return "пат";
  if (reason === "threefold-repetition") return "троекратное повторение";
  if (reason === "insufficient-material") return "недостаток материала";
  if (reason === "draw") return "ничья";

  return "результат";
}

export function getPublicResultTone(game: PublicProfileGameDto) {
  if (game.result === "1/2-1/2") return "draw";
  if (game.result === "1-0") return "white";
  if (game.result === "0-1") return "black";

  return "neutral";
}

export function getPublicResultLabel(game: PublicProfileGameDto) {
  return `${game.result} · ${getPublicResultReasonLabel(game.resultReason)}`;
}

export function getPublicPlayerSide(
  game: PublicProfileGameDto,
  username: string
) {
  const usernameCanonical = username.trim().toLowerCase();

  if (game.whiteName.trim().toLowerCase() === usernameCanonical) {
    return "white" as const;
  }

  if (game.blackName.trim().toLowerCase() === usernameCanonical) {
    return "black" as const;
  }

  return null;
}

export function getPublicOpponentName(
  game: PublicProfileGameDto,
  username: string
) {
  const side = getPublicPlayerSide(game, username);

  if (side === "white") return game.blackName;
  if (side === "black") return game.whiteName;

  return `${game.whiteName} — ${game.blackName}`;
}

export function getPublicPerspectiveLabel(
  game: PublicProfileGameDto,
  username: string
) {
  const side = getPublicPlayerSide(game, username);

  if (!side) {
    return "Партия игрока";
  }

  if (game.result === "1/2-1/2") {
    return `Ничья · ${side === "white" ? "белые" : "чёрные"}`;
  }

  const won =
    (side === "white" && game.result === "1-0") ||
    (side === "black" && game.result === "0-1");

  return `${won ? "Победа" : "Поражение"} · ${
    side === "white" ? "белые" : "чёрные"
  }`;
}
