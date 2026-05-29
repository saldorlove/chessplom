import { Router } from "express";
import { prisma } from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();
function normalizeSearchQuery(value) {
    if (typeof value !== "string") {
        return "";
    }
    return value.trim().toLowerCase();
}
function toFriendUser(user) {
    return {
        id: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl,
        rating: user.rating ?? 1000,
    };
}
function getFriendshipPair(firstUserId, secondUserId) {
    return [firstUserId, secondUserId].sort();
}
async function areFriends(firstUserId, secondUserId) {
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
async function createFriendship(firstUserId, secondUserId) {
    const [userAId, userBId] = getFriendshipPair(firstUserId, secondUserId);
    return prisma.friendship.upsert({
        where: {
            userAId_userBId: {
                userAId,
                userBId,
            },
        },
        update: {},
        create: {
            userAId,
            userBId,
        },
    });
}
async function deleteFriendship(firstUserId, secondUserId) {
    const [userAId, userBId] = getFriendshipPair(firstUserId, secondUserId);
    return prisma.friendship.deleteMany({
        where: {
            userAId,
            userBId,
        },
    });
}
async function getFriendIds(userId) {
    const friendships = await prisma.friendship.findMany({
        where: {
            OR: [
                {
                    userAId: userId,
                },
                {
                    userBId: userId,
                },
            ],
        },
    });
    return friendships.map((friendship) => friendship.userAId === userId ? friendship.userBId : friendship.userAId);
}
async function getPendingRequestsForUsers(userId, targetUserIds) {
    if (targetUserIds.length === 0) {
        return [];
    }
    return prisma.friendRequest.findMany({
        where: {
            status: "pending",
            OR: [
                {
                    senderId: userId,
                    receiverId: {
                        in: targetUserIds,
                    },
                },
                {
                    receiverId: userId,
                    senderId: {
                        in: targetUserIds,
                    },
                },
            ],
        },
    });
}
function getRelationStatus({ userId, targetUserId, friendIds, pendingRequests, }) {
    if (friendIds.includes(targetUserId)) {
        return "friend";
    }
    const pendingRequest = pendingRequests.find((request) => request.status === "pending" &&
        ((request.senderId === userId && request.receiverId === targetUserId) ||
            (request.senderId === targetUserId && request.receiverId === userId)));
    if (!pendingRequest) {
        return "none";
    }
    return pendingRequest.senderId === userId ? "request-sent" : "request-received";
}
router.get("/", requireAuth, async (req, res) => {
    try {
        const userId = req.authUser.id;
        const friendships = await prisma.friendship.findMany({
            where: {
                OR: [
                    {
                        userAId: userId,
                    },
                    {
                        userBId: userId,
                    },
                ],
            },
            include: {
                userA: true,
                userB: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const friends = friendships.map((friendship) => toFriendUser(friendship.userAId === userId ? friendship.userB : friendship.userA));
        const incomingRequests = await prisma.friendRequest.findMany({
            where: {
                receiverId: userId,
                status: "pending",
            },
            include: {
                sender: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const outgoingRequests = await prisma.friendRequest.findMany({
            where: {
                senderId: userId,
                status: "pending",
            },
            include: {
                receiver: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json({
            friends,
            incomingRequests: incomingRequests.map((request) => ({
                id: request.id,
                createdAt: request.createdAt,
                user: toFriendUser(request.sender),
            })),
            outgoingRequests: outgoingRequests.map((request) => ({
                id: request.id,
                createdAt: request.createdAt,
                user: toFriendUser(request.receiver),
            })),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось загрузить друзей",
        });
    }
});
router.get("/search", requireAuth, async (req, res) => {
    try {
        const userId = req.authUser.id;
        const query = normalizeSearchQuery(req.query.q);
        if (query.length < 2) {
            res.json({
                users: [],
            });
            return;
        }
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: userId,
                },
                OR: [
                    {
                        usernameCanonical: {
                            contains: query,
                        },
                    },
                    {
                        emailCanonical: {
                            contains: query,
                        },
                    },
                ],
            },
            orderBy: {
                username: "asc",
            },
            take: 12,
        });
        const targetUserIds = users.map((user) => user.id);
        const friendIds = await getFriendIds(userId);
        const pendingRequests = await getPendingRequestsForUsers(userId, targetUserIds);
        res.json({
            users: users.map((user) => ({
                ...toFriendUser(user),
                relationStatus: getRelationStatus({
                    userId,
                    targetUserId: user.id,
                    friendIds,
                    pendingRequests,
                }),
            })),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось найти пользователей",
        });
    }
});
router.post("/requests", requireAuth, async (req, res) => {
    try {
        const userId = req.authUser.id;
        const { userId: targetUserId } = req.body;
        if (typeof targetUserId !== "string") {
            res.status(400).json({
                message: "Не выбран пользователь",
            });
            return;
        }
        if (targetUserId === userId) {
            res.status(400).json({
                message: "Нельзя добавить себя в друзья",
            });
            return;
        }
        const targetUser = await prisma.user.findUnique({
            where: {
                id: targetUserId,
            },
        });
        if (!targetUser) {
            res.status(404).json({
                message: "Пользователь не найден",
            });
            return;
        }
        if (await areFriends(userId, targetUserId)) {
            res.json({
                message: "Пользователь уже в друзьях",
            });
            return;
        }
        const incomingRequest = await prisma.friendRequest.findUnique({
            where: {
                senderId_receiverId: {
                    senderId: targetUserId,
                    receiverId: userId,
                },
            },
        });
        if (incomingRequest?.status === "pending") {
            await createFriendship(userId, targetUserId);
            await prisma.friendRequest.deleteMany({
                where: {
                    OR: [
                        {
                            senderId: targetUserId,
                            receiverId: userId,
                        },
                        {
                            senderId: userId,
                            receiverId: targetUserId,
                        },
                    ],
                },
            });
            res.json({
                message: "Заявка принята, пользователь добавлен в друзья",
            });
            return;
        }
        const existingOutgoingRequest = await prisma.friendRequest.findUnique({
            where: {
                senderId_receiverId: {
                    senderId: userId,
                    receiverId: targetUserId,
                },
            },
        });
        if (existingOutgoingRequest?.status === "pending") {
            res.json({
                message: "Заявка уже отправлена",
            });
            return;
        }
        if (existingOutgoingRequest) {
            await prisma.friendRequest.update({
                where: {
                    id: existingOutgoingRequest.id,
                },
                data: {
                    status: "pending",
                },
            });
        }
        else {
            await prisma.friendRequest.create({
                data: {
                    senderId: userId,
                    receiverId: targetUserId,
                    status: "pending",
                },
            });
        }
        res.status(201).json({
            message: "Заявка отправлена",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось отправить заявку",
        });
    }
});
router.post("/requests/:requestId/accept", requireAuth, async (req, res) => {
    try {
        const userId = req.authUser.id;
        const requestId = req.params.requestId;
        if (!requestId) {
            res.status(400).json({
                message: "Не выбрана заявка",
            });
            return;
        }
        const request = await prisma.friendRequest.findUnique({
            where: {
                id: requestId,
            },
        });
        if (!request || request.receiverId !== userId || request.status !== "pending") {
            res.status(404).json({
                message: "Заявка не найдена",
            });
            return;
        }
        await createFriendship(userId, request.senderId);
        await prisma.friendRequest.deleteMany({
            where: {
                OR: [
                    {
                        senderId: request.senderId,
                        receiverId: userId,
                    },
                    {
                        senderId: userId,
                        receiverId: request.senderId,
                    },
                ],
            },
        });
        res.json({
            message: "Заявка принята",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось принять заявку",
        });
    }
});
router.post("/requests/:requestId/decline", requireAuth, async (req, res) => {
    try {
        const userId = req.authUser.id;
        const requestId = req.params.requestId;
        if (!requestId) {
            res.status(400).json({
                message: "Не выбрана заявка",
            });
            return;
        }
        const request = await prisma.friendRequest.findUnique({
            where: {
                id: requestId,
            },
        });
        if (!request || request.receiverId !== userId || request.status !== "pending") {
            res.status(404).json({
                message: "Заявка не найдена",
            });
            return;
        }
        await prisma.friendRequest.delete({
            where: {
                id: request.id,
            },
        });
        res.json({
            message: "Заявка отклонена",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось отклонить заявку",
        });
    }
});
router.delete("/requests/:requestId", requireAuth, async (req, res) => {
    try {
        const userId = req.authUser.id;
        const requestId = req.params.requestId;
        if (!requestId) {
            res.status(400).json({
                message: "Не выбрана заявка",
            });
            return;
        }
        const request = await prisma.friendRequest.findUnique({
            where: {
                id: requestId,
            },
        });
        if (!request || request.senderId !== userId || request.status !== "pending") {
            res.status(404).json({
                message: "Заявка не найдена",
            });
            return;
        }
        await prisma.friendRequest.delete({
            where: {
                id: request.id,
            },
        });
        res.json({
            message: "Заявка отменена",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось отменить заявку",
        });
    }
});
router.delete("/:friendId", requireAuth, async (req, res) => {
    try {
        const userId = req.authUser.id;
        const friendId = req.params.friendId;
        if (!friendId) {
            res.status(400).json({
                message: "Не выбран друг",
            });
            return;
        }
        if (friendId === userId) {
            res.status(400).json({
                message: "Нельзя удалить себя",
            });
            return;
        }
        const result = await deleteFriendship(userId, friendId);
        if (result.count === 0) {
            res.status(404).json({
                message: "Друг не найден",
            });
            return;
        }
        res.json({
            message: "Друг удалён",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось удалить друга",
        });
    }
});
export default router;
//# sourceMappingURL=friends.js.map