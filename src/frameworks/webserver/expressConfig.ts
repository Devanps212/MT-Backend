import express, { Application, NextFunction } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()



const configExpress = (app : Application)=>{

    const options = {
        origin: "*",
        method:["GET", "POST", "PATCH", "PUT"],
        exposedHeaders: [
            "Cross-Origin-Opener-Policy",
            "Cross-Origin-Resource-Policy",
            "Access-Control-Allow-Origin",
          ],
    }

    app.use(morgan("dev"))
    app.use(cors(options))
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
}

export default configExpress