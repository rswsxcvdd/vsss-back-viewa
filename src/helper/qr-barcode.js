const QRCode = require("qrcode");
require("dotenv").config();
const cloudinary = require("cloudinary")
const JsBarcode = require('jsbarcode');
const fs = require("fs");
const { createCanvas } = require('canvas');
const qr_code_generator = async (qr_code_url) => {
    try {
        let url = await QRCode.toDataURL(qr_code_url)
        if (url) {
            return url;
        }
        else {
            return ""
        }
    }
    catch (err) {
        return false
    }
}

const randomArrayValue = async () => {
    try {
        const certificate_link = require("../model/certificate_link")(sequelize, DataTypes);
        const data = await certificate_link.findAll({
            where: {
                api_key: process.env.API_KEY,
                is_deleted: 0
            },
            raw: true,
            attributes: [
                "link_text"
            ]
        })
        if (data && data.length > 0) {
            for (let i in data) {
                const arr = JSON.parse(data[i]?.link_text);
                const random = Math.floor(Math.random() * arr.length);
                return arr[random];
            }
        }
        else {
            return ""
        }

    }
    catch (err) {
        return false;
    }
}

const barcode_generator = async (data, fileName) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRETE,
            secure: true
        });
        const barcodeOptions = {
            format: 'CODE128',
            displayValue: false
        };

        const canvas = createCanvas();
        JsBarcode(canvas, data?.toString(), barcodeOptions); // Invoke JsBarcode as a function

        const stream = canvas.createPNGStream();
        const out = fs.createWriteStream(fileName);

        stream.pipe(out);
        
        const result = await cloudinary.v2.uploader.upload(fileName);
        
        if (result) {
            fs.unlinkSync(fileName);
            return result?.secure_url
        }
        else {
            return ""
        }
    } catch (err) {
        console.log(err, "barcode");
        return false;
    }
}

module.exports = {
    qr_code_generator,
    randomArrayValue,
    barcode_generator
}
