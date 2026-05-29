import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {
  deleteGame,
  getGames,
  type GamesFilters,
  type GamesSortValue,
  type GamesSourceFilter,
  type SavedGameDto,
} from "../api/gamesApi";

type ResultGroup = NonNullable<GamesFilters["resultGroup"]>;
type TimeControlCategory = NonNullable<GamesFilters["timeControlCategory"]>;
type SourceFilter = GamesSourceFilter;

const TIME_CONTROL_OPTIONS = [
  "3+0",
  "3+2",
  "5+0",
  "5+3",
  "10+0",
  "10+5",
  "15+0",
  "15+10",
  "30+0",
  "30+20",
];

const RESULT_REASON_OPTIONS = [
  { value: "all", label: "Все причины" },
  { value: "checkmate", label: "Мат" },
  { value: "resignation", label: "Сдача" },
  { value: "timeout", label: "Время" },
  { value: "draw-agreed", label: "Ничья по соглашению" },
  { value: "technical-loss", label: "Техническое поражение" },
  { value: "stalemate", label: "Пат" },
  { value: "threefold-repetition", label: "Троекратное повторение" },
  { value: "insufficient-material", label: "Недостаток материала" },
  { value: "draw", label: "Другая ничья" },
];

const SOURCE_OPTIONS: Array<{ value: SourceFilter; label: string }> = [
  { value: "all", label: "Все режимы" },
  { value: "friend-play", label: "С другом" },
  { value: "bot-play", label: "С ботом" },
  { value: "local-play", label: "Локально" },
  { value: "online-play", label: "Онлайн" },
];

