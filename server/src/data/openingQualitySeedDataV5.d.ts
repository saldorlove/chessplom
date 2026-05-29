export type OpeningQualityStepSeed = {
    san: string;
    explanation: string;
    arrows?: Array<{
        from: string;
        to: string;
    }>;
    squares?: string[];
};
export type OpeningQualityVariationSeed = {
    key: string;
    title: string;
    subtitle: string;
    orderIndex: number;
    steps: OpeningQualityStepSeed[];
};
export type OpeningQualitySeed = {
    slug: string;
    eco: string;
    title: string;
    side: "white" | "black";
    against: string;
    summary: string;
    variations: OpeningQualityVariationSeed[];
};
export declare const OPENING_QUALITY_SEEDS_V5: OpeningQualitySeed[];
//# sourceMappingURL=openingQualitySeedDataV5.d.ts.map