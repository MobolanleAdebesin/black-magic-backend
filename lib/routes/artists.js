const router = require("express").Router();
let Artist = require("../models/Artist.js");
//npx apidoc ./ -e node_modules -o ./docs
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
 * @apiSuccessExample Successful Response:
 *
 * HTTP/1.1 200 OK
 *  {
 * "name": "beyonce knowles",
 * "occupation": "musician",
 * "bio": "Singer, musician, actress, mother, she does it all",
 * "location": "Houston Texas",
 * "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkLPCf2BzrSm3AXgN2UCThFyaa_BGLjb5XN9nqEXv1RlK2Xk4eaA&s"
 * }
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
 * @apiSuccess {String} name Artist name
 * @apiSuccess {String} occupation Artist occupation
 * @apiSuccess {String} bio Artist bio
 * @apiSuccess {String} location Artist location
 * @apiSuccess {String} image Artist image url
 *
 * @apiSuccessExample Successful Response:
 *
 * HTTP/1.1 200 OK
 *  {
 * "name": "beyonce knowles",
 * "occupation": "musician",
 * "bio": "Singer, musician, actress, mother, she does it all",
 * "location": "Houston Texas",
 * "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkLPCf2BzrSm3AXgN2UCThFyaa_BGLjb5XN9nqEXv1RlK2Xk4eaA&s"
 * }
 *
 */

router.route("/occupation/:occupation").get((req, res) => {
  Artist.find({ occupation: req.params.occupation })
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  Artist.create(req.body)
    .then(artist => {
      res.json(artist);
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});
router.route("/remove/:id").delete((req, res) => {
  Artist.findOneAndDelete({ _id: req.params.id })
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
