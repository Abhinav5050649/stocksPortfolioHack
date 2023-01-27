const connectToMongo = require(`./db`);
const express = require(`express`);
var cors = require(`cors`);
const app = express();
const port = 5000;

connectToMongo();

app.use(express.json());
app.use(cors());


//To implement more