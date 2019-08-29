var	Campground = require("../models/campground"),
	Comment = require("../models/comment");

var middlewareObject = {};

middlewareObject.checkCommentOwnership = function (req, res, next) {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, comment){
			if(err || !comment){
				req.flash("error", "Comment not found");
				res.redirect("back");
			}
			else {
				if(comment.author.id.equals(req.user._id)){
					next();
				}
				else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	}
	else {
		req.flash("error", "You need to be logged in first");
		res.redirect("back");
	}	
}

middlewareObject.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, campground){
			if(err || !campground){
				req.flash("error", "Campground not found");
				res.redirect("back");
			}
			else {
				if(campground.author.id.equals(req.user._id)){
					next();
				}
				else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	}
	else {
		req.flash("error", "You need to be logged in first");
		res.redirect("back");
	}	
}

middlewareObject.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login First!");
	res.redirect("/login");
}

module.exports = middlewareObject;