// send otp on mobile 
const apiResponse = require("../helper/apiResponse");
require("dotenv").config();
const sequelize = require("../config/db");
const { DataTypes, Op } = require("sequelize");
const nodemailer = require("nodemailer")

const sendMobileOtp = async (message_body, message_receiver) => {
    try {
        const accountSid = process.env.TWILIO_SS_ID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

        let data = await client.messages.create({
            body: message_body,
            from: process.env.TWILIO_SENDER_MOBILE,
            to: "+91" + message_receiver,
        }).then(message => console.log(message_body))

        return data;
    }
    catch (err) {
        return err
    }
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: process.env.EMAIL_PORT,
    secure: false, // upgrade later with STARTTLS 587 -- false || 465 --- true
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
    },
});

const sendEmail = async function (to, subject, text, html, attachments) {
    try {
        // send mail with defined transport object
        let rs = await transporter.sendMail({
            from: {
                name: "Sunil Sarsande",
                address: process.env.EMAIL_USER
            },
            to: to,
            subject: subject,
            text: text,
            html: html,
            attachments: attachments
        });
        return rs;
    }
    catch (err) {
        return err
    }
};

const updateOtp = async (update_otp) => {
    try {
        const user_otp_detail = require("../model/user_otp_detail")(sequelize, DataTypes);
        let data = user_otp_detail.create(update_otp);
        return data;
    }
    catch (err) {
        return false
    }
}

const findOtp = async (otp_medium, user_otp, type) => {
    try {
        const user_otp_detail = require("../model/user_otp_detail")(sequelize, DataTypes);
        let data = [];
        if (type === "mobile") {
            data = await user_otp_detail.findAll({
                where: {
                    user_mobile_no: otp_medium,
                    mobile_otp: user_otp,
                    is_deleted: 0,
                    status: 101,
                    vendor_id: process.env.VENDOR_ID
                },
                raw: true,
                attributes: [
                    "user_mobile_no",
                    "mobile_otp",
                ]
            })
        }
        else if (type === "email") {
            data = await user_otp_detail.findAll({
                where: {
                    user_email_id: otp_medium,
                    email_otp: user_otp,
                    is_deleted: 0,
                    status: 101,
                    vendor_id: process.env.VENDOR_ID
                },
                raw: true,
                attributes: [
                    "user_email_id",
                    "email_otp",
                ]
            })
        }

        if (data && data.length > 0) {
            return data
        }
        else {
            return [];
        }
    }
    catch (err) {
        return false
    }
}

function generateOTP() {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }
    return otp;
}

module.exports = {
    sendMobileOtp,
    generateOTP,
    updateOtp,
    findOtp,
    sendEmail
}