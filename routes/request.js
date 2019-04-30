var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	middleware  = require('../middleware');

router.get('/myrequests', middleware.isLoggedIn, function(req,res){
	res.render('requests/index');
});

router.post('/myrequests', function(req,res){
	console.log(req.body);
	req.flash("success", "Request submitted successfully!");
	res.redirect('/myrequests');
});


module.exports = router;