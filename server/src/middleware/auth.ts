import type { NextFunction, Request, Response } from "express";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken") as typeof import("jsonwebtoken");

type JwtPayload = {
  sub: string;
};

declare global {
  namespace Express {
    interface Request {
      authUser?: {
        id: string;
      };
    }
  }
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  return secret;
}

function getTokenFromRequest(req: Request) {
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

function verifyToken(token: string) {
  const decoded = jwt.verify(token, getJwtSecret());

  if (
    typeof decoded === "object" &&
    decoded !== null &&
    typeof decoded.sub === "string"
  ) {
    return decoded as JwtPayload;
  }

  return null;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
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
  } catch {
    res.status(401).json({
      message: "Недействительный токен",
    });
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
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
  } catch {
    next();
  }
}