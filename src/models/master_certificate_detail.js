const mongoose = require("mongoose")

const certificateSchema = new mongoose.Schema({
  certificate_id: {
    type: Number,
    required: true,
    unique: true,
  },
  certificate_type_id: {
    type: Number,
    required: true,
  },
  certificate_name: {
    type: String,
    required: true,
  },
  certificate_district: {
    type: String,
    required: true,
  },
  certificate_no: {
    type: Number,
    required: true,
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

module.exports = mongoose.model("Certificate_details", certificateSchema)