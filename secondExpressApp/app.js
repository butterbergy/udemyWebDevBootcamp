var express = require("express");
var app = express();

var noises = {
	dog: "woof",
	pig: "oink",
	cow: "moo"
};

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment");
});

// Return the noise the animal makes if the animal exists in dict
app.get("/speak/:animal", function(req, res){
	var animal = req.params.animal;
	
	if(noises[animal]){
		res.send("The " + animal + " says " + noises[animal]);
	}
	else {
		res.send("Animal not found");
	}
});

// Repeat specified string specified number of times
app.get("/repeat/:comment/:count", function(req, res){
	var resp = "";
	console.log(req.params)
	for(var i = 0; i < Number(req.params.count); i++){
		resp += req.params.comment + " ";
	}
	res.send(resp);
});

app.get("*", function(req, res){
	res.send("404");
});

app.listen(3000, function(){
	console.log("Running secondExpressApp on port 3000");
})
