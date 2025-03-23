import UserModel from "../domains/models/user.model";
import { User } from "../interfaces/user.interface";
import { Schema } from 'mongoose';

const create = async (user: User): Promise<User | null> => {
    const newUser = await UserModel.create(user);
    return newUser;
}

const findById = async (id: Schema.Types.ObjectId): Promise<User | null> => {
    const user = await UserModel.findById(id);
    return user;
}


const findAll = async (): Promise<User[]> => {
    const users = await UserModel.find();
    return users;
}

const findByEmail = async (email: string): Promise<User | null> => {
    const user = await UserModel.findOne({ email });
    return user;
}

export default {
    create,
    findById,
    findAll,
    findByEmail
}