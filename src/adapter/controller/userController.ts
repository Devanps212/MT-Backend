import { Request, Response } from "express";
import { userRepoInterfaceType } from "../../app/appInterface/userRepointerface";
import {userRepoType} from "../../frameworks/database/mongoDB/repository/userRepo";
import { userModelType } from "../../frameworks/database/mongoDB/model/userModel";
import expressAsyncHandler from "express-async-handler";
import { createUser, findUser } from "../../app/useCase/user";
import { HttpStatus } from "../../types/statusCodes";
import { authServiceType } from "../../app/service/authService";
import { userInterface } from "../../types/interface/userInterace";
import { validationResult } from "express-validator";

const userController = (
    userInterface: userRepoInterfaceType,
    userRepo: userRepoType,
    userModel: userModelType,
    authService: authServiceType
)=>{
    const userService = userInterface(userRepo(userModel))
    const { hashPassword, generateToken, decodePassword, verifyToken} = authService()


    const SignUp = expressAsyncHandler(
        async(req: Request, res: Response)=>{

            const error = validationResult(req)
            if(!error.isEmpty()){
                res.status(HttpStatus.CONFLICT).json({message: error.array()})
                return
            }

            const {name, email, password} = req.body
            const userExist = await findUser(email, userService)
            if(userExist && !('message' in userExist)){
                res.status(HttpStatus.CONFLICT).json({message:"user Already exist"})
                return
            }

            const hashP = await hashPassword(password)

            const signUp : { message: string } | null = await createUser({name, email, password: hashP}, userService)
            if(signUp && signUp.message)res.status(HttpStatus.OK).json(signUp.message)
        }
    )

    const login = async(req: Request, res: Response)=>{

        const error = validationResult(req)
        if(!error.isEmpty()){
            res.status(HttpStatus.CONFLICT).json({message: error.array()})
            return
        }

        const { email, password } = req.body

        const userExist : userInterface | {message: string} | null = await findUser(email, userService)

        if(!userExist || 'message' in userExist){
            res.status(HttpStatus.UNAUTHORIZED).json({message:"User not found. Please SignUp first"})
            return
        }

        const isPassCorrect = await decodePassword(password, userExist.password)     
        if(!isPassCorrect){
            res.status(HttpStatus.CONFLICT).json({message:"Password incorrect"})
        }

        const token = generateToken({role: "user", _id: userExist._id!})

        res.status(200).json({message:"Token generated successfully", token})
        
    }

    return{
        SignUp,
        login
    }
}

export default userController