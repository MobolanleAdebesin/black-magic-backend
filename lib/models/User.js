const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;
const string = {
  type: String,
  trim: true
};

userSchema = new Schema({
  username: string,
  email: { type: String, match: /\S+@\S+\.\S+/ },
  password: string
});
module.exports = mongoose.model("User", userSchema);
