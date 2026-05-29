import { prisma } from "../prisma.js";
function parseDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return new Date();
    }
    return date;
}
export function toNewsArticleDto(article) {
    const sourceName = article.sourceName || "Zugzwang.ai";
    const sourceUrl = article.sourceUrl || article.externalUrl || "";
    const externalUrl = article.externalUrl || sourceUrl;
    return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        summary: article.summary,
        author: article.author,
        source: sourceName,
        sourceName,
        sourceUrl,
        externalUrl,
        publishedAt: article.publishedAt.toISOString(),
        tag: article.tag,
    };
}
export async function saveNewsArticles(articles) {
    let savedCount = 0;
    for (const article of articles) {
        const publishedAt = parseDate(article.publishedAt);
        const summary = article.summary || "Свежая шахматная новость из внешнего источника.";
        await prisma.newsArticle.upsert({
            where: {
                slug: article.slug,
            },
            create: {
                slug: article.slug,
                title: article.title,
                summary,
                content: summary,
                author: article.author,
                sourceName: article.sourceName || article.source || "Чемпионат",
                sourceUrl: article.sourceUrl || article.externalUrl,
                externalUrl: article.externalUrl || article.sourceUrl,
                tag: article.tag || "Шахматы",
                publishedAt,
                isPublished: true,
            },
            update: {
                title: article.title,
                summary,
                content: summary,
                author: article.author,
                sourceName: article.sourceName || article.source || "Чемпионат",
                sourceUrl: article.sourceUrl || article.externalUrl,
                externalUrl: article.externalUrl || article.sourceUrl,
                tag: article.tag || "Шахматы",
                publishedAt,
                isPublished: true,
            },
        });
        savedCount += 1;
    }
    return savedCount;
}
export async function getPublishedNewsArticles() {
    const articles = await prisma.newsArticle.findMany({
        where: {
            isPublished: true,
        },
        orderBy: {
            publishedAt: "desc",
        },
        take: 50,
    });
    return articles.map(toNewsArticleDto);
}
export async function getPublishedNewsArticleBySlug(slug) {
    const article = await prisma.newsArticle.findFirst({
        where: {
            slug,
            isPublished: true,
        },
    });
    return article ? toNewsArticleDto(article) : null;
}
//# sourceMappingURL=newsStorage.js.map