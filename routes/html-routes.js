// const path = require("path");
// const express = require("express");

var isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
// const sequelize = require("sequelize");

module.exports = (app) => {

  app.get("/", function(req, res){
    res.render("index",{loginJs:true});
  });

  app.get("/login", function(req, res){
    res.render("index", {loginJs:true});
  });

  app.get("/signup", function(req, res){
    res.render("signup", {signupJs: true});
  });

  app.get("/meettheteam", function(req, res){
    res.render("meettheteam");
  });

  app.get("/contact", function(req, res){
    res.render("contact");
  });

  // app.get("/meettheteam", function(req, res){
  //   res.render("meettheteam", {membersJs: true});
  // });


  app.get("/members", isAuthenticated, function(req, res){
    const user = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      userName: req.user.userName
    };
    res.render("members", {membersJs: true, user: user});
  });

  app.get("/vote", isAuthenticated, function(req, res){

    // this is a placeholder until we get actual posts into the database
    db.GiphyPost.findAll({
    // order: sequelize.random(),
      include: [db.User],

    }).then(gifPost => {
      for (var i = gifPost.length - 1; i > 0; i--) {
        //choosing a random number between 0 and the length of the array
        var j = Math.floor(Math.random() * (i + 1));
        //creating a variable which gets the last item of the array
        var selected = gifPost[i];
        // making the last item of the array the randomly selected array value
        gifPost[i] = gifPost[j];
        //moving the value that was initially the last value of the array to the position of the randomly selected value
        gifPost[j] = selected;
      }
      let oldGif = [];

      gifPost.forEach(gif => {
        let giphy = {
          id: gif.id,
          userName: gif.User.userName,
          gifId: gif.gifId,
          gifScore: gif.gifScore,
          jellyScore: gif.jellyScore,
          caption: gif.caption
        };
        oldGif.push(giphy);
      });
      let limitedGifs = [];

      for (let i=0; i<6; i++){
        limitedGifs.push(oldGif[i]);
      }
      const user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        userName: req.user.userName
      };

      res.render("oldpost", {oldpostJs: true, user : user, giphyPostsLeft: [limitedGifs[0],limitedGifs[1],limitedGifs[2]], giphyPostsRight: [limitedGifs[3],limitedGifs[4],limitedGifs[5]]});
    });

  });

  app.get("/newpost", isAuthenticated, function(req, res){
    const user = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      userName: req.user.userName
    };
    res.render("newpost", {newpostJs: true, user: user});
  });

  app.get("/gifpost/:id", isAuthenticated, function(req, res){
    const user = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      userName: req.user.userName
    };
    let selectedGif = req.params.id;
    res.render("newpost", {newpostJs: true, gifId: selectedGif, user: user});
  });

  // app.post("/newpost", function(req, res){
  //   let image=req.body.imagefile;
  //   res.redirect("newpost");

  //   res.render("newpost", {newpostJs: true, imgfile: image});

  // });

};