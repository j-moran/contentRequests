var https = require('https');

module.exports = {
	call: function(request){
		return https.get(request, (resp) => {
			let data = '';

			resp.on('data', (chunk) => {
				data += chunk;
			});

			resp.on('end', () => {
				console.log("call  complete");
			});
		}).on('error', (err) => {
			console.log("Error: " + err.message);
			res.redirect('/request');
		}).end();

	}
};