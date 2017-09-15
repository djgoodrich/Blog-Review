var db = require("../models");

module.exports = function(app) {
    app.get("/api/review/by/:userId", function(req, res) {

        db.Review.findOne({
            where: {
                UserId : req.params.userId
            }
        }).then(function(dbReview) {
            res.json(dbReview);
        });
    });

    app.get("/api/reviews/:id", function(req, res) {
        db.Review.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Blog]
        }).then(function(dbReview) {
            res.json(dbReview);
        });
    });

    app.post("/api/reviews", function(req, res) {
        // Gets the user id using the user sub from auth0
        db.User.findOne({
            where: {
                sub : req.user._json.sub
            }, 
            include : [db.Review]
        }).then(function(dbUser){
            // Need to find the index of the array element that has id = to the blog currently being reviewed, if exists.
            var result = dbUser.Reviews.filter(function(obj) {
                console.log(obj.BlogId);
                return obj.BlogId == req.body.BlogId;
            });
            if(typeof result[0] === "undefined") {
                // Adds user id as FK to the Review to associate it with the user submitting the review
                req.body.UserId = dbUser.id;
                req.body.rating = parseFloat(req.body.rating);
                try {
                    db.Review.create(req.body).then(function(dbReview) {
                        // Gets the blog's current total review count and cumulative rating.
                        db.Blog.findOne({
                            where: {
                                id : req.body.BlogId
                            }
                        }).then(function(dbBlog){
                            var newReviewCount = 1;
                            var newRating = req.body.rating;                   
                            if (dbBlog.total_reviews){
                                newReviewCount += dbBlog.total_reviews;
                                newRating = (dbBlog.cumulative_rating * dbBlog.total_reviews + newRating) / (newReviewCount);
                            };
                            // Updates the blog's total review count and cumulative rating.
                            db.Blog.update(
                                {
                                    total_reviews: newReviewCount,
                                    cumulative_rating: newRating
                                },
                                {
                                where : {
                                    id : req.body.BlogId
                                }
                            }).then(function(dbUpdatedBlog){
                                res.redirect("/blog/" + req.body.BlogId);
                            })
                        })
                    });
                } catch (err) {
                    res.json({
                        message: err.message
                    })                    
                }
            } else {
                // Inform user that review has already been submitted; redirect to edit review.
                console.log("A review has already been submitted")
            }
        })
    });

    app.delete("/api/reviews/:id", function(req, res) {
        db.Review.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbReview) {
            res.json(dbReview)
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