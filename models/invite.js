let mongoose = require('mongoose');

let inviteSchema = new mongoose.Schema({
	email: String,
	code: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Invite', inviteSchema);