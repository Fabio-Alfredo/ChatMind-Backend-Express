import { Request, Response, NextFunction } from 'express';
import * as userService from "../services/user.service";
import { User } from "../interfaces/user.interface";
import ErrorCodes from '../utils/error/codes/error.codes';
import createHttpError from 'http-errors';


export const createUser = async (req: Request<{}, {}, User>, res: Response, next: NextFunction): Promise<any> => {
    try {
        const user: User = await userService.create(req.body);
        return res.status(201).json(user);
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