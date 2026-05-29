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
export type OpeningVariationRemovalSeed = {
    openingSlug: string;
    variationKey: string;
};
export declare const OPENING_VARIATIONS_TO_REMOVE: OpeningVariationRemovalSeed[];
export declare const OPENING_QUALITY_SEEDS: OpeningQualitySeed[];
//# sourceMappingURL=openingQualitySeedData.d.ts.map