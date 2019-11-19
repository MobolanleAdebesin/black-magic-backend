const express = require("express");
const app = express();
const cors = require("cors");
const Artist = require("./lib/models/Artist.js");
const User = require("./lib/models/User.js");
const Review = require("./lib/models/Review.js");
const parser = require("body-parser");
const artistRouter = require("./lib/routes/artists.js");
const userRouter = require("./lib/routes/users.js");
app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get("/", function(req, res) {
  Artist.find({}).then(artists => {
    res.json(artists);
  });
});

app.get("/reviews", function(req, res) {
  Review.find({}).then(user => {
    res.json(user);
  });
});

app.use("/artists", artistRouter);
app.use("/users", userRouter);

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});
