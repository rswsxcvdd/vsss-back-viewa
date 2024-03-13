const Usejr = require("../models/master_erp_user");
const apiResponse = require("../helper/apiResponse");
const { body, validationResult } = require("express-validator");
const productService = require("../servicess/product.service");
const token_service = require("../middleware/token");
const { qr_code_generator, barcode_generator } = require("../helper/qr-barcode");
const { uploadPDF } = require("../helper/cloudinary");
const html_to_pdf = require("html-pdf-node");
const ejs = require("ejs");
const path = require("path")
require("dotenv").config();

const getCertificateListBY_ID = [
    body("certificate_user_id").isLength({ min: 1, max: 100 }).trim().withMessage("certificate_user_id must be specified."),
    async (req, res) => {
        try {
            let request = req?.body;
            let id = (request?._id);
            const list = await productService.get_certificate_list_id(id);
            const expriy_date = process.env.EXPIRY_DATE;
            const  plan_expiry = checkPlanExpiry(expriy_date);
            if (list && list.length > 0 && plan_expiry===1) {
                for (let i = 0; i < list.length; i++) {
                    list[i].certificate_id = (list[i].certificate_id);
                    let parse_data = list[i].certificate_user_details ? JSON.parse(list[i].certificate_user_details) : "";
                    let obj = list[i];
                    obj.name_of_decease = parse_data?.name_of_decease;
                    obj.name_of_decease_marathi = parse_data?.name_of_decease_marathi;
                    obj.sex = parse_data?.sex;
                    obj.sex_marathi = parse_data?.sex_marathi;
                    obj.aadhar_no = parse_data?.aadhar_no;
                    obj.date_of_death = parse_data?.date_of_death;
                    obj.date_of_death_inword = parse_data?.date_of_death_inword;
                    obj.place_of_death = parse_data?.place_of_death;
                    obj.place_of_death_marathi = parse_data?.place_of_death_marathi;
                    obj.age_of_decase = parse_data?.age_of_decase;
                    obj.name_of_mother = parse_data?.name_of_mother;
                    obj.name_of_mother_marathi = parse_data?.name_of_mother_marathi;
                    obj.name_of_father = parse_data?.name_of_father;
                    obj.name_of_father_marathi = parse_data?.name_of_father_marathi;
                    obj.name_of_wife_husbund = parse_data?.name_of_wife_husbund;
                    obj.name_of_wife_husbund_marathi = parse_data?.name_of_wife_husbund_marathi;
                    obj.mother_aadhar_no = parse_data?.mother_aadhar_no;
                    obj.father_aadhar_no = parse_data?.father_aadhar_no;
                    obj.wife_aadhar_no = parse_data?.wife_aadhar_no;
                    obj.address_of_deceased = parse_data?.address_of_deceased;
                    obj.address_of_deceased_marathi = parse_data?.address_of_deceased_marathi;
                    obj.permenant_address_of_deceased = parse_data?.permenant_address_of_deceased;
                    obj.permenant_address_of_deceased_marathi = parse_data?.permenant_address_of_deceased_marathi;
                    obj.registration_number = parse_data?.registration_number;
                    obj.date_of_registration = parse_data?.date_of_registration;
                    obj.date_of_issue = parse_data?.date_of_issue;
                    obj.updated_on = parse_data?.updated_on;
                    obj.remark = parse_data?.remark;
                    obj.gram_panchayat_name = parse_data?.gram_panchayat_name;
                    obj.gram_panchayat_name_marathi = parse_data?.gram_panchayat_name_marathi;
                    obj.taluka_name = parse_data?.taluka_name;
                    obj.taluka_name_marathi = parse_data?.taluka_name_marathi;
                    obj.district_name = parse_data?.district_name;
                    obj.district_name_marathi = parse_data?.district_name_marathi;
                    obj.state_name = parse_data?.state_name;
                    obj.state_name_marathi = parse_data?.state_name_marathi;
                    obj.qr_url = parse_data?.certificate_qr_code_link ? parse_data?.certificate_qr_code_link : "";
                    obj.barcode_url = parse_data?.certificate_barcode_code_link ? parse_data?.certificate_barcode_code_link : "";
                    delete list[i]?.certificate_user_details;
                }
                return apiResponse.mainResponse(
                    res,
                    "success",
                    "Certificate list get successfully",
                    list
                );
            } else {
                return apiResponse.mainResponse(
                    res,
                    "failed",
                    "Unable to get certificate list",
                    list
                );
            }
        } catch (err) {
            return apiResponse.mainResponse(
                res,
                "failed",
                "Unable to get certificate list catch block",
                err
            );
        }
    },
];

function checkPlanExpiry(date){
    let cuurent_date = new Date()?.toISOString()?.split("T",1)[0];
    if(date<=cuurent_date){
       return 0
    }
    else{
        return 1
    }
}
module.exports = {
    getCertificateListBY_ID
}