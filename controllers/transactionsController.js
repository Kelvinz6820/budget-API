const express = require("express")
const transactions = express.Router()
const transactionsArray = require("../models/transactions")

transactions.get("/", (req,res) => {
    res.json({
        success: true,
        payload: transactionsArray,
    })
})

transactions.get("/:index", (req, res) =>{
    const index = req.params.index
    if (transactionsArray[index]) {
        res.json({
            success: true,
            payload: transactionsArray[index],
        })
    }
    else {
        res.redirect("/404")
    }
})
const validateTransactions = (req, res, next) => {
    const {date, name, amount, from} = req.body
    if (date === undefined || name === undefined || amount === undefined || from === undefined) {
        res.status (404).json({
            success: false,
            payload: "include all required"
        })
    }
    else {
        next()
    }
}
transactions.post("/", validateTransactions, (req, res) => {
    transactionsArray.push(req.body) 
    res.json({
        success: true,
        payload: transactionsArray[transactionsArray.length - 1]
    })
})
transactions.put("/:index", (req,res) => {
    const {index} = req.params;
    if (transactionsArray[index]) {
        transactionsArray[index] = req.body
        res.json({
            success: true,
            payload: transactionsArray[index]
        })
    }
    else {
        res.redirect("/404")
    }
})
transactions.delete("/:index", (req, res) => {
    const {index} = req.params
    if (transactionsArray[index]){
        const [item] = transactionsArray.splice(index, 1)
        res.json({
            success: true,
            payload: item,
        })
    }
    else {
        res.redirect("/404")
    }
})
module.exports = transactions