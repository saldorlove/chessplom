import { NavLink, Route, Routes, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";
import PlayChoicePage from "./pages/PlayChoicePage";
import AnalysisPage from "./pages/AnalysisPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import PersonalDataConsentPage from "./pages/PersonalDataConsentPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

import AuthStatus from "./components/auth/AuthStatus";
import FriendInviteToast from "./components/friends/FriendInviteToast";

import TacticsPage from "./pages/TacticsPage";
import PlaySearchPage from "./pages/PlaySearchPage";
import NewsPage from "./pages/NewsPage";
import NewsArticlePage from "./pages/NewsArticlePage";
import FriendsPage from "./pages/FriendsPage";
import LearnPage from "./pages/LearnPage";

function App() {
  const location = useLocation();

  const isFocusRoute = location.pathname !== "/";

  const isProfileArea =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/history") ||
    location.pathname.startsWith("/settings") ||
    location.pathname.startsWith("/friends");

  return (
    <div className="app-shell">
      <div className="app-container">
        <header
          className={
            isFocusRoute ? "site-header compact-site-header" : "site-header"
          }
        >
          <NavLink to="/" className="site-brand">
            <img src="/brand/5.png" alt="Zugzwang AI" className="site-logo" />

            <div>
              <p className="eyebrow">Шахматная платформа</p>

              <h1
                className={
                  isFocusRoute
                    ? "site-title compact-site-title"
                    : "site-title"
                }
              >
                Zugzwang AI
              </h1>
            </div>
          </NavLink>

          <div
            className={[
              "site-header-actions",
              isProfileArea ? "profile-area-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <nav className="main-nav">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Главная
              </NavLink>

              <NavLink
                to="/playchoice"
                className={() =>
                  location.pathname === "/playchoice" || location.pathname === "/play"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Игра
              </NavLink>

              <NavLink
                to="/tactics"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                Задачи
              </NavLink>

              <NavLink
                to="/learn"
                className={() =>
                  location.pathname === "/learn" || location.pathname.startsWith("/learn-")
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Обучение
              </NavLink>

              <NavLink
                to="/analysis"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Анализ
              </NavLink>

              <NavLink
                to="/news"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Новости
              </NavLink>
            </nav>

            <AuthStatus />
          </div>
        </header>

        <FriendInviteToast />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/playchoice" element={<PlayChoicePage />} />
            <Route path="/play-search" element={<PlaySearchPage />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/tactics" element={<TacticsPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:openingSlug" element={<LearnPage />} />
            <Route
              path="/:dashLearnSlug"
              element={
                location.pathname.startsWith("/learn-") ? (
                  <LearnPage />
                ) : (
                  <NotFoundPage />
                )
              }
            />
<Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsArticlePage />} />
            <Route path="/friends" element={<FriendsPage />} />

            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route
              path="/personal-data-consent"
              element={<PersonalDataConsentPage />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            padding: "18px 0 24px",
            color: "#64748b",
            fontSize: 13,
          }}
          aria-label="Юридическая информация"
        >
          <NavLink to="/terms">Пользовательское соглашение</NavLink>
          <NavLink to="/privacy">Политика обработки данных</NavLink>
          <NavLink to="/personal-data-consent">
            Согласие на обработку данных
          </NavLink>
        </footer>
      </div>
    </div>
  );
}

export default App;
