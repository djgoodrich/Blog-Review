var db = require("../models");

module.exports = function(app, auth) {

    app.get("/login", auth.requiresLogin, function(req, res) {
<<<<<<< HEAD
        console.log("hello")
        .then(function(results) {
            res.redirect("/blog/1");
=======
        db.User.findOne({
            where : {
                sub : req.user._json.sub
            }
        }).then(function(dbUser) {
            if(!dbUser) {
                db.User.create({
                    name : req.user.nickname,
                    sub : req.user._json.sub
                }).then(function(dbNewUser){
                    res.send('<script>window.location.href = localStorage.getItem("returnURL")</script>');
                });
            } else {
                res.send('<script>window.location.href = localStorage.getItem("returnURL")</script>');
            };
>>>>>>> 58db7ed8f1e82c8b1beb0ac2845d9c2d87fb048f
        });
    });
};
