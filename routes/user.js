var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	middleware  = require('../middleware');

// USER PROFILE ROUTES

router.get('/profile',middleware.isLoggedIn, function(req,res){
	res.render('profile/index');
});

router.get('/profile/edit', middleware.isLoggedIn, function(req,res){
	res.render('profile/edit');
});

router.post('/profile/edit', middleware.isLoggedIn, function(req,res){
	var query = {};
	query['username'] = req.user.username;

	User.findOne(query, function(err, foundUser){
		if(err){
			console.log(err);
		} else {
			var changes = {
				//changes go here
			};

			User.update(query, changes, function(err){
				if(err){
					console.log(err);
				} else {
					res.redirect('/' + process.env.APP_PREFIX + '/profile');
				};
			});
		};
	});
});

module.exports = router;