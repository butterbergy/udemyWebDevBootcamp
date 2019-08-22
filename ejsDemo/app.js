var express = require("express");
var app = express();

app.listen(3000, function(){
	console.log("App listening on port 3000");
})

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("home");
});

app.get("/fellinlovewith/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love", {thing: thing})
});