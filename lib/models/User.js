const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  }
  //,
  //   email: { type: String, match: /\S+@\S+\.\S+/ },
  //   password: string
  //
});
module.exports = mongoose.model("User", userSchema);
