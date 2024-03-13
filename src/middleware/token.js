// importing from npm package
const jwt = require("jsonwebtoken");
const apiResponse = require("../helper/apiResponse");
// importing env 
require('dotenv').config();
let jwtPayload = {};
let jwtData = {
    expiresIn: process.env.JWT_TIMEOUT_DURATION,
};
let secret = process.env.JWT_SECRET;

let jwtPayload_erp = {};
let jwtData_erp = {
    expiresIn: process.env.JWT_TIMEOUT_DURATION_ERP,
};
let secret_erp = process.env.JWT_SECRET_ERP;

// generate token
function generateToken(data) {
    jwtPayload = { ...data }
    let token = jwt.sign(jwtPayload, secret, jwtData);
    return token;
}

// generate token
function generateTokenERP(data) {
    jwtPayload_erp = { ...data }
    let token = jwt.sign(jwtPayload_erp, secret_erp, jwtData_erp);
    return token;
}

// generate token
function verifyToken(token) {
    let user = jwt.verify(token, secret, (err, user) => {
        if (err) {
            return false;
        }
        return user;
    })

    return user;
}

const userVerify = (req, res, next) => {
    try {
        const authHeader = req?.headers?.authorization;

        if (!authHeader)
            return apiResponse.mainResponse(res, "failed", "Token is missing", []);

        const token = authHeader.split(" ")[1];

        let user = verifyToken(token);

        if (!user)
            return apiResponse.mainResponse(res, "failed", "Unauthorized.", []);

        req.user = user;

        next();
    }
    catch (err) {
        return apiResponse.mainResponse(res, "failed", "Authentication failed.", []);
    }
}

const verifyErpUser = (req, res, next) => {
    try {
        const authHeader = req?.headers?.authorization;

        if (!authHeader)
            return apiResponse.mainResponse(res, "failed", "Token is missing", []);

        const token = authHeader.split(" ")[1];

        let user = verifyToken(token);

        if (!user)
            return apiResponse.mainResponse(res, "failed", "Unauthorized.", []);

        req.user = user;

        next();
    }
    catch (err) {
        console.log(err)
        //return apiResponse.mainResponse(res,"failed","Authentication failed.",[]);
    }
}


module.exports = {
    generateToken,
    verifyToken,
    userVerify,
    generateTokenERP,
    verifyErpUser
}