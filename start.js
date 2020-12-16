const app = require("./server");

const db = require("./models");
const PORT = process.env.PORT || 8080;


db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});