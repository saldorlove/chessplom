const rooms = new Map();
const reconnectTimers = new Map();
const ROOM_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const ROOM_CODE_LENGTH = 6;
const ROOM_TTL_MS = 30 * 60 * 1000;
function getTimerKey(roomCode, side) {
    return `${roomCode}:${side}`;
}
function getRandomRoomCode() {
    let code = "";
    for (let index = 0; index < ROOM_CODE_LENGTH; index += 1) {
        const randomIndex = Math.floor(Math.random() * ROOM_CODE_ALPHABET.length);
        code += ROOM_CODE_ALPHABET[randomIndex];
    }
    return code;
}
function createUniqueRoomCode() {
    let code = getRandomRoomCode();
    while (rooms.has(code)) {
        code = getRandomRoomCode();
    }
    return code;
}
function getHostSide(hostColor) {
    if (hostColor === "white") {
        return "w";
    }
    if (hostColor === "black") {
        return "b";
    }
    return Math.random() < 0.5 ? "w" : "b";
}
function getOppositeSide(side) {
    return side === "w" ? "b" : "w";
}
function createPlayer({ socketId, userId, username, avatarUrl, side, }) {
    return {
        socketId,
        userId: userId ?? null,
        username,
        avatarUrl: avatarUrl ?? null,
        side,
        connected: true,
        disconnectedAt: null,
        reconnectDeadlineAt: null,
    };
}
function parseTimeControl(time) {
    const [minutesRaw, incrementRaw] = time.split("+");
    const minutes = Number(minutesRaw);
    const increment = Number(incrementRaw);
    return {
        baseSeconds: Number.isFinite(minutes) ? Math.max(0, minutes * 60) : 600,
        incrementSeconds: Number.isFinite(increment) ? Math.max(0, increment) : 0,
    };
}
function createClockState(time) {
    const { baseSeconds, incrementSeconds } = parseTimeControl(time);
    return {
        whiteMs: baseSeconds * 1000,
        blackMs: baseSeconds * 1000,
        initialMs: baseSeconds * 1000,
        incrementMs: incrementSeconds * 1000,
        turn: "w",
        lastMoveAt: null,
        isRunning: false,
        moveTimesMs: [],
        controlLabel: `${baseSeconds / 60}+${incrementSeconds}`,
    };
}
export function getReconnectWindowMs(time) {
    const { baseSeconds, incrementSeconds } = parseTimeControl(time);
    const calculatedSeconds = Math.round((baseSeconds + 40 * incrementSeconds) * 0.1);
    const boundedSeconds = Math.min(180, Math.max(30, calculatedSeconds));
    return boundedSeconds * 1000;
}
export function cleanupExpiredFriendRooms() {
    const now = Date.now();
    for (const [code, room] of rooms) {
        if (now - room.createdAt > ROOM_TTL_MS) {
            deleteFriendRoom(code);
        }
    }
}
export function createFriendRoom({ socketId, userId, username, avatarUrl, time, hostColor, mode = "friend", }) {
    cleanupExpiredFriendRooms();
    const code = createUniqueRoomCode();
    const hostSide = getHostSide(hostColor);
    const room = {
        code,
        mode,
        time,
        hostColor,
        host: createPlayer({
            socketId,
            userId,
            username,
            avatarUrl,
            side: hostSide,
        }),
        guest: null,
        createdAt: Date.now(),
        moveCount: 0,
        drawOfferFrom: null,
        rematchOfferFrom: null,
        gameStatus: "playing",
        moves: [],
        clock: createClockState(time),
    };
    rooms.set(code, room);
    return room;
}
export function joinFriendRoom({ code, socketId, userId, username, avatarUrl, }) {
    cleanupExpiredFriendRooms();
    const normalizedCode = code.trim().toUpperCase();
    const room = rooms.get(normalizedCode);
    if (!room) {
        return {
            ok: false,
            message: "Комната не найдена",
        };
    }
    if (room.guest && room.guest.socketId !== socketId) {
        return {
            ok: false,
            message: "Комната уже заполнена",
        };
    }
    if (room.host.socketId === socketId) {
        return {
            ok: false,
            message: "Вы уже создали эту комнату",
        };
    }
    room.guest = createPlayer({
        socketId,
        userId,
        username,
        avatarUrl,
        side: getOppositeSide(room.host.side),
    });
    return {
        ok: true,
        room,
    };
}
export function getFriendRoom(code) {
    cleanupExpiredFriendRooms();
    return rooms.get(code.trim().toUpperCase()) ?? null;
}
export function findActiveFriendRoomForPlayer({ socketId, userId, mode, includeEnded = false, }) {
    cleanupExpiredFriendRooms();
    for (const room of rooms.values()) {
        if (mode && room.mode !== mode) {
            continue;
        }
        if (!includeEnded && room.gameStatus !== "playing") {
            continue;
        }
        const players = [room.host, room.guest].filter((player) => Boolean(player));
        const player = players.find((candidate) => {
            if (socketId && candidate.socketId === socketId) {
                return true;
            }
            if (userId && candidate.userId === userId) {
                return true;
            }
            return false;
        });
        if (!player) {
            continue;
        }
        return {
            room,
            player,
            opponent: getFriendRoomOpponentBySide(room, player.side),
        };
    }
    return null;
}
export function getFriendRoomPlayer(room, socketId) {
    if (room.host.socketId === socketId) {
        return room.host;
    }
    if (room.guest?.socketId === socketId) {
        return room.guest;
    }
    return null;
}
export function getFriendRoomPlayerBySide(room, side) {
    if (room.host.side === side) {
        return room.host;
    }
    if (room.guest?.side === side) {
        return room.guest;
    }
    return null;
}
export function getFriendRoomOpponent(room, socketId) {
    if (room.host.socketId === socketId) {
        return room.guest;
    }
    if (room.guest?.socketId === socketId) {
        return room.host;
    }
    return null;
}
export function getFriendRoomOpponentBySide(room, side) {
    if (room.host.side === side) {
        return room.guest;
    }
    if (room.guest?.side === side) {
        return room.host;
    }
    return null;
}
export function reconnectFriendRoomPlayer({ room, side, socketId, userId, username, avatarUrl, }) {
    const player = getFriendRoomPlayerBySide(room, side);
    if (!player) {
        return null;
    }
    player.socketId = socketId;
    player.userId = userId ?? player.userId;
    player.username = username;
    player.avatarUrl = avatarUrl ?? player.avatarUrl;
    player.connected = true;
    player.disconnectedAt = null;
    player.reconnectDeadlineAt = null;
    clearReconnectTimer(room.code, side);
    return player;
}
export function getExpectedMoveSide(room) {
    return room.moveCount % 2 === 0 ? "w" : "b";
}
export function getFriendClockSnapshot(room) {
    const now = Date.now();
    let whiteMs = room.clock.whiteMs;
    let blackMs = room.clock.blackMs;
    if (room.clock.isRunning && room.clock.lastMoveAt !== null) {
        const elapsedMs = Math.max(now - room.clock.lastMoveAt, 0);
        if (room.clock.turn === "w") {
            whiteMs = Math.max(whiteMs - elapsedMs, 0);
        }
        else {
            blackMs = Math.max(blackMs - elapsedMs, 0);
        }
    }
    return {
        ...room.clock,
        whiteMs,
        blackMs,
        lastMoveAt: room.clock.isRunning ? now : room.clock.lastMoveAt,
        moveTimesMs: [...room.clock.moveTimesMs],
        serverNow: now,
    };
}
export function applyFriendClockMove(room, side) {
    const now = Date.now();
    const isFirstMove = room.moveCount === 0;
    if (isFirstMove) {
        room.clock.turn = side === "w" ? "b" : "w";
        room.clock.lastMoveAt = now;
        room.clock.isRunning = true;
        // Первый ход не считается по времени.
        // MoveHistoryPanel скрывает отрицательные значения.
        room.clock.moveTimesMs.push(-1);
        return {
            ok: true,
            spentMs: -1,
        };
    }
    const lastMoveAt = room.clock.lastMoveAt ?? now;
    const spentMs = room.clock.isRunning ? Math.max(now - lastMoveAt, 0) : 0;
    if (side === "w") {
        const remainingMs = room.clock.whiteMs - spentMs;
        if (remainingMs <= 0) {
            room.clock.whiteMs = 0;
            return {
                ok: false,
                loser: "w",
                spentMs,
            };
        }
        room.clock.whiteMs = remainingMs + room.clock.incrementMs;
        room.clock.turn = "b";
    }
    else {
        const remainingMs = room.clock.blackMs - spentMs;
        if (remainingMs <= 0) {
            room.clock.blackMs = 0;
            return {
                ok: false,
                loser: "b",
                spentMs,
            };
        }
        room.clock.blackMs = remainingMs + room.clock.incrementMs;
        room.clock.turn = "w";
    }
    room.clock.lastMoveAt = now;
    room.clock.isRunning = true;
    room.clock.moveTimesMs.push(spentMs);
    return {
        ok: true,
        spentMs,
    };
}
export function stopFriendClock(room) {
    room.clock.isRunning = false;
    room.clock.lastMoveAt = null;
}
export function registerFriendRoomMove(room, move) {
    room.moveCount += 1;
    room.drawOfferFrom = null;
    room.rematchOfferFrom = null;
    room.gameStatus = "playing";
    const storedMove = {
        ...move,
        moveIndex: room.moveCount,
    };
    room.moves.push(storedMove);
    return storedMove;
}
export function setFriendDrawOffer(room, side) {
    room.drawOfferFrom = side;
}
export function clearFriendDrawOffer(room) {
    room.drawOfferFrom = null;
}
export function markFriendRoomEnded(room) {
    room.gameStatus = "ended";
    room.drawOfferFrom = null;
    clearReconnectTimer(room.code, room.host.side);
    if (room.guest) {
        clearReconnectTimer(room.code, room.guest.side);
    }
}
export function setFriendRematchOffer(room, side) {
    room.rematchOfferFrom = side;
}
export function clearFriendRematchOffer(room) {
    room.rematchOfferFrom = null;
}
export function resetFriendRoomForRematch(room) {
    const hostSide = room.host.side;
    room.host.side = room.guest?.side ?? getOppositeSide(hostSide);
    if (room.guest) {
        room.guest.side = hostSide;
    }
    room.moveCount = 0;
    room.drawOfferFrom = null;
    room.rematchOfferFrom = null;
    room.gameStatus = "playing";
    room.moves = [];
    room.clock = createClockState(room.time);
    return room;
}
export function createRematchFriendRoom(room) {
    if (!room.guest) {
        return null;
    }
    const nextHostSide = getOppositeSide(room.host.side);
    const nextHostColor = nextHostSide === "w" ? "white" : "black";
    const nextRoom = createFriendRoom({
        socketId: room.host.socketId,
        userId: room.host.userId,
        username: room.host.username,
        avatarUrl: room.host.avatarUrl,
        time: room.time,
        hostColor: nextHostColor,
        mode: room.mode,
    });
    const joinResult = joinFriendRoom({
        code: nextRoom.code,
        socketId: room.guest.socketId,
        userId: room.guest.userId,
        username: room.guest.username,
        avatarUrl: room.guest.avatarUrl,
    });
    if (!joinResult.ok) {
        deleteFriendRoom(nextRoom.code);
        return null;
    }
    return nextRoom;
}
export function clearReconnectTimer(roomCode, side) {
    const key = getTimerKey(roomCode, side);
    const timer = reconnectTimers.get(key);
    if (timer) {
        clearTimeout(timer);
        reconnectTimers.delete(key);
    }
}
export function deleteFriendRoom(code) {
    const room = rooms.get(code);
    if (room) {
        clearReconnectTimer(room.code, room.host.side);
        if (room.guest) {
            clearReconnectTimer(room.code, room.guest.side);
        }
    }
    rooms.delete(code);
}
export function markSocketDisconnected(socketId, onTimeout) {
    const events = [];
    for (const room of Array.from(rooms.values())) {
        let disconnectedPlayer = null;
        let opponent = null;
        if (room.host.socketId === socketId) {
            disconnectedPlayer = room.host;
            opponent = room.guest;
        }
        else if (room.guest?.socketId === socketId) {
            disconnectedPlayer = room.guest;
            opponent = room.host;
        }
        if (!disconnectedPlayer) {
            continue;
        }
        disconnectedPlayer.socketId = "";
        disconnectedPlayer.connected = false;
        disconnectedPlayer.disconnectedAt = Date.now();
        disconnectedPlayer.reconnectDeadlineAt = null;
        clearReconnectTimer(room.code, disconnectedPlayer.side);
        // После завершения партии комната остаётся только как лобби реванша.
        // Техническое поражение уже не запускаем. Если оба игрока вышли — удаляем комнату.
        if (room.gameStatus === "ended") {
            const hostDisconnected = !room.host.connected;
            const guestDisconnected = !room.guest || !room.guest.connected;
            if (hostDisconnected && guestDisconnected) {
                deleteFriendRoom(room.code);
            }
            continue;
        }
        const timeoutMs = getReconnectWindowMs(room.time);
        const deadlineAt = Date.now() + timeoutMs;
        disconnectedPlayer.reconnectDeadlineAt = deadlineAt;
        const timer = setTimeout(() => {
            const currentRoom = rooms.get(room.code);
            if (!currentRoom || currentRoom.gameStatus !== "playing") {
                return;
            }
            const currentPlayer = getFriendRoomPlayerBySide(currentRoom, disconnectedPlayer.side);
            if (!currentPlayer || currentPlayer.connected) {
                return;
            }
            onTimeout(currentRoom, disconnectedPlayer.side);
            markFriendRoomEnded(currentRoom);
        }, timeoutMs);
        reconnectTimers.set(getTimerKey(room.code, disconnectedPlayer.side), timer);
        events.push({
            room,
            disconnectedPlayer,
            opponent,
            timeoutSeconds: Math.ceil(timeoutMs / 1000),
            deadlineAt,
        });
    }
    return events;
}
//# sourceMappingURL=friendRooms.js.map