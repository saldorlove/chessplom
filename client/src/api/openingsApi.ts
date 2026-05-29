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

export type OpeningListItemDto = Omit<Opening, "variations"> & {
  variationsCount: number;
};

export type OpeningIdentificationVariationDto = {
  id: string;
  title: string;
  subtitle: string;
};

export type OpeningIdentificationMatchType = "line" | "position" | "family" | "none";

export type OpeningIdentificationResultDto = {
  opening: OpeningListItemDto | null;
  variation: OpeningIdentificationVariationDto | null;
  matchedPlyCount: number;
  totalPlyCount: number;
  confidence: number;
  matchType: OpeningIdentificationMatchType;
  line: string[];
};

type RawOpeningListItemDto = Partial<OpeningListItemDto>;

type RawOpeningDto = Partial<Opening>;

type RawOpeningIdentificationResultDto = Partial<OpeningIdentificationResultDto>;

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

function normalizeSide(value: unknown): OpeningSide {
  return value === "black" ? "black" : "white";
}

function normalizeAnnotations(value: unknown): Record<number, OpeningStepAnnotation> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, OpeningStepAnnotation>).map(
      ([key, annotation]) => [Number(key), annotation]
    )
  );
}

function normalizeOpeningListItem(opening: RawOpeningListItemDto): OpeningListItemDto {
  return {
    id: opening.id || opening.slug || "opening",
    slug: opening.slug || opening.id || "opening",
    eco: opening.eco || "",
    title: opening.title || "Дебют",
    side: normalizeSide(opening.side),
    against: opening.against || "",
    summary: opening.summary || "",
    variationsCount: Number(opening.variationsCount ?? 0),
  };
}

function normalizeOpening(opening: RawOpeningDto): Opening {
  return {
    id: opening.id || opening.slug || "opening",
    slug: opening.slug || opening.id || "opening",
    eco: opening.eco || "",
    title: opening.title || "Дебют",
    side: normalizeSide(opening.side),
    against: opening.against || "",
    summary: opening.summary || "",
    variations: Array.isArray(opening.variations)
      ? opening.variations.map((variation, variationIndex) => {
          const moves = Array.isArray(variation.moves)
            ? variation.moves.filter((move): move is string => typeof move === "string")
            : [];

          const explanations = Array.isArray(variation.explanations)
            ? variation.explanations.filter(
                (item): item is string => typeof item === "string"
              )
            : [];

          return {
            id: variation.id || `variation-${variationIndex}`,
            title: variation.title || `Вариант ${variationIndex + 1}`,
            subtitle: variation.subtitle || "",
            moves,
            explanations,
            annotations: normalizeAnnotations(variation.annotations),
          };
        })
      : [],
  };
}


function normalizeOpeningIdentificationResult(
  value: RawOpeningIdentificationResultDto
): OpeningIdentificationResultDto {
  return {
    opening: value.opening
      ? normalizeOpeningListItem(value.opening as RawOpeningListItemDto)
      : null,
    variation:
      value.variation && typeof value.variation === "object"
        ? {
            id: value.variation.id || "variation",
            title: value.variation.title || "Вариант",
            subtitle: value.variation.subtitle || "",
          }
        : null,
    matchedPlyCount: Number(value.matchedPlyCount ?? 0),
    totalPlyCount: Number(value.totalPlyCount ?? 0),
    confidence: Number(value.confidence ?? 0),
    matchType:
      value.matchType === "position" ||
      value.matchType === "family" ||
      value.matchType === "line"
        ? value.matchType
        : "none",
    line: Array.isArray(value.line)
      ? value.line.filter((move): move is string => typeof move === "string")
      : [],
  };
}

export function getVariationSteps(variation: OpeningVariation): OpeningStep[] {
  return variation.moves.map((san, index) => {
    const annotation = variation.annotations?.[index];

    return {
      san,
      explanation:
        annotation?.explanation ??
        variation.explanations[index] ??
        "Этот ход продолжает дебютную идею выбранного варианта.",
      arrows: annotation?.arrows ?? [],
      squares: annotation?.squares ?? [],
    };
  });
}

export async function getOpenings() {
  const response = await fetch(`${API_BASE_URL}/openings`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => normalizeOpeningListItem(item as RawOpeningListItemDto));
}

export async function getOpeningBySlug(slug: string) {
  const response = await fetch(
    `${API_BASE_URL}/openings/${encodeURIComponent(slug)}`
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return normalizeOpening((await response.json()) as RawOpeningDto);
}


export async function identifyOpening(moves: string[]) {
  const response = await fetch(`${API_BASE_URL}/openings/identify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      moves,
    }),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return normalizeOpeningIdentificationResult(
    (await response.json()) as RawOpeningIdentificationResultDto
  );
}

