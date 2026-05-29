import type { TacticPuzzle } from "../tacticsTypes";

export const LICHESS_GENERATED_PUZZLES = [
  {
    "id": "lichess-000Pw",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1550,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "6k1/5p1p/4p3/4q3/3n4/2Q3P1/PP1N1P1P/6K1 b - - 3 37",
    "solution": [
      "d4e2",
      "g1f1",
      "e2c3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-000Zo",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1376,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "operaMate",
      "short"
    ],
    "fen": "4r3/1k6/pp3P2/1b5p/3R1p2/P1R2P2/1P4PP/6K1 b - - 0 35",
    "solution": [
      "e8e1",
      "g1f2",
      "e1f1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-000hf",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1575,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r1bq3r/pp1nbkp1/2p1p2p/8/2BP4/1PN3P1/P3QP1P/3R1RK1 w - - 0 20",
    "solution": [
      "e2e6",
      "f7f8",
      "e6f7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-000lC",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1402,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "hangingPiece",
      "middlegame",
      "short"
    ],
    "fen": "3r3r/pQNk1ppp/1qnR1n2/1B6/8/8/PPP3PP/5R1K b - - 0 19",
    "solution": [
      "d7d6",
      "b7b6",
      "a7b6"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-0017R",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1528,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "r2qk2r/pp2ppbp/1n1p2p1/3P4/2n5/2NBBP1P/PP3P2/R2QK2R w KQkq - 0 13",
    "solution": [
      "d3c4",
      "b6c4",
      "d1a4",
      "d8d7",
      "a4c4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-001XA",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Сложная",
    "rating": 1687,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "long",
      "master",
      "middlegame",
      "sacrifice"
    ],
    "fen": "2r2rk1/pbq1bppp/8/8/2p1N3/P1Bn2P1/2Q2PBP/1R3RK1 w - - 4 24",
    "solution": [
      "b1b7",
      "c7b7",
      "e4f6",
      "e7f6",
      "g2b7"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-001h8",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Сложная",
    "rating": 1780,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "deflection",
      "kingsideAttack",
      "long",
      "middlegame",
      "sacrifice"
    ],
    "fen": "2r3k1/2r4p/4p1p1/1p1q1pP1/p2P1P1Q/P6R/4bB2/2R3K1 w - - 6 35",
    "solution": [
      "h4h7",
      "c7h7",
      "c1c8",
      "g8g7",
      "c8c7"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-001m3",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1459,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "short",
      "skewer"
    ],
    "fen": "7r/6k1/2b1Rp2/8/P1N3p1/5nP1/5P2/Q4K2 b - - 0 38",
    "solution": [
      "h8h1",
      "f1e2",
      "h1a1"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-001om",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1018,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "morphysMate",
      "short"
    ],
    "fen": "5r1k/pp4pp/5p2/1BbQp1r1/7K/7P/1PP3P1/3R3R b - - 3 26",
    "solution": [
      "c5f2",
      "g2g3",
      "f2g3"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-001w5",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1035,
    "sideToMove": "w",
    "tags": [
      "advancedPawn",
      "attraction",
      "mate",
      "mateIn2",
      "middlegame",
      "promotion",
      "short"
    ],
    "fen": "1rb3k1/q4rP1/4p2p/3p3p/3P1P2/2P5/2QK3P/3R2R1 w - - 1 30",
    "solution": [
      "c2h7",
      "g8h7",
      "g7g8q"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-001wR",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1179,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3"
    ],
    "fen": "6nr/p4p1p/k1p5/1p6/1QN5/2P1P3/4KPqP/8 w - - 0 27",
    "solution": [
      "b4a5",
      "a6b7",
      "c4d6",
      "b7b8",
      "a5d8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-001wr",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 970,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "master",
      "masterVsMaster",
      "middlegame",
      "short"
    ],
    "fen": "r4rk1/p3ppbp/Pp1q1np1/3PpbB1/2B5/2N2P2/1PPQ2PP/3RR1K1 b - - 0 18",
    "solution": [
      "d6c5",
      "g1h1",
      "c5c4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-001xl",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1081,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "master",
      "masterVsMaster",
      "short",
      "skewer",
      "superGM"
    ],
    "fen": "8/4R3/p4kpp/3B4/5q2/8/5P1P/6K1 w - - 6 41",
    "solution": [
      "e7f7",
      "f6e5",
      "f7f4"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-002KJ",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1615,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "middlegame",
      "short"
    ],
    "fen": "r3k2r/ppq1bppp/4pn2/2Ppn3/1P4bP/2P2N2/P3BPP1/RNBQ1RK1 w kq - 3 11",
    "solution": [
      "f3e5",
      "c7e5",
      "e2g4"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-002Mm",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 947,
    "sideToMove": "w",
    "tags": [
      "deflection",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "rn1qrk2/ppp3pQ/3p1pP1/3Pp3/2P1P3/8/PP3PP1/R1B1K3 w Q - 3 17",
    "solution": [
      "h7h8",
      "f8e7",
      "h8g7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-002Tf",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1564,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "opening",
      "short"
    ],
    "fen": "r3kbnr/ppp1qppp/2n5/1B1pP3/5B2/4PQ2/PPP2PPP/RN2K2R b KQkq - 2 7",
    "solution": [
      "e7b4",
      "b1c3",
      "b4b2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-002bK",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1129,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "hangingPiece",
      "short"
    ],
    "fen": "8/7p/4k3/pb1p1pPB/1n1P3P/N1p1P3/4K3/8 w - - 2 43",
    "solution": [
      "a3b5",
      "c3c2",
      "e2d2"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-002p5",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 908,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r1bqr1k1/pp1nbpp1/2p5/3n2P1/2BP4/P7/1PQNNPP1/R3K2R w KQ - 1 14",
    "solution": [
      "c2h7",
      "g8f8",
      "h7h8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-0039T",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1072,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "defensiveMove",
      "endgame",
      "long",
      "rookEndgame",
      "skewer"
    ],
    "fen": "1r5r/p3kp2/4p2p/4P3/R4Pp1/6P1/P1P4P/4K2R b K - 2 25",
    "solution": [
      "b8b1",
      "e1f2",
      "b1h1",
      "a4a7",
      "e7f8"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-003Jb",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 993,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "master",
      "middlegame",
      "short"
    ],
    "fen": "6k1/Q2bqr1p/2rpp1pR/p7/Pp2P3/1B3P2/1PP3P1/2KR4 b - - 7 22",
    "solution": [
      "e7g5",
      "c1b1",
      "g5h6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-003S3",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1405,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "1r3k1r/pNqnppb1/6pn/2p3Np/7P/2P2Q2/PP3PP1/R1B1K2R w KQ - 3 16",
    "solution": [
      "g5e6",
      "f8g8",
      "e6c7"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-003Tx",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Сложная",
    "rating": 1516,
    "sideToMove": "b",
    "tags": [
      "backRankMate",
      "endgame",
      "fork",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "2r5/pR5p/5p1k/4p3/4R3/B4nPP/PP3P2/1K6 b - - 0 27",
    "solution": [
      "f3d2",
      "b1a1",
      "c8c1"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-003eP",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1156,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "exposedKing",
      "long",
      "middlegame",
      "skewer"
    ],
    "fen": "6k1/r1b1q3/2p3p1/2Pp4/1P2p1n1/2B1P3/NQ6/2K4R w - - 2 37",
    "solution": [
      "h1h8",
      "g8f7",
      "h8h7",
      "f7e8",
      "h7e7"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-003jH",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1065,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "rn3rk1/p5pp/3N4/4np1q/5Q2/1P6/PB1P1KP1/2R4R b - - 1 25",
    "solution": [
      "e5d3",
      "f2e3",
      "d3f4",
      "h1h5",
      "f4h5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-003jb",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1046,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "master",
      "middlegame",
      "short"
    ],
    "fen": "r3kb1r/p4ppp/b3p3/2pq4/3Q4/4BN2/PPP2PPP/R3K2R w KQkq - 0 12",
    "solution": [
      "d4a4",
      "a6b5",
      "a4b5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-003jv",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1007,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "7R/1p2k2p/p2n2p1/4K3/8/6P1/P6P/8 b - - 11 37",
    "solution": [
      "d6f7",
      "e5e4",
      "f7h8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-003mh",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1338,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "attraction",
      "fork",
      "long",
      "middlegame",
      "sacrifice"
    ],
    "fen": "4rk1r/1pp2p2/p2p3p/3N4/3P2q1/8/PPP5/1K2Q1NR w - - 2 24",
    "solution": [
      "e1e8",
      "f8e8",
      "d5f6",
      "e8e7",
      "f6g4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-003o0",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1003,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "master",
      "opening",
      "short"
    ],
    "fen": "r1bqk2r/pp1nbppp/3p4/1B1p4/3P1B2/5N2/PPP2PPP/R2QK2R b KQkq - 3 9",
    "solution": [
      "d8a5",
      "d1d2",
      "a5b5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-003r5",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1107,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "r2qr1k1/ppp2ppp/4P3/8/1nP2Q2/2N2N1P/PP3KP1/R4R2 b - - 0 15",
    "solution": [
      "b4d3",
      "f2g1",
      "d3f4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-004LZ",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1187,
    "sideToMove": "b",
    "tags": [
      "advancedPawn",
      "crushing",
      "defensiveMove",
      "deflection",
      "endgame",
      "long",
      "promotion"
    ],
    "fen": "8/7R/5p2/p7/7P/2p5/3k2N1/1K6 b - - 0 48",
    "solution": [
      "c3c2",
      "b1a2",
      "c2c1q",
      "h7d7",
      "d2e2"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-004mT",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1392,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "short",
      "skewer"
    ],
    "fen": "5Q2/8/1bk1p1p1/5p2/3p4/5qPK/7P/8 w - - 2 52",
    "solution": [
      "f8a8",
      "c6d6",
      "a8f3"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-004nd",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 898,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "3q2k1/3r4/pp3p1Q/2b1n3/P3N3/2P5/1P4PP/R6K w - - 1 25",
    "solution": [
      "e4f6",
      "d8f6",
      "h6f6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-0050w",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1095,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "long"
    ],
    "fen": "5rk1/1p2p2p/p2p4/2pPb2R/2P1P3/1P1BKPrR/8/8 w - - 5 31",
    "solution": [
      "h3g3",
      "e5g3",
      "h5g5",
      "g8f7",
      "g5g3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-005Bm",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1204,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "pin",
      "short"
    ],
    "fen": "4rk2/p4q2/1p3Q1b/8/1p5N/2P1p3/P3P3/2K5 w - - 1 44",
    "solution": [
      "h4g6",
      "f8g8",
      "f6h8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-005HG",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1755,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "clearance",
      "fork",
      "long",
      "opening"
    ],
    "fen": "r2q1rk1/p1p2pp1/3bbn1p/4N3/8/1P4P1/PBQPPP1P/RN2K2R b KQ - 2 12",
    "solution": [
      "d6e5",
      "b2e5",
      "d8d5",
      "f2f3",
      "d5e5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-005nD",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1142,
    "sideToMove": "w",
    "tags": [
      "fork",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "3rk2r/2qn2p1/p1Q1p3/3n3p/8/8/PP4PP/5R1K w k - 0 24",
    "solution": [
      "c6e6",
      "d5e7",
      "e6f7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-0068B",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1401,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "deflection",
      "middlegame",
      "short"
    ],
    "fen": "r1q3k1/3nbppp/pp2p3/4B3/8/2N2Q2/PPPR1PPP/6K1 w - - 1 19",
    "solution": [
      "d2d7",
      "c8d7",
      "f3a8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-006E1",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1654,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "deflection",
      "endgame",
      "veryLong"
    ],
    "fen": "5rk1/R4pp1/1p5p/3Q4/1PPp2q1/3P2P1/5P2/4K3 b - - 0 34",
    "solution": [
      "f8e8",
      "e1f1",
      "g4h3",
      "d5g2",
      "e8e1",
      "f1e1",
      "h3g2"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-006HV",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1163,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "1r6/5k2/2Q1pNp1/p5Pp/1p2P2P/2P4R/KP3P2/3q4 b - - 0 31",
    "solution": [
      "b4b3",
      "a2a3",
      "d1a1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-006pe",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1585,
    "sideToMove": "w",
    "tags": [
      "master",
      "mate",
      "mateIn2",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "r4r2/2q1Nb2/5Qpk/2n4p/pp5P/8/1PP2PP1/2KR3R w - - 0 29",
    "solution": [
      "e7f5",
      "h6h7",
      "f6g7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-006wz",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1428,
    "sideToMove": "w",
    "tags": [
      "attraction",
      "crushing",
      "endgame",
      "fork",
      "long",
      "sacrifice"
    ],
    "fen": "2r5/4ppkp/6p1/1p6/1P6/P3B3/1br2PPP/1R1R2K1 w - - 3 23",
    "solution": [
      "b1b2",
      "c2b2",
      "e3d4",
      "f7f6",
      "d4b2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-006yP",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 819,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "master",
      "rookEndgame",
      "short",
      "skewer"
    ],
    "fen": "6R1/8/Kpk1p3/1p1pP3/6P1/PPr5/8/8 w - - 0 41",
    "solution": [
      "g8c8",
      "c6d7",
      "c8c3"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-0071K",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1109,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "defensiveMove",
      "endgame",
      "hangingPiece",
      "short"
    ],
    "fen": "3N1r2/R7/kp6/p2pPp1Q/2pP2P1/2q5/2P5/2K5 b - - 1 38",
    "solution": [
      "a6a7",
      "h5h7",
      "a7a6"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00734",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1692,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "r4bk1/2rqp2p/n1p3p1/3p1p2/3P1P1B/pP1BP3/P1Q2PRP/1KR5 w - - 1 27",
    "solution": [
      "d3f5",
      "e7e6",
      "f5g6"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00761",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1420,
    "sideToMove": "w",
    "tags": [
      "attraction",
      "crushing",
      "endgame",
      "exposedKing",
      "fork",
      "long",
      "sacrifice"
    ],
    "fen": "3r2k1/1b4bR/p2P2p1/3p2N1/2p5/2P2N2/PP6/2K5 w - - 0 29",
    "solution": [
      "h7g7",
      "g8g7",
      "g5e6",
      "g7g8",
      "e6d8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-007ku",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1663,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r1bq3Q/1np3p1/p5k1/1p1Pp3/1Pn2BP1/2b2P2/P3K3/R4N2 w - - 0 36",
    "solution": [
      "h8h5",
      "g6f6",
      "f4g5"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-007mr",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Лёгкая",
    "rating": 733,
    "sideToMove": "b",
    "tags": [
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "5k2/p2r3p/1p4pP/3r1q2/4R3/2P5/PP3PQ1/K3R3 b - - 0 33",
    "solution": [
      "d5d1",
      "e1d1",
      "d7d1"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-007tv",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1128,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "attackingF2F7",
      "long",
      "middlegame",
      "skewer"
    ],
    "fen": "r3k1nr/1pp2ppp/1pnp4/4p1q1/2B1P3/3P1Q1P/PPP2PP1/R4RK1 w kq - 0 12",
    "solution": [
      "f3f7",
      "e8d8",
      "f7f8",
      "d8d7",
      "f8a8"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-0088O",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1133,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "deflection",
      "endgame",
      "short"
    ],
    "fen": "7Q/2p5/1p2prp1/p4k1p/q4p1P/8/6RK/8 w - - 0 38",
    "solution": [
      "g2g5",
      "f5e4",
      "h8f6"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-008D5",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1408,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "master",
      "opening",
      "short"
    ],
    "fen": "r1bqk2r/pp3ppp/4p3/3pPn2/1b1P1P2/2N5/PP4PP/R1BQKB1R w KQkq - 3 10",
    "solution": [
      "d1a4",
      "c8d7",
      "a4b4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-008P4",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 713,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "8/4k3/1p1p4/rP2p1p1/P2nP1P1/3B4/3K4/R7 b - - 1 35",
    "solution": [
      "d4b3",
      "d2c3",
      "b3a1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-008Y3",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Средняя",
    "rating": 1055,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "discoveredAttack",
      "kingsideAttack",
      "master",
      "middlegame",
      "short"
    ],
    "fen": "r5k1/1p1r1pp1/p3pnp1/2qN4/8/1Q5P/PP3PP1/3RR1K1 w - - 0 25",
    "solution": [
      "d5f6",
      "g7f6",
      "d1d7"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-0092z",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 991,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "2r3k1/3R1ppp/p1q5/2p2Q2/P7/7P/5PP1/6K1 w - - 4 27",
    "solution": [
      "f5f7",
      "g8h8",
      "f7g7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-009BH",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1384,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "pin",
      "short"
    ],
    "fen": "3r3k/6p1/4Q3/4B3/1p3P2/4PKP1/3q4/8 w - - 18 52",
    "solution": [
      "e6h6",
      "h8g8",
      "h6g7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-009IO",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1162,
    "sideToMove": "w",
    "tags": [
      "hookMate",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "3r4/4kp1r/p2Np1p1/3bP3/P2n4/8/1P3RPP/5RK1 w - - 5 26",
    "solution": [
      "f2f7",
      "h7f7",
      "f1f7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-009bR",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1024,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "4r2k/3q3r/1p4pQ/p1pP4/2P4P/1N4p1/PP3RK1/8 w - - 2 38",
    "solution": [
      "f2f8",
      "e8f8",
      "h6f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-009f8",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1149,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "8/1p4p1/pb2pp1p/3n1k2/3P4/P3BN1P/1P2KPP1/8 w - - 1 27",
    "solution": [
      "f3h4",
      "f5e4",
      "f2f3"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-009lk",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 917,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "1R6/6pk/2p4p/3bP2r/5B1P/2P1RqP1/P4P1Q/6K1 b - - 3 40",
    "solution": [
      "f3d1",
      "e3e1",
      "d1e1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-009oc",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1144,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "5Q2/pbp3np/1p1pq1pk/1P6/P6P/6K1/8/8 w - - 0 33",
    "solution": [
      "f8f4",
      "g6g5",
      "f4g5"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-009uB",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1089,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "3br1kr/7p/4p1pQ/P5P1/1B5P/P6q/5R2/6K1 w - - 2 36",
    "solution": [
      "f2f8",
      "e8f8",
      "h6f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-009wR",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1245,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "operaMate",
      "short"
    ],
    "fen": "1R2R3/p7/1p1k3p/1Pb5/P5p1/6P1/5r1P/7K b - - 7 41",
    "solution": [
      "f2f1",
      "h1g2",
      "f1g1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-009zR",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1620,
    "sideToMove": "b",
    "tags": [
      "discoveredAttack",
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "3Q4/p1p2ppp/4k3/8/5P2/4P3/Prqn2PP/3R1RK1 b - - 0 22",
    "solution": [
      "d2f3",
      "g1h1",
      "c2g2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-009zS",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1378,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "discoveredAttack",
      "discoveredCheck",
      "exposedKing",
      "long",
      "middlegame"
    ],
    "fen": "r3r1k1/1p3p1p/p1p3p1/8/6bP/Q3b1P1/PP2B3/R3K2R b KQ - 0 20",
    "solution": [
      "g4e2",
      "e1e2",
      "e3c5",
      "e2f3",
      "c5a3"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00AB1",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1154,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "short",
      "skewer"
    ],
    "fen": "8/7Q/3p1kp1/1p6/2b5/2q4P/5PPK/8 w - - 0 37",
    "solution": [
      "h7h8",
      "f6e6",
      "h8c3"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00AFG",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1491,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "discoveredAttack",
      "middlegame",
      "short"
    ],
    "fen": "r4rk1/5ppp/p3bp2/2q2N1Q/Ppp5/8/1PP2PPP/R2R2K1 w - - 0 22",
    "solution": [
      "f5h6",
      "g7h6",
      "h5c5"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00Aas",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1045,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "3r1rk1/1p2q1pp/5p2/8/1P1n4/6Q1/PPBB1PPP/R4RK1 b - - 0 20",
    "solution": [
      "d4e2",
      "g1h1",
      "e2g3",
      "f2g3",
      "d8d2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00AdI",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1274,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "discoveredCheck",
      "endgame",
      "long",
      "master"
    ],
    "fen": "3r4/4kp1p/1PQ1p1p1/p3b3/1p2P2P/1P5K/6P1/8 b - - 2 36",
    "solution": [
      "d8d3",
      "g2g3",
      "d3g3",
      "h3h2",
      "g3c3"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00AoZ",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1016,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "deflection",
      "endgame",
      "short"
    ],
    "fen": "8/1R6/p1pk4/2q3bp/1QP5/P7/KP6/3r4 w - - 3 45",
    "solution": [
      "b7d7",
      "d6d7",
      "b4c5"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00BJm",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1198,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "hangingPiece",
      "middlegame",
      "short"
    ],
    "fen": "r4rk1/1Q2bppp/p1N1p3/1p1q4/2pP1n2/2P5/PP3PPP/R4RK1 w - - 2 19",
    "solution": [
      "c6e7",
      "g8h8",
      "e7d5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00BNd",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 888,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "1rr3k1/4ppbp/3p1np1/1b1N4/P2BP3/5P2/P2R2PP/R5K1 w - - 0 22",
    "solution": [
      "d5e7",
      "g8f8",
      "e7c8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Bp0",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1234,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "capturingDefender",
      "middlegame",
      "short"
    ],
    "fen": "1r2kr2/pp3p1p/2b1p3/4N3/2P1n3/1N1B4/P3KP1P/6R1 w - - 5 22",
    "solution": [
      "e5c6",
      "b7c6",
      "d3e4"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00BrZ",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1382,
    "sideToMove": "b",
    "tags": [
      "attraction",
      "kingsideAttack",
      "long",
      "mate",
      "mateIn3",
      "middlegame",
      "pillsburysMate",
      "sacrifice"
    ],
    "fen": "r6r/pp2kb2/3p1p2/1N1Pp3/3bP3/P2B2P1/1P1Q2PP/7K b - - 7 28",
    "solution": [
      "h8h2",
      "h1h2",
      "a8h8",
      "d2h6",
      "h8h6"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Bul",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1330,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "discoveredAttack",
      "discoveredCheck",
      "opening",
      "short"
    ],
    "fen": "rnbqk2r/pp3ppp/5n2/4N3/2p5/2P5/P1PPQPPP/R1B1K2R w KQkq - 0 9",
    "solution": [
      "e5c6",
      "c8e6",
      "c6d8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00Cqg",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1642,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "defensiveMove",
      "hangingPiece",
      "long",
      "middlegame"
    ],
    "fen": "3r2k1/pp4bp/4qpp1/3Pp3/8/4Q2P/4B1P1/2rR3K w - - 0 27",
    "solution": [
      "d5e6",
      "d8d1",
      "e2d1",
      "c1d1",
      "h1h2"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00CtS",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 980,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short",
      "swallowstailMate"
    ],
    "fen": "Q7/5qk1/p2p4/b1p1pr2/P7/6P1/4KP1R/8 w - - 4 39",
    "solution": [
      "a8h8",
      "g7g6",
      "h8h6"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Cwz",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1495,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "1r5r/5pk1/4p3/3p2PP/N1nP4/n1P5/P3B3/K1R4R b - - 0 34",
    "solution": [
      "b8b1",
      "c1b1",
      "a3c2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00DEc",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1091,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "short"
    ],
    "fen": "8/p5pk/1p3b1p/3r3P/6P1/3nBN2/P4PK1/3R4 b - - 4 30",
    "solution": [
      "d3f4",
      "e3f4",
      "d5d1"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00DPI",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 956,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "3r2k1/1B3p1p/6p1/3N4/3p2r1/8/5KP1/3R4 w - - 0 36",
    "solution": [
      "d5f6",
      "g8g7",
      "f6g4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00DcC",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1402,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "deflection",
      "endgame",
      "master",
      "short"
    ],
    "fen": "5k2/6p1/p1b3Pp/2N2P1r/p7/8/1KP5/5R2 w - - 0 37",
    "solution": [
      "c5e6",
      "f8e7",
      "e6g7"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00DkJ",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1575,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "deflection",
      "exposedKing",
      "long",
      "middlegame"
    ],
    "fen": "3r1bnr/2p2ppp/2bk4/R7/5P2/2N5/4N1PP/1R4K1 w - - 4 22",
    "solution": [
      "b1d1",
      "d6e7",
      "a5e5",
      "e7f6",
      "d1d8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00Dke",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1501,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "master",
      "short"
    ],
    "fen": "5bk1/2Q2p1p/5qp1/p7/P1Bp4/1P5P/2r2PP1/3R2K1 w - - 6 28",
    "solution": [
      "c4f7",
      "g8g7",
      "c7c2"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00E29",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Лёгкая",
    "rating": 956,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "kingsideAttack",
      "middlegame",
      "short"
    ],
    "fen": "r1b2rk1/4bppp/p1n5/3q4/Pp6/3B1N2/1B3PPP/R2Q1RK1 w - - 0 18",
    "solution": [
      "d3h7",
      "g8h7",
      "d1d5"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-00EBZ",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 818,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "3rr1k1/p4pp1/1pp4p/3pPQ2/1P3P2/2P2RqP/P2R2P1/6K1 b - - 2 24",
    "solution": [
      "g3e1",
      "g1h2",
      "e1d2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Ea3",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1317,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "3r4/p5k1/1p1qpr1p/1Q1pn1p1/3P1pP1/1PP5/P5PP/4RRK1 w - - 0 30",
    "solution": [
      "d4e5",
      "d6c5",
      "b5c5",
      "b6c5",
      "e5f6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Er4",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1311,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "hangingPiece",
      "middlegame",
      "short"
    ],
    "fen": "r3k2r/p1bN2pp/2p1Rp2/3p3b/3P1q2/2N4P/PPPQ1PP1/R5K1 b kq - 0 16",
    "solution": [
      "e8d7",
      "d2f4",
      "c7f4"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00Evs",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1060,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "5qk1/pQ3p2/7p/b2N1bp1/P3r3/5K2/7P/R4B2 w - - 0 25",
    "solution": [
      "d5f6",
      "g8h8",
      "f6e4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00F1l",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 836,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "master",
      "short",
      "skewer"
    ],
    "fen": "8/2k1b3/5p2/RBpK1Pp1/P2p2P1/1p1P4/2r5/8 w - - 0 46",
    "solution": [
      "a5a7",
      "c7b8",
      "a7e7"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00F6y",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 908,
    "sideToMove": "w",
    "tags": [
      "long",
      "mate",
      "mateIn3",
      "middlegame",
      "queensideAttack",
      "sacrifice"
    ],
    "fen": "2k3r1/pppb1prp/1q6/8/Q7/2P1R1P1/P4P1P/4R1K1 w - - 4 24",
    "solution": [
      "e3e8",
      "d7e8",
      "e1e8",
      "g8e8",
      "a4e8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00GBX",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 864,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "discoveredAttack",
      "discoveredCheck",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "r6k/pp2n1pp/2nN4/4p1r1/1PB5/2P4b/P3Nb1P/R2R3K w - - 0 23",
    "solution": [
      "d6f7",
      "h8g8",
      "f7g5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00GVf",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Сложная",
    "rating": 1581,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "exposedKing",
      "long",
      "middlegame",
      "sacrifice"
    ],
    "fen": "5k2/3b2q1/pn4p1/1rp2p2/8/8/1P2Q1P1/1K2R2R w - - 4 33",
    "solution": [
      "h1h8",
      "g7h8",
      "e2e7",
      "f8g8",
      "e7d8"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-00Gt0",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1052,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "master",
      "short"
    ],
    "fen": "R7/4k3/5p2/3p2p1/4b2p/2K1PP1P/6P1/8 b - - 0 47",
    "solution": [
      "d5d4",
      "c3d4",
      "e4a8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00GuD",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1165,
    "sideToMove": "w",
    "tags": [
      "advancedPawn",
      "kingsideAttack",
      "long",
      "mate",
      "mateIn3",
      "middlegame",
      "promotion",
      "sacrifice"
    ],
    "fen": "1n5k/6p1/p2q1rPp/1ppB4/8/3P4/PPP1rPQ1/2K4R w - - 0 26",
    "solution": [
      "h1h6",
      "g7h6",
      "g6g7",
      "h8h7",
      "g7g8q"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Gvp",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 959,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "8/2kn1p2/8/3P4/R7/2PKN3/1r6/8 b - - 14 70",
    "solution": [
      "d7c5",
      "d3d4",
      "c5a4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00H8a",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 804,
    "sideToMove": "w",
    "tags": [
      "arabianMate",
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "5bk1/2R4p/6p1/8/4NP1P/3bP1K1/r7/8 w - - 3 46",
    "solution": [
      "e4f6",
      "g8h8",
      "c7h7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00HEh",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 793,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "3r2k1/pp3ppp/2p3b1/2n3P1/2B2q1P/5N2/PPP1QP2/4R1K1 w - - 0 24",
    "solution": [
      "e2e8",
      "d8e8",
      "e1e8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00HEx",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 926,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "hangingPiece",
      "master",
      "short"
    ],
    "fen": "R7/5pk1/4pn1p/8/3NP3/5P2/6PP/2rB2K1 b - - 0 31",
    "solution": [
      "c1d1",
      "g1f2",
      "d1d4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00HZa",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 937,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "long",
      "master"
    ],
    "fen": "6k1/6pp/1p6/p1n5/4q3/1P2pN2/P4PPP/3Q2K1 w - - 0 29",
    "solution": [
      "d1d8",
      "g8f7",
      "f3g5",
      "f7g6",
      "g5e4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Hpe",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1778,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "1rr3k1/4Qppp/q3p3/p2pn3/3N4/4P2P/5PP1/RR4K1 w - - 0 30",
    "solution": [
      "b1b8",
      "c8b8",
      "e7c7",
      "b8c8",
      "c7e5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00HzH",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 763,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "hookMate",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "5rk1/p2q2p1/1p2p1Np/3p3P/3Pb1P1/2P5/PP3R2/6K1 w - - 0 34",
    "solution": [
      "f2f8",
      "g8h7",
      "f8h8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00HzX",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1639,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "4r1k1/5pp1/7R/1p6/8/1PP3QP/2q2PP1/6K1 b - - 0 29",
    "solution": [
      "c2c1",
      "g1h2",
      "c1h6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00ICz",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1184,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "long",
      "middlegame",
      "skewer"
    ],
    "fen": "2k3r1/1p1q3p/1p2p3/1NbpQr2/P1p2P2/6P1/6KP/R4R2 w - - 1 32",
    "solution": [
      "b5a7",
      "c8d8",
      "e5b8",
      "d8e7",
      "b8g8"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00IEW",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 902,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "2r3k1/6p1/R6p/3P1N2/8/3K4/5b2/8 w - - 6 58",
    "solution": [
      "f5e7",
      "g8f7",
      "e7c8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00IF1",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1267,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "defensiveMove",
      "endgame",
      "hangingPiece",
      "short"
    ],
    "fen": "1k6/p1p5/P2p4/3P4/1PK2r1p/4P3/8/4B3 w - - 0 58",
    "solution": [
      "e3f4",
      "h4h3",
      "e1g3"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00IUT",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1546,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "1r2r1k1/ppp1q1pp/4b3/4P3/1Q1R1P2/8/P5PP/R1B3K1 b - - 0 19",
    "solution": [
      "c7c5",
      "b4a3",
      "c5d4",
      "a3e7",
      "e8e7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00IUW",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1784,
    "sideToMove": "b",
    "tags": [
      "clearance",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "operaMate",
      "sacrifice",
      "short"
    ],
    "fen": "8/2p1r1kp/5pp1/3P3r/4P3/2N1QbPq/PPP2R1P/5RK1 b - - 4 23",
    "solution": [
      "h3g3",
      "h2g3",
      "h5h1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00InW",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1475,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "defensiveMove",
      "endgame",
      "hangingPiece",
      "knightEndgame",
      "long"
    ],
    "fen": "8/2p5/pp1p4/3P1N2/PPP1Pp2/5n1p/5K1k/8 w - - 0 47",
    "solution": [
      "f2f3",
      "h2g1",
      "f3f4",
      "h3h2",
      "f5g3"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00Ivf",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1541,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3",
      "rookEndgame"
    ],
    "fen": "8/2p4r/1p3k2/p2PR1p1/P1P2pP1/1P3P1r/4R1K1/8 b - - 0 46",
    "solution": [
      "h3h2",
      "g2f1",
      "h2h1",
      "f1f2",
      "h7h2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00J1Y",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1161,
    "sideToMove": "w",
    "tags": [
      "deflection",
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "1q3r2/p5k1/1p2pbpp/2p5/2P1p3/2P2PQP/PP3P2/6RK w - - 0 30",
    "solution": [
      "g3g6",
      "g7h8",
      "g6h6"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00J1t",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1790,
    "sideToMove": "w",
    "tags": [
      "exposedKing",
      "kingsideAttack",
      "long",
      "mate",
      "mateIn3",
      "middlegame"
    ],
    "fen": "r1qr3k/pp3pb1/1np1p3/8/3P3P/2N2PR1/PP1Q2P1/2KR4 w - - 0 23",
    "solution": [
      "d2g5",
      "d8g8",
      "g5h5",
      "g7h6",
      "h5h6"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00JR7",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1442,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "long",
      "mate",
      "mateIn3",
      "middlegame"
    ],
    "fen": "r5k1/pp2q1p1/2p1p2p/3nP1pP/3P2P1/2PQ1r2/PPB5/R5K1 w - - 0 24",
    "solution": [
      "d3h7",
      "g8f7",
      "c2g6",
      "f7f8",
      "h7h8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00JfN",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 971,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r6r/1bpnk3/1p1pB3/pP1P4/P3PQP1/2b2N1q/2P2P2/R3R1K1 w - - 0 25",
    "solution": [
      "f4f7",
      "e7d8",
      "f7d7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00KHR",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1454,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "8/6pk/1Q1p2n1/4p3/2P3P1/P2PPK1P/1B6/4q3 b - - 2 35",
    "solution": [
      "g6h4",
      "f3e4",
      "e1h1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00KMV",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 943,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "middlegame",
      "short",
      "skewer"
    ],
    "fen": "1r3k2/1p1q1p2/p2p2p1/2pP2bp/2P1n1n1/1PQ3P1/P3N1K1/3N1R1R w - - 0 29",
    "solution": [
      "c3h8",
      "f8e7",
      "h8b8"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00KOz",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 962,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "master",
      "short",
      "skewer"
    ],
    "fen": "8/r4k2/7R/3n1PK1/8/8/8/8 w - - 4 57",
    "solution": [
      "h6h7",
      "f7f8",
      "h7a7"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00KYU",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1256,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "3r1k2/p2n3p/1p2Bpp1/2r2N2/4q3/6QP/P5P1/5R1K w - - 2 41",
    "solution": [
      "g3d6",
      "f8e8",
      "d6e7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Kbj",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1468,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3",
      "rookEndgame"
    ],
    "fen": "8/8/6p1/PR3p2/1P3k1P/8/r5P1/7K b - - 0 39",
    "solution": [
      "f4g3",
      "b5d5",
      "a2a1",
      "d5d1",
      "a1d1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Keu",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 880,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "R7/1p3kp1/2pK3p/3p1PP1/3r2nP/8/1P6/8 w - - 0 40",
    "solution": [
      "g5g6",
      "f7f6",
      "a8f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Kia",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1734,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "discoveredAttack",
      "endgame",
      "fork",
      "long"
    ],
    "fen": "5r1k/4n2p/1p4p1/pP5Q/P2pB2K/6P1/2P4P/4q3 w - - 0 38",
    "solution": [
      "h5e5",
      "h8g8",
      "e4d5",
      "e7d5",
      "e5e1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Kq4",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1419,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "attraction",
      "fork",
      "long",
      "middlegame",
      "sacrifice"
    ],
    "fen": "r2qk3/5p1r/p1p1p3/1p1pP1N1/P1nP2Pn/2P3B1/2P2P2/R1QR2K1 b q - 0 21",
    "solution": [
      "d8g5",
      "c1g5",
      "h4f3",
      "g1g2",
      "f3g5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Kyy",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1219,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "exposedKing",
      "long",
      "master",
      "mate",
      "mateIn3",
      "queenRookEndgame"
    ],
    "fen": "Q7/8/8/5k2/8/5pr1/5r2/R6K b - - 0 50",
    "solution": [
      "g3h3",
      "h1g1",
      "f2g2",
      "g1f1",
      "h3h1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00L76",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1144,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "deflection",
      "endgame",
      "long"
    ],
    "fen": "5rk1/5p2/4p1p1/7R/2P5/2n2N2/5r2/2K4R w - - 0 38",
    "solution": [
      "h5h8",
      "g8g7",
      "h1h7",
      "g7f6",
      "h8f8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00LNB",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1127,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "operaMate",
      "sacrifice",
      "short"
    ],
    "fen": "kr6/1pR4p/p4R2/n7/P3p3/3rB3/6PP/6K1 w - - 1 39",
    "solution": [
      "f6a6",
      "b7a6",
      "c7a7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00LNH",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1639,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "1k2r3/pp2r2p/2pqbpp1/3n4/3P1p2/1B3N1P/PPQB1PP1/1K1RR3 b - - 3 22",
    "solution": [
      "e6f5",
      "c2f5",
      "g6f5"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00Lt1",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1774,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "discoveredAttack",
      "endgame",
      "long"
    ],
    "fen": "r4k2/pp3p2/2pNR2p/5Qp1/1P3n2/2KP4/P1P2qPP/8 b - - 7 31",
    "solution": [
      "f4d5",
      "c3b3",
      "f2f5",
      "d6f5",
      "f7e6"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00Lvv",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 857,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "queensideAttack",
      "short"
    ],
    "fen": "2k2br1/1pprn3/p4p2/4p2Q/4P2P/2N1q3/PP4PK/3R4 w - - 0 23",
    "solution": [
      "h5e8",
      "d7d8",
      "d1d8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00M1q",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1438,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "long",
      "middlegame",
      "pin"
    ],
    "fen": "2r3k1/2r3p1/p3pqQ1/1p1p4/nP1P4/2P4R/P4PPP/2R3K1 w - - 1 31",
    "solution": [
      "g6h7",
      "g8f7",
      "h3f3",
      "f6f3",
      "g2f3"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00M92",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 985,
    "sideToMove": "w",
    "tags": [
      "clearance",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "3q1r1k/p3r1pp/1p1b1p2/2p5/3pR2N/1QPn2P1/PP1B1P1P/R5K1 w - - 0 22",
    "solution": [
      "h4g6",
      "h7g6",
      "e4h4"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00MFe",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1295,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "7k/p5pp/2r2q2/2p4Q/8/8/P5PP/3r1R1K w - - 0 30",
    "solution": [
      "h5e8",
      "f6f8",
      "e8f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00MGA",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 915,
    "sideToMove": "b",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r3r1k1/6b1/p2Nn2p/1P1Qp3/6nq/2P3P1/1PB2P2/R1B1R1K1 b - - 0 30",
    "solution": [
      "h4h2",
      "g1f1",
      "h2f2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00MS3",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Лёгкая",
    "rating": 809,
    "sideToMove": "w",
    "tags": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "rn1qr1k1/1p3ppp/2p2b2/p2p4/3P4/2N2N2/PPP1QPPP/2KRR3 w - - 0 13",
    "solution": [
      "e2e8",
      "d8e8",
      "e1e8"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-00Mgf",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1132,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "2RQ4/p4pp1/4p1kp/8/6PP/4qPK1/1r6/8 w - - 0 36",
    "solution": [
      "h4h5",
      "g6h7",
      "d8g8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00MwU",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1707,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "attraction",
      "endgame",
      "fork",
      "long",
      "sacrifice"
    ],
    "fen": "3r1b1R/1pq3p1/p1k3P1/3p4/1P1Q4/4PP2/P1P5/2K5 w - - 0 27",
    "solution": [
      "h8f8",
      "d8f8",
      "d4c5",
      "c6d7",
      "c5f8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Myw",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1422,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "master",
      "middlegame",
      "short"
    ],
    "fen": "r1b3rk/2q2p2/1n2p2n/p2pP1NP/P1pP1QP1/1pP5/1P3PB1/R3R1K1 w - - 5 27",
    "solution": [
      "f4f6",
      "g8g7",
      "f6h6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00NAM",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 715,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "r5k1/pp3ppp/8/3p4/2qP4/4R2P/2P1QPPK/8 w - - 2 22",
    "solution": [
      "e3e8",
      "a8e8",
      "e2e8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00NUS",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1374,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "4rk2/pbp2pp1/1p1N4/3P1q2/QPBP4/1KP2P2/P5r1/R3R3 b - - 0 25",
    "solution": [
      "f5c2",
      "b3a3",
      "c2b2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Nay",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1780,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "deflection",
      "long",
      "middlegame",
      "quietMove"
    ],
    "fen": "r2q1r2/ppp2p2/3p1nk1/4p1p1/2B1P3/2NP2Q1/PPP5/2K4R w - - 1 20",
    "solution": [
      "g3h3",
      "f8h8",
      "h3f5",
      "g6g7",
      "f5g5"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00Nej",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1037,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "long"
    ],
    "fen": "6k1/1p3pp1/pB2q2p/2P1b3/1P6/6QP/4r1P1/3R3K w - - 5 34",
    "solution": [
      "d1d8",
      "g8h7",
      "g3d3",
      "e6g6",
      "d3e2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Nf5",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1581,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "long",
      "opening"
    ],
    "fen": "r1bq1rk1/pp2bppp/2pp1n2/8/5P2/2N2N2/PBPPB1PP/R2Q1RK1 b - - 6 11",
    "solution": [
      "d8b6",
      "g1h1",
      "b6b2",
      "a1b1",
      "b2a3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Ngg",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1497,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "3qk2r/1p1bbppp/4pn2/1BPp1n2/3P4/4PN2/4QPPP/BN2K2R b Kk - 2 15",
    "solution": [
      "d8a5",
      "a1c3",
      "a5b5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Nqd",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Сложная",
    "rating": 1747,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "long",
      "sacrifice"
    ],
    "fen": "8/p7/5P2/PP1bp3/4N3/K7/2kp4/8 w - - 0 49",
    "solution": [
      "e4d2",
      "c2d2",
      "b5b6",
      "a7b6",
      "a5b6"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-00O8m",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1386,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "r3r1k1/ppp2ppp/2nnq3/8/3P4/P1P1P1P1/2Q3BP/R1B1KR2 w Q - 5 17",
    "solution": [
      "d4d5",
      "e6e5",
      "d5c6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00O9Z",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Сложная",
    "rating": 1620,
    "sideToMove": "b",
    "tags": [
      "backRankMate",
      "deflection",
      "endgame",
      "fork",
      "master",
      "mate",
      "mateIn4",
      "pin",
      "sacrifice",
      "veryLong"
    ],
    "fen": "5Q1R/5p1p/1b3qp1/p6k/P2P4/8/1P2rPPP/5RK1 b - - 8 32",
    "solution": [
      "f6f2",
      "f1f2",
      "e2e1",
      "f2f1",
      "b6d4",
      "g1h1",
      "e1f1"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-00O9a",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Лёгкая",
    "rating": 985,
    "sideToMove": "b",
    "tags": [
      "backRankMate",
      "long",
      "mate",
      "mateIn3",
      "middlegame",
      "sacrifice"
    ],
    "fen": "1k3r2/q5r1/2Qp3p/3Bp3/2N1P1p1/P7/1PP2PPP/R5K1 b - - 13 35",
    "solution": [
      "a7f2",
      "g1h1",
      "f2f1",
      "a1f1",
      "f8f1"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-00OCQ",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1127,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "queensideAttack",
      "sacrifice",
      "short"
    ],
    "fen": "1rr3k1/5p1p/p5pQ/4p3/4q3/B1P1P3/PP1R1PPP/2KR4 b - - 0 27",
    "solution": [
      "c8c3",
      "b2c3",
      "b8b1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Oim",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Средняя",
    "rating": 1213,
    "sideToMove": "b",
    "tags": [
      "advancedPawn",
      "advantage",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "1r3rk1/q5pp/2R5/3P4/2Q5/1p2NpPb/1P3P1P/3R2K1 b - - 1 32",
    "solution": [
      "a7e3",
      "f2e3",
      "f3f2"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-00OxK",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1149,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "exposedKing",
      "fork",
      "long"
    ],
    "fen": "3r2k1/1p3p2/p1n2P2/2P3P1/1PR1p3/P2pP3/3B4/6K1 b - - 1 33",
    "solution": [
      "c6e5",
      "c4e4",
      "e5f3",
      "g1f2",
      "f3d2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00P6j",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1326,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r2n2k1/1bq2rpp/1p6/3P4/p3Q3/B3P3/PP3PPP/3R2K1 w - - 0 21",
    "solution": [
      "e4e8",
      "f7f8",
      "e8f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00PGi",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1021,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "3r1q1k/p1pb2pp/1pnp4/6N1/5B2/1Q4P1/PP4PP/4R2K w - - 0 25",
    "solution": [
      "g5f7",
      "f8f7",
      "b3f7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00PUc",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1421,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "attraction",
      "exposedKing",
      "fork",
      "long",
      "middlegame",
      "sacrifice"
    ],
    "fen": "3r3k/pp4bp/3Bn1p1/7n/8/8/PP3P1K/3R1RN1 b - - 2 27",
    "solution": [
      "d8d6",
      "d1d6",
      "g7e5",
      "h2h1",
      "e5d6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00PZo",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1057,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "deflection",
      "endgame",
      "short"
    ],
    "fen": "7r/8/3b4/3p1P2/6R1/2kN4/4KP2/8 b - - 0 67",
    "solution": [
      "h8e8",
      "e2f3",
      "c3d3"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00Pc8",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1105,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "clearance",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "r1b2r2/pp1n2k1/2p3pp/4Np2/2BP4/8/PP4PP/2KRR3 w - - 1 19",
    "solution": [
      "e5d7",
      "c8d7",
      "e1e7",
      "g7f6",
      "e7d7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Pr6",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1475,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "long",
      "mate",
      "mateIn3",
      "middlegame",
      "sacrifice"
    ],
    "fen": "r1b2rk1/p4ppp/2p5/6q1/6P1/3p1Q1P/PPP5/1K2RR2 w - - 0 18",
    "solution": [
      "f3f7",
      "f8f7",
      "e1e8",
      "f7f8",
      "f1f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00PrK",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 968,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "short",
      "skewer"
    ],
    "fen": "8/7R/r3k3/4p2p/3b2p1/3K4/8/5R2 w - - 0 56",
    "solution": [
      "h7h6",
      "e6d5",
      "h6a6"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00PvX",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1670,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "knightEndgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "8/n7/P7/K2k4/P7/7P/5PP1/8 b - - 1 53",
    "solution": [
      "d5c5",
      "f2f3",
      "a7c6"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00QCe",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1430,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "1k5r/n1r3pp/5p2/ppN5/5P2/8/2R3PP/1R4K1 w - - 4 29",
    "solution": [
      "c5a6",
      "b8b7",
      "a6c7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00QHM",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 904,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3"
    ],
    "fen": "6k1/pp3rpp/4Nb2/4p3/1r6/6PK/PP5P/2R5 w - - 0 29",
    "solution": [
      "c1c8",
      "f6d8",
      "c8d8",
      "f7f8",
      "d8f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00QOa",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 848,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "6rk/1pR3p1/6Bp/2b4P/8/pP3PK1/P1P5/8 b - - 0 32",
    "solution": [
      "c5d6",
      "f3f4",
      "d6c7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00QW1",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1045,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "exposedKing",
      "long",
      "mate",
      "mateIn3",
      "rookEndgame"
    ],
    "fen": "8/3r1ppp/4p3/k3P3/pR2R2P/2P5/3r1PP1/2K5 b - - 5 31",
    "solution": [
      "d2d1",
      "c1b2",
      "d7d2",
      "b2a3",
      "d1a1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00QZ3",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1214,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "opening",
      "short"
    ],
    "fen": "r1bq1k1r/ppppn1pp/2n5/b5N1/4P3/B1P5/P4PPP/RN1QK2R w KQ - 2 10",
    "solution": [
      "d1f3",
      "f8e8",
      "f3f7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00QnO",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1472,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "intermezzo",
      "middlegame",
      "short"
    ],
    "fen": "1k1r1r2/pp4p1/6q1/2Qp4/5NP1/2P4p/PPN4P/R4R1K b - - 0 30",
    "solution": [
      "g6e4",
      "h1g1",
      "f8f4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00R2A",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Лёгкая",
    "rating": 867,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "short"
    ],
    "fen": "2kr1b1R/p5p1/8/3P1p2/2P5/4B3/PP1K1P2/8 b - - 0 25",
    "solution": [
      "f8b4",
      "d2d3",
      "d8h8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00ROK",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1364,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "8/p1p2k2/1r2rp2/3p1Q2/2qP2R1/2P4P/6PK/4q3 w - - 0 34",
    "solution": [
      "f5h7",
      "f7f8",
      "g4g8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00RYH",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Средняя",
    "rating": 1029,
    "sideToMove": "w",
    "tags": [
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "1k5r/ppp1R2p/r4p2/5Q2/3p4/2qP4/2P2PPP/2K1R3 w - - 6 27",
    "solution": [
      "e7e8",
      "h8e8",
      "e1e8"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-00Rcs",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 863,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "3k4/ppp2p1r/4p2P/5n2/3PK1N1/2P5/P1P3P1/7R b - - 0 30",
    "solution": [
      "f5g3",
      "e4f4",
      "g3h1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Rk3",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 822,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "8/1p2rppk/5q1p/Q4R2/2P5/PP5P/5PP1/5K2 b - - 0 32",
    "solution": [
      "f6a1",
      "a5e1",
      "e7e1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Rmm",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1514,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "attraction",
      "endgame",
      "fork",
      "long"
    ],
    "fen": "2rr2k1/5ppp/p7/1p1nP3/1B1P1PP1/PK5P/2R5/3R4 b - - 5 30",
    "solution": [
      "c8c2",
      "b3c2",
      "d5e3",
      "c2d3",
      "e3d1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00SCA",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1297,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "long"
    ],
    "fen": "8/2Q5/2p2nk1/4K3/2r5/8/8/8 b - - 5 71",
    "solution": [
      "c4e4",
      "e5d6",
      "f6e8",
      "d6d7",
      "e8c7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00SIE",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1188,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "2k3nr/ppp2ppp/2n5/8/8/1Q2P3/q4rPP/1R2KB1R w K - 0 16",
    "solution": [
      "b3b7",
      "c8d7",
      "b1d1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00SU7",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1659,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "2rqr1k1/B2b1ppp/5n2/8/7Q/3B4/P1P2PPP/R3R1K1 b - - 4 22",
    "solution": [
      "e8e1",
      "a1e1",
      "d8a5",
      "e1a1",
      "a5a7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00SsI",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1152,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "6R1/p4p1p/2p1pp1k/6b1/2N5/6R1/4K1PP/2q5 w - - 2 30",
    "solution": [
      "g3h3",
      "g5h4",
      "h3h4"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00SyL",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1361,
    "sideToMove": "w",
    "tags": [
      "capturingDefender",
      "crushing",
      "opening",
      "short"
    ],
    "fen": "1rb2rk1/4bppp/p1n1p3/1pq1P3/7N/P5P1/1PQ2PBP/R1B2RK1 w - - 2 16",
    "solution": [
      "c2c5",
      "e7c5",
      "g2c6"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00Sz9",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1011,
    "sideToMove": "b",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "1r4k1/p4ppp/4p3/p5n1/4P3/1P3PPq/QB3N1P/R5K1 b - - 0 30",
    "solution": [
      "g5f3",
      "g1h1",
      "h3h2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00T4i",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1535,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "middlegame",
      "short"
    ],
    "fen": "2r4k/q2b1Q1p/2p2P2/1p2p3/4P3/p2P3R/4N1K1/R7 b - - 0 38",
    "solution": [
      "d7h3",
      "g2h3",
      "a7f7"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00TAb",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 707,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "master",
      "short"
    ],
    "fen": "6k1/5pp1/p1N5/1n1b3p/1B4P1/P4P1P/2K5/8 w - - 3 43",
    "solution": [
      "c6e7",
      "g8h7",
      "e7d5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00TFd",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1033,
    "sideToMove": "b",
    "tags": [
      "deflection",
      "endgame",
      "mate",
      "mateIn2",
      "rookEndgame",
      "short"
    ],
    "fen": "1R6/2P5/p5k1/6pp/1P6/6PK/r6P/8 b - - 0 40",
    "solution": [
      "g5g4",
      "h3h4",
      "a2h2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00TLz",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1470,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "deflection",
      "endgame",
      "long"
    ],
    "fen": "8/p3Q2p/5qp1/4p1k1/8/8/Pr4PP/6K1 w - - 2 37",
    "solution": [
      "h2h4",
      "g5f5",
      "g2g4",
      "f5g4",
      "e7f6"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00TOX",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 802,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "b7/2k1pp2/ppn2qp1/8/4B3/1PNR4/P1P2PP1/5K2 w - - 0 27",
    "solution": [
      "c3d5",
      "c7b8",
      "d5f6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00TQf",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1196,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "4r1k1/p1R1n2p/4N3/5r2/6K1/6PP/P3R3/8 b - - 4 46",
    "solution": [
      "h7h5",
      "g4h4",
      "e7g6"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00TRo",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1727,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "7k/2r3p1/1p2p2b/3p2NQ/1q1P4/1p6/5R2/6K1 w - - 2 39",
    "solution": [
      "h5e8",
      "b4f8",
      "f2f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00TV2",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1729,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "long",
      "master"
    ],
    "fen": "6k1/p1Q2p1p/4p1p1/3p4/1r6/7P/q4PP1/5RK1 w - - 0 27",
    "solution": [
      "c7c8",
      "g8g7",
      "c8c3",
      "d5d4",
      "c3b4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Ta0",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1178,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "4k3/1R6/6N1/5p1p/7P/2r3PK/5b2/8 b - - 0 47",
    "solution": [
      "c3g3",
      "h3h2",
      "g3g6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Tdk",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1028,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "r6r/4kppp/2pNpnq1/p1P1n3/8/B3P3/PP1Q1PPP/3R1RK1 b - - 8 20",
    "solution": [
      "e5f3",
      "g1h1",
      "f3d2"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00TiV",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1136,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "short",
      "skewer"
    ],
    "fen": "8/1kp5/4n3/3p4/r2P3R/2K2N1P/8/8 b - - 6 48",
    "solution": [
      "a4a3",
      "c3c2",
      "a3f3"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00Tll",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1551,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "5r1k/1pN3p1/7p/pP6/P3P3/2PP3P/3BnbPK/R7 b - - 0 27",
    "solution": [
      "f2g3",
      "h2h1",
      "g3c7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Tya",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1263,
    "sideToMove": "b",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "r4rk1/6pp/1p1Bp3/p7/P1PP4/4nqP1/Q2R3P/4R1K1 b - - 2 25",
    "solution": [
      "f3f1",
      "e1f1",
      "f8f1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00UEs",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1513,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "deflection",
      "endgame",
      "master",
      "short"
    ],
    "fen": "8/3R3p/6p1/4k3/2Bnp3/1P5P/P6r/4K3 w - - 2 41",
    "solution": [
      "d7d5",
      "e5f4",
      "d5d4"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00UHZ",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1071,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "discoveredAttack",
      "endgame",
      "short"
    ],
    "fen": "6k1/6p1/pp2np1p/8/2r1NR1P/6P1/1PP5/1K6 w - - 2 33",
    "solution": [
      "e4f6",
      "g7f6",
      "f4c4"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00Ueq",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1738,
    "sideToMove": "w",
    "tags": [
      "attraction",
      "kingsideAttack",
      "master",
      "mate",
      "mateIn2",
      "middlegame",
      "pin",
      "sacrifice",
      "short"
    ],
    "fen": "r1b3k1/pp4b1/n1pqprQ1/4p3/2P2PP1/P2B4/1P6/R1B1K2R w KQ - 2 20",
    "solution": [
      "h1h8",
      "g8h8",
      "g6h7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00UgJ",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 919,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "1r1q1rk1/1b4b1/4p1Bp/3pP3/p2B2P1/7Q/PPP5/2KR3R b - - 0 23",
    "solution": [
      "d8g5",
      "c1b1",
      "g5g6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Ui0",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 716,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "r5k1/5pp1/2p5/P1N4p/2PR1n2/1P3P2/5P1P/6K1 b - - 0 26",
    "solution": [
      "f4e2",
      "g1f1",
      "e2d4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Uo9",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1144,
    "sideToMove": "w",
    "tags": [
      "advancedPawn",
      "crushing",
      "discoveredAttack",
      "discoveredCheck",
      "endgame",
      "long"
    ],
    "fen": "4Q3/4qppk/2p2b1p/1p2pP2/2r1B3/5P1P/6P1/5R1K w - - 4 34",
    "solution": [
      "e8e7",
      "f6e7",
      "f5f6",
      "c4e4",
      "f6e7"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00Us6",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1203,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "3r1rk1/p3R2p/2p2p2/1pP5/1n1P1P2/1q4P1/1B2Q2P/2K1R3 w - - 4 33",
    "solution": [
      "e2g4",
      "g8h8",
      "g4g7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Uwn",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1553,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "3r1rk1/p1p2pbp/1p4p1/7n/4P2q/1P2BP2/P1B3QP/3R1R1K w - - 7 24",
    "solution": [
      "e3g5",
      "h5g3",
      "g2g3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00UyQ",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1590,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "clearance",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "4r1k1/p1Q2pp1/1p5p/4P3/5r1q/5R2/P3B1PP/R5K1 b - - 0 22",
    "solution": [
      "f4f3",
      "g2f3",
      "h4d4",
      "g1g2",
      "d4a1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00V0G",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1122,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "rookEndgame",
      "short"
    ],
    "fen": "8/6P1/5k1K/8/8/3p4/P2R4/6r1 b - - 2 49",
    "solution": [
      "g1h1",
      "d2h2",
      "h1h2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00VGt",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1000,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "3K4/8/2P5/R5pp/1n6/5PkP/6P1/8 b - - 4 61",
    "solution": [
      "b4c6",
      "d8d7",
      "c6a5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00VSe",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 992,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "6nr/1pN2ppp/p2Qbk2/4p3/3Bq3/8/PP2BPPP/5K1R b - - 0 19",
    "solution": [
      "e4b1",
      "e2d1",
      "b1d1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Vdx",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1456,
    "sideToMove": "b",
    "tags": [
      "discoveredAttack",
      "discoveredCheck",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "morphysMate",
      "short"
    ],
    "fen": "2k3rB/ppp2p1p/2np4/8/4P3/2NB1b2/PPP2PPP/R4RK1 b - - 0 13",
    "solution": [
      "g8g2",
      "g1h1",
      "g2g4"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Vqp",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1588,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "long",
      "queenRookEndgame"
    ],
    "fen": "8/2R2ppp/4p3/p6k/6R1/4P2P/3q1PP1/6K1 b - - 3 33",
    "solution": [
      "d2d1",
      "g1h2",
      "d1d6",
      "g2g3",
      "d6c7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Vt0",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 772,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "1k4r1/pp3p2/4p3/2N1q3/1P1bp3/P3P3/5P2/2RR1K2 w - - 2 28",
    "solution": [
      "c5d7",
      "b8a8",
      "d7e5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00W5B",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1402,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "attraction",
      "endgame",
      "long",
      "pin",
      "sacrifice"
    ],
    "fen": "1r4k1/p5pp/5p2/2Rb4/1P4P1/P7/3r3P/3B1RK1 w - - 0 35",
    "solution": [
      "c5d5",
      "d2d5",
      "d1b3",
      "g8f8",
      "b3d5"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00WDP",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1162,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "4kb1r/p4ppp/Qrn5/2qpP1Bb/8/5N1P/P2N1PP1/R4RK1 w k - 3 17",
    "solution": [
      "a6c8",
      "c6d8",
      "c8d8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00WG3",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1044,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "long",
      "pin"
    ],
    "fen": "8/pk1r1Rp1/1p2p2p/4P1bP/4N3/8/PP6/1K1r1R2 w - - 5 34",
    "solution": [
      "f1d1",
      "d7f7",
      "e4d6",
      "b7c7",
      "d6f7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00WJN",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1324,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "queenEndgame",
      "short",
      "skewer"
    ],
    "fen": "5Q2/7K/8/8/4p2P/3k2q1/8/8 w - - 2 54",
    "solution": [
      "f8a3",
      "d3d2",
      "a3g3"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00WUu",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1527,
    "sideToMove": "b",
    "tags": [
      "attraction",
      "crushing",
      "fork",
      "long",
      "opening",
      "sacrifice"
    ],
    "fen": "r3k1nr/pp3ppp/1q2b3/8/1n1B4/6P1/P2QPPBP/R3K1NR b KQkq - 0 13",
    "solution": [
      "b6d4",
      "d2d4",
      "b4c2",
      "e1f1",
      "c2d4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00WZO",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1098,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "short",
      "skewer"
    ],
    "fen": "8/1R2B3/5p2/4bP1p/p1k4r/5K2/8/8 w - - 8 46",
    "solution": [
      "b7b4",
      "c4d5",
      "b4h4"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00WiX",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1017,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "8/5kpp/1p2p3/p1p1Q3/2Pn4/6P1/P4P1P/6K1 b - - 0 32",
    "solution": [
      "d4f3",
      "g1f1",
      "f3e5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00WqT",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1432,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r4r2/1ppb1p2/p2p2p1/5P1k/4P3/2PBB1R1/PKP2P1q/8 w - - 5 27",
    "solution": [
      "d3e2",
      "h5h4",
      "e3g5"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00WzS",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1453,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "hangingPiece",
      "intermezzo",
      "middlegame",
      "short"
    ],
    "fen": "r2qk2r/2pn1p1n/pp1p2Bp/3Pp1b1/PPP1P3/2N1B3/3N2PP/R2Q1RK1 b kq - 0 17",
    "solution": [
      "g5e3",
      "g1h1",
      "f7g6"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00XL2",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 984,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "2kr3r/ppp3pp/6q1/3Pnp2/1PPQp3/7P/P3NPP1/R4RK1 b - - 2 17",
    "solution": [
      "e5f3",
      "g1h1",
      "f3d4"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00XQ8",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1487,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "discoveredAttack",
      "endgame",
      "long"
    ],
    "fen": "k4r2/pp6/2p3Q1/3p2P1/4r2P/8/PPP2q2/2KR1R2 b - - 2 30",
    "solution": [
      "f2e3",
      "c1b1",
      "f8f1",
      "g6g8",
      "e4e8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00XXM",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1737,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "long",
      "middlegame",
      "pin"
    ],
    "fen": "3r2r1/Qpqkbp2/p1p1p2p/3nP3/8/2P1NP1N/PP6/1K1R3R w - - 4 26",
    "solution": [
      "c3c4",
      "b7b6",
      "a7c7",
      "d7c7",
      "c4d5"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00XZR",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1658,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "defensiveMove",
      "endgame",
      "long",
      "pin"
    ],
    "fen": "8/2p5/p1n5/1pP1p2k/1P1p4/P2P3q/5P2/R4KR1 w - - 0 35",
    "solution": [
      "f1e2",
      "e5e4",
      "g1h1",
      "e4d3",
      "e2d2"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00XqB",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1009,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "queenEndgame",
      "short"
    ],
    "fen": "8/pQ3p1k/3q1P1p/6p1/P2p2K1/1P1P3P/2P3P1/8 b - - 0 37",
    "solution": [
      "d6f4",
      "g4h5",
      "f4h4"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Y1c",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 759,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "5rk1/3Q1p2/5p1p/2q5/8/8/P1r2PPP/3RR1K1 b - - 5 23",
    "solution": [
      "c5f2",
      "g1h1",
      "f2g2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Y5Q",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 889,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "opening",
      "short"
    ],
    "fen": "rnbq1rk1/pp2b2p/4p2Q/3p1p2/2pP4/P1N5/1PP1PPPP/2KR1BNR b - - 0 11",
    "solution": [
      "e7g5",
      "h6g5",
      "d8g5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Y6y",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1193,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "discoveredAttack",
      "discoveredCheck",
      "endgame",
      "long"
    ],
    "fen": "5k2/5pp1/8/1p2N3/1P6/7P/3nR1PK/2r5 b - - 2 48",
    "solution": [
      "d2f1",
      "h2g1",
      "f1g3",
      "g1f2",
      "g3e2"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00YJz",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1076,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "8/ppp3p1/2nb1kB1/3r3R/4Q3/4PPq1/PP6/R1B2K2 b - - 4 24",
    "solution": [
      "d5d1",
      "f1e2",
      "g3e1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00YbZ",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1347,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "pin",
      "short"
    ],
    "fen": "b6k/8/1Q4p1/4q2p/5r1P/P1N3R1/1PP3PK/8 b - - 4 35",
    "solution": [
      "f4h4",
      "h2g1",
      "e5e1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Ybq",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1192,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "master",
      "middlegame",
      "short"
    ],
    "fen": "2r5/4kp2/p3p2q/1p3nNP/3rQP2/P1N5/1P3K2/6R1 w - - 0 35",
    "solution": [
      "e4b7",
      "d4d7",
      "b7c8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00Yey",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 780,
    "sideToMove": "b",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r3kb1r/4ppp1/3q2p1/p2p4/Pp1PN3/8/1PP1QPPP/R1B1R1K1 b kq - 0 17",
    "solution": [
      "d6h2",
      "g1f1",
      "h2h1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00Yy4",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1039,
    "sideToMove": "b",
    "tags": [
      "clearance",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "r7/pp4kp/6p1/2P2q1n/1PBb1p2/P4P2/3B2PP/2Q1R2K b - - 2 28",
    "solution": [
      "h5g3",
      "h2g3",
      "f5h5"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00ZAn",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1794,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "hangingPiece",
      "long",
      "opening"
    ],
    "fen": "rnbqk1nr/ppp1b1pp/3p4/4N3/2B1P3/8/PPPP2PP/RNBQK2R b KQkq - 0 6",
    "solution": [
      "d6e5",
      "d1h5",
      "g7g6",
      "h5e5",
      "g8f6"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00ZDZ",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1788,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "long"
    ],
    "fen": "8/pp4k1/2p3p1/3nRr2/3P1PK1/2P5/PP6/5R2 b - - 0 36",
    "solution": [
      "f5e5",
      "d4e5",
      "d5e3",
      "g4f3",
      "e3f1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00ZEc",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1773,
    "sideToMove": "w",
    "tags": [
      "discoveredCheck",
      "doubleCheck",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "1r3b2/5p1k/3P1qRP/r1n1p3/ppB5/P2Q1P2/1PP5/1K6 w - - 1 36",
    "solution": [
      "g6g7",
      "h7h6",
      "d3h7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00ZN7",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 884,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "3q2k1/8/Q2p2p1/3P1P1p/1p4nP/1Pp5/2P3P1/5R1K b - - 0 36",
    "solution": [
      "d8h4",
      "h1g1",
      "h4h2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00ZPK",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Лёгкая",
    "rating": 968,
    "sideToMove": "w",
    "tags": [
      "advancedPawn",
      "advantage",
      "endgame",
      "long",
      "master",
      "rookEndgame",
      "sacrifice"
    ],
    "fen": "5r2/R2R1pk1/P7/5p2/6p1/1KP5/5r2/8 w - - 0 45",
    "solution": [
      "d7f7",
      "f8f7",
      "a7f7",
      "g7f7",
      "a6a7"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-00ZSd",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1352,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "long",
      "pin"
    ],
    "fen": "2R5/5pk1/pb4p1/1p1q4/3P1P1p/P3r2P/1PQ3P1/3R3K b - - 7 45",
    "solution": [
      "e3h3",
      "h1g1",
      "b6d4",
      "d1d4",
      "d5d4"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00ZWD",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 762,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "6k1/4bpp1/4p3/p2pP1N1/1q1P3P/1P1Q2K1/5P2/8 w - - 1 34",
    "solution": [
      "d3h7",
      "g8f8",
      "h7h8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00ZeT",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1480,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "pin",
      "short"
    ],
    "fen": "1Q6/3kr3/2q4p/2p1pp1P/2Bb4/1P6/P6K/4R3 w - - 5 44",
    "solution": [
      "c4b5",
      "c6b5",
      "b8b5"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00Zit",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1170,
    "sideToMove": "b",
    "tags": [
      "deflection",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r3kb1r/ppp2pp1/3p4/1P2p3/2P3Qn/2N1P2q/PB1P1P1N/R4RK1 b kq - 0 15",
    "solution": [
      "h4f3",
      "h2f3",
      "h3g4"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00aBq",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Лёгкая",
    "rating": 895,
    "sideToMove": "w",
    "tags": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "r5k1/pp3ppp/1qn2b2/3r4/4QB2/1P3N2/P4PPP/4R1K1 w - - 0 19",
    "solution": [
      "e4e8",
      "a8e8",
      "e1e8"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-00aCb",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1031,
    "sideToMove": "w",
    "tags": [
      "clearance",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "r2q1rk1/pp2bpp1/2p1b2p/4P3/3PNn2/1P1Q3P/P4BP1/1BR2RK1 w - - 5 26",
    "solution": [
      "e4f6",
      "g7f6",
      "d3h7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00aDl",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1438,
    "sideToMove": "b",
    "tags": [
      "attraction",
      "mate",
      "mateIn2",
      "middlegame",
      "queensideAttack",
      "sacrifice",
      "short"
    ],
    "fen": "r5k1/1p3p2/2p1ppp1/3p4/2nP4/1QB4P/rPP1BPP1/qNKR3R b - - 4 22",
    "solution": [
      "a1b1",
      "c1b1",
      "a2a1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00aG8",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1559,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "long",
      "pin",
      "quietMove"
    ],
    "fen": "1r3k2/p4ppp/2r5/5N2/P2P4/8/2P2PPP/3Q2K1 b - - 4 23",
    "solution": [
      "c6b6",
      "g1f1",
      "b6b1",
      "d1b1",
      "b8b1"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00aOF",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1245,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "3r2k1/pp2R2p/5pbQ/q2p4/6PP/1Br2P2/P1P5/5RK1 b - - 1 24",
    "solution": [
      "a5c5",
      "f1f2",
      "c5e7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00ax2",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 715,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r1b4k/1pp3p1/1b1p1q1p/1p5Q/P1P1Bp2/3P4/6PP/5R1K w - - 2 24",
    "solution": [
      "h5e8",
      "f6f8",
      "e8f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00bTs",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1101,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "master",
      "middlegame",
      "short"
    ],
    "fen": "2r4k/6RP/8/3p4/pp1qn3/3N1Q2/PPP5/1K5R b - - 0 35",
    "solution": [
      "e4d2",
      "b1a1",
      "d2f3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00baZ",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 812,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "r7/8/p1k5/1p1p1pn1/7R/2P1P2P/5P2/R5K1 b - - 0 31",
    "solution": [
      "g5f3",
      "g1g2",
      "f3h4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00byq",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1094,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "pin",
      "veryLong"
    ],
    "fen": "2r3k1/2r1bppp/3ppn2/qp6/4P3/1Q2B1P1/PP3PBP/1RR3K1 b - - 6 21",
    "solution": [
      "c7c1",
      "b1c1",
      "c8c1",
      "e3c1",
      "a5e1",
      "g2f1",
      "e1c1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00cJo",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Лёгкая",
    "rating": 998,
    "sideToMove": "w",
    "tags": [
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "6k1/5ppp/8/8/1P2p3/3bQpP1/1q1P1K1P/R1r5 w - - 0 31",
    "solution": [
      "a1a8",
      "c1c8",
      "a8c8"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-00csH",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1535,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "2bqkb1r/4p1p1/p6p/1pNPpp2/2r5/P1N1n3/1P2QPPP/R4RK1 w k - 0 19",
    "solution": [
      "e2h5",
      "g7g6",
      "h5g6"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00cud",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 960,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "master",
      "short"
    ],
    "fen": "8/5p2/6p1/1p1N1k2/1P1K4/2P3P1/8/5b2 w - - 1 49",
    "solution": [
      "d5e3",
      "f5e6",
      "e3f1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00cy1",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1181,
    "sideToMove": "w",
    "tags": [
      "advancedPawn",
      "advantage",
      "master",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "2rknb2/3q1pp1/p1pP3r/1pQ1P3/5P1p/1P4P1/PB4K1/3R4 w - - 0 28",
    "solution": [
      "c5b6",
      "e8c7",
      "d6c7"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00d5g",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1090,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3",
      "pillsburysMate"
    ],
    "fen": "2b2r1k/pp4p1/2p5/4r3/2B5/1P6/P4pK1/5R2 w - - 5 33",
    "solution": [
      "f1h1",
      "c8h3",
      "h1h3",
      "e5h5",
      "h3h5"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00d9q",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1116,
    "sideToMove": "w",
    "tags": [
      "attraction",
      "crushing",
      "deflection",
      "master",
      "middlegame",
      "short"
    ],
    "fen": "1r3r2/Q1qk3p/2pp1npb/2p2P2/8/2N5/PP3PPP/4RRK1 w - - 1 20",
    "solution": [
      "e1e7",
      "d7e7",
      "a7c7"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00dTO",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 858,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "5q2/3n1rk1/3p2p1/p1p5/1pP2NP1/3PNp1P/PP5K/3Q4 w - - 2 31",
    "solution": [
      "f4e6",
      "g7g8",
      "e6f8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00dUW",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1251,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "4k2r/1pb3pp/p4p2/2PNp2b/1PBn4/P5P1/3B1P1P/5RK1 b k - 4 23",
    "solution": [
      "d4f3",
      "g1g2",
      "f3d2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00dnp",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1304,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "master",
      "queenRookEndgame",
      "short"
    ],
    "fen": "8/Q7/7r/8/6K1/1r4p1/4k1P1/8 w - - 3 65",
    "solution": [
      "a7a2",
      "e2e3",
      "a2b3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00dzT",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 900,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "hangingPiece",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "6k1/1Q4p1/p1p4p/3pP3/P3bq2/2N4P/1P4P1/5B1K b - - 2 26",
    "solution": [
      "f4f1",
      "h1h2",
      "f1g2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00eAX",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 703,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "rookEndgame",
      "short"
    ],
    "fen": "6k1/ppp1r1pp/8/8/2r5/2P5/P5PP/3R1RK1 w - - 0 27",
    "solution": [
      "d1d8",
      "e7e8",
      "d8e8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00eB8",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 981,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "4r3/2p1q2k/p1Pp2pb/1p1Q3p/7P/2P2R2/PP4P1/1K6 w - - 2 35",
    "solution": [
      "f3f7",
      "h6g7",
      "f7e7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00eCY",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 774,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "hangingPiece",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "8/6p1/5p1p/R2b2kP/6P1/1r3PK1/8/8 w - - 5 62",
    "solution": [
      "a5d5",
      "f6f5",
      "d5f5"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00eNe",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 885,
    "sideToMove": "b",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "4r1k1/p1p2ppp/2p1r3/3q4/P2B4/1P1P4/2Q2PPP/2R1R1K1 b - - 0 21",
    "solution": [
      "e6e1",
      "c1e1",
      "e8e1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00eWz",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1657,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "clearance",
      "master",
      "middlegame",
      "pin",
      "sacrifice",
      "short"
    ],
    "fen": "4r1k1/p5bp/1q2N1p1/2pPrp2/1pP5/6PP/P4QB1/1R3RK1 b - - 3 25",
    "solution": [
      "e5e6",
      "d5e6",
      "g7d4"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00eXL",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Сложная",
    "rating": 1669,
    "sideToMove": "w",
    "tags": [
      "advancedPawn",
      "advantage",
      "endgame",
      "sacrifice",
      "short"
    ],
    "fen": "8/8/3RP3/2Pn4/ppN1k2p/8/rP1K4/8 w - - 0 41",
    "solution": [
      "d6d5",
      "e4d5",
      "e6e7"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-00eix",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1440,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "2r1r1k1/p3qpbp/1p1p1np1/4P3/3B1P2/1P3bP1/PQ1N3P/1R2R1K1 w - - 0 22",
    "solution": [
      "e5f6",
      "e7e1",
      "b1e1",
      "e8e1",
      "g1f2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00f1Y",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1310,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "discoveredAttack",
      "endgame",
      "short"
    ],
    "fen": "2r5/p2n1pkp/4p1p1/2Np4/1r6/1P1K1P1P/P3R1P1/2R5 w - - 6 37",
    "solution": [
      "c5e6",
      "f7e6",
      "c1c8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00f9v",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 852,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "5rk1/2p3p1/1p1p4/3Pp2p/1PP1N1q1/4Q2N/6PP/6K1 b - - 0 29",
    "solution": [
      "g4d1",
      "e3e1",
      "d1e1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00fJC",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1692,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "long",
      "sacrifice"
    ],
    "fen": "3r4/6p1/5p1p/r1kp4/Pp3q2/2pR3P/2Q2PP1/3R2K1 w - - 5 40",
    "solution": [
      "d3c3",
      "b4c3",
      "c2c3",
      "c5d6",
      "c3a5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00fjN",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1168,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r4rk1/pp3p1p/2p3p1/q3Nb2/3Pn3/1Q1BP3/PP2KPPP/2R4R b - - 0 18",
    "solution": [
      "a5d2",
      "e2f3",
      "d2f2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00ft3",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1264,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "8/p7/2R3p1/4Nn2/2P2k1p/7K/Pr6/8 w - - 4 51",
    "solution": [
      "e5d3",
      "f4g5",
      "d3b2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00fwM",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1183,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "opening",
      "short"
    ],
    "fen": "Qn1qk2r/p4ppp/2p5/2bn4/4pPb1/2N4P/PPPP2P1/R1B1KBNR b KQk - 0 9",
    "solution": [
      "d8h4",
      "g2g3",
      "h4g3"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00g5H",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1367,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "deflection",
      "endgame",
      "long"
    ],
    "fen": "2r3k1/p4pp1/1p5p/1Q6/2q5/5P2/1P4PP/3R2K1 w - - 4 31",
    "solution": [
      "d1d8",
      "c8d8",
      "b5c4",
      "d8d1",
      "g1f2"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00gH0",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Средняя",
    "rating": 1347,
    "sideToMove": "w",
    "tags": [
      "backRankMate",
      "endgame",
      "long",
      "mate",
      "mateIn3",
      "sacrifice"
    ],
    "fen": "3r2k1/6pp/8/5Q2/2pP4/2q3P1/5RKP/8 w - - 0 36",
    "solution": [
      "f5f7",
      "g8h8",
      "f7f8",
      "d8f8",
      "f2f8"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-00gNl",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 926,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "exposedKing",
      "long",
      "mate",
      "mateIn3",
      "rookEndgame"
    ],
    "fen": "6k1/5R2/pp4p1/2p4p/7P/1P6/P2rr1PK/5R2 w - - 1 39",
    "solution": [
      "f7f8",
      "g8h7",
      "f1f7",
      "h7h6",
      "f8h8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00gPT",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1784,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "operaMate",
      "short"
    ],
    "fen": "2r1r3/5R2/p5P1/8/5P2/PB3bR1/1PP2k1P/2K5 b - - 0 35",
    "solution": [
      "e8e1",
      "c1d2",
      "e1d1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00ghH",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 730,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "5r1k/6p1/1Q2pq1p/P2P1r2/8/2P1R3/6PP/4R1K1 b - - 0 39",
    "solution": [
      "f5f1",
      "e1f1",
      "f6f1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00gnK",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1148,
    "sideToMove": "b",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "2kr3r/1pq2pp1/p1pbb3/B6p/Q2P2n1/5N2/PP3PPP/2R1RBK1 b - - 2 20",
    "solution": [
      "d6h2",
      "f3h2",
      "c7h2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00gym",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1754,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "long",
      "opening"
    ],
    "fen": "r2qkb1r/pp2pppp/3p1n2/4n3/4b1PN/2PB3P/PP3P2/RNBQK2R w KQkq - 0 12",
    "solution": [
      "d3e4",
      "f6e4",
      "d1a4",
      "e5c6",
      "a4e4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00h41",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1282,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "4Q3/p3r3/1pp1k1pR/5p2/4p1q1/8/PP3P2/5K2 w - - 4 47",
    "solution": [
      "h6g6",
      "g4g6",
      "e8g6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00h8Z",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1544,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "queenRookEndgame",
      "short"
    ],
    "fen": "5k2/p1R4R/1p4p1/3r3q/3P4/2P3rp/PP5K/8 w - - 0 37",
    "solution": [
      "c7c8",
      "d5d8",
      "c8d8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00h95",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1721,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "long",
      "skewer"
    ],
    "fen": "7k/2p3p1/5p1p/2Qq4/3Pr3/4P3/P4P1P/1R4K1 b - - 3 26",
    "solution": [
      "e4g4",
      "g1f1",
      "d5h1",
      "f1e2",
      "h1b1"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00hNb",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1111,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "5k2/pp3ppp/4p3/3p4/1Pn2q2/2P3P1/P3QnKP/R2R4 b - - 2 30",
    "solution": [
      "c4e3",
      "e2e3",
      "f4e3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00hSW",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Сложная",
    "rating": 1702,
    "sideToMove": "b",
    "tags": [
      "advancedPawn",
      "advantage",
      "endgame",
      "master",
      "promotion",
      "sacrifice",
      "veryLong"
    ],
    "fen": "2R5/3Nb1pk/1r5p/2pP4/1p2P3/3P4/4K1PP/8 b - - 2 39",
    "solution": [
      "b4b3",
      "d5d6",
      "e7d6",
      "d7b6",
      "b3b2",
      "b6c4",
      "b2b1q"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-00hSr",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1121,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r4rk1/8/1q2pnpP/p2p4/1ppP4/2P1P3/PPQN1P2/2K4R w - - 0 22",
    "solution": [
      "c2g6",
      "g8h8",
      "g6g7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00hbV",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Лёгкая",
    "rating": 957,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "hangingPiece",
      "master",
      "short"
    ],
    "fen": "8/pk1r2R1/1p2b3/8/2P2N2/1P6/1K6/8 w - - 22 61",
    "solution": [
      "f4e6",
      "d7g7",
      "e6g7"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00hgt",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 907,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "long",
      "mate",
      "mateIn3",
      "middlegame"
    ],
    "fen": "r6k/pp4p1/3p2rp/6q1/2Q2p2/1P3P1b/PBP1R1P1/4R1K1 w - - 0 25",
    "solution": [
      "e2e8",
      "a8e8",
      "e1e8",
      "h8h7",
      "c4g8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00huW",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1671,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "long"
    ],
    "fen": "8/3k4/p6p/1p1PQ1pP/6b1/1PP2qP1/P3p3/1K2R3 b - - 0 44",
    "solution": [
      "f3d3",
      "b1b2",
      "d3d2",
      "b2a3",
      "d2e1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00hxr",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1739,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "hangingPiece",
      "long",
      "middlegame"
    ],
    "fen": "r4rk1/pp3pBp/4p3/3p2qB/Q1p5/2PbP3/PP1N1P1P/R3K2R b KQ - 0 15",
    "solution": [
      "g5h5",
      "a4d1",
      "h5d1",
      "a1d1",
      "g8g7"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00i7t",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 927,
    "sideToMove": "w",
    "tags": [
      "hangingPiece",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "4r2k/p4r1p/2pp1b2/2p5/5P2/3P2R1/PqPB2PP/4RK2 w - - 0 22",
    "solution": [
      "e1e8",
      "f7f8",
      "e8f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00isY",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1505,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "master",
      "opening",
      "short"
    ],
    "fen": "rnbqk2r/ppp3pp/5n2/3P1p2/1b2pB2/2N5/PP3PPP/R2QKBNR w KQkq - 1 8",
    "solution": [
      "d1a4",
      "c7c6",
      "a4b4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00j3i",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1378,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3",
      "sacrifice"
    ],
    "fen": "5rk1/R5p1/5q1p/8/3p2Q1/1P6/P3rPPP/5RK1 b - - 3 38",
    "solution": [
      "f6f2",
      "f1f2",
      "e2e1",
      "f2f1",
      "e1f1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00jCD",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1389,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "discoveredAttack",
      "middlegame",
      "short"
    ],
    "fen": "r4r1k/ppp1b1pp/3q1n2/6B1/8/1QN5/PPP2PPP/R4RK1 b - - 4 14",
    "solution": [
      "f6g4",
      "g2g3",
      "e7g5"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00jNk",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1063,
    "sideToMove": "b",
    "tags": [
      "fork",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "7r/5pb1/3Qpk1p/5Bp1/3P4/1N2P1P1/Pr2qPP1/R5KR b - - 0 29",
    "solution": [
      "e2f2",
      "g1h2",
      "f2g2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00jOm",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Лёгкая",
    "rating": 798,
    "sideToMove": "b",
    "tags": [
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2",
      "rookEndgame",
      "short"
    ],
    "fen": "1rR5/3Pkppp/4p3/3p4/8/8/P4PPP/6K1 b - - 1 29",
    "solution": [
      "b8b1",
      "c8c1",
      "b1c1"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-00jPH",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1379,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "1k1r3r/1b1p1p2/p3p3/1p2PB2/3n2Np/P1Q5/1P3PPP/4NRK1 b - - 0 26",
    "solution": [
      "d4e2",
      "g1h1",
      "e2c3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00jhH",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 871,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "r7/2p1kp2/3p1np1/1p2p1N1/4P3/2PP2P1/1P3QPK/8 b - - 5 29",
    "solution": [
      "f6g4",
      "h2g1",
      "g4f2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00k2Z",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1574,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "5rk1/8/8/p1pR4/P1Pb4/1P1p2P1/6P1/1R2K3 b - - 4 38",
    "solution": [
      "d4c3",
      "e1d1",
      "f8f1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00k6k",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1028,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "opening",
      "short"
    ],
    "fen": "r2q1rk1/p1p1bpp1/2p1bn1p/8/2PP3B/1PNB1P2/P5PP/R2Q1RK1 b - - 0 14",
    "solution": [
      "d8d4",
      "h4f2",
      "d4c3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00kS9",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1466,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "hangingPiece",
      "long",
      "middlegame"
    ],
    "fen": "4r1k1/1ppbrppB/7p/p2P4/3q1P2/P4P2/1P1Q2PP/3RR2K b - - 6 26",
    "solution": [
      "g8h7",
      "e1e7",
      "d4d2",
      "d1d2",
      "e8e7"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00kZF",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1308,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "discoveredCheck",
      "middlegame",
      "short"
    ],
    "fen": "r3r3/1p1n2pk/2p1p2p/2P5/1p2R3/P2Q1N1P/5PP1/q5K1 w - - 0 25",
    "solution": [
      "e4e1",
      "h7h8",
      "e1a1"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00l68",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1287,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3"
    ],
    "fen": "6Q1/q1k5/3pB1p1/2pP1p2/2P2P2/rp2PK1P/8/8 w - - 3 38",
    "solution": [
      "g8c8",
      "c7b6",
      "c8c6",
      "b6a5",
      "c6b5"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00l7Y",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1487,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "deflection",
      "long",
      "middlegame",
      "pin"
    ],
    "fen": "r1bq4/p3p1bk/2p3p1/3pn2p/8/2NB3P/PPPBQ1P1/5RK1 w - - 2 18",
    "solution": [
      "e2h5",
      "h7g8",
      "d3g6",
      "e5g6",
      "h5g6"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00lA1",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1641,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "r2k3r/ppp3Np/3p2pB/2b1p3/2B1P3/2NP3q/PPP2P2/R2R2K1 w - - 4 18",
    "solution": [
      "h6g5",
      "d8d7",
      "c4e6",
      "h3e6",
      "g7e6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00lIV",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1675,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "middlegame",
      "short"
    ],
    "fen": "r2qr1k1/pb2bppp/2p2n2/3pN1B1/2P5/4P3/PPQ1BPPP/3RK2R b K - 4 13",
    "solution": [
      "e7b4",
      "e1f1",
      "e8e5"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00lap",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 948,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "master",
      "rookEndgame",
      "short",
      "skewer"
    ],
    "fen": "8/8/2k3r1/R7/P2p3p/3K4/8/8 w - - 0 46",
    "solution": [
      "a5a6",
      "c6d7",
      "a6g6"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00ldC",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1725,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "clearance",
      "deflection",
      "endgame",
      "fork",
      "sacrifice",
      "veryLong"
    ],
    "fen": "5r2/pp3pk1/2p1pRp1/6Qp/2P5/P7/1q1r2PP/5R1K w - - 2 32",
    "solution": [
      "f6g6",
      "f7g6",
      "g5e7",
      "g7h6",
      "e7f8",
      "b2g7",
      "f8f4",
      "h6h7",
      "f4d2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00lvP",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1470,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "deflection",
      "endgame",
      "veryLong"
    ],
    "fen": "6k1/p4pp1/Qp3q1p/2p1R3/8/2P2N1P/P1P2PPK/2r5 b - - 5 24",
    "solution": [
      "f6f4",
      "g2g3",
      "f4f3",
      "e5e8",
      "g8h7",
      "a6d3",
      "f3d3"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00mFI",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1275,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "4r2k/2q4r/2p4Q/p5P1/1p1Pp1P1/2P1N2P/PP6/4bRK1 w - - 1 29",
    "solution": [
      "f1f8",
      "e8f8",
      "h6f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00mLw",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1193,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "r5k1/p5pp/1p5r/3p4/2pQ1P1q/2P1P2b/P1P1B1P1/R5K1 w - - 0 26",
    "solution": [
      "d4d5",
      "h3e6",
      "d5a8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00mvP",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1190,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "discoveredAttack",
      "middlegame",
      "short"
    ],
    "fen": "r1b2k1r/pppp2pp/5q2/4n3/2BQ4/8/PPP2PPP/RN2R1K1 b - - 0 13",
    "solution": [
      "e5f3",
      "g2f3",
      "f6d4"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00mvr",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Лёгкая",
    "rating": 809,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "master",
      "short"
    ],
    "fen": "7r/ppp1k2p/2n5/8/8/2P2pP1/P6P/R1Br1BK1 w - - 0 21",
    "solution": [
      "c1g5",
      "e7e6",
      "a1d1"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00n3G",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1135,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "deflection",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "1k4r1/7p/1p4r1/pPp1qp2/P1Pp1R2/3Q1RNP/2P4K/8 b - - 5 32",
    "solution": [
      "g6g3",
      "f3g3",
      "e5f4"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00nHy",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1271,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "middlegame",
      "short"
    ],
    "fen": "r2q1rk1/p4pbp/1pp1p1p1/4n3/2PQN3/1P4P1/PB2PP1P/1R3RK1 b - - 0 16",
    "solution": [
      "e5f3",
      "e2f3",
      "g7d4"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00nZE",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 984,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "operaMate",
      "short"
    ],
    "fen": "r1b1r3/pp1p1p1k/2n2Bp1/2p1qp2/2B1P3/3P1R2/PPP3PP/R5K1 w - - 0 17",
    "solution": [
      "f3h3",
      "h7g8",
      "h3h8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00nl3",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 820,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "master",
      "short",
      "skewer"
    ],
    "fen": "6R1/6p1/p1k4p/1p1p4/PP2p1P1/2b1P3/6K1/8 w - - 0 38",
    "solution": [
      "g8c8",
      "c6b7",
      "c8c3"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00noA",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1258,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3",
      "operaMate"
    ],
    "fen": "8/1b4p1/p3p1Pr/1p1p4/3N4/2PBk3/PP5r/1K3R2 w - - 21 42",
    "solution": [
      "f1f3",
      "e3d2",
      "d4b3",
      "d2e1",
      "f3f1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00o5f",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1252,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "pin",
      "short"
    ],
    "fen": "6r1/2R3pk/1n2p2p/p6N/6PP/8/P7/6K1 w - - 1 41",
    "solution": [
      "h5f6",
      "h7h8",
      "f6g8"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00oQO",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1430,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "master",
      "short"
    ],
    "fen": "5rk1/1p4pp/p7/5N2/3Rrn2/6KP/PPR2PP1/8 b - - 2 34",
    "solution": [
      "f4e2",
      "c2e2",
      "e4e2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00oXF",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1598,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "3r1rk1/1p3p1p/p1q3p1/4Pb1P/2p2P2/P5R1/2Q1B1P1/3R2K1 w - - 2 26",
    "solution": [
      "c2f5",
      "d8d1",
      "e2d1"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00ocD",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 962,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "1R6/8/8/4p3/4Nk1p/5P1P/6PK/r3b3 b - - 15 48",
    "solution": [
      "e1g3",
      "e4g3",
      "h4g3"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00ooZ",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 861,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "8/p4ppp/1ppk4/5P1P/1PR3P1/3K1n2/P7/8 b - - 0 38",
    "solution": [
      "f3e5",
      "d3c3",
      "e5c4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00ouE",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1264,
    "sideToMove": "b",
    "tags": [
      "attraction",
      "endgame",
      "mate",
      "mateIn2",
      "sacrifice",
      "short"
    ],
    "fen": "2r5/2r3k1/1p2Qp1p/p2p2p1/3P4/4P1P1/PPq2P1R/KR6 b - - 0 30",
    "solution": [
      "c2b1",
      "a1b1",
      "c7c1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00pER",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1586,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short",
      "smotheredMate"
    ],
    "fen": "r2q1r1k/4N1bp/p2p2p1/2p3N1/Pp4P1/1Q5P/1P1n1P2/5RK1 w - - 1 22",
    "solution": [
      "b3g8",
      "f8g8",
      "g5f7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00pVS",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1317,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "r3kbnN/ppp3pp/3p4/8/8/2NP3b/PPP4P/R2QKBq1 w Qq - 4 16",
    "solution": [
      "d1h5",
      "g7g6",
      "h5h3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00piA",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1110,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "r5k1/pp3pp1/2p2q1p/3pr3/P3bP2/2P1N1P1/1P1Q1K1P/R3R3 w - - 0 24",
    "solution": [
      "e3g4",
      "f6f5",
      "g4e5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00puq",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 955,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "4r3/1k3pbp/1pp1q3/p4pp1/P2P2n1/2PQ1N2/1P3PPP/2N1R1K1 b - - 7 33",
    "solution": [
      "e6e1",
      "f3e1",
      "e8e1",
      "d3f1",
      "e1f1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00q8C",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 830,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "1rb3k1/p2q2bp/2p4r/2P1p1p1/3pPp2/1P1P1P2/PB1NN1KP/1R2QR2 b - - 0 22",
    "solution": [
      "d7h3",
      "g2g1",
      "h3h2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00qIK",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1569,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "hangingPiece",
      "intermezzo",
      "middlegame",
      "short"
    ],
    "fen": "B4rk1/p3b1pp/1q2bp2/1p2p3/2p2P2/3PR1P1/PPPN3P/R1BQ2K1 b - - 0 16",
    "solution": [
      "b6e3",
      "g1g2",
      "f8a8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00qX2",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1225,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short",
      "triangleMate"
    ],
    "fen": "1r2r2k/Q1R4p/6p1/4qb2/8/8/PP3PPP/3R2K1 w - - 0 29",
    "solution": [
      "c7h7",
      "h8g8",
      "a7f7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00qk4",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1601,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "operaMate",
      "sacrifice",
      "short"
    ],
    "fen": "3r4/ppN1kppp/5n2/8/1n3Nb1/4P3/1B3PPP/2R1KB1R b K - 1 18",
    "solution": [
      "b4c2",
      "c1c2",
      "d8d1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00qqD",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 814,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "r6r/ppp2kp1/2n5/2p1p2p/4P1n1/3P1N1q/PPP2P1N/R3QRK1 w - - 0 15",
    "solution": [
      "f3g5",
      "f7g8",
      "g5h3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00rAM",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1743,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "deflection",
      "middlegame",
      "short"
    ],
    "fen": "3rr1k1/1p3pq1/p1n1b2p/2b3p1/QP6/P2BPNB1/5PPP/R2R2K1 b - - 0 20",
    "solution": [
      "d8d3",
      "d1d3",
      "g7a1"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00rNc",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1621,
    "sideToMove": "b",
    "tags": [
      "clearance",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "1q5r/p3kpp1/2Q1p2p/3pP2P/2n3P1/2N2P2/PrP1N3/K3R2R b - - 1 26",
    "solution": [
      "b2a2",
      "c3a2",
      "b8b2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00rYm",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1039,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "2r3k1/R4pp1/1p2p2p/1q2P3/3Pp3/4P2P/1p3QP1/6K1 w - - 0 35",
    "solution": [
      "f2f7",
      "g8h8",
      "f7g7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00rYo",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1104,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "master",
      "masterVsMaster",
      "short"
    ],
    "fen": "8/p1p4p/6p1/2p2k2/2Pb4/1P3P1K/P2RN2P/5r2 w - - 10 36",
    "solution": [
      "e2g3",
      "f5f4",
      "g3f1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00rw0",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1733,
    "sideToMove": "w",
    "tags": [
      "exposedKing",
      "fork",
      "long",
      "mate",
      "mateIn3",
      "middlegame",
      "sacrifice"
    ],
    "fen": "r2q3k/5P2/2n3Bp/3p2pP/pp1b2Q1/6B1/1PP5/6K1 w - - 0 40",
    "solution": [
      "g4d4",
      "c6d4",
      "g3e5",
      "d8f6",
      "e5f6"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00rwh",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1590,
    "sideToMove": "b",
    "tags": [
      "balestraMate",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "5k2/2p5/N1PpQp2/1p2p1b1/1P2P1p1/r5Pq/5P2/R2R2K1 b - - 0 37",
    "solution": [
      "a3g3",
      "f2g3",
      "g5e3"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00rx9",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1306,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "middlegame",
      "short"
    ],
    "fen": "3k2q1/pp3pN1/2b2b2/2pp2Q1/6n1/3P1N2/P1P2PPP/5K2 w - - 4 27",
    "solution": [
      "g7e6",
      "d8e7",
      "g5g8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00s16",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1168,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "opening",
      "short"
    ],
    "fen": "1rbqk2r/1p3ppp/p3pn2/8/1b1P4/2N2N1P/PP3PP1/R2QKB1R w KQk - 0 11",
    "solution": [
      "d1a4",
      "b7b5",
      "a4b4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00sHx",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1525,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "q5nr/1ppknQpp/3p4/1P2p3/4P3/B1PP1b2/B5PP/5K2 w - - 1 18",
    "solution": [
      "a2e6",
      "d7d8",
      "f7f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00sKo",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1615,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "attraction",
      "long",
      "middlegame",
      "pin",
      "sacrifice"
    ],
    "fen": "5rk1/R5bp/q2p4/3Ppn1p/4Q3/4B2P/5PP1/5RK1 b - - 0 24",
    "solution": [
      "a6f1",
      "g1f1",
      "f5g3",
      "f1e1",
      "g3e4"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00sO1",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Лёгкая",
    "rating": 901,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "discoveredAttack",
      "master",
      "middlegame",
      "short"
    ],
    "fen": "3r4/ppk2pp1/2p1p3/4b3/P3n1P1/8/KPP2PN1/3rBR1R w - - 3 32",
    "solution": [
      "e1a5",
      "b7b6",
      "f1d1"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00sd6",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1101,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "operaMate",
      "short"
    ],
    "fen": "r2brk1n/pp3pp1/1q1pb3/1Bp1p1P1/4P3/P1PPBN2/5P2/1R2K2R w K - 0 27",
    "solution": [
      "h1h8",
      "f8e7",
      "h8e8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00sw5",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1172,
    "sideToMove": "b",
    "tags": [
      "kingsideAttack",
      "master",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "3r2k1/1p3pp1/pq1b3p/3P4/P7/3Q1N2/1r3PPP/1R1R2K1 b - - 1 23",
    "solution": [
      "b6f2",
      "g1h1",
      "f2g2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00tB9",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1244,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "middlegame",
      "pin",
      "queensideAttack",
      "short"
    ],
    "fen": "1k1r3r/1Bq1b1p1/p2p4/2n1p1P1/4P3/4BP2/1PPQN3/2KR3R b - - 0 24",
    "solution": [
      "c5b3",
      "c1b1",
      "b3d2"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00tTz",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1266,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "master",
      "pin",
      "short"
    ],
    "fen": "8/p6p/3b2pk/5p1n/2B4q/1P3P2/P5QP/3R3K b - - 11 35",
    "solution": [
      "h5g3",
      "g2g3",
      "d6g3"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00tgU",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1679,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r4rk1/pbpp2p1/1p4Qp/3Nn3/3q1N2/3B4/PP3PPP/5RK1 w - - 6 21",
    "solution": [
      "d5e7",
      "g8h8",
      "g6h7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00tsE",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1092,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "3q1k2/5ppp/p7/1p6/5Q2/2r5/P1P2PPP/4RK2 w - - 0 23",
    "solution": [
      "f4b4",
      "f8g8",
      "b4c3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00u0R",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1401,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "deflection",
      "exposedKing",
      "hangingPiece",
      "long",
      "middlegame"
    ],
    "fen": "3r2k1/1p2R3/7p/P4rpB/8/2n3P1/1q4PP/3R2K1 w - - 2 33",
    "solution": [
      "d1d8",
      "f5f8",
      "h5f7",
      "g8h8",
      "d8f8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00uDH",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Средняя",
    "rating": 1279,
    "sideToMove": "b",
    "tags": [
      "advancedPawn",
      "crushing",
      "endgame",
      "sacrifice",
      "short"
    ],
    "fen": "2r5/3k1p2/5Pp1/PPBpP1P1/1K5P/5p2/8/8 b - - 2 45",
    "solution": [
      "c8c5",
      "b4c5",
      "f3f2"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-00uKb",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1548,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "deflection",
      "endgame",
      "short"
    ],
    "fen": "6k1/p4rp1/8/2p1Bq1p/2P1b3/2P3QP/P5PK/4R3 b - - 1 30",
    "solution": [
      "h5h4",
      "g3h4",
      "f5e5"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00ueM",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1725,
    "sideToMove": "w",
    "tags": [
      "advancedPawn",
      "endgame",
      "long",
      "mate",
      "mateIn3",
      "promotion"
    ],
    "fen": "2kr4/2pR4/2P1K1P1/8/8/4n3/p7/8 w - - 0 50",
    "solution": [
      "d7d8",
      "c8d8",
      "g6g7",
      "a2a1q",
      "g7g8q"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00umX",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1651,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "2k3rr/ppp2p2/3B1p2/2pP1q1p/2P5/2N2B1b/PP1Q1PP1/R3R1K1 b - - 0 19",
    "solution": [
      "f5f3",
      "e1e8",
      "c8d7"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00unD",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1522,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "2kr1bnr/2p2p1p/1p1q2pP/p3N3/P2P4/4B3/1PP2Pb1/RN1QK2R w KQ - 0 17",
    "solution": [
      "d1g4",
      "f7f5",
      "g4g2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00vjg",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1060,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "attraction",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "2r3k1/5ppp/p3nb2/3q4/1Q6/P3B2P/2R2PP1/2R3K1 b - - 4 30",
    "solution": [
      "c8c2",
      "c1c2",
      "d5d1",
      "g1h2",
      "d1c2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00vl5",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1066,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "operaMate",
      "sacrifice",
      "short"
    ],
    "fen": "5r2/p1k2qpp/2n5/2N1p3/2b5/1PP1B3/P2Q2PP/4R1K1 b - - 0 24",
    "solution": [
      "f7f1",
      "e1f1",
      "f8f1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00voi",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1614,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "1r6/5p1R/7R/4pPk1/2r2n2/1P3P1P/P4K2/8 w - - 0 44",
    "solution": [
      "h3h4",
      "g5f5",
      "h7f7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00wL8",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Лёгкая",
    "rating": 858,
    "sideToMove": "w",
    "tags": [
      "advancedPawn",
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2",
      "promotion",
      "queenRookEndgame",
      "short"
    ],
    "fen": "r5k1/2PR1ppp/8/8/7P/8/P3pqPK/8 w - - 0 34",
    "solution": [
      "d7d8",
      "a8d8",
      "c7d8q"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-00wPZ",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1413,
    "sideToMove": "b",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "opening",
      "sacrifice",
      "short",
      "smotheredMate"
    ],
    "fen": "r1b2rk1/ppp2ppp/8/1B1p4/3bn3/5N2/PPP2qPP/RNBQR2K b - - 1 12",
    "solution": [
      "f2g1",
      "f3g1",
      "e4f2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00wUm",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1577,
    "sideToMove": "w",
    "tags": [
      "long",
      "mate",
      "mateIn3",
      "middlegame",
      "sacrifice"
    ],
    "fen": "5rk1/pR1Q1ppp/4N3/3p1n2/8/7P/q4rP1/4R1K1 w - - 0 29",
    "solution": [
      "d7f7",
      "f8f7",
      "b7b8",
      "f7f8",
      "b8f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00wft",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1549,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "3r2k1/pp3pp1/7p/b3N3/2b3Q1/P2qP2P/3N1PP1/3RK2R b K - 1 30",
    "solution": [
      "a5d2",
      "d1d2",
      "d3d2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00x3K",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1126,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "r2qk2r/ppp2pp1/2npb2p/3np3/2B1P3/P2P1N1P/1PPQ1PP1/R3K2R w KQkq - 0 11",
    "solution": [
      "e4d5",
      "e6d5",
      "c4d5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00xGN",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Лёгкая",
    "rating": 974,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "discoveredAttack",
      "kingsideAttack",
      "opening",
      "short"
    ],
    "fen": "r2q1rk1/ppp1nppp/3b4/1B6/3QP3/2N2P2/PPP2P1P/R1B2RK1 b - - 0 10",
    "solution": [
      "d6h2",
      "g1h2",
      "d8d4"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-00xIC",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1379,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "3rr1k1/1R3ppp/8/2p5/q1Qp1B2/6P1/P1R2P1P/6K1 b - - 4 28",
    "solution": [
      "e8e1",
      "g1g2",
      "a4c6",
      "f2f3",
      "c6b7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00xMv",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Сложная",
    "rating": 1732,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "kingsideAttack",
      "long",
      "middlegame",
      "sacrifice"
    ],
    "fen": "r3brk1/1pqnb2p/p3ppp1/2ppN2Q/5P2/1P1PP1R1/PBPN2PP/R5K1 w - - 0 16",
    "solution": [
      "e5g6",
      "e8g6",
      "g3g6",
      "h7g6",
      "h5g6"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-00xWV",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1593,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "master",
      "short"
    ],
    "fen": "6k1/4b3/p4pPq/1p2p2P/2p3Q1/P7/1PP5/1K6 w - - 1 39",
    "solution": [
      "g4e6",
      "g8h8",
      "e6e7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00xa4",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Лёгкая",
    "rating": 991,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "hangingPiece",
      "long"
    ],
    "fen": "2r1k3/2p1rpp1/1p1p1b1B/p2P1P1P/P1P5/3K4/5PR1/6R1 b - - 0 30",
    "solution": [
      "g7h6",
      "g2g8",
      "e8d7",
      "g8c8",
      "d7c8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00xgR",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1124,
    "sideToMove": "b",
    "tags": [
      "deflection",
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "4Q3/2B3k1/4p2p/2P3p1/3P4/4p3/6PP/4qNK1 b - - 1 34",
    "solution": [
      "e1f2",
      "g1h1",
      "f2f1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00xmm",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 999,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "long",
      "middlegame",
      "pin"
    ],
    "fen": "r6r/ppk3pp/2pb4/4P3/8/6PQ/PP3PKP/R1Bq4 w - - 0 25",
    "solution": [
      "e5d6",
      "d1d6",
      "c1f4",
      "d6f4",
      "g3f4"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00xsd",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1209,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "opening",
      "short"
    ],
    "fen": "r1bqkb1r/1p1npp1p/p2p1np1/6B1/2PN4/3BP3/PP3PPP/RN1QK2R b KQkq - 0 8",
    "solution": [
      "d8a5",
      "b1c3",
      "a5g5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00yHW",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1088,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "rookEndgame",
      "short"
    ],
    "fen": "8/6r1/pR6/6pk/8/6PP/6K1/8 w - - 0 41",
    "solution": [
      "g3g4",
      "h5h4",
      "b6h6"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00yIS",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1095,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "deflection",
      "discoveredAttack",
      "endgame",
      "master",
      "short"
    ],
    "fen": "7k/p5p1/5q1p/8/P1b5/3rQ1RP/6BK/8 w - - 7 43",
    "solution": [
      "e3e8",
      "c4g8",
      "g3d3"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00yLn",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1303,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "equality",
      "fork",
      "short"
    ],
    "fen": "2k5/pp3b2/2p1N1p1/2P2p2/3K4/P4r2/8/R7 w - - 2 32",
    "solution": [
      "e6g5",
      "f7d5",
      "g5f3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-00yP0",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1405,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "long",
      "pin"
    ],
    "fen": "2r1r1k1/2q4p/4pp1Q/p2p3R/3P4/2P4P/P4PP1/6K1 w - - 1 28",
    "solution": [
      "h6f6",
      "c7g7",
      "h5g5",
      "g7g5",
      "f6g5"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-00yPS",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1076,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "long",
      "queenEndgame"
    ],
    "fen": "5k2/p3pp2/7p/2Qp1P2/6q1/8/2K5/8 w - - 0 44",
    "solution": [
      "c5c8",
      "f8g7",
      "f5f6",
      "g7f6",
      "c8g4"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00yTd",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 894,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "6k1/5p2/2p3q1/3p2Q1/p1nB4/5P1P/6PK/8 w - - 6 51",
    "solution": [
      "g5d8",
      "g8h7",
      "d8h8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00ybx",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Лёгкая",
    "rating": 966,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "deflection",
      "endgame",
      "master",
      "short"
    ],
    "fen": "6k1/p7/2p1r1bp/3p2p1/8/1PP3BP/P4P2/4RK2 b - - 1 35",
    "solution": [
      "g6d3",
      "f1g2",
      "e6e1"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-00yfJ",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Сложная",
    "rating": 1642,
    "sideToMove": "w",
    "tags": [
      "clearance",
      "crushing",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "r1b1k2r/p4p1p/2p1p3/1pRnPp2/q2P4/2Q2N1P/5PP1/1B3RK1 w kq - 1 20",
    "solution": [
      "c5d5",
      "c6d5",
      "c3c6"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-00zNz",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1139,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "opening",
      "short"
    ],
    "fen": "r1bqk2r/pp1np1bp/2p5/3pNp2/3P1B2/4P3/PPP2PPP/R2QK2R w KQkq - 0 11",
    "solution": [
      "d1h5",
      "e8f8",
      "h5f7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00zQz",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1283,
    "sideToMove": "b",
    "tags": [
      "deflection",
      "mate",
      "mateIn2",
      "middlegame",
      "pillsburysMate",
      "short"
    ],
    "fen": "4rrk1/pB4pp/2N2p2/2p5/6b1/1PN3P1/P1P2P1P/4RK2 b - - 0 21",
    "solution": [
      "g4h3",
      "f1g1",
      "e8e1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-00zeF",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1775,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "queensideAttack",
      "short"
    ],
    "fen": "1k3b1r/1p4pp/pN2p3/8/4n1Pq/3r3P/PQ3P2/2R1K2R w K - 2 21",
    "solution": [
      "c1c8",
      "b8a7",
      "c8a8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-0100g",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 873,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "rookEndgame",
      "short",
      "skewer"
    ],
    "fen": "8/8/5k2/R2K4/2P4r/8/P7/8 b - - 2 43",
    "solution": [
      "h4h5",
      "d5d6",
      "h5a5"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-0109V",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 822,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r5k1/pp3ppp/2pq4/3b4/3P2n1/2PQ4/PPB2PPP/4R1K1 w - - 0 23",
    "solution": [
      "d3h7",
      "g8f8",
      "h7h8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-010MJ",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1677,
    "sideToMove": "w",
    "tags": [
      "attraction",
      "endgame",
      "mate",
      "mateIn4",
      "sacrifice",
      "veryLong"
    ],
    "fen": "3r2k1/pR3pp1/8/5p1p/5q2/5n2/PP4R1/6QK w - - 0 30",
    "solution": [
      "g2g7",
      "g8h8",
      "g7h7",
      "h8h7",
      "b7f7",
      "h7h8",
      "g1g7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-0112g",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1060,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "rookEndgame",
      "short",
      "skewer"
    ],
    "fen": "7R/8/8/8/r2k4/4p3/8/4K3 w - - 2 58",
    "solution": [
      "h8h4",
      "d4c3",
      "h4a4"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-0115S",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 960,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r4r1k/1p4pp/1p6/2pQ4/4n1PP/PP4p1/1BP1P1K1/1R4R1 b - - 0 23",
    "solution": [
      "f8f2",
      "g2h3",
      "f2h2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01194",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 848,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "5qk1/p1pb2p1/5p2/r2N1P1p/2PQ4/2n5/P5PP/R4RK1 b - - 0 25",
    "solution": [
      "c3e2",
      "g1h1",
      "e2d4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-011J1",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1243,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "discoveredAttack",
      "endgame",
      "short"
    ],
    "fen": "4R3/5ppk/7p/2p2q2/1B6/3r2P1/5P1P/1Q4K1 b - - 0 35",
    "solution": [
      "d3g3",
      "f2g3",
      "f5b1"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-011JG",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1593,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "middlegame",
      "pin",
      "queensideAttack",
      "short"
    ],
    "fen": "r1r3k1/4pp1p/3p2p1/8/q2RPP2/1N6/1PP2QPP/1K3R2 b - - 0 26",
    "solution": [
      "a4a2",
      "b1c1",
      "a2b3"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-011ON",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 793,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "2k5/1n3ppp/p7/3P4/4n3/8/P3KPPP/1R6 b - - 1 30",
    "solution": [
      "e4c3",
      "e2d3",
      "c3b1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-011RD",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1682,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "exposedKing",
      "fork",
      "long",
      "master",
      "middlegame"
    ],
    "fen": "7r/2p2k2/1p6/p3R2r/P2Q1pb1/2P5/q1PK1PP1/6R1 w - - 1 39",
    "solution": [
      "d4f4",
      "g4f5",
      "e5f5",
      "h5f5",
      "f4f5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-011o8",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1532,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "deflection",
      "master",
      "middlegame",
      "short"
    ],
    "fen": "2r5/1p5k/p2q2pb/3p1bQn/3B4/P1NP1N1P/1P6/K3R3 w - - 1 34",
    "solution": [
      "e1e7",
      "h7g8",
      "g5h6"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-0122y",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1079,
    "sideToMove": "b",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r3r1k1/ppp2ppp/1b1p4/6q1/1PN1Pn2/P4P1b/1BP1BP1P/R2Q2RK b - - 8 17",
    "solution": [
      "h3g2",
      "g1g2",
      "g5g2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-0123H",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1332,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short",
      "smotheredMate"
    ],
    "fen": "3r1r1k/5Qpp/2p3n1/p3p1N1/P2q4/3P4/B1P2P2/R4K2 w - - 0 26",
    "solution": [
      "f7g8",
      "f8g8",
      "g5f7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01243",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1516,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "deflection",
      "endgame",
      "fork",
      "master",
      "short",
      "skewer"
    ],
    "fen": "r7/pp1Qp1B1/3b4/3k4/4q3/8/PP3PP1/5K2 w - - 5 35",
    "solution": [
      "d7b7",
      "d5e6",
      "b7e4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01273",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1777,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "defensiveMove",
      "endgame",
      "master",
      "pin",
      "short"
    ],
    "fen": "8/p1B4p/1p3pk1/6p1/3PQ1P1/2P1nP1K/P3q2P/8 b - - 10 36",
    "solution": [
      "g6h6",
      "e4e3",
      "e2e3"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-0128O",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1763,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "attraction",
      "fork",
      "long",
      "middlegame",
      "sacrifice"
    ],
    "fen": "r4rk1/1q1p2pp/p3p3/2p1Q3/8/1B6/PPP2PbP/3RR1K1 w - - 0 22",
    "solution": [
      "d1d7",
      "b7d7",
      "b3e6",
      "g8h8",
      "e6d7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-012K5",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1197,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "queenEndgame",
      "short"
    ],
    "fen": "8/3Q2pp/6k1/3K4/6P1/8/7P/q7 w - - 10 47",
    "solution": [
      "d7f5",
      "g6h6",
      "f5h5"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-012ee",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1090,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "kingsideAttack",
      "long",
      "skewer"
    ],
    "fen": "rb4k1/2q3pp/P3pp2/3p4/1Q1P4/3NP3/2P2PPP/R5K1 b - - 3 26",
    "solution": [
      "c7h2",
      "g1f1",
      "h2h1",
      "f1e2",
      "h1a1"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-012tD",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Лёгкая",
    "rating": 835,
    "sideToMove": "b",
    "tags": [
      "advancedPawn",
      "backRankMate",
      "endgame",
      "mate",
      "mateIn2",
      "promotion",
      "queenRookEndgame",
      "short"
    ],
    "fen": "8/5ppk/7p/2pr4/4p3/4P3/1Qp2PPP/R5K1 b - - 2 36",
    "solution": [
      "d5d1",
      "a1d1",
      "c2d1q"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-0135c",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 808,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "short",
      "skewer"
    ],
    "fen": "8/3n1k2/p3p1p1/3p2P1/2pP2N1/PrP2P2/1P1K2R1/8 b - - 5 41",
    "solution": [
      "b3b2",
      "d2e1",
      "b2g2"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-013hi",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1205,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "fork",
      "long"
    ],
    "fen": "2k5/1pp2B2/p1np4/4pR2/PP2P1q1/1NPP2P1/5bK1/8 w - - 0 31",
    "solution": [
      "f7e6",
      "c8d8",
      "f5f8",
      "d8e7",
      "e6g4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-0147O",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1527,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "pin",
      "short"
    ],
    "fen": "2N3k1/1p5p/BP4p1/3n1p2/n3p3/6P1/5P1P/6K1 w - - 6 38",
    "solution": [
      "a6c4",
      "g8g7",
      "c4d5"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-014It",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Средняя",
    "rating": 1296,
    "sideToMove": "b",
    "tags": [
      "backRankMate",
      "long",
      "mate",
      "mateIn3",
      "middlegame",
      "sacrifice"
    ],
    "fen": "1k1rR3/p1p3pp/Pp3r2/3p4/Q2N4/8/1PPq1PPP/4R1K1 b - - 4 25",
    "solution": [
      "d2f2",
      "g1h1",
      "f2f1",
      "e1f1",
      "f6f1"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-014KA",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 824,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "r4rk1/5ppp/p3b3/1p2P3/3n1PP1/N3B2P/PP6/R3R1K1 b - - 1 19",
    "solution": [
      "d4f3",
      "g1f2",
      "f3e1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-014pk",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1076,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "2r4k/qpr2p2/2nBp1pP/p2pP3/3n1QN1/5N2/5P1P/1R3RK1 b - - 1 31",
    "solution": [
      "d4e2",
      "g1h1",
      "e2f4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-014vH",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1213,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "4k3/pp3p1Q/1q2pP2/3pN3/3P4/bP4N1/r1n3PP/5RK1 b - - 2 25",
    "solution": [
      "b6d4",
      "g1h1",
      "d4e5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-0156a",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1512,
    "sideToMove": "b",
    "tags": [
      "attraction",
      "kingsideAttack",
      "long",
      "mate",
      "mateIn3",
      "middlegame",
      "sacrifice"
    ],
    "fen": "2k4r/ppp1q1p1/3b2p1/3Q4/1P2NPn1/P1P5/6P1/R1B2RKN b - - 0 21",
    "solution": [
      "h8h1",
      "g1h1",
      "e7h4",
      "h1g1",
      "h4h2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-0158C",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1686,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "long"
    ],
    "fen": "3r3k/1Qp3p1/p4q1p/8/3N4/8/PPP2PPP/2K1R3 b - - 0 23",
    "solution": [
      "f6d4",
      "a2a3",
      "d4d2",
      "c1b1",
      "d2e1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-015Di",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1694,
    "sideToMove": "w",
    "tags": [
      "clearance",
      "mate",
      "mateIn2",
      "opening",
      "sacrifice",
      "short"
    ],
    "fen": "r2k1bnr/p1pp1Bpp/1p6/4N1q1/3p4/2P5/PP2QPbP/RN2K2R w KQ - 0 11",
    "solution": [
      "e5c6",
      "g2c6",
      "e2e8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-015RS",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 936,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "5r1k/7P/pp6/q1p5/3pPrR1/1P1B3Q/2P1K3/7R b - - 0 46",
    "solution": [
      "f4f2",
      "e2d1",
      "a5a1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-015fL",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1206,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "8/R7/p1p4P/1p6/1P6/2kP4/3N3r/2K5 b - - 1 50",
    "solution": [
      "h2h1",
      "d2f1",
      "h1f1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-015pp",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1632,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "long",
      "rookEndgame",
      "skewer"
    ],
    "fen": "8/8/8/3p4/5p1R/r3k3/6K1/8 w - - 0 52",
    "solution": [
      "h4h3",
      "e3e2",
      "h3a3",
      "d5d4",
      "a3a2"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-0162G",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 842,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "pin",
      "short"
    ],
    "fen": "2r1kb1r/1p3ppp/p7/3ppP2/8/1P1PBP2/P4RPP/2R3K1 b k - 2 21",
    "solution": [
      "c8c1",
      "e3c1",
      "f8c5"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-016Im",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 821,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "6k1/ppp5/1b6/3r1Npp/6p1/1P1p2P1/PB1Pn1KP/4R3 w - - 4 30",
    "solution": [
      "f5e7",
      "g8f7",
      "e7d5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-016Oz",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1063,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "k7/1p1q3r/pP1Qp3/3p1p1p/7P/5KP1/5P2/8 w - - 2 47",
    "solution": [
      "d6f8",
      "d7c8",
      "f8c8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-016rF",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1774,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "long",
      "mate",
      "mateIn3",
      "middlegame"
    ],
    "fen": "r5k1/pppb2p1/1bnp1q2/6N1/8/2NQ2B1/PP4PP/7K w - - 0 20",
    "solution": [
      "d3h7",
      "g8f8",
      "h7h8",
      "f8e7",
      "c3d5"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-016yu",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1760,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "hangingPiece",
      "master",
      "short"
    ],
    "fen": "4r1k1/p5pp/1p3n2/8/1q3B2/3Q1P2/PP3P1P/2R3K1 b - - 6 24",
    "solution": [
      "b4f4",
      "d3c4",
      "f4c4"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-017AB",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1165,
    "sideToMove": "b",
    "tags": [
      "advancedPawn",
      "crushing",
      "deflection",
      "endgame",
      "promotion",
      "rookEndgame",
      "short"
    ],
    "fen": "8/5k2/7p/1R3Kp1/4P3/5P1P/1pr5/8 b - - 3 51",
    "solution": [
      "c2c5",
      "b5c5",
      "b2b1q"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-017Bw",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1786,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "master",
      "middlegame",
      "short"
    ],
    "fen": "r3k2r/1p3ppp/p7/3npbB1/1n6/2N5/PP2PPPP/R2K1B1R w kq - 0 13",
    "solution": [
      "e2e4",
      "d5c3",
      "b2c3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-017Ut",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Лёгкая",
    "rating": 984,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "discoveredAttack",
      "middlegame",
      "short"
    ],
    "fen": "3r3r/pp3pp1/5k2/2Qbq3/3N4/5PP1/PPP1N2p/R3R2K b - - 0 22",
    "solution": [
      "d5f3",
      "d4f3",
      "e5c5"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-017Vq",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1593,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "long",
      "pin"
    ],
    "fen": "5q1k/pr4pp/2p4B/4Q3/7P/2P5/P1PK4/4R3 b - - 6 30",
    "solution": [
      "b7d7",
      "d2e2",
      "d7e7",
      "e5e7",
      "f8e7"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-017c1",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1103,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "rookEndgame",
      "short"
    ],
    "fen": "8/8/8/1p6/3k4/2p4P/rP2RK2/8 w - - 2 50",
    "solution": [
      "b2c3",
      "d4c3",
      "e2a2"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-017zX",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1439,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "long",
      "master"
    ],
    "fen": "6qk/1p4p1/B1n2rQp/3p4/8/2P2P2/P6P/6RK w - - 1 30",
    "solution": [
      "g6f6",
      "g7f6",
      "g1g8",
      "h8g8",
      "a6b7"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-0181c",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1307,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "rnb3k1/pp3pp1/2p2p1p/8/3P4/2Pr1N2/PP4PP/R3R1K1 w - - 0 16",
    "solution": [
      "e1e8",
      "g8h7",
      "e8c8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-018ZF",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1216,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "n1r3k1/7p/2bQ2p1/8/q2PP3/5P2/6PP/2R3K1 w - - 0 41",
    "solution": [
      "d6e6",
      "g8g7",
      "e6c8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-0191t",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1748,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "long"
    ],
    "fen": "6k1/1p3r2/p1p1p3/4Pqpp/3P4/1P2R1QP/P4PP1/6K1 b - - 1 33",
    "solution": [
      "h5h4",
      "g3f3",
      "f5b1",
      "g1h2",
      "f7f3"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-0192c",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Лёгкая",
    "rating": 909,
    "sideToMove": "w",
    "tags": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "2r3k1/1Q3ppp/2pB4/2Pp1b1n/3p3K/P4P2/6qP/R3R3 w - - 0 25",
    "solution": [
      "b7c8",
      "f5c8",
      "e1e8"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-0198M",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 948,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "6rk/p1N2R1p/1n1Q4/2p1p3/8/7P/PPP3PK/4q3 b - - 2 33",
    "solution": [
      "e1g3",
      "h2g1",
      "g3g2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-0199s",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Средняя",
    "rating": 1441,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "defensiveMove",
      "kingsideAttack",
      "long",
      "middlegame",
      "sacrifice"
    ],
    "fen": "r3qr1k/1p2b1p1/4p1Qp/2ppP3/p4P2/2P1P1P1/PP4P1/1K1R3R w - - 1 21",
    "solution": [
      "h1h6",
      "g7h6",
      "g6h6",
      "h8g8",
      "d1h1"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-019Oa",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1565,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "discoveredAttack",
      "endgame",
      "short"
    ],
    "fen": "3q4/5kpQ/p1p5/1p1n4/2p3P1/P6P/1PPB4/1K6 b - - 0 33",
    "solution": [
      "d5f6",
      "h7f5",
      "d8d2"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-019YE",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 970,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "1r5r/p1p1kppp/4p3/4P3/2B1n1K1/1P2P3/P4PPP/R2R4 b - - 0 20",
    "solution": [
      "e4f2",
      "g4f3",
      "f2d1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-019cy",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1399,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "5b1r/1Q3p2/p3pk1p/1p1p2p1/3q4/1P3PPP/P3K1P1/2R2B1R b - - 1 22",
    "solution": [
      "d4b2",
      "e2d3",
      "b2c1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01A3W",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1010,
    "sideToMove": "w",
    "tags": [
      "attraction",
      "crushing",
      "endgame",
      "exposedKing",
      "long",
      "rookEndgame",
      "skewer"
    ],
    "fen": "4r3/pp5p/4k3/2p1r3/3p4/PP1P4/3KR2P/5R2 w - - 2 32",
    "solution": [
      "e2e5",
      "e6e5",
      "f1e1",
      "e5d6",
      "e1e8"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-01Ag5",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Лёгкая",
    "rating": 971,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "master",
      "middlegame",
      "short"
    ],
    "fen": "2k2r1r/p2n3p/1pqbQ3/8/3P4/2P2N2/P2B1PPP/R4RK1 b - - 0 19",
    "solution": [
      "d6h2",
      "f3h2",
      "c6e6"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-01Amq",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1626,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "hangingPiece",
      "long"
    ],
    "fen": "4r1k1/4Pp2/pQ3b1p/6pP/q1p5/P4P2/5BPK/8 w - - 3 32",
    "solution": [
      "b6f6",
      "c4c3",
      "f2d4",
      "a4d4",
      "f6d4"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-01B6x",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1163,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "long"
    ],
    "fen": "6k1/1B2ppbp/p2p2p1/3P4/1P2P3/P3B1P1/4qP1P/1Q1b2K1 b - - 0 28",
    "solution": [
      "e2e1",
      "g1g2",
      "d1f3",
      "g2f3",
      "e1b1"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-01BDV",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 979,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "4r3/2p2p1k/3p3p/3PqP2/1p5P/1P1R4/K1P3Q1/6R1 b - - 0 29",
    "solution": [
      "e8a8",
      "a2b1",
      "e5a1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01BDz",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1032,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "exposedKing",
      "fork",
      "long"
    ],
    "fen": "6k1/ppr5/6p1/5pN1/b7/7P/3R2P1/7K w - - 2 38",
    "solution": [
      "d2d8",
      "g8g7",
      "g5e6",
      "g7f6",
      "e6c7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01BRf",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1066,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "8/p7/1p3Nnp/1B4p1/1P3bP1/P3p2P/2k1K3/8 w - - 2 43",
    "solution": [
      "b5d3",
      "c2b3",
      "d3g6"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01BWS",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Сложная",
    "rating": 1597,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "quietMove",
      "veryLong"
    ],
    "fen": "5k2/p7/6RN/6K1/1p6/8/P7/5q2 w - - 13 55",
    "solution": [
      "g6f6",
      "f1f6",
      "g5f6",
      "a7a5",
      "h6f5",
      "b4b3",
      "a2b3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01Bcd",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1211,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "4r1r1/pp1knp1p/5p2/2pN3q/2P3bN/1P4P1/P2P1P1P/R3Q1K1 w - - 0 19",
    "solution": [
      "d5f6",
      "d7d8",
      "f6h5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01BeL",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1561,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3",
      "sacrifice"
    ],
    "fen": "8/6QR/pr5p/6p1/5p1k/q6P/2P2PPK/8 b - - 7 39",
    "solution": [
      "a3g3",
      "f2g3",
      "f4g3",
      "h2g1",
      "b6b1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01Btz",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1522,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "defensiveMove",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "2r1k2r/1p2bppp/1q1p4/p2Pp1P1/P4n1P/1N3P2/1PPQ4/2KR1B1R b k - 0 17",
    "solution": [
      "b6b3",
      "f1b5",
      "e8f8"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-01CAb",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1465,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short",
      "swallowstailMate"
    ],
    "fen": "8/p2Q1p2/1p3p1p/2b5/5k2/8/PPBr1q1P/R6K w - - 0 32",
    "solution": [
      "d7f5",
      "f4e3",
      "f5e4"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01CKc",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1379,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "middlegame",
      "short"
    ],
    "fen": "2r2rk1/1b3ppp/p2pp3/bp1n4/3PQ1Nq/PP1B4/1BP2PPP/R4RK1 w - - 4 18",
    "solution": [
      "g4f6",
      "d5f6",
      "e4h4"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-01CQ7",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1498,
    "sideToMove": "b",
    "tags": [
      "attraction",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "1n3r1k/p5pp/8/7Q/4P3/2NPB3/PPP3qP/R2KRr2 b - - 4 21",
    "solution": [
      "f1e1",
      "d1e1",
      "f8f1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01Cq8",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1173,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "long",
      "master"
    ],
    "fen": "r2r1k2/5p1p/p4p2/1pP1p3/4b3/PN2P3/1P3PPP/2RR2K1 b - - 1 20",
    "solution": [
      "d8d1",
      "c1d1",
      "e4c2",
      "d1d6",
      "c2b3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01Cqi",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1499,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "middlegame",
      "pin",
      "short"
    ],
    "fen": "r3q1r1/1ppn3k/p2p1N1b/3Pp1Bp/1PP4P/5P1Q/P7/2K2RR1 b - - 10 27",
    "solution": [
      "d7f6",
      "g5h6",
      "h7h6"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-01DJq",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 986,
    "sideToMove": "b",
    "tags": [
      "attraction",
      "crushing",
      "endgame",
      "fork",
      "long"
    ],
    "fen": "8/6p1/5bk1/N6p/8/1P6/6PP/3rRK2 b - - 2 45",
    "solution": [
      "d1e1",
      "f1e1",
      "f6c3",
      "e1d1",
      "c3a5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01DXj",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 819,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "master",
      "short",
      "skewer"
    ],
    "fen": "8/pR6/8/P7/2P2rk1/1P1K4/8/6b1 w - - 1 40",
    "solution": [
      "b7g7",
      "g4f5",
      "g7g1"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-01Dcf",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1257,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "deflection",
      "endgame",
      "short"
    ],
    "fen": "1k4r1/3p1p2/1Bn4p/5q2/5P2/1Q4P1/P7/1R4K1 b - - 3 29",
    "solution": [
      "g8g3",
      "b3g3",
      "f5b1"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-01DhL",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1399,
    "sideToMove": "w",
    "tags": [
      "killBoxMate",
      "long",
      "mate",
      "mateIn3",
      "middlegame"
    ],
    "fen": "1r4k1/2q3p1/p3R2p/b2p4/2pP3N/6P1/1rQ1RPP1/6K1 w - - 0 32",
    "solution": [
      "e6e8",
      "b8e8",
      "e2e8",
      "g8f7",
      "c2g6"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01Dq7",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1055,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3",
      "queensideAttack"
    ],
    "fen": "2k5/ppp4q/4p1r1/4P3/3P4/1PP2RPp/P3Q1nP/5K2 w - - 3 31",
    "solution": [
      "f3f8",
      "c8d7",
      "e2b5",
      "c7c6",
      "b5b7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01Dsa",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1035,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "operaMate",
      "short"
    ],
    "fen": "8/7Q/2kp4/4p2P/5r2/3P2K1/6P1/6b1 b - - 0 46",
    "solution": [
      "g1f2",
      "g3h3",
      "f4h4"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01Dt6",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1398,
    "sideToMove": "w",
    "tags": [
      "advancedPawn",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "promotion",
      "short"
    ],
    "fen": "3r2k1/1bqPn1pp/p3p3/1pp2pPQ/8/8/PPP4P/1K1R1R2 w - - 0 29",
    "solution": [
      "h5e8",
      "d8e8",
      "d7e8q"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01Dtr",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 765,
    "sideToMove": "b",
    "tags": [
      "long",
      "mate",
      "mateIn3",
      "middlegame"
    ],
    "fen": "b4rk1/2pR2p1/1p4q1/6N1/7Q/4B3/1P3PPP/6K1 b - - 0 27",
    "solution": [
      "g6b1",
      "e3c1",
      "b1c1",
      "d7d1",
      "c1d1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01EEp",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1400,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "5r1k/2p3p1/7p/p4N2/Pb1B4/3n1b2/1PP4P/R5K1 w - - 0 24",
    "solution": [
      "d4g7",
      "h8h7",
      "g7f8",
      "b4f8",
      "c2d3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01EMd",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1329,
    "sideToMove": "w",
    "tags": [
      "attraction",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "pillsburysMate",
      "sacrifice",
      "short"
    ],
    "fen": "r6k/3nq1pp/3pBp2/2p1nP2/1p2R2Q/1P5P/r5P1/2B1R1K1 w - - 7 32",
    "solution": [
      "h4h7",
      "h8h7",
      "e4h4"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01EUl",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1348,
    "sideToMove": "b",
    "tags": [
      "clearance",
      "mate",
      "mateIn2",
      "opening",
      "short"
    ],
    "fen": "r2qk2r/ppp2pp1/2p2n2/7p/3bP1b1/2N3QP/PPP2PP1/R1B1KB1R b KQkq - 0 9",
    "solution": [
      "d4c3",
      "g3c3",
      "d8d1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01EuL",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 953,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "3Q4/5p2/5Pk1/4K2p/P2P4/2q1p3/5r2/8 w - - 1 53",
    "solution": [
      "d8g8",
      "g6h6",
      "g8g7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01F1N",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1185,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "r4rk1/pp1q2pp/3p1p2/2p2P2/5Q2/2Pn3P/PP1N1PP1/4RRK1 w - - 4 18",
    "solution": [
      "f4c4",
      "d6d5",
      "c4d3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01FB6",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1307,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "deflection",
      "endgame",
      "long"
    ],
    "fen": "4Qn1k/6p1/7p/8/1b1P2N1/2q1B2P/6P1/6K1 b - - 1 31",
    "solution": [
      "c3e1",
      "g1h2",
      "b4d6",
      "g4e5",
      "e1e3"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-01FCo",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 996,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "1k2r2r/1Pp2p2/1n1p1b1p/3Pq1p1/1Q1NP3/2P2P2/P4R1P/R3K3 w Q - 1 23",
    "solution": [
      "d4c6",
      "b8b7",
      "c6e5"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01FU2",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1240,
    "sideToMove": "w",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "rnb3k1/pp3p1p/3p2pQ/3Nr3/2P5/3BPN2/Pq1b2PP/3K3n w - - 0 17",
    "solution": [
      "d5f6",
      "g8h8",
      "h6h7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01FXr",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1291,
    "sideToMove": "b",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "7r/1P2bk2/p3p1p1/2Np1p2/Q2P4/4P3/4BKPq/R7 b - - 0 28",
    "solution": [
      "e7h4",
      "f2f3",
      "h2g3"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01FzV",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 947,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "8/8/6k1/5p2/7P/3K1n2/2R5/8 b - - 0 49",
    "solution": [
      "f3e1",
      "d3c4",
      "e1c2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01GBu",
    "title": "Мотив последней горизонтали",
    "description": "Король соперника ограничен, поэтому нужно проверить слабость последней горизонтали.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Последняя горизонталь",
    "difficulty": "Средняя",
    "rating": 1273,
    "sideToMove": "b",
    "tags": [
      "backRankMate",
      "mate",
      "mateIn2",
      "middlegame",
      "short",
      "xRayAttack"
    ],
    "fen": "5r1k/3p2bp/p4pp1/qp1Pr3/8/1Q4B1/PP2RPPP/4R1K1 b - - 0 23",
    "solution": [
      "a5e1",
      "e2e1",
      "e5e1"
    ],
    "hint": "Проверь, ограничен ли король своими фигурами и пешками.",
    "successText": "Мотив последней горизонтали найден."
  },
  {
    "id": "lichess-01GQI",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1038,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "8/5p2/1kbB2p1/4Pp1p/p2n1P2/1pR3P1/1K5P/8 w - - 0 59",
    "solution": [
      "d6c5",
      "b6c7",
      "c5d4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01GT7",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1171,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "fork",
      "middlegame",
      "short"
    ],
    "fen": "2r5/p2q1k1p/1p2p1p1/3b4/8/Q1n1PN2/5PPP/3R2K1 w - - 8 28",
    "solution": [
      "f3e5",
      "f7e8",
      "e5d7"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01GXf",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1126,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "r3k2r/pR3ppp/4pb2/3N4/8/8/P4PPP/4R1K1 w kq - 1 21",
    "solution": [
      "d5c7",
      "e8f8",
      "c7a8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01Gjl",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1728,
    "sideToMove": "w",
    "tags": [
      "exposedKing",
      "long",
      "mate",
      "mateIn3",
      "middlegame",
      "operaMate"
    ],
    "fen": "rn3k1N/p1pn3p/8/3b2B1/3p4/N7/PP4PP/4R1K1 w - - 4 22",
    "solution": [
      "g5h6",
      "f8g8",
      "e1e8",
      "d7f8",
      "e8f8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01Gqt",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1291,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "pin",
      "short"
    ],
    "fen": "4Q3/6bk/6pp/pp6/8/P2qBP1P/1P6/K1R5 b - - 0 37",
    "solution": [
      "d3a3",
      "a1b1",
      "a3b2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01GwB",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1200,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "attraction",
      "endgame",
      "fork",
      "veryLong"
    ],
    "fen": "3b1r2/1r1P2pk/7p/4R3/P6P/4RpP1/5P2/6K1 w - - 4 45",
    "solution": [
      "e5e8",
      "f8g8",
      "e8g8",
      "h7g8",
      "e3e8",
      "g8f7",
      "e8d8"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01H66",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Сложная",
    "rating": 1654,
    "sideToMove": "b",
    "tags": [
      "advancedPawn",
      "crushing",
      "endgame",
      "pin",
      "promotion",
      "veryLong"
    ],
    "fen": "4r3/6K1/8/4R1P1/1PpP4/P1P3k1/8/4b3 b - - 6 52",
    "solution": [
      "e8e5",
      "d4e5",
      "e1c3",
      "g7g6",
      "c3e5",
      "g6f5",
      "c4c3",
      "f5e5",
      "c3c2",
      "g5g6",
      "c2c1q"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-01Hgu",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1024,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "fork",
      "mate",
      "mateIn2",
      "pillsburysMate",
      "short"
    ],
    "fen": "2k5/p1p5/r6B/3b4/8/3P4/PPP2P1P/R4RK1 b - - 0 31",
    "solution": [
      "a6g6",
      "h6g5",
      "g6g5"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01I9O",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1302,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "discoveredAttack",
      "long",
      "middlegame"
    ],
    "fen": "r5k1/1pp2r2/p3n2q/3pP2p/2P2R1P/8/PP1Q2P1/5RK1 w - - 1 23",
    "solution": [
      "f4g4",
      "h5g4",
      "d2h6",
      "f7f1",
      "g1f1"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-01IFU",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 973,
    "sideToMove": "b",
    "tags": [
      "kingsideAttack",
      "mate",
      "mateIn2",
      "opening",
      "sacrifice",
      "short"
    ],
    "fen": "r1b2rk1/pp3pp1/3b3p/3Bn3/P4q2/2P4P/1P2NPP1/RN1Q1RK1 b - - 2 17",
    "solution": [
      "e5f3",
      "g2f3",
      "f4h2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01IFr",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 981,
    "sideToMove": "w",
    "tags": [
      "cornerMate",
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "6k1/pp6/1bpN3p/4P1p1/7q/3Q3P/PP4P1/7K w - - 0 29",
    "solution": [
      "d3g6",
      "g8h8",
      "d6f7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01IW8",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1778,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r5r1/pb2kp1Q/2p5/q1b1N2P/1p2P3/8/P1P1N3/1K1n4 w - - 0 25",
    "solution": [
      "h7f7",
      "e7d6",
      "e5c4"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01Ie5",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 886,
    "sideToMove": "w",
    "tags": [
      "deflection",
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "8/3R3p/6pk/5p2/5PP1/7P/rr1B1K2/8 w - - 1 47",
    "solution": [
      "g4g5",
      "h6h5",
      "d7h7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01IvQ",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1166,
    "sideToMove": "w",
    "tags": [
      "arabianMate",
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "8/2rN1p1k/2P4p/pB6/1b4RP/5K2/8/4r3 w - - 5 45",
    "solution": [
      "d7f6",
      "h7h8",
      "g4g8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01J3q",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1212,
    "sideToMove": "w",
    "tags": [
      "fork",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r3r1k1/ppq1pp2/2p3nb/2Pp3p/3Pn2N/1P2P2P/PB3QP1/R4RK1 w - - 0 24",
    "solution": [
      "f2f7",
      "g8h8",
      "h4g6"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01JzG",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Средняя",
    "rating": 1410,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "endgame",
      "short"
    ],
    "fen": "8/2k5/8/1r2p1R1/6p1/3K4/1p4PP/1N6 b - - 1 41",
    "solution": [
      "e5e4",
      "d3c2",
      "b5g5"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-01K7q",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 863,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "6rk/2r5/1Q6/4q2p/p3P2P/4RR2/1P3PP1/6K1 b - - 4 34",
    "solution": [
      "c7c1",
      "e3e1",
      "c1e1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01KFo",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1353,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "discoveredAttack",
      "discoveredCheck",
      "fork",
      "long",
      "middlegame"
    ],
    "fen": "5rk1/ppq2ppp/3bp3/3p1nPP/3P4/2P1B3/PP2Q1P1/R4RK1 b - - 0 19",
    "solution": [
      "d6h2",
      "g1h1",
      "f5g3",
      "h1h2",
      "g3e2"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01KQY",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 814,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "rookEndgame",
      "short"
    ],
    "fen": "5k2/1R3p1p/6pP/P2p4/1p6/1P2RPP1/2rr4/1K6 w - - 3 40",
    "solution": [
      "b7b8",
      "c2c8",
      "b8c8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01Kjm",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1157,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "master",
      "skewer",
      "veryLong"
    ],
    "fen": "8/KP2r1pk/5p2/7p/4Q2P/8/8/8 b - - 0 72",
    "solution": [
      "e7e4",
      "b7b8q",
      "e4a4",
      "a7b7",
      "a4b4",
      "b7c8",
      "b4b8"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-01KyF",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1078,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "5rk1/6bp/1pQ1p1p1/1Pp5/2P4q/4N2P/5PP1/1R4K1 b - - 1 32",
    "solution": [
      "h4f2",
      "g1h1",
      "f2e3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01Kz0",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1156,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3",
      "sacrifice"
    ],
    "fen": "4rr2/1Q4pk/R1p2q1p/8/8/1P1P4/2P2PPP/5RK1 b - - 4 29",
    "solution": [
      "f6f2",
      "f1f2",
      "e8e1",
      "f2f1",
      "e1f1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01LA9",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1456,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "2r3k1/p7/4q1pQ/1p1nP3/3P4/8/5PP1/6KR w - - 0 33",
    "solution": [
      "h6h8",
      "g8f7",
      "h1h7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01LGS",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 943,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "fork",
      "short"
    ],
    "fen": "2R5/p5pk/2p1r1q1/4p1pn/1P2Q3/P4P1P/6P1/2R4K b - - 8 37",
    "solution": [
      "h5g3",
      "h1h2",
      "g3e4"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01LGs",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1253,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "5r2/ppp2q1k/3p2p1/2bP4/4rPP1/1RBQ4/P6P/7K w - - 0 33",
    "solution": [
      "d3h3",
      "h7g8",
      "h3h8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01LO7",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1114,
    "sideToMove": "w",
    "tags": [
      "fork",
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "r3rbk1/1pqb1p1p/4p1nQ/p2p3N/3p4/P2B1P2/1PP2P1P/R3R1K1 w - - 1 18",
    "solution": [
      "h5f6",
      "g8h8",
      "h6h7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01LPz",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Средняя",
    "rating": 1059,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "master",
      "short"
    ],
    "fen": "8/p6k/2pr2p1/4Np1p/4B2P/2n1P1P1/P4P2/2R3K1 b - - 0 37",
    "solution": [
      "c3e2",
      "g1g2",
      "e2c1"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01LaG",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Сложная",
    "rating": 1589,
    "sideToMove": "b",
    "tags": [
      "advancedPawn",
      "kingsideAttack",
      "long",
      "mate",
      "mateIn3",
      "middlegame"
    ],
    "fen": "6rk/5R2/3p1q1p/3P2pQ/1P2P3/3P1p1P/P1r3PB/1R5K b - - 1 28",
    "solution": [
      "f3g2",
      "h1g1",
      "f6d4",
      "f7f2",
      "d4f2"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01LlS",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 902,
    "sideToMove": "w",
    "tags": [
      "clearance",
      "kingsideAttack",
      "mate",
      "mateIn2",
      "middlegame",
      "sacrifice",
      "short"
    ],
    "fen": "4rrk1/ppp1qpp1/7p/6N1/4N1P1/b2Q3P/P4P2/1R4K1 w - - 0 25",
    "solution": [
      "e4f6",
      "g7f6",
      "d3h7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01M7o",
    "title": "Выигрыш материала",
    "description": "В позиции можно выиграть материал точным тактическим ходом.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Выигрыш материала",
    "difficulty": "Сложная",
    "rating": 1705,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "deflection",
      "endgame",
      "long"
    ],
    "fen": "3r2r1/p3kp1p/2q1p3/2p2p2/5Q2/6N1/PPP3PP/3R2K1 w - - 2 22",
    "solution": [
      "f4h4",
      "f7f6",
      "h4h7",
      "e7f8",
      "d1d8"
    ],
    "hint": "Проверь взятия, незащищённые фигуры и перегруженных защитников.",
    "successText": "Материал выигран."
  },
  {
    "id": "lichess-01M89",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1163,
    "sideToMove": "b",
    "tags": [
      "advancedPawn",
      "crushing",
      "endgame",
      "hangingPiece",
      "long",
      "pin"
    ],
    "fen": "8/2p5/1p2B3/p7/5r2/P4p2/1PP1N2k/1K4R1 b - - 2 59",
    "solution": [
      "f3e2",
      "g1e1",
      "f4f1",
      "b1c1",
      "f1e1"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-01MOR",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1271,
    "sideToMove": "b",
    "tags": [
      "endgame",
      "mate",
      "mateIn2",
      "short"
    ],
    "fen": "1k6/1p2R3/2p1B1r1/p1N4p/5r2/8/PPP5/3R3K b - - 3 32",
    "solution": [
      "f4h4",
      "e6h3",
      "h4h3"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01MRs",
    "title": "Атака на короля",
    "description": "Найдите самый сильный ход для продолжения атаки на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Атака на короля",
    "difficulty": "Сложная",
    "rating": 1507,
    "sideToMove": "b",
    "tags": [
      "advantage",
      "long",
      "master",
      "middlegame",
      "sacrifice"
    ],
    "fen": "r5k1/p2qppbp/1p1p1np1/2p5/2Pn4/P1NPP1PP/1P3P2/1RBQ1RK1 b - - 0 14",
    "solution": [
      "d7h3",
      "e3d4",
      "f6g4",
      "d1g4",
      "h3g4"
    ],
    "hint": "Проверь шахи, жертвы и угрозы около короля.",
    "successText": "Атака проведена точно."
  },
  {
    "id": "lichess-01Md6",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Лёгкая",
    "rating": 936,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "master",
      "mate",
      "mateIn2",
      "pillsburysMate",
      "short"
    ],
    "fen": "6k1/p4pp1/7p/4r3/P2pB3/4n2P/1r4P1/2R1R2K w - - 0 30",
    "solution": [
      "c1c8",
      "e5e8",
      "c8e8"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01N0w",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1012,
    "sideToMove": "b",
    "tags": [
      "master",
      "mate",
      "mateIn2",
      "middlegame",
      "queensideAttack",
      "short"
    ],
    "fen": "2kr3r/1pp5/p1p2Q2/2b2p1P/q1P5/6BP/PP3P2/1K1RR3 b - - 2 26",
    "solution": [
      "d8d1",
      "e1d1",
      "a4d1"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01NPD",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1331,
    "sideToMove": "w",
    "tags": [
      "endgame",
      "long",
      "mate",
      "mateIn3",
      "queenEndgame"
    ],
    "fen": "8/5p2/6pk/3PQp2/8/4PP2/p5PK/4q3 w - - 0 40",
    "solution": [
      "e5h8",
      "h6g5",
      "f3f4",
      "g5g4",
      "h8h3"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  },
  {
    "id": "lichess-01NVd",
    "title": "Тактическая вилка",
    "description": "Найдите ход, который создаёт сразу несколько угроз.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Вилка",
    "difficulty": "Лёгкая",
    "rating": 899,
    "sideToMove": "w",
    "tags": [
      "advantage",
      "endgame",
      "fork",
      "master",
      "short"
    ],
    "fen": "8/1K3Npk/5n2/R6p/8/p6r/8/8 w - - 2 49",
    "solution": [
      "f7g5",
      "h7g6",
      "g5h3"
    ],
    "hint": "Ищи ход, который атакует сразу две важные фигуры.",
    "successText": "Вилка найдена, материал выигран."
  },
  {
    "id": "lichess-01NYs",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Средняя",
    "rating": 1239,
    "sideToMove": "w",
    "tags": [
      "crushing",
      "endgame",
      "master",
      "pin",
      "short"
    ],
    "fen": "8/8/p1r5/1k2KB2/1P4P1/8/2P5/8 w - - 6 58",
    "solution": [
      "f5d7",
      "b5b6",
      "d7c6"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-01Nco",
    "title": "Использование связки",
    "description": "Используйте связанную фигуру, линию атаки или перегрузку защиты.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Связка",
    "difficulty": "Лёгкая",
    "rating": 776,
    "sideToMove": "b",
    "tags": [
      "crushing",
      "endgame",
      "short",
      "skewer"
    ],
    "fen": "8/3R2p1/2p2pkp/1bB5/pP1K2PP/P4P2/4r3/8 b - - 0 39",
    "solution": [
      "e2d2",
      "d4c3",
      "d2d7"
    ],
    "hint": "Посмотри, какая фигура не может уйти из-за более ценной фигуры за ней.",
    "successText": "Связка использована правильно."
  },
  {
    "id": "lichess-01NfS",
    "title": "Найдите матующую идею",
    "description": "В позиции есть тактическая возможность завершить атаку на короля.",
    "source": "Lichess Puzzle Dataset",
    "theme": "Мат",
    "difficulty": "Средняя",
    "rating": 1290,
    "sideToMove": "w",
    "tags": [
      "mate",
      "mateIn2",
      "middlegame",
      "short"
    ],
    "fen": "3rk2r/pp2bppp/2pQ4/2Bn4/6P1/3P4/PPP4P/1K2R1Nq w k - 4 20",
    "solution": [
      "e1e7",
      "d5e7",
      "d6e7"
    ],
    "hint": "Сначала проверь все шахи. Часто мат начинается с forcing move.",
    "successText": "Матовая идея найдена."
  }
] satisfies TacticPuzzle[];
