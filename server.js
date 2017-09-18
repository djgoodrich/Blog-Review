// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override')
var expressAuth0Simple = require('express-auth0-simple'); // Import the middleware library 

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(methodOverride("_method"));


// Static directory
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var auth = new expressAuth0Simple(app, {
  auth0: {
    scope: "openid profile",
  }, 
  successRedirect : "/login"
}); 

// Routes
// =============================================================
require("./routes/html-routes.js")(app,auth);
require("./routes/blog-api-routes.js")(app,auth);
require("./routes/review-api-routes.js")(app,auth);
require("./routes/user-api-routes.js")(app,auth);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
