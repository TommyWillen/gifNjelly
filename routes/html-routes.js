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
    res.render("signup", {signupJs: true});
});



app.get("/members", function(req, res){
    res.render("members", {membersJs: true});
});

app.get("/newpost", function(req, res){
  res.render("newpost", {membersJs: true});
});


app.post("/newpost", function(req, res){
  let image=req.body.imagefile;
  res.redirect("newpost");

  res.render("newpost", {newpostJs: true, imgfile: image});

});

}