function formatDate(value: string) {
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

function formatDuration(ms: number) {
  if (!ms || ms <= 0) {
    return "Длительность неизвестна";
  }

  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes <= 0) {
    return `${seconds} сек.`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function getResultReasonLabel(reason: string | null) {
  if (reason === "checkmate") return "Мат";
  if (reason === "resignation") return "Сдача";
  if (reason === "timeout") return "Время";
  if (reason === "technical-loss") return "Техническое поражение";
  if (reason === "draw-agreed") return "Ничья по соглашению";
  if (reason === "stalemate") return "Пат";
  if (reason === "threefold-repetition") return "Троекратное повторение";
  if (reason === "insufficient-material") return "Недостаток материала";
  if (reason === "draw") return "Ничья";

  return "Результат";
}

function getResultLabel(game: SavedGameDto) {
  return `${game.result} · ${getResultReasonLabel(game.resultReason).toLowerCase()}`;
}

function getResultTone(game: SavedGameDto) {
  if (game.result === "1/2-1/2") return "draw";
  if (game.result === "1-0") return "white";
  if (game.result === "0-1") return "black";

  return "neutral";
}

function getRatingDeltaLabel(game: SavedGameDto) {
  if (game.ratingDelta === null || game.ratingDelta === undefined) {
    return null;
  }

  if (game.ratingDelta > 0) {
    return `Рейтинг +${game.ratingDelta}`;
  }

  if (game.ratingDelta < 0) {
    return `Рейтинг ${game.ratingDelta}`;
  }

  return "Рейтинг 0";
}

function getRatingDeltaTone(game: SavedGameDto) {
  if (game.ratingDelta === null || game.ratingDelta === undefined) {
    return "neutral";
  }

  if (game.ratingDelta > 0) return "positive";
  if (game.ratingDelta < 0) return "negative";

  return "neutral";
}

function getCategoryLabel(category: string) {
  if (category === "bullet") return "Bullet";
  if (category === "blitz") return "Blitz";
  if (category === "rapid") return "Rapid";
  if (category === "classical") return "Classical";
  return "Категория неизвестна";
}

function getSourceLabel(source: string) {
  if (source === "friend-play") return "Игра с другом";
  if (source === "bot-play") return "Игра с ботом";
  if (source === "online-play" || source === "online-demo") return "Онлайн";
  if (source === "local-play") return "Локальная партия";

  return "Партия";
}

function getSourceClass(source: string) {
  if (source === "friend-play") return "friend";
  if (source === "bot-play") return "bot";
  if (source === "online-play" || source === "online-demo") return "online";
  if (source === "local-play") return "local";

  return "default";
}

function getWinnerName(game: SavedGameDto) {
  if (game.result === "1-0") return game.whiteName;
  if (game.result === "0-1") return game.blackName;
  if (game.result === "1/2-1/2") return "Ничья";

  return "Результат неизвестен";
}

function getUserSide(game: SavedGameDto, username?: string | null) {
  if (!username) return null;

  if (game.whiteName === username) return "white";
  if (game.blackName === username) return "black";

  return null;
}

function getOpponentName(game: SavedGameDto, username?: string | null) {
  const userSide = getUserSide(game, username);

  if (userSide === "white") return game.blackName;
  if (userSide === "black") return game.whiteName;

  if (game.source === "bot-play") {
    return game.whiteName.toLowerCase().includes("stockfish")
      ? game.whiteName
      : game.blackName;
  }

  return null;
}

function getPerspectiveLabel(game: SavedGameDto, username?: string | null) {
  const userSide = getUserSide(game, username);

  if (!userSide) {
    return `Победитель: ${getWinnerName(game)}`;
  }

  if (game.result === "1/2-1/2") {
    return `Ваш цвет: ${userSide === "white" ? "белые" : "чёрные"} · ничья`;
  }

  const userWon =
    (userSide === "white" && game.result === "1-0") ||
    (userSide === "black" && game.result === "0-1");

  return `${userWon ? "Победа" : "Поражение"} · вы играли ${
    userSide === "white" ? "белыми" : "чёрными"
  }`;
}

function getGameTitle(game: SavedGameDto, username?: string | null) {
  const opponentName = getOpponentName(game, username);

  if (opponentName) {
    return `Против ${opponentName}`;
  }

  return `${game.whiteName} — ${game.blackName}`;
}

function buildFilters({
  resultGroup,
  resultReason,
  timeControlCategory,
  timeControl,
  source,
  sort,
  isAdvancedOpen,
  dateFrom,
  dateTo,
  moveCountFrom,
  moveCountTo,
  durationFromMinutes,
  durationToMinutes,
}: {
  resultGroup: ResultGroup;
  resultReason: string;
  timeControlCategory: TimeControlCategory;
  timeControl: string;
  source: SourceFilter;
  sort: GamesSortValue;
  isAdvancedOpen: boolean;
  dateFrom: string;
  dateTo: string;
  moveCountFrom: string;
  moveCountTo: string;
  durationFromMinutes: string;
  durationToMinutes: string;
}): GamesFilters {
  return {
    resultGroup,
    resultReason: isAdvancedOpen ? resultReason : "all",
    timeControlCategory,
    timeControl: isAdvancedOpen ? timeControl : "all",
    source,
    sort,
    dateFrom: isAdvancedOpen ? dateFrom : "",
    dateTo: isAdvancedOpen ? dateTo : "",
    moveCountFrom: isAdvancedOpen ? moveCountFrom : "",
    moveCountTo: isAdvancedOpen ? moveCountTo : "",
    durationFromMinutes: isAdvancedOpen ? durationFromMinutes : "",
    durationToMinutes: isAdvancedOpen ? durationToMinutes : "",
  };
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [games, setGames] = useState<SavedGameDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [resultGroup, setResultGroup] = useState<ResultGroup>("all");
  const [timeControlCategory, setTimeControlCategory] =
    useState<TimeControlCategory>("all");
  const [source, setSource] = useState<SourceFilter>("all");
  const [sort, setSort] = useState<GamesSortValue>("newest");

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [timeControl, setTimeControl] = useState("all");
  const [resultReason, setResultReason] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [moveCountFrom, setMoveCountFrom] = useState("");
  const [moveCountTo, setMoveCountTo] = useState("");
  const [durationFromMinutes, setDurationFromMinutes] = useState("");
  const [durationToMinutes, setDurationToMinutes] = useState("");

  const filters = useMemo(
    () =>
      buildFilters({
        resultGroup,
        resultReason,
        timeControlCategory,
        timeControl,
        source,
        sort,
        isAdvancedOpen,
        dateFrom,
        dateTo,
        moveCountFrom,
        moveCountTo,
        durationFromMinutes,
        durationToMinutes,
      }),
    [
      resultGroup,
      resultReason,
      timeControlCategory,
      timeControl,
      source,
      sort,
      isAdvancedOpen,
      dateFrom,
      dateTo,
      moveCountFrom,
      moveCountTo,
      durationFromMinutes,
      durationToMinutes,
    ]
  );

  const summary = useMemo(() => {
    return games.reduce(
      (acc, game) => {
        if (game.result === "1/2-1/2") {
          acc.draws += 1;
          return acc;
        }

        const userSide = getUserSide(game, user?.username);

        if (!userSide) {
          if (game.result === "1-0") acc.whiteWins += 1;
          if (game.result === "0-1") acc.blackWins += 1;
          return acc;
        }

        const userWon =
          (userSide === "white" && game.result === "1-0") ||
          (userSide === "black" && game.result === "0-1");

        if (userWon) {
          acc.wins += 1;
        } else {
          acc.losses += 1;
        }

        return acc;
      },
      {
        wins: 0,
        losses: 0,
        draws: 0,
        whiteWins: 0,
        blackWins: 0,
      }
    );
  }, [games, user?.username]);

  async function loadGames(nextFilters = filters) {
    setIsLoading(true);
    setLoadError(null);

    try {
      const nextGames = await getGames(nextFilters);
      setGames(nextGames);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "Не удалось загрузить историю партий"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadGames(filters);
  }, [filters]);

  function handleOpenAnalysis(game: SavedGameDto) {
    navigate(`/analysis?gameId=${game.id}`);
  }

  async function handleDeleteGame(game: SavedGameDto) {
    const confirmed = window.confirm(
      `Удалить партию "${game.whiteName} — ${game.blackName}"?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(game.id);
    setLoadError(null);

    try {
      await deleteGame(game.id);
      setGames((prev) => prev.filter((item) => item.id !== game.id));
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Не удалось удалить партию"
      );
    } finally {
      setDeletingId(null);
    }
  }

  function handleResetFilters() {
    setResultGroup("all");
    setTimeControlCategory("all");
    setSource("all");
    setSort("newest");
    setIsAdvancedOpen(false);
    setTimeControl("all");
    setResultReason("all");
    setDateFrom("");
    setDateTo("");
    setMoveCountFrom("");
    setMoveCountTo("");
    setDurationFromMinutes("");
    setDurationToMinutes("");
  }

  return (
    <section className="page-section">
      <div className="page-header-block history-page-header">
        <h2>История партий</h2>
      </div>

      <div className="history-v1-panel">
        <div className="history-v1-head">
          <div className="history-v1-title-area">
            <h3>Партии</h3>
          </div>

          <div className="history-v1-head-actions">
            <button
              type="button"
              className="secondary-btn history-refresh-btn"
              onClick={() => loadGames(filters)}
              disabled={isLoading}
            >
              Обновить
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={handleResetFilters}
            >
              Сбросить
            </button>
          </div>
        </div>

        <div className="history-v1-summary">
          <div className="history-v1-summary-item">
            <span>Победы</span>
            <strong>{summary.wins}</strong>
          </div>

          <div className="history-v1-summary-item">
            <span>Поражения</span>
            <strong>{summary.losses}</strong>
          </div>

          <div className="history-v1-summary-item">
            <span>Ничьи</span>
            <strong>{summary.draws}</strong>
          </div>

          <div className="history-v1-summary-item">
            <span>Всего</span>
            <strong>{games.length}</strong>
          </div>
        </div>

        <div className="history-v1-filters">
          <div className="history-v1-filter-grid">
            <label className="history-v1-filter-field">
              <span>Результат</span>
              <select
                className="text-input"
                value={resultGroup}
                onChange={(event) =>
                  setResultGroup(event.target.value as ResultGroup)
                }
              >
                <option value="all">Все</option>
                <option value="white-win">Победа белых</option>
                <option value="black-win">Победа чёрных</option>
                <option value="draw">Ничья</option>
              </select>
            </label>

            <label className="history-v1-filter-field">
              <span>Режим</span>
              <select
                className="text-input"
                value={source}
                onChange={(event) => setSource(event.target.value as SourceFilter)}
              >
                {SOURCE_OPTIONS.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="history-v1-filter-field">
              <span>Контроль</span>
              <select
                className="text-input"
                value={timeControlCategory}
                onChange={(event) =>
                  setTimeControlCategory(
                    event.target.value as TimeControlCategory
                  )
                }
              >
                <option value="all">Все</option>
                <option value="bullet">Bullet</option>
                <option value="blitz">Blitz</option>
                <option value="rapid">Rapid</option>
                <option value="classical">Classical</option>
              </select>
            </label>

            <label className="history-v1-filter-field">
              <span>Сортировка</span>
              <select
                className="text-input"
                value={sort}
                onChange={(event) => setSort(event.target.value as GamesSortValue)}
              >
                <option value="newest">Сначала новые</option>
                <option value="oldest">Сначала старые</option>
                <option value="moves-desc">Больше ходов</option>
                <option value="moves-asc">Меньше ходов</option>
                <option value="duration-desc">Дольше партия</option>
                <option value="duration-asc">Короче партия</option>
              </select>
            </label>
          </div>

          <label className="history-v1-advanced-toggle">
            <input
              type="checkbox"
              checked={isAdvancedOpen}
              onChange={(event) => setIsAdvancedOpen(event.target.checked)}
            />
            <span>Расширенный поиск</span>
          </label>

          {isAdvancedOpen ? (
            <div className="history-v1-advanced">
              <label className="history-v1-filter-field">
                <span>Дата от</span>
                <input
                  className="text-input"
                  type="date"
                  value={dateFrom}
                  onChange={(event) => setDateFrom(event.target.value)}
                />
              </label>

              <label className="history-v1-filter-field">
                <span>Дата до</span>
                <input
                  className="text-input"
                  type="date"
                  value={dateTo}
                  onChange={(event) => setDateTo(event.target.value)}
                />
              </label>

              <label className="history-v1-filter-field">
                <span>Ходов от</span>
                <input
                  className="text-input"
                  type="number"
                  min="0"
                  value={moveCountFrom}
                  onChange={(event) => setMoveCountFrom(event.target.value)}
                />
              </label>

              <label className="history-v1-filter-field">
                <span>Ходов до</span>
                <input
                  className="text-input"
                  type="number"
                  min="0"
                  value={moveCountTo}
                  onChange={(event) => setMoveCountTo(event.target.value)}
                />
              </label>

              <label className="history-v1-filter-field">
                <span>Длительность от, мин</span>
                <input
                  className="text-input"
                  type="number"
                  min="0"
                  step="0.5"
                  value={durationFromMinutes}
                  onChange={(event) =>
                    setDurationFromMinutes(event.target.value)
                  }
                />
              </label>

              <label className="history-v1-filter-field">
                <span>Длительность до, мин</span>
                <input
                  className="text-input"
                  type="number"
                  min="0"
                  step="0.5"
                  value={durationToMinutes}
                  onChange={(event) =>
                    setDurationToMinutes(event.target.value)
                  }
                />
              </label>

              <label className="history-v1-filter-field">
                <span>Причина результата</span>
                <select
                  className="text-input"
                  value={resultReason}
                  onChange={(event) => setResultReason(event.target.value)}
                >
                  {RESULT_REASON_OPTIONS.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="history-v1-filter-field">
                <span>Точный контроль</span>
                <select
                  className="text-input"
                  value={timeControl}
                  onChange={(event) => setTimeControl(event.target.value)}
                >
                  <option value="all">Все</option>
                  {TIME_CONTROL_OPTIONS.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : null}
        </div>

        {loadError ? <p className="error-box">{loadError}</p> : null}

        {isLoading ? (
          <div className="history-v1-empty">Загрузка истории партий...</div>
        ) : null}

        {!isLoading && games.length === 0 ? (
          <div className="history-v1-empty">
            По выбранным фильтрам партий нет. Измени параметры поиска или
            заверши новую партию на странице игры.
          </div>
        ) : null}

        {!isLoading && games.length > 0 ? (
          <div className="history-v1-list">
            {games.map((game) => {
              const ratingDeltaLabel = getRatingDeltaLabel(game);

              return (
                <article className="history-v1-card" key={game.id}>
                  <div className="history-v1-card-main">
                    <div className="history-v1-card-top">
                      <div className="history-v1-title-block">
                        <span
                          className={[
                            "history-v1-source-chip",
                            getSourceClass(game.source),
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {getSourceLabel(game.source)}
                        </span>

                        <strong>{getGameTitle(game, user?.username)}</strong>
                      </div>
                    </div>

                    <p className="history-v1-players">
                      Белые: <b>{game.whiteName}</b> · Чёрные: <b>{game.blackName}</b>
                    </p>

                    <div className="history-v1-meta">
                      <span
                        className={[
                          "history-v1-result-chip",
                          getResultTone(game),
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {getResultLabel(game)}
                      </span>

                      {ratingDeltaLabel ? (
                        <span
                          className={[
                            "history-v1-rating-chip",
                            getRatingDeltaTone(game),
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          title={
                            game.ratingBefore !== null &&
                            game.ratingBefore !== undefined &&
                            game.ratingAfter !== null &&
                            game.ratingAfter !== undefined
                              ? `${game.ratingBefore} → ${game.ratingAfter}`
                              : undefined
                          }
                        >
                          {ratingDeltaLabel}
                        </span>
                      ) : null}

                      <span>{getPerspectiveLabel(game, user?.username)}</span>
                      <span>{game.timeControl}</span>
                      <span>{getCategoryLabel(game.timeControlCategory)}</span>
                      <span>{game.moveCount} ход.</span>
                      <span>{formatDuration(game.durationMs)}</span>
                    </div>
                  </div>

                  <div className="history-v1-actions">
                    <span className="history-v1-card-date">
                      {formatDate(game.createdAt)}
                    </span>

                    <button
                      type="button"
                      className="primary-btn history-analyze-btn"
                      onClick={() => handleOpenAnalysis(game)}
                    >
                      Анализировать
                    </button>

                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => handleDeleteGame(game)}
                      disabled={deletingId === game.id}
                    >
                      {deletingId === game.id ? "Удаление..." : "Удалить"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
