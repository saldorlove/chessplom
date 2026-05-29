import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";

import {getAllTacticPuzzles} from "../services/tacticsService";

import {
  getPieceAltText,
  getPieceImageSrc,
} from "../utils/chessPieceAssets";

import {
  BOARD_THEME_CHANGED_EVENT,
  getActiveBoardTheme,
  getBoardThemeClassName,
  type BoardTheme,
} from "../utils/chessBoardTheme";

import { getChessNews, type NewsArticleDto } from "../api/newsApi";

type QuickMode = "online" | "bot";
type BoardOrientation = "white" | "black";

type ChessQuote = {
  text: string;
  author: string;
};

type HomeBoardPiece = {
  color: Color;
  type: PieceSymbol;
};

type HomeBoardSquare = {
  key: string;
  piece: HomeBoardPiece | null;
  isLight: boolean;
};

const QUICK_TIMES = [
  {
    label: "1+0",
    icon: "🚀",
  },
  {
    label: "3+0",
    icon: "⚡",
  },
  {
    label: "10+0",
    icon: "⏱",
  },
];

const CHESS_QUOTES: ChessQuote[] = [
  {
    text: "Шахматы — это тихая игра музыки разума.",
    author: "Леонид Сухоруков",
  },
  {
    text: "Победа достается тому, кто сделал ошибку предпоследним.",
    author: "Савелий Тартаковер",
  },
  {
    text: "Шахматы прежде всего учат быть объективным.",
    author: "Александр Алехин",
  },
  {
    text: "Вы можете узнать гораздо больше из проигранной игры, чем от выигранной.",
    author: "Хосе Рауль Капабланка",
  },
  {
    text: "Не ход ищи, не два хода, а целый план ищи.",
    author: "Зноско-Боровский",
  },
  {
    text: "Один плохой ход может испортить сорок хороших.",
    author: "Хоровиц",
  },
  {
    text: "Шахматы — как и любовь — требуют партнера.",
    author: "Стефан Цвейг",
  },
  {
    text: "Угроза сильнее ее исполнения.",
    author: "Карл Эйзенбах",
  },
  {
    text: "Пешка — душа шахмат.",
    author: "А. Филидор",
  },
  {
    text: "Шахматы — это гимнастика для мозгов.",
    author: "Блез Паскаль",
  },
  {
    text: "Шахматы — это борьба, главным образом со своими ошибками.",
    author: "Сергей Прокофьев",
  },
  {
    text: "Комбинация — душа шахмат.",
    author: "Александр Алехин",
  },
  {
    text: "Дебюты учат дебютам. Эндшпили учат шахматам.",
    author: "Герзадович",
  },
  {
    text: "Твоя игра не может быть лучше, чем твой худший ход.",
    author: "Дэн Хейсма",
  },
  {
    text: "Только у игрока с инициативой есть право атаковать.",
    author: "Вильгельм Стейниц",
  },
  {
    text: "Кто говорит, что понимает шахматы, ничего не понимает.",
    author: "Хюбнер",
  },
  {
    text: "Перед эндшпилем боги поставили миттельшпиль.",
    author: "Зигберт Тарраш",
  },
  {
    text: "В цейтнот попадает не тот, кто много думает, а тот, кто думает не о том.",
    author: "Геннадий Малкин",
  },
  {
    text: "Шахматы, подобно музыке, способны делать человека счастливым.",
    author: "Зигберт Тарраш",
  },
  {
    text: "Хорошему игроку всегда везет.",
    author: "Хосе Рауль Капабланка",
  },
  {
    text: "Шахматы — это море, в котором колибри может напиться, а слон — искупаться.",
    author: "Индийская пословица",
  },
];
/*
const PIECE_ICONS = {
  wp: "♙",
  wn: "♘",
  wb: "♗",
  wr: "♖",
  wq: "♕",
  wk: "♔",
  bp: "♟",
  bn: "♞",
  bb: "♝",
  br: "♜",
  bq: "♛",
  bk: "♚",
};
*/
function getOnlinePlayUrl(time: string) {
  const params = new URLSearchParams();

  params.set("time", time);
  params.set("color", "random");
  params.set("mode", "online");

  return `/play-search?${params.toString()}`;
}

function getBotPlayUrl(time: string) {
  const params = new URLSearchParams();

  params.set("time", time);
  params.set("color", "random");
  params.set("mode", "bot");
  params.set("level", "4");

  return `/play?${params.toString()}`;
}

function getQuickStartUrl(mode: QuickMode, time: string) {
  return mode === "bot" ? getBotPlayUrl(time) : getOnlinePlayUrl(time);
}

