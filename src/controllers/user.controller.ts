import { Request, Response, NextFunction } from 'express';
import * as userService from "../services/user.service";
import { User } from "../interfaces/user.interface";


export const createUser = async (req: Request<{},{}, User>, res: Response, next:NextFunction):Promise<any> => {
    try {
        const user:User = await userService.create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: "Internal Server Error" });
    }
}