const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  token: String,
  salt: String,
  hash: String,
  admin: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
