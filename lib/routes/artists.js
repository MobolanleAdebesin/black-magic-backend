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
router.route("/remove/:name").delete((req, res) => {
  Artist.findOneAndDelete({ name: req.params.name })
    .then(() => res.json("Artist Deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:name").put((req, res) => {
  Artist.findOneAndUpdate({ name: req.params.name }, req.body, {
    new: true
  })
    .then(artist => {
      res.json(artist);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:occupation").get((req, res) => {
  Artist.find({ occupation: req.params.occupation })
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json("Error " + err));
});

router.route("/:name").get((req, res) => {
  Artist.find({ name: req.params.name })
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json("Error " + err));
});
module.exports = router;
