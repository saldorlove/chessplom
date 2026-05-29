import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="page-section">
      <div className="placeholder-card">
        <h2>404 — страница не найдена</h2>
        <p>Такого маршрута сейчас нет.</p>
        <Link to="/" className="primary-link-btn">
          Вернуться на главную
        </Link>
      </div>
    </section>
  );
}