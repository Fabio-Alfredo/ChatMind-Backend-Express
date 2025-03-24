import { Request, Response, NextFunction } from 'express';
import * as userService from "../services/user.service";
import { User } from "../interfaces/user.interface";
import ErrorCodes from '../utils/error/codes/error.codes';
import createHttpError from 'http-errors';
import { responseHandler } from '../handlers/response.handler';


export const createUser = async (req: Request<{}, {}, User>, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userService.create(req.body);
        return responseHandler(res, "User created", 201);
    } catch (e: any) {
        switch (e.code) {
            case ErrorCodes.USER.ALREADY_EXISTS:
                next(createHttpError(409, e.message));
                break;
            case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}
