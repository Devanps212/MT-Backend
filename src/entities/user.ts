import mongoose from "mongoose";
import { userModelType } from "../frameworks/database/mongoDB/model/userModel";
import { userInterface } from "../types/interface/userInterace";
import { HttpStatus } from "../types/statusCodes";
import AppError from "../utils/appError";

export default class userEntity{
    
    private model : userModelType

    constructor(model: userModelType){
        this.model = model
    }
    
    public async createUser(userData: userInterface): Promise<{message: string} | null>{
        try{

            await this.model.create(userData)

            return {message: "user SignUp success"}
            
        }catch(error: any){
            throw new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async findUser(identifier:string):Promise<userInterface | {message: string} | null>{
        try{

            let query: any = {email: identifier}

            const checkValid = mongoose.Types.ObjectId.isValid(identifier)

            if(checkValid){
                query = {_id: identifier}
            }

            const user = await this.model.findOne(query)

            if(!user){
                return {message: "no user found"}
            }
            const User: userInterface = {
                _id: user._id.toString(), 
                name: user.name,
                email: user.email,
                password: user.password
            };

            return User
        }catch(error: any){
            throw new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}