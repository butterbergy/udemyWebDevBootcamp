var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
	{name: "Salmon Creek", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
	{name: "Campground 2", image: "https://farm5.staticflickr.com/4186/34533123406_bdc5eeca24_m.jpg"},
	{name: "Campground 3", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
	{name: "Salmon Creek", image: "https://farm5.staticflickr.com/4186/34533123406_bdc5eeca24_m.jpg"},
	{name: "Campground 2", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
	{name: "Campground 3", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
	{name: "Salmon Creek", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
	{name: "Campground 2", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
	{name: "Campground 3", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
];


app.listen(3000, function(){
	console.log("Running yelpcamp server on port 3000");
});

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	var cgName = req.body.cgName;
	var cgImage = req.body.cgImage;
	var newCG = {name: cgName, image: cgImage}
	campgrounds.push(newCG);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});