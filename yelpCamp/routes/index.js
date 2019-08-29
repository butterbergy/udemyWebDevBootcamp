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
			console.log(err);
		}
		else {
			passport.authenticate("local")(req, res, function(){
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
	res.redirect("/campgrounds");
});

// Middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
