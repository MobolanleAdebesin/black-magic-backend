const express = require("express");
const app = express();
const cors = require("cors");

const Artist = require("./lib/models/Artist.js");
const parser = require("body-parser");
app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get("/", function(req, res) {
  Artist.find({}).then(artists => {
    res.json(artists);
  });
});

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});
