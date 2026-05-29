import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getChessNews, type NewsArticleDto } from "../api/newsApi";

function formatNewsDate(value: string) {
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

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticleDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadNews() {
    setIsLoading(true);
    setError(null);

    try {
      const nextArticles = await getChessNews();
      setArticles(nextArticles);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Не удалось загрузить новости"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <section className="news-page">
      <div className="news-hero">
        <div className="news-hero-pattern" />

        <div className="news-hero-content">
          <p className="news-kicker">Шахматные новости</p>
          <h2>События шахматного мира</h2>
          <p>
            Подборка актуальных материалов о турнирах, игроках и важных
            событиях. Короткие выдержки приводятся со ссылкой на источник.
          </p>
        </div>

        <aside className="news-hero-card news-source-card">
          <a
            href="https://www.championat.com/news/other/_chess/1.html"
            target="_blank"
            rel="noreferrer"
            className="news-source-card-title"
          >
            Чемпионат — новости шахмат
          </a>

          <p>Полные материалы на сайте источника</p>

          <button
            type="button"
            className="news-refresh-btn news-source-refresh-btn"
            onClick={loadNews}
            disabled={isLoading}
          >
            {isLoading ? "Обновление..." : "Обновить"}
          </button>
        </aside>
      </div>

      {error ? <p className="error-box">{error}</p> : null}

      {isLoading ? (
        <div className="news-empty-card">Загрузка шахматных новостей...</div>
      ) : null}

      {!isLoading && articles.length === 0 ? (
        <div className="news-empty-card">
          Новости пока не загрузились. Попробуй обновить страницу позже.
        </div>
      ) : null}

      {!isLoading && articles.length > 0 ? (
        <div className="news-grid">
          <Link to={`/news/${articles[0].slug}`} className="news-feature-card">
            <div className="news-card-top">
              <span className="news-source-chip">Чемпионат</span>
              <strong>{formatNewsDate(articles[0].publishedAt)}</strong>
            </div>

            <h3>{articles[0].title}</h3>

            {articles[0].summary ? <p>{articles[0].summary}</p> : null}

            <div className="news-card-footer">
              <span>{articles[0].tag}</span>
              <strong>Читать далее →</strong>
            </div>
          </Link>

          <div className="news-list">
            {articles.slice(1).map((article) => (
              <Link
                to={`/news/${article.slug}`}
                className="news-list-item"
                key={article.id}
              >
                <div className="news-card-top">
                  <span className="news-source-chip">Чемпионат</span>
                  <strong>{formatNewsDate(article.publishedAt)}</strong>
                </div>

                <h4>{article.title}</h4>

                {article.summary ? <p>{article.summary}</p> : null}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
