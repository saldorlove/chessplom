import { Server } from "socket.io";
import { prisma } from "../prisma.js";
import { applyFriendClockMove, clearFriendDrawOffer, clearFriendRematchOffer, createFriendRoom, createRematchFriendRoom, deleteFriendRoom, findActiveFriendRoomForPlayer, getExpectedMoveSide, getFriendClockSnapshot, getFriendRoom, getFriendRoomOpponentBySide, getFriendRoomPlayer, getFriendRoomPlayerBySide, joinFriendRoom, markFriendRoomEnded, markSocketDisconnected, reconnectFriendRoomPlayer, registerFriendRoomMove, setFriendDrawOffer, setFriendRematchOffer, stopFriendClock, } from "./friendRooms.js";
function getSafeUsername(value) {
    if (typeof value !== "string") {
        return "Гость";
    }
    const trimmedValue = value.trim();
    return trimmedValue || "Гость";
}
function getSafeUserId(value) {
    if (typeof value !== "string") {
        return null;
    }
    const trimmedValue = value.trim();
    return trimmedValue || null;
}
function getSafeTime(value) {
    if (typeof value !== "string") {
        return "10+0";
    }
    const trimmedValue = value.trim();
    return trimmedValue || "10+0";
}
function getSafeColor(value) {
    if (value === "white" || value === "black" || value === "random") {
        return value;
    }
    return "random";
}
function buildPlayUrl({ mode = "friend", time, roomCode, color, opponent, }) {
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("time", time);
    params.set("room", roomCode);
    params.set("color", color);
    params.set("opponent", opponent);
    return `/play?${params.toString()}`;
}
function sideToColor(side) {
    return side === "w" ? "white" : "black";
}
function getOppositeSide(side) {
    return side === "w" ? "b" : "w";
}
function getPreferredSide(color) {
    if (color === "white")
        return "w";
    if (color === "black")
        return "b";
    return null;
}
function getFriendshipPair(firstUserId, secondUserId) {
    return [firstUserId, secondUserId].sort();
}
async function areUsersFriends(firstUserId, secondUserId) {
    const [userAId, userBId] = getFriendshipPair(firstUserId, secondUserId);
    const friendship = await prisma.friendship.findUnique({
        where: {
            userAId_userBId: {
                userAId,
                userBId,
            },
        },
    });
    return Boolean(friendship);
}
function chooseOnlineSides(firstColor, secondColor) {
    const firstPreferredSide = getPreferredSide(firstColor);
    const secondPreferredSide = getPreferredSide(secondColor);
    if (firstPreferredSide && secondPreferredSide) {
        if (firstPreferredSide === secondPreferredSide) {
            return null;
        }
        return {
            first: firstPreferredSide,
            second: secondPreferredSide,
        };
    }
    if (firstPreferredSide) {
        return {
            first: firstPreferredSide,
            second: getOppositeSide(firstPreferredSide),
        };
    }
    if (secondPreferredSide) {
        return {
            first: getOppositeSide(secondPreferredSide),
            second: secondPreferredSide,
        };
    }
    const firstSide = Math.random() < 0.5 ? "w" : "b";
    return {
        first: firstSide,
        second: getOppositeSide(firstSide),
    };
}
function isValidMovePayload(move) {
    if (!move || typeof move !== "object") {
        return false;
    }
    const maybeMove = move;
    return (typeof maybeMove.from === "string" &&
        typeof maybeMove.to === "string" &&
        typeof maybeMove.moveIndex === "number");
}
function getActionContext(payload, socketId) {
    const roomCode = payload?.roomCode?.trim().toUpperCase();
    if (!roomCode) {
        return {
            ok: false,
            message: "Нет кода комнаты",
        };
    }
    const room = getFriendRoom(roomCode);
    if (!room) {
        return {
            ok: false,
            message: "Комната не найдена",
        };
    }
    let player = getFriendRoomPlayer(room, socketId);
    if (!player && payload.side) {
        player = getFriendRoomPlayerBySide(room, payload.side);
    }
    if (!player) {
        return {
            ok: false,
            message: "Вы не являетесь участником этой комнаты",
        };
    }
    const opponent = getFriendRoomOpponentBySide(room, player.side);
    return {
        ok: true,
        room,
        player,
        opponent,
    };
}
function buildPlayUrlForRoomPlayer({ room, playerSide, mode, }) {
    const opponent = getFriendRoomOpponentBySide(room, playerSide);
    return buildPlayUrl({
        mode,
        time: room.time,
        roomCode: room.code,
        color: sideToColor(playerSide),
        opponent: opponent?.username ?? "Соперник",
    });
}
function buildActiveGamePayload({ room, playerSide, }) {
    const opponent = getFriendRoomOpponentBySide(room, playerSide);
    const playUrl = buildPlayUrlForRoomPlayer({
        room,
        playerSide,
        mode: room.mode,
    });
    return {
        roomCode: room.code,
        mode: room.mode,
        playerSide,
        color: sideToColor(playerSide),
        timeControl: room.time,
        opponentName: opponent?.username ?? "Соперник",
        opponentAvatarUrl: opponent?.avatarUrl ?? null,
        status: room.gameStatus,
        playUrl,
        updatedAt: Date.now(),
    };
}
export function setupSocketServer({ httpServer, clientOrigin, }) {
    const io = new Server(httpServer, {
        cors: {
            origin: clientOrigin,
        },
    });
    const onlineQueue = new Map();
    const userSockets = new Map();
    const socketUserIds = new Map();
    const pendingFriendInvites = new Map();
    function registerSocketUser(socketId, userId) {
        const previousUserId = socketUserIds.get(socketId);
        if (previousUserId) {
            const previousSockets = userSockets.get(previousUserId);
            previousSockets?.delete(socketId);
            if (previousSockets?.size === 0) {
                userSockets.delete(previousUserId);
            }
        }
        if (!userId) {
            socketUserIds.delete(socketId);
            return;
        }
        socketUserIds.set(socketId, userId);
        const sockets = userSockets.get(userId) ?? new Set();
        sockets.add(socketId);
        userSockets.set(userId, sockets);
    }
    function removeSocketFromUserMaps(socketId) {
        const userId = socketUserIds.get(socketId);
        if (!userId) {
            return;
        }
        socketUserIds.delete(socketId);
        const sockets = userSockets.get(userId);
        sockets?.delete(socketId);
        if (sockets?.size === 0) {
            userSockets.delete(userId);
        }
    }
    function getOnlineSocketsForUser(userId) {
        const socketIds = userSockets.get(userId);
        if (!socketIds) {
            return [];
        }
        return Array.from(socketIds).filter((socketId) => Boolean(io.sockets.sockets.get(socketId)));
    }
    function clearPendingInvitesByRoom(roomCode) {
        for (const [inviteId, invite] of pendingFriendInvites) {
            if (invite.roomCode === roomCode) {
                pendingFriendInvites.delete(inviteId);
            }
        }
    }
    function emitGameEnded({ roomCode, reason, loser, message, }) {
        io.to(roomCode).emit("friend:game-ended", {
            roomCode,
            reason,
            loser,
            message,
        });
    }
    io.on("connection", (socket) => {
        socket.on("friend-presence:register", (payload, callback) => {
            const userId = getSafeUserId(payload?.userId);
            registerSocketUser(socket.id, userId);
            callback?.({
                ok: true,
            });
        });
        socket.on("friend-presence:get", (payload, callback) => {
            const requestedUserIds = Array.isArray(payload?.userIds)
                ? payload.userIds
                    .filter((userId) => typeof userId === "string")
                    .map((userId) => userId.trim())
                    .filter(Boolean)
                : [];
            const uniqueUserIds = Array.from(new Set(requestedUserIds));
            const statuses = {};
            for (const userId of uniqueUserIds) {
                const activeRoom = findActiveFriendRoomForPlayer({
                    userId,
                    includeEnded: false,
                });
                if (activeRoom) {
                    statuses[userId] = "in-game";
                    continue;
                }
                statuses[userId] =
                    getOnlineSocketsForUser(userId).length > 0 ? "online" : "offline";
            }
            callback?.({
                ok: true,
                statuses,
            });
        });
        socket.on("friend:invite-friend", async (payload, callback) => {
            try {
                const fromUserId = getSafeUserId(payload?.userId);
                const targetUserId = getSafeUserId(payload?.targetUserId);
                if (!fromUserId || !targetUserId) {
                    callback?.({
                        ok: false,
                        message: "Не выбран друг",
                    });
                    return;
                }
                if (fromUserId === targetUserId) {
                    callback?.({
                        ok: false,
                        message: "Нельзя пригласить себя",
                    });
                    return;
                }
                const isFriend = await areUsersFriends(fromUserId, targetUserId);
                if (!isFriend) {
                    callback?.({
                        ok: false,
                        message: "Игрок не найден в списке друзей",
                    });
                    return;
                }
                registerSocketUser(socket.id, fromUserId);
                const targetSocketIds = getOnlineSocketsForUser(targetUserId);
                if (targetSocketIds.length === 0) {
                    callback?.({
                        ok: false,
                        message: "Друг сейчас не в сети",
                    });
                    return;
                }
                const room = createFriendRoom({
                    socketId: socket.id,
                    userId: fromUserId,
                    username: getSafeUsername(payload?.username),
                    avatarUrl: payload?.avatarUrl ?? null,
                    time: getSafeTime(payload?.time),
                    hostColor: getSafeColor(payload?.color),
                    mode: "friend",
                });
                socket.join(room.code);
                const inviteId = `${room.code}-${Date.now()}`;
                pendingFriendInvites.set(inviteId, {
                    inviteId,
                    roomCode: room.code,
                    fromSocketId: socket.id,
                    toUserId: targetUserId,
                    createdAt: Date.now(),
                });
                for (const targetSocketId of targetSocketIds) {
                    io.to(targetSocketId).emit("friend:game-invite", {
                        inviteId,
                        roomCode: room.code,
                        time: room.time,
                        from: {
                            userId: fromUserId,
                            username: room.host.username,
                            avatarUrl: room.host.avatarUrl,
                        },
                    });
                }
                callback?.({
                    ok: true,
                    roomCode: room.code,
                    message: "Приглашение отправлено. Ожидаем ответ друга.",
                });
            }
            catch (error) {
                console.error(error);
                callback?.({
                    ok: false,
                    message: "Не удалось отправить приглашение",
                });
            }
        });
        socket.on("friend:invite-decline", (payload, callback) => {
            const inviteId = payload?.inviteId;
            const roomCode = payload?.roomCode?.trim().toUpperCase();
            const invite = (inviteId ? pendingFriendInvites.get(inviteId) : undefined) ??
                Array.from(pendingFriendInvites.values()).find((item) => item.roomCode === roomCode);
            if (!invite) {
                callback?.({
                    ok: true,
                });
                return;
            }
            pendingFriendInvites.delete(invite.inviteId);
            deleteFriendRoom(invite.roomCode);
            io.to(invite.fromSocketId).emit("friend:invite-declined", {
                roomCode: invite.roomCode,
                message: "Друг отклонил приглашение",
            });
            callback?.({
                ok: true,
            });
        });
        socket.on("active-game:get", (payload, callback) => {
            const requestedMode = payload?.mode === "friend" || payload?.mode === "online"
                ? payload.mode
                : undefined;
            const activeRoomSearchParams = {
                socketId: socket.id,
                userId: getSafeUserId(payload?.userId),
                // Баннер активной партии должен показывать только реально идущие партии.
                includeEnded: false,
            };
            if (requestedMode) {
                activeRoomSearchParams.mode = requestedMode;
            }
            const activeRoom = findActiveFriendRoomForPlayer(activeRoomSearchParams);
            if (!activeRoom) {
                callback?.({
                    ok: true,
                    activeGame: null,
                });
                return;
            }
            callback?.({
                ok: true,
                activeGame: buildActiveGamePayload({
                    room: activeRoom.room,
                    playerSide: activeRoom.player.side,
                }),
            });
        });
        socket.on("online:find-game", (payload, callback) => {
            const entry = {
                socketId: socket.id,
                userId: getSafeUserId(payload?.userId),
                username: getSafeUsername(payload?.username),
                avatarUrl: payload?.avatarUrl ?? null,
                time: getSafeTime(payload?.time),
                color: getSafeColor(payload?.color),
                createdAt: Date.now(),
            };
            onlineQueue.delete(socket.id);
            const activeRoom = findActiveFriendRoomForPlayer({
                socketId: socket.id,
                userId: entry.userId,
                mode: "online",
                includeEnded: false,
            });
            if (activeRoom) {
                socket.join(activeRoom.room.code);
                const playUrl = buildPlayUrlForRoomPlayer({
                    room: activeRoom.room,
                    playerSide: activeRoom.player.side,
                    mode: "online",
                });
                callback?.({
                    ok: true,
                    status: "active",
                    roomCode: activeRoom.room.code,
                    playUrl,
                    message: "У вас уже есть активная онлайн-партия",
                });
                return;
            }
            for (const [queuedSocketId, queuedEntry] of onlineQueue) {
                const queuedSocket = io.sockets.sockets.get(queuedSocketId);
                if (!queuedSocket) {
                    onlineQueue.delete(queuedSocketId);
                    continue;
                }
                if (queuedEntry.time !== entry.time) {
                    continue;
                }
                if (entry.userId &&
                    queuedEntry.userId &&
                    entry.userId === queuedEntry.userId) {
                    continue;
                }
                const sides = chooseOnlineSides(queuedEntry.color, entry.color);
                if (!sides) {
                    continue;
                }
                onlineQueue.delete(queuedSocketId);
                const room = createFriendRoom({
                    socketId: queuedEntry.socketId,
                    userId: queuedEntry.userId,
                    username: queuedEntry.username,
                    avatarUrl: queuedEntry.avatarUrl,
                    time: queuedEntry.time,
                    hostColor: sideToColor(sides.first),
                    mode: "online",
                });
                const joinResult = joinFriendRoom({
                    code: room.code,
                    socketId: socket.id,
                    userId: entry.userId,
                    username: entry.username,
                    avatarUrl: entry.avatarUrl,
                });
                if (!joinResult.ok || !room.guest) {
                    callback?.({
                        ok: false,
                        message: "Не удалось создать онлайн-партию",
                    });
                    return;
                }
                queuedSocket.join(room.code);
                socket.join(room.code);
                const hostPlayUrl = buildPlayUrlForRoomPlayer({
                    room,
                    playerSide: room.host.side,
                    mode: "online",
                });
                const guestPlayUrl = buildPlayUrlForRoomPlayer({
                    room,
                    playerSide: room.guest.side,
                    mode: "online",
                });
                io.to(room.host.socketId).emit("online:match-found", {
                    roomCode: room.code,
                    playUrl: hostPlayUrl,
                    side: room.host.side,
                    opponent: {
                        username: room.guest.username,
                        avatarUrl: room.guest.avatarUrl,
                    },
                });
                io.to(room.guest.socketId).emit("online:match-found", {
                    roomCode: room.code,
                    playUrl: guestPlayUrl,
                    side: room.guest.side,
                    opponent: {
                        username: room.host.username,
                        avatarUrl: room.host.avatarUrl,
                    },
                });
                callback?.({
                    ok: true,
                    status: "matched",
                    roomCode: room.code,
                    playUrl: guestPlayUrl,
                });
                return;
            }
            onlineQueue.set(socket.id, entry);
            callback?.({
                ok: true,
                status: "queued",
                message: "Вы добавлены в очередь поиска",
            });
        });
        socket.on("online:cancel-search", (_payload, callback) => {
            onlineQueue.delete(socket.id);
            callback?.({
                ok: true,
            });
        });
        socket.on("friend:create-room", (payload, callback) => {
            const room = createFriendRoom({
                socketId: socket.id,
                userId: getSafeUserId(payload?.userId),
                username: getSafeUsername(payload?.username),
                avatarUrl: payload?.avatarUrl ?? null,
                time: getSafeTime(payload?.time),
                hostColor: getSafeColor(payload?.color),
            });
            socket.join(room.code);
            callback?.({
                ok: true,
                roomCode: room.code,
                side: room.host.side,
                time: room.time,
                message: "Комната создана",
            });
        });
        socket.on("friend:join-room", (payload, callback) => {
            const roomCode = payload?.roomCode?.trim().toUpperCase();
            if (!roomCode) {
                callback?.({
                    ok: false,
                    message: "Введите код комнаты",
                });
                return;
            }
            const result = joinFriendRoom({
                code: roomCode,
                socketId: socket.id,
                userId: getSafeUserId(payload?.userId),
                username: getSafeUsername(payload?.username),
                avatarUrl: payload?.avatarUrl ?? null,
            });
            if (!result.ok) {
                callback?.({
                    ok: false,
                    message: result.message,
                });
                return;
            }
            const { room } = result;
            socket.join(room.code);
            const hostColor = room.host.side === "w" ? "white" : "black";
            const guestColor = room.guest.side === "w" ? "white" : "black";
            const hostPlayUrl = buildPlayUrl({
                time: room.time,
                roomCode: room.code,
                color: hostColor,
                opponent: room.guest.username,
            });
            const guestPlayUrl = buildPlayUrl({
                time: room.time,
                roomCode: room.code,
                color: guestColor,
                opponent: room.host.username,
            });
            io.to(room.host.socketId).emit("friend:room-ready", {
                roomCode: room.code,
                playUrl: hostPlayUrl,
                side: room.host.side,
                opponent: {
                    username: room.guest.username,
                    avatarUrl: room.guest.avatarUrl,
                },
            });
            io.to(room.guest.socketId).emit("friend:room-ready", {
                roomCode: room.code,
                playUrl: guestPlayUrl,
                side: room.guest.side,
                opponent: {
                    username: room.host.username,
                    avatarUrl: room.host.avatarUrl,
                },
            });
            clearPendingInvitesByRoom(room.code);
            callback?.({
                ok: true,
                roomCode: room.code,
                playUrl: guestPlayUrl,
                side: room.guest.side,
                opponent: {
                    username: room.host.username,
                    avatarUrl: room.host.avatarUrl,
                },
                message: "Вы подключились к комнате",
            });
        });
        socket.on("friend:join-play", (payload, callback) => {
            const roomCode = payload?.roomCode?.trim().toUpperCase();
            if (!roomCode) {
                callback?.({
                    ok: false,
                    message: "Нет кода комнаты",
                });
                return;
            }
            const room = getFriendRoom(roomCode);
            if (!room) {
                callback?.({
                    ok: false,
                    message: "Комната не найдена",
                });
                return;
            }
            socket.join(room.code);
            let player = getFriendRoomPlayer(room, socket.id);
            if (!player && payload?.side) {
                player = reconnectFriendRoomPlayer({
                    room,
                    side: payload.side,
                    socketId: socket.id,
                    userId: getSafeUserId(payload?.userId),
                    username: getSafeUsername(payload?.username),
                    avatarUrl: payload?.avatarUrl ?? null,
                });
            }
            if (!player) {
                callback?.({
                    ok: false,
                    message: "Вы не являетесь участником этой комнаты",
                });
                return;
            }
            const opponent = getFriendRoomOpponentBySide(room, player.side);
            if (opponent) {
                io.to(opponent.socketId).emit("friend:opponent-reconnected", {
                    roomCode: room.code,
                    side: player.side,
                    username: player.username,
                });
            }
            callback?.({
                ok: true,
                roomCode: room.code,
                side: player.side,
                moveCount: room.moveCount,
                moves: room.moves,
                clock: getFriendClockSnapshot(room),
                opponent: opponent
                    ? {
                        username: opponent.username,
                        avatarUrl: opponent.avatarUrl,
                        connected: opponent.connected,
                        reconnectDeadlineAt: opponent.reconnectDeadlineAt,
                    }
                    : null,
            });
        });
        socket.on("friend:move", (payload, callback) => {
            const context = getActionContext(payload, socket.id);
            if (!context.ok) {
                callback?.({
                    ok: false,
                    message: context.message,
                });
                return;
            }
            const { room, player } = context;
            if (room.gameStatus === "ended") {
                callback?.({
                    ok: false,
                    message: "Партия уже завершена",
                });
                return;
            }
            if (!isValidMovePayload(payload?.move)) {
                callback?.({
                    ok: false,
                    message: "Некорректный ход",
                });
                return;
            }
            const expectedSide = getExpectedMoveSide(room);
            if (player.side !== expectedSide || payload.side !== expectedSide) {
                callback?.({
                    ok: false,
                    message: "Сейчас ход другого игрока",
                });
                return;
            }
            const clockMoveResult = applyFriendClockMove(room, player.side);
            if (!clockMoveResult.ok) {
                stopFriendClock(room);
                emitGameEnded({
                    roomCode: room.code,
                    reason: "technical-loss",
                    loser: clockMoveResult.loser,
                    message: clockMoveResult.loser === "w"
                        ? "Время белых истекло. Победили чёрные"
                        : "Время чёрных истекло. Победили белые",
                });
                markFriendRoomEnded(room);
                callback?.({
                    ok: false,
                    message: "Время истекло",
                    clock: getFriendClockSnapshot(room),
                });
                return;
            }
            const storedMove = registerFriendRoomMove(room, payload.move);
            const clock = getFriendClockSnapshot(room);
            socket.to(room.code).emit("friend:opponent-move", {
                roomCode: room.code,
                side: player.side,
                move: storedMove,
                clock,
            });
            callback?.({
                ok: true,
                moveIndex: storedMove.moveIndex,
                clock,
            });
        });
        socket.on("friend:client-game-ended", (payload, callback) => {
            const context = getActionContext(payload, socket.id);
            if (!context.ok) {
                callback?.({
                    ok: false,
                    message: context.message,
                });
                return;
            }
            stopFriendClock(context.room);
            markFriendRoomEnded(context.room);
            clearPendingInvitesByRoom(context.room.code);
            callback?.({
                ok: true,
            });
        });
        socket.on("friend:resign", (payload, callback) => {
            const context = getActionContext(payload, socket.id);
            if (!context.ok) {
                callback?.({
                    ok: false,
                    message: context.message,
                });
                return;
            }
            emitGameEnded({
                roomCode: context.room.code,
                reason: "resignation",
                loser: context.player.side,
                message: context.player.side === "w"
                    ? "Белые сдались. Победили чёрные"
                    : "Чёрные сдались. Победили белые",
            });
            stopFriendClock(context.room);
            markFriendRoomEnded(context.room);
            clearPendingInvitesByRoom(context.room.code);
            callback?.({
                ok: true,
            });
        });
        socket.on("friend:draw-offer", (payload, callback) => {
            const context = getActionContext(payload, socket.id);
            if (!context.ok) {
                callback?.({
                    ok: false,
                    message: context.message,
                });
                return;
            }
            const { room, player, opponent } = context;
            if (!opponent) {
                callback?.({
                    ok: false,
                    message: "Соперник ещё не подключён",
                });
                return;
            }
            setFriendDrawOffer(room, player.side);
            io.to(opponent.socketId).emit("friend:draw-offer", {
                roomCode: room.code,
                fromSide: player.side,
                fromUsername: player.username,
            });
            callback?.({
                ok: true,
                message: "Предложение ничьей отправлено",
            });
        });
        socket.on("friend:draw-accept", (payload, callback) => {
            const context = getActionContext(payload, socket.id);
            if (!context.ok) {
                callback?.({
                    ok: false,
                    message: context.message,
                });
                return;
            }
            const { room, player } = context;
            if (!room.drawOfferFrom || room.drawOfferFrom === player.side) {
                callback?.({
                    ok: false,
                    message: "Нет входящего предложения ничьей",
                });
                return;
            }
            emitGameEnded({
                roomCode: room.code,
                reason: "draw-agreed",
                message: "Ничья по соглашению",
            });
            stopFriendClock(context.room);
            markFriendRoomEnded(room);
            callback?.({
                ok: true,
            });
        });
        socket.on("friend:draw-decline", (payload, callback) => {
            const context = getActionContext(payload, socket.id);
            if (!context.ok) {
                callback?.({
                    ok: false,
                    message: context.message,
                });
                return;
            }
            const { room, player } = context;
            if (!room.drawOfferFrom || room.drawOfferFrom === player.side) {
                callback?.({
                    ok: false,
                    message: "Нет входящего предложения ничьей",
                });
                return;
            }
            const offerSide = room.drawOfferFrom;
            const offerPlayer = getFriendRoomPlayerBySide(room, offerSide);
            clearFriendDrawOffer(room);
            if (offerPlayer?.socketId) {
                io.to(offerPlayer.socketId).emit("friend:draw-declined", {
                    roomCode: room.code,
                    bySide: player.side,
                    message: "Соперник отклонил ничью",
                });
            }
            callback?.({
                ok: true,
            });
        });
        socket.on("friend:rematch-offer", (payload, callback) => {
            const context = getActionContext(payload, socket.id);
            if (!context.ok) {
                callback?.({
                    ok: false,
                    message: context.message,
                });
                return;
            }
            const { room, player, opponent } = context;
            if (!opponent?.socketId) {
                callback?.({
                    ok: false,
                    message: "Соперник не подключён",
                });
                return;
            }
            setFriendRematchOffer(room, player.side);
            io.to(opponent.socketId).emit("friend:rematch-offer", {
                roomCode: room.code,
                fromSide: player.side,
                fromUsername: player.username,
            });
            callback?.({
                ok: true,
                message: "Предложение реванша отправлено",
            });
        });
        socket.on("friend:rematch-accept", (payload, callback) => {
            const context = getActionContext(payload, socket.id);
            if (!context.ok) {
                callback?.({
                    ok: false,
                    message: context.message,
                });
                return;
            }
            const { room, player } = context;
            if (!room.rematchOfferFrom || room.rematchOfferFrom === player.side) {
                callback?.({
                    ok: false,
                    message: "Нет входящего предложения реванша",
                });
                return;
            }
            const offerPlayer = getFriendRoomPlayerBySide(room, room.rematchOfferFrom);
            if (!offerPlayer?.socketId) {
                clearFriendRematchOffer(room);
                callback?.({
                    ok: false,
                    message: "Соперник не подключён",
                });
                return;
            }
            const oldRoomCode = room.code;
            const rematchRoom = createRematchFriendRoom(room);
            if (!rematchRoom || !rematchRoom.guest) {
                callback?.({
                    ok: false,
                    message: "Не удалось создать комнату для реванша",
                });
                return;
            }
            socket.join(rematchRoom.code);
            io.sockets.sockets.get(rematchRoom.host.socketId)?.join(rematchRoom.code);
            io.sockets.sockets.get(rematchRoom.guest.socketId)?.join(rematchRoom.code);
            const hostOpponent = getFriendRoomOpponentBySide(rematchRoom, rematchRoom.host.side);
            const hostPlayUrl = buildPlayUrlForRoomPlayer({
                room: rematchRoom,
                playerSide: rematchRoom.host.side,
                mode: rematchRoom.mode,
            });
            io.to(rematchRoom.host.socketId).emit("friend:rematch-started", {
                roomCode: oldRoomCode,
                newRoomCode: rematchRoom.code,
                playUrl: hostPlayUrl,
                side: rematchRoom.host.side,
                clock: getFriendClockSnapshot(rematchRoom),
                opponent: hostOpponent
                    ? {
                        username: hostOpponent.username,
                        avatarUrl: hostOpponent.avatarUrl,
                        connected: hostOpponent.connected,
                    }
                    : null,
            });
            const guestOpponent = getFriendRoomOpponentBySide(rematchRoom, rematchRoom.guest.side);
            const guestPlayUrl = buildPlayUrlForRoomPlayer({
                room: rematchRoom,
                playerSide: rematchRoom.guest.side,
                mode: rematchRoom.mode,
            });
            io.to(rematchRoom.guest.socketId).emit("friend:rematch-started", {
                roomCode: oldRoomCode,
                newRoomCode: rematchRoom.code,
                playUrl: guestPlayUrl,
                side: rematchRoom.guest.side,
                clock: getFriendClockSnapshot(rematchRoom),
                opponent: guestOpponent
                    ? {
                        username: guestOpponent.username,
                        avatarUrl: guestOpponent.avatarUrl,
                        connected: guestOpponent.connected,
                    }
                    : null,
            });
            // Старая комната больше не нужна: реванш живёт в новой чистой комнате.
            deleteFriendRoom(oldRoomCode);
            callback?.({
                ok: true,
            });
        });
        socket.on("friend:rematch-decline", (payload, callback) => {
            const context = getActionContext(payload, socket.id);
            if (!context.ok) {
                callback?.({
                    ok: false,
                    message: context.message,
                });
                return;
            }
            const { room, player } = context;
            if (!room.rematchOfferFrom || room.rematchOfferFrom === player.side) {
                callback?.({
                    ok: false,
                    message: "Нет входящего предложения реванша",
                });
                return;
            }
            const offerPlayer = getFriendRoomPlayerBySide(room, room.rematchOfferFrom);
            clearFriendRematchOffer(room);
            if (offerPlayer?.socketId) {
                io.to(offerPlayer.socketId).emit("friend:rematch-declined", {
                    roomCode: room.code,
                    bySide: player.side,
                    message: "Соперник отклонил реванш",
                });
            }
            callback?.({
                ok: true,
            });
        });
        socket.on("disconnect", () => {
            onlineQueue.delete(socket.id);
            removeSocketFromUserMaps(socket.id);
            for (const [inviteId, invite] of pendingFriendInvites) {
                if (invite.fromSocketId === socket.id) {
                    pendingFriendInvites.delete(inviteId);
                    deleteFriendRoom(invite.roomCode);
                }
            }
            const disconnectEvents = markSocketDisconnected(socket.id, (room, disconnectedSide) => {
                stopFriendClock(room);
                markFriendRoomEnded(room);
                emitGameEnded({
                    roomCode: room.code,
                    reason: "technical-loss",
                    loser: disconnectedSide,
                    message: disconnectedSide === "w"
                        ? "Белые не вернулись в партию. Техническая победа чёрных"
                        : "Чёрные не вернулись в партию. Техническая победа белых",
                });
            });
            for (const event of disconnectEvents) {
                if (!event.opponent?.socketId) {
                    continue;
                }
                io.to(event.opponent.socketId).emit("friend:opponent-disconnected", {
                    roomCode: event.room.code,
                    side: event.disconnectedPlayer.side,
                    username: event.disconnectedPlayer.username,
                    timeoutSeconds: event.timeoutSeconds,
                    deadlineAt: event.deadlineAt,
                });
            }
        });
    });
    return io;
}
//# sourceMappingURL=socket.js.map