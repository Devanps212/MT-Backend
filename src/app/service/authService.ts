import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userPayload } from '../../types/interface/userInterace'
import AppError from '../../utils/appError'
import { HttpStatus } from '../../types/statusCodes'

const authService = ()=>{
    const generateToken = (payload:userPayload)=>{
        try{
            const key  = process.env.SECRET_KEY
            const token = jwt.sign(payload, key!, {expiresIn:"2d"})

            return token
        }catch(error: any){
            throw new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    const verifyToken = (token: string)=>{
        try{
            const key  = process.env.SECRET_KEY
            const verify = jwt.verify(token, key!)

            return verify
        }catch(error: any){
            throw new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    const hashPassword = async(password: string)=>{
        try{
            const hashP = await bcrypt.hash(password, 10)
            return hashP
        }catch(error: any){
            throw new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    const decodePassword = async(password: string, userPassword: string)=>{
        try{
            const decode = await bcrypt.compare(password, userPassword)
            return decode
        }catch(error: any){
            throw new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    return {
        generateToken,
        verifyToken,
        hashPassword,
        decodePassword
    }

}

export default authService
export type authServiceType = typeof authService