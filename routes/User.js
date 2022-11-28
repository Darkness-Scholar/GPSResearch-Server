import axios from "axios"
import express from "express"
import { UserModel } from "../model/index.js"
const User = express.Router()

User.post(`/signup`, async (req, res) => {

    try {
        const { username, password } = req.body
        console.log(username, password)
        if (!username || !password) throw new Error(JSON.stringify(
            { code: 400, msg: "Param: <username:string> and <password:string> are required" }
        ))
        await UserModel.create({
            username, password
        })
        return res.status(200).json(`Success`)
    } catch (error) {
        let { code, msg } = JSON.parse(error.message)
        res.status(code).json(msg)
    }
})

User.post("/signin", async (req, res) => {
    try {
        let { username, password, lat, long } = req.body
        if (!username || !password) throw new Error(JSON.stringify(
            { code: 400, msg: "Param: <username:string> and <password:string> are required" }
        ))
        let user = await UserModel.findOne({ username, password })
        if (!user) throw new Error(JSON.stringify(
            { code: 400, msg: "Param: <username:string> or <password:string> are wrong" }
        )); if (lat && long) {
            user.position.lat = `${lat}`
            user.position.long = `${long}`
        }
        await user.save()
        return res.status(200).json({ auth: username, isLogin: true })
    } catch (error) {
        let { code, msg } = JSON.parse(error.message)
        return res.status(code).json(msg)
    }
})

export default User