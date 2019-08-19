let mongoose = require('mongoose');

let inviteSchema = new mongoose.Schema({
	email: String,
	code: String
});

module.exports = mongoose.model('Invite', inviteSchema);