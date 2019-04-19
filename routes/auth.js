var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request');

router.get('/login', function(req,res){
	res.render('login');
});

module.exports = router;