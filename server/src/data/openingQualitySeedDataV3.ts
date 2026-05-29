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

export const OPENING_QUALITY_SEEDS_V3: OpeningQualitySeed[] = [
  {
    slug: "catalan-opening",
    eco: "E00",
    title: "Каталонское начало",
    side: "white",
    against: "1...Nf6",
    summary:
      "Каталонское начало соединяет идеи ферзевого гамбита и фианкетто слона g2. Белые получают долговременное давление на центр и ферзевый фланг.",
    variations: [
      {
        key: "catalan-closed",
        title: "Закрытый каталон",
        subtitle: "1.d4 Nf6 2.c4 e6 3.g3 d5 4.Bg2 Be7 5.Nf3 O-O 6.O-O",
        orderIndex: 1000,
        steps: [
          {
            san: "d4",
            explanation: "Белые занимают центр и открывают дорогу слону c1.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "e5"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные развивают коня и контролируют поле e4.",
            arrows: [{ from: "g8", to: "f6" }],
            squares: ["f6", "e4"],
          },
          {
            san: "c4",
            explanation: "Белые атакуют d5 и готовят ферзевогамбитную структуру.",
            arrows: [
              { from: "c2", to: "c4" },
              { from: "c4", to: "d5" },
            ],
            squares: ["c4", "d5"],
          },
          {
            san: "e6",
            explanation: "Чёрные укрепляют будущий пункт d5 и готовят развитие слона.",
            arrows: [{ from: "e7", to: "e6" }],
            squares: ["e6", "d5"],
          },
          {
            san: "g3",
            explanation: "Белые готовят каталонского слона на g2 — главную фигуру давления.",
            arrows: [
              { from: "g2", to: "g3" },
              { from: "f1", to: "g2" },
            ],
            squares: ["g3", "g2"],
          },
          {
            san: "d5",
            explanation: "Чёрные занимают центр и переводят игру в закрытый каталон.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "c4" },
            ],
            squares: ["d5", "c4"],
          },
          {
            san: "Bg2",
            explanation: "Слон g2 давит по большой диагонали на b7 и центр чёрных.",
            arrows: [
              { from: "f1", to: "g2" },
              { from: "g2", to: "b7" },
            ],
            squares: ["g2", "b7", "d5"],
          },
          {
            san: "Be7",
            explanation: "Чёрные спокойно готовят короткую рокировку.",
            arrows: [
              { from: "f8", to: "e7" },
              { from: "e8", to: "g8" },
            ],
            squares: ["e7", "g8"],
          },
          {
            san: "Nf3",
            explanation: "Белые развивают коня, поддерживают d4 и готовят рокировку.",
            arrows: [{ from: "g1", to: "f3" }],
            squares: ["f3", "d4"],
          },
          {
            san: "O-O",
            explanation: "Чёрные завершают безопасность короля.",
            arrows: [{ from: "e8", to: "g8" }],
            squares: ["g8"],
          },
          {
            san: "O-O",
            explanation: "Белые рокируют и сохраняют давление по диагонали g2-b7.",
            arrows: [{ from: "e1", to: "g1" }],
            squares: ["g1", "b7"],
          },
        ],
      },
      {
        key: "catalan-open",
        title: "Открытый каталон",
        subtitle: "1.d4 Nf6 2.c4 e6 3.g3 d5 4.Bg2 dxc4 5.Nf3 a6 6.O-O b5",
        orderIndex: 1001,
        steps: [
          {
            san: "d4",
            explanation: "Белые занимают центр и задают ферзевую структуру.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные контролируют e4 и готовят гибкую защиту.",
            arrows: [{ from: "g8", to: "f6" }],
            squares: ["f6", "e4"],
          },
          {
            san: "c4",
            explanation: "Белые атакуют d5 и предлагают позиционный гамбит.",
            arrows: [
              { from: "c2", to: "c4" },
              { from: "c4", to: "d5" },
            ],
            squares: ["c4", "d5"],
          },
          {
            san: "e6",
            explanation: "Чёрные укрепляют центр и открывают путь слону f8.",
            arrows: [{ from: "e7", to: "e6" }],
            squares: ["e6", "d5"],
          },
          {
            san: "g3",
            explanation: "Белые готовят слона g2 для давления на ферзевый фланг.",
            arrows: [{ from: "g2", to: "g3" }],
            squares: ["g3", "g2"],
          },
          {
            san: "d5",
            explanation: "Чёрные занимают центр и создают напряжение с пешкой c4.",
            arrows: [{ from: "d7", to: "d5" }],
            squares: ["d5", "c4"],
          },
          {
            san: "Bg2",
            explanation: "Слон g2 становится основной фигурой в борьбе за b7 и d5.",
            arrows: [
              { from: "f1", to: "g2" },
              { from: "g2", to: "b7" },
            ],
            squares: ["g2", "b7", "d5"],
          },
          {
            san: "dxc4",
            explanation: "Чёрные принимают пешку c4, но дают белым долговременное давление.",
            arrows: [{ from: "d5", to: "c4" }],
            squares: ["c4", "b5"],
          },
          {
            san: "Nf3",
            explanation: "Белые развивают коня и готовят возврат пешки c4.",
            arrows: [{ from: "g1", to: "f3" }],
            squares: ["f3", "c4"],
          },
          {
            san: "a6",
            explanation: "Чёрные готовят ...b5, чтобы удержать лишнюю пешку.",
            arrows: [
              { from: "a7", to: "a6" },
              { from: "b7", to: "b5" },
            ],
            squares: ["a6", "b5", "c4"],
          },
          {
            san: "O-O",
            explanation: "Белые рокируют и готовят давление ходами a4 или Ne5.",
            arrows: [{ from: "e1", to: "g1" }],
            squares: ["g1", "c4"],
          },
          {
            san: "b5",
            explanation: "Чёрные укрепляют пешку c4, но ферзевый фланг становится целью атаки.",
            arrows: [
              { from: "b7", to: "b5" },
              { from: "b5", to: "c4" },
            ],
            squares: ["b5", "c4", "a4"],
          },
        ],
      },
    ],
  },
  {
    slug: "nimzo-indian-defense",
    eco: "E20",
    title: "Нимцо-индийская защита",
    side: "black",
    against: "1.d4",
    summary:
      "Нимцо-индийская защита связывает коня c3 и борется против белого центра через давление на e4 и d4.",
    variations: [
      {
        key: "nimzo-classical",
        title: "Классический вариант",
        subtitle: "1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.Qc2 O-O 5.e4 d5",
        orderIndex: 1000,
        steps: [
          {
            san: "d4",
            explanation: "Белые занимают центр и готовят пешечное пространство.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "e5"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные развивают коня и мешают белым легко провести e4.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          {
            san: "c4",
            explanation: "Белые усиливают контроль над d5.",
            arrows: [
              { from: "c2", to: "c4" },
              { from: "c4", to: "d5" },
            ],
            squares: ["c4", "d5"],
          },
          {
            san: "e6",
            explanation: "Чёрные готовят слона b4 и сохраняют гибкую структуру.",
            arrows: [
              { from: "e7", to: "e6" },
              { from: "f8", to: "b4" },
            ],
            squares: ["e6", "b4"],
          },
          {
            san: "Nc3",
            explanation: "Конь c3 поддерживает e4 и d5, но попадает под связку.",
            arrows: [
              { from: "b1", to: "c3" },
              { from: "c3", to: "e4" },
            ],
            squares: ["c3", "e4"],
          },
          {
            san: "Bb4",
            explanation: "Слон b4 связывает коня c3 — защитника центра белых.",
            arrows: [
              { from: "f8", to: "b4" },
              { from: "b4", to: "c3" },
            ],
            squares: ["b4", "c3", "e4"],
          },
          {
            san: "Qc2",
            explanation: "Ферзь c2 защищает коня c3 и поддерживает продвижение e4.",
            arrows: [
              { from: "d1", to: "c2" },
              { from: "c2", to: "c3" },
            ],
            squares: ["c2", "e4"],
          },
          {
            san: "O-O",
            explanation: "Чёрные рокируют, сохраняя давление на центр.",
            arrows: [{ from: "e8", to: "g8" }],
            squares: ["g8", "c3"],
          },
          {
            san: "e4",
            explanation: "Белые занимают центр, но теперь он становится объектом подрыва.",
            arrows: [
              { from: "e2", to: "e4" },
              { from: "e4", to: "d5" },
            ],
            squares: ["e4", "d5"],
          },
          {
            san: "d5",
            explanation: "Чёрные сразу атакуют центр белых, пока он не закрепился.",
            arrows: [
              { from: "d7", to: "d5" },
              { from: "d5", to: "e4" },
            ],
            squares: ["d5", "e4"],
          },
        ],
      },
      {
        key: "nimzo-rubinstein",
        title: "Вариант Рубинштейна",
        subtitle: "1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.e3 O-O 5.Bd3 d5 6.Nf3 c5",
        orderIndex: 1001,
        steps: [
          {
            san: "d4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные контролируют e4 и готовят индийскую защиту.",
            arrows: [{ from: "g8", to: "f6" }],
            squares: ["f6", "e4"],
          },
          {
            san: "c4",
            explanation: "Белые расширяют центр и контролируют d5.",
            arrows: [{ from: "c2", to: "c4" }],
            squares: ["c4", "d5"],
          },
          {
            san: "e6",
            explanation: "Чёрные готовят связку ...Bb4.",
            arrows: [
              { from: "e7", to: "e6" },
              { from: "f8", to: "b4" },
            ],
            squares: ["e6", "b4"],
          },
          {
            san: "Nc3",
            explanation: "Конь c3 поддерживает центр, но становится целью слона.",
            arrows: [{ from: "b1", to: "c3" }],
            squares: ["c3", "d5"],
          },
          {
            san: "Bb4",
            explanation: "Слон b4 создаёт типичную нимцо-индийскую связку.",
            arrows: [
              { from: "f8", to: "b4" },
              { from: "b4", to: "c3" },
            ],
            squares: ["b4", "c3"],
          },
          {
            san: "e3",
            explanation: "Белые спокойно развивают слона f1 и укрепляют d4.",
            arrows: [
              { from: "e2", to: "e3" },
              { from: "e3", to: "d4" },
            ],
            squares: ["e3", "d4"],
          },
          {
            san: "O-O",
            explanation: "Чёрные уводят короля в безопасность и сохраняют давление.",
            arrows: [{ from: "e8", to: "g8" }],
            squares: ["g8"],
          },
          {
            san: "Bd3",
            explanation: "Слон d3 смотрит на h7 и помогает белым готовить атаку.",
            arrows: [
              { from: "f1", to: "d3" },
              { from: "d3", to: "h7" },
            ],
            squares: ["d3", "h7"],
          },
          {
            san: "d5",
            explanation: "Чёрные закрепляют центр и ограничивают e4.",
            arrows: [{ from: "d7", to: "d5" }],
            squares: ["d5", "e4"],
          },
          {
            san: "Nf3",
            explanation: "Белые развивают коня и усиливают контроль над e5.",
            arrows: [{ from: "g1", to: "f3" }],
            squares: ["f3", "e5"],
          },
          {
            san: "c5",
            explanation: "Чёрные атакуют основание центра d4 и создают контригру.",
            arrows: [
              { from: "c7", to: "c5" },
              { from: "c5", to: "d4" },
            ],
            squares: ["c5", "d4"],
          },
        ],
      },
    ],
  },
  {
    slug: "torre-attack",
    eco: "A46",
    title: "Атака Торре",
    side: "white",
    against: "1...Nf6",
    summary:
      "Системное начало с d4, Nf3 и Bg5. Белые связывают коня f6 и получают понятную развивающую схему.",
    variations: [
      {
        key: "torre-main",
        title: "Базовая расстановка",
        subtitle: "1.d4 Nf6 2.Nf3 e6 3.Bg5 Be7 4.e3 O-O",
        orderIndex: 1000,
        steps: [
          {
            san: "d4",
            explanation: "Белые занимают центр и открывают дорогу слону c1.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "e5"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные развивают коня и контролируют e4.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          {
            san: "Nf3",
            explanation: "Белые развивают коня и поддерживают центр без раннего c4.",
            arrows: [{ from: "g1", to: "f3" }],
            squares: ["f3", "d4", "e5"],
          },
          {
            san: "e6",
            explanation: "Чёрные укрепляют d5 и открывают дорогу слону f8.",
            arrows: [{ from: "e7", to: "e6" }],
            squares: ["e6", "d5"],
          },
          {
            san: "Bg5",
            explanation: "Слон g5 связывает коня f6 и мешает чёрным удобно бороться за e4.",
            arrows: [
              { from: "c1", to: "g5" },
              { from: "g5", to: "f6" },
            ],
            squares: ["g5", "f6", "e4"],
          },
          {
            san: "Be7",
            explanation: "Чёрные развивают слона и готовятся снять связку рокировкой.",
            arrows: [
              { from: "f8", to: "e7" },
              { from: "e8", to: "g8" },
            ],
            squares: ["e7", "g8"],
          },
          {
            san: "e3",
            explanation: "Белые укрепляют d4 и открывают дорогу слону f1.",
            arrows: [
              { from: "e2", to: "e3" },
              { from: "f1", to: "d3" },
            ],
            squares: ["e3", "d4", "d3"],
          },
          {
            san: "O-O",
            explanation: "Чёрные рокируют и завершают безопасность короля.",
            arrows: [{ from: "e8", to: "g8" }],
            squares: ["g8"],
          },
        ],
      },
    ],
  },
  {
    slug: "trompowsky-attack",
    eco: "A45",
    title: "Атака Тромповского",
    side: "white",
    against: "1...Nf6",
    summary:
      "Атака Тромповского начинается ранним Bg5 и сразу ставит вопрос коню f6.",
    variations: [
      {
        key: "trompowsky-main",
        title: "Ранний Bg5",
        subtitle: "1.d4 Nf6 2.Bg5 e6 3.e4 Be7 4.Nc3",
        orderIndex: 1000,
        steps: [
          {
            san: "d4",
            explanation: "Белые занимают центр и готовят активное развитие слона.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "e5"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные развивают коня и контролируют e4.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          {
            san: "Bg5",
            explanation: "Слон g5 атакует коня f6 и нарушает привычные индийские построения.",
            arrows: [
              { from: "c1", to: "g5" },
              { from: "g5", to: "f6" },
            ],
            squares: ["g5", "f6"],
          },
          {
            san: "e6",
            explanation: "Чёрные готовят развитие слона f8 и пытаются спокойно укрепить центр.",
            arrows: [{ from: "e7", to: "e6" }],
            squares: ["e6", "d5"],
          },
          {
            san: "e4",
            explanation: "Белые используют связку коня f6, чтобы захватить больше пространства в центре.",
            arrows: [
              { from: "e2", to: "e4" },
              { from: "e4", to: "d5" },
            ],
            squares: ["e4", "d5"],
          },
          {
            san: "Be7",
            explanation: "Чёрные развивают слона и предлагают размен активного слона g5.",
            arrows: [
              { from: "f8", to: "e7" },
              { from: "e7", to: "g5" },
            ],
            squares: ["e7", "g5"],
          },
          {
            san: "Nc3",
            explanation: "Белые укрепляют e4 и развивают фигуру к центру.",
            arrows: [
              { from: "b1", to: "c3" },
              { from: "c3", to: "d5" },
            ],
            squares: ["c3", "e4", "d5"],
          },
        ],
      },
    ],
  },
  {
    slug: "dutch-defense",
    eco: "A80",
    title: "Голландская защита",
    side: "black",
    against: "1.d4",
    summary:
      "Голландская защита начинается с ...f5: чёрные контролируют e4 и готовят активность на королевском фланге.",
    variations: [
      {
        key: "dutch-classic",
        title: "Классическая схема",
        subtitle: "1.d4 f5 2.c4 Nf6 3.g3 e6 4.Bg2 Be7 5.Nf3 O-O",
        orderIndex: 1000,
        steps: [
          {
            san: "d4",
            explanation: "Белые занимают центр и готовят ферзевую структуру.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4", "e5"],
          },
          {
            san: "f5",
            explanation: "...f5 — главный ход Голландской защиты: чёрные контролируют e4 и готовят атаку.",
            arrows: [
              { from: "f7", to: "f5" },
              { from: "f5", to: "e4" },
            ],
            squares: ["f5", "e4"],
          },
          {
            san: "c4",
            explanation: "Белые расширяют контроль центра и атакуют d5.",
            arrows: [
              { from: "c2", to: "c4" },
              { from: "c4", to: "d5" },
            ],
            squares: ["c4", "d5"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные развивают коня и усиливают контроль над e4.",
            arrows: [
              { from: "g8", to: "f6" },
              { from: "f6", to: "e4" },
            ],
            squares: ["f6", "e4"],
          },
          {
            san: "g3",
            explanation: "Белые готовят фианкетто, чтобы давить на большую диагональ.",
            arrows: [
              { from: "g2", to: "g3" },
              { from: "f1", to: "g2" },
            ],
            squares: ["g3", "g2"],
          },
          {
            san: "e6",
            explanation: "...e6 укрепляет центр и открывает дорогу слону f8.",
            arrows: [
              { from: "e7", to: "e6" },
              { from: "f8", to: "e7" },
            ],
            squares: ["e6", "d5", "e7"],
          },
          {
            san: "Bg2",
            explanation: "Слон g2 давит на b7 и центральные поля.",
            arrows: [
              { from: "f1", to: "g2" },
              { from: "g2", to: "b7" },
            ],
            squares: ["g2", "b7"],
          },
          {
            san: "Be7",
            explanation: "Чёрные готовят рокировку и сохраняют гибкость в центре.",
            arrows: [
              { from: "f8", to: "e7" },
              { from: "e8", to: "g8" },
            ],
            squares: ["e7", "g8"],
          },
          {
            san: "Nf3",
            explanation: "Белые развивают коня и контролируют e5.",
            arrows: [{ from: "g1", to: "f3" }],
            squares: ["f3", "e5"],
          },
          {
            san: "O-O",
            explanation: "Чёрные рокируют и могут готовить атаку ходами ...Qe8 и ...Qh5.",
            arrows: [{ from: "e8", to: "g8" }],
            squares: ["g8", "h5"],
          },
        ],
      },
      {
        key: "dutch-leningrad",
        title: "Ленинградский вариант",
        subtitle: "1.d4 f5 2.g3 Nf6 3.Bg2 g6 4.Nf3 Bg7 5.O-O O-O",
        orderIndex: 1001,
        steps: [
          {
            san: "d4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4"],
          },
          {
            san: "f5",
            explanation: "Чёрные контролируют e4 и задают голландскую структуру.",
            arrows: [
              { from: "f7", to: "f5" },
              { from: "f5", to: "e4" },
            ],
            squares: ["f5", "e4"],
          },
          {
            san: "g3",
            explanation: "Белые готовят слона g2, чтобы давить на центр.",
            arrows: [{ from: "g2", to: "g3" }],
            squares: ["g3", "g2"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные развивают коня и поддерживают контроль e4.",
            arrows: [{ from: "g8", to: "f6" }],
            squares: ["f6", "e4"],
          },
          {
            san: "Bg2",
            explanation: "Слон g2 давит по большой диагонали.",
            arrows: [
              { from: "f1", to: "g2" },
              { from: "g2", to: "b7" },
            ],
            squares: ["g2", "b7"],
          },
          {
            san: "g6",
            explanation: "Ленинградская идея: чёрные готовят своего слона на g7.",
            arrows: [
              { from: "g7", to: "g6" },
              { from: "f8", to: "g7" },
            ],
            squares: ["g6", "g7"],
          },
          {
            san: "Nf3",
            explanation: "Белые развивают коня и готовят рокировку.",
            arrows: [{ from: "g1", to: "f3" }],
            squares: ["f3", "e5"],
          },
          {
            san: "Bg7",
            explanation: "Слон g7 становится главной фигурой чёрных в борьбе за центр.",
            arrows: [
              { from: "f8", to: "g7" },
              { from: "g7", to: "d4" },
            ],
            squares: ["g7", "d4"],
          },
          {
            san: "O-O",
            explanation: "Белые завершают развитие короля.",
            arrows: [{ from: "e1", to: "g1" }],
            squares: ["g1"],
          },
          {
            san: "O-O",
            explanation: "Чёрные рокируют и получают готовую схему для атаки на королевском фланге.",
            arrows: [{ from: "e8", to: "g8" }],
            squares: ["g8", "e4"],
          },
        ],
      },
      {
        key: "dutch-stonewall",
        title: "Стоунволл",
        subtitle: "1.d4 f5 2.c4 e6 3.Nc3 d5 4.Nf3 c6 5.e3 Nf6",
        orderIndex: 1002,
        steps: [
          {
            san: "d4",
            explanation: "Белые занимают центр.",
            arrows: [{ from: "d2", to: "d4" }],
            squares: ["d4"],
          },
          {
            san: "f5",
            explanation: "Чёрные контролируют e4 и начинают голландскую структуру.",
            arrows: [
              { from: "f7", to: "f5" },
              { from: "f5", to: "e4" },
            ],
            squares: ["f5", "e4"],
          },
          {
            san: "c4",
            explanation: "Белые расширяют центр и давят на d5.",
            arrows: [{ from: "c2", to: "c4" }],
            squares: ["c4", "d5"],
          },
          {
            san: "e6",
            explanation: "...e6 готовит прочную пешечную стену f5-e6-d5.",
            arrows: [{ from: "e7", to: "e6" }],
            squares: ["e6", "f5"],
          },
          {
            san: "Nc3",
            explanation: "Конь c3 усиливает давление на d5 и e4.",
            arrows: [{ from: "b1", to: "c3" }],
            squares: ["c3", "d5", "e4"],
          },
          {
            san: "d5",
            explanation: "...d5 формирует структуру Stonewall и фиксирует центр.",
            arrows: [{ from: "d7", to: "d5" }],
            squares: ["f5", "e6", "d5"],
          },
          {
            san: "Nf3",
            explanation: "Белые развивают коня и готовят борьбу за e5.",
            arrows: [{ from: "g1", to: "f3" }],
            squares: ["f3", "e5"],
          },
          {
            san: "c6",
            explanation: "...c6 укрепляет d5 и завершает пешечную стену.",
            arrows: [
              { from: "c7", to: "c6" },
              { from: "c6", to: "d5" },
            ],
            squares: ["c6", "d5"],
          },
          {
            san: "e3",
            explanation: "Белые укрепляют d4 и открывают дорогу слону f1.",
            arrows: [{ from: "e2", to: "e3" }],
            squares: ["e3", "d4"],
          },
          {
            san: "Nf6",
            explanation: "Чёрные развивают коня и контролируют e4/e5.",
            arrows: [{ from: "g8", to: "f6" }],
            squares: ["f6", "e4", "e5"],
          },
        ],
      },
    ],
  },
];
