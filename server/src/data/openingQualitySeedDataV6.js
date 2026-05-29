export const OPENING_QUALITY_SEEDS_V6 = [
    {
        slug: "birds-opening",
        eco: "A02",
        title: "Дебют Бёрда",
        side: "white",
        against: "универсально",
        summary: "Дебют Бёрда начинается ходом 1.f4. Белые контролируют e5 и часто получают структуры, похожие на Голландскую защиту с лишним темпом.",
        variations: [
            {
                key: "bird-main",
                title: "Классическая схема",
                subtitle: "1.f4 d5 2.Nf3 Nf6 3.e3 g6 4.b3 Bg7 5.Bb2 O-O",
                orderIndex: 1000,
                steps: [
                    {
                        san: "f4",
                        explanation: "Белые сразу контролируют e5 и начинают игру на королевском фланге.",
                        arrows: [
                            { from: "f2", to: "f4" },
                            { from: "f4", to: "e5" },
                        ],
                        squares: ["f4", "e5"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные занимают центр и не дают белым свободно сыграть e4.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "e4" },
                        ],
                        squares: ["d5", "e4"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Конь f3 поддерживает e5 и готовит короткую рокировку.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "e5"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные развивают коня и борются за e4.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "e4" },
                        ],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "e3",
                        explanation: "Белые укрепляют f4/d4-поля и открывают дорогу слону f1.",
                        arrows: [
                            { from: "e2", to: "e3" },
                            { from: "f1", to: "e2" },
                        ],
                        squares: ["e3", "f4"],
                    },
                    {
                        san: "g6",
                        explanation: "Чёрные готовят фианкетто слона g7 для давления на центр.",
                        arrows: [
                            { from: "g7", to: "g6" },
                            { from: "f8", to: "g7" },
                        ],
                        squares: ["g6", "g7"],
                    },
                    {
                        san: "b3",
                        explanation: "Белые готовят слона b2, который будет давить на большую диагональ.",
                        arrows: [
                            { from: "b2", to: "b3" },
                            { from: "c1", to: "b2" },
                        ],
                        squares: ["b3", "b2"],
                    },
                    {
                        san: "Bg7",
                        explanation: "Слон g7 давит на b2 и центр белых.",
                        arrows: [
                            { from: "f8", to: "g7" },
                            { from: "g7", to: "b2" },
                        ],
                        squares: ["g7", "b2"],
                    },
                    {
                        san: "Bb2",
                        explanation: "Слон b2 поддерживает контроль e5 и смотрит на g7.",
                        arrows: [
                            { from: "c1", to: "b2" },
                            { from: "b2", to: "g7" },
                        ],
                        squares: ["b2", "g7", "e5"],
                    },
                    {
                        san: "O-O",
                        explanation: "Чёрные завершают безопасность короля и переходят к борьбе за центр.",
                        arrows: [{ from: "e8", to: "g8" }],
                        squares: ["g8", "e4"],
                    },
                ],
            },
            {
                key: "bird-from-gambit",
                title: "Гамбит Фрома",
                subtitle: "1.f4 e5 2.fxe5 d6 3.exd6 Bxd6 4.Nf3",
                orderIndex: 1001,
                steps: [
                    {
                        san: "f4",
                        explanation: "Белые начинают дебют Бёрда и контролируют e5.",
                        arrows: [
                            { from: "f2", to: "f4" },
                            { from: "f4", to: "e5" },
                        ],
                        squares: ["f4", "e5"],
                    },
                    {
                        san: "e5",
                        explanation: "Гамбит Фрома: чёрные сразу жертвуют пешку, чтобы вскрыть линии.",
                        arrows: [
                            { from: "e7", to: "e5" },
                            { from: "e5", to: "f4" },
                        ],
                        squares: ["e5", "f4"],
                    },
                    {
                        san: "fxe5",
                        explanation: "Белые принимают гамбит и забирают пешку e5.",
                        arrows: [{ from: "f4", to: "e5" }],
                        squares: ["e5"],
                    },
                    {
                        san: "d6",
                        explanation: "Чёрные атакуют пешку e5 и открывают диагональ слону c8.",
                        arrows: [
                            { from: "d7", to: "d6" },
                            { from: "d6", to: "e5" },
                        ],
                        squares: ["d6", "e5"],
                    },
                    {
                        san: "exd6",
                        explanation: "Белые забирают ещё одну пешку, но открывают чёрным линии для развития.",
                        arrows: [{ from: "e5", to: "d6" }],
                        squares: ["d6"],
                    },
                    {
                        san: "Bxd6",
                        explanation: "Слон d6 выходит с темпом и смотрит на h2.",
                        arrows: [
                            { from: "c5", to: "d6" },
                            { from: "d6", to: "h2" },
                        ],
                        squares: ["d6", "h2"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и готовят защиту короля.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "h2"],
                    },
                ],
            },
        ],
    },
    {
        slug: "grob-opening",
        eco: "A00",
        title: "Дебют Гроба",
        side: "white",
        against: "универсально",
        summary: "Дебют Гроба начинается ходом 1.g4. Это редкое и провокационное начало, которое быстро создаёт нестандартную игру.",
        variations: [
            {
                key: "grob-main",
                title: "Основная идея с Bg2",
                subtitle: "1.g4 d5 2.Bg2 e5 3.h3 Nf6 4.d3",
                orderIndex: 1000,
                steps: [
                    {
                        san: "g4",
                        explanation: "Белые захватывают пространство на королевском фланге, но ослабляют собственного короля.",
                        arrows: [{ from: "g2", to: "g4" }],
                        squares: ["g4", "g2", "h3"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные спокойно занимают центр и используют ослабление белых полей.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "g4" },
                        ],
                        squares: ["d5", "g4"],
                    },
                    {
                        san: "Bg2",
                        explanation: "Слон g2 становится главной фигурой белых на большой диагонали.",
                        arrows: [
                            { from: "f1", to: "g2" },
                            { from: "g2", to: "b7" },
                        ],
                        squares: ["g2", "b7"],
                    },
                    {
                        san: "e5",
                        explanation: "Чёрные получают мощный центр и ограничивают белые фигуры.",
                        arrows: [
                            { from: "e7", to: "e5" },
                            { from: "e5", to: "d4" },
                        ],
                        squares: ["e5", "d4"],
                    },
                    {
                        san: "h3",
                        explanation: "Белые поддерживают пешку g4 и готовят развитие без потери фланга.",
                        arrows: [
                            { from: "h2", to: "h3" },
                            { from: "h3", to: "g4" },
                        ],
                        squares: ["h3", "g4"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные развивают коня и атакуют центр.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "e4" },
                        ],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "d3",
                        explanation: "Белые укрепляют e4 и открывают дорогу слону c1.",
                        arrows: [{ from: "d2", to: "d3" }],
                        squares: ["d3", "e4"],
                    },
                ],
            },
            {
                key: "grob-spike",
                title: "Линия со взятием на g4",
                subtitle: "1.g4 d5 2.Bg2 Bxg4 3.c4 c6 4.Qb3",
                orderIndex: 1001,
                steps: [
                    {
                        san: "g4",
                        explanation: "Белые провоцируют чёрных и сразу создают дисбаланс.",
                        arrows: [{ from: "g2", to: "g4" }],
                        squares: ["g4"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные открывают диагональ слону c8 и занимают центр.",
                        arrows: [{ from: "d7", to: "d5" }],
                        squares: ["d5", "g4"],
                    },
                    {
                        san: "Bg2",
                        explanation: "Белые развивают слона на большую диагональ.",
                        arrows: [
                            { from: "f1", to: "g2" },
                            { from: "g2", to: "b7" },
                        ],
                        squares: ["g2", "b7"],
                    },
                    {
                        san: "Bxg4",
                        explanation: "Чёрные забирают пешку g4, используя открытую диагональ c8-g4.",
                        arrows: [{ from: "c8", to: "g4" }],
                        squares: ["g4", "c8"],
                    },
                    {
                        san: "c4",
                        explanation: "Белые атакуют центр и пытаются получить компенсацию за пешку.",
                        arrows: [
                            { from: "c2", to: "c4" },
                            { from: "c4", to: "d5" },
                        ],
                        squares: ["c4", "d5"],
                    },
                    {
                        san: "c6",
                        explanation: "Чёрные укрепляют d5 и сохраняют лишнюю пешку.",
                        arrows: [
                            { from: "c7", to: "c6" },
                            { from: "c6", to: "d5" },
                        ],
                        squares: ["c6", "d5"],
                    },
                    {
                        san: "Qb3",
                        explanation: "Ферзь b3 давит на b7 и d5, создавая практические угрозы.",
                        arrows: [
                            { from: "d1", to: "b3" },
                            { from: "b3", to: "b7" },
                        ],
                        squares: ["b3", "b7", "d5"],
                    },
                ],
            },
        ],
    },
    {
        slug: "orangutan-opening",
        eco: "A00",
        title: "Дебют Орангутана",
        side: "white",
        against: "универсально",
        summary: "Дебют Орангутана, или дебют Сокольского, начинается ходом 1.b4 и создаёт фланговое давление на ферзевом фланге.",
        variations: [
            {
                key: "orangutan-main",
                title: "Схема с Bb2",
                subtitle: "1.b4 e5 2.Bb2 d6 3.e3 Nf6 4.c4",
                orderIndex: 1000,
                steps: [
                    {
                        san: "b4",
                        explanation: "Белые захватывают пространство на ферзевом фланге и готовят Bb2.",
                        arrows: [
                            { from: "b2", to: "b4" },
                            { from: "c1", to: "b2" },
                        ],
                        squares: ["b4", "b2"],
                    },
                    {
                        san: "e5",
                        explanation: "Чёрные занимают центр и не спорят с белыми на фланге напрямую.",
                        arrows: [{ from: "e7", to: "e5" }],
                        squares: ["e5", "d4"],
                    },
                    {
                        san: "Bb2",
                        explanation: "Слон b2 давит по большой диагонали на e5 и g7.",
                        arrows: [
                            { from: "c1", to: "b2" },
                            { from: "b2", to: "g7" },
                        ],
                        squares: ["b2", "g7", "e5"],
                    },
                    {
                        san: "d6",
                        explanation: "Чёрные укрепляют e5 и готовят развитие фигур.",
                        arrows: [
                            { from: "d7", to: "d6" },
                            { from: "d6", to: "e5" },
                        ],
                        squares: ["d6", "e5"],
                    },
                    {
                        san: "e3",
                        explanation: "Белые открывают дорогу слону f1 и поддерживают центр.",
                        arrows: [{ from: "e2", to: "e3" }],
                        squares: ["e3", "d4"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные развивают коня и контролируют e4.",
                        arrows: [{ from: "g8", to: "f6" }],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "c4",
                        explanation: "Белые расширяют фланговое давление и контролируют d5.",
                        arrows: [
                            { from: "c2", to: "c4" },
                            { from: "c4", to: "d5" },
                        ],
                        squares: ["c4", "d5"],
                    },
                ],
            },
            {
                key: "orangutan-accepted",
                title: "Принятие пешки b4",
                subtitle: "1.b4 e5 2.Bb2 Bxb4 3.Bxe5 Nf6 4.e3 O-O",
                orderIndex: 1001,
                steps: [
                    {
                        san: "b4",
                        explanation: "Белые предлагают фланговую пешку ради активности слона b2.",
                        arrows: [{ from: "b2", to: "b4" }],
                        squares: ["b4"],
                    },
                    {
                        san: "e5",
                        explanation: "Чёрные занимают центр и открывают диагональ слону f8.",
                        arrows: [
                            { from: "e7", to: "e5" },
                            { from: "f8", to: "b4" },
                        ],
                        squares: ["e5", "b4"],
                    },
                    {
                        san: "Bb2",
                        explanation: "Слон b2 атакует e5 и создаёт компенсацию за возможную жертву пешки.",
                        arrows: [
                            { from: "c1", to: "b2" },
                            { from: "b2", to: "e5" },
                        ],
                        squares: ["b2", "e5"],
                    },
                    {
                        san: "Bxb4",
                        explanation: "Чёрные забирают пешку b4, но слон может стать объектом темпа.",
                        arrows: [{ from: "f8", to: "b4" }],
                        squares: ["b4", "e5"],
                    },
                    {
                        san: "Bxe5",
                        explanation: "Белые возвращают материал и развивают слона с атакой на центр.",
                        arrows: [{ from: "b2", to: "e5" }],
                        squares: ["e5", "g7"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные атакуют слона e5 и развиваются.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "e4" },
                        ],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "e3",
                        explanation: "Белые укрепляют центр и открывают дорогу слону f1.",
                        arrows: [{ from: "e2", to: "e3" }],
                        squares: ["e3", "d4"],
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
        slug: "scholars-mate",
        eco: "C20",
        title: "Детский мат",
        side: "white",
        against: "1...e5",
        summary: "Детский мат — учебная ловушка с атакой на f7 ферзём и слоном. Важно знать не только атаку, но и способы защиты.",
        variations: [
            {
                key: "scholars-classic",
                title: "Классическая ловушка",
                subtitle: "1.e4 e5 2.Qh5 Nc6 3.Bc4 Nf6 4.Qxf7#",
                orderIndex: 1000,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые открывают диагональ слону f1 и занимают центр.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4", "f7"],
                    },
                    {
                        san: "e5",
                        explanation: "Чёрные отвечают симметрично, но поле f7 остаётся слабым.",
                        arrows: [{ from: "e7", to: "e5" }],
                        squares: ["e5", "f7"],
                    },
                    {
                        san: "Qh5",
                        explanation: "Ферзь h5 нападает на e5 и создаёт скрытую угрозу Qxf7#.",
                        arrows: [
                            { from: "d1", to: "h5" },
                            { from: "h5", to: "f7" },
                        ],
                        squares: ["h5", "f7", "e5"],
                    },
                    {
                        san: "Nc6",
                        explanation: "Чёрные защищают e5, но ещё не закрывают угрозу на f7.",
                        arrows: [
                            { from: "b8", to: "c6" },
                            { from: "c6", to: "e5" },
                        ],
                        squares: ["c6", "e5", "f7"],
                    },
                    {
                        san: "Bc4",
                        explanation: "Слон c4 добавляет вторую атаку на f7 — угроза мата становится реальной.",
                        arrows: [
                            { from: "f1", to: "c4" },
                            { from: "c4", to: "f7" },
                        ],
                        squares: ["c4", "f7"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Ошибка: чёрные атакуют ферзя, но не решают проблему поля f7.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "h5" },
                        ],
                        squares: ["f6", "h5", "f7"],
                    },
                    {
                        san: "Qxf7#",
                        explanation: "Ферзь забирает f7 с матом, потому что его поддерживает слон c4.",
                        arrows: [
                            { from: "h5", to: "f7" },
                            { from: "c4", to: "f7" },
                        ],
                        squares: ["f7", "e8"],
                    },
                ],
            },
            {
                key: "scholars-defense",
                title: "Правильная защита",
                subtitle: "1.e4 e5 2.Qh5 Nc6 3.Bc4 g6 4.Qf3 Nf6",
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
                        squares: ["e5", "f7"],
                    },
                    {
                        san: "Qh5",
                        explanation: "Ферзь h5 создаёт давление на e5 и f7.",
                        arrows: [
                            { from: "d1", to: "h5" },
                            { from: "h5", to: "f7" },
                        ],
                        squares: ["h5", "f7"],
                    },
                    {
                        san: "Nc6",
                        explanation: "Чёрные защищают e5 и развивают фигуру.",
                        arrows: [
                            { from: "b8", to: "c6" },
                            { from: "c6", to: "e5" },
                        ],
                        squares: ["c6", "e5"],
                    },
                    {
                        san: "Bc4",
                        explanation: "Белые усиливают давление на f7 слоном c4.",
                        arrows: [
                            { from: "f1", to: "c4" },
                            { from: "c4", to: "f7" },
                        ],
                        squares: ["c4", "f7"],
                    },
                    {
                        san: "g6",
                        explanation: "Правильная защита: чёрные прогоняют ферзя и закрывают диагональ h5-f7.",
                        arrows: [
                            { from: "g7", to: "g6" },
                            { from: "g6", to: "h5" },
                        ],
                        squares: ["g6", "h5", "f7"],
                    },
                    {
                        san: "Qf3",
                        explanation: "Ферзь сохраняет угрозу на f7, но темп атаки уже замедлен.",
                        arrows: [
                            { from: "h5", to: "f3" },
                            { from: "f3", to: "f7" },
                        ],
                        squares: ["f3", "f7"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные развивают коня и перекрывают атакующие идеи белых.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "e4" },
                        ],
                        squares: ["f6", "e4", "f7"],
                    },
                ],
            },
        ],
    },
    {
        slug: "queens-indian-defense",
        eco: "E12",
        title: "Новоиндийская защита",
        side: "black",
        against: "1.d4",
        summary: "Новоиндийская защита развивает слона на b7 и давит на центр белых по большой диагонали.",
        variations: [
            {
                key: "queens-indian-main",
                title: "Фианкетто слона b7",
                subtitle: "1.d4 Nf6 2.c4 e6 3.Nf3 b6 4.g3 Bb7",
                orderIndex: 1000,
                steps: [
                    {
                        san: "d4",
                        explanation: "Белые занимают центр.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4"],
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
                        san: "c4",
                        explanation: "Белые расширяют центр и контролируют d5.",
                        arrows: [
                            { from: "c2", to: "c4" },
                            { from: "c4", to: "d5" },
                        ],
                        squares: ["c4", "d5"],
                    },
                    {
                        san: "e6",
                        explanation: "Чёрные готовят развитие слона и сохраняют гибкую структуру.",
                        arrows: [{ from: "e7", to: "e6" }],
                        squares: ["e6", "b4", "b7"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и избегают связки Нимцо-индийской защиты.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "e5"],
                    },
                    {
                        san: "b6",
                        explanation: "Чёрные готовят слона b7 для давления на e4 и центр.",
                        arrows: [
                            { from: "b7", to: "b6" },
                            { from: "c8", to: "b7" },
                        ],
                        squares: ["b6", "b7", "e4"],
                    },
                    {
                        san: "g3",
                        explanation: "Белые готовят фианкетто и встречную борьбу по большой диагонали.",
                        arrows: [{ from: "g2", to: "g3" }],
                        squares: ["g3", "g2"],
                    },
                    {
                        san: "Bb7",
                        explanation: "Слон b7 давит на e4 и поддерживает борьбу против белого центра.",
                        arrows: [
                            { from: "c8", to: "b7" },
                            { from: "b7", to: "e4" },
                        ],
                        squares: ["b7", "e4"],
                    },
                ],
            },
            {
                key: "queens-indian-petrosian",
                title: "Система Петросяна",
                subtitle: "1.d4 Nf6 2.c4 e6 3.Nf3 b6 4.a3 Bb7 5.Nc3 d5",
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
                        explanation: "Чёрные контролируют e4 и развивают фигуру.",
                        arrows: [{ from: "g8", to: "f6" }],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "c4",
                        explanation: "Белые расширяют центр.",
                        arrows: [{ from: "c2", to: "c4" }],
                        squares: ["c4", "d5"],
                    },
                    {
                        san: "e6",
                        explanation: "Чёрные готовят гибкую индийскую структуру.",
                        arrows: [{ from: "e7", to: "e6" }],
                        squares: ["e6"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и не дают связку ...Bb4.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3"],
                    },
                    {
                        san: "b6",
                        explanation: "Чёрные готовят слона b7.",
                        arrows: [
                            { from: "b7", to: "b6" },
                            { from: "c8", to: "b7" },
                        ],
                        squares: ["b6", "b7"],
                    },
                    {
                        san: "a3",
                        explanation: "Белые заранее контролируют b4 и ограничивают активность чёрного слона.",
                        arrows: [
                            { from: "a2", to: "a3" },
                            { from: "a3", to: "b4" },
                        ],
                        squares: ["a3", "b4"],
                    },
                    {
                        san: "Bb7",
                        explanation: "Слон b7 выходит на большую диагональ и давит на e4.",
                        arrows: [
                            { from: "c8", to: "b7" },
                            { from: "b7", to: "e4" },
                        ],
                        squares: ["b7", "e4"],
                    },
                    {
                        san: "Nc3",
                        explanation: "Белые усиливают контроль d5 и e4.",
                        arrows: [{ from: "b1", to: "c3" }],
                        squares: ["c3", "d5"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные занимают центр и переводят игру в устойчивую структуру.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "c4" },
                        ],
                        squares: ["d5", "c4"],
                    },
                ],
            },
        ],
    },
    {
        slug: "colle-system",
        eco: "D05",
        title: "Система Колле",
        side: "white",
        against: "универсально",
        summary: "Система Колле — надёжная расстановка за белых с d4, Nf3, e3 и Bd3. Главная идея — подготовить e4 и атаку на h7.",
        variations: [
            {
                key: "colle-main",
                title: "Классическая схема",
                subtitle: "1.d4 d5 2.Nf3 Nf6 3.e3 e6 4.Bd3 c5 5.c3 Nc6 6.Nbd2",
                orderIndex: 1000,
                steps: [
                    {
                        san: "d4",
                        explanation: "Белые занимают центр и открывают дорогу слону c1.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e5"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные отвечают в центре.",
                        arrows: [{ from: "d7", to: "d5" }],
                        squares: ["d5", "e4"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и поддерживают d4.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "d4"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные развивают коня и контролируют e4.",
                        arrows: [{ from: "g8", to: "f6" }],
                        squares: ["f6", "e4"],
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
                        san: "e6",
                        explanation: "Чёрные строят прочную центральную структуру.",
                        arrows: [{ from: "e7", to: "e6" }],
                        squares: ["e6", "d5"],
                    },
                    {
                        san: "Bd3",
                        explanation: "Слон d3 нацелен на h7 — типичная атакующая идея Колле.",
                        arrows: [
                            { from: "f1", to: "d3" },
                            { from: "d3", to: "h7" },
                        ],
                        squares: ["d3", "h7"],
                    },
                    {
                        san: "c5",
                        explanation: "Чёрные атакуют центр белых, особенно пешку d4.",
                        arrows: [
                            { from: "c7", to: "c5" },
                            { from: "c5", to: "d4" },
                        ],
                        squares: ["c5", "d4"],
                    },
                    {
                        san: "c3",
                        explanation: "Белые укрепляют d4 и готовят центральный прорыв e4.",
                        arrows: [
                            { from: "c2", to: "c3" },
                            { from: "c3", to: "d4" },
                        ],
                        squares: ["c3", "d4", "e4"],
                    },
                    {
                        san: "Nc6",
                        explanation: "Чёрные усиливают давление на d4 и e5.",
                        arrows: [{ from: "b8", to: "c6" }],
                        squares: ["c6", "d4", "e5"],
                    },
                    {
                        san: "Nbd2",
                        explanation: "Конь d2 поддерживает e4 и завершает типичную расстановку Колле.",
                        arrows: [
                            { from: "b1", to: "d2" },
                            { from: "d2", to: "e4" },
                        ],
                        squares: ["d2", "e4"],
                    },
                ],
            },
            {
                key: "colle-zukertort",
                title: "Колле — Цукерторт",
                subtitle: "1.d4 Nf6 2.Nf3 e6 3.e3 b6 4.Bd3 Bb7 5.O-O Be7",
                orderIndex: 1001,
                steps: [
                    {
                        san: "d4",
                        explanation: "Белые начинают с контроля центра.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные развивают коня и контролируют e4.",
                        arrows: [{ from: "g8", to: "f6" }],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и поддерживают d4.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "d4"],
                    },
                    {
                        san: "e6",
                        explanation: "Чёрные укрепляют центр и готовят развитие слона.",
                        arrows: [{ from: "e7", to: "e6" }],
                        squares: ["e6", "d5"],
                    },
                    {
                        san: "e3",
                        explanation: "Белые открывают дорогу слону f1.",
                        arrows: [{ from: "e2", to: "e3" }],
                        squares: ["e3", "d4"],
                    },
                    {
                        san: "b6",
                        explanation: "Чёрные готовят слона b7 для давления по большой диагонали.",
                        arrows: [
                            { from: "b7", to: "b6" },
                            { from: "c8", to: "b7" },
                        ],
                        squares: ["b6", "b7"],
                    },
                    {
                        san: "Bd3",
                        explanation: "Слон d3 создаёт давление на h7 и поддерживает атаку.",
                        arrows: [
                            { from: "f1", to: "d3" },
                            { from: "d3", to: "h7" },
                        ],
                        squares: ["d3", "h7"],
                    },
                    {
                        san: "Bb7",
                        explanation: "Слон b7 давит на e4 и центр белых.",
                        arrows: [
                            { from: "c8", to: "b7" },
                            { from: "b7", to: "e4" },
                        ],
                        squares: ["b7", "e4"],
                    },
                    {
                        san: "O-O",
                        explanation: "Белые рокируют и готовят e4 или b3-Bb2.",
                        arrows: [{ from: "e1", to: "g1" }],
                        squares: ["g1", "e4"],
                    },
                    {
                        san: "Be7",
                        explanation: "Чёрные готовят рокировку и завершают развитие королевского фланга.",
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
        slug: "nimzowitsch-defense",
        eco: "B00",
        title: "Защита Нимцовича",
        side: "black",
        against: "1.e4",
        summary: "Защита Нимцовича начинается 1...Nc6. Чёрные гибко давят на центр и часто провоцируют белых на раннее продвижение пешек.",
        variations: [
            {
                key: "nimzowitsch-main",
                title: "Классическая схема с ...d5",
                subtitle: "1.e4 Nc6 2.d4 d5 3.e5 Bf5 4.Nf3 e6",
                orderIndex: 1000,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4", "d5"],
                    },
                    {
                        san: "Nc6",
                        explanation: "Чёрные развивают коня и сразу давят на d4/e5.",
                        arrows: [
                            { from: "b8", to: "c6" },
                            { from: "c6", to: "d4" },
                        ],
                        squares: ["c6", "d4"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые строят центр e4-d4.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e4"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные немедленно атакуют e4 и фиксируют центр.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "e4" },
                        ],
                        squares: ["d5", "e4"],
                    },
                    {
                        san: "e5",
                        explanation: "Белые закрывают центр и получают пространство.",
                        arrows: [
                            { from: "e4", to: "e5" },
                            { from: "e5", to: "f6" },
                        ],
                        squares: ["e5", "f6"],
                    },
                    {
                        san: "Bf5",
                        explanation: "Слон f5 выходит активно до ...e6 и давит на c2.",
                        arrows: [
                            { from: "c8", to: "f5" },
                            { from: "f5", to: "c2" },
                        ],
                        squares: ["f5", "c2"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и поддерживают центр.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "e5", "d4"],
                    },
                    {
                        san: "e6",
                        explanation: "Чёрные укрепляют d5 и готовят развитие королевского фланга.",
                        arrows: [{ from: "e7", to: "e6" }],
                        squares: ["e6", "d5"],
                    },
                ],
            },
            {
                key: "nimzowitsch-flexible",
                title: "Гибкая система с ...d6",
                subtitle: "1.e4 Nc6 2.Nf3 d6 3.d4 Nf6 4.Nc3 Bg4",
                orderIndex: 1001,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4"],
                    },
                    {
                        san: "Nc6",
                        explanation: "Чёрные начинают с давления конём на d4/e5.",
                        arrows: [{ from: "b8", to: "c6" }],
                        squares: ["c6", "d4"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и поддерживают d4.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "d4"],
                    },
                    {
                        san: "d6",
                        explanation: "Чёрные строят гибкую структуру и готовят ...Nf6.",
                        arrows: [{ from: "d7", to: "d6" }],
                        squares: ["d6", "e5"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые получают полноценный центр.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e4"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные атакуют e4 и усиливают давление на центр.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "e4" },
                        ],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "Nc3",
                        explanation: "Белые защищают e4 и развивают фигуру.",
                        arrows: [{ from: "b1", to: "c3" }],
                        squares: ["c3", "e4"],
                    },
                    {
                        san: "Bg4",
                        explanation: "Слон g4 связывает коня f3 и усиливает давление на e4.",
                        arrows: [
                            { from: "c8", to: "g4" },
                            { from: "g4", to: "f3" },
                        ],
                        squares: ["g4", "f3", "e4"],
                    },
                ],
            },
        ],
    },
    {
        slug: "owen-defense",
        eco: "B00",
        title: "Защита Оуэна",
        side: "black",
        against: "1.e4",
        summary: "Защита Оуэна начинается ходом 1...b6. Чёрные развивают слона на b7 и давят на центр белых издалека.",
        variations: [
            {
                key: "owen-main",
                title: "Слон на b7",
                subtitle: "1.e4 b6 2.d4 Bb7 3.Bd3 e6 4.Nf3 c5",
                orderIndex: 1000,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4"],
                    },
                    {
                        san: "b6",
                        explanation: "Чёрные готовят слона b7 для давления на e4.",
                        arrows: [
                            { from: "b7", to: "b6" },
                            { from: "c8", to: "b7" },
                        ],
                        squares: ["b6", "b7", "e4"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые строят центр e4-d4.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e4"],
                    },
                    {
                        san: "Bb7",
                        explanation: "Слон b7 давит на e4 и заставляет белых защищать центр.",
                        arrows: [
                            { from: "c8", to: "b7" },
                            { from: "b7", to: "e4" },
                        ],
                        squares: ["b7", "e4"],
                    },
                    {
                        san: "Bd3",
                        explanation: "Белые защищают e4 и развивают слона на активную диагональ.",
                        arrows: [
                            { from: "f1", to: "d3" },
                            { from: "d3", to: "h7" },
                        ],
                        squares: ["d3", "e4", "h7"],
                    },
                    {
                        san: "e6",
                        explanation: "Чёрные укрепляют центр и открывают дорогу слону f8.",
                        arrows: [{ from: "e7", to: "e6" }],
                        squares: ["e6", "d5"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и готовят рокировку.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "e5"],
                    },
                    {
                        san: "c5",
                        explanation: "Чёрные атакуют основание центра d4.",
                        arrows: [
                            { from: "c7", to: "c5" },
                            { from: "c5", to: "d4" },
                        ],
                        squares: ["c5", "d4"],
                    },
                ],
            },
            {
                key: "owen-english-defense",
                title: "Система с ...e6 и ...c5",
                subtitle: "1.e4 b6 2.d4 Bb7 3.Nc3 e6 4.Nf3 c5",
                orderIndex: 1001,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4"],
                    },
                    {
                        san: "b6",
                        explanation: "Чёрные готовят фианкетто слона b7.",
                        arrows: [{ from: "b7", to: "b6" }],
                        squares: ["b6", "b7"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые строят мощный центр.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e4"],
                    },
                    {
                        san: "Bb7",
                        explanation: "Слон b7 начинает давление по диагонали на e4.",
                        arrows: [
                            { from: "c8", to: "b7" },
                            { from: "b7", to: "e4" },
                        ],
                        squares: ["b7", "e4"],
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
                        san: "e6",
                        explanation: "Чёрные укрепляют центр и готовят ...c5.",
                        arrows: [{ from: "e7", to: "e6" }],
                        squares: ["e6", "c5"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и готовят рокировку.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "e5"],
                    },
                    {
                        san: "c5",
                        explanation: "Чёрные подрывают центр белых с фланга.",
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
        slug: "modern-defense",
        eco: "B06",
        title: "Современная защита",
        side: "black",
        against: "1.e4",
        summary: "Современная защита отдаёт белым центр, чтобы атаковать его фигурами с фланга, прежде всего слоном g7.",
        variations: [
            {
                key: "modern-main",
                title: "Фианкетто слона g7",
                subtitle: "1.e4 g6 2.d4 Bg7 3.Nc3 d6 4.Nf3",
                orderIndex: 1000,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4"],
                    },
                    {
                        san: "g6",
                        explanation: "Чёрные готовят слона g7 и фланговое давление на центр.",
                        arrows: [
                            { from: "g7", to: "g6" },
                            { from: "f8", to: "g7" },
                        ],
                        squares: ["g6", "g7"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые строят сильный центр e4-d4.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e4"],
                    },
                    {
                        san: "Bg7",
                        explanation: "Слон g7 давит на d4 и становится главной фигурой защиты.",
                        arrows: [
                            { from: "f8", to: "g7" },
                            { from: "g7", to: "d4" },
                        ],
                        squares: ["g7", "d4"],
                    },
                    {
                        san: "Nc3",
                        explanation: "Белые защищают e4 и поддерживают центр.",
                        arrows: [{ from: "b1", to: "c3" }],
                        squares: ["c3", "e4"],
                    },
                    {
                        san: "d6",
                        explanation: "Чёрные готовят ...Nf6 и подрывы по центру.",
                        arrows: [
                            { from: "d7", to: "d6" },
                            { from: "d6", to: "e5" },
                        ],
                        squares: ["d6", "e5"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и готовят рокировку.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "e5"],
                    },
                ],
            },
            {
                key: "modern-averbakh",
                title: "Система Авербаха",
                subtitle: "1.e4 g6 2.d4 Bg7 3.c4 d6 4.Nc3 e5",
                orderIndex: 1001,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4"],
                    },
                    {
                        san: "g6",
                        explanation: "Чёрные готовят фианкетто.",
                        arrows: [{ from: "g7", to: "g6" }],
                        squares: ["g6", "g7"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые получают мощный центр.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e4"],
                    },
                    {
                        san: "Bg7",
                        explanation: "Слон g7 давит на d4.",
                        arrows: [
                            { from: "f8", to: "g7" },
                            { from: "g7", to: "d4" },
                        ],
                        squares: ["g7", "d4"],
                    },
                    {
                        san: "c4",
                        explanation: "Белые строят центр c4-d4-e4 и получают пространство.",
                        arrows: [
                            { from: "c2", to: "c4" },
                            { from: "c4", to: "d5" },
                        ],
                        squares: ["c4", "d5"],
                    },
                    {
                        san: "d6",
                        explanation: "Чёрные готовят центральный подрыв.",
                        arrows: [
                            { from: "d7", to: "d6" },
                            { from: "e7", to: "e5" },
                        ],
                        squares: ["d6", "e5"],
                    },
                    {
                        san: "Nc3",
                        explanation: "Белые поддерживают d5/e4 и завершают центр.",
                        arrows: [{ from: "b1", to: "c3" }],
                        squares: ["c3", "d5", "e4"],
                    },
                    {
                        san: "e5",
                        explanation: "Чёрные атакуют центр, не позволяя белым спокойно расширяться.",
                        arrows: [
                            { from: "e7", to: "e5" },
                            { from: "e5", to: "d4" },
                        ],
                        squares: ["e5", "d4"],
                    },
                ],
            },
        ],
    },
];
//# sourceMappingURL=openingQualitySeedDataV6.js.map