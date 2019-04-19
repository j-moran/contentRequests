var express 	= require('express'),
	router		= express.Router(),
	https 		= require('https'),
	convert 	= require('xml-js'),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	api 		= require('../public/js/api');

router.get('/', function(req,res){
	res.render('landing');
});

router.get('/profile', function(req,res){
	res.render('users/index');
});

router.get('/request', function(req,res){
	var keyword = encodeURI(req.query.keyword);
	var type = req.query.media;
	var query;

	if(Object.keys(req.query).length === 0){
		res.render('requests/index');
	} else{

		if((type == 'manga') || (type == 'novel')){
			var nsfw = req.query.nsfw;
			query = "https://api.jikan.moe/v3/search/manga?q=" + keyword + "&type=" + type + "&limit=15";
			
			api.call(nsfw == 1 ? query : query + "&genre=12&genre_exclude=0", function(searchRes){
				var searchRes = JSON.parse(searchRes);

				res.render('requests/index', {results: searchRes.results});
			});
		} else if(type == 'ebook'){
			query = "https://www.googleapis.com/books/v1/volumes?q=" + keyword + "&maxResults=15&langRestrict=en&orderBy=relevance&filter=paid-ebooks";

			api.call(query, function(searchRes){
				
				var searchRes = JSON.parse(searchRes);
				searchRes = searchRes.items;
				
				// console.log(searchRes);
				res.render('requests/index', {results: searchRes});
			});
		};
	};
});

router.get('/request/show', function(req,res){
	var id = req.query.id;

	if(id.match(/[a-z]/i)){
		query = "https://www.googleapis.com/books/v1/volumes/" + id;

		api.call(query, function(info){
			var info = JSON.parse(info);
			res.render('requests/show', {bookInfo: info});
		});
	} else {
		query = "https://api.jikan.moe/v3/manga/"+ id;
		
		api.call(query, function(info){
			var info = JSON.parse(info);
			query += "/recommendations";
			
			api.call(query, function(newRecs){
				var newRecs = JSON.parse(newRecs);
				
				res.render('requests/show', {recs: newRecs.recommendations, mangaInfo: info});			
			});
		});
	};
});

module.exports = router;