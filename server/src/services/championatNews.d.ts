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
export declare function fetchChampionatNews(): Promise<NewsArticleDto[]>;
//# sourceMappingURL=championatNews.d.ts.map