import { TokenPayload } from "../interfaces";

declare module "express-serve-static-core" {
    interface Request {
        dataUser: TokenPayload;
    }
}