var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // passport.authenticate middleware
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

//Route for signing up
  app.post("/api/signup", function(req, res) {
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
//route for new post
  app.post("/api/newpost", function(req, res) {
    db.GiphyPost.create({
        gifId: req.body.gifId,
        caption: req.body.caption,
        gifScore: req.body.gifScore,
        jellyScore: req.body.jellyScore,
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting data
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
// Data needed for members.js
      res.json({
        firstName: req.user.fistName,
        userName: req.user.userName,
        id: req.user.id,
        // gifId: req.giphy_post.gifId,
        // caption: req.giphy_post.caption,
        // gifScore:req.giphy_post.gifScore,
        // jellyScore: req.giphy_post.jellyScore

      });
    }
  });
//need to do join models api 


};

