export const OPENING_QUALITY_SEEDS_V5 = [
    {
        slug: "kings-gambit",
        eco: "C30",
        title: "Королевский гамбит",
        side: "white",
        against: "1...e5",
        summary: "Королевский гамбит — острое начало, где белые жертвуют пешку f4 ради инициативы, открытой линии f и атаки на короля.",
        variations: [
            {
                key: "kings-gambit-accepted",
                title: "Принятый королевский гамбит",
                subtitle: "1.e4 e5 2.f4 exf4 3.Nf3 g5 4.Bc4 Bg7 5.O-O",
                orderIndex: 1000,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр и открывают линии для ферзя и слона.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4", "d5", "f5"],
                    },
                    {
                        san: "e5",
                        explanation: "Чёрные отвечают симметрично и удерживают центральное равновесие.",
                        arrows: [{ from: "e7", to: "e5" }],
                        squares: ["e5", "d4"],
                    },
                    {
                        san: "f4",
                        explanation: "Белые жертвуют пешку f, чтобы атаковать e5 и открыть линию f для атаки.",
                        arrows: [
                            { from: "f2", to: "f4" },
                            { from: "f4", to: "e5" },
                        ],
                        squares: ["f4", "e5", "f-file"],
                    },
                    {
                        san: "exf4",
                        explanation: "Чёрные принимают гамбитную пешку, но открывают белым линию f.",
                        arrows: [{ from: "e5", to: "f4" }],
                        squares: ["f4", "f-file"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Конь f3 мешает шаху ферзём h4+ и помогает белым развиваться.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "h4"],
                    },
                    {
                        san: "g5",
                        explanation: "Чёрные защищают пешку f4 и пытаются удержать лишний материал.",
                        arrows: [
                            { from: "g7", to: "g5" },
                            { from: "g5", to: "f4" },
                        ],
                        squares: ["g5", "f4"],
                    },
                    {
                        san: "Bc4",
                        explanation: "Слон c4 нацелен на f7 и ускоряет атаку белых.",
                        arrows: [
                            { from: "f1", to: "c4" },
                            { from: "c4", to: "f7" },
                        ],
                        squares: ["c4", "f7"],
                    },
                    {
                        san: "Bg7",
                        explanation: "Чёрные развивают слона и защищают королевский фланг.",
                        arrows: [
                            { from: "f8", to: "g7" },
                            { from: "g7", to: "b2" },
                        ],
                        squares: ["g7", "b2"],
                    },
                    {
                        san: "O-O",
                        explanation: "Белые рокируют и подключают ладью к открытой линии f.",
                        arrows: [
                            { from: "e1", to: "g1" },
                            { from: "f1", to: "f-file" },
                        ],
                        squares: ["g1", "f-file"],
                    },
                ],
            },
            {
                key: "kings-gambit-declined",
                title: "Отказанный королевский гамбит",
                subtitle: "1.e4 e5 2.f4 Bc5 3.Nf3 d6 4.Nc3 Nf6",
                orderIndex: 1001,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые начинают борьбу за центр.",
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
                        san: "f4",
                        explanation: "Белые предлагают гамбит и хотят вскрыть линию f.",
                        arrows: [
                            { from: "f2", to: "f4" },
                            { from: "f4", to: "e5" },
                        ],
                        squares: ["f4", "e5"],
                    },
                    {
                        san: "Bc5",
                        explanation: "Чёрные отклоняют гамбит и развивают слона с давлением на f2.",
                        arrows: [
                            { from: "f8", to: "c5" },
                            { from: "c5", to: "f2" },
                        ],
                        squares: ["c5", "f2"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и атакуют e5.",
                        arrows: [
                            { from: "g1", to: "f3" },
                            { from: "f3", to: "e5" },
                        ],
                        squares: ["f3", "e5"],
                    },
                    {
                        san: "d6",
                        explanation: "Чёрные укрепляют e5 и сохраняют крепкую структуру.",
                        arrows: [
                            { from: "d7", to: "d6" },
                            { from: "d6", to: "e5" },
                        ],
                        squares: ["d6", "e5"],
                    },
                    {
                        san: "Nc3",
                        explanation: "Белые усиливают контроль центра и готовят развитие слона.",
                        arrows: [
                            { from: "b1", to: "c3" },
                            { from: "c3", to: "d5" },
                        ],
                        squares: ["c3", "d5"],
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
                ],
            },
        ],
    },
    {
        slug: "four-knights-game",
        eco: "C47",
        title: "Партия четырёх коней",
        side: "white",
        against: "1...e5",
        summary: "Партия четырёх коней — спокойное классическое начало, где обе стороны естественно развивают коней и борются за центр.",
        variations: [
            {
                key: "four-knights-spanish",
                title: "Испанская схема",
                subtitle: "1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.Bb5",
                orderIndex: 1000,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр и открывают линии фигурам.",
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
                        explanation: "Конь f3 атакует пешку e5.",
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
                        san: "Nc3",
                        explanation: "Белые развивают второго коня и усиливают контроль d5.",
                        arrows: [
                            { from: "b1", to: "c3" },
                            { from: "c3", to: "d5" },
                        ],
                        squares: ["c3", "d5"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные завершают симметричное развитие коней и атакуют e4.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "e4" },
                        ],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "Bb5",
                        explanation: "Слон b5 переводит игру к испанским идеям давления на коня c6.",
                        arrows: [
                            { from: "f1", to: "b5" },
                            { from: "b5", to: "c6" },
                        ],
                        squares: ["b5", "c6", "e5"],
                    },
                ],
            },
            {
                key: "four-knights-scotch",
                title: "Шотландская схема",
                subtitle: "1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.d4 exd4 5.Nxd4",
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
                        explanation: "Конь атакует e5.",
                        arrows: [
                            { from: "g1", to: "f3" },
                            { from: "f3", to: "e5" },
                        ],
                        squares: ["f3", "e5"],
                    },
                    {
                        san: "Nc6",
                        explanation: "Конь защищает e5.",
                        arrows: [
                            { from: "b8", to: "c6" },
                            { from: "c6", to: "e5" },
                        ],
                        squares: ["c6", "e5"],
                    },
                    {
                        san: "Nc3",
                        explanation: "Белые развивают второго коня.",
                        arrows: [{ from: "b1", to: "c3" }],
                        squares: ["c3", "d5"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные также развивают второго коня.",
                        arrows: [{ from: "g8", to: "f6" }],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые вскрывают центр и переходят к шотландской структуре.",
                        arrows: [
                            { from: "d2", to: "d4" },
                            { from: "d4", to: "e5" },
                        ],
                        squares: ["d4", "e5"],
                    },
                    {
                        san: "exd4",
                        explanation: "Чёрные снимают напряжение в центре.",
                        arrows: [{ from: "e5", to: "d4" }],
                        squares: ["d4"],
                    },
                    {
                        san: "Nxd4",
                        explanation: "Белые централизуют коня и получают активную игру.",
                        arrows: [{ from: "f3", to: "d4" }],
                        squares: ["d4", "c6"],
                    },
                ],
            },
        ],
    },
    {
        slug: "bishop-opening",
        eco: "C24",
        title: "Слоновый дебют",
        side: "white",
        against: "1...e5",
        summary: "Слоновый дебют развивает слона на c4 без раннего Nf3, сохраняя гибкость и давление на f7.",
        variations: [
            {
                key: "bishop-classical",
                title: "Классическое развитие",
                subtitle: "1.e4 e5 2.Bc4 Nf6 3.d3 c6 4.Nf3 d5",
                orderIndex: 1000,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр и открывают диагональ слону f1.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4", "d5"],
                    },
                    {
                        san: "e5",
                        explanation: "Чёрные отвечают в центре.",
                        arrows: [{ from: "e7", to: "e5" }],
                        squares: ["e5"],
                    },
                    {
                        san: "Bc4",
                        explanation: "Слон c4 сразу нацелен на слабое поле f7.",
                        arrows: [
                            { from: "f1", to: "c4" },
                            { from: "c4", to: "f7" },
                        ],
                        squares: ["c4", "f7"],
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
                        san: "d3",
                        explanation: "Белые укрепляют e4 и сохраняют слона c4 активным.",
                        arrows: [
                            { from: "d2", to: "d3" },
                            { from: "d3", to: "e4" },
                        ],
                        squares: ["d3", "e4"],
                    },
                    {
                        san: "c6",
                        explanation: "Чёрные готовят ...d5 и расширение в центре.",
                        arrows: [
                            { from: "c7", to: "c6" },
                            { from: "d7", to: "d5" },
                        ],
                        squares: ["c6", "d5"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня, защищают e5/d4 и готовят рокировку.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "e5", "d4"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные проводят центральный прорыв и атакуют слона c4.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "c4" },
                        ],
                        squares: ["d5", "c4"],
                    },
                ],
            },
            {
                key: "bishop-ursov",
                title: "Гамбит Урусова",
                subtitle: "1.e4 e5 2.Bc4 Nf6 3.d4 exd4 4.Nf3",
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
                        san: "Bc4",
                        explanation: "Слон давит на f7 и готовит острую игру.",
                        arrows: [
                            { from: "f1", to: "c4" },
                            { from: "c4", to: "f7" },
                        ],
                        squares: ["c4", "f7"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные атакуют e4.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "e4" },
                        ],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые жертвуют пешку ради вскрытия центра.",
                        arrows: [
                            { from: "d2", to: "d4" },
                            { from: "d4", to: "e5" },
                        ],
                        squares: ["d4", "e5"],
                    },
                    {
                        san: "exd4",
                        explanation: "Чёрные принимают пешку, но открывают линии белым фигурам.",
                        arrows: [{ from: "e5", to: "d4" }],
                        squares: ["d4"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и готовы быстро атаковать центр.",
                        arrows: [
                            { from: "g1", to: "f3" },
                            { from: "f3", to: "d4" },
                        ],
                        squares: ["f3", "d4"],
                    },
                ],
            },
        ],
    },
    {
        slug: "alekhine-defense",
        eco: "B02",
        title: "Защита Алехина",
        side: "black",
        against: "1.e4",
        summary: "Защита Алехина провоцирует белые пешки идти вперёд, чтобы затем атаковать их как чрезмерно растянутый центр.",
        variations: [
            {
                key: "alekhine-main",
                title: "Основная идея",
                subtitle: "1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.Nf3",
                orderIndex: 1000,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр и открывают линии.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4", "d5"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные сразу атакуют e4 и провоцируют продвижение пешки.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "e4" },
                        ],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "e5",
                        explanation: "Белые гонят коня и получают пространство, но центр становится целью.",
                        arrows: [
                            { from: "e4", to: "e5" },
                            { from: "e5", to: "f6" },
                        ],
                        squares: ["e5", "f6"],
                    },
                    {
                        san: "Nd5",
                        explanation: "Конь отступает на d5 и продолжает давить на центральные поля.",
                        arrows: [
                            { from: "f6", to: "d5" },
                            { from: "d5", to: "c3" },
                        ],
                        squares: ["d5", "c3"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые строят большой центр e5-d4.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e5"],
                    },
                    {
                        san: "d6",
                        explanation: "Чёрные начинают подрыв пешки e5.",
                        arrows: [
                            { from: "d7", to: "d6" },
                            { from: "d6", to: "e5" },
                        ],
                        squares: ["d6", "e5"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и поддерживают центр.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "e5", "d4"],
                    },
                ],
            },
            {
                key: "alekhine-four-pawns",
                title: "Атака четырёх пешек",
                subtitle: "1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.c4 Nb6 5.f4",
                orderIndex: 1001,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные атакуют e4 и приглашают белых продвинуть пешку.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "e4" },
                        ],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "e5",
                        explanation: "Белые получают пространство, отгоняя коня.",
                        arrows: [{ from: "e4", to: "e5" }],
                        squares: ["e5", "f6"],
                    },
                    {
                        san: "Nd5",
                        explanation: "Конь уходит на d5, где продолжает давить на центр.",
                        arrows: [{ from: "f6", to: "d5" }],
                        squares: ["d5"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые строят большую пешечную цепь.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e5"],
                    },
                    {
                        san: "d6",
                        explanation: "Чёрные начинают разрушать чрезмерно большой центр.",
                        arrows: [
                            { from: "d7", to: "d6" },
                            { from: "d6", to: "e5" },
                        ],
                        squares: ["d6", "e5"],
                    },
                    {
                        san: "c4",
                        explanation: "Белые отгоняют коня d5 и захватывают ещё больше пространства.",
                        arrows: [
                            { from: "c2", to: "c4" },
                            { from: "c4", to: "d5" },
                        ],
                        squares: ["c4", "d5"],
                    },
                    {
                        san: "Nb6",
                        explanation: "Конь отступает на b6 и будет давить на c4/d5.",
                        arrows: [{ from: "d5", to: "b6" }],
                        squares: ["b6", "c4"],
                    },
                    {
                        san: "f4",
                        explanation: "Белые строят атаку четырёх пешек, но их центр становится уязвимым.",
                        arrows: [
                            { from: "f2", to: "f4" },
                            { from: "f4", to: "e5" },
                        ],
                        squares: ["f4", "e5", "d4"],
                    },
                ],
            },
        ],
    },
    {
        slug: "latvian-gambit",
        eco: "C40",
        title: "Латышский гамбит",
        side: "black",
        against: "1.e4",
        summary: "Латышский гамбит — рискованное оружие после 1.e4 e5 2.Nf3 f5, где чёрные сразу атакуют центр ценой ослабления короля.",
        variations: [
            {
                key: "latvian-main",
                title: "Основная гамбитная идея",
                subtitle: "1.e4 e5 2.Nf3 f5 3.Nxe5 Qf6 4.d4 d6",
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
                        san: "f5",
                        explanation: "...f5 — резкий гамбитный удар: чёрные атакуют e4 и открывают линию f.",
                        arrows: [
                            { from: "f7", to: "f5" },
                            { from: "f5", to: "e4" },
                        ],
                        squares: ["f5", "e4", "f-file"],
                    },
                    {
                        san: "Nxe5",
                        explanation: "Белые забирают e5 и проверяют компенсацию чёрных.",
                        arrows: [{ from: "f3", to: "e5" }],
                        squares: ["e5"],
                    },
                    {
                        san: "Qf6",
                        explanation: "Ферзь f6 нападает на e5 и поддерживает активную игру чёрных.",
                        arrows: [
                            { from: "d8", to: "f6" },
                            { from: "f6", to: "e5" },
                        ],
                        squares: ["f6", "e5"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые укрепляют коня e5 и занимают центр.",
                        arrows: [
                            { from: "d2", to: "d4" },
                            { from: "d4", to: "e5" },
                        ],
                        squares: ["d4", "e5"],
                    },
                    {
                        san: "d6",
                        explanation: "Чёрные атакуют коня e5 и пытаются вернуть материал.",
                        arrows: [
                            { from: "d7", to: "d6" },
                            { from: "d6", to: "e5" },
                        ],
                        squares: ["d6", "e5"],
                    },
                ],
            },
            {
                key: "latvian-accepted",
                title: "Принятая линия с exf5",
                subtitle: "1.e4 e5 2.Nf3 f5 3.exf5 e4 4.Qe2 Qe7",
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
                        explanation: "Конь атакует e5.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "e5"],
                    },
                    {
                        san: "f5",
                        explanation: "Чёрные предлагают гамбитную пешку f.",
                        arrows: [
                            { from: "f7", to: "f5" },
                            { from: "f5", to: "e4" },
                        ],
                        squares: ["f5", "e4"],
                    },
                    {
                        san: "exf5",
                        explanation: "Белые принимают пешку и открывают линию e.",
                        arrows: [{ from: "e4", to: "f5" }],
                        squares: ["f5"],
                    },
                    {
                        san: "e4",
                        explanation: "Чёрные отгоняют коня f3 и получают активную пешку e4.",
                        arrows: [
                            { from: "e5", to: "e4" },
                            { from: "e4", to: "f3" },
                        ],
                        squares: ["e4", "f3"],
                    },
                    {
                        san: "Qe2",
                        explanation: "Белые связывают продвижение e4 и готовят вернуть центр.",
                        arrows: [
                            { from: "d1", to: "e2" },
                            { from: "e2", to: "e4" },
                        ],
                        squares: ["e2", "e4"],
                    },
                    {
                        san: "Qe7",
                        explanation: "Чёрные защищают пешку e4 и сохраняют осложнения.",
                        arrows: [
                            { from: "d8", to: "e7" },
                            { from: "e7", to: "e4" },
                        ],
                        squares: ["e7", "e4"],
                    },
                ],
            },
        ],
    },
    {
        slug: "elephant-gambit",
        eco: "C40",
        title: "Гамбит Элефанта",
        side: "black",
        against: "1.e4",
        summary: "Гамбит Элефанта после 1.e4 e5 2.Nf3 d5 сразу бьёт по центру и ведёт к редкой тактической игре.",
        variations: [
            {
                key: "elephant-main",
                title: "Центральный удар ...d5",
                subtitle: "1.e4 e5 2.Nf3 d5 3.exd5 e4",
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
                        san: "d5",
                        explanation: "...d5 — резкий центральный удар вместо спокойной защиты e5.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "e4" },
                        ],
                        squares: ["d5", "e4"],
                    },
                    {
                        san: "exd5",
                        explanation: "Белые принимают вызов и забирают пешку d5.",
                        arrows: [{ from: "e4", to: "d5" }],
                        squares: ["d5"],
                    },
                    {
                        san: "e4",
                        explanation: "...e4 отгоняет коня f3 и даёт чёрным активную игру за пешку.",
                        arrows: [
                            { from: "e5", to: "e4" },
                            { from: "e4", to: "f3" },
                        ],
                        squares: ["e4", "f3"],
                    },
                ],
            },
            {
                key: "elephant-accepted",
                title: "Принятый вариант",
                subtitle: "1.e4 e5 2.Nf3 d5 3.Nxe5 Bd6 4.d4 dxe4",
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
                        explanation: "Чёрные занимают центр.",
                        arrows: [{ from: "e7", to: "e5" }],
                        squares: ["e5"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые атакуют e5.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "e5"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные сразу атакуют центр.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "e4" },
                        ],
                        squares: ["d5", "e4"],
                    },
                    {
                        san: "Nxe5",
                        explanation: "Белые забирают e5, рассчитывая на материальный перевес.",
                        arrows: [{ from: "f3", to: "e5" }],
                        squares: ["e5"],
                    },
                    {
                        san: "Bd6",
                        explanation: "Слон d6 атакует коня e5 и ускоряет развитие чёрных.",
                        arrows: [
                            { from: "f8", to: "d6" },
                            { from: "d6", to: "e5" },
                        ],
                        squares: ["d6", "e5"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые укрепляют центр и освобождают слона c1.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4"],
                    },
                    {
                        san: "dxe4",
                        explanation: "Чёрные возвращают материал и вскрывают линии в центре.",
                        arrows: [{ from: "d5", to: "e4" }],
                        squares: ["e4"],
                    },
                ],
            },
        ],
    },
];
//# sourceMappingURL=openingQualitySeedDataV5.js.map