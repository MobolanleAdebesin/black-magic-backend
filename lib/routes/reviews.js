const router = require("express").Router();
let Review = require("../models/Review.js");

router.route("/").get((req, res) => {
  Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  Review.create(req.body)
    .then(() => res.json("Review Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/remove/:id").delete((req, res) => {
  Review.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json("Review Deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) => {
  Review.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  })
    .then(review => {
      res.json(review);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:occupation").get((req, res) => {
  Review.find({ occupation: req.params.occupation })
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
