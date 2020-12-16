// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");

// Requiring passport as we've configured it
// ADD BELOW AFTER SETTING UP PASSPORT
// const passport = require("./config/passport");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

// ADD BELOW AFTER SETTING UP PASSPORT
// app.use(passport.initialize());
// app.use(passport.session());

// Requiring our routes
// ADD BELOW AFTER SETTING UP ROUTES
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
// ADD BELOW AFTER SETTING UP SEQUELIZE

module.exports = app;