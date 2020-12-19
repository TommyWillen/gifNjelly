// const path = require("path");
// const express = require("express");

const isAuthenticated = require("../config/middleware/isAuthenticated");
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

  // app.get("/meettheteam", function(req, res){
  //   res.render("meettheteam", {membersJs: true});
  // });


  app.get("/members", isAuthenticated, function(req, res){
    res.render("members", {membersJs: true});
  });

  app.get("/vote", isAuthenticated, function(req, res){
  // this is a placeholder until we get actual posts into the database
    db.GiphyPost.findAll({
      include: [db.User],
    }).then(gifPost => {
    // let gifPostFilter = gifPost.filter(post => post.username !== req.user.userName);
    // res.json(gifPostFilter);
      //looping through the array, starting at the last value
      let shuffledGifs = gifPost;
      for (let i = shuffledGifs.length - 1; i > 0; i--) {
        //choosing a random number between 0 and the length of the array
        let j = Math.floor(Math.random() * (i + 1));
        //creating a variable which gets the last item of the array
        let selected = shuffledGifs[i];
        // making the last item of the array the randomly selected array value
        shuffledGifs[i] = shuffledGifs[j];
        //moving the value that was initially the last value of the array to the position of the randomly selected value
        shuffledGifs[j] = selected;
      }
      console.log(shuffledGifs[0]);
      let oldGif = [];
      for (let i = 0; i<6; i++ ) {
        let gifId = shuffledGifs[i].gifId;
        let gifScore = gifPost[i].gifScore;
        let jellyScore = gifPost[i].jellyScore;
        let caption = gifPost[i].caption;
        let giphy = {
          // userName: gifPost[i].dataValues.User.userName,
          gifId: gifId,
          gifScore: gifScore,
          jellyScore: jellyScore,
          caption: caption
        };
        oldGif.push(giphy);
      }
      res.render("oldpost", {oldpostJs: true, oldGifs: oldGif});
    });

  });

  app.get("/newpost", isAuthenticated, function(req, res){
    res.render("newpost", {newpostJs: true});
  });

  app.get("/gifpost/:id", isAuthenticated, function(req, res){
    let selectedGif = req.params.id;
    res.render("newpost", {newpostJs: true, gifId: selectedGif});
  });

  // app.post("/newpost", function(req, res){
  //   let image=req.body.imagefile;
  //   res.redirect("newpost");

  //   res.render("newpost", {newpostJs: true, imgfile: image});

  // });

};