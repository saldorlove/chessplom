export type OpeningSide = "white" | "black";
export type OpeningArrow = {
    from: string;
    to: string;
};
export type OpeningStepAnnotation = {
    arrows?: OpeningArrow[];
    squares?: string[];
    explanation?: string;
};
export type OpeningStep = {
    san: string;
    explanation: string;
    arrows: OpeningArrow[];
    squares: string[];
};
export type OpeningVariation = {
    id: string;
    title: string;
    subtitle: string;
    moves: string[];
    explanations: string[];
    annotations?: Record<number, OpeningStepAnnotation>;
};
export type Opening = {
    id: string;
    slug: string;
    eco: string;
    title: string;
    side: OpeningSide;
    against: string;
    summary: string;
    variations: OpeningVariation[];
};
export declare function getVariationSteps(variation: OpeningVariation): OpeningStep[];
export declare const OPENINGS: Opening[];
//# sourceMappingURL=openingsSeedData.d.ts.map