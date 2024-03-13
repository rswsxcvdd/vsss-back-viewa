const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  user_mobile_no: {
    type: String,
    required: true,
  },
  user_password: {
    type: String,
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

module.exports = mongoose.model("User", userSchema)