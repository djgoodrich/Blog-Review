// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

var path = require("path");

module.exports = function(app) {

    // Send to homepage with top ten blogs displayed
    app.get("/", function(req, res) {
        //res.sendFile(...);
    });

    // Send to blog page with title, website, description, cumulative rating displayed at top; reviews listed below.
    app.get("/blog/:blog_title", function(req, res) {
        // res.sendFile(...);
    });

    // Send to user page with list of reviews/ratings; if you are the user whose page you are on, you can edit any of your reviews from here.
    app.get("/users/:username", function(req, res) {
        // res.sendFile(...);
    });

};
