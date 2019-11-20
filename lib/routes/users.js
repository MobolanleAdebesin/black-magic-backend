const router = require("express").Router();
let User = require("../models/User.js");
const jwt = require("jwt-simple");
const passport = require("../config/passport.js");
const config = require("../config/config.js");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  User.create(req.body)
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//Currently, updating and deleting user by id, may want to change this to username
router.route("/remove/:id").delete((req, res) => {
  User.findOneAndDelete({ _id: req.params.id }).then();
});

router.route("/update/:id").put((req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  })
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
