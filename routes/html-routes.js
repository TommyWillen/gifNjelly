const path = require("path");
const express = require("express");

var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = (app) => {

app.get("/", function(req, res){
    res.render("/index");
});

app.get("/login", function(req, res){
    res.render("/index");
});

app.get("/signup", function(req, res){
    res.render("/signup");
});

<<<<<<< HEAD
app.get("/members", function(req, res){
    res.render("members");
});

}
=======
app.get("/members", isAuthenticated, function(req, res) {
  res.render("/index");
});

}
>>>>>>> 9177dcc97b20f9ef17b904a0bc11d066494a3f95
