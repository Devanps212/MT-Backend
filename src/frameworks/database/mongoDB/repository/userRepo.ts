import userEntity from "../../../../entities/user";
import { userInterface } from "../../../../types/interface/userInterace";
import { userModelType } from "../model/userModel";

const userRepoistory = (model: userModelType)=>{
    const entity = new userEntity(model)

    const createUser = (userData: userInterface)=>{
        return entity.createUser(userData)
    }

    const findUser = (identifier : string)=>{
        return entity.findUser(identifier)
    }

    return {
        createUser,
        findUser
    }
}

export default userRepoistory
export type userRepoType = typeof userRepoistory