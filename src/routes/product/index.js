const express = require("express");

const certificateController = require("../../controller/productController");

const user_jwt_verify = require("../../middleware/authenticateJwt")

const router = express.Router();


router.post("/get-certificate-id",certificateController.getCertificateListBY_ID); 

module.exports = router;