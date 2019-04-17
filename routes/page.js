var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	https 		= require('https');

router.get('/', function(req,res){
	res.render('landing');
});

router.get('/profile', function(req,res){
	res.render('users/index');
});

router.get('/request', function(req,res){
	if(Object.keys(req.query).length === 0){
		res.render('requests/index');
	} else{
		var keyword = encodeURI(req.query.keyword);
		var type = req.query.media;
		var nsfw = req.query.nsfw;
		var baseQuery = "https://api.jikan.moe/v3/search/manga?q=" + keyword + "&type=" + type + "&limit=12&genre=12&genre_exclude=0";
		var nsfwQuery = "https://api.jikan.moe/v3/search/manga?q=" + keyword + "&type=" + type + "&limit=10";

		if((type == 'manga') || (type == 'novel')){
			https.get(nsfw == 1 ? nsfwQuery : baseQuery, (resp) => {
				let data = '';

				resp.on('data', (chunk) => {
					data += chunk;
				});

				resp.on('end', () => {
					var parsedData = JSON.parse(data);
					var results = parsedData.results;
					
					console.log(results[0]);
					res.render('requests/index', {results: results});
				});
			}).on('error', (err) => {
				console.log("Error: " + err.message);
			});
		};
	};
});

router.get('/request/show', function(req,res){
	var id = req.query.id;
	var query = req.query;
	https.get("https://api.jikan.moe/v3/manga/"+ id + "/recommendations", (resp) => {
		let data = '';

		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			var parsedData = JSON.parse(data);
			var recommendations = parsedData.recommendations;
			
			// console.log(recommendations);
			res.render('requests/show', {recs: recommendations, query: query});
		});
	}).on('error', (err) => {
		console.log("Error: " + err.message);
		res.redirect('/request');
	});
});

module.exports = router;



/*axios.get("https://kitsu.io/api/edge/manga?filter%5Btext%5D=" + keyword + "&filter%5Bsubtype%5D=" + type)
			.then(response => {
				var result = response.data.data;

				result.forEach(function(item){
					if(item.attributes.titles.en){
						console.log(item.attributes.titles.en);
					} else {
						console.log(item.attributes.titles.en_jp);
					};
					
					console.log(item.attributes.subtype);
					console.log("https://kitsu.io/manga/" + item.attributes.slug);
					console.log('--------------------------------');
				});
				// console.log(response.data.synopsis);
			})
			.catch(error => {
				console.log(error);
			}); */