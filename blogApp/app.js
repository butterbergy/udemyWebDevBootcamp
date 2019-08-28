var bodyParser	   = require("body-parser"),
 	express        = require("express"),
	methodOverride = require("method-override"),
	mongoose       = require("mongoose"),
	app            = express();

// App config
mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.listen(3000, function(){
	console.log("Blog App started on port 3000");
});

// Mongoose / model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
	res.redirect("/blogs");
})

// INDEX Route
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		}
		else {
			res.render("index", {blogs: blogs});
		}
	});
});

// NEW Route
app.get("/blogs/new", function(req, res){
	res.render("new");
});

// CREATE Route
app.post("/blogs", function(req, res){
	Blog.create(req.body.blog, function(err, blog){
		if(err){
			res.render("new");
		}
		else {
			res.redirect("/blogs");
		}
	});
});

// SHOW Route
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err){
			res.redirect("/blogs");
		}
		else {
			res.render("show", {blog: blog});
		}
	});
});

// EDIT Route
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(err){
			res.redirect("/blogs");
		}
		else {
			res.render("edit", {blog: blog});
		}
	});
});

// UPDATE Route
app.put("/blogs/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
		if(err){
			res.redirect("/blogs");
		}
		else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE Route
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err, blog){
		if(err){
			res.redirect("/blogs");
		}
		else {
			res.redirect("/blogs");
		}
	});
});
