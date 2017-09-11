var db = require("../models");

module.exports = function(app) {
    // Get blogs
    app.get("/api/blogs", function(req, res){
        db.Blog.findAll({
            include: [db.Review]
        }).then(function(dbBlog){
            res.json(dbBlog);
        });
    });  
        
    // Add blogs
    app.post("api/blogs", function(req, res) {
        db.Blog.create(req.body).then(function(dbBlog) {
            res.json(dbBlog);
        });
    });
};
