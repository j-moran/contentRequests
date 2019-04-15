var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	api			= new Kitsu();

router.get('/', function(req,res){
	res.render('landing');
});

router.get('/profile', function(req,res){
	res.render('users/index', {currentUser: 'admin'});
});

router.get('/search', function(req,res){

});

router.get('/request', function(req,res){
	res.render('requests/index');
});

module.exports = router;