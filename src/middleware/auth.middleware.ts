import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { verifyToken } from "../utils/security/jwt.security";
import { TokenPayload } from "../interfaces";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token: string | null = req.headers["authorization"]?.split(" ")[1] || null;

        if (!token) return next(createHttpError(401, "Unauthorized"));

        const { valid, message, payload } = verifyToken(token);

        if (!valid || !payload) return next(createHttpError(401, message || "Unauthorized"));
        req.dataUser = payload;
        // req.token = token;

        next();
    } catch (err) {
        console.error(err);
        next(createHttpError(401, "Unauthorized"));
    }

}

export const roleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const user: TokenPayload = req.dataUser;
            if (!roles.some(role => user.roles.includes(role))) {
                return next(createHttpError(403, "Forbidden"));
            }
            next();
        } catch (err) {
            console.error(err);
            next(createHttpError(401, "Unauthorized"));
        }
    }
}