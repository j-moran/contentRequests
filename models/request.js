let mongoose = require('mongoose');

let requestSchema = new mongoose.Schema({
	type: 	String,
	title: 	String,
	id: 	String,
	link: 	String,
	filled: Boolean,
	requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Request', requestSchema);