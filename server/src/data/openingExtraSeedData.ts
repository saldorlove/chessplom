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

function makeSteps(
  moves: string[],
  fallback: string,
  custom: Record<number, Partial<ExtraOpeningStepSeed>> = {}
): ExtraOpeningStepSeed[] {
  return moves.map((san, index) => ({
    san,
    explanation: custom[index]?.explanation ?? fallback,
    arrows: custom[index]?.arrows ?? [],
    squares: custom[index]?.squares ?? [],
  }));
}

export const EXTRA_OPENINGS: ExtraOpeningSeed[] = [
  {
    slug: "scholars-mate",
    eco: "C20",
    title: "Детский мат",
    side: "white",
    against: "1...e5",
    summary:
      "Быстрая атакующая ловушка против слабой защиты пункта f7. Полезна для распознавания ранних матовых угроз.",
    variations: [
      {
        key: "scholars-classic",
        title: "Классическая ловушка",
        subtitle: "1.e4 e5 2.Qh5 Nc6 3.Bc4 Nf6 4.Qxf7#",
        orderIndex: 1000,
        steps: makeSteps(
          ["e4", "e5", "Qh5", "Nc6", "Bc4", "Nf6", "Qxf7#"],
          "Стороны следуют линии быстрого нападения на пункт f7.",
          {
            2: {
              explanation:
                "Ферзь выходит на h5 и создаёт угрозу на f7 вместе со слоном c4.",
              arrows: [
                { from: "d1", to: "h5" },
                { from: "h5", to: "f7" },
              ],
              squares: ["h5", "f7"],
            },
            4: {
              explanation:
                "Слон c4 подключается к атаке на f7 — это ключевая идея детского мата.",
              arrows: [
                { from: "f1", to: "c4" },
                { from: "c4", to: "f7" },
              ],
              squares: ["c4", "f7"],
            },
            6: {
              explanation:
                "Ферзь забирает f7 с матом, так как пункт защищён слоном c4.",
              arrows: [{ from: "h5", to: "f7" }],
              squares: ["f7", "e8"],
            },
          }
        ),
      },
      {
        key: "scholars-bishop-first",
        title: "Через ранний выход слона",
        subtitle: "1.e4 e5 2.Bc4 Nc6 3.Qh5 Nf6 4.Qxf7#",
        orderIndex: 1001,
        steps: makeSteps(
          ["e4", "e5", "Bc4", "Nc6", "Qh5", "Nf6", "Qxf7#"],
          "Белые строят ту же батарею ферзя и слона против f7.",
          {
            2: {
              explanation: "Слон сразу нацеливается на слабый пункт f7.",
              arrows: [
                { from: "f1", to: "c4" },
                { from: "c4", to: "f7" },
              ],
              squares: ["c4", "f7"],
            },
            4: {
              explanation: "Ферзь подключается к атаке по диагонали h5-f7.",
              arrows: [
                { from: "d1", to: "h5" },
                { from: "h5", to: "f7" },
              ],
              squares: ["h5", "f7"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "grob-opening",
    eco: "A00",
    title: "Дебют Гроба",
    side: "white",
    against: "универсально",
    summary:
      "Редкое и провокационное начало 1.g4. Белые сразу создают нестандартную пешечную структуру на королевском фланге.",
    variations: [
      {
        key: "grob-main",
        title: "Основная идея с Bg2",
        subtitle: "1.g4 d5 2.Bg2 e5 3.h3 Nf6 4.d3",
        orderIndex: 1000,
        steps: makeSteps(
          ["g4", "d5", "Bg2", "e5", "h3", "Nf6", "d3"],
          "Белые играют нестандартно, развивая слона на большую диагональ.",
          {
            0: {
              explanation:
                "Ход g4 сразу захватывает пространство, но ослабляет короля.",
              arrows: [{ from: "g2", to: "g4" }],
              squares: ["g4", "g2"],
            },
            2: {
              explanation:
                "Слон g2 становится главной фигурой белых на большой диагонали.",
              arrows: [
                { from: "f1", to: "g2" },
                { from: "g2", to: "b7" },
              ],
              squares: ["g2", "b7"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "orangutan-opening",
    eco: "A00",
    title: "Дебют Орангутана",
    side: "white",
    against: "универсально",
    summary:
      "Начало 1.b4, также известное как дебют Сокольского. Белые рано захватывают пространство на ферзевом фланге.",
    variations: [
      {
        key: "orangutan-main",
        title: "Схема с Bb2",
        subtitle: "1.b4 e5 2.Bb2 d6 3.e3 Nf6 4.c4",
        orderIndex: 1000,
        steps: makeSteps(
          ["b4", "e5", "Bb2", "d6", "e3", "Nf6", "c4"],
          "Белые строят игру вокруг слона b2 и давления по большой диагонали.",
          {
            0: {
              explanation:
                "Ход b4 захватывает пространство на ферзевом фланге.",
              arrows: [{ from: "b2", to: "b4" }],
              squares: ["b4"],
            },
            2: {
              explanation:
                "Слон b2 давит по большой диагонали на центр и королевский фланг.",
              arrows: [
                { from: "c1", to: "b2" },
                { from: "b2", to: "g7" },
              ],
              squares: ["b2", "g7"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "birds-opening",
    eco: "A02",
    title: "Дебют Бёрда",
    side: "white",
    against: "универсально",
    summary:
      "Начало 1.f4. Белые контролируют e5 и часто переходят к структурам, похожим на Голландскую защиту с лишним темпом.",
    variations: [
      {
        key: "bird-main",
        title: "Классическая схема",
        subtitle: "1.f4 d5 2.Nf3 Nf6 3.e3 g6 4.b3 Bg7",
        orderIndex: 1000,
        steps: makeSteps(
          ["f4", "d5", "Nf3", "Nf6", "e3", "g6", "b3", "Bg7"],
          "Белые готовят развитие и контроль центрального поля e5.",
          {
            0: {
              explanation: "Ход f4 берёт под контроль e5 и задаёт дебют Бёрда.",
              arrows: [
                { from: "f2", to: "f4" },
                { from: "f4", to: "e5" },
              ],
              squares: ["f4", "e5"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "reti-opening",
    eco: "A04",
    title: "Дебют Рети",
    side: "white",
    against: "универсально",
    summary:
      "Гибкое начало 1.Nf3, где белые не занимают центр пешками сразу, а сначала давят на него фигурами.",
    variations: [
      {
        key: "reti-main",
        title: "Система с c4 и g3",
        subtitle: "1.Nf3 d5 2.c4 e6 3.g3 Nf6 4.Bg2 Be7 5.O-O",
        orderIndex: 1000,
        steps: makeSteps(
          ["Nf3", "d5", "c4", "e6", "g3", "Nf6", "Bg2", "Be7", "O-O"],
          "Белые развиваются гибко и давят на центр с фланга.",
          {
            0: {
              explanation:
                "Конь f3 контролирует e5 и d4, сохраняя гибкость пешечной структуры.",
              arrows: [{ from: "g1", to: "f3" }],
              squares: ["f3", "e5", "d4"],
            },
            2: {
              explanation:
                "c4 начинает давление на центр чёрных, особенно на d5.",
              arrows: [
                { from: "c2", to: "c4" },
                { from: "c4", to: "d5" },
              ],
              squares: ["c4", "d5"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "english-opening",
    eco: "A10",
    title: "Английское начало",
    side: "white",
    against: "универсально",
    summary:
      "Начало 1.c4. Белые контролируют d5 и часто получают позиционную игру с фланговым давлением на центр.",
    variations: [
      {
        key: "english-four-knights",
        title: "Английское: четыре коня",
        subtitle: "1.c4 e5 2.Nc3 Nf6 3.g3 d5 4.cxd5 Nxd5 5.Bg2",
        orderIndex: 1000,
        steps: makeSteps(
          ["c4", "e5", "Nc3", "Nf6", "g3", "d5", "cxd5", "Nxd5", "Bg2"],
          "Белые давят на центр с фланга и развивают слона на g2.",
          {
            0: {
              explanation: "c4 контролирует d5 и задаёт английскую структуру.",
              arrows: [
                { from: "c2", to: "c4" },
                { from: "c4", to: "d5" },
              ],
              squares: ["c4", "d5"],
            },
            8: {
              explanation:
                "Слон g2 становится важной фигурой давления по большой диагонали.",
              arrows: [
                { from: "f1", to: "g2" },
                { from: "g2", to: "b7" },
              ],
              squares: ["g2", "b7"],
            },
          }
        ),
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
      "Один из главных ответов на 1.d4. Чёрные связывают коня c3 и борются против белого центра.",
    variations: [
      {
        key: "nimzo-classical",
        title: "Классический вариант",
        subtitle: "1.d4 Nf6 2.c4 e6 3.Nc3 Bb4",
        orderIndex: 1000,
        steps: makeSteps(
          ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4"],
          "Чёрные давят на коня c3, который поддерживает центр белых.",
          {
            5: {
              explanation:
                "Слон b4 связывает коня c3 и создаёт давление на центр.",
              arrows: [
                { from: "f8", to: "b4" },
                { from: "b4", to: "c3" },
              ],
              squares: ["b4", "c3", "d4"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "queens-indian-defense",
    eco: "E12",
    title: "Новоиндийская защита",
    side: "black",
    against: "1.d4",
    summary:
      "Чёрные развивают слона на b7 и оказывают давление на центр белых с большой диагонали.",
    variations: [
      {
        key: "queens-indian-main",
        title: "Фианкетто слона b7",
        subtitle: "1.d4 Nf6 2.c4 e6 3.Nf3 b6 4.g3 Bb7",
        orderIndex: 1000,
        steps: makeSteps(
          ["d4", "Nf6", "c4", "e6", "Nf3", "b6", "g3", "Bb7"],
          "Чёрные готовят фианкетто и давление на центральные поля.",
          {
            5: {
              explanation: "...b6 готовит развитие слона на b7.",
              arrows: [
                { from: "b7", to: "b6" },
                { from: "c8", to: "b7" },
              ],
              squares: ["b6", "b7"],
            },
            7: {
              explanation:
                "Слон b7 давит на e4 и поддерживает игру против центра.",
              arrows: [
                { from: "c8", to: "b7" },
                { from: "b7", to: "e4" },
              ],
              squares: ["b7", "e4"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "catalan-opening",
    eco: "E00",
    title: "Каталонское начало",
    side: "white",
    against: "1...Nf6",
    summary:
      "Белые соединяют идеи ферзевого гамбита и фианкетто слона g2, создавая длительное давление на центр.",
    variations: [
      {
        key: "catalan-closed",
        title: "Закрытый каталон",
        subtitle: "1.d4 Nf6 2.c4 e6 3.g3 d5 4.Bg2 Be7 5.Nf3",
        orderIndex: 1000,
        steps: makeSteps(
          ["d4", "Nf6", "c4", "e6", "g3", "d5", "Bg2", "Be7", "Nf3"],
          "Белые готовят позиционное давление по большой диагонали.",
          {
            6: {
              explanation:
                "Слон g2 становится ключевой фигурой каталонской структуры.",
              arrows: [
                { from: "f1", to: "g2" },
                { from: "g2", to: "b7" },
              ],
              squares: ["g2", "b7"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "bishop-opening",
    eco: "C24",
    title: "Слоновый дебют",
    side: "white",
    against: "1...e5",
    summary:
      "Белые развивают слона на c4 без раннего Nf3, сохраняя гибкость и давление на f7.",
    variations: [
      {
        key: "bishop-classical",
        title: "Классическое развитие",
        subtitle: "1.e4 e5 2.Bc4 Nf6 3.d3 c6 4.Nf3",
        orderIndex: 1000,
        steps: makeSteps(
          ["e4", "e5", "Bc4", "Nf6", "d3", "c6", "Nf3"],
          "Белые быстро развивают слона на активную диагональ.",
          {
            2: {
              explanation: "Слон c4 сразу смотрит на слабое поле f7.",
              arrows: [
                { from: "f1", to: "c4" },
                { from: "c4", to: "f7" },
              ],
              squares: ["c4", "f7"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "four-knights-game",
    eco: "C47",
    title: "Партия четырёх коней",
    side: "white",
    against: "1...e5",
    summary:
      "Классическое открытое начало, где обе стороны естественно развивают коней и борются за центр.",
    variations: [
      {
        key: "four-knights-spanish",
        title: "Испанская схема",
        subtitle: "1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.Bb5",
        orderIndex: 1000,
        steps: makeSteps(
          ["e4", "e5", "Nf3", "Nc6", "Nc3", "Nf6", "Bb5"],
          "Обе стороны быстро развивают коней, а белые затем давят на c6.",
          {
            6: {
              explanation:
                "Слон b5 переводит игру к испанским идеям давления на коня c6.",
              arrows: [
                { from: "f1", to: "b5" },
                { from: "b5", to: "c6" },
              ],
              squares: ["b5", "c6", "e5"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "alekhine-defense",
    eco: "B02",
    title: "Защита Алехина",
    side: "black",
    against: "1.e4",
    summary:
      "Чёрные провоцируют белых продвигать пешки, чтобы затем атаковать чрезмерно растянутый центр.",
    variations: [
      {
        key: "alekhine-main",
        title: "Основная идея",
        subtitle: "1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.Nf3",
        orderIndex: 1000,
        steps: makeSteps(
          ["e4", "Nf6", "e5", "Nd5", "d4", "d6", "Nf3"],
          "Чёрные сначала отступают конём, а затем подрывают центр белых.",
          {
            1: {
              explanation:
                "...Nf6 атакует пешку e4 и приглашает белых занять пространство.",
              arrows: [
                { from: "g8", to: "f6" },
                { from: "f6", to: "e4" },
              ],
              squares: ["f6", "e4"],
            },
            5: {
              explanation:
                "...d6 начинает подрыв продвинутой пешки e5.",
              arrows: [
                { from: "d7", to: "d6" },
                { from: "d6", to: "e5" },
              ],
              squares: ["d6", "e5"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "modern-defense",
    eco: "B06",
    title: "Современная защита",
    side: "black",
    against: "1.e4",
    summary:
      "Чёрные не занимают центр сразу, а развивают слона на g7 и атакуют центр издалека.",
    variations: [
      {
        key: "modern-main",
        title: "Фианкетто слона g7",
        subtitle: "1.e4 g6 2.d4 Bg7 3.Nc3 d6 4.Nf3",
        orderIndex: 1000,
        steps: makeSteps(
          ["e4", "g6", "d4", "Bg7", "Nc3", "d6", "Nf3"],
          "Чёрные строят гибкую фланговую защиту против центра белых.",
          {
            1: {
              explanation: "...g6 готовит развитие слона на g7.",
              arrows: [
                { from: "g7", to: "g6" },
                { from: "f8", to: "g7" },
              ],
              squares: ["g6", "g7"],
            },
            3: {
              explanation:
                "Слон g7 будет давить на центр по большой диагонали.",
              arrows: [
                { from: "f8", to: "g7" },
                { from: "g7", to: "d4" },
              ],
              squares: ["g7", "d4"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "owen-defense",
    eco: "B00",
    title: "Защита Оуэна",
    side: "black",
    against: "1.e4",
    summary:
      "Редкая защита с ранним ...b6 и развитием слона на b7 для давления на e4.",
    variations: [
      {
        key: "owen-main",
        title: "Слон на b7",
        subtitle: "1.e4 b6 2.d4 Bb7 3.Bd3 e6 4.Nf3",
        orderIndex: 1000,
        steps: makeSteps(
          ["e4", "b6", "d4", "Bb7", "Bd3", "e6", "Nf3"],
          "Чёрные атакуют центр белых по большой диагонали.",
          {
            1: {
              explanation: "...b6 готовит слона на b7.",
              arrows: [
                { from: "b7", to: "b6" },
                { from: "c8", to: "b7" },
              ],
              squares: ["b6", "b7"],
            },
            3: {
              explanation:
                "Слон b7 давит на e4 и создаёт нестандартную игру.",
              arrows: [
                { from: "c8", to: "b7" },
                { from: "b7", to: "e4" },
              ],
              squares: ["b7", "e4"],
            },
          }
        ),
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
      "Белые рано выводят слона на g5 и создают давление на коня f6, нарушая привычные индийские схемы.",
    variations: [
      {
        key: "trompowsky-main",
        title: "Ранний Bg5",
        subtitle: "1.d4 Nf6 2.Bg5 e6 3.e4 Be7 4.Nc3",
        orderIndex: 1000,
        steps: makeSteps(
          ["d4", "Nf6", "Bg5", "e6", "e4", "Be7", "Nc3"],
          "Белые используют ранний выход слона, чтобы оказать давление на f6.",
          {
            2: {
              explanation:
                "Слон g5 атакует коня f6 и мешает стандартному развитию чёрных.",
              arrows: [
                { from: "c1", to: "g5" },
                { from: "g5", to: "f6" },
              ],
              squares: ["g5", "f6"],
            },
          }
        ),
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
      "Системное начало с d4, Nf3 и Bg5. Белые развиваются спокойно и связывают коня f6.",
    variations: [
      {
        key: "torre-main",
        title: "Базовая расстановка",
        subtitle: "1.d4 Nf6 2.Nf3 e6 3.Bg5 Be7 4.e3 O-O",
        orderIndex: 1000,
        steps: makeSteps(
          ["d4", "Nf6", "Nf3", "e6", "Bg5", "Be7", "e3", "O-O"],
          "Белые развиваются системно и создают давление на f6.",
          {
            4: {
              explanation: "Слон g5 связывает коня f6.",
              arrows: [
                { from: "c1", to: "g5" },
                { from: "g5", to: "f6" },
              ],
              squares: ["g5", "f6"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "colle-system",
    eco: "D05",
    title: "Система Колле",
    side: "white",
    against: "универсально",
    summary:
      "Надёжная системная расстановка за белых с d4, Nf3, e3 и Bd3.",
    variations: [
      {
        key: "colle-main",
        title: "Классическая схема",
        subtitle: "1.d4 d5 2.Nf3 Nf6 3.e3 e6 4.Bd3 c5",
        orderIndex: 1000,
        steps: makeSteps(
          ["d4", "d5", "Nf3", "Nf6", "e3", "e6", "Bd3", "c5"],
          "Белые строят спокойную систему с дальнейшим c3 и e4.",
          {
            6: {
              explanation:
                "Слон d3 нацелен на королевский фланг и поддерживает будущую атаку.",
              arrows: [
                { from: "f1", to: "d3" },
                { from: "d3", to: "h7" },
              ],
              squares: ["d3", "h7"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "latvian-gambit",
    eco: "C40",
    title: "Латышский гамбит",
    side: "black",
    against: "1.e4",
    summary:
      "Острое и рискованное продолжение 1.e4 e5 2.Nf3 f5, где чёрные сразу атакуют центр.",
    variations: [
      {
        key: "latvian-main",
        title: "Основная гамбитная идея",
        subtitle: "1.e4 e5 2.Nf3 f5 3.Nxe5 Qf6",
        orderIndex: 1000,
        steps: makeSteps(
          ["e4", "e5", "Nf3", "f5", "Nxe5", "Qf6"],
          "Чёрные жертвуют устойчивостью ради резкой контригры.",
          {
            3: {
              explanation:
                "...f5 атакует пешку e4 и создаёт острую гамбитную игру.",
              arrows: [
                { from: "f7", to: "f5" },
                { from: "f5", to: "e4" },
              ],
              squares: ["f5", "e4"],
            },
            5: {
              explanation:
                "Ферзь f6 нападает на e5 и подключается к борьбе за центр.",
              arrows: [
                { from: "d8", to: "f6" },
                { from: "f6", to: "e5" },
              ],
              squares: ["f6", "e5"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "elephant-gambit",
    eco: "C40",
    title: "Гамбит Элефанта",
    side: "black",
    against: "1.e4",
    summary:
      "Редкий гамбит после 1.e4 e5 2.Nf3 d5, где чёрные сразу бьют по центру.",
    variations: [
      {
        key: "elephant-main",
        title: "Центральный удар ...d5",
        subtitle: "1.e4 e5 2.Nf3 d5 3.exd5 e4",
        orderIndex: 1000,
        steps: makeSteps(
          ["e4", "e5", "Nf3", "d5", "exd5", "e4"],
          "Чёрные стремятся перехватить инициативу резким ударом в центре.",
          {
            3: {
              explanation:
                "...d5 немедленно атакует центр и уводит партию в редкие осложнения.",
              arrows: [
                { from: "d7", to: "d5" },
                { from: "d5", to: "e4" },
              ],
              squares: ["d5", "e4"],
            },
            5: {
              explanation:
                "...e4 оттесняет коня f3 и даёт чёрным активную игру.",
              arrows: [
                { from: "e5", to: "e4" },
                { from: "e4", to: "f3" },
              ],
              squares: ["e4", "f3"],
            },
          }
        ),
      },
    ],
  },

  /* Дополнительные варианты для уже существующих дебютов */
  {
    slug: "italian-game",
    eco: "C50",
    title: "Итальянская партия",
    side: "white",
    against: "1...e5",
    summary:
      "Итальянская партия сочетает быстрое развитие, давление на f7 и классическую борьбу за центр.",
    variations: [
      {
        key: "italian-two-knights",
        title: "Защита двух коней",
        subtitle: "1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5",
        orderIndex: 1100,
        steps: makeSteps(
          ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "d5"],
          "Острая линия Итальянской партии с ранней атакой на f7.",
          {
            6: {
              explanation:
                "Конь g5 усиливает давление на f7 и провоцирует тактическую борьбу.",
              arrows: [
                { from: "f3", to: "g5" },
                { from: "g5", to: "f7" },
              ],
              squares: ["g5", "f7"],
            },
          }
        ),
      },
      {
        key: "italian-scholars-trap",
        title: "Линия детского мата",
        subtitle: "1.e4 e5 2.Bc4 Nc6 3.Qh5 Nf6 4.Qxf7#",
        orderIndex: 1101,
        steps: makeSteps(
          ["e4", "e5", "Bc4", "Nc6", "Qh5", "Nf6", "Qxf7#"],
          "Белые строят простую батарею ферзя и слона против f7.",
          {
            2: {
              explanation: "Слон c4 сразу давит на слабое поле f7.",
              arrows: [
                { from: "f1", to: "c4" },
                { from: "c4", to: "f7" },
              ],
              squares: ["c4", "f7"],
            },
            6: {
              explanation:
                "Ферзь забирает f7 с матом, если чёрные не защитились.",
              arrows: [{ from: "h5", to: "f7" }],
              squares: ["f7"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "sicilian-defense",
    eco: "B20",
    title: "Сицилианская защита",
    side: "black",
    against: "1.e4",
    summary:
      "Сицилианская защита создаёт асимметричную борьбу и даёт чёрным хорошие шансы на контратаку.",
    variations: [
      {
        key: "sicilian-alapin",
        title: "Вариант Алапина",
        subtitle: "1.e4 c5 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4",
        orderIndex: 1100,
        steps: makeSteps(
          ["e4", "c5", "c3", "Nf6", "e5", "Nd5", "d4", "cxd4"],
          "Белые готовят d4, а чёрные атакуют центр фигурами.",
          {
            2: {
              explanation:
                "c3 подготавливает построение центра d4.",
              arrows: [
                { from: "c2", to: "c3" },
                { from: "d2", to: "d4" },
              ],
              squares: ["c3", "d4"],
            },
          }
        ),
      },
      {
        key: "sicilian-smith-morra",
        title: "Гамбит Смита — Морра",
        subtitle: "1.e4 c5 2.d4 cxd4 3.c3 dxc3 4.Nxc3",
        orderIndex: 1101,
        steps: makeSteps(
          ["e4", "c5", "d4", "cxd4", "c3", "dxc3", "Nxc3"],
          "Белые жертвуют пешку ради быстрого развития и открытых линий.",
          {
            4: {
              explanation:
                "c3 предлагает гамбитную пешку ради темпа и развития.",
              arrows: [
                { from: "c2", to: "c3" },
                { from: "c3", to: "d4" },
              ],
              squares: ["c3", "d4"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "caro-kann-defense",
    eco: "B10",
    title: "Защита Каро-Канн",
    side: "black",
    against: "1.e4",
    summary:
      "Каро-Канн — надёжная защита против 1.e4 с крепкой пешечной структурой и понятными планами.",
    variations: [
      {
        key: "caro-panov",
        title: "Атака Панова",
        subtitle: "1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6",
        orderIndex: 1100,
        steps: makeSteps(
          ["e4", "c6", "d4", "d5", "exd5", "cxd5", "c4", "Nf6"],
          "Белые создают изолированную пешку и получают активную фигурную игру.",
          {
            6: {
              explanation:
                "c4 атакует центр и переводит игру в структуру с изолированной пешкой.",
              arrows: [
                { from: "c2", to: "c4" },
                { from: "c4", to: "d5" },
              ],
              squares: ["c4", "d5"],
            },
          }
        ),
      },
    ],
  },
  {
    slug: "french-defense",
    eco: "C00",
    title: "Французская защита",
    side: "black",
    against: "1.e4",
    summary:
      "Французская защита создаёт крепкий центр у чёрных и стратегическую борьбу вокруг пешечной цепи.",
    variations: [
      {
        key: "french-tarrasch",
        title: "Вариант Тарраша",
        subtitle: "1.e4 e6 2.d4 d5 3.Nd2 Nf6 4.e5 Nfd7",
        orderIndex: 1100,
        steps: makeSteps(
          ["e4", "e6", "d4", "d5", "Nd2", "Nf6", "e5", "Nfd7"],
          "Белые избегают связки Bb4, а чёрные атакуют пешечную цепь.",
          {
            4: {
              explanation:
                "Конь d2 поддерживает e4 и избегает связки слоном b4.",
              arrows: [{ from: "b1", to: "d2" }],
              squares: ["d2", "e4"],
            },
          }
        ),
      },
    ],
  },
];
