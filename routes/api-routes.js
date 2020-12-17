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

  // call to create user

  // call to create post
  app.post("/api/giphypost"), function (req, res) {
    db.GiphyPost.create({
      gifId: req.body.gifId,
      caption: req.body.caption,
      UserId: req.body.userId
    })
      .then(function () {
        //!!change this redirect after we have the html routes decided!!
        res.redirect(200, "/member");
      })
      .catch(function (err) {
        console.log(err);
        res.end;
      });
  };

  //   call to get 5 posts to vote on
  app.get("/api/giphypost/random", (req, res) => {
    db.GiphyPost.findAll({
      order: sequelize.random(),
      include: [db.User],
      attributes: {
        exclude: ["firstName", "lastName", "email", "password"]
      }
    }).then(gifPost => {
      let gifPostFilter = gifPost.filter(post => post.username !== req.user.userName);
      res.json(gifPostFilter);
    });
  });
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
    if (!req.user) {
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
  // call to update jif score


  // call to post a vote
  app.post("/api/vote/:postId"), function(req, res){
    let postId = req.params.postId;
    let gifVote = req.body.gif;
    let jellyVote = req.body.jelly;
    let userId = req.body.userId;

    function deleteVote(postId, userId){
      db.Vote.destroy({
        where: {
          GiphyPostId: postId,
          UserId: userId
        }
      });
    }

    function addVote(postId, userId, gifVote, jellyVote){
      db.Vote.create({
        gif: gifVote,
        jelly: jellyVote,
        UserId: userId,
        GiphyPostId: postId
      });

      if (gifVote) {
        let newGifScore;
        db.GiphyPost.findOne({
          where: {
            id: postId
          }
        }).then(function(result){
          newGifScore = parseInt(result.gifScore) + 1;
          db.GiphyPost.update({
            gifScore: newGifScore
          },
          {
            where: {
              id: postId
            }
          }
          ).then(function(){
            res.end;
          });
        });


      } else {
        let newJellyScore;
        db.GiphyPost.findOne({
          where: {
            id: postId
          }
        }).then(function(result){
          newJellyScore = parseInt(result.jellyScore) + 1;
          db.GiphyPost.update({
            jellyScore: newJellyScore
          },
          {
            where: {
              id: postId
            }
          }
          ).then(function(){
            res.end;
          });
        });

      }
    }

    db.Votes.findAll({
      where: {
        GiphyPostId: postId
      }
    }).then(function(result){
      let alreadyVoted = result.filter(vote => vote.UserId === userId);
      if (alreadyVoted) {
        deleteVote(postId, userId);
        res.end;
      } else {
        addVote(postId, userId, gifVote, jellyVote);
        res.end;
      }
    })
      .catch(function(err){
        console.log(err);
        res.end;
      });
  };

};
// call to update jif score
