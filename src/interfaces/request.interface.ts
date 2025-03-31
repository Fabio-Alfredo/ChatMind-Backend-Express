import { Request } from "express";
import { TokenPayload } from "./user.interface";

export interface AuthRequest extends Request {
    user: TokenPayload;
}