var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	https 		= require('https'),
	api 		= require('../public/js/api');

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
		var query = "https://api.jikan.moe/v3/search/manga?q=" + keyword + "&type=" + type + "&limit=12";

		if((type == 'manga') || (type == 'novel')){
			api.call(nsfw == 1 ? query : query + "&genre=12&genre_exclude=0", function(searchRes){
				res.render('requests/index', {results: searchRes.results});
			});
		};
	};
});

router.get('/request/show', function(req,res){
	var id = req.query.id;
	var query = "https://api.jikan.moe/v3/manga/"+ id;
	api.call(query, function(info){
		query += "/recommendations";
		api.call(query, function(newRecs){
			res.render('requests/show', {recs: newRecs.recommendations, mangaInfo: info});			
		});
	});
});

module.exports = router;