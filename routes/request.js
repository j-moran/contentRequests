var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	middleware  = require('../middleware');

router.get('/myrequests', middleware.isLoggedIn, function(req,res){
	var query = {};
	query['username'] = req.user.username.toLowerCase();

	User.findOne(query).populate("requests").exec(function(err, foundUser){
		if(err){
			console.log(err);
		} else {
			var requests = foundUser.requests;
			res.render('requests/index', {requests: requests});
		};
	});
});

router.post('/myrequests', function(req,res){
	var reqLink = "/search/show?media=" + req.body.type + "&id=" + req.body.id;
	var query = {};
	query['_id'] = req.body.user;

	User.findOne(query, function(err, foundUser){
		if(err){
			console.log(err);
		};
		
		var request = new Request({
			type: req.body.type,
			title: req.body.title,
			id: req.body.id,
			link: reqLink,
			filled: false,
			requester: foundUser._id
		});

		request.save(function(err, request){
			if(err){
				console.log(err);
				req.flash("error", "Unable to submit request. Error: " + err);
				res.redirect(reqLink);
			};

			foundUser.requests.push(request._id);
			foundUser.save(function(err){
				if(err){
					console.log(err);
				};

				req.flash("success", "Request submitted successfully!");
				res.redirect('/myrequests');
			});
		});
	});
});

module.exports = router;