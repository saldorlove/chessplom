import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import gamesRouter from "./routes/games.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import newsRouter from "./routes/news.js";
import friendsRouter from "./routes/friends.js";
import openingsRouter from "./routes/openings.js";
import { setupSocketServer } from "./realtime/socket.js";
const app = express();
const port = Number(process.env.PORT ?? 4000);
const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../uploads");
app.use(cors({
    origin: clientOrigin,
}));
app.use("/uploads", express.static(uploadsDir));
app.use(express.json({ limit: "2mb" }));
app.get("/api/health", (_req, res) => {
    res.json({
        ok: true,
        service: "zugzwang-server",
    });
});
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/games", gamesRouter);
app.use("/api/news", newsRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/openings", openingsRouter);
const httpServer = createServer(app);
setupSocketServer({
    httpServer,
    clientOrigin,
});
httpServer.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map