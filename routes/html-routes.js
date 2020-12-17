const path = require("path");
const express = require("express");

var isAuthenticated = require("../config/middleware/isAuthenticated");


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

// app.get("/members", isAuthenticated, function(req, res) {
//   res.render("/index");
// });

}
