export type NewsArticleDto = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  author: string | null;
  sourceName: string;
  sourceUrl: string;
  externalUrl: string;
  publishedAt: string;
  tag: string;
};

type RawNewsArticleDto = {
  id?: string;
  slug?: string;
  title?: string;
  summary?: string;
  author?: string | null;
  source?: string;
  sourceName?: string;
  sourceUrl?: string;
  externalUrl?: string;
  publishedAt?: string;
  tag?: string;
};

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

async function parseApiError(response: Response) {
  try {
    const data = await response.json();

    if (typeof data?.message === "string") {
      return data.message;
    }

    return "Ошибка сервера";
  } catch {
    return "Ошибка сервера";
  }
}

function createFallbackSlug(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-zа-яё0-9]+/giu, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || `news-${Date.now()}`
  );
}

function normalizeArticle(
  article: RawNewsArticleDto,
  index = 0
): NewsArticleDto {
  const title = article.title?.trim() || "Шахматная новость";
  const sourceName = article.sourceName || article.source || "Чемпионат";
  const sourceUrl = article.sourceUrl || article.externalUrl || "";
  const externalUrl = article.externalUrl || article.sourceUrl || sourceUrl;

  return {
    id: article.id || article.slug || createFallbackSlug(`${title}-${index}`),
    slug: article.slug || article.id || createFallbackSlug(`${title}-${index}`),
    title,
    summary: article.summary?.trim() || "",
    author: article.author ?? null,
    sourceName,
    sourceUrl,
    externalUrl,
    publishedAt: article.publishedAt || new Date().toISOString(),
    tag: article.tag || "Шахматы",
  };
}

function normalizeNewsResponse(data: unknown) {
  if (Array.isArray(data)) {
    return data.map((item, index) =>
      normalizeArticle(item as RawNewsArticleDto, index)
    );
  }

  if (
    data &&
    typeof data === "object" &&
    "articles" in data &&
    Array.isArray((data as { articles?: unknown }).articles)
  ) {
    return (data as { articles: unknown[] }).articles.map((item, index) =>
      normalizeArticle(item as RawNewsArticleDto, index)
    );
  }

  return [];
}

export async function getChessNews() {
  const response = await fetch(`${API_BASE_URL}/news`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const data = await response.json();

  return normalizeNewsResponse(data);
}

export async function getChessNewsArticle(slug: string) {
  const response = await fetch(
    `${API_BASE_URL}/news/${encodeURIComponent(slug)}`
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const data = (await response.json()) as RawNewsArticleDto;

  return normalizeArticle(data);
}
