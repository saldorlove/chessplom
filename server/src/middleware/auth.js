import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not set");
    }
    return secret;
}
function getTokenFromRequest(req) {
    const header = req.headers.authorization;
    if (!header) {
        return null;
    }
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
        return null;
    }
    return token;
}
function verifyToken(token) {
    const decoded = jwt.verify(token, getJwtSecret());
    if (typeof decoded === "object" &&
        decoded !== null &&
        typeof decoded.sub === "string") {
        return decoded;
    }
    return null;
}
export function requireAuth(req, res, next) {
    try {
        const token = getTokenFromRequest(req);
        if (!token) {
            res.status(401).json({
                message: "Требуется авторизация",
            });
            return;
        }
        const payload = verifyToken(token);
        if (!payload) {
            res.status(401).json({
                message: "Недействительный токен",
            });
            return;
        }
        req.authUser = {
            id: payload.sub,
        };
        next();
    }
    catch {
        res.status(401).json({
            message: "Недействительный токен",
        });
    }
}
export function optionalAuth(req, _res, next) {
    try {
        const token = getTokenFromRequest(req);
        if (!token) {
            next();
            return;
        }
        const payload = verifyToken(token);
        if (payload) {
            req.authUser = {
                id: payload.sub,
            };
        }
        next();
    }
    catch {
        next();
    }
}
//# sourceMappingURL=auth.js.map