const router = require("express").Router();
let Review = require("../models/Review.js");

/**
 * @apiDefine SuccessRes
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 * "username": "Bola",
 * "artist": "Beyonce Knowles",
 * "text": "I love her deeeep!",
 * "photos": {
 *   "photo1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YutIdhXYBMAqkhD329TnPML1-jOeQ7zloR52jCIjb1_LR6cj&s"
 *  }
 * }
 *
 */

/**
 * @api {get} /reviews Get All Reviews
 * @apiName getReviews
 * @apiGroup Reviews
 */

router.route("/").get((req, res) => {
  Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json("Error: " + err));
});

/**
 * @api {get} /reviews/:artist Get Reviews By Artist
 * @apiName getArtistReviews
 * @apiGroup Reviews
 *
 * @apiParam artist Artist Name
 *
 * @apiSuccess {String} username name of Reviewer
 * @apiSuccess {String} artist Artist name
 * @apiSuccess {String} text Content of Review
 * @apiSuccess {Photos}  Photos Photos of the artist's work
 *
 * @apiUse SuccessRes
 */

router.route("/:artist").get((req, res) => {
  Review.find({ artist: req.params.artist })
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json("Error: " + err));
});

/**
 * @api {post} /reviews/add Add Artist
 * @apiName AddReview
 * @apiGroup Reviews
 *
 * @apiParam {String} username Username
 * @apiParam {String} artist Artist name
 * @apiParam {String} text  Conent of review
 * @apiParam {String} photos Photos of artists work
 *
 * @apiParamExample Examply Body:
 * {
 * "username": "bola",
 * "artist": "beyonce knowles",
 * "text": "I love her deeeeep!",
 * "photos": {
 * "photo1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YutIdhXYBMAqkhD329TnPML1-jOeQ7zloR52jCIjb1_LR6cj&s"
 *  }
 * }
 *
 * @apiSuccess Review added!
 *
 * @apiUse SuccessRes
 */
router.route("/add").post((req, res) => {
  Review.create(req.body)
    .then(() => res.json("Review Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

/**
 * @api {put} /reviews/update/:id Update review
 * @apiName updateReview
 * @apiGroup Reviews
 *
 * @apiParam {String} update Update review content
 *
 */

router.route("/update/:id").put((req, res) => {
  Review.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  })
    .then(review => {
      res.json(review);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
