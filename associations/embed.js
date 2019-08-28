var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/data_associations", {useNewUrlParser: true});

var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

var newUser = new User({
	email: "ffffff@gmail.com",
	name: "ffffff"
});

newUser.posts.push({
	title: "embedded post",
	content: "asdfasdfasd"
});

newUser.save(function(err, user){
	if(err){
		console.log(err);
	}
	else {
		console.log(user);
	}
});

// var newPost = new Post({
// 	title: "POST ADASDA",
// 	content: "asdfasdfads"
// });

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	}
// 	else {
// 		console.log(post);
// 	}
// });



