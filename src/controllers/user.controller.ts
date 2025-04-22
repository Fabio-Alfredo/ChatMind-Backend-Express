import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import *as userService from '../services/user.service';
import ServiceError from '../utils/error/service.error';
import ErrorCodes from '../utils/error/codes/error.codes';
import { Roles } from '../types/roles.types';
import { actions } from '../types/actionsRoles.types';
import { responseHandler } from '../handlers/response.handler';

export const updateRoles = async (req: Request<{ id: string }, {}, { role: Roles, action: actions }, {}>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { role, action } = req.body;

        const updatedUser = await userService.updateRoles(id, role, action);
        return responseHandler(res, "User role updated", 200, updatedUser);
    } catch (e: any) {
        switch (e.code) {
            case ErrorCodes.USER.NOT_FOUND:
                return next(createHttpError(404, e.message));
            case ErrorCodes.USER.ALREADY_HAS_ROLE:
                return next(createHttpError(409, e.message));
            case ErrorCodes.SERVER.INTERNAL_SERVER_ERROR:
                return next(createHttpError(500, e.message));
            default:
                return next(createHttpError(500, "Internal Server Error"));
        }
    }
}