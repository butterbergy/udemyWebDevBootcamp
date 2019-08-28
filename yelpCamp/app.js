var express    = require("express"),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	app   	   = express(),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment"),
    seedDB     = require("./seeds");

seedDB();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/yelpcamp", {useNewUrlParser: true});

app.listen(3000, function(){
	console.log("Running yelpcamp server on port 3000");
});


// Landing Page
app.get("/", function(req, res){
	res.render("landing");
});

//INDEX - Show all CGs
app.get("/campgrounds", function(req, res){
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
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
});

//SHOW
app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/show", {campground: campground});	
		}
	});
});


app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}
		else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}
				else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}	
	});
});






