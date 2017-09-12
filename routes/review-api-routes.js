var db = require("../models");

module.exports = function(app) {
    app.get("/api/reviews", function(req, res) {
        var query = {};
        if (req.query.review_id) {
            query.ReviewId = req.query.review_id;
        }

        db.Review.findAll({
            where: query, 
            include: [db.Review]
        }).then(function(dbReview) {
            res.json(dbReview);
        });
    });

    app.get("/api/reviews/:id", function(req, res) {
        db.Review.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Review]
        }).then(function(dbReveiw) {
            res.json(dbReview);
        });
    });

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
        db.Review.update(
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