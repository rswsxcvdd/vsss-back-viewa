const mongoose = require("mongoose")

const certificate_userSchema = new mongoose.Schema({
  certificate_id: {
    type: Number,
    required: false,
  },
  certificate_user_name: {
    type: String,
    required: false,
  },
  certificate_user_aadhar_no: {
    type: Number,
    required: false,
  },
  certificate_user_details: {
    type: String,
    required: false,
  },
  certificate_qr_code_link: {
    type: String,
    required: false,
  },
  certificate_barcode_details: {
    type: String,
    required:false,
  },
  certificate_pdf_link: {
    type: String,
    required: false,
  },
  is_deleted: {
    type: Number,
    required: false,
    defaultValue: 0
  },
},{
  versionKey: false,
  timestamps: true,
}
)

module.exports = mongoose.model("Certificate_user_details", certificate_userSchema)
