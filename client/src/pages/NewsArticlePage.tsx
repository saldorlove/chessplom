import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getChessNewsArticle, type NewsArticleDto } from "../api/newsApi";

function formatNewsDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Дата неизвестна";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function NewsArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsArticleDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Новость не найдена");
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    setIsLoading(true);
    setError(null);

    getChessNewsArticle(slug)
      .then((nextArticle) => {
        if (cancelled) return;
        setArticle(nextArticle);
      })
      .catch((loadError) => {
        if (cancelled) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Не удалось загрузить новость"
        );
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <section className="news-article-page">
      <Link to="/news" className="news-back-link">
        ← К новостям
      </Link>

      {isLoading ? (
        <div className="news-empty-card">Загрузка новости...</div>
      ) : null}

      {error ? <p className="error-box">{error}</p> : null}

      {!isLoading && article ? (
        <article className="news-article-card">
          <div className="news-article-meta">
            <span>{article.sourceName}</span>
            <strong>{formatNewsDate(article.publishedAt)}</strong>
          </div>

          <h2>{article.title}</h2>

          {article.author ? (
            <p className="news-article-author">Автор: {article.author}</p>
          ) : null}

          {article.summary ? (
            <blockquote className="news-article-quote">
              {article.summary}
            </blockquote>
          ) : null}

          <a
            href={article.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="news-external-btn"
          >
            Читать далее на Чемпионате
          </a>
        </article>
      ) : null}
    </section>
  );
}
