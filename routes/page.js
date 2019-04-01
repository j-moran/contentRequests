var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request');

router.get('/', function(req,res){
	res.render('landing');
});

module.exports = router;