const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
  // call to login
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });
  // call to create user
  app.post("/api/signup", (req, res) => {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });
  // call to create post

//   call to get 5 posts to vote on
  app.get("/api/giphy_post/random", (req,res) => {
      db.GiphyPost.findAll({
          order: sequelize.random()
      })
  })
  // call to get top 5 old posts

  // call to get one user's info
  app.get("/api/user/:id", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        userName: req.user.userName,
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  // call to update user info
  app.put("/api/user", (req, res) => {
    if (!res.user) {
      return;
    } else {
      db.User.update(req.body,
        {
          where: {
            id: req.body.id
          }
        })
        .then(function (user) {
          res.json(user);
        });
    }
  });

  // call to post a vote

  // call to update jif score

};