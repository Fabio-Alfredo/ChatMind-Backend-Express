import *as userRepo from "../repositories/user.repository";
import ServiceError from "../utils/error/service.error";
import ErrorCodes from "../utils/error/codes/error.codes";
import { User } from "../interfaces";
import { Roles } from "../types/roles.types";
import { actions } from "../types/actionsRoles.types";

export const updateRoles = async (id: string, role: Roles, action: actions): Promise<User> => {
    try {
        const user: User | null = await userRepo.findById(id);
        if (!user) {
            throw new ServiceError("User not found",
                ErrorCodes.USER.NOT_FOUND
            );
        }
        
        let updatedUser: User | null;

        if (action === "deleteRole") {
            if (!user.roles.includes(role)) {
                throw new ServiceError("User does not have this role",
                    ErrorCodes.USER.ALREADY_HAS_ROLE
                );
            }
            updatedUser = await userRepo.delteRole(user._id, role);
        } else {
            if (user.roles.includes(role)) {
                throw new ServiceError("User already has this role",
                    ErrorCodes.USER.ALREADY_HAS_ROLE
                );
            }
            updatedUser = await userRepo.updateRole(user._id, role);
        }

        if (!updatedUser) {
            throw new ServiceError("Error updating user role",
                ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
            );
        }
        return updatedUser

    } catch (e: any) {
        throw new ServiceError(e.message || "Error adding role to user",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        );
    }
}