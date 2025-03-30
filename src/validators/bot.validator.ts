import { body } from "express-validator";

export const createValidator = [
    body("name")
        .exists()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long")
        .bail(),
    body("description")
        .exists()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string")
        .isLength({ min: 3 })
        .withMessage("Description must be at least 3 characters long")
        .bail(),
    body("model")
        .exists()
        .withMessage("Model is required")
        .isString()
        .withMessage("Model must be a string")
        .isLength({ min: 3 })
        .withMessage("Model must be at least 3 characters long")
        .bail(),
    body("apiURL")
        .exists()
        .withMessage("API URL is required")
        .isString()
        .withMessage("API URL must be a string")
        .isLength({ min: 3 })
        .withMessage("API URL must be at least 3 characters long")
        .bail(),
    body("apiToken")
        .exists()
        .withMessage("API Token is required")
        .isString()
        .withMessage("API Token must be a string")
        .isLength({ min: 3 })
        .withMessage("API Token must be at least 3 characters long")
        .bail(),
]