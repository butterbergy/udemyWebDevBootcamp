var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.listen(3000, function(){
	console.log("Starting movie search on port 3000");
});

app.get("/results", function(req, res){
	var searchInput = req.query.searchInput;
	var url = "http://www.omdbapi.com/?s=" + searchInput + "&apikey=thewdb"
	request(url, function(err, resp, body){
		if(!err && resp.statusCode == 200){
			var data = JSON.parse(body);
			res.render("results", {data: data});
		}
		else{
			console.log("Error! " + err);
		}
	})
});

app.get("/", function(req, res){
	res.render("search");
});