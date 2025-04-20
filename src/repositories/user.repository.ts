import UserModel from "../domains/models/user.model";
import { RegisterGoogleUser, RegisterUser, User } from "../interfaces";
import { Schema } from 'mongoose';
import { Roles } from "../types/roles.types";

export const create = async (user: RegisterUser | RegisterGoogleUser): Promise<User> => {
    const newUser = await UserModel.create(user);
    return newUser;
}

export const findById = async (id: Schema.Types.ObjectId): Promise<User | null> => {
    const user = await UserModel.findById(id);
    return user;
}


export const findAll = async (): Promise<User[]> => {
    const users = await UserModel.find();
    return users;
}

export const findByEmail = async (email: string): Promise<User | null> => {
    const user = await UserModel.findOne({ email });
    return user;
}

export const updateRole = async (id: Schema.Types.ObjectId, role: Roles): Promise<User | null> => {
    const user = await UserModel.findByIdAndUpdate(id, { $addToSet: { roles: role } }, { new: true });
    return user;
}

export const delteRole = async (id: Schema.Types.ObjectId, role: Roles): Promise<User | null> => {
    const user = await UserModel.findByIdAndUpdate(id, { $pull: { roles: role } }, { new: true });
    return user;
}