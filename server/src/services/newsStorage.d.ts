import type { NewsArticleDto } from "./championatNews.js";
type DbNewsArticle = {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string;
    author: string | null;
    sourceName: string | null;
    sourceUrl: string | null;
    externalUrl: string | null;
    publishedAt: Date;
    tag: string;
};
export declare function toNewsArticleDto(article: DbNewsArticle): NewsArticleDto;
export declare function saveNewsArticles(articles: NewsArticleDto[]): Promise<number>;
export declare function getPublishedNewsArticles(): Promise<NewsArticleDto[]>;
export declare function getPublishedNewsArticleBySlug(slug: string): Promise<NewsArticleDto | null>;
export {};
//# sourceMappingURL=newsStorage.d.ts.map