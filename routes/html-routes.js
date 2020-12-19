// const path = require("path");
// const express = require("express");

var isAuthenticated = require("../config/middleware/isAuthenticated");


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

  app.get("/newpost", isAuthenticated, function(req, res){
    res.render("newpost", {newpostJs: true});
  });

  app.get("oldpost", isAuthenticated, function(req, res){
    res.render("newpost", {oldgifJs: true});
  });

  app.get("/vote", isAuthenticated, function(req, res){
    res.render("oldpost", {oldgifJs: true});
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