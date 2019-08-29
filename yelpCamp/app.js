// Package requirements
var express        = require("express"),
	bodyParser     = require("body-parser"),
	mongoose       = require("mongoose"),
	passport       = require("passport"),
	LocalStrategy  = require("passport-local"),
	methodOverride = require("method-override"),
	flash          = require("connect-flash"),
	Campground     = require("./models/campground"),
	Comment        = require("./models/comment"),
	User           = require("./models/user"),
    seedDB         = require("./seeds");

// Route requirements
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

// Init express
var app = express();

// General app setup
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
mongoose.connect("mongodb://localhost:27017/yelpcamp", {useNewUrlParser: true});

// Clear and seed the DB
//seedDB();

// Passport Setup
app.use(require("express-session")({
	secret: "What is the difference in an orange",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Start app
app.listen(3000, function(){
	console.log("Running yelpcamp server on port 3000");
});

// Make currentUser available in templates
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Use routes
app.use("/campgrounds/:id/comments/", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);
