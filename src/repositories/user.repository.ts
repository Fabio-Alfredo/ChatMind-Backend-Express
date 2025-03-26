import UserModel from "../domains/models/user.model";
import { RegisterUser, User } from "../interfaces";
import { Schema } from 'mongoose';

export const create = async (user: RegisterUser): Promise<User> => {
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
