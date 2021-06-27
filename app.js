const express = require("express")
const cors = require("cors")

const app = express()
const cors = cors()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to the budgeting app!")

})

module.export = app;