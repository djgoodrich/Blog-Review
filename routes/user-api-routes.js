var db = require("../models");

module.exports = function(app, auth) {

    app.get("/login", auth.requiresLogin, function(req, res) {
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
        });
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('back');
    });
};
