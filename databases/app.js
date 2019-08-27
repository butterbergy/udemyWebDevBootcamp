var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
// 	name: "george",
// 	age: 11,
// 	temperament: "sad"
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("Something went wrong");
// 	}
// 	else{
// 		console.log("A cat was saved to the db");
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: "Squeaky",
	age: 1,
	temperament: "loudaf"
}, function(err, cat){
	if(err){
		console.log("Error creating cat " + err);
	}
	else{
		console.log("Created a cat " + cat);
	}
});

Cat.find({name: "Squeaky"}, function(err, cats){
	if(err){
		console.log("Error finding cat")
	}
	else{
		console.log("Found cats");
		console.log(cats);
	}
});

Cat.remove({name: "Squeaky"}, function(err, cats){
	if(err){
		console.log("Error deleting squeaky")
	}
	else{
		console.log(cats);
	}
})