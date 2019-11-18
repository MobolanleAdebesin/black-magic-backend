const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

const string = {
  type: String,
  trim: true
};

photoSchema = new Schema({
  photo1: string,
  photo2: string,
  photo3: string,
  photo4: string,
  photo5: string,
  photo6: string
});
reviewSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  text: string,
  photo: photoSchema
});

artistSchema = new Schema({
  name: string,
  occupation: string,
  bio: string,
  location: string,
  reviews: [reviewSchema],
  image: string
});

module.exports = mongoose.model("Artist", artistSchema);
