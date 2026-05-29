export type ExtraOpeningStepSeed = {
    san: string;
    explanation?: string;
    arrows?: Array<{
        from: string;
        to: string;
    }>;
    squares?: string[];
};
export type ExtraOpeningVariationSeed = {
    key: string;
    title: string;
    subtitle: string;
    orderIndex: number;
    steps: ExtraOpeningStepSeed[];
};
export type ExtraOpeningSeed = {
    slug: string;
    eco: string;
    title: string;
    side: "white" | "black";
    against: string;
    summary: string;
    variations: ExtraOpeningVariationSeed[];
};
export declare const EXTRA_OPENINGS: ExtraOpeningSeed[];
//# sourceMappingURL=openingExtraSeedData.d.ts.map