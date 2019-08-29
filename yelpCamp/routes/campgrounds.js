var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground");


//INDEX - Show all CGs
router.get("/", function(req, res){
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
	var newCG = {name: cgName, image: cgImage, description: cgDescription};
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
router.get("/new", function(req, res){
	res.render("campgrounds/new");
});

//SHOW
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

module.exports = router;
