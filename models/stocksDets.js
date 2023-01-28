const mongoose = require('mongoose');
const {Schema} = mongoose;

//Added stockBuyingPrice and stockSellingPrice
const stocksSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    tickerSymbol: {
        type: String,
        required: true,
        unique: true,
    },
    stockName:{
        type: String,
        required: true,
    },
    stockBuyingPrice: {
        type: Number,
        required: true,
    },
    stockSellingPrice: {
        type: Number,
        required: true,
        default: 0.00,
    },
    status: {
        type: String,
        required: true,
        default: "B",
    },
    buyingDate: {
        type: Date,
        default: Date.now(),
    },
    sellingDate: {
        type: Date,
        default: Date.now(),
    },
});

const stockS = mongoose.model('stocks', stocksSchema);
module.exports = stockS;