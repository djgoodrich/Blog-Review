// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
var db = require("../models");
var path = require("path");

module.exports = function(app, auth) {
  //auth.requiresLogin if want to add login
  // Send to homepage with top ten blogs displayed
  app.get("/null", function(req, res){
    res.redirect("/");
  })
  
  app.get("/", function(req, res) {
    var userSub;
    if (req.user) {
      userSub = req.user._json.sub;
    }
    db.Blog
      .findAll({
        limit: 12,
        order: [["cumulative_rating", "DESC"]]
      })
      .then(function(results) {
        res.render("index", {
          topTen: results,
          currentUserSub: userSub
        });
      });
  });

  // Send to blog page with title, website, description, cumulative rating displayed at top; reviews listed below.
  app.get("/blog/:blog_title", function(req, res) {
    var userSub;
    if (req.user) {
      userSub = req.user._json.sub;
    }
    // Get specific blog
    db.Blog
      .findOne({
        include: {
          model: db.Review,
          include: [db.User]
        },
        where: {
          id: req.params.blog_title
        }
      })
      .then(function(dbBlog) {
        res.render("blog", {
          blog: dbBlog,
          currentUserSub: userSub
        });
      });
  });

  // Send to user page with list of reviews/ratings; if you are the user whose page you are on, you can edit any of your reviews from here.
  app.get("/user/:id", function(req, res) {
    var userSub;
    if (req.user) {
      userSub = req.user._json.sub;
    }
    // Get users sorted by number of reviews
    db.User
      .findOne({
        include: {
          model: db.Review,
          include: [db.Blog]
        },
        where: {
          id: req.params.id
        }
      })
      .then(function(dbUser) {
        var userMatch = false;
        if(dbUser.sub === userSub){
          userMatch = true;
        }
        res.render("user", {
          user: dbUser,
          currentUserSub: userSub,
          userMatch: userMatch
        });
      });
  });

  app.post("/searchBlogs/:searchTerm", function(req, res) {
    var searchTerm = req.params.searchTerm;
    res.json(searchTerm)
  });

  app.get("/searchBlogs/:searchTerm", function(req, res) {
    var userSub;
    if (req.user) {
      userSub = req.user._json.sub;
    }
    db.Blog
      .findAll({
        where: {
          title: {
            like: "%" + req.params.searchTerm + "%"
          }
        }
      })
      .then(function(dbBlog) {

        if (typeof dbBlog[0] === "undefined") {
          res.render("searchResults", {
            blogs: dbBlog,
            foundResults: false,
            currentUserSub: userSub
          });
        } else {
          res.render("searchResults", {
            blogs: dbBlog,
            foundResults: true,
            currentUserSub: userSub
          });
        }
      });
  });
  
};
