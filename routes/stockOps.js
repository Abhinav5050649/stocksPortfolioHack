const express = require(`express`);
const {body, validationResult}  = require(`express-validator`);
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();
const stockS = require(`../models/stocksDets`);

//Mainly, we need three routes.
/*
    1) get method to get all stock objects stored in db
    2) post method to add new stock to db
    3) Delete method to delete stocks from db 
*/

//get method
router.get(`/fetchAllStocks`, fetchUser, async(req, res) => {
    try{
        const stocks = await stockS.find({user: req.user.id});
        res.json(stocks);
    }   catch(error)    {
        console.error(error);
        res.status(500).send(`Internal Server Error!!!`);
    }
});

//Add Stock
router.post(`/addStock`, fetchUser, 
    [
        body("tickerSymbol").exists(),
        body("stockName").exists(),
    ],
    async(req, res) => {
    
        try{
            const {tickerSymbol, stockName} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty())
            {   
                return res.status(400).json({errors: errors.array()});
            }

            const stock = new stockS({
                user: req.user.id,
                tickerSymbol,
                stockName, 
            });

            const saveStock = await stock.save();
            res.json(saveStock);

        }   catch(error)    {
            console.error(error);
            res.status(500).send(`Internal Server Error!!!`);
        }
    }
);

router.delete(`/deleteStock/:id`, fetchUser, async(req, res) => {
    try{
        
    }   catch (error)   {
        console.error(error);
        res.status(500).send(`Internal SErver Error!!!`);
    }
})