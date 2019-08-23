var crypto = require('crypto');

module.exports = {
	generateInvite: function(email){
		var salt = crypto.randomBytes(256).toString('base64');
		var email = email + salt;
		var pass = crypto.createHash('sha512').update(email).digest('base64');
		return pass;
	}
};