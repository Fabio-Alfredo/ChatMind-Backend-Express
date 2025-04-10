import * as userRepo from "../repositories/user.repository";
import *as authMethods from "../utils/security/jwt.security";
import { RegisterUser, User, AuthUser, Token, RegisterGoogleUser, GooglePayload } from "../interfaces";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { AUTH_PROVIDERS } from "../utils/constants/autProvider.constant";


export const create = async (user: RegisterUser): Promise<User> => {
    try {
        const userExist: User | null = await userRepo.findByEmail(user.email);
        if (userExist) {
            throw new ServiceError("User already exists",
                ErrorCodes.USER.ALREADY_EXISTS
            );
        }

        const newUser: User = await userRepo.create(user);

        return newUser;
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        );
    }
}

export const auth = async (user: AuthUser): Promise<Token> => {
    try {
        const existUser: User | null = await userRepo.findByEmail(user.email);
        if (!existUser || existUser.authProvider === AUTH_PROVIDERS.GOOGLE || !(await existUser.comparePassword(user.password))) {
            throw new ServiceError("Invalid credentials",
                ErrorCodes.USER.INVALID_CREDENTIALS
            );
        }

        const token = authMethods.generateToken({
            _id: existUser._id,
            roles: existUser.roles
        })

        return token;

    } catch (e: any) {
        throw new ServiceError(
            e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}


export const googleAuth = async (googleToken: string): Promise<Token> => {
    try {
        let user: User | null = null;
        const payload: GooglePayload = await authMethods.verifyGoogleAuth(googleToken);

        if (!payload) {
            throw new ServiceError("Invalid Google Token",
                ErrorCodes.USER.INVALID_GOOGLE_TOKEN
            );
        }

        user = await userRepo.findByEmail(payload.email);

        if (!user) {
            const newUser: RegisterGoogleUser = {
                name: payload.name,
                email: payload.email,
                authProvider: AUTH_PROVIDERS.GOOGLE,
            }
            user = await userRepo.create(newUser);
        }

        const token: Token = authMethods.generateToken({
            _id: user._id,
            roles: user.roles
        })

        return token;
    } catch (e: any) {
        throw new ServiceError(
            e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}