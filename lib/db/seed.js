const Artist = require("../models/Artist.js");
const artistRaw = require("./ArtistsRaw.json");

const artistMap = artistRaw.map(item => {
  const artist = {};
  artist.name = item.name;
  artist.occupation = item.occupation;
  artist.bio = item.bio;
  artist.location = item.location;
  artist.reviews = item.reviews;
  artist.image = item.image;
  return artist;
});

console.log(artistMap);

Artist.remove({})
  .then(() => {
    Artist.create(artistMap)
      .then(artist => {
        console.log(artist);
      })
      .then(() => {
        process.exit();
      });
  })
  .catch(err => console.log(err));
