import { userInterface } from "../../types/interface/userInterace"
import { userRepoInterfaceType } from "../appInterface/userRepointerface"

export const createUser = async(userData: userInterface, userRepoInterface: ReturnType<userRepoInterfaceType>)=>{

    const user = await userRepoInterface.createUser(userData)

    return user
}


export const findUser = async(identifier: string, userRepoInterface: ReturnType<userRepoInterfaceType>)=>{

    const user = await userRepoInterface.findUser(identifier)

    return user
}