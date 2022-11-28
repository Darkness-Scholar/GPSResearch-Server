import express from "express"
const Test = express.Router()

Test.get(`/`, async (req, res) => {

    return res.send(`TEST`)
})

export default Test