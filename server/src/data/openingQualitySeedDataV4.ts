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

export const OPENING_QUALITY_SEEDS_V4: OpeningQualitySeed[] = [
  {
    slug: "petrov-defense",
    eco: "C43",
    title: "Русская партия",
    side: "black",
    against: "1.e4",
    summary:
      "Русская партия — симметричная и надёжная защита, где чёрные сразу контратакуют пешку e4 ходом ...Nf6.",
    variations: [
      {
        key: "petrov-classical",
        title: "Классическая линия",
        subtitle: "1.e4 e5 2.Nf3 Nf6 3.Nxe5 d6 4.Nf3 Nxe4 5.d4 d5",
        orderIndex: 1000,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр и открывают линии для фигур.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4", "d5", "f5"],
          },
          {
            san: "e5",
            explanation: "Чёрные отвечают симметрично и удерживают центральное равновесие.",
            arrows: [{ from: "e7", to: "e5" }],
            squares: ["e5", "d4", "f4"],
          },
          {
            san: "Nf3",
            explanation: "Конь f3 атакует пешку e5 и готовит рокировку.",
            arrows: [
              { from: "g1", to: "f3" },
              { from: "f3", to: "e5" },
            ],
            squares: ["f3", "e5"],
          },
          {
            san: "Nf6",
            explanation: "Главная идея Русской партии: чёрные не защищают e5, а контратакуют e4.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          {
            san: "Nxe5",
            explanation: "Белые забирают e5, принимая симметричную борьбу.",
            arrows: [{ from: "f3", to: "e5" }],
            squares: ["e5"],
          },
          {
            san: "d6",
            explanation: "Чёрные сначала прогоняют коня e5 и только потом возвращают пешку.",
            arrows: [
              { from: "d7", to: "d6" },
              { from: "d6", to: "e5" },
            ],
            squares: ["d6", "e5"],
          },
          {
            san: "Nf3",
            explanation: "Конь возвращается на f3, сохраняя развитие и контроль центра.",
            arrows: [{ from: "e5", to: "f3" }],
            squares: ["f3", "e5"],
          },
          {
            san: "Nxe4",
            explanation: "Чёрные возвращают пешку e4 и получают равную активную позицию.",
            arrows: [{ from: "f6", to: "e4" }],
            squares: ["e4", "d2", "f2"],
          },
          {
            san: "d4",
            explanation: "Белые атакуют коня e4 и строят сильный центр.",
            arrows: [
              { from: "d2", to: "d4" },
              { from: "d4", to: "e5" },
            ],
            squares: ["d4", "e4"],
          },
          {
            san: "d5",
            explanation: "Чёрные закрепляют коня и создают симметричный центр.",
            arrows: [
              { from: "d6", to: "d5" },
              { from: "d5", to: "e4" },
            ],
            squares: ["d5", "e4"],
          },
        ],
      },
      {
        key: "petrov-modern",
        title: "Современная линия с d4",
        subtitle: "1.e4 e5 2.Nf3 Nf6 3.d4 Nxe4 4.Bd3 d5 5.Nxe5",
        orderIndex: 1001,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "e5",
            explanation: "Чёрные отвечают в центре.",
            arrows: [{ from: "e7", to: "e5" }],
            squares: ["e5"],
          },
          {
            san: "Nf3",
            explanation: "Конь f3 атакует e5.",
            arrows: [
              { from: "g1", to: "f3" },
              { from: "f3", to: "e5" },
            ],
            squares: ["f3", "e5"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные контратакуют e4 — характерный знак Русской партии.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          {
            san: "d4",
            explanation: "Белые сразу вскрывают центр и избегают простой симметрии.",
            arrows: [
              { from: "d2", to: "d4" },
              { from: "d4", to: "e5" },
            ],
            squares: ["d4", "e5"],
          },
          {
            san: "Nxe4",
            explanation: "Чёрные принимают вызов и забирают центральную пешку.",
            arrows: [{ from: "f6", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "Bd3",
            explanation: "Слон d3 атакует коня e4 и помогает белым быстро развиваться.",
            arrows: [
              { from: "f1", to: "d3" },
              { from: "d3", to: "e4" },
            ],
            squares: ["d3", "e4"],
          },
          {
            san: "d5",
            explanation: "Чёрные поддерживают коня e4 и занимают центр.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "e4" },
            ],
            squares: ["d5", "e4"],
          },
          {
            san: "Nxe5",
            explanation: "Белые забирают e5 и усиливают давление в центре.",
            arrows: [{ from: "f3", to: "e5" }],
            squares: ["e5", "d7"],
          },
        ],
      },
    ],
  },
  {
    slug: "scotch-game",
    eco: "C44",
    title: "Шотландская партия",
    side: "white",
    against: "1...e5",
    summary:
      "Шотландская партия рано вскрывает центр ходом d4 и ведёт к активной фигурной игре.",
    variations: [
      {
        key: "scotch-main",
        title: "Главная линия",
        subtitle: "1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4 Nf6 5.Nc3",
        orderIndex: 1000,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр и открывают линии для фигур.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4", "d5"],
          },
          {
            san: "e5",
            explanation: "Чёрные отвечают симметрично.",
            arrows: [{ from: "e7", to: "e5" }],
            squares: ["e5", "d4"],
          },
          {
            san: "Nf3",
            explanation: "Конь f3 атакует e5 и развивает фигуру.",
            arrows: [
              { from: "g1", to: "f3" },
              { from: "f3", to: "e5" },
            ],
            squares: ["f3", "e5"],
          },
          {
            san: "Nc6",
            explanation: "Чёрные защищают e5 и развивают коня.",
            arrows: [
              { from: "b8", to: "c6" },
              { from: "c6", to: "e5" },
            ],
            squares: ["c6", "e5"],
          },
          {
            san: "d4",
            explanation: "Ключевой ход Шотландской партии: белые сразу вскрывают центр.",
            arrows: [
              { from: "d2", to: "d4" },
              { from: "d4", to: "e5" },
            ],
            squares: ["d4", "e5"],
          },
          {
            san: "exd4",
            explanation: "Чёрные принимают размен и открывают линии в центре.",
            arrows: [{ from: "e5", to: "d4" }],
            squares: ["d4"],
          },
          {
            san: "Nxd4",
            explanation: "Белые централизуют коня и получают активную фигуру.",
            arrows: [{ from: "f3", to: "d4" }],
            squares: ["d4", "c6"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные атакуют e4 и развиваются с темпом.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          {
            san: "Nc3",
            explanation: "Белые защищают e4 и усиливают контроль d5.",
            arrows: [
              { from: "b1", to: "c3" },
              { from: "c3", to: "d5" },
            ],
            squares: ["c3", "d5", "e4"],
          },
        ],
      },
      {
        key: "scotch-gambit",
        title: "Шотландский гамбит",
        subtitle: "1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Bc4",
        orderIndex: 1001,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "e5",
            explanation: "Чёрные удерживают центр.",
            arrows: [{ from: "e7", to: "e5" }],
            squares: ["e5"],
          },
          {
            san: "Nf3",
            explanation: "Конь атакует e5.",
            arrows: [
              { from: "g1", to: "f3" },
              { from: "f3", to: "e5" },
            ],
            squares: ["f3", "e5"],
          },
          {
            san: "Nc6",
            explanation: "Чёрные защищают e5.",
            arrows: [
              { from: "b8", to: "c6" },
              { from: "c6", to: "e5" },
            ],
            squares: ["c6", "e5"],
          },
          {
            san: "d4",
            explanation: "Белые вскрывают центр и готовы жертвовать пешку ради развития.",
            arrows: [
              { from: "d2", to: "d4" },
              { from: "d4", to: "e5" },
            ],
            squares: ["d4", "e5"],
          },
          {
            san: "exd4",
            explanation: "Чёрные принимают пешку d4.",
            arrows: [{ from: "e5", to: "d4" }],
            squares: ["d4"],
          },
          {
            san: "Bc4",
            explanation: "Белые не возвращают пешку сразу, а развивают слона с давлением на f7.",
            arrows: [
              { from: "f1", to: "c4" },
              { from: "c4", to: "f7" },
            ],
            squares: ["c4", "f7"],
          },
        ],
      },
    ],
  },
  {
    slug: "center-game",
    eco: "C21",
    title: "Центральный дебют",
    side: "white",
    against: "1...e5",
    summary:
      "Центральный дебют быстро открывает центр ходом d4 и выводит ферзя в активную позицию.",
    variations: [
      {
        key: "center-main",
        title: "Классическая линия",
        subtitle: "1.e4 e5 2.d4 exd4 3.Qxd4 Nc6 4.Qe3",
        orderIndex: 1000,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр и открывают линии.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4", "d5"],
          },
          {
            san: "e5",
            explanation: "Чёрные отвечают симметрично.",
            arrows: [{ from: "e7", to: "e5" }],
            squares: ["e5", "d4"],
          },
          {
            san: "d4",
            explanation: "Белые немедленно вскрывают центр вторым ходом.",
            arrows: [
              { from: "d2", to: "d4" },
              { from: "d4", to: "e5" },
            ],
            squares: ["d4", "e5"],
          },
          {
            san: "exd4",
            explanation: "Чёрные принимают центральный размен.",
            arrows: [{ from: "e5", to: "d4" }],
            squares: ["d4"],
          },
          {
            san: "Qxd4",
            explanation: "Ферзь возвращает пешку, но становится целью развития чёрных.",
            arrows: [{ from: "d1", to: "d4" }],
            squares: ["d4", "c6"],
          },
          {
            san: "Nc6",
            explanation: "Чёрные развивают коня с темпом, нападая на ферзя.",
            arrows: [
              { from: "b8", to: "c6" },
              { from: "c6", to: "d4" },
            ],
            squares: ["c6", "d4"],
          },
          {
            san: "Qe3",
            explanation: "Ферзь отходит на e3, сохраняя давление и поддерживая рокировку в длинную сторону.",
            arrows: [{ from: "d4", to: "e3" }],
            squares: ["e3", "e-file"],
          },
        ],
      },
      {
        key: "center-paulsen",
        title: "С отступлением Qe3",
        subtitle: "1.e4 e5 2.d4 exd4 3.Qxd4 Nc6 4.Qe3 Nf6 5.Nc3 Bb4",
        orderIndex: 1001,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "e5",
            explanation: "Чёрные отвечают в центре.",
            arrows: [{ from: "e7", to: "e5" }],
            squares: ["e5"],
          },
          {
            san: "d4",
            explanation: "Белые вскрывают центр.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "e5"],
          },
          {
            san: "exd4",
            explanation: "Чёрные снимают напряжение.",
            arrows: [{ from: "e5", to: "d4" }],
            squares: ["d4"],
          },
          {
            san: "Qxd4",
            explanation: "Ферзь забирает d4 и временно выходит рано.",
            arrows: [{ from: "d1", to: "d4" }],
            squares: ["d4"],
          },
          {
            san: "Nc6",
            explanation: "Конь c6 нападает на ферзя и развивается с темпом.",
            arrows: [
              { from: "b8", to: "c6" },
              { from: "c6", to: "d4" },
            ],
            squares: ["c6", "d4"],
          },
          {
            san: "Qe3",
            explanation: "Ферзь сохраняет активность и поддерживает e4.",
            arrows: [{ from: "d4", to: "e3" }],
            squares: ["e3", "e4"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные атакуют e4 и продолжают развитие.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          {
            san: "Nc3",
            explanation: "Белые защищают e4 и развивают коня.",
            arrows: [
              { from: "b1", to: "c3" },
              { from: "c3", to: "e4" },
            ],
            squares: ["c3", "e4"],
          },
          {
            san: "Bb4",
            explanation: "Слон b4 связывает коня c3 и усиливает давление на e4.",
            arrows: [
              { from: "f8", to: "b4" },
              { from: "b4", to: "c3" },
            ],
            squares: ["b4", "c3", "e4"],
          },
        ],
      },
    ],
  },
  {
    slug: "danish-gambit",
    eco: "C21",
    title: "Северный гамбит",
    side: "white",
    against: "1...e5",
    summary:
      "Северный гамбит жертвует одну или две пешки ради быстрого развития и открытых диагоналей для слонов.",
    variations: [
      {
        key: "danish-main",
        title: "Классический гамбит",
        subtitle: "1.e4 e5 2.d4 exd4 3.c3 dxc3 4.Bc4 cxb2 5.Bxb2",
        orderIndex: 1000,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр и открывают линии.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "e5",
            explanation: "Чёрные отвечают симметрично.",
            arrows: [{ from: "e7", to: "e5" }],
            squares: ["e5"],
          },
          {
            san: "d4",
            explanation: "Белые вскрывают центр и готовят гамбит.",
            arrows: [
              { from: "d2", to: "d4" },
              { from: "d4", to: "e5" },
            ],
            squares: ["d4", "e5"],
          },
          {
            san: "exd4",
            explanation: "Чёрные принимают первую пешку.",
            arrows: [{ from: "e5", to: "d4" }],
            squares: ["d4"],
          },
          {
            san: "c3",
            explanation: "Белые предлагают вторую пешку ради открытия диагоналей.",
            arrows: [
              { from: "c2", to: "c3" },
              { from: "c3", to: "d4" },
            ],
            squares: ["c3", "d4"],
          },
          {
            san: "dxc3",
            explanation: "Чёрные принимают гамбит, но отстают в развитии.",
            arrows: [{ from: "d4", to: "c3" }],
            squares: ["c3"],
          },
          {
            san: "Bc4",
            explanation: "Слон c4 выходит с давлением на f7.",
            arrows: [
              { from: "f1", to: "c4" },
              { from: "c4", to: "f7" },
            ],
            squares: ["c4", "f7"],
          },
          {
            san: "cxb2",
            explanation: "Чёрные берут вторую пешку, но открывают слону c1 диагональ.",
            arrows: [{ from: "c3", to: "b2" }],
            squares: ["b2", "a1", "h8"],
          },
          {
            san: "Bxb2",
            explanation: "Слон b2 занимает большую диагональ и создаёт сильное давление на g7.",
            arrows: [
              { from: "c1", to: "b2" },
              { from: "b2", to: "g7" },
            ],
            squares: ["b2", "g7"],
          },
        ],
      },
      {
        key: "danish-declined",
        title: "Отклонённый гамбит",
        subtitle: "1.e4 e5 2.d4 exd4 3.c3 d5 4.exd5 Qxd5",
        orderIndex: 1001,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "e5",
            explanation: "Чёрные отвечают в центре.",
            arrows: [{ from: "e7", to: "e5" }],
            squares: ["e5"],
          },
          {
            san: "d4",
            explanation: "Белые вскрывают центр.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "e5"],
          },
          {
            san: "exd4",
            explanation: "Чёрные принимают первую пешку.",
            arrows: [{ from: "e5", to: "d4" }],
            squares: ["d4"],
          },
          {
            san: "c3",
            explanation: "Белые предлагают гамбитную пешку c3.",
            arrows: [
              { from: "c2", to: "c3" },
              { from: "c3", to: "d4" },
            ],
            squares: ["c3", "d4"],
          },
          {
            san: "d5",
            explanation: "Чёрные не жадничают, а отвечают центральным контрударом.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "e4" },
            ],
            squares: ["d5", "e4"],
          },
          {
            san: "exd5",
            explanation: "Белые принимают размен и открывают центр.",
            arrows: [{ from: "e4", to: "d5" }],
            squares: ["d5"],
          },
          {
            san: "Qxd5",
            explanation: "Ферзь возвращает пешку d5, и чёрные получают более спокойную игру.",
            arrows: [{ from: "d8", to: "d5" }],
            squares: ["d5", "b5"],
          },
        ],
      },
    ],
  },
  {
    slug: "philidor-defense",
    eco: "C41",
    title: "Защита Филидора",
    side: "black",
    against: "1.e4",
    summary:
      "Защита Филидора — спокойная и прочная система против 1.e4 с ранним ...d6.",
    variations: [
      {
        key: "philidor-main",
        title: "Классическая схема",
        subtitle: "1.e4 e5 2.Nf3 d6 3.d4 Nf6 4.Nc3 Nbd7",
        orderIndex: 1000,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "e5",
            explanation: "Чёрные отвечают симметрично.",
            arrows: [{ from: "e7", to: "e5" }],
            squares: ["e5"],
          },
          {
            san: "Nf3",
            explanation: "Конь атакует e5.",
            arrows: [
              { from: "g1", to: "f3" },
              { from: "f3", to: "e5" },
            ],
            squares: ["f3", "e5"],
          },
          {
            san: "d6",
            explanation: "Главная идея Филидора: чёрные укрепляют e5 пешкой d6.",
            arrows: [
              { from: "d7", to: "d6" },
              { from: "d6", to: "e5" },
            ],
            squares: ["d6", "e5"],
          },
          {
            san: "d4",
            explanation: "Белые атакуют центр и стараются вскрыть позицию.",
            arrows: [
              { from: "d2", to: "d4" },
              { from: "d4", to: "e5" },
            ],
            squares: ["d4", "e5"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные развивают коня и атакуют e4.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          {
            san: "Nc3",
            explanation: "Белые защищают e4 и усиливают центр.",
            arrows: [
              { from: "b1", to: "c3" },
              { from: "c3", to: "e4" },
            ],
            squares: ["c3", "e4"],
          },
          {
            san: "Nbd7",
            explanation: "Конь d7 поддерживает f6 и e5, сохраняя компактную структуру.",
            arrows: [
              { from: "b8", to: "d7" },
              { from: "d7", to: "e5" },
            ],
            squares: ["d7", "e5"],
          },
        ],
      },
      {
        key: "philidor-hanham",
        title: "Система Хэнема",
        subtitle: "1.e4 e5 2.Nf3 d6 3.d4 Nd7 4.Bc4 c6 5.O-O Be7",
        orderIndex: 1001,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "e5",
            explanation: "Чёрные отвечают центральной пешкой.",
            arrows: [{ from: "e7", to: "e5" }],
            squares: ["e5"],
          },
          {
            san: "Nf3",
            explanation: "Белые атакуют e5.",
            arrows: [
              { from: "g1", to: "f3" },
              { from: "f3", to: "e5" },
            ],
            squares: ["f3", "e5"],
          },
          {
            san: "d6",
            explanation: "Чёрные надёжно защищают e5.",
            arrows: [
              { from: "d7", to: "d6" },
              { from: "d6", to: "e5" },
            ],
            squares: ["d6", "e5"],
          },
          {
            san: "d4",
            explanation: "Белые атакуют центр.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "e5"],
          },
          {
            san: "Nd7",
            explanation: "Чёрные строят плотную схему без раннего размена в центре.",
            arrows: [
              { from: "b8", to: "d7" },
              { from: "d7", to: "f6" },
            ],
            squares: ["d7", "f6"],
          },
          {
            san: "Bc4",
            explanation: "Слон c4 давит на f7 и ускоряет развитие белых.",
            arrows: [
              { from: "f1", to: "c4" },
              { from: "c4", to: "f7" },
            ],
            squares: ["c4", "f7"],
          },
          {
            san: "c6",
            explanation: "Чёрные готовят ...Qc7 и укрепляют центральные поля.",
            arrows: [
              { from: "c7", to: "c6" },
              { from: "c6", to: "d5" },
            ],
            squares: ["c6", "d5"],
          },
          {
            san: "O-O",
            explanation: "Белые уводят короля в безопасность и готовят давление по центру.",
            arrows: [{ from: "e1", to: "g1" }],
            squares: ["g1"],
          },
          {
            san: "Be7",
            explanation: "Чёрные готовят рокировку и завершают компактную расстановку.",
            arrows: [
              { from: "f8", to: "e7" },
              { from: "e8", to: "g8" },
            ],
            squares: ["e7", "g8"],
          },
        ],
      },
    ],
  },
  {
    slug: "scandinavian-defense",
    eco: "B01",
    title: "Скандинавская защита",
    side: "black",
    against: "1.e4",
    summary:
      "Скандинавская защита сразу оспаривает пешку e4 ходом ...d5 и быстро открывает центр.",
    variations: [
      {
        key: "scandinavian-main",
        title: "Классический вариант с Qxd5",
        subtitle: "1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5 4.d4 Nf6",
        orderIndex: 1000,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "d5",
            explanation: "Скандинавская идея: чёрные сразу атакуют e4.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "e4" },
            ],
            squares: ["d5", "e4"],
          },
          {
            san: "exd5",
            explanation: "Белые принимают центральный размен.",
            arrows: [{ from: "e4", to: "d5" }],
            squares: ["d5"],
          },
          {
            san: "Qxd5",
            explanation: "Ферзь возвращает пешку, но становится целью развития белых.",
            arrows: [{ from: "d8", to: "d5" }],
            squares: ["d5", "c3"],
          },
          {
            san: "Nc3",
            explanation: "Белые развивают коня с темпом, нападая на ферзя d5.",
            arrows: [
              { from: "b1", to: "c3" },
              { from: "c3", to: "d5" },
            ],
            squares: ["c3", "d5"],
          },
          {
            san: "Qa5",
            explanation: "Ферзь отходит на a5, сохраняя давление на c3 и центр.",
            arrows: [
              { from: "d5", to: "a5" },
              { from: "a5", to: "c3" },
            ],
            squares: ["a5", "c3"],
          },
          {
            san: "d4",
            explanation: "Белые строят сильный центр и открывают слона c1.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "e5"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные развивают коня и атакуют e4/d5-поля.",
            arrows: [{ from: "g8", to: "f6" }],
            squares: ["f6", "e4", "d5"],
          },
        ],
      },
      {
        key: "scandinavian-modern",
        title: "Современная линия с Nf6",
        subtitle: "1.e4 d5 2.exd5 Nf6 3.d4 Nxd5 4.c4 Nb6",
        orderIndex: 1001,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "d5",
            explanation: "Чёрные немедленно оспаривают центр.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "e4" },
            ],
            squares: ["d5", "e4"],
          },
          {
            san: "exd5",
            explanation: "Белые забирают пешку d5.",
            arrows: [{ from: "e4", to: "d5" }],
            squares: ["d5"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные не выводят ферзя рано, а атакуют d5 конём.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "d5" },
            ],
            squares: ["f6", "d5"],
          },
          {
            san: "d4",
            explanation: "Белые укрепляют центр и поддерживают пешку d5.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "d5"],
          },
          {
            san: "Nxd5",
            explanation: "Чёрные возвращают пешку и развивают фигуру.",
            arrows: [{ from: "f6", to: "d5" }],
            squares: ["d5"],
          },
          {
            san: "c4",
            explanation: "Белые отгоняют коня d5 и получают пространство.",
            arrows: [
              { from: "c2", to: "c4" },
              { from: "c4", to: "d5" },
            ],
            squares: ["c4", "d5"],
          },
          {
            san: "Nb6",
            explanation: "Конь уходит на b6 и продолжает давить на c4/d5.",
            arrows: [{ from: "d5", to: "b6" }],
            squares: ["b6", "c4"],
          },
        ],
      },
    ],
  },
  {
    slug: "pirc-defense",
    eco: "B07",
    title: "Защита Пирца-Уфимцева",
    side: "black",
    against: "1.e4",
    summary:
      "Защита Пирца позволяет белым занять центр, чтобы затем атаковать его фигурами с фланга.",
    variations: [
      {
        key: "pirc-classical",
        title: "Классическая система",
        subtitle: "1.e4 d6 2.d4 Nf6 3.Nc3 g6 4.Nf3 Bg7 5.Be2 O-O",
        orderIndex: 1000,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "d6",
            explanation: "Чёрные готовят гибкую структуру и контролируют e5.",
            arrows: [
              { from: "d7", to: "d6" },
              { from: "d6", to: "e5" },
            ],
            squares: ["d6", "e5"],
          },
          {
            san: "d4",
            explanation: "Белые строят мощный центр e4-d4.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "e4"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные атакуют e4 и провоцируют белых защищать центр.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          {
            san: "Nc3",
            explanation: "Конь c3 защищает e4 и поддерживает d5.",
            arrows: [
              { from: "b1", to: "c3" },
              { from: "c3", to: "e4" },
            ],
            squares: ["c3", "e4"],
          },
          {
            san: "g6",
            explanation: "Чёрные готовят слона g7, который будет давить на центр.",
            arrows: [
              { from: "g7", to: "g6" },
              { from: "f8", to: "g7" },
            ],
            squares: ["g6", "g7"],
          },
          {
            san: "Nf3",
            explanation: "Белые развивают фигуру и укрепляют центр.",
            arrows: [{ from: "g1", to: "f3" }],
            squares: ["f3", "d4", "e5"],
          },
          {
            san: "Bg7",
            explanation: "Слон g7 становится главным защитником и атакующей фигурой чёрных.",
            arrows: [
              { from: "f8", to: "g7" },
              { from: "g7", to: "d4" },
            ],
            squares: ["g7", "d4"],
          },
          {
            san: "Be2",
            explanation: "Белые готовят рокировку и сохраняют крепкий центр.",
            arrows: [
              { from: "f1", to: "e2" },
              { from: "e1", to: "g1" },
            ],
            squares: ["e2", "g1"],
          },
          {
            san: "O-O",
            explanation: "Чёрные рокируют и готовят подрывы ...c5 или ...e5.",
            arrows: [{ from: "e8", to: "g8" }],
            squares: ["g8", "c5", "e5"],
          },
        ],
      },
      {
        key: "pirc-austrian",
        title: "Австрийская атака",
        subtitle: "1.e4 d6 2.d4 Nf6 3.Nc3 g6 4.f4 Bg7 5.Nf3 O-O",
        orderIndex: 1001,
        steps: [
          {
            san: "e4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "e2", to: "e4" }],
            squares: ["e4"],
          },
          {
            san: "d6",
            explanation: "Чёрные готовят гибкую защиту и контроль e5.",
            arrows: [{ from: "d7", to: "d6" }],
            squares: ["d6", "e5"],
          },
          {
            san: "d4",
            explanation: "Белые получают большой центр.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "e4"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные атакуют e4 фигурой.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          {
            san: "Nc3",
            explanation: "Белые защищают e4 и поддерживают центр.",
            arrows: [{ from: "b1", to: "c3" }],
            squares: ["c3", "e4"],
          },
          {
            san: "g6",
            explanation: "Чёрные готовят фианкетто слона.",
            arrows: [{ from: "g7", to: "g6" }],
            squares: ["g6", "g7"],
          },
          {
            san: "f4",
            explanation: "Австрийская атака: белые расширяются на королевском фланге и готовят e5.",
            arrows: [
              { from: "f2", to: "f4" },
              { from: "f4", to: "e5" },
            ],
            squares: ["f4", "e5"],
          },
          {
            san: "Bg7",
            explanation: "Слон g7 давит на d4 и поддерживает контригру.",
            arrows: [
              { from: "f8", to: "g7" },
              { from: "g7", to: "d4" },
            ],
            squares: ["g7", "d4"],
          },
          {
            san: "Nf3",
            explanation: "Белые укрепляют центр и готовят атаку.",
            arrows: [{ from: "g1", to: "f3" }],
            squares: ["f3", "e5"],
          },
          {
            san: "O-O",
            explanation: "Чёрные рокируют и должны быстро искать контрудар по центру.",
            arrows: [{ from: "e8", to: "g8" }],
            squares: ["g8", "c5", "e5"],
          },
        ],
      },
    ],
  },
];
