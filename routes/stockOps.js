const express = require("express");
const {body, validationResult}  = require("express-validator");
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();
const stockS = require("../models/stocksDets");
const { findOneAndUpdate } = require("../models/user");

//Mainly, we need three routes.
/*
    1) get method to get all stock objects stored in db
    2) post method to add new stock to db
    3) Update method to delete stocks from db 
*/

//View Stocks
router.get("/fetchAllStocks", fetchUser, async(req, res) => {
    try{
        const stocks = await stockS.find({user: req.user.id});
        res.json(stocks);
    }   catch(error)    {
        console.error(error);
        res.status(500).send("Internal Server Error!!!");
    }
});

//Add Stock
router.post("/addStock", fetchUser, 
    [
        body("tickerSymbol").exists(),
        body("stockName").exists(),
        body("status").exists(),
    ],
    async(req, res) => {
    
        try{
            const {tickerSymbol, stockName, status} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty())
            {   
                return res.status(400).json({errors: errors.array()});
            }

            const stock = new stockS({
                user: req.user.id,
                tickerSymbol,
                stockName, 
                status,
                buyingDate: Date.now,
            });

            const saveStock = await stock.save();
            res.json(saveStock);

        }   catch(error)    {
            console.error(error);
            res.status(500).send("Internal Server Error!!!");
        }
    }
);

//Update Stocks
router.put("/updateStock/:id", fetchUser, async(req, res) => {
    try{
        const {tickerSymbol, stockName, status} = req.body;

        const newStock = {};

        if (tickerSymbol)   newStock.tickerSymbol = tickerSymbol;

        if (stockName)  newStock.stockName = stockName;

        if (status === "B")
        {
            newStock.status = status;
            newStock.buyingDate = Date.now;
        }
        else if (status === "S")
        {
            newStock.status = status;
            newStock.sellingDate = Date.now;
        }

        let stock = await stockS.findById(req.params.id);

        if (!stock)
        {
            return res.status(404).send("Not Found!!!");
        }

        if (stock.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed!!!");
        }

        stock = await findOneAndUpdate(
            req.params.id,
            {$set: newStock},
            {new: true}
        );

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error!!!");
    }
});

module.exports = router;