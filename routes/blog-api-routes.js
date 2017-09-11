var db = require("../models");

<<<<<<< HEAD
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

};
