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

  // app.get("/meettheteam", function(req, res){
  //   res.render("meettheteam", {membersJs: true});
  // });


  app.get("/members", isAuthenticated, function(req, res){
    res.render("members", {membersJs: true});
  });

  app.get("/vote", isAuthenticated, function(req, res){
  // this is a placeholder until we get actual posts into the database
    db.GiphyPost.findAll({
    // order: sequelize.random(),
      include: [db.User],

    }).then(gifPost => {
    // let gifPostFilter = gifPost.filter(post => post.username !== req.user.userName);
    // res.json(gifPostFilter);
      console.log("gifPost is: " + gifPost[0].User.userName);
      let oldGif = [];
      gifPost.forEach(gif => {
        let giphy = {
          userName: gif.User.userName,
          gifId: gif.gifId,
          gifScore: gif.gifScore,
          jellyScore: gif.jellyScore,
          caption: gif.caption
        };
        oldGif.push(giphy);
        res.render("oldpost", {oldpostJs: true, oldGifs: oldGif});
      });
    });

  });

  app.get("/newpost", isAuthenticated, function(req, res){
    res.render("newpost", {newpostJs: true});
  });

  app.get("/gifpost/:id", isAuthenticated, function(req, res){
    let selectedGif = req.params.id;
    res.render("newpost", {gifId:selectedGif, newpostJs: true});
  });

  // app.post("/newpost", function(req, res){
  //   let image=req.body.imagefile;
  //   res.redirect("newpost");

  //   res.render("newpost", {newpostJs: true, imgfile: image});

  // });

};