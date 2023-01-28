const connectToMongo = require(`./db`);
const express = require(`express`);
var cors = require(`cors`);
const app = express();
const router = require('./routes/apiRoutes');
const port = 5000;

connectToMongo();

app.use(express.json());
app.use(cors());


app.use('/api', router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
