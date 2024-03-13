const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const erpRoute = require("../src/routes/apiRoute");

// import database 
const connect = require("../src/config/connect");

const app = express();
app.locals.moment = require('moment');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

// import global route

app.use("/api/v1/erp",erpRoute);

const jsonParser = bodyParser.json();
app.get('*', jsonParser, function (req, res) {
    res.send('404 Page');
});


const PORT = process.env.PORT;

app.listen(PORT, async () => {
    try {
        let connect_db =  await connect();
        console.log(`app is running on http://localhost:${PORT}/`)
    }
    catch (err) {
        console.log(err, "error while connecting")
    }
})