var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
	User     = require("../models/user");

// Landing Page
router.get("/", function(req, res){
	res.render("landing");
});

// Show register form
router.get("/register", function(req, res){
	res.render("register");
});
 
// Handle signup logic
router.post("/register", function(req, res){
	newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", req.flash("error", err.name + ": " + err.message));
			res.redirect("/campgrounds");
		}
		else {
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "Successfully signed up");
				res.redirect("/campgrounds");
			})
		}
	})
});

// Show login form
router.get("/login", function(req, res){
	res.render("login");
});

// Login logic
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login" 
}), function(req, res){});

// Lougout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Successfully Logged Out!");
	res.redirect("/campgrounds");
});

module.exports = router;
