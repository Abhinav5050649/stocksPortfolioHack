const mongoose = require('mongoose');
const {Schema} = mongoose;

//Look at the api and figure out how the flow of data is taking place
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
    }
});

const shares = mongoose.model('stocks', stocksSchema);
module.exports = shares;