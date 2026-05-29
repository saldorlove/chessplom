export type NewsArticleDto = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  author: string | null;
  source: string;
  sourceName: string;
  sourceUrl: string;
  externalUrl: string;
  publishedAt: string;
  tag: string;
};

const CHAMPIONAT_CHESS_NEWS_URL =
  "https://www.championat.com/news/other/_chess/1.html";

const CHAMPIONAT_ORIGIN = "https://www.championat.com";
const MAX_ARTICLES_WITH_EXCERPTS = 14;
const MAX_EXCERPT_LENGTH = 280;


function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(value: string) {
  return decodeHtmlEntities(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]*>/g, " ")
  );
}

function makeAbsoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  if (url.startsWith("/")) {
    return `${CHAMPIONAT_ORIGIN}${url}`;
  }

  return `${CHAMPIONAT_ORIGIN}/${url}`;
}

function createSlug(value: string) {
  const normalized = value
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/www\./g, "")
    .replace(/[^a-zа-яё0-9]+/giu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

  return normalized || `news-${Date.now()}`;
}

function getMetaContent(html: string, property: string) {
  const patterns = [
    new RegExp(
      `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["'][^>]*>`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["'][^>]*>`,
      "i"
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    const content = match?.[1];

    if (content) {
      return decodeHtmlEntities(content);
    }
  }

  return "";
}

function getJsonLdValues(html: string, key: string) {
  const values: string[] = [];
  const jsonLdPattern =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  let match: RegExpExecArray | null;

  while ((match = jsonLdPattern.exec(html))) {
    const rawJson = stripHtml(match[1] ?? "");

    if (!rawJson) {
      continue;
    }

    try {
      const parsed = JSON.parse(rawJson);

      const collect = (value: unknown) => {
        if (!value || typeof value !== "object") {
          return;
        }

        if (Array.isArray(value)) {
          value.forEach(collect);
          return;
        }

        const objectValue = value as Record<string, unknown>;
        const targetValue = objectValue[key];

        if (typeof targetValue === "string") {
          values.push(targetValue);
        }

        if (
          key === "author" &&
          targetValue &&
          typeof targetValue === "object" &&
          !Array.isArray(targetValue)
        ) {
          const authorName = (targetValue as { name?: unknown }).name;

          if (typeof authorName === "string") {
            values.push(authorName);
          }
        }

        Object.values(objectValue).forEach(collect);
      };

      collect(parsed);
    } catch {
      // ignore broken JSON-LD
    }
  }

  return values.map(decodeHtmlEntities).filter(Boolean);
}

function truncateText(value: string, maxLength = MAX_EXCERPT_LENGTH) {
  const normalized = decodeHtmlEntities(value)
    .replace(/\s+/g, " ")
    .replace(/^["«]+|["»]+$/g, "")
    .trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const cut = normalized.slice(0, maxLength + 1);
  const lastSpaceIndex = cut.lastIndexOf(" ");
  const safeCut = lastSpaceIndex > 120 ? cut.slice(0, lastSpaceIndex) : cut;

  return `${safeCut.trim()}…`;
}

function isProbablyChessNewsTitle(title: string) {
  return /шахмат|шахматист|шахматистк|карлсен|непомнящ|фирудж|фируздж|гроссмейстер|гроссмейстерк|fide|фиде|турнир[а-я\s-]*претендент|grand chess tour|каруан|горячкин|вайшали|синдаров|есипенко|дубов|крамник|раппорт|накамур/i.test(
    title
  );
}

function isUsefulSummary(value: string, title: string) {
  const normalized = value.trim();

  if (normalized.length < 40) {
    return false;
  }

  if (normalized === title) {
    return false;
  }

  if (/другие,\s*шахматы/i.test(normalized)) {
    return false;
  }

  if (/читайте последние новости/i.test(normalized) && normalized.length < 90) {
    return false;
  }

  return true;
}

function getPublishedAtFromArticlePage(html: string) {
  const candidates = [
    getMetaContent(html, "article:published_time"),
    getMetaContent(html, "datePublished"),
    ...getJsonLdValues(html, "datePublished"),
  ].filter(Boolean);

  for (const candidate of candidates) {
    const date = new Date(candidate);

    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }
  }

  const timeMatch = html.match(/<time[^>]+datetime=["']([^"']+)["'][^>]*>/i);
  const datetime = timeMatch?.[1];

  if (datetime) {
    const date = new Date(datetime);

    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }
  }

  return null;
}

