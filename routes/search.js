var express 	= require('express'),
	router		= express.Router(),
	https 		= require('https'),
	convert 	= require('xml-js'),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	api 		= require('../functions/api'),
	middleware  = require('../middleware');

// SEARCH ROUTES

router.get('/search', middleware.isLoggedIn, function(req,res){
	var keyword = encodeURI(req.query.keyword);
	var type = req.query.media;
	var query;

	if(Object.keys(req.query).length === 0){
		res.render('searches/index');
	} else{

		if((type == 'manga') || (type == 'novel')){
			var nsfw = req.query.nsfw;
			query = "https://api.jikan.moe/v3/search/manga?q=" + keyword + "&type=" + type + "&limit=15";
			
			api.call(nsfw == 1 ? query : query + "&genre=12&genre_exclude=0", function(searchRes){
				var searchRes = JSON.parse(searchRes);

				res.render('searches/index', {results: searchRes.results, media: type});
			});
		} else if(type == 'ebook'){
			query = "https://www.goodreads.com/search.xml?key=" + process.env.GR_KEY + "&q=" + keyword;

			api.call(query, function(searchRes){
				var options = {
					compact: true,
					trim: true,
					nativeType: true,
					ignoreDeclaration: true,
					ignoreDoctype: true, 
					spaces: 2,
					textKey: 'text',
					attributesKey: 'attributes'
				};
				var searchRes = JSON.parse(convert.xml2json(searchRes, options));
				searchRes = searchRes.GoodreadsResponse.search.results.work;

				// console.log(searchRes[0].best_book.attributes.image_url);
				res.render('searches/index', {results: searchRes, media: type});
			});
		} //else if(type == 'comic'){
		// 	query = "https://superheroapi.com/api/" + process.env.SH_KEY + "&format=json&resources=volume&query=" + keyword;

		// 	api.call(query, function(searchRes){
		// 		console.log(searchRes);
		// 	});
		// }
		;


	};
});

router.get('/search/show', function(req,res){
	var id = req.query.id;
	var media = req.query.media;
	var query;

	if((media == 'manga') || (media == 'novel')){
		query = "https://api.jikan.moe/v3/manga/"+ id;
		
		api.call(query, function(info){
			var info = JSON.parse(info);
			query += "/recommendations";
			
			api.call(query, function(newRecs){
				var newRecs = JSON.parse(newRecs);
				query = {};
				query['id'] = req.query.id;

				Request.findOne(query, function(err, foundRequest){
					if(err){
						console.log(err);
					};

					if(foundRequest){
						res.render('searches/show', {recs: newRecs.recommendations, mangaInfo: info, requested: true});
					} else {
						res.render('searches/show', {recs: newRecs.recommendations, mangaInfo: info, requested: false});			
					};
				});
			});
		});
	} else if(media == 'ebook'){
		query = "https://www.goodreads.com/book/show/" + id + ".xml?key=" + process.env.GR_KEY;

		api.call(query, function(info){
			var options = {
				compact: true,
				trim: true,
				nativeType: true,
				ignoreDeclaration: true,
				ignoreDoctype: true, 
				spaces: 2,
				textKey: 'text',
				attributesKey: 'attributes',
				cdataKey: 'text'
			};
			var info = JSON.parse(convert.xml2json(info, options));
			info = info.GoodreadsResponse.book;
			query = {};
			query['id'] = req.query.id;

			Request.findOne(query, function(err, foundRequest){
				if(err){
					console.log(err);
				};

				if(foundRequest){
					res.render('searches/show', {bookInfo: info, media: media, requested: true});
				} else {
					res.render('searches/show', {bookInfo: info, media: media, requested: false});			
				};
			}); 
		});
	};
});

module.exports = router;