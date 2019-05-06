var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	middleware  = require('../middleware');

router.get('/myrequests', middleware.isLoggedIn, function(req,res){
	res.render('requests/index');
});

router.post('/myrequests', function(req,res){
	var request = new Request({
		type: req.body.type,
		title: req.body.title,
		id: req.body.id,
		link: req.protocol + '://' + req.get('host') + req.originalUrl,
		filled: false,
		requester: req.body.user
	});

	request.save(function(err){
		if(err){
			console.log(err);
		};
	});

	User.findOne({_id: req.body.user}).populate('requests').exec(function(err, requests){
		if(err){
			// console.log(err);
		};

		// console.log(JSON.stringify(requests, null, "\t"));

		req.flash("success", "Request submitted successfully!");
		res.redirect('/myrequests');
	});

});


module.exports = router;