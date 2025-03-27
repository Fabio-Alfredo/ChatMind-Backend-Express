import { body } from "express-validator";

const registerValidator = [
    body("name")
        .exists()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long")
        .bail(),

    body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .bail(),

    body("password")
        .exists()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string")
        .matches(/^[A-Za-z0-9!@#$%&*+]{8,}$/)
        .withMessage("Password must be at least 8 characters long, contain a capital letter, a number and a special character")
        .bail()
]

const loginValidator = [
    body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .bail(),

    body("password")
        .exists()
        .withMessage("password is required")
        .isString()
        .withMessage("Password must be a string")
        .bail()
]

export {
    registerValidator,
    loginValidator  
}