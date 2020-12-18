// const path = require("path");
// const express = require("express");

// var isAuthenticated = require("../config/middleware/isAuthenticated");


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


app.get("/members", function(req, res){
    res.render("members", {membersJs: true});
});

app.get("/newpost", function(req, res){
  res.render("newpost", {membersJs: true});
});

app.get("/gifpost/:id", function(req, res){
  let selectedGif = req.params.id;
  res.render("newpost", {gifId:selectedGif});
});

app.post("/newpost", function(req, res){
  let image=req.body.imagefile;
  res.redirect("newpost");

  res.render("newpost", {newpostJs: true, imgfile: image});

});

}