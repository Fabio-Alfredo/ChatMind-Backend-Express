import { Response } from "express";

export const responseHandler = ( res: Response, message: string = "Success", status: number = 200, data: Object = {}): void => {
    res.status(status).json(
        {
            success: true,
            status: status,
            message: message,
            data: data
        }
    )
}