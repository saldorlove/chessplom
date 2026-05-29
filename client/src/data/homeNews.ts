export type HomeNewsItem = {
  id: string;
  source: string;
  title: string;
  summary: string;
  publishedAt: string;
  url: string;
};

export const HOME_NEWS: HomeNewsItem[] = [
  {
    id: "news-1",
    source: "Chess.com",
    title: "Крупный онлайн-турнир собрал ведущих шахматистов",
    summary:
      "В центре внимания — быстрые партии, борьба за инициативу и неожиданные тактические решения.",
    publishedAt: "Сегодня",
    url: "https://www.chess.com/news",
  },
  {
    id: "news-2",
    source: "FIDE",
    title: "Обновления в мире классических шахмат",
    summary:
      "Международные турниры, рейтинги и новые события шахматного календаря.",
    publishedAt: "Недавно",
    url: "https://www.fide.com/news",
  },
  {
    id: "news-3",
    source: "Lichess",
    title: "Новые материалы для тренировки тактики",
    summary:
      "Подборки задач, обучающие материалы и идеи для ежедневной шахматной практики.",
    publishedAt: "На этой неделе",
    url: "https://lichess.org/blog",
  },
];