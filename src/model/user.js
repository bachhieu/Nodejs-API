const mongoose = require("mongoose");
const { Schema } = mongoose;
const ROLES = {
  ADMIN:'ADMIN',
  VIEWER:'VIEWER',
}
const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  fullname: { type: String, default: null },
  email: { type: String, default: null},
  password: { type: String },
  gender: { type: String },
  token: { type: String },
  refresh_token: { type: String},
  books:[{ type: Schema.Types.ObjectId, ref: 'books' }],
  role: { type: String, default: ROLES.VIEWER},
  avatar: { type: String, default:'http://genk.mediacdn.vn/2016/best-photos-2016-natgeo-national-geographic-7-5846f70467192-880-1481173142742.jpg'},
  tel: { type: Number,}
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);