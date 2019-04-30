var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	middleware  = require('../middleware');

router.get('/myrequests', function(req,res){
	res.render('requests/index');
});


module.exports = router;