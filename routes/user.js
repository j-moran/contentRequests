var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	middleware  = require('../middleware');

// USER PROFILE ROUTES

router.get('/profile',middleware.isLoggedIn, function(req,res){
	res.render('users/index');
});

router.get('/profile/edit', middleware.isLoggedIn, function(req,res){
	res.render('users/edit');
});

router.post('/profile/edit', middleware.isLoggedIn, function(req,res){
	//get user info and change it 
	res.redirect('/profile');
});

module.exports = router;