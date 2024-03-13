
const findUser = async (user_name, user_password) => {
    try {
        const User = require("../models/master_erp_user");
        const data = await User.find({ user_name: user_name, user_password: user_password }).lean().exec();
        if (data && data.length > 0) {
            return data;
        }
        else {
            return [];
        }
    }
    catch (err) {
        return false
    }
}

const get_certificate_type_list = async () => {
    try {
        const Certificate_details = require("../models/master_certificate_detail");
        const data = await Certificate_details.find().lean().exec();
        if (data && data.length > 0) {
            return data;
        }
        else {
            return [];
        }
    }
    catch (err) {
        console.log(err)
        return false
    }
}

const findAddhar = async (aadhar_no) => {
    try {
        const Certificate_user_details = require("../models/master_certificate_user_detail");
        const data = await Certificate_user_details.find({ certificate_user_aadhar_no: aadhar_no }).lean().exec();
        if (data && data.length > 0) {
            return data;
        }
        else {
            return [];
        }
    }
    catch (err) {
        return false
    }
}

const add_certificate = async (insert_payload) => {
    try {
        const Certificate_user_details = require("../models/master_certificate_user_detail");
        const data = await Certificate_user_details.create(insert_payload);
        return data
    }
    catch (err) {
        console.log(err)
        return false
    }
}

const get_certificate_list = async () => {
    try {
        const Certificate_user_details = require("../models/master_certificate_user_detail");
        const data = await Certificate_user_details.find().lean().exec();
        if (data && data.length > 0) {
            return data;
        }
        else {
            return [];
        }
    }
    catch (err) {
        return false
    }
}

const get_certificate_list_id = async (id) => {
    try {
        const Certificate_user_details = require("../models/master_certificate_user_detail");
        const data = await Certificate_user_details.find({ _id: id }).lean().exec();
        if (data && data.length > 0) {
            return data;
        }
        else {
            return [];
        }
    }
    catch (err) {
        return false
    }
}

const update_certificate = async (id, update_payload_data) => {
    try {
        const Certificate_user_details = require("../models/master_certificate_user_detail");
        const data = await Certificate_user_details.findByIdAndUpdate(id, update_payload_data)
        if (data && data.length > 0) {
            return data;
        }
        else {
            return [];
        }
    }
    catch (err) {
        return false
    }
}
module.exports = {
    findUser,
    get_certificate_type_list,
    findAddhar,
    add_certificate,
    get_certificate_list,
    get_certificate_list_id,
    update_certificate
}