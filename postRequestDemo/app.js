var express = require("express");
var app = express();

var bodyParser = require("body-parser");

var allFriends = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
	console.log("Started server on port 3000");
});

app.get("/", function(req, res){
	res.render("home");
});

app.get("/friends", function(req, res){
	res.render("friends", {friends: allFriends});
})

app.post("/addFriend", function(req, res){
	var newFriend = req.body.newFriend;
	allFriends.push(newFriend);
	res.redirect("/friends");
})