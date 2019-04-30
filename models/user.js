let mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


let userSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	imageURL: String,
	permissions: [],
	requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request'}],
	created: {type: Date, default: Date.now}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);