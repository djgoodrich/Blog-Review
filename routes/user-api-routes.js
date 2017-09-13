var db = require("../models");

module.exports = function(app, auth) {
 
    app.get("/login", auth.requiresLogin, function(req, res) {
        console.log(req.user)
        .then(function(results) {
            res.redirect("/");
        });
    });
};
