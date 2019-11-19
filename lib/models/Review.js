const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

photoSchema = new Schema({
  photo1: { type: String, trim: true },
  photo2: { type: String, trim: true },
  photo3: { type: String, trim: true },
  photo4: { type: String, trim: true },
  photo5: { type: String, trim: true },
  photo6: { type: String, trim: true }
});

reviewSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  artist: {
    type: String,
    trim: true,
    required: true,
    lowercase: true
  },
  text: {
    type: String,
    trim: true
  },
  photos: [photoSchema]
});
module.exports = mongoose.model("Review", reviewSchema);
