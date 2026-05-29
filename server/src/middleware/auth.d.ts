import type { NextFunction, Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            authUser?: {
                id: string;
            };
        }
    }
}
export declare function requireAuth(req: Request, res: Response, next: NextFunction): void;
export declare function optionalAuth(req: Request, _res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.d.ts.map