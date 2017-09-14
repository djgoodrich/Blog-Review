var db = require("../models");

module.exports = function(app, auth) {
    // Get blogs
    app.get("/api/blogs", function(req, res){
        db.Blog.findAll({
            include: [db.Review]
        }).then(function(dbBlog){
            res.json(dbBlog);
        });
    });  
        
    // Add blog
    // Requires log-in; client-side logic will prompt user to log in before this call is made.
    app.post("/api/blogs", auth.requiresLogin, function(req, res) {
        console.log(JSON.stringify(req.body))
        db.Blog.create(req.body).then(function(dbNewBlog) {
            res.redirect("/blog/" + dbNewBlog.id);
        });
    });
};
