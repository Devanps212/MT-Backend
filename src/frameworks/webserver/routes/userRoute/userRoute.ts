import express from 'express'
import userRepoistory from "../../../database/mongoDB/repository/userRepo";
import userRepoInterface from "../../../../app/appInterface/userRepointerface";
import userModel from "../../../database/mongoDB/model/userModel";
import authService from "../../../../app/service/authService";
import userController from "../../../../adapter/controller/userController";
import { signUpValidator, loginValidator } from '../../../services/validator';


const userRoute = ()=>{
    const controller = userController(userRepoInterface, userRepoistory, userModel, authService)

    const router = express.Router()

    router.post('/login', loginValidator, controller.login)
    router.post('/signUp', signUpValidator, controller.SignUp)

    return router

}

export default userRoute