import { body } from "express-validator";

const registerValidator = [
    body("name")
        .exists()
        .isString()
        .matches(/^[A-Za-z]{3,}$/)
        .withMessage("Invalid name, must be at least 3 characters long and contain only letters")
        .bail(),

    body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .bail(),

    body("password")
        .exists()
        .isString()
        .matches(/^[A-Za-z0-9!@#$%&*+]{8,}$/)
        .withMessage("Password must be at least 8 characters long, contain a capital letter, a number and a special character")
        .bail()
]

const loginValidator = [
    body("email")
        .exists()
        .isEmail()
        .withMessage("Invalid data, email is required")
        .bail(),

    body("password")
        .exists()
        .isString()
        .withMessage("Invalid data, password is required")
        .bail()
]

export {
    registerValidator,
    loginValidator
}