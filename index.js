import * as dotenv from 'dotenv'; dotenv.config()
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { UserModel } from "./model/index.js"
import User from "./routes/User.js"
import Test from "./routes/Test.js"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_DATABASE)
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get(`/`, (req, res) => {
    res.send(`Hello world`)
})

const middleware = async (req, res, next) => {
    try {
        let { auth, lat, long } = req.headers
        let user = await UserModel.findOne({ username: auth })
        console.log(`Người dùng đang hoạt động ở vị trí ${lat} : ${long}`)
        if (!user) throw new Error(JSON.stringify(
            { code: 401, msg: "Unauthorized" }
        ));

        user.position.lat = lat; user.position.long = long
        
        await user.save()
        next()
    } catch (error) {
        let { code, msg } = JSON.parse(error.message)
        return res.status(code).json(msg)
    }
}

app.use("/user", User)
app.use("/test", middleware, Test)

app.listen(8888, () => console.log(`App is running on port 8888`))