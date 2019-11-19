const Artist = require("../models/Artist.js");
const artistRaw = require("./ArtistsRaw.json");

const artistMap = artistRaw.map(item => {
  const artist = {};
  artist.name = item.name;
  artist.occupation = item.occupation;
  artist.bio = item.bio;
  artist.location = item.location;
  artist.image = item.image;
  return artist;
});

console.log(artistMap);

Artist.remove({})
  .then(() => {
    Artist.create(artistMap).then(artist => {
      console.log(artist);
    });
  })
  .catch(err => console.log(err));

const User = require("../models/User.js");
const userRaw = require("./UsersRaw.json");

const userMap = userRaw.map(item => {
  const user = {};
  user.username = item.username;
  return user;
});

console.log(userMap);
User.remove({})
  .then(() => {
    User.create(userMap).then(user => {
      console.log(user);
    });
  })
  .catch(err => {
    console.log(err);
  });

const Review = require("../models/Review.js");
const reviewRaw = require("./ReviewsRaw.json");

const reviewMap = reviewRaw.map(item => {
  const review = {};
  review.username = item.username;
  review.artist = item.artist;
  review.text = item.text;
  review.photos = item.photos;
  return review;
});

console.log(reviewMap);
Review.remove({})
  .then(() => {
    Review.create(reviewMap)
      .then(review => {
        console.log(review);
      })
      .then(() => {
        process.exit();
      });
  })
  .catch(err => {
    console.log(err);
  });
