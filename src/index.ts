import express from 'express'
import configExpress from './frameworks/webserver/expressConfig'
import connectDB from './frameworks/database/mongoDB/connections'
import appRoute from './frameworks/webserver/routes/route'

const app = express()
const PORT  = process.env.PORT || 3000

connectDB()

configExpress(app)

appRoute(app)


app.listen(PORT, ()=>{
    console.log(`listening to PORT ${PORT}`)
})