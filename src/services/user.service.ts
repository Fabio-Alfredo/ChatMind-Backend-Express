import * as userRepo from "../repositories/user.repository";
import { User } from "../interfaces/user.interface";

export const create = async (user: User): Promise<User> => {
    try {
        const userExist = await userRepo.findByEmail(user.email);
        if (userExist) {
            throw new Error("User already exists");
        }

        const newUser = await userRepo.create(user);
        return newUser;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An error occurred while creating the user");
    }
}

