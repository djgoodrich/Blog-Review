// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
var db = require("../models");
var path = require("path");

module.exports = function(app, auth) {

    // Send to homepage with top ten blogs displayed
    app.get("/", function(req, res) {
        console.log(req.user);
        db.Blog.findAll( {
           limit: 12,
           order: [['cumulative_rating', 'DESC']] 
        }).then(function(results) {
            res.render("index", {topTen: results});
        })
    });

    // Send to blog page with title, website, description, cumulative rating displayed at top; reviews listed below.
    app.get("/blog/:blog_title", function(req, res) {
        // Get specific blog
        db.Blog.findOne({
           include: {
               model : db.Review,
               include : [db.User]
           },
           where: {
               id: req.params.blog_title
           }
       }).then(function(dbBlog){
           console.log(JSON.stringify(dbBlog))
           res.render("blog", {blog : dbBlog});
           
       })
   });

    // Send to user page with list of reviews/ratings; if you are the user whose page you are on, you can edit any of your reviews from here.
    app.get("/user/:username", function(req, res) {
        
        // Get users sorted by number of reviews
        db.User.findOne({
            include: [db.Review],
            where: {
                name: req.params.username
            }
        }).then(function(dbUser){
            console.log(JSON.stringify(dbUser))
           res.render("user", dbUser);
        })

    });
    app.get("/users/:username", function(req, res) {
        var user;
        // Get users sorted by number of reviews
        db.User.findOne({
            include: [db.Review],
            where: {
                name: req.params.username
            }
        }).then(function(dbUser){
            user = res.json(dbUser);
        })
        console.log(JSON.stringify(user))
        // Send info to handlebars
         res.render();
    });

};
