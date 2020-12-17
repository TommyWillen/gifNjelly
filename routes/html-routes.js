const path = require("path");
const express = require("express");

// var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = (app) => {

  app.get("/", function(req, res){
    res.render("index");
  });

  app.get("/login", function(req, res){
    res.render("index");
  });

  app.get("/signup", function(req, res){
    res.render("signup");
  });

  app.get("/members", function(req, res){
    res.render("members");
  });

  app.get("/gifpost/:id", function(req, res){
    let selectedGif = req.params.id;
    res.render("newgif", {gifId:selectedGif});
  });

  app.get("/vote", function(req, res){
    // $.ajax({
    //   method: "GET",
    //   url: "/api/giphypost/random"
    // }).then(function(result){
    //   let oldGifs = result;
    res.render("oldgifs", {oldGifs:[{
      id: 1,
      gifId: "Xf1WoKFNu3LTc9ce1M",
      caption: "caption"
    }]});
    // });
  });
};
// app.get("/members", isAuthenticated, function(req, res) {
//   res.render("/index");
// });

// }
