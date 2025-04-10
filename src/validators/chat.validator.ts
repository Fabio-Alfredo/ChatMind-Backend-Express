import { body, param } from "express-validator";

export const createValidator = [
    body("bot_id")
        .exists()
        .trim()
        .withMessage("bot_id is required")
        .isMongoId()
        .withMessage("bot_id must be a valid MongoDB ObjectId"),

    body("name")
        .exists()
        .trim()
        .withMessage("name is required")
        .isString()
        .withMessage("name must be a string")
        .isLength({ min: 1 })
        .withMessage("name must be at least 1 character long")
        .bail()
]

export const updateValidator = [
    body("name")
        .optional()
        .trim()
        .isString()
        .withMessage("name must be a string")
        .isLength({ min: 1 })
        .withMessage("name must be at least 1 character long")
        .bail(),

    body("bot_id")
        .optional()
        .trim()
        .isMongoId()
        .withMessage("bot_id must be a valid MongoDB ObjectId")
        .bail()
]

export const findByIdValidator = [
    param("id")
        .exists()
        .trim()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("id must be a valid MongoDB ObjectId")
        .bail()
]


export const createMessagesValidator = [
    body("chat_id")
        .exists()
        .trim()
        .withMessage("chat_id is required")
        .isMongoId()
        .withMessage("chat_id must be a valid MongoDB ObjectId")
        .bail(),

    body("content")
        .exists()
        .trim()
        .withMessage("content is required")
        .isString()
        .withMessage("content must be a string")
        .isLength({ min: 1 })
        .withMessage("content must be at least 1 character long")
        .bail(),
    body("type")
        .exists()
        .trim()
        .withMessage("type is required")
        .isString()
        .withMessage("type must be a string")
        .isLength({ min: 1 })
        .withMessage("type must be at least 1 character long")
        .bail(),

]