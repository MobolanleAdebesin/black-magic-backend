const router = require("express").Router();
let User = require("../models/User.js");
const jwt = require("jwt-simple");
const passport = require("../config/passport.js");
const config = require("../config/config.js");

/**
 * @api {get} /users Get Users List
 * @apiName getUsers
 * @apiGroup Users
 */
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

/**
 * @api {post} /users/add Add User
 * @apiName AddUser
 * @apiGroup Users
 *
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 *
 * @apiParamExample Examply Body:
 * {
 * "username": "bola",
 * "password": "bola"
 *  }

 * @apiSuccess User Added!
 *
 * @apiSuccessExample Success: 
 * HTTP/1.1 200 OK
 * {
 * "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVkZDgxYjEwYmUxZmNmMDAxNzBmM2MyOSJ9.GH6mSp-y9jfJ2UVkfOiWmzjFDrpWxlRvOMdwLuDF8KQ"
 * }
 */
router.route("/add").post((req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username }).then(user => {
      if (!user) {
        User.create(req.body).then(newUser => {
          if (newUser) {
            var payload = {
              id: newUser.id
            };

            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
              token: token
            });
          } else {
            res.sendStatus(401);
          }
        });
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

/**
 * @api {post} /users/login Login
 * @apiName login
 * @apiGroup Users
 *
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 *
 * @apiParamExample Examply Body:
 * {
 * "username": "bola",
 * "password": "bola"
 *  }
 *
 * @apiSuccessExample Success:
 * HTTP/1.1 200 OK
 * {
 * "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVkZDgxYjEwYmUxZmNmMDAxNzBmM2MyOSJ9.GH6mSp-y9jfJ2UVkfOiWmzjFDrpWxlRvOMdwLuDF8KQ"
 * }
 */

router.route("/login").post((req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        if (user.password === req.body.password) {
          var payload = {
            id: user.id
          };
          var token = jwt.encode(payload, config.jwtSecret);
          res.json({
            token: token
          });
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

//Currently, updating and deleting user by id, may want to change this to username

/**
 * @api {delete} /users/remove/:id Delete User
 * @apiName deleteUser
 * @apiGroup Users
 *
 *
 */
router.route("/remove/:id").delete((req, res) => {
  User.findOneAndDelete({ _id: req.params.id }).then();
});

/**
 * @api {put} /users/update/:id Update user
 * @apiName updateUser
 * @apiGroup Users
 *
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 *
 *
 *
 */

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