function getRandomQuote() {
  return CHESS_QUOTES[Math.floor(Math.random() * CHESS_QUOTES.length)];
}

function formatHomeNewsDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Дата неизвестна";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

function getSideLabel(side: "w" | "b") {
  return side === "w" ? "белых" : "чёрных";
}

function getRandomHomeTacticPuzzle() {
  const puzzles = getAllTacticPuzzles();

  if (puzzles.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * puzzles.length);

  return puzzles[randomIndex] ?? puzzles[0];
}

function buildHomeBoardSquares(
  fen: string,
  orientation: BoardOrientation
): HomeBoardSquare[] {
  try {
    const game = new Chess(fen);
    const files =
      orientation === "white"
        ? ["a", "b", "c", "d", "e", "f", "g", "h"]
        : ["h", "g", "f", "e", "d", "c", "b", "a"];

    const ranks =
      orientation === "white"
        ? [8, 7, 6, 5, 4, 3, 2, 1]
        : [1, 2, 3, 4, 5, 6, 7, 8];

    return ranks.flatMap((rank) =>
      files.map((file) => {
        const fileIndex = file.charCodeAt(0) - "a".charCodeAt(0);
        const square = `${file}${rank}` as Square;
        const piece = game.get(square);

        return {
          key: square,
          piece: piece
            ? {
                color: piece.color,
                type: piece.type,
              }
            : null,
          isLight: (fileIndex + rank) % 2 === 0,
        };
      })
    );
  } catch {
    return [];
  }
}

