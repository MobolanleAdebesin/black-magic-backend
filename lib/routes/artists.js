const router = require("express").Router();
let Artist = require("../models/Artist.js");

router.route("/").get((req, res) => {
  Artist.find()
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  Artist.create(req.body)
    .then(artist => {
      res.json(artist);
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});
router.route("/reviews/add").put((req, res) => {
  Artist.findOneAndUpdate(
    { reviews: req.params.name },
    {},
    {
      new: true
    }
  ).then(artist => {
    res.json(artist);
  });
});
module.exports = router;
