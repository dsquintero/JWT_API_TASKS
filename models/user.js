const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: [true, 'Please enter a first_name'] },
  last_name: { type: String, required: [true, 'Please enter a last_name'] },
  email: { type: String, required: [true, 'Please enter a email'] },
  password: { type: String, required: [true, 'Please enter a status'] },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);