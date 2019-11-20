const express = require("express");
const app = express();
const cors = require("cors");
const parser = require("body-parser");
const passport = require("./lib/config/passport")();
// const passport = require("./lib/config/passport.js")();
const artistRouter = require("./lib/routes/artists.js");
const userRouter = require("./lib/routes/users.js");
const reviewRouter = require("./lib/routes/reviews.js");
app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(passport.initialize());
app.use("/artists", artistRouter);
app.use("/users", userRouter);
app.use("/reviews", reviewRouter);

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});
