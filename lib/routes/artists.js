const router = require("express").Router();
let Artist = require("../models/Artist.js");

router.route("/").get((req, res) => {
  Artist.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const bio = req.body.bio;
  const location = req.body.location;
  const reviews = [req.body.review];
  const image = req.body.image;

  const newArtist = new Artist({
    name,
    occupation,
    bio,
    location,
    reviews,
    image
  });
  newArtist
    .save()
    .then(() => res.json("Exercise Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
