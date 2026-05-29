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

function makeExplanations(
  moves: string[],
  fallback: string,
  custom: Record<number, string> = {}
) {
  return moves.map((_, index) => custom[index] ?? fallback);
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

export const OPENINGS: Opening[] = [
  {
    id: "dutch-defense",
    slug: "dutch-defense",
    eco: "A80",
    title: "Голландская защита",
    side: "black",
    against: "1.d4",
    summary: "Чёрные сразу контролируют поле e4 ходом ...f5 и готовят активную игру на королевском фланге.",
    variations: [
{
        id: "dutch-classic",
        title: "Классическая схема",
        subtitle: "1.d4 f5 2.c4 Nf6 3.g3 e6 4.Bg2 Be7 5.Nf3 O-O",
        moves: ["d4", "f5", "c4", "Nf6", "g3", "e6", "Bg2", "Be7", "Nf3", "O-O"],
        explanations: makeExplanations(
          ["d4", "f5", "c4", "Nf6", "g3", "e6", "Bg2", "Be7", "Nf3", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            1: "Ход ...f5 — главная идея Голландской защиты: чёрные забирают поле e4 и готовят атаку.",
            5: "...e6 укрепляет центр и открывает дорогу слону f8.",
            9: "Рокировка завершает развитие короля и позволяет готовить атаку на королевском фланге.",
          }
        ),
        annotations: {
          1: {
            explanation: "Ход ...f5 — главная идея Голландской защиты: чёрные забирают поле e4 и готовят атаку.",
            arrows: [
              { from: "f7", to: "f5" },
              { from: "f5", to: "e4" },
            ],
            squares: ["f5", "e4"],
          },
          5: {
            explanation: "...e6 укрепляет центр и открывает дорогу слону f8.",
            arrows: [
              { from: "e7", to: "e6" },
            ],
            squares: ["e6", "d5"],
          },
          9: {
            explanation: "Рокировка завершает развитие короля и позволяет готовить атаку на королевском фланге.",
            arrows: [
              { from: "e8", to: "g8" },
            ],
            squares: ["g8"],
          },
        },
      },
{
        id: "dutch-leningrad",
        title: "Ленинградский вариант",
        subtitle: "1.d4 f5 2.g3 Nf6 3.Bg2 g6 4.Nf3 Bg7 5.O-O O-O",
        moves: ["d4", "f5", "g3", "Nf6", "Bg2", "g6", "Nf3", "Bg7", "O-O", "O-O"],
        explanations: makeExplanations(
          ["d4", "f5", "g3", "Nf6", "Bg2", "g6", "Nf3", "Bg7", "O-O", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            1: "Чёрные начинают с ...f5 и сразу борются за поле e4.",
            5: "...g6 подготавливает фианкетто слона и давление по большой диагонали.",
            7: "Слон на g7 становится главной фигурой чёрных в борьбе за центр.",
          }
        ),
        annotations: {
          1: {
            explanation: "Чёрные начинают с ...f5 и сразу борются за поле e4.",
            arrows: [
              { from: "f7", to: "f5" },
              { from: "f5", to: "e4" },
            ],
            squares: ["f5", "e4"],
          },
          5: {
            explanation: "...g6 подготавливает фианкетто слона и давление по большой диагонали.",
            arrows: [
              { from: "g7", to: "g6" },
              { from: "f8", to: "g7" },
            ],
            squares: ["g6", "g7"],
          },
          7: {
            explanation: "Слон на g7 становится главной фигурой чёрных в борьбе за центр.",
            arrows: [
              { from: "f8", to: "g7" },
              { from: "g7", to: "d4" },
            ],
            squares: ["g7", "d4"],
          },
        },
      },
{
        id: "dutch-stonewall",
        title: "Стоунволл",
        subtitle: "1.d4 f5 2.c4 e6 3.Nc3 d5 4.Nf3 c6 5.e3 Nf6",
        moves: ["d4", "f5", "c4", "e6", "Nc3", "d5", "Nf3", "c6", "e3", "Nf6"],
        explanations: makeExplanations(
          ["d4", "f5", "c4", "e6", "Nc3", "d5", "Nf3", "c6", "e3", "Nf6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            3: "...e6 готовит прочную пешечную стену и поддерживает продвижение ...d5.",
            5: "...d5 формирует характерную структуру Stonewall: пешки f5-e6-d5.",
            7: "...c6 укрепляет центр и ограничивает белые фигуры.",
          }
        ),
        annotations: {
          3: {
            explanation: "...e6 готовит прочную пешечную стену и поддерживает продвижение ...d5.",
            arrows: [
              { from: "e7", to: "e6" },
            ],
            squares: ["e6", "f5"],
          },
          5: {
            explanation: "...d5 формирует характерную структуру Stonewall: пешки f5-e6-d5.",
            arrows: [
              { from: "d7", to: "d5" },
            ],
            squares: ["f5", "e6", "d5"],
          },
          7: {
            explanation: "...c6 укрепляет центр и ограничивает белые фигуры.",
            arrows: [
              { from: "c7", to: "c6" },
            ],
            squares: ["c6", "d5"],
          },
        },
      },
    ],
  },
  {
    id: "slav-defense",
    slug: "slavic-defense",
    eco: "D10",
    title: "Славянская защита",
    side: "black",
    against: "1.d4",
    summary: "Славянская защита даёт чёрным прочную пешечную структуру и надёжное развитие против 1.d4.",
    variations: [
{
        id: "slav-main",
        title: "Основной вариант",
        subtitle: "1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 dxc4 5.a4 Bf5",
        moves: ["d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3", "dxc4", "a4", "Bf5"],
        explanations: makeExplanations(
          ["d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3", "dxc4", "a4", "Bf5"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            1: "...d5 сразу оспаривает центр белых.",
            3: "...c6 защищает пешку d5 и создаёт славянскую структуру.",
            9: "Слон выходит на f5 до того, как пешка e6 закроет диагональ.",
          }
        ),
        annotations: {
          1: {
            explanation: "...d5 сразу оспаривает центр белых.",
            arrows: [
              { from: "d7", to: "d5" },
            ],
            squares: ["d5", "e4"],
          },
          3: {
            explanation: "...c6 защищает пешку d5 и создаёт славянскую структуру.",
            arrows: [
              { from: "c7", to: "c6" },
              { from: "c6", to: "d5" },
            ],
            squares: ["c6", "d5"],
          },
          9: {
            explanation: "Слон выходит на f5 до того, как пешка e6 закроет диагональ.",
            arrows: [
              { from: "c8", to: "f5" },
            ],
            squares: ["f5", "c2"],
          },
        },
      },
{
        id: "slav-exchange",
        title: "Разменный вариант",
        subtitle: "1.d4 d5 2.c4 c6 3.cxd5 cxd5 4.Nf3 Nf6 5.Nc3 Nc6 6.Bf4 Bf5",
        moves: ["d4", "d5", "c4", "c6", "cxd5", "cxd5", "Nf3", "Nf6", "Nc3", "Nc6", "Bf4", "Bf5"],
        explanations: makeExplanations(
          ["d4", "d5", "c4", "c6", "cxd5", "cxd5", "Nf3", "Nf6", "Nc3", "Nc6", "Bf4", "Bf5"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            5: "После размена на d5 возникает симметричная, но очень надёжная структура.",
            9: "Развитие коня на c6 усиливает контроль над d4 и e5.",
            11: "Слон f5 активно развивается и не остаётся запертым внутри пешечной цепи.",
          }
        ),
        annotations: {
          5: {
            explanation: "После размена на d5 возникает симметричная, но очень надёжная структура.",
            arrows: [
              { from: "c6", to: "d5" },
            ],
            squares: ["d5"],
          },
          9: {
            explanation: "Развитие коня на c6 усиливает контроль над d4 и e5.",
            arrows: [
              { from: "b8", to: "c6" },
            ],
            squares: ["c6", "d4", "e5"],
          },
          11: {
            explanation: "Слон f5 активно развивается и не остаётся запертым внутри пешечной цепи.",
            arrows: [
              { from: "c8", to: "f5" },
            ],
            squares: ["f5"],
          },
        },
      },
{
        id: "slav-quiet",
        title: "Спокойная схема",
        subtitle: "1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.e3 e6 5.Nc3 Nbd7",
        moves: ["d4", "d5", "c4", "c6", "Nf3", "Nf6", "e3", "e6", "Nc3", "Nbd7"],
        explanations: makeExplanations(
          ["d4", "d5", "c4", "c6", "Nf3", "Nf6", "e3", "e6", "Nc3", "Nbd7"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            3: "...c6 удерживает центр и подготавливает спокойное развитие.",
            7: "...e6 укрепляет центр и открывает дорогу слону f8.",
            9: "Конь d7 поддерживает прорывы ...e5 и ...c5.",
          }
        ),
        annotations: {
          3: {
            explanation: "...c6 удерживает центр и подготавливает спокойное развитие.",
            arrows: [
              { from: "c7", to: "c6" },
            ],
            squares: ["c6", "d5"],
          },
          7: {
            explanation: "...e6 укрепляет центр и открывает дорогу слону f8.",
            arrows: [
              { from: "e7", to: "e6" },
            ],
            squares: ["e6", "d5"],
          },
          9: {
            explanation: "Конь d7 поддерживает прорывы ...e5 и ...c5.",
            arrows: [
              { from: "b8", to: "d7" },
              { from: "d7", to: "e5" },
            ],
            squares: ["d7", "e5", "c5"],
          },
        },
      },
    ],
  },
  {
    id: "caro-kann",
    slug: "caro-kann-defense",
    eco: "B10",
    title: "Защита Каро-Канн",
    side: "black",
    against: "1.e4",
    summary: "Каро-Канн — надёжная защита против 1.e4 с крепкой пешечной структурой и понятными планами.",
    variations: [
{
        id: "caro-main",
        title: "Классический вариант",
        subtitle: "1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Bf5 5.Ng3 Bg6",
        moves: ["e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Bf5", "Ng3", "Bg6"],
        explanations: makeExplanations(
          ["e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Bf5", "Ng3", "Bg6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            1: "...c6 готовит центральный удар ...d5 без ослабления короля.",
            3: "...d5 атакует пешку e4 и начинает борьбу за центр.",
            7: "Слон выходит на f5 до построения пешечной цепи e6.",
          }
        ),
        annotations: {
          1: {
            explanation: "...c6 готовит центральный удар ...d5 без ослабления короля.",
            arrows: [
              { from: "c7", to: "c6" },
              { from: "c6", to: "d5" },
            ],
            squares: ["c6", "d5"],
          },
          3: {
            explanation: "...d5 атакует пешку e4 и начинает борьбу за центр.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "e4" },
            ],
            squares: ["d5", "e4"],
          },
          7: {
            explanation: "Слон выходит на f5 до построения пешечной цепи e6.",
            arrows: [
              { from: "c8", to: "f5" },
            ],
            squares: ["f5", "c2"],
          },
        },
      },
{
        id: "caro-advance",
        title: "Продвинутый вариант",
        subtitle: "1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 c5",
        moves: ["e4", "c6", "d4", "d5", "e5", "Bf5", "Nf3", "e6", "Be2", "c5"],
        explanations: makeExplanations(
          ["e4", "c6", "d4", "d5", "e5", "Bf5", "Nf3", "e6", "Be2", "c5"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            4: "Белые продвигают e5 и получают пространство, но центр становится целью атаки.",
            5: "Слон f5 выходит за пределы пешечной цепи и давит на c2.",
            9: "...c5 — главный подрыв белого центра в продвинутом варианте.",
          }
        ),
        annotations: {
          4: {
            explanation: "Белые продвигают e5 и получают пространство, но центр становится целью атаки.",
            arrows: [
              { from: "e4", to: "e5" },
            ],
            squares: ["e5", "d6"],
          },
          5: {
            explanation: "Слон f5 выходит за пределы пешечной цепи и давит на c2.",
            arrows: [
              { from: "c8", to: "f5" },
            ],
            squares: ["f5", "c2"],
          },
          9: {
            explanation: "...c5 — главный подрыв белого центра в продвинутом варианте.",
            arrows: [
              { from: "c6", to: "c5" },
              { from: "c5", to: "d4" },
            ],
            squares: ["c5", "d4"],
          },
        },
      },
{
        id: "caro-exchange",
        title: "Разменный вариант",
        subtitle: "1.e4 c6 2.d4 d5 3.exd5 cxd5 4.Bd3 Nc6 5.c3 Nf6",
        moves: ["e4", "c6", "d4", "d5", "exd5", "cxd5", "Bd3", "Nc6", "c3", "Nf6"],
        explanations: makeExplanations(
          ["e4", "c6", "d4", "d5", "exd5", "cxd5", "Bd3", "Nc6", "c3", "Nf6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            5: "После cxd5 чёрные получают симметричную и крепкую структуру.",
            7: "Конь c6 усиливает давление на d4 и помогает развивать фигуры.",
            9: "Конь f6 завершает естественное развитие и контролирует e4.",
          }
        ),
        annotations: {
          5: {
            explanation: "После cxd5 чёрные получают симметричную и крепкую структуру.",
            arrows: [
              { from: "c6", to: "d5" },
            ],
            squares: ["d5"],
          },
          7: {
            explanation: "Конь c6 усиливает давление на d4 и помогает развивать фигуры.",
            arrows: [
              { from: "b8", to: "c6" },
            ],
            squares: ["c6", "d4"],
          },
          9: {
            explanation: "Конь f6 завершает естественное развитие и контролирует e4.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
        },
      },
    ],
  },
  {
    id: "center-game",
    slug: "center-game",
    eco: "C21",
    title: "Центральный дебют",
    side: "white",
    against: "1...e5",
    summary: "Белые быстро открывают центр и стараются получить активную фигурную игру.",
    variations: [
{
        id: "center-main",
        title: "Главная линия",
        subtitle: "1.e4 e5 2.d4 exd4 3.Qxd4 Nc6 4.Qe3 Nf6",
        moves: ["e4", "e5", "d4", "exd4", "Qxd4", "Nc6", "Qe3", "Nf6"],
        explanations: makeExplanations(
          ["e4", "e5", "d4", "exd4", "Qxd4", "Nc6", "Qe3", "Nf6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            2: "Белые сразу вскрывают центр ходом d4.",
            4: "Ферзь забирает пешку и сохраняет активность в центре.",
            5: "...Nc6 развивается с темпом, нападая на ферзя.",
          }
        ),
        annotations: {
          2: {
            explanation: "Белые сразу вскрывают центр ходом d4.",
            arrows: [
              { from: "d2", to: "d4" },
              { from: "d4", to: "e5" },
            ],
            squares: ["d4", "e5"],
          },
          4: {
            explanation: "Ферзь забирает пешку и сохраняет активность в центре.",
            arrows: [
              { from: "d1", to: "d4" },
            ],
            squares: ["d4"],
          },
          5: {
            explanation: "...Nc6 развивается с темпом, нападая на ферзя.",
            arrows: [
              { from: "b8", to: "c6" },
              { from: "c6", to: "d4" },
            ],
            squares: ["c6", "d4"],
          },
        },
      },
{
        id: "center-paulsen",
        title: "Схема с Qe3",
        subtitle: "1.e4 e5 2.d4 exd4 3.Qxd4 Nc6 4.Qe3 Nf6 5.Nc3 Bb4 6.Bd2 O-O",
        moves: ["e4", "e5", "d4", "exd4", "Qxd4", "Nc6", "Qe3", "Nf6", "Nc3", "Bb4", "Bd2", "O-O"],
        explanations: makeExplanations(
          ["e4", "e5", "d4", "exd4", "Qxd4", "Nc6", "Qe3", "Nf6", "Nc3", "Bb4", "Bd2", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            6: "Ферзь уходит на e3 и поддерживает центр, избегая темпа коня.",
            9: "...Bb4 связывает коня и усиливает давление на центр.",
            11: "Рокировка чёрных завершает развитие и переводит игру в миттельшпиль.",
          }
        ),
        annotations: {
          6: {
            explanation: "Ферзь уходит на e3 и поддерживает центр, избегая темпа коня.",
            arrows: [
              { from: "d4", to: "e3" },
            ],
            squares: ["e3", "e4"],
          },
          9: {
            explanation: "...Bb4 связывает коня и усиливает давление на центр.",
            arrows: [
              { from: "f8", to: "b4" },
              { from: "b4", to: "c3" },
            ],
            squares: ["b4", "c3"],
          },
          11: {
            explanation: "Рокировка чёрных завершает развитие и переводит игру в миттельшпиль.",
            arrows: [
              { from: "e8", to: "g8" },
            ],
            squares: ["g8"],
          },
        },
      },
    ],
  },
  {
    id: "petrov-defense",
    slug: "petrov-defense",
    eco: "C43",
    title: "Русская партия",
    side: "black",
    against: "1.e4",
    summary: "Русская партия — симметричная и очень надёжная защита, где чёрные сразу контратакуют пешку e4.",
    variations: [
{
        id: "petrov-main",
        title: "Основной вариант",
        subtitle: "1.e4 e5 2.Nf3 Nf6 3.Nxe5 d6 4.Nf3 Nxe4 5.d4 d5",
        moves: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "d6", "Nf3", "Nxe4", "d4", "d5"],
        explanations: makeExplanations(
          ["e4", "e5", "Nf3", "Nf6", "Nxe5", "d6", "Nf3", "Nxe4", "d4", "d5"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            3: "...Nf6 немедленно контратакует пешку e4.",
            5: "...d6 выгоняет коня и помогает вернуть пешку.",
            9: "...d5 закрепляет коня e4 и даёт чёрным устойчивый центр.",
          }
        ),
        annotations: {
          3: {
            explanation: "...Nf6 немедленно контратакует пешку e4.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          5: {
            explanation: "...d6 выгоняет коня и помогает вернуть пешку.",
            arrows: [
              { from: "d7", to: "d6" },
              { from: "d6", to: "e5" },
            ],
            squares: ["d6", "e5"],
          },
          9: {
            explanation: "...d5 закрепляет коня e4 и даёт чёрным устойчивый центр.",
            arrows: [
              { from: "d6", to: "d5" },
            ],
            squares: ["d5", "e4"],
          },
        },
      },
{
        id: "petrov-modern",
        title: "Современная схема",
        subtitle: "1.e4 e5 2.Nf3 Nf6 3.Nxe5 d6 4.Nf3 Nxe4 5.d4 d5 6.Bd3 Bd6 7.O-O O-O",
        moves: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "d6", "Nf3", "Nxe4", "d4", "d5", "Bd3", "Bd6", "O-O", "O-O"],
        explanations: makeExplanations(
          ["e4", "e5", "Nf3", "Nf6", "Nxe5", "d6", "Nf3", "Nxe4", "d4", "d5", "Bd3", "Bd6", "O-O", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            11: "Слон d6 поддерживает коня e5/e4 и готовит развитие короля.",
            13: "Обе стороны рокируют, и партия переходит в спокойную стратегическую борьбу.",
          }
        ),
        annotations: {
          11: {
            explanation: "Слон d6 поддерживает коня e5/e4 и готовит развитие короля.",
            arrows: [
              { from: "f8", to: "d6" },
              { from: "d6", to: "h2" },
            ],
            squares: ["d6", "h2"],
          },
          13: {
            explanation: "Обе стороны рокируют, и партия переходит в спокойную стратегическую борьбу.",
            arrows: [
              { from: "e8", to: "g8" },
            ],
            squares: ["g8"],
          },
        },
      },
    ],
  },
  {
    id: "benko-gambit",
    slug: "benko-gambit",
    eco: "A57",
    title: "Волжский гамбит",
    side: "black",
    against: "1.d4",
    summary: "Волжский гамбит — динамический дебют, где чёрные жертвуют пешку ради давления по линиям a и b.",
    variations: [
{
        id: "benko-main",
        title: "Принятый гамбит",
        subtitle: "1.d4 Nf6 2.c4 c5 3.d5 b5 4.cxb5 a6 5.bxa6 Bxa6",
        moves: ["d4", "Nf6", "c4", "c5", "d5", "b5", "cxb5", "a6", "bxa6", "Bxa6"],
        explanations: makeExplanations(
          ["d4", "Nf6", "c4", "c5", "d5", "b5", "cxb5", "a6", "bxa6", "Bxa6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            5: "...b5 — ключевая жертва пешки ради вскрытия линий на ферзевом фланге.",
            7: "...a6 заставляет белых принять решение и открывает линию a.",
            9: "Слон забирает a6 и начинает давление по диагоналям.",
          }
        ),
        annotations: {
          5: {
            explanation: "...b5 — ключевая жертва пешки ради вскрытия линий на ферзевом фланге.",
            arrows: [
              { from: "b7", to: "b5" },
              { from: "b5", to: "c4" },
            ],
            squares: ["b5", "a6"],
          },
          7: {
            explanation: "...a6 заставляет белых принять решение и открывает линию a.",
            arrows: [
              { from: "a7", to: "a6" },
              { from: "a6", to: "b5" },
            ],
            squares: ["a6", "b5"],
          },
          9: {
            explanation: "Слон забирает a6 и начинает давление по диагоналям.",
            arrows: [
              { from: "c8", to: "a6" },
            ],
            squares: ["a6", "d3"],
          },
        },
      },
{
        id: "benko-fianchetto",
        title: "С фианкетто слона",
        subtitle: "1.d4 Nf6 2.c4 c5 3.d5 b5 4.cxb5 a6 5.bxa6 g6 6.Nc3 Bxa6",
        moves: ["d4", "Nf6", "c4", "c5", "d5", "b5", "cxb5", "a6", "bxa6", "g6", "Nc3", "Bxa6"],
        explanations: makeExplanations(
          ["d4", "Nf6", "c4", "c5", "d5", "b5", "cxb5", "a6", "bxa6", "g6", "Nc3", "Bxa6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            9: "...g6 готовит слона g7, который будет давить на центр.",
            11: "Слон всё равно возвращает пешку a6 и активизируется.",
          }
        ),
        annotations: {
          9: {
            explanation: "...g6 готовит слона g7, который будет давить на центр.",
            arrows: [
              { from: "g7", to: "g6" },
              { from: "f8", to: "g7" },
            ],
            squares: ["g6", "g7"],
          },
          11: {
            explanation: "Слон всё равно возвращает пешку a6 и активизируется.",
            arrows: [
              { from: "c8", to: "a6" },
            ],
            squares: ["a6"],
          },
        },
      },
    ],
  },
  {
    id: "budapest-gambit",
    slug: "budapest-gambit",
    eco: "A52",
    title: "Будапештский гамбит",
    side: "black",
    against: "1.d4",
    summary: "Будапештский гамбит позволяет чёрным пожертвовать пешку ради быстрого развития и инициативы.",
    variations: [
{
        id: "budapest-main",
        title: "Основная схема",
        subtitle: "1.d4 Nf6 2.c4 e5 3.dxe5 Ng4 4.Bf4 Nc6 5.Nf3 Bb4+",
        moves: ["d4", "Nf6", "c4", "e5", "dxe5", "Ng4", "Bf4", "Nc6", "Nf3", "Bb4+"],
        explanations: makeExplanations(
          ["d4", "Nf6", "c4", "e5", "dxe5", "Ng4", "Bf4", "Nc6", "Nf3", "Bb4+"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            3: "...e5 — гамбитный удар по центру белых.",
            5: "Конь g4 атакует пешку e5 и заставляет белых защищаться.",
            9: "Шах слоном помогает чёрным выиграть темп в развитии.",
          }
        ),
        annotations: {
          3: {
            explanation: "...e5 — гамбитный удар по центру белых.",
            arrows: [
              { from: "e7", to: "e5" },
              { from: "e5", to: "d4" },
            ],
            squares: ["e5", "d4"],
          },
          5: {
            explanation: "Конь g4 атакует пешку e5 и заставляет белых защищаться.",
            arrows: [
              { from: "f6", to: "g4" },
              { from: "g4", to: "e5" },
            ],
            squares: ["g4", "e5"],
          },
          9: {
            explanation: "Шах слоном помогает чёрным выиграть темп в развитии.",
            arrows: [
              { from: "f8", to: "b4" },
              { from: "b4", to: "d2" },
            ],
            squares: ["b4", "d2"],
          },
        },
      },
{
        id: "budapest-adler",
        title: "Схема Адлера",
        subtitle: "1.d4 Nf6 2.c4 e5 3.dxe5 Ng4 4.Nf3 Nc6 5.Bf4 Bb4+ 6.Nbd2 Qe7",
        moves: ["d4", "Nf6", "c4", "e5", "dxe5", "Ng4", "Nf3", "Nc6", "Bf4", "Bb4+", "Nbd2", "Qe7"],
        explanations: makeExplanations(
          ["d4", "Nf6", "c4", "e5", "dxe5", "Ng4", "Nf3", "Nc6", "Bf4", "Bb4+", "Nbd2", "Qe7"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            7: "...Nc6 усиливает давление на e5 и ускоряет развитие.",
            11: "Ферзь e7 добавляет давление на e5 и поддерживает активные фигуры.",
          }
        ),
        annotations: {
          7: {
            explanation: "...Nc6 усиливает давление на e5 и ускоряет развитие.",
            arrows: [
              { from: "b8", to: "c6" },
              { from: "c6", to: "e5" },
            ],
            squares: ["c6", "e5"],
          },
          11: {
            explanation: "Ферзь e7 добавляет давление на e5 и поддерживает активные фигуры.",
            arrows: [
              { from: "d8", to: "e7" },
              { from: "e7", to: "e5" },
            ],
            squares: ["e7", "e5"],
          },
        },
      },
    ],
  },
  {
    id: "nimzowitsch-defense",
    slug: "nimzowitsch-defense",
    eco: "B00",
    title: "Защита Нимцовича",
    side: "black",
    against: "1.e4",
    summary: "Защита Нимцовича предлагает гибкую борьбу против белого центра без немедленного симметричного ответа.",
    variations: [
{
        id: "nimzo-main",
        title: "Главная идея",
        subtitle: "1.e4 Nc6 2.d4 d5 3.e5 Bf5 4.Nf3 e6",
        moves: ["e4", "Nc6", "d4", "d5", "e5", "Bf5", "Nf3", "e6"],
        explanations: makeExplanations(
          ["e4", "Nc6", "d4", "d5", "e5", "Bf5", "Nf3", "e6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            1: "...Nc6 развивает фигуру и провоцирует белых занять центр.",
            3: "...d5 сразу атакует центр белых.",
            5: "Слон f5 выходит активно и давит на c2.",
          }
        ),
        annotations: {
          1: {
            explanation: "...Nc6 развивает фигуру и провоцирует белых занять центр.",
            arrows: [
              { from: "b8", to: "c6" },
              { from: "c6", to: "d4" },
            ],
            squares: ["c6", "d4"],
          },
          3: {
            explanation: "...d5 сразу атакует центр белых.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "e4" },
            ],
            squares: ["d5", "e4"],
          },
          5: {
            explanation: "Слон f5 выходит активно и давит на c2.",
            arrows: [
              { from: "c8", to: "f5" },
            ],
            squares: ["f5", "c2"],
          },
        },
      },
{
        id: "nimzo-scandinavian",
        title: "Скандинавская идея",
        subtitle: "1.e4 Nc6 2.d4 d5 3.exd5 Qxd5 4.Nf3 Bg4 5.Be2 O-O-O",
        moves: ["e4", "Nc6", "d4", "d5", "exd5", "Qxd5", "Nf3", "Bg4", "Be2", "O-O-O"],
        explanations: makeExplanations(
          ["e4", "Nc6", "d4", "d5", "exd5", "Qxd5", "Nf3", "Bg4", "Be2", "O-O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            5: "Ферзь возвращает пешку и создаёт давление в центре.",
            7: "Слон g4 связывает коня f3 и усиливает давление.",
            9: "Длинная рокировка подчёркивает активный характер варианта.",
          }
        ),
        annotations: {
          5: {
            explanation: "Ферзь возвращает пешку и создаёт давление в центре.",
            arrows: [
              { from: "d8", to: "d5" },
            ],
            squares: ["d5", "d4"],
          },
          7: {
            explanation: "Слон g4 связывает коня f3 и усиливает давление.",
            arrows: [
              { from: "c8", to: "g4" },
              { from: "g4", to: "f3" },
            ],
            squares: ["g4", "f3"],
          },
          9: {
            explanation: "Длинная рокировка подчёркивает активный характер варианта.",
            arrows: [
              { from: "e8", to: "c8" },
            ],
            squares: ["c8"],
          },
        },
      },
    ],
  },
  {
    id: "grunfeld-defense",
    slug: "grunfeld-defense",
    eco: "D85",
    title: "Защита Грюнфельда",
    side: "black",
    against: "1.d4",
    summary: "В защите Грюнфельда чёрные позволяют белым занять центр, а затем атакуют его фигурами и пешками.",
    variations: [
{
        id: "grunfeld-exchange",
        title: "Разменный вариант",
        subtitle: "1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.cxd5 Nxd5 5.e4 Nxc3 6.bxc3",
        moves: ["d4", "Nf6", "c4", "g6", "Nc3", "d5", "cxd5", "Nxd5", "e4", "Nxc3", "bxc3"],
        explanations: makeExplanations(
          ["d4", "Nf6", "c4", "g6", "Nc3", "d5", "cxd5", "Nxd5", "e4", "Nxc3", "bxc3"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            5: "...d5 — центральный удар, который определяет защиту Грюнфельда.",
            9: "...Nxc3 меняет фигуру и заставляет белых создать пешечный центр c3-d4-e4.",
          }
        ),
        annotations: {
          5: {
            explanation: "...d5 — центральный удар, который определяет защиту Грюнфельда.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "c4" },
            ],
            squares: ["d5", "c4"],
          },
          9: {
            explanation: "...Nxc3 меняет фигуру и заставляет белых создать пешечный центр c3-d4-e4.",
            arrows: [
              { from: "d5", to: "c3" },
            ],
            squares: ["c3", "d4", "e4"],
          },
        },
      },
{
        id: "grunfeld-russian",
        title: "Русская система",
        subtitle: "1.d4 Nf6 2.c4 g6 3.Nf3 Bg7 4.Nc3 d5 5.Qb3 dxc4 6.Qxc4 O-O 7.e4",
        moves: ["d4", "Nf6", "c4", "g6", "Nf3", "Bg7", "Nc3", "d5", "Qb3", "dxc4", "Qxc4", "O-O", "e4"],
        explanations: makeExplanations(
          ["d4", "Nf6", "c4", "g6", "Nf3", "Bg7", "Nc3", "d5", "Qb3", "dxc4", "Qxc4", "O-O", "e4"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            7: "...d5 снова атакует центр, не давая белым спокойно развиться.",
            9: "...dxc4 временно снимает напряжение и открывает игру.",
            11: "Рокировка завершает развитие и готовит давление на центр.",
          }
        ),
        annotations: {
          7: {
            explanation: "...d5 снова атакует центр, не давая белым спокойно развиться.",
            arrows: [
              { from: "d7", to: "d5" },
            ],
            squares: ["d5", "c4"],
          },
          9: {
            explanation: "...dxc4 временно снимает напряжение и открывает игру.",
            arrows: [
              { from: "d5", to: "c4" },
            ],
            squares: ["c4"],
          },
          11: {
            explanation: "Рокировка завершает развитие и готовит давление на центр.",
            arrows: [
              { from: "e8", to: "g8" },
            ],
            squares: ["g8", "d4"],
          },
        },
      },
    ],
  },
  {
    id: "london-system",
    slug: "london-system",
    eco: "D00",
    title: "Лондонская система",
    side: "white",
    against: "универсально",
    summary: "Лондонская система — удобная расстановка за белых с понятными планами почти против любого ответа чёрных.",
    variations: [
{
        id: "london-main",
        title: "Базовая расстановка",
        subtitle: "1.d4 d5 2.Bf4 Nf6 3.e3 e6 4.Nf3 c5 5.c3 Nc6",
        moves: ["d4", "d5", "Bf4", "Nf6", "e3", "e6", "Nf3", "c5", "c3", "Nc6"],
        explanations: makeExplanations(
          ["d4", "d5", "Bf4", "Nf6", "e3", "e6", "Nf3", "c5", "c3", "Nc6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            2: "Слон f4 — главная фигура Лондонской системы.",
            8: "...c5 — типичный подрыв центра белых.",
          }
        ),
        annotations: {
          2: {
            explanation: "Слон f4 — главная фигура Лондонской системы.",
            arrows: [
              { from: "c1", to: "f4" },
              { from: "f4", to: "c7" },
            ],
            squares: ["f4", "c7"],
          },
          8: {
            explanation: "...c5 — типичный подрыв центра белых.",
            arrows: [
              { from: "c7", to: "c5" },
              { from: "c5", to: "d4" },
            ],
            squares: ["c5", "d4"],
          },
        },
      },
{
        id: "london-jobava",
        title: "Система Джобава",
        subtitle: "1.d4 d5 2.Nc3 Nf6 3.Bf4 c6 4.e3 Bf5 5.Nf3 e6 6.Bd3 Bxd3",
        moves: ["d4", "d5", "Nc3", "Nf6", "Bf4", "c6", "e3", "Bf5", "Nf3", "e6", "Bd3", "Bxd3"],
        explanations: makeExplanations(
          ["d4", "d5", "Nc3", "Nf6", "Bf4", "c6", "e3", "Bf5", "Nf3", "e6", "Bd3", "Bxd3"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            2: "Конь c3 быстро поддерживает e4 и создаёт более активную версию Лондона.",
            4: "Слон f4 выходит активно и давит на c7.",
            11: "Размен слонов снимает часть давления, но белые сохраняют удобную структуру.",
          }
        ),
        annotations: {
          2: {
            explanation: "Конь c3 быстро поддерживает e4 и создаёт более активную версию Лондона.",
            arrows: [
              { from: "b1", to: "c3" },
              { from: "c3", to: "e4" },
            ],
            squares: ["c3", "e4"],
          },
          4: {
            explanation: "Слон f4 выходит активно и давит на c7.",
            arrows: [
              { from: "c1", to: "f4" },
            ],
            squares: ["f4", "c7"],
          },
          11: {
            explanation: "Размен слонов снимает часть давления, но белые сохраняют удобную структуру.",
            arrows: [
              { from: "f5", to: "d3" },
            ],
            squares: ["d3"],
          },
        },
      },
    ],
  },
  {
    id: "sicilian-defense",
    slug: "sicilian-defense",
    eco: "B20",
    title: "Сицилианская защита",
    side: "black",
    against: "1.e4",
    summary: "Сицилианская защита создаёт асимметричную борьбу и даёт чёрным хорошие шансы на контратаку.",
    variations: [
{
        id: "sicilian-najdorf",
        title: "Найдорф",
        subtitle: "1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6",
        moves: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "a6"],
        explanations: makeExplanations(
          ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "a6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            1: "...c5 создаёт асимметричную борьбу и давит на d4.",
            5: "Размен на d4 открывает линии и даёт чёрным контригру.",
            9: "...a6 готовит ...b5 и ограничивает белые фигуры.",
          }
        ),
        annotations: {
          1: {
            explanation: "...c5 создаёт асимметричную борьбу и давит на d4.",
            arrows: [
              { from: "c7", to: "c5" },
              { from: "c5", to: "d4" },
            ],
            squares: ["c5", "d4"],
          },
          5: {
            explanation: "Размен на d4 открывает линии и даёт чёрным контригру.",
            arrows: [
              { from: "c5", to: "d4" },
            ],
            squares: ["d4"],
          },
          9: {
            explanation: "...a6 готовит ...b5 и ограничивает белые фигуры.",
            arrows: [
              { from: "a7", to: "a6" },
              { from: "b7", to: "b5" },
            ],
            squares: ["a6", "b5"],
          },
        },
      },
{
        id: "sicilian-dragon",
        title: "Дракон",
        subtitle: "1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6 6.Be3 Bg7 7.f3 O-O",
        moves: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "g6", "Be3", "Bg7", "f3", "O-O"],
        explanations: makeExplanations(
          ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "g6", "Be3", "Bg7", "f3", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            9: "...g6 готовит драконовского слона на g7.",
            11: "Слон g7 давит по большой диагонали и атакует центр.",
            13: "Рокировка завершает развитие и переводит игру в острые атаки на разных флангах.",
          }
        ),
        annotations: {
          9: {
            explanation: "...g6 готовит драконовского слона на g7.",
            arrows: [
              { from: "g7", to: "g6" },
              { from: "f8", to: "g7" },
            ],
            squares: ["g6", "g7"],
          },
          11: {
            explanation: "Слон g7 давит по большой диагонали и атакует центр.",
            arrows: [
              { from: "f8", to: "g7" },
              { from: "g7", to: "d4" },
            ],
            squares: ["g7", "d4"],
          },
          13: {
            explanation: "Рокировка завершает развитие и переводит игру в острые атаки на разных флангах.",
            arrows: [
              { from: "e8", to: "g8" },
            ],
            squares: ["g8"],
          },
        },
      },
{
        id: "sicilian-classical",
        title: "Классическая схема",
        subtitle: "1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 g6 5.Nc3 Bg7",
        moves: ["e4", "c5", "Nf3", "Nc6", "d4", "cxd4", "Nxd4", "g6", "Nc3", "Bg7"],
        explanations: makeExplanations(
          ["e4", "c5", "Nf3", "Nc6", "d4", "cxd4", "Nxd4", "g6", "Nc3", "Bg7"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            3: "...Nc6 развивает фигуру и усиливает контроль над d4.",
            7: "...g6 готовит фианкетто и давление на центр.",
            9: "Слон g7 становится ключевой фигурой в борьбе против центра белых.",
          }
        ),
        annotations: {
          3: {
            explanation: "...Nc6 развивает фигуру и усиливает контроль над d4.",
            arrows: [
              { from: "b8", to: "c6" },
              { from: "c6", to: "d4" },
            ],
            squares: ["c6", "d4"],
          },
          7: {
            explanation: "...g6 готовит фианкетто и давление на центр.",
            arrows: [
              { from: "g7", to: "g6" },
            ],
            squares: ["g6", "g7"],
          },
          9: {
            explanation: "Слон g7 становится ключевой фигурой в борьбе против центра белых.",
            arrows: [
              { from: "f8", to: "g7" },
              { from: "g7", to: "d4" },
            ],
            squares: ["g7", "d4"],
          },
        },
      },
    ],
  },
  {
    id: "kings-indian-defense",
    slug: "kings-indian-defense",
    eco: "A53",
    title: "Староиндийская защита",
    side: "black",
    against: "1.d4",
    summary: "Староиндийская защита строится на фианкетто слона и последующей контратаке на белый центр.",
    variations: [
{
        id: "kid-main",
        title: "Классическое развитие",
        subtitle: "1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O",
        moves: ["d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6", "Nf3", "O-O"],
        explanations: makeExplanations(
          ["d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6", "Nf3", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            3: "...g6 готовит фианкетто слона и давление по большой диагонали.",
            5: "Слон g7 будет атаковать центр белых издалека.",
            7: "...d6 укрепляет позицию и готовит удар ...e5.",
          }
        ),
        annotations: {
          3: {
            explanation: "...g6 готовит фианкетто слона и давление по большой диагонали.",
            arrows: [
              { from: "g7", to: "g6" },
              { from: "f8", to: "g7" },
            ],
            squares: ["g6", "g7"],
          },
          5: {
            explanation: "Слон g7 будет атаковать центр белых издалека.",
            arrows: [
              { from: "f8", to: "g7" },
              { from: "g7", to: "d4" },
            ],
            squares: ["g7", "d4"],
          },
          7: {
            explanation: "...d6 укрепляет позицию и готовит удар ...e5.",
            arrows: [
              { from: "d7", to: "d6" },
              { from: "e7", to: "e5" },
            ],
            squares: ["d6", "e5"],
          },
        },
      },
{
        id: "kid-fianchetto",
        title: "Фианкетто белых",
        subtitle: "1.d4 Nf6 2.c4 g6 3.g3 Bg7 4.Bg2 O-O 5.Nf3 d6 6.O-O",
        moves: ["d4", "Nf6", "c4", "g6", "g3", "Bg7", "Bg2", "O-O", "Nf3", "d6", "O-O"],
        explanations: makeExplanations(
          ["d4", "Nf6", "c4", "g6", "g3", "Bg7", "Bg2", "O-O", "Nf3", "d6", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            5: "Белые тоже фианкеттируют слона, и борьба идёт по большим диагоналям.",
            7: "Чёрные быстро рокируют и готовят центральный подрыв.",
            9: "...d6 подготавливает ...e5 или ...c5.",
          }
        ),
        annotations: {
          5: {
            explanation: "Белые тоже фианкеттируют слона, и борьба идёт по большим диагоналям.",
            arrows: [
              { from: "g2", to: "g3" },
              { from: "f1", to: "g2" },
            ],
            squares: ["g2", "g3"],
          },
          7: {
            explanation: "Чёрные быстро рокируют и готовят центральный подрыв.",
            arrows: [
              { from: "e8", to: "g8" },
            ],
            squares: ["g8"],
          },
          9: {
            explanation: "...d6 подготавливает ...e5 или ...c5.",
            arrows: [
              { from: "d7", to: "d6" },
            ],
            squares: ["d6", "e5", "c5"],
          },
        },
      },
{
        id: "kid-four-pawns",
        title: "Атака четырёх пешек",
        subtitle: "1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f4 O-O 6.Nf3 c5 7.d5",
        moves: ["d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6", "f4", "O-O", "Nf3", "c5", "d5"],
        explanations: makeExplanations(
          ["d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6", "f4", "O-O", "Nf3", "c5", "d5"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            8: "Ход f4 показывает агрессивный план белых: захватить максимум пространства.",
            11: "...c5 — контрудар по центру, типичный для Староиндийской защиты.",
          }
        ),
        annotations: {
          8: {
            explanation: "Ход f4 показывает агрессивный план белых: захватить максимум пространства.",
            arrows: [
              { from: "f2", to: "f4" },
            ],
            squares: ["f4", "e5"],
          },
          11: {
            explanation: "...c5 — контрудар по центру, типичный для Староиндийской защиты.",
            arrows: [
              { from: "c7", to: "c5" },
              { from: "c5", to: "d4" },
            ],
            squares: ["c5", "d4"],
          },
        },
      },
    ],
  },
  {
    id: "french-defense",
    slug: "french-defense",
    eco: "C00",
    title: "Французская защита",
    side: "black",
    against: "1.e4",
    summary: "Французская защита создаёт крепкий центр у чёрных и стратегическую борьбу вокруг пешечной цепи.",
    variations: [
{
        id: "french-winawer",
        title: "Система Винавера",
        subtitle: "1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Bxc3+ 6.bxc3",
        moves: ["e4", "e6", "d4", "d5", "Nc3", "Bb4", "e5", "c5", "a3", "Bxc3+", "bxc3"],
        explanations: makeExplanations(
          ["e4", "e6", "d4", "d5", "Nc3", "Bb4", "e5", "c5", "a3", "Bxc3+", "bxc3"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            1: "...e6 готовит удар ...d5.",
            5: "Слон b4 связывает коня и атакует защитника центра.",
            7: "...c5 — главный подрыв белого центра.",
          }
        ),
        annotations: {
          1: {
            explanation: "...e6 готовит удар ...d5.",
            arrows: [
              { from: "e7", to: "e6" },
              { from: "e6", to: "d5" },
            ],
            squares: ["e6", "d5"],
          },
          5: {
            explanation: "Слон b4 связывает коня и атакует защитника центра.",
            arrows: [
              { from: "f8", to: "b4" },
              { from: "b4", to: "c3" },
            ],
            squares: ["b4", "c3"],
          },
          7: {
            explanation: "...c5 — главный подрыв белого центра.",
            arrows: [
              { from: "c7", to: "c5" },
              { from: "c5", to: "d4" },
            ],
            squares: ["c5", "d4"],
          },
        },
      },
{
        id: "french-advance",
        title: "Продвинутый вариант",
        subtitle: "1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Nc6 5.Nf3 Qb6 6.Bd3 cxd4 7.cxd4",
        moves: ["e4", "e6", "d4", "d5", "e5", "c5", "c3", "Nc6", "Nf3", "Qb6", "Bd3", "cxd4", "cxd4"],
        explanations: makeExplanations(
          ["e4", "e6", "d4", "d5", "e5", "c5", "c3", "Nc6", "Nf3", "Qb6", "Bd3", "cxd4", "cxd4"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            4: "Белые продвигают e5 и получают пространство.",
            5: "...c5 сразу атакует основание пешечной цепи.",
            9: "Ферзь b6 усиливает давление на d4 и b2.",
          }
        ),
        annotations: {
          4: {
            explanation: "Белые продвигают e5 и получают пространство.",
            arrows: [
              { from: "e4", to: "e5" },
            ],
            squares: ["e5", "d6"],
          },
          5: {
            explanation: "...c5 сразу атакует основание пешечной цепи.",
            arrows: [
              { from: "c7", to: "c5" },
              { from: "c5", to: "d4" },
            ],
            squares: ["c5", "d4"],
          },
          9: {
            explanation: "Ферзь b6 усиливает давление на d4 и b2.",
            arrows: [
              { from: "d8", to: "b6" },
              { from: "b6", to: "d4" },
              { from: "b6", to: "b2" },
            ],
            squares: ["b6", "d4", "b2"],
          },
        },
      },
{
        id: "french-exchange",
        title: "Разменный вариант",
        subtitle: "1.e4 e6 2.d4 d5 3.exd5 exd5 4.Nf3 Nf6 5.Bd3 Bd6 6.O-O O-O",
        moves: ["e4", "e6", "d4", "d5", "exd5", "exd5", "Nf3", "Nf6", "Bd3", "Bd6", "O-O", "O-O"],
        explanations: makeExplanations(
          ["e4", "e6", "d4", "d5", "exd5", "exd5", "Nf3", "Nf6", "Bd3", "Bd6", "O-O", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            5: "Размен на d5 создаёт симметричную структуру.",
            11: "Обе стороны рокируют, и игра становится более спокойной.",
          }
        ),
        annotations: {
          5: {
            explanation: "Размен на d5 создаёт симметричную структуру.",
            arrows: [
              { from: "e6", to: "d5" },
            ],
            squares: ["d5"],
          },
          11: {
            explanation: "Обе стороны рокируют, и игра становится более спокойной.",
            arrows: [
              { from: "e8", to: "g8" },
            ],
            squares: ["g8"],
          },
        },
      },
    ],
  },
  {
    id: "philidor-defense",
    slug: "philidor-defense",
    eco: "C41",
    title: "Защита Филидора",
    side: "black",
    against: "1.e4",
    summary: "Защита Филидора отличается спокойным развитием и крепкой центральной структурой.",
    variations: [
{
        id: "philidor-main",
        title: "Классическая схема",
        subtitle: "1.e4 e5 2.Nf3 d6 3.d4 Nf6 4.Nc3 Nbd7 5.Bc4 Be7",
        moves: ["e4", "e5", "Nf3", "d6", "d4", "Nf6", "Nc3", "Nbd7", "Bc4", "Be7"],
        explanations: makeExplanations(
          ["e4", "e5", "Nf3", "d6", "d4", "Nf6", "Nc3", "Nbd7", "Bc4", "Be7"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            3: "...d6 защищает пешку e5.",
            7: "...Nbd7 поддерживает e5 и f6.",
          }
        ),
        annotations: {
          3: {
            explanation: "...d6 защищает пешку e5.",
            arrows: [
              { from: "d7", to: "d6" },
              { from: "d6", to: "e5" },
            ],
            squares: ["d6", "e5"],
          },
          7: {
            explanation: "...Nbd7 поддерживает e5 и f6.",
            arrows: [
              { from: "b8", to: "d7" },
            ],
            squares: ["d7", "e5"],
          },
        },
      },
{
        id: "philidor-hanham",
        title: "Система Хэнема",
        subtitle: "1.e4 e5 2.Nf3 d6 3.d4 Nf6 4.Nc3 Nbd7 5.Bc4 Be7 6.O-O O-O 7.Re1 c6",
        moves: ["e4", "e5", "Nf3", "d6", "d4", "Nf6", "Nc3", "Nbd7", "Bc4", "Be7", "O-O", "O-O", "Re1", "c6"],
        explanations: makeExplanations(
          ["e4", "e5", "Nf3", "d6", "d4", "Nf6", "Nc3", "Nbd7", "Bc4", "Be7", "O-O", "O-O", "Re1", "c6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            9: "...Be7 готовит безопасную рокировку.",
            13: "...c6 укрепляет центр и готовит ...Qc7 или ...b5.",
          }
        ),
        annotations: {
          9: {
            explanation: "...Be7 готовит безопасную рокировку.",
            arrows: [
              { from: "f8", to: "e7" },
              { from: "e8", to: "g8" },
            ],
            squares: ["e7", "g8"],
          },
          13: {
            explanation: "...c6 укрепляет центр и готовит ...Qc7 или ...b5.",
            arrows: [
              { from: "c7", to: "c6" },
            ],
            squares: ["c6", "d5"],
          },
        },
      },
    ],
  },
  {
    id: "scandinavian-defense",
    slug: "scandinavian-defense",
    eco: "B01",
    title: "Скандинавская защита",
    side: "black",
    against: "1.e4",
    summary: "Скандинавская защита сразу оспаривает пешку e4 и быстро упрощает борьбу в центре.",
    variations: [
{
        id: "scandinavian-qa5",
        title: "Схема с Qa5",
        subtitle: "1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5 4.d4 Nf6 5.Nf3 c6",
        moves: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qa5", "d4", "Nf6", "Nf3", "c6"],
        explanations: makeExplanations(
          ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qa5", "d4", "Nf6", "Nf3", "c6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            1: "...d5 немедленно атакует пешку e4.",
            5: "Ферзь уходит на a5 и сохраняет активность.",
            9: "...c6 создаёт надёжную структуру и контролирует d5.",
          }
        ),
        annotations: {
          1: {
            explanation: "...d5 немедленно атакует пешку e4.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "e4" },
            ],
            squares: ["d5", "e4"],
          },
          5: {
            explanation: "Ферзь уходит на a5 и сохраняет активность.",
            arrows: [
              { from: "d5", to: "a5" },
            ],
            squares: ["a5"],
          },
          9: {
            explanation: "...c6 создаёт надёжную структуру и контролирует d5.",
            arrows: [
              { from: "c7", to: "c6" },
            ],
            squares: ["c6", "d5"],
          },
        },
      },
{
        id: "scandinavian-nf6",
        title: "Вариант с Nf6",
        subtitle: "1.e4 d5 2.exd5 Nf6 3.d4 Nxd5 4.Nf3 g6 5.c4 Nb6 6.Nc3 Bg7",
        moves: ["e4", "d5", "exd5", "Nf6", "d4", "Nxd5", "Nf3", "g6", "c4", "Nb6", "Nc3", "Bg7"],
        explanations: makeExplanations(
          ["e4", "d5", "exd5", "Nf6", "d4", "Nxd5", "Nf3", "g6", "c4", "Nb6", "Nc3", "Bg7"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            3: "...Nf6 атакует пешку d5 фигурами, а не ферзём.",
            7: "...g6 готовит фианкетто и давление по диагонали.",
          }
        ),
        annotations: {
          3: {
            explanation: "...Nf6 атакует пешку d5 фигурами, а не ферзём.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "d5" },
            ],
            squares: ["f6", "d5"],
          },
          7: {
            explanation: "...g6 готовит фианкетто и давление по диагонали.",
            arrows: [
              { from: "g7", to: "g6" },
              { from: "f8", to: "g7" },
            ],
            squares: ["g6", "g7"],
          },
        },
      },
    ],
  },
  {
    id: "ruy-lopez",
    slug: "ruy-lopez",
    eco: "C60",
    title: "Испанская партия",
    side: "white",
    against: "1...e5",
    summary: "Испанская партия — классический дебют, где белые оказывают позиционное давление на центр чёрных.",
    variations: [
{
        id: "ruy-main",
        title: "Закрытый вариант",
        subtitle: "1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7",
        moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7"],
        explanations: makeExplanations(
          ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            4: "Слон b5 давит на коня c6, защитника пешки e5.",
            5: "...a6 задаёт вопрос слону и выигрывает пространство.",
            9: "Белые рокируют и готовят Re1, c3 и d4.",
          }
        ),
        annotations: {
          4: {
            explanation: "Слон b5 давит на коня c6, защитника пешки e5.",
            arrows: [
              { from: "f1", to: "b5" },
              { from: "b5", to: "c6" },
            ],
            squares: ["b5", "c6", "e5"],
          },
          5: {
            explanation: "...a6 задаёт вопрос слону и выигрывает пространство.",
            arrows: [
              { from: "a7", to: "a6" },
            ],
            squares: ["a6", "b5"],
          },
          9: {
            explanation: "Белые рокируют и готовят Re1, c3 и d4.",
            arrows: [
              { from: "e1", to: "g1" },
            ],
            squares: ["g1", "e1"],
          },
        },
      },
{
        id: "ruy-exchange",
        title: "Разменный вариант",
        subtitle: "1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Bxc6 dxc6 5.O-O f6 6.d4 exd4 7.Nxd4",
        moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Bxc6", "dxc6", "O-O", "f6", "d4", "exd4", "Nxd4"],
        explanations: makeExplanations(
          ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Bxc6", "dxc6", "O-O", "f6", "d4", "exd4", "Nxd4"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            6: "Белые меняют слона на коня, повреждая структуру чёрных.",
            7: "...dxc6 восстанавливает материал, но создаёт сдвоенные пешки.",
          }
        ),
        annotations: {
          6: {
            explanation: "Белые меняют слона на коня, повреждая структуру чёрных.",
            arrows: [
              { from: "b5", to: "c6" },
            ],
            squares: ["c6"],
          },
          7: {
            explanation: "...dxc6 восстанавливает материал, но создаёт сдвоенные пешки.",
            arrows: [
              { from: "d7", to: "c6" },
            ],
            squares: ["c6", "c7"],
          },
        },
      },
{
        id: "ruy-berlin",
        title: "Берлинская защита",
        subtitle: "1.e4 e5 2.Nf3 Nc6 3.Bb5 Nf6 4.O-O Nxe4 5.d4 Nd6 6.Bxc6 dxc6",
        moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6", "O-O", "Nxe4", "d4", "Nd6", "Bxc6", "dxc6"],
        explanations: makeExplanations(
          ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6", "O-O", "Nxe4", "d4", "Nd6", "Bxc6", "dxc6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            5: "...Nf6 атакует e4 и вводит Берлинскую защиту.",
            7: "Чёрные временно забирают пешку e4.",
          }
        ),
        annotations: {
          5: {
            explanation: "...Nf6 атакует e4 и вводит Берлинскую защиту.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          7: {
            explanation: "Чёрные временно забирают пешку e4.",
            arrows: [
              { from: "f6", to: "e4" },
            ],
            squares: ["e4"],
          },
        },
      },
    ],
  },
  {
    id: "italian-game",
    slug: "italian-game",
    eco: "C50",
    title: "Итальянская партия",
    side: "white",
    against: "1...e5",
    summary: "Итальянская партия сочетает быстрое развитие, давление на f7 и классическую борьбу за центр.",
    variations: [
{
        id: "italian-main",
        title: "Тихая итальянская",
        subtitle: "1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d4 exd4 6.cxd4",
        moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d4", "exd4", "cxd4"],
        explanations: makeExplanations(
          ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d4", "exd4", "cxd4"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            4: "Слон c4 сразу смотрит на слабое поле f7.",
            6: "c3 готовит продвижение d4.",
          }
        ),
        annotations: {
          4: {
            explanation: "Слон c4 сразу смотрит на слабое поле f7.",
            arrows: [
              { from: "f1", to: "c4" },
              { from: "c4", to: "f7" },
            ],
            squares: ["c4", "f7"],
          },
          6: {
            explanation: "c3 готовит продвижение d4.",
            arrows: [
              { from: "c2", to: "c3" },
              { from: "d2", to: "d4" },
            ],
            squares: ["c3", "d4"],
          },
        },
      },
{
        id: "italian-evans",
        title: "Гамбит Эванса",
        subtitle: "1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O",
        moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "b4", "Bxb4", "c3", "Ba5", "d4", "exd4", "O-O"],
        explanations: makeExplanations(
          ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "b4", "Bxb4", "c3", "Ba5", "d4", "exd4", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            6: "b4 — жертва пешки ради темпа и центра.",
            8: "c3 атакует слона и готовит d4.",
            12: "Рокировка завершает развитие и усиливает инициативу.",
          }
        ),
        annotations: {
          6: {
            explanation: "b4 — жертва пешки ради темпа и центра.",
            arrows: [
              { from: "b2", to: "b4" },
              { from: "b4", to: "c5" },
            ],
            squares: ["b4", "c5"],
          },
          8: {
            explanation: "c3 атакует слона и готовит d4.",
            arrows: [
              { from: "c2", to: "c3" },
              { from: "d2", to: "d4" },
            ],
            squares: ["c3", "d4"],
          },
          12: {
            explanation: "Рокировка завершает развитие и усиливает инициативу.",
            arrows: [
              { from: "e1", to: "g1" },
            ],
            squares: ["g1"],
          },
        },
      },
    ],
  },
  {
    id: "scotch-game",
    slug: "scotch-game",
    eco: "C44",
    title: "Шотландская партия",
    side: "white",
    against: "1...e5",
    summary: "Шотландская партия рано вскрывает центр и ведёт к активной фигурной игре.",
    variations: [
{
        id: "scotch-main",
        title: "Основной вариант",
        subtitle: "1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4 Nf6 5.Nc3 Bb4",
        moves: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Nxd4", "Nf6", "Nc3", "Bb4"],
        explanations: makeExplanations(
          ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Nxd4", "Nf6", "Nc3", "Bb4"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            4: "d4 сразу вскрывает центр.",
            7: "Конь d4 занимает активную центральную позицию.",
          }
        ),
        annotations: {
          4: {
            explanation: "d4 сразу вскрывает центр.",
            arrows: [
              { from: "d2", to: "d4" },
              { from: "d4", to: "e5" },
            ],
            squares: ["d4", "e5"],
          },
          7: {
            explanation: "Конь d4 занимает активную центральную позицию.",
            arrows: [
              { from: "f3", to: "d4" },
            ],
            squares: ["d4"],
          },
        },
      },
{
        id: "scotch-mieses",
        title: "Вариант Мизеса",
        subtitle: "1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4 Nf6 5.Nxc6 bxc6 6.e5 Qe7 7.Qe2 Nd5",
        moves: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Nxd4", "Nf6", "Nxc6", "bxc6", "e5", "Qe7", "Qe2", "Nd5"],
        explanations: makeExplanations(
          ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Nxd4", "Nf6", "Nxc6", "bxc6", "e5", "Qe7", "Qe2", "Nd5"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            8: "Белые меняют коня, чтобы изменить структуру чёрных.",
            10: "e5 оттесняет коня и выигрывает пространство.",
            13: "Конь d5 блокирует центр и защищает важные поля.",
          }
        ),
        annotations: {
          8: {
            explanation: "Белые меняют коня, чтобы изменить структуру чёрных.",
            arrows: [
              { from: "d4", to: "c6" },
            ],
            squares: ["c6"],
          },
          10: {
            explanation: "e5 оттесняет коня и выигрывает пространство.",
            arrows: [
              { from: "e4", to: "e5" },
            ],
            squares: ["e5", "f6"],
          },
          13: {
            explanation: "Конь d5 блокирует центр и защищает важные поля.",
            arrows: [
              { from: "f6", to: "d5" },
            ],
            squares: ["d5"],
          },
        },
      },
    ],
  },
  {
    id: "queens-gambit",
    slug: "queens-gambit",
    eco: "D06",
    title: "Ферзевый гамбит",
    side: "white",
    against: "1...d5",
    summary: "Ферзевый гамбит позволяет белым бороться за центр и пространство на стратегической основе.",
    variations: [
{
        id: "qg-declined",
        title: "Отказанный ферзевый гамбит",
        subtitle: "1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Be7 5.e3 O-O",
        moves: ["d4", "d5", "c4", "e6", "Nc3", "Nf6", "Bg5", "Be7", "e3", "O-O"],
        explanations: makeExplanations(
          ["d4", "d5", "c4", "e6", "Nc3", "Nf6", "Bg5", "Be7", "e3", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            2: "c4 давит на пешку d5 и начинает ферзевый гамбит.",
            3: "...e6 сохраняет пешку d5 и строит прочный центр.",
          }
        ),
        annotations: {
          2: {
            explanation: "c4 давит на пешку d5 и начинает ферзевый гамбит.",
            arrows: [
              { from: "c2", to: "c4" },
              { from: "c4", to: "d5" },
            ],
            squares: ["c4", "d5"],
          },
          3: {
            explanation: "...e6 сохраняет пешку d5 и строит прочный центр.",
            arrows: [
              { from: "e7", to: "e6" },
              { from: "e6", to: "d5" },
            ],
            squares: ["e6", "d5"],
          },
        },
      },
{
        id: "qg-accepted",
        title: "Принятый ферзевый гамбит",
        subtitle: "1.d4 d5 2.c4 dxc4 3.Nf3 Nf6 4.e3 e6 5.Bxc4 c5 6.O-O a6",
        moves: ["d4", "d5", "c4", "dxc4", "Nf3", "Nf6", "e3", "e6", "Bxc4", "c5", "O-O", "a6"],
        explanations: makeExplanations(
          ["d4", "d5", "c4", "dxc4", "Nf3", "Nf6", "e3", "e6", "Bxc4", "c5", "O-O", "a6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            3: "Чёрные принимают гамбит, но должны успеть развиться.",
            8: "Белые возвращают пешку и развивают слона.",
            9: "...c5 атакует центр белых.",
          }
        ),
        annotations: {
          3: {
            explanation: "Чёрные принимают гамбит, но должны успеть развиться.",
            arrows: [
              { from: "d5", to: "c4" },
            ],
            squares: ["c4"],
          },
          8: {
            explanation: "Белые возвращают пешку и развивают слона.",
            arrows: [
              { from: "f1", to: "c4" },
            ],
            squares: ["c4"],
          },
          9: {
            explanation: "...c5 атакует центр белых.",
            arrows: [
              { from: "c7", to: "c5" },
              { from: "c5", to: "d4" },
            ],
            squares: ["c5", "d4"],
          },
        },
      },
    ],
  },
  {
    id: "vienna-game",
    slug: "vienna-game",
    eco: "C25",
    title: "Венская партия",
    side: "white",
    against: "1...e5",
    summary: "Венская партия даёт белым гибкую схему с идеей раннего продвижения f4.",
    variations: [
{
        id: "vienna-main",
        title: "Схема с f4",
        subtitle: "1.e4 e5 2.Nc3 Nf6 3.Bc4 Bc5 4.d3 d6 5.f4",
        moves: ["e4", "e5", "Nc3", "Nf6", "Bc4", "Bc5", "d3", "d6", "f4"],
        explanations: makeExplanations(
          ["e4", "e5", "Nc3", "Nf6", "Bc4", "Bc5", "d3", "d6", "f4"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            2: "Nc3 сохраняет гибкость и поддерживает e4.",
            8: "f4 показывает атакующий план белых.",
          }
        ),
        annotations: {
          2: {
            explanation: "Nc3 сохраняет гибкость и поддерживает e4.",
            arrows: [
              { from: "b1", to: "c3" },
              { from: "c3", to: "e4" },
            ],
            squares: ["c3", "e4"],
          },
          8: {
            explanation: "f4 показывает атакующий план белых.",
            arrows: [
              { from: "f2", to: "f4" },
              { from: "f4", to: "e5" },
            ],
            squares: ["f4", "e5"],
          },
        },
      },
{
        id: "vienna-gambit",
        title: "Венский гамбит",
        subtitle: "1.e4 e5 2.Nc3 Nf6 3.f4 d5 4.fxe5 Nxe4 5.Nf3 Be7 6.d4 O-O",
        moves: ["e4", "e5", "Nc3", "Nf6", "f4", "d5", "fxe5", "Nxe4", "Nf3", "Be7", "d4", "O-O"],
        explanations: makeExplanations(
          ["e4", "e5", "Nc3", "Nf6", "f4", "d5", "fxe5", "Nxe4", "Nf3", "Be7", "d4", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            4: "f4 предлагает острую борьбу за центр и инициативу.",
            5: "...d5 — активный ответ чёрных по центру.",
          }
        ),
        annotations: {
          4: {
            explanation: "f4 предлагает острую борьбу за центр и инициативу.",
            arrows: [
              { from: "f2", to: "f4" },
              { from: "f4", to: "e5" },
            ],
            squares: ["f4", "e5"],
          },
          5: {
            explanation: "...d5 — активный ответ чёрных по центру.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "e4" },
            ],
            squares: ["d5", "e4"],
          },
        },
      },
    ],
  },
  {
    id: "kings-gambit",
    slug: "kings-gambit",
    eco: "C30",
    title: "Королевский гамбит",
    side: "white",
    against: "1...e5",
    summary: "Королевский гамбит — острый дебют, где белые жертвуют пешку ради инициативы и атаки.",
    variations: [
{
        id: "kg-accepted",
        title: "Принятый гамбит",
        subtitle: "1.e4 e5 2.f4 exf4 3.Nf3 g5 4.Bc4 Bg7",
        moves: ["e4", "e5", "f4", "exf4", "Nf3", "g5", "Bc4", "Bg7"],
        explanations: makeExplanations(
          ["e4", "e5", "f4", "exf4", "Nf3", "g5", "Bc4", "Bg7"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            2: "f4 — жертва пешки ради вскрытия линии f.",
            3: "Чёрные принимают гамбит и забирают пешку.",
            6: "Слон c4 нацелен на слабое поле f7.",
          }
        ),
        annotations: {
          2: {
            explanation: "f4 — жертва пешки ради вскрытия линии f.",
            arrows: [
              { from: "f2", to: "f4" },
              { from: "f4", to: "e5" },
            ],
            squares: ["f4", "e5"],
          },
          3: {
            explanation: "Чёрные принимают гамбит и забирают пешку.",
            arrows: [
              { from: "e5", to: "f4" },
            ],
            squares: ["f4"],
          },
          6: {
            explanation: "Слон c4 нацелен на слабое поле f7.",
            arrows: [
              { from: "f1", to: "c4" },
              { from: "c4", to: "f7" },
            ],
            squares: ["c4", "f7"],
          },
        },
      },
{
        id: "kg-declined",
        title: "Отказанный гамбит",
        subtitle: "1.e4 e5 2.f4 Bc5 3.Nf3 d6 4.c3 Nf6 5.d4 exd4 6.cxd4 Bb6",
        moves: ["e4", "e5", "f4", "Bc5", "Nf3", "d6", "c3", "Nf6", "d4", "exd4", "cxd4", "Bb6"],
        explanations: makeExplanations(
          ["e4", "e5", "f4", "Bc5", "Nf3", "d6", "c3", "Nf6", "d4", "exd4", "cxd4", "Bb6"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            3: "...Bc5 отказывается от пешки и давит на f2.",
            8: "d4 вскрывает центр, пока белые развиты активнее.",
          }
        ),
        annotations: {
          3: {
            explanation: "...Bc5 отказывается от пешки и давит на f2.",
            arrows: [
              { from: "f8", to: "c5" },
              { from: "c5", to: "f2" },
            ],
            squares: ["c5", "f2"],
          },
          8: {
            explanation: "d4 вскрывает центр, пока белые развиты активнее.",
            arrows: [
              { from: "d2", to: "d4" },
            ],
            squares: ["d4", "e5"],
          },
        },
      },
    ],
  },
  {
    id: "danish-gambit",
    slug: "danish-gambit",
    eco: "C21",
    title: "Северный гамбит",
    side: "white",
    against: "1...e5",
    summary: "Северный гамбит жертвует пешки ради быстрого развития и открытых диагоналей для слонов.",
    variations: [
{
        id: "danish-main",
        title: "Двойная жертва пешек",
        subtitle: "1.e4 e5 2.d4 exd4 3.c3 dxc3 4.Bc4 cxb2 5.Bxb2",
        moves: ["e4", "e5", "d4", "exd4", "c3", "dxc3", "Bc4", "cxb2", "Bxb2"],
        explanations: makeExplanations(
          ["e4", "e5", "d4", "exd4", "c3", "dxc3", "Bc4", "cxb2", "Bxb2"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            4: "c3 предлагает вторую пешку ради быстрого развития.",
            6: "Слон c4 быстро выходит на активную диагональ.",
            8: "Слон b2 получает мощную диагональ на короля.",
          }
        ),
        annotations: {
          4: {
            explanation: "c3 предлагает вторую пешку ради быстрого развития.",
            arrows: [
              { from: "c2", to: "c3" },
              { from: "c3", to: "d4" },
            ],
            squares: ["c3", "d4"],
          },
          6: {
            explanation: "Слон c4 быстро выходит на активную диагональ.",
            arrows: [
              { from: "f1", to: "c4" },
              { from: "c4", to: "f7" },
            ],
            squares: ["c4", "f7"],
          },
          8: {
            explanation: "Слон b2 получает мощную диагональ на короля.",
            arrows: [
              { from: "c1", to: "b2" },
              { from: "b2", to: "g7" },
            ],
            squares: ["b2", "g7"],
          },
        },
      },
{
        id: "danish-declined",
        title: "Отклонённый вариант",
        subtitle: "1.e4 e5 2.d4 exd4 3.c3 d5 4.exd5 Qxd5 5.cxd4 Nc6 6.Nf3 Bg4",
        moves: ["e4", "e5", "d4", "exd4", "c3", "d5", "exd5", "Qxd5", "cxd4", "Nc6", "Nf3", "Bg4"],
        explanations: makeExplanations(
          ["e4", "e5", "d4", "exd4", "c3", "d5", "exd5", "Qxd5", "cxd4", "Nc6", "Nf3", "Bg4"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            5: "...d5 возвращает удар в центр и снижает атакующий потенциал белых.",
            9: "...Nc6 развивается с темпом на ферзя и центр.",
          }
        ),
        annotations: {
          5: {
            explanation: "...d5 возвращает удар в центр и снижает атакующий потенциал белых.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "e4" },
            ],
            squares: ["d5", "e4"],
          },
          9: {
            explanation: "...Nc6 развивается с темпом на ферзя и центр.",
            arrows: [
              { from: "b8", to: "c6" },
            ],
            squares: ["c6", "d4"],
          },
        },
      },
    ],
  },
  {
    id: "pirc-defense",
    slug: "pirc-defense",
    eco: "B07",
    title: "Защита Пирца-Уфимцева",
    side: "black",
    against: "1.e4",
    summary: "Защита Пирца-Уфимцева позволяет белым занять центр, чтобы затем атаковать его фигурами с фланга.",
    variations: [
{
        id: "pirc-main",
        title: "Базовая схема",
        subtitle: "1.e4 d6 2.d4 Nf6 3.Nc3 g6 4.Nf3 Bg7 5.Be2 O-O",
        moves: ["e4", "d6", "d4", "Nf6", "Nc3", "g6", "Nf3", "Bg7", "Be2", "O-O"],
        explanations: makeExplanations(
          ["e4", "d6", "d4", "Nf6", "Nc3", "g6", "Nf3", "Bg7", "Be2", "O-O"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            1: "...d6 готовит гибкую защиту и не раскрывает центр слишком рано.",
            5: "...g6 готовит фианкетто слона.",
            9: "Рокировка завершает начальную расстановку.",
          }
        ),
        annotations: {
          1: {
            explanation: "...d6 готовит гибкую защиту и не раскрывает центр слишком рано.",
            arrows: [
              { from: "d7", to: "d6" },
            ],
            squares: ["d6", "e5"],
          },
          5: {
            explanation: "...g6 готовит фианкетто слона.",
            arrows: [
              { from: "g7", to: "g6" },
              { from: "f8", to: "g7" },
            ],
            squares: ["g6", "g7"],
          },
          9: {
            explanation: "Рокировка завершает начальную расстановку.",
            arrows: [
              { from: "e8", to: "g8" },
            ],
            squares: ["g8"],
          },
        },
      },
{
        id: "pirc-austrian",
        title: "Австрийская атака",
        subtitle: "1.e4 d6 2.d4 Nf6 3.Nc3 g6 4.f4 Bg7 5.Nf3 O-O 6.Bd3 c5",
        moves: ["e4", "d6", "d4", "Nf6", "Nc3", "g6", "f4", "Bg7", "Nf3", "O-O", "Bd3", "c5"],
        explanations: makeExplanations(
          ["e4", "d6", "d4", "Nf6", "Nc3", "g6", "f4", "Bg7", "Nf3", "O-O", "Bd3", "c5"],
          "Этот ход продолжает основную идею выбранного варианта и помогает перейти к удобной дебютной расстановке.",
          {
            6: "Белые играют f4 и строят мощный пешечный центр.",
            11: "...c5 — контрудар по белому центру.",
          }
        ),
        annotations: {
          6: {
            explanation: "Белые играют f4 и строят мощный пешечный центр.",
            arrows: [
              { from: "f2", to: "f4" },
            ],
            squares: ["f4", "e5"],
          },
          11: {
            explanation: "...c5 — контрудар по белому центру.",
            arrows: [
              { from: "c7", to: "c5" },
              { from: "c5", to: "d4" },
            ],
            squares: ["c5", "d4"],
          },
        },
      },
    ],
  },
];
