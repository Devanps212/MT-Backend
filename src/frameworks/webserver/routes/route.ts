import { Application } from "express";
import userRoute from "./userRoute/userRoute";

const appRoute = (app: Application)=>{
    app.use('/', userRoute())

}

export default appRoute