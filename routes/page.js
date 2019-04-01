var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request');

router.get('/', function(req,res){
	res.render('landing');
});

router.get('/profile/:user', function(req,res){
	res.render('users/index');
});

router.get('/request', function(req,res){
	res.render('requests/index');
});

module.exports = router;