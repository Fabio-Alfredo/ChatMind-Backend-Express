import * as userRepo from "../repositories/user.repository";
import {RegisterUser, User, AuthUser, Token}from "../interfaces";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { AuthFactory } from "../utils/security/authFactory.security";


export const create = async (user: RegisterUser): Promise<User> => {
    try {
        const userExist = await userRepo.findByEmail(user.email);
        if (userExist) {
            throw new ServiceError("User already exists",
                ErrorCodes.USER.ALREADY_EXISTS
            );
        }

        const newUser = await userRepo.create(user);
        console.log(newUser);
        return newUser;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        );
    }
}

export const auth = async (user: AuthUser): Promise<Token> => {
    try {
        const existUser = await userRepo.findByEmail(user.email);
        if (!existUser || !(await existUser.comparePassword(user.password))) {
            throw new ServiceError("Invalid credentials",
                ErrorCodes.USER.INVALID_CREDENTIALS
            );
        }

        const method = AuthFactory.AuthProvider("JWT");

        const token = method.generateToken({
            _id: existUser._id,
            roles: existUser.roles
        });

        return token;

    } catch (e: any) {
        throw new ServiceError(
            e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}
