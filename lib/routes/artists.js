const router = require("express").Router();
let Artist = require("../models/Artist.js");
//npx apidoc ./ -e node_modules -o ./docs

/**
 * @apiDefine SuccessRes
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 *  {
 * "name": "jean-michel basquiat",
 * "occupation": "artist",
 * "bio": "An artist of Hatian and Puerto Rican descent who elevated Grafitti to the  NY gallery scene.",
 * "location": "New York, NY",
 * "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb9PYkfw41ylyRhFKT1cn8iWJqIHTLuVAc7mcUKGmZDtjrPb-ieg&s"
 * }
 */

/**
 * @api {get} /artists Get Artist List
 * @apiName Artists
 * @apiGroup Artists
 */

router.route("/").get((req, res) => {
  Artist.find()
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json("Error: " + err));
});

/**
 * @api {get} /artists/:name Get Single Artist
 * @apiName ArtistProfile
 * @apiGroup Artists
 *
 * @apiParam {String} name Artist name
 *
 * @apiSuccess {String} name Artist name
 * @apiSuccess {String} occupation Artist occupation
 * @apiSuccess {String} bio Artist bio
 * @apiSuccess {String} location Artist location
 * @apiSuccess {String} image Artist image url
 *
 * @apiUse SuccessRes
 */

router.route("/name/:name").get((req, res) => {
  Artist.find({ name: req.params.name })
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json("Error " + err));
});

/**
 * @api {post} /artists/add Add Artist
 * @apiName AddArtist
 * @apiGroup Artists
 *
 * @apiParam {String} name Artist name
 * @apiParam {String} occupation Artist occupation, must be musician, artist, or beauty
 * @apiParam {String} bio Artist bio
 * @apiParam {String} location Artist location
 * @apiParam {String} imageUrl Artist image
 *
 * @apiParamExample Examply Body:
 * {
 * "name": "jean-michel basquiat",
 * "occupation": "artist",
 * "bio": "An artist of Hatian and Puerto Rican descent who responsible for elevating graffiti to the New York gallery scene.",
 * "location": "New York",
 * "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb9PYkfw41ylyRhFKT1cn8iWJqIHTLuVAc7mcUKGmZDtjrPb-ieg&s"
 *  }
 *
 * @apiSuccess {String} name Artist name
 * @apiSuccess {String} occupation Artist occupation
 * @apiSuccess {String} bio Artist bio
 * @apiSuccess {String} location Artist location
 * @apiSuccess {String} image Artist image url
 *
 * @apiUse SuccessRes
 */

router.route("/add").post((req, res) => {
  Artist.create(req.body)
    .then(artist => {
      res.json(artist);
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

/**
 * @api {get} /artists/occupation/:occupation Get Artist By Occupation
 * @apiName AddArtist
 * @apiGroup Artists
 *
 * @apiParam {String} name Artist name
 * @apiParam {String} occupation Artist occupation, must be musician, artist, or beauty
 * @apiParam {String} bio Artist bio
 * @apiParam {String} location Artist location
 * @apiParam {String} imageUrl Artist image
 *
 * @apiParamExample Examply Body:
 * {
 * "name": "jean-michel basquiat",
 * "occupation": "artist",
 * "bio": "An artist of Hatian and Puerto Rican descent who responsible for elevating graffiti to the New York gallery scene.",
 * "location": "New York",
 * "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb9PYkfw41ylyRhFKT1cn8iWJqIHTLuVAc7mcUKGmZDtjrPb-ieg&s"
 *  }
 *
 * @apiSuccess {String} name Artist name
 * @apiSuccess {String} occupation Artist occupation
 * @apiSuccess {String} bio Artist bio
 * @apiSuccess {String} location Artist location
 * @apiSuccess {String} image Artist image url
 *
 * @apiUse SuccessRes
 */

router.route("/occupation/:occupation").get((req, res) => {
  Artist.find({ occupation: req.params.occupation })
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json("Error " + err));
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

module.exports = router;
