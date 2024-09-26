import { body } from "express-validator";

export const signUpValidator =[
    body('name')
    .notEmpty()
    .withMessage('Please submit a valid name')
    .isLength({min: 5})
    .withMessage('Name should have atleast 5 characters'),

    body('email')
    .isEmail()
    .withMessage("Please submit a valid email"),

    body('password')
    .isLength({min: 6})
    .withMessage("Password must have atleast minimum 6 characters")
    .notEmpty()
    .withMessage("Please submit a valid password")
]

export const loginValidator =[
    body('email')
    .isEmail()
    .withMessage("Please submit a valid email"),
    
    body('password')
    .isLength({min: 6})
    .withMessage("Password must have atleast minimum 6 characters")
    .notEmpty()
    .withMessage("Please submit a valid password")
]