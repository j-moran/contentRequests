var https = require('https');

module.exports = {
	call: function(request, callback){
		https.get(request, (resp) => {
			let data = '';

			resp.on('data', (chunk) => {
				data += chunk;
			});

			resp.on('end', () => {
				var parsedData = JSON.parse(data);
				
				// console.log(parsedData);
				console.log("Call Completed at:" + new Date());
				callback(parsedData);
			});
		}).on('error', (err) => {
			console.log("Error: " + err.message);
			res.redirect('/request');
		});
	}
};