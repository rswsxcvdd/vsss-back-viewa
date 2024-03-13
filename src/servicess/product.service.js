
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
module.exports = {
    get_certificate_list_id,
}