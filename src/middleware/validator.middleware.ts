import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


const validatorMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsMessages = errors.array().map((e) => ({
            message: e.msg
        }));
        res.status(400).json({
            success: false,
            errors: errorsMessages
        });
        return;
    }
    next();
}

export default validatorMiddleware; 