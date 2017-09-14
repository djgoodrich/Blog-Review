var db = require("../models");

module.exports = function(app, auth) {
 
    app.get("/login", auth.requiresLogin, function(req, res) {
        console.log("hello")
        .then(function(results) {
            res.redirect("/blog/1");
        });
    });
};
