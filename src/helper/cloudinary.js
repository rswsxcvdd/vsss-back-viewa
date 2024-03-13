const cloudinary = require("cloudinary")
require("dotenv").config();

const uploadImageOn_cloudinary = async (path) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRETE,
            secure: true
        });

        const result = cloudinary.v2.uploader.upload(path);
        return result;
    }
    catch (err) {
        return err;
    }
}
async function uploadPDF(file_path, public_id) {
    try {

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRETE,
            secure: true
        });
        const result = await cloudinary.uploader.upload(file_path, {
            resource_type: 'raw',
            public_id: public_id,
            format: 'pdf'
        });
        if (result) {
            return result
        }
        else {
            return ""
        }
    } catch (error) {
        console.log('Error uploading PDF:', error.message);
    }
}
module.exports = {
    uploadImageOn_cloudinary,
    uploadPDF
}