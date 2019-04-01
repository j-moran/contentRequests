let mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	permissions: [],
	created: {type: Date, default: Date.now}
});

//userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);