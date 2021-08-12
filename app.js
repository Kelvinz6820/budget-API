const express = require("express")
const transactionsController = require("./controllers/transactionsController")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())



app.get("/", (req,res) => {
    res.send("Welcome to my budgeting app!")
})

app.use("/transactions", transactionsController)
app.use("*", (req,res) => {
    res.status(404).json({
        success: false,
        payload: "Not found"
    })
})

module.exports = app;