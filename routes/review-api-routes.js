var db = require("../models");

module.exports = function(app) {
    app.post("/api/reviews", function(req, res) {
        db.Review.create(req.body).then(function(dbReview) {
            res.json(dbReview);
        });
    });

    app.delete("/api/reviews/:id", function(req, res) {
        db.Review.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbReview) {
            res.json(dbReveiw)
        });
    });

    app.put("/api/reviews", function(req, res) {
        dp.Review.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }
        ).then(function(dbReview) {
            res.json(dbReview);
        });
    });
}