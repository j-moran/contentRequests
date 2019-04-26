let mongoose = require('mongoose');

let requestSchema = new mongoose.Schema({
	type: 	String,
	title: 	String,
	id: 	String,
	link: 	String,
	dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Request', requestSchema);