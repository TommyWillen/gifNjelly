const db = require("../models");
const passport = require("../config/passport");
require("dotenv").config();

module.exports = (app, axios) => {
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

  //   call to grab 5 random giphies
  app.get("/api/gif/random", (req, res) => {
    const route = "https://api.giphy.com/v1/gifs/trending?api_key=" + process.env.API_KEY + "&limit=6";
    axios.get(route).then(response => {
      res.json(response.data);
    });
    // const json = await response.json();

  });

  // call to create user

  // call to create post
  app.post("/api/newpost", (req, res) => {
    db.GiphyPost.create({
      gifId: req.body.gifId,
      caption: req.body.caption,
      UserId: req.user.id
    })
      .then(function (result) {
        //!!change this redirect after we have the html routes decided!!
        res.json(result);
      })
      .catch(function (err) {
        console.log(err);
        res.end;
      });
  });

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
  app.post("/api/vote/:postId", (req,res) => {
    let postId = req.params.postId;
    let gifVote = req.body.gif;
    let jellyVote = req.body.jelly;
    let userId = req.user.id;
    (gifVote === "true") ? gifVote = true : gifVote = false;
    (jellyVote === "true") ? jellyVote = true : jellyVote = false;
    const updateVoteScore = (gif, jelly) => {

      db.GiphyPost.update({
        gifScore: gif,
        jellyScore: jelly
      },{
        where: {
          id: postId
        }
      }).then(() => {
        res.end();
      });
    };
    const deleteVote = (postId, userId, gif, jelly) => {
      db.Vote.destroy({
        where: {
          GiphyPostId: postId,
          UserId: userId
        }
      }).then(() => {
        db.GiphyPost.findOne({
          where: {
            id: postId
          }
        }).then (result => {
          (gif) ? result.gifScore = parseInt(result.gifScore) - 1:false;
          (jelly) ? result.jellyScore = parseInt(result.jellyScore) - 1:false;
          db.Vote.create({
            gif: gifVote,
            jelly: jellyVote,
            UserId: userId,
            GiphyPostId: postId
          }).then(result2 => {
            if (result2.gif === true) {
              result.gifScore = parseInt(result.gifScore) + 1;
            } else {
              result.jellyScore = parseInt(result.jellyScore) +1;
            }
            updateVoteScore(result.gifScore,result.jellyScore);
            res.json(result2);
          });
        });

      });
    };
    const createOrFindVote = async () => {
      const [vote, created] = await db.Vote.findOrCreate({
        where: {
          GiphyPostId: postId,
          UserId: userId
        },
        defaults: {
          gif: gifVote,
          jelly: jellyVote,
          UserId: userId,
          GiphyPostId: postId
        }
      });
      if (created) {
        db.GiphyPost.findOne({
          where: {
            id: postId
          }
        }).then(result => {
          (gifVote) ? result.gifScore = parseInt(result.gifScore) + 1:result.jellyScore = parseInt(result.jellyScore) +1;
          updateVoteScore(result.gifScore,result.jellyScore);
        });
      } else {
        deleteVote(postId, userId, vote.gif, vote.jelly);
      }
    };

    createOrFindVote();
  });

};