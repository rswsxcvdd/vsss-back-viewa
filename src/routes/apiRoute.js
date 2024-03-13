const express = require("express");
// import diffrent route
const certificateRoute = require("./product/index");

const app = express();


app.use("/certificate",certificateRoute)

module.exports = app;

