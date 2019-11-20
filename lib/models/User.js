const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    trim: true
  }
});
module.exports = mongoose.model("User", userSchema);