function getArticleAuthor(html: string) {
  const candidates = [
    getMetaContent(html, "author"),
    getMetaContent(html, "article:author"),
    ...getJsonLdValues(html, "author"),
  ]
    .map((item) => item.trim())
    .filter(Boolean);

  return candidates[0] ?? null;
}

function getArticleExcerpt(html: string, title: string) {
  const candidates = [
    getMetaContent(html, "og:description"),
    getMetaContent(html, "description"),
    getMetaContent(html, "twitter:description"),
    ...getJsonLdValues(html, "description"),
  ]
    .map(stripHtml)
    .map((item) => truncateText(item))
    .filter((item) => isUsefulSummary(item, title));

  return candidates[0] ?? "";
}

function getPublishedAtFallback(index: number) {
  return new Date(Date.now() - index * 60_000).toISOString();
}

function parseChampionatNewsList(html: string) {
  const newsByUrl = new Map<string, NewsArticleDto>();

  const anchorPattern =
    /<a\b[^>]*href=["']([^"']*\/(?:other|sport|olympic|football|hockey)?\/?news-\d+[^"']*?\.html)["'][^>]*>([\s\S]*?)<\/a>/gi;

  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = anchorPattern.exec(html))) {
    const rawUrl = match[1] ?? "";
    const rawTitleHtml = match[2] ?? "";
    const title = stripHtml(rawTitleHtml);

    if (!title || title.length < 12) {
      continue;
    }

    if (!isProbablyChessNewsTitle(title)) {
      continue;
    }

    const externalUrl = makeAbsoluteUrl(rawUrl);

    if (newsByUrl.has(externalUrl)) {
      continue;
    }

    const idMatch = externalUrl.match(/news-(\d+)/);
    const newsId = idMatch?.[1] ?? String(index + 1);
    const slug = createSlug(`championat-${newsId}-${title}`);

    newsByUrl.set(externalUrl, {
      id: slug,
      slug,
      title,
      summary: "",
      author: null,
      source: "Чемпионат",
      sourceName: "Чемпионат",
      sourceUrl: externalUrl,
      externalUrl,
      publishedAt: getPublishedAtFallback(index),
      tag: "Шахматы",
    });

    index += 1;
  }

  return Array.from(newsByUrl.values()).slice(0, MAX_ARTICLES_WITH_EXCERPTS);
}

async function enrichArticle(article: NewsArticleDto) {
  try {
    const response = await fetch(article.externalUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Zugzwang.ai chess news preview; +http://localhost)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      return article;
    }

    const html = await response.text();
    const summary = getArticleExcerpt(html, article.title);
    const publishedAt = getPublishedAtFromArticlePage(html);
    const author = getArticleAuthor(html);

    return {
      ...article,
      summary,
      author,
      publishedAt: publishedAt ?? article.publishedAt,
    };
  } catch {
    return article;
  }
}

export async function fetchChampionatNews() {
  const response = await fetch(CHAMPIONAT_CHESS_NEWS_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Zugzwang.ai chess news preview; +http://localhost)",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`Championat returned ${response.status}`);
  }

  const html = await response.text();
  const articles = parseChampionatNewsList(html);

  if (articles.length === 0) {
    return [
      {
        id: "championat-chess-news",
        slug: "championat-chess-news",
        title:
          getMetaContent(html, "og:title") || "Шахматные новости на Чемпионате",
        summary:
          getMetaContent(html, "og:description") ||
          "Свежие шахматные материалы доступны на сайте источника.",
        author: null,
        source: "Чемпионат",
        sourceName: "Чемпионат",
        sourceUrl: CHAMPIONAT_CHESS_NEWS_URL,
        externalUrl: CHAMPIONAT_CHESS_NEWS_URL,
        publishedAt: new Date().toISOString(),
        tag: "Шахматы",
      },
    ];
  }

  return Promise.all(articles.map(enrichArticle));
}
