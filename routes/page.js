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

router.get('/search', function(req,res){
	var keyword = encodeURI(req.query.title);
	var type = (req.query.media);

	if((type == 'manga') || (type == 'novel')){
		https.get("https://kitsu.io/api/edge/manga?filter%5Btext%5D=" + keyword + "&filter%5Bsubtype%5D=" + type, (resp) => {
			let data = '';

			resp.on('data', (chunk) => {
				data += chunk;
			});

			resp.on('end', () => {
				var parsedData = JSON.parse(data);
				var results = parsedData.data;
				var links = parsedData.links;
				console.log(results[0].attributes.coverImage);
				res.render('results/index', {results: results, links: links});
			});
		}).on('error', (err) => {
			console.log("Error: " + err.message);
		});
	};
});

router.get('/results', function(req,res){
	res.render('results/index');
});

router.get('/request', function(req,res){
	res.render('requests/index');
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