import express from "express"
import { UserModel } from "../model"
const Position = express.Router()

// Tìm người trong phạm vi R
// Truyền vào lat, long, server sẽ tìm những user mà lat' và long' của user đó < lat + r và long + r
// https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=03c48dae07364cabb7f121d8c1519492&no_annotations=1&language=en
Position.post(`/around`, async (req, res) => {
    try {
        let { lat, long } = req.body
        // Find user

    } catch (error) {

    }
})

export default Position