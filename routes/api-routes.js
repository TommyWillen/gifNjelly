const db = require("../models");

// call to create user

// call to create post
app.post("/api/giphypost"), function(req, res){
  db.GiphyPost.create({
    gifId: req.body.gifId,
    caption: req.body.caption,
    UserId: req.body.userId
  })
    .then(function(){
    //!!change this redirect after we have the html routes decided!!
      res.redirect(200, "/member");
    })
    .catch(function(err){
      console.log(err);
      res.end;
    });
};

// call to get top 5 old posts

// call to get one user's info

// call to update user info

// call to login

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


// call to update jif score
