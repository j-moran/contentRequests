var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	middleware  = require('../middleware');

router.get('/myrequests', middleware.isLoggedIn, function(req,res){
	User.findOne({username: req.user.username.toLowerCase()}).populate('requests').exec(function(err, requests){
		if(err){
			console.log(err);
		};

		var requests = JSON.stringify(requests, null, "\t");

		console.log(requests);
		res.render('requests/index', {requests: requests});
	});
});

router.post('/myrequests', function(req,res){
	var reqLink = req.protocol + '://' + req.get('host') + req.originalUrl;
	var request = new Request({
		type: req.body.type,
		title: req.body.title,
		id: req.body.id,
		link: reqLink,
		filled: false,
		requester: req.body.user
	});

	request.save(function(err){
		if(err){
			console.log(err);
			req.flash("error", "Unable to submit request. Error: " + err);
			res.redirect(reqLink);
		};

		req.flash("success", "Request submitted successfully!");
		res.redirect('/myrequests');
	});
});


module.exports = router;