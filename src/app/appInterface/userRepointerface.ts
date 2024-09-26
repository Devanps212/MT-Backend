import { userRepoType } from "../../frameworks/database/mongoDB/repository/userRepo";
import { userInterface } from "../../types/interface/userInterace";

const userRepoInterface = (userRepo: ReturnType<userRepoType>)=>{
    const createUser = (userData: userInterface)=>{
        return userRepo.createUser(userData)
    }

    const findUser = (identifier: string)=>{
        return userRepo.findUser(identifier)
    }

    return{
        createUser,
        findUser
    }
}

export default userRepoInterface
export type userRepoInterfaceType = typeof userRepoInterface