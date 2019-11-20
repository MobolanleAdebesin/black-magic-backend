const router = require("express").Router();
let User = require("../models/User.js");

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

router.route("/remove/:id").delete((req, res) =>{
    User.findOneAndDelete({_id: req.params.id}).then()
})
module.exports = router;
