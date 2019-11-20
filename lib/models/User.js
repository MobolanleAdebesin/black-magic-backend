const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String
  }
});
module.exports = mongoose.model("User", userSchema);