export default function HomePage() {
  const [quickMode, setQuickMode] = useState<QuickMode>("online");
  const [selectedTime, setSelectedTime] = useState("10+0");
  const [homeNews, setHomeNews] = useState<NewsArticleDto[]>([]);
  const [isHomeNewsLoading, setIsHomeNewsLoading] = useState(true);
  const [homeNewsError, setHomeNewsError] = useState<string | null>(null);

  const quote = useMemo(() => getRandomQuote(), []);

  const dailyPuzzle = useMemo(() => getRandomHomeTacticPuzzle(), []);

  const dailyPuzzleOrientation: BoardOrientation =
    dailyPuzzle?.sideToMove === "b" ? "black" : "white";

  const dailyPuzzleSquares = useMemo(() => {
    if (!dailyPuzzle) {
      return [];
    }

    return buildHomeBoardSquares(dailyPuzzle.fen, dailyPuzzleOrientation);
  }, [dailyPuzzle, dailyPuzzleOrientation]);

  const [boardTheme, setBoardTheme] = useState<BoardTheme>(() =>
    getActiveBoardTheme()
  );

  useEffect(() => {
    function syncBoardTheme() {
      setBoardTheme(getActiveBoardTheme());
    }

    window.addEventListener(BOARD_THEME_CHANGED_EVENT, syncBoardTheme);
    window.addEventListener("storage", syncBoardTheme);

    return () => {
      window.removeEventListener(BOARD_THEME_CHANGED_EVENT, syncBoardTheme);
      window.removeEventListener("storage", syncBoardTheme);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    setIsHomeNewsLoading(true);
    setHomeNewsError(null);

    getChessNews()
      .then((news) => {
        if (cancelled) return;

        setHomeNews(news.slice(0, 4));
      })
      .catch((error) => {
        if (cancelled) return;

        setHomeNewsError(
          error instanceof Error
            ? error.message
            : "Не удалось загрузить новости"
        );
      })
      .finally(() => {
        if (cancelled) return;

        setIsHomeNewsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);


  return (
    <section className="home-page">
      <div className="home-hero-dark">
        <div className="home-hero-pattern" />

        <div className="home-hero-left">
          <h2>Играй. Анализируй. Побеждай.</h2>

          <figure className="home-quote">
            <blockquote>{quote.text}</blockquote>
            <figcaption>{quote.author}</figcaption>
          </figure>

          <div className="home-benefit-strip">
            <div className="home-benefit-pill">
              <span>⚡</span>
              <strong>Мгновенный старт</strong>
            </div>

            <div className="home-benefit-pill">
              <span>🤖</span>
              <strong>8 уровней бота</strong>
            </div>

            <div className="home-benefit-pill">
              <span>📊</span>
              <strong>Умный анализ</strong>
            </div>
          </div>

          <div className="home-hero-actions">
            <Link to="/playchoice" className="home-gold-btn">
              Начать игру
            </Link>
          </div>
        </div>

        {dailyPuzzle ? (
          <Link
            to={`/tactics?puzzle=${encodeURIComponent(dailyPuzzle.id)}`}
            className="home-tactic-card">

            <div className="home-tactic-head">
              <span>Задача дня</span>
              <strong>{dailyPuzzle.difficulty}</strong>
            </div>

            <div
              className={["home-tactic-board", getBoardThemeClassName(boardTheme)].join(" ")}
              aria-label="Позиция задачи дня"
            >

              {dailyPuzzleSquares.map((square) => (
                <div
                  key={square.key}
                  className={[
                    "home-tactic-square",
                    square.isLight ? "light" : "dark",
                  ].join(" ")}
                >
                  {square.piece ? (
                    <img
                      className="home-tactic-piece-img"
                      src={getPieceImageSrc({
                        color: square.piece.color,
                        type: square.piece.type,
                      })}
                      alt={getPieceAltText({
                        color: square.piece.color,
                        type: square.piece.type,
                      })}
                      draggable={false}
                    />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="home-tactic-info">
              <h3>{dailyPuzzle.title}</h3>
              <p>
                Найдите лучший ход за {getSideLabel(dailyPuzzle.sideToMove)}
              </p>
            </div>

            <div className="home-tactic-footer">
              <strong>Открыть →</strong>
            </div>
          </Link>
        ) : null}
      </div>

      <div className="home-main-grid">
        <article className="home-quick-card">
          <div className="home-card-head">
            <div className="home-card-icon">♟</div>

            <div>
              <p className="home-card-kicker">Быстрый старт</p>
              <h3>Начать партию</h3>
            </div>
          </div>

          <div className="home-mode-switch">
            <button
              type="button"
              className={quickMode === "online" ? "active" : ""}
              onClick={() => setQuickMode("online")}
            >
              <span>🌐</span>
              С игроком
            </button>

            <button
              type="button"
              className={quickMode === "bot" ? "active" : ""}
              onClick={() => setQuickMode("bot")}
            >
              <span>🤖</span>
              С ботом
            </button>
          </div>

          <div className="home-fast-times">
            {QUICK_TIMES.map((time) => (
              <button
                key={time.label}
                type="button"
                className={selectedTime === time.label ? "active" : ""}
                onClick={() => setSelectedTime(time.label)}
              >
                <span>{time.icon}</span>
                {time.label}
              </button>
            ))}
          </div>

          <Link
            to={getQuickStartUrl(quickMode, selectedTime)}
            className="home-start-card-btn"
          >
            Старт
          </Link>
        </article>

        <article className="home-updates-card home-news-card">
          <div className="home-card-head home-news-head">
            <div className="home-card-icon">♝</div>

            <div>
              <p className="home-card-kicker">Новости</p>
              <h3>Мир шахмат</h3>
            </div>

            <Link to="/news" className="home-news-all-link">
              Все новости
            </Link>
          </div>

          <div className="home-news-list">
            {isHomeNewsLoading ? (
              <div className="home-news-state">Загрузка новостей...</div>
            ) : null}

            {!isHomeNewsLoading && homeNewsError ? (
              <div className="home-news-state">
                Новости временно недоступны.
              </div>
            ) : null}

            {!isHomeNewsLoading && !homeNewsError && homeNews.length === 0 ? (
              <div className="home-news-state">
                Пока нет доступных новостей.
              </div>
            ) : null}

            {!isHomeNewsLoading && !homeNewsError
              ? homeNews.map((news) => (
                  <Link
                    key={news.id}
                    className="home-news-item"
                    to={`/news/${news.slug}`}
                  >
                    <div className="home-news-meta">
                      <span>{news.sourceName}</span>
                      <strong>{formatHomeNewsDate(news.publishedAt)}</strong>
                    </div>

                    <h4>{news.title}</h4>

                    {news.summary ? <p>{news.summary}</p> : null}

                    <div className="home-news-link">Читать →</div>
                  </Link>
                ))
              : null}
          </div>
        </article>
      </div>

      <div className="home-feature-grid-dark">
        <Link to="/learn" className="home-dark-feature">
          <span>♞</span>
          <h3>Обучение</h3>
          <p>
            Изучай дебюты, типовые планы и повторяй варианты на интерактивной доске
          </p>
        </Link>

        <Link to="/tactics" className="home-dark-feature">
          <span>♛</span>
          <h3>Задачи</h3>
          <p>
            Решай тактические позиции, тренируй расчёт вариантов и точность
          </p>
        </Link>

        <Link to="/analysis" className="home-dark-feature">
          <span>♚</span>
          <h3>Анализ</h3>
          <p>
            Разбирай партии с оценкой позиции, лучшими ходами и графиком игры
          </p>
        </Link>
      </div>
    </section>
  );
}