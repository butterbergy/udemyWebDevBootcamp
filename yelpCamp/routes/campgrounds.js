var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground");


//INDEX - Show all CGs
router.get("/", isLoggedIn, function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

//NEW - Create new CG
router.post("/", function(req, res){
	var cgName = req.body.cgName;
	var cgImage = req.body.cgImage;
	var cgDescription = req.body.cgDescription;
	var cgAuthor = {username: req.user.username, id: req.user._id}
	var newCG = {name: cgName, image: cgImage, description: cgDescription, author: cgAuthor};
	Campground.create(newCG, function(err, campground){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});

//CREATE - Show form to create new CG
router.get("/new", isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//SHOW Route
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/show", {campground: campground});	
		}
	});
});

//EDIT Route
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}
		else {
			res.render("campgrounds/edit", {campground: campground});
		}
	});
});

//UPDATE Route
router.put("/:id", checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY route
router.delete("/:id", checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, campground){
		if(err){
			res.redirect("/campgrounds");
		}
		else {
			res.redirect("/campgrounds");
		}
	})
});

// Middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, campground){
			if(err){
				res.redirect("back");
			}
			else {
				if(campground.author.id.equals(req.user._id)){
					next();
				}
				else {
					res.redirect("back");
				}
			}
		});
	}
	else {
		res.redirect("back");
	}	
}

module.exports = router;
