var express    = require("express"),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	app   	   = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/yelpcamp", {useNewUrlParser: true});

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.listen(3000, function(){
	console.log("Running yelpcamp server on port 3000");
});

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
			res.render("index", {campgrounds: campgrounds});
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
	res.render("new");
});

//SHOW
app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("show", {campground: campground});	
		}
	});
});






