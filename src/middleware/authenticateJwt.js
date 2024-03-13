const apiResponse = require("../helper/apiResponse");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const authenticateJWT = (privilege_key) => {
	
	return async (req, res, next) => {
		let errorSend = true;
		try {
			const authHeader = req.headers.authorization;
			const secret = process.env.JWT_SECRET_ERP;
			let is_admin = false;
			let role_id = null;

			if (authHeader) {
				const token = authHeader?.split(" ")[1];
				jwt.verify(token, secret, (err, user) => {
					if (err) {
						errorSend = false;
						return apiResponse.unauthorizedResponse(res, "Unauthorized Error.")
					}
					else {
						req.user = user;
						user_data = user;
						next();
					}
				})
			}
			else {
				apiResponse.unauthorizedResponse(res, "Unauthorized Error.");
			}

		} catch (err) {
			if (errorSend) {
				return apiResponse.unauthorizedResponse(res, "Unauthorized Error.");
			}
		}
	};
};

module.exports = authenticateJWT;