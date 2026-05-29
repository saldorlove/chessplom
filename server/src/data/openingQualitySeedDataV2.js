export const OPENING_QUALITY_SEEDS_V2 = [
    {
        slug: "caro-kann-defense",
        eco: "B10",
        title: "Защита Каро-Канн",
        side: "black",
        against: "1.e4",
        summary: "Надёжная защита против 1.e4. Чёрные готовят ...d5, сохраняя крепкую пешечную структуру.",
        variations: [
            {
                key: "caro-classical",
                title: "Классический вариант",
                subtitle: "1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Bf5",
                orderIndex: 1000,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр и открывают линии для ферзя и слона.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4", "d5"],
                    },
                    {
                        san: "c6",
                        explanation: "Чёрные готовят ...d5, чтобы атаковать центр белых без ослабления короля.",
                        arrows: [
                            { from: "c7", to: "c6" },
                            { from: "d7", to: "d5" },
                        ],
                        squares: ["c6", "d5"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые строят мощный пешечный центр e4-d4.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e4"],
                    },
                    {
                        san: "d5",
                        explanation: "Главный удар Каро-Канн: чёрные сразу оспаривают пешку e4.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "e4" },
                        ],
                        squares: ["d5", "e4"],
                    },
                    {
                        san: "Nc3",
                        explanation: "Конь c3 защищает e4 и сохраняет напряжение в центре.",
                        arrows: [
                            { from: "b1", to: "c3" },
                            { from: "c3", to: "e4" },
                        ],
                        squares: ["c3", "e4"],
                    },
                    {
                        san: "dxe4",
                        explanation: "Чёрные снимают напряжение и вынуждают белого коня выйти на e4.",
                        arrows: [{ from: "d5", to: "e4" }],
                        squares: ["e4"],
                    },
                    {
                        san: "Nxe4",
                        explanation: "Белые централизуют коня и получают активную фигуру в центре.",
                        arrows: [{ from: "c3", to: "e4" }],
                        squares: ["e4"],
                    },
                    {
                        san: "Bf5",
                        explanation: "Слон f5 выходит за пешечную цепь до ...e6 — важная идея Каро-Канн.",
                        arrows: [
                            { from: "c8", to: "f5" },
                            { from: "f5", to: "c2" },
                        ],
                        squares: ["f5", "c2"],
                    },
                ],
            },
            {
                key: "caro-advance",
                title: "Продвинутый вариант",
                subtitle: "1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 c5",
                orderIndex: 1001,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр и готовят d4.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4"],
                    },
                    {
                        san: "c6",
                        explanation: "Чёрные подготавливают ...d5 и крепкую структуру.",
                        arrows: [{ from: "c7", to: "c6" }],
                        squares: ["c6", "d5"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые создают сильный пешечный центр.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e4"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные немедленно атакуют центр белых.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "e4" },
                        ],
                        squares: ["d5", "e4"],
                    },
                    {
                        san: "e5",
                        explanation: "Белые закрывают центр и получают пространство, но поле d5 становится опорой чёрных.",
                        arrows: [
                            { from: "e4", to: "e5" },
                            { from: "e5", to: "f6" },
                        ],
                        squares: ["e5", "d5", "f6"],
                    },
                    {
                        san: "Bf5",
                        explanation: "Слон выходит активно до того, как чёрные сыграют ...e6.",
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
                    {
                        san: "Be2",
                        explanation: "Белые спокойно готовят рокировку и сохраняют центр.",
                        arrows: [
                            { from: "f1", to: "e2" },
                            { from: "e1", to: "g1" },
                        ],
                        squares: ["e2", "g1"],
                    },
                    {
                        san: "c5",
                        explanation: "Чёрные подрывают основание пешечной цепи белых на d4.",
                        arrows: [
                            { from: "c6", to: "c5" },
                            { from: "c5", to: "d4" },
                        ],
                        squares: ["c5", "d4"],
                    },
                ],
            },
        ],
    },
    {
        slug: "french-defense",
        eco: "C00",
        title: "Французская защита",
        side: "black",
        against: "1.e4",
        summary: "Французская защита строится вокруг прочного центра ...e6 и контрудара ...d5.",
        variations: [
            {
                key: "french-winnever",
                title: "Вариант Винавера",
                subtitle: "1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5",
                orderIndex: 1000,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр и открывают линии фигурам.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4", "d5"],
                    },
                    {
                        san: "e6",
                        explanation: "Чёрные готовят ...d5 и создают типичную французскую пешечную цепь.",
                        arrows: [
                            { from: "e7", to: "e6" },
                            { from: "d7", to: "d5" },
                        ],
                        squares: ["e6", "d5"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые получают центр e4-d4.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e4"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные атакуют e4 и фиксируют борьбу за центр.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "e4" },
                        ],
                        squares: ["d5", "e4"],
                    },
                    {
                        san: "Nc3",
                        explanation: "Конь c3 защищает e4, но становится целью связки.",
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
                    {
                        san: "e5",
                        explanation: "Белые закрывают центр и получают пространство на королевском фланге.",
                        arrows: [
                            { from: "e4", to: "e5" },
                            { from: "e5", to: "f6" },
                        ],
                        squares: ["e5", "f6", "d6"],
                    },
                    {
                        san: "c5",
                        explanation: "Главный французский подрыв: чёрные атакуют основание цепи d4.",
                        arrows: [
                            { from: "c7", to: "c5" },
                            { from: "c5", to: "d4" },
                        ],
                        squares: ["c5", "d4"],
                    },
                ],
            },
            {
                key: "french-tarrasch",
                title: "Вариант Тарраша",
                subtitle: "1.e4 e6 2.d4 d5 3.Nd2 Nf6 4.e5 Nfd7 5.Bd3 c5",
                orderIndex: 1001,
                steps: [
                    {
                        san: "e4",
                        explanation: "Белые занимают центр.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4"],
                    },
                    {
                        san: "e6",
                        explanation: "Чёрные готовят ...d5 и закрытую центральную структуру.",
                        arrows: [{ from: "e7", to: "e6" }],
                        squares: ["e6", "d5"],
                    },
                    {
                        san: "d4",
                        explanation: "Белые строят центр e4-d4.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4", "e4"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные оспаривают e4.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "e4" },
                        ],
                        squares: ["d5", "e4"],
                    },
                    {
                        san: "Nd2",
                        explanation: "Конь d2 защищает e4 и избегает связки слоном b4.",
                        arrows: [
                            { from: "b1", to: "d2" },
                            { from: "d2", to: "e4" },
                        ],
                        squares: ["d2", "e4"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные атакуют e4 и развивают фигуру.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "e4" },
                        ],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "e5",
                        explanation: "Белые закрывают центр и получают пространство.",
                        arrows: [{ from: "e4", to: "e5" }],
                        squares: ["e5", "d6"],
                    },
                    {
                        san: "Nfd7",
                        explanation: "Конь отступает на d7 и готовит подрыв ...c5.",
                        arrows: [
                            { from: "f6", to: "d7" },
                            { from: "c7", to: "c5" },
                        ],
                        squares: ["d7", "c5"],
                    },
                    {
                        san: "Bd3",
                        explanation: "Слон d3 смотрит на h7 и помогает атаковать королевский фланг.",
                        arrows: [
                            { from: "f1", to: "d3" },
                            { from: "d3", to: "h7" },
                        ],
                        squares: ["d3", "h7"],
                    },
                    {
                        san: "c5",
                        explanation: "Чёрные начинают типичный подрыв пешечной цепи.",
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
        slug: "spanish-game",
        eco: "C60",
        title: "Испанская партия",
        side: "white",
        against: "1...e5",
        summary: "Испанская партия — классический открытый дебют с давлением на коня c6 и пешку e5.",
        variations: [
            {
                key: "spanish-berlin",
                title: "Берлинская защита",
                subtitle: "1.e4 e5 2.Nf3 Nc6 3.Bb5 Nf6 4.O-O Nxe4",
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
                        explanation: "Чёрные отвечают симметрично и удерживают центр.",
                        arrows: [{ from: "e7", to: "e5" }],
                        squares: ["e5"],
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
                        explanation: "Чёрные защищают e5 конём.",
                        arrows: [
                            { from: "b8", to: "c6" },
                            { from: "c6", to: "e5" },
                        ],
                        squares: ["c6", "e5"],
                    },
                    {
                        san: "Bb5",
                        explanation: "Слон b5 давит на коня c6 — защитника пешки e5.",
                        arrows: [
                            { from: "f1", to: "b5" },
                            { from: "b5", to: "c6" },
                        ],
                        squares: ["b5", "c6", "e5"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Берлинская защита: чёрные атакуют e4 вместо пассивной защиты.",
                        arrows: [
                            { from: "g8", to: "f6" },
                            { from: "f6", to: "e4" },
                        ],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "O-O",
                        explanation: "Белые рокируют и временно допускают взятие e4 ради развития.",
                        arrows: [{ from: "e1", to: "g1" }],
                        squares: ["g1", "e4"],
                    },
                    {
                        san: "Nxe4",
                        explanation: "Чёрные забирают e4, переходя в знаменитую берлинскую структуру.",
                        arrows: [{ from: "f6", to: "e4" }],
                        squares: ["e4", "c3"],
                    },
                ],
            },
            {
                key: "spanish-exchange",
                title: "Разменный вариант",
                subtitle: "1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Bxc6 dxc6",
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
                        explanation: "Чёрные удерживают центральное равновесие.",
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
                        explanation: "Конь c6 защищает e5.",
                        arrows: [
                            { from: "b8", to: "c6" },
                            { from: "c6", to: "e5" },
                        ],
                        squares: ["c6", "e5"],
                    },
                    {
                        san: "Bb5",
                        explanation: "Слон атакует защитника пешки e5.",
                        arrows: [
                            { from: "f1", to: "b5" },
                            { from: "b5", to: "c6" },
                        ],
                        squares: ["b5", "c6"],
                    },
                    {
                        san: "a6",
                        explanation: "Чёрные задают вопрос слону и выигрывают пространство.",
                        arrows: [
                            { from: "a7", to: "a6" },
                            { from: "a6", to: "b5" },
                        ],
                        squares: ["a6", "b5"],
                    },
                    {
                        san: "Bxc6",
                        explanation: "Белые разменивают слона на коня и портят пешечную структуру чёрных.",
                        arrows: [{ from: "b5", to: "c6" }],
                        squares: ["c6"],
                    },
                    {
                        san: "dxc6",
                        explanation: "Чёрные возвращают фигуру, но получают сдвоенные пешки по линии c.",
                        arrows: [{ from: "d7", to: "c6" }],
                        squares: ["c6", "c7"],
                    },
                ],
            },
        ],
    },
    {
        slug: "queens-gambit",
        eco: "D06",
        title: "Ферзевый гамбит",
        side: "white",
        against: "1...d5",
        summary: "Ферзевый гамбит предлагает пешку c4, чтобы отвлечь чёрную пешку d5 и усилить центр.",
        variations: [
            {
                key: "queens-gambit-declined",
                title: "Отказанный ферзевый гамбит",
                subtitle: "1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Be7",
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
                        explanation: "Чёрные отвечают симметрично и не уступают центр.",
                        arrows: [{ from: "d7", to: "d5" }],
                        squares: ["d5", "e4"],
                    },
                    {
                        san: "c4",
                        explanation: "Белые атакуют пешку d5 и предлагают ферзевый гамбит.",
                        arrows: [
                            { from: "c2", to: "c4" },
                            { from: "c4", to: "d5" },
                        ],
                        squares: ["c4", "d5"],
                    },
                    {
                        san: "e6",
                        explanation: "Чёрные отказываются от взятия и укрепляют d5.",
                        arrows: [
                            { from: "e7", to: "e6" },
                            { from: "e6", to: "d5" },
                        ],
                        squares: ["e6", "d5"],
                    },
                    {
                        san: "Nc3",
                        explanation: "Белые усиливают давление на d5.",
                        arrows: [
                            { from: "b1", to: "c3" },
                            { from: "c3", to: "d5" },
                        ],
                        squares: ["c3", "d5"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные развивают коня и контролируют e4.",
                        arrows: [{ from: "g8", to: "f6" }],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "Bg5",
                        explanation: "Слон g5 связывает коня f6 и усиливает давление на центр.",
                        arrows: [
                            { from: "c1", to: "g5" },
                            { from: "g5", to: "f6" },
                        ],
                        squares: ["g5", "f6"],
                    },
                    {
                        san: "Be7",
                        explanation: "Чёрные освобождаются от связки и готовят рокировку.",
                        arrows: [
                            { from: "f8", to: "e7" },
                            { from: "e8", to: "g8" },
                        ],
                        squares: ["e7", "g8"],
                    },
                ],
            },
            {
                key: "queens-gambit-accepted",
                title: "Принятый ферзевый гамбит",
                subtitle: "1.d4 d5 2.c4 dxc4 3.e3 Nf6 4.Bxc4 e6",
                orderIndex: 1001,
                steps: [
                    {
                        san: "d4",
                        explanation: "Белые занимают центр.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные отвечают центральной пешкой.",
                        arrows: [{ from: "d7", to: "d5" }],
                        squares: ["d5"],
                    },
                    {
                        san: "c4",
                        explanation: "Белые предлагают пешку, чтобы отвлечь d5.",
                        arrows: [
                            { from: "c2", to: "c4" },
                            { from: "c4", to: "d5" },
                        ],
                        squares: ["c4", "d5"],
                    },
                    {
                        san: "dxc4",
                        explanation: "Чёрные принимают гамбит, но временно отдают центр.",
                        arrows: [{ from: "d5", to: "c4" }],
                        squares: ["c4", "d4"],
                    },
                    {
                        san: "e3",
                        explanation: "Белые открывают слона f1 и готовят возврат пешки c4.",
                        arrows: [
                            { from: "e2", to: "e3" },
                            { from: "f1", to: "c4" },
                        ],
                        squares: ["e3", "c4"],
                    },
                    {
                        san: "Nf6",
                        explanation: "Чёрные развивают коня и контролируют e4.",
                        arrows: [{ from: "g8", to: "f6" }],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "Bxc4",
                        explanation: "Белые возвращают пешку и получают свободное развитие.",
                        arrows: [{ from: "f1", to: "c4" }],
                        squares: ["c4", "f7"],
                    },
                    {
                        san: "e6",
                        explanation: "Чёрные укрепляют центр и готовят развитие слона.",
                        arrows: [{ from: "e7", to: "e6" }],
                        squares: ["e6", "d5"],
                    },
                ],
            },
        ],
    },
    {
        slug: "slav-defense",
        eco: "D10",
        title: "Славянская защита",
        side: "black",
        against: "1.d4",
        summary: "Славянская защита укрепляет d5 ходом ...c6 и сохраняет активного слона c8.",
        variations: [
            {
                key: "slav-main",
                title: "Классическая схема",
                subtitle: "1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 dxc4 5.a4 Bf5",
                orderIndex: 1000,
                steps: [
                    {
                        san: "d4",
                        explanation: "Белые занимают центр.",
                        arrows: [{ from: "d2", to: "d4" }],
                        squares: ["d4"],
                    },
                    {
                        san: "d5",
                        explanation: "Чёрные отвечают симметрично.",
                        arrows: [{ from: "d7", to: "d5" }],
                        squares: ["d5"],
                    },
                    {
                        san: "c4",
                        explanation: "Белые атакуют d5 и предлагают ферзевогамбитную структуру.",
                        arrows: [
                            { from: "c2", to: "c4" },
                            { from: "c4", to: "d5" },
                        ],
                        squares: ["c4", "d5"],
                    },
                    {
                        san: "c6",
                        explanation: "...c6 — основа Славянской защиты: чёрные укрепляют d5 пешкой c.",
                        arrows: [
                            { from: "c7", to: "c6" },
                            { from: "c6", to: "d5" },
                        ],
                        squares: ["c6", "d5"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и усиливают контроль центра.",
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
                        san: "Nc3",
                        explanation: "Конь c3 добавляет давление на d5.",
                        arrows: [
                            { from: "b1", to: "c3" },
                            { from: "c3", to: "d5" },
                        ],
                        squares: ["c3", "d5"],
                    },
                    {
                        san: "dxc4",
                        explanation: "Чёрные временно забирают c4, вынуждая белых тратить темп на возврат пешки.",
                        arrows: [{ from: "d5", to: "c4" }],
                        squares: ["c4", "b5"],
                    },
                    {
                        san: "a4",
                        explanation: "Белые мешают ...b5 и готовят вернуть пешку c4.",
                        arrows: [
                            { from: "a2", to: "a4" },
                            { from: "a4", to: "b5" },
                        ],
                        squares: ["a4", "b5", "c4"],
                    },
                    {
                        san: "Bf5",
                        explanation: "Слон f5 выходит активно до ...e6, что является важным плюсом Славянской защиты.",
                        arrows: [
                            { from: "c8", to: "f5" },
                            { from: "f5", to: "c2" },
                        ],
                        squares: ["f5", "c2"],
                    },
                ],
            },
        ],
    },
    {
        slug: "kings-indian-defense",
        eco: "E60",
        title: "Староиндийская защита",
        side: "black",
        against: "1.d4",
        summary: "Староиндийская защита отдаёт белым центр, чтобы затем атаковать его ходами ...e5 или ...c5.",
        variations: [
            {
                key: "kings-indian-main",
                title: "Классическая система",
                subtitle: "1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5",
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
                        arrows: [{ from: "g8", to: "f6" }],
                        squares: ["f6", "e4"],
                    },
                    {
                        san: "c4",
                        explanation: "Белые получают пространство на ферзевом фланге и в центре.",
                        arrows: [{ from: "c2", to: "c4" }],
                        squares: ["c4", "d5"],
                    },
                    {
                        san: "g6",
                        explanation: "Чёрные готовят фианкетто слона g7.",
                        arrows: [
                            { from: "g7", to: "g6" },
                            { from: "f8", to: "g7" },
                        ],
                        squares: ["g6", "g7"],
                    },
                    {
                        san: "Nc3",
                        explanation: "Белые поддерживают e4 и d5.",
                        arrows: [
                            { from: "b1", to: "c3" },
                            { from: "c3", to: "e4" },
                        ],
                        squares: ["c3", "e4"],
                    },
                    {
                        san: "Bg7",
                        explanation: "Слон g7 давит по большой диагонали на d4 и b2.",
                        arrows: [
                            { from: "f8", to: "g7" },
                            { from: "g7", to: "d4" },
                        ],
                        squares: ["g7", "d4", "b2"],
                    },
                    {
                        san: "e4",
                        explanation: "Белые строят мощный центр c4-d4-e4.",
                        arrows: [{ from: "e2", to: "e4" }],
                        squares: ["e4", "d5"],
                    },
                    {
                        san: "d6",
                        explanation: "Чёрные укрепляют e5 и готовят центральный подрыв.",
                        arrows: [
                            { from: "d7", to: "d6" },
                            { from: "e7", to: "e5" },
                        ],
                        squares: ["d6", "e5"],
                    },
                    {
                        san: "Nf3",
                        explanation: "Белые развивают коня и поддерживают центр.",
                        arrows: [{ from: "g1", to: "f3" }],
                        squares: ["f3", "d4", "e5"],
                    },
                    {
                        san: "O-O",
                        explanation: "Чёрные рокируют и готовят контрудар по центру.",
                        arrows: [{ from: "e8", to: "g8" }],
                        squares: ["g8", "e5"],
                    },
                    {
                        san: "Be2",
                        explanation: "Белые готовят рокировку и укрепляют королевский фланг.",
                        arrows: [
                            { from: "f1", to: "e2" },
                            { from: "e1", to: "g1" },
                        ],
                        squares: ["e2", "g1"],
                    },
                    {
                        san: "e5",
                        explanation: "Главный староиндийский удар: чёрные атакуют центр белых и начинают контригру.",
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
    {
        slug: "grunfeld-defense",
        eco: "D70",
        title: "Защита Грюнфельда",
        side: "black",
        against: "1.d4",
        summary: "Защита Грюнфельда позволяет белым создать центр, который чёрные затем атакуют фигурами и пешками.",
        variations: [
            {
                key: "grunfeld-main",
                title: "Разменный вариант",
                subtitle: "1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.cxd5 Nxd5 5.e4 Nxc3 6.bxc3 Bg7",
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
                        san: "g6",
                        explanation: "Чёрные готовят слона g7 для давления по большой диагонали.",
                        arrows: [
                            { from: "g7", to: "g6" },
                            { from: "f8", to: "g7" },
                        ],
                        squares: ["g6", "g7"],
                    },
                    {
                        san: "Nc3",
                        explanation: "Белые усиливают контроль над d5 и e4.",
                        arrows: [
                            { from: "b1", to: "c3" },
                            { from: "c3", to: "d5" },
                        ],
                        squares: ["c3", "d5"],
                    },
                    {
                        san: "d5",
                        explanation: "Ключевой удар Грюнфельда: чёрные сразу атакуют центр белых.",
                        arrows: [
                            { from: "d7", to: "d5" },
                            { from: "d5", to: "c4" },
                        ],
                        squares: ["d5", "c4"],
                    },
                    {
                        san: "cxd5",
                        explanation: "Белые принимают напряжение и открывают центр.",
                        arrows: [{ from: "c4", to: "d5" }],
                        squares: ["d5"],
                    },
                    {
                        san: "Nxd5",
                        explanation: "Чёрные централизуют коня и вынуждают белых строить большой центр.",
                        arrows: [{ from: "f6", to: "d5" }],
                        squares: ["d5"],
                    },
                    {
                        san: "e4",
                        explanation: "Белые создают мощный пешечный центр, который станет целью контратаки.",
                        arrows: [
                            { from: "e2", to: "e4" },
                            { from: "e4", to: "d5" },
                        ],
                        squares: ["e4", "d4"],
                    },
                    {
                        san: "Nxc3",
                        explanation: "Чёрные разменивают коня и повреждают пешечную структуру белых.",
                        arrows: [{ from: "d5", to: "c3" }],
                        squares: ["c3"],
                    },
                    {
                        san: "bxc3",
                        explanation: "Белые получают сильный центр, но пешки ферзевого фланга становятся мишенями.",
                        arrows: [{ from: "b2", to: "c3" }],
                        squares: ["c3", "d4", "e4"],
                    },
                    {
                        san: "Bg7",
                        explanation: "Слон g7 начинает давление на d4 и всю большую диагональ.",
                        arrows: [
                            { from: "f8", to: "g7" },
                            { from: "g7", to: "d4" },
                        ],
                        squares: ["g7", "d4"],
                    },
                ],
            },
        ],
    },
];
//# sourceMappingURL=openingQualitySeedDataV2.js.map