// import mongoose
const mongoose = require("mongoose");
const dotenv = require('dotenv')
require('dotenv').config();


// create connect function to connect to database
const connect = async () => {
  try {
    return mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gra5jjk.mongodb.net/food`);
  }
  catch (err) {
    return false;
  }
};

//exporting the connect function in index.js
module.exports = connect;
