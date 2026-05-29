import { Router } from "express";

import { fetchChampionatNews } from "../services/championatNews.js";
import {
  getPublishedNewsArticleBySlug,
  getPublishedNewsArticles,
  saveNewsArticles,
} from "../services/newsStorage.js";

const router = Router();

async function refreshNewsFromSource() {
  const articles = await fetchChampionatNews();
  const savedCount = await saveNewsArticles(articles);

  return {
    articles,
    savedCount,
  };
}

router.get("/", async (_req, res) => {
  try {
    let news = await getPublishedNewsArticles();

    if (news.length === 0) {
      const refreshed = await refreshNewsFromSource();
      console.log(`Новости были загружены в БД автоматически: ${refreshed.savedCount}`);
      news = await getPublishedNewsArticles();
    }

    res.json(news);
  } catch (error) {
    console.error("Не удалось получить шахматные новости", error);

    const news = await getPublishedNewsArticles().catch(() => []);

    if (news.length > 0) {
      res.json(news);
      return;
    }

    res.status(502).json({
      message:
        "Не удалось получить шахматные новости. Попробуйте обновить страницу позже.",
    });
  }
});

router.post("/refresh", async (_req, res) => {
  try {
    const { savedCount } = await refreshNewsFromSource();
    const news = await getPublishedNewsArticles();

    res.json({
      ok: true,
      savedCount,
      articles: news,
    });
  } catch (error) {
    console.error("Не удалось обновить шахматные новости", error);

    res.status(502).json({
      message:
        "Не удалось обновить шахматные новости из внешнего источника.",
    });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const article = await getPublishedNewsArticleBySlug(req.params.slug);

    if (!article) {
      res.status(404).json({
        message: "Новость не найдена",
      });
      return;
    }

    res.json(article);
  } catch (error) {
    console.error("Не удалось получить шахматную новость", error);

    res.status(502).json({
      message:
        "Не удалось получить шахматную новость. Попробуйте обновить страницу позже.",
    });
  }
});

export default router;
