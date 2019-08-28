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
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}]
});

var User = mongoose.model("User", userSchema);

User.findOne({email: "references@gmail.com"}).populate("posts").exec(function(err, user){
	if(err){
		console.log(err);
	}
	else {
		console.log(user);
	}
});

// Post.create({
// 	title: "Ref Post",
// 	content: "asdasba"
// });


// Post.create({
// 	title: "Ref Post 2",
// 	content: "fffff"
// }, function(err, post){
// 	User.findOne({email: "references@gmail.com"}, function(err, user){
// 		user.posts.push(post);
// 		user.save(function(err, data){
// 			console.log(data);
// 		});
// 	});
// });

// User.create({
// 	email: "references@gmail.com",
// 	name: "references"
// });