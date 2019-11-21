const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

const string = {
  type: String,
  trim: true
};

artistSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  occupation: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  bio: string,
  location: string,
  image: string
});

module.exports = mongoose.model("Artist", artistSchema);
