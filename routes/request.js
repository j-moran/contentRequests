var express 	= require('express'),
	router		= express.Router(),
	nodemailer	= require('nodemailer'),
	User		= require('../models/user'),
	Request		= require('../models/request'),
	middleware  = require('../middleware');


//=======================
//Email Setup
//=======================
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASS
    }
});

//=======================
//Request Routes
//=======================
router.get('/myrequests', middleware.isLoggedIn, function(req,res){
	var fillCount = 0;
	var query = {};
	query['username'] = req.user.username.toLowerCase();

	if(req.user.username == 'admin'){
		Request.find({}).populate("requester").exec(function(err, allRequests){
			if(err){
				console.log(err);
			};

			allRequests.forEach(function(request){
				if(!request.filled){
					fillCount++;
				};
			});

			res.render('requests/index', {requests: allRequests, count: fillCount});
		});
	} else {
		User.findOne(query).populate("requests").exec(function(err, foundUser){
			if(err){
				console.log(err);
			};

			foundUser.requests.forEach(function(request){
				if(!request.filled){
					fillCount++;
				};
			});
			
			res.render('requests/index', {requests: foundUser.requests, count: fillCount});
		});
	};
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
			author: req.body.author,
			id: req.body.id,
			type: req.body.type,
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
				res.redirect('/' + process.env.APP_PREFIX + '/myrequests');
			});
		});
	});
});

router.get('/myrequests/fill', middleware.isLoggedIn, middleware.isAdmin, function(req,res){
	var reqId = req.query.id;
	var userEmail = req.query.email;
	var query = {};
	query['id'] = reqId;

	Request.findOneAndUpdate(query, { filled: 'true' }, function(err, foundRequest){
		if(err){
			console.log(err);
			req.flash('error', 'There was a problem with your request. Please try again.');
			res.redirect('/' + process.env.APP_PREFIX + '/myrequests');
		} else {
			var mailOptions = {
				from: 'Postmaster <postmaster@morans.info>',
				to: userEmail,
				subject: 'Morans.info Request Filled',
				html: 
					'<p>Your request for <strong>' + foundRequest.title + '</strong> has been filled.</p>\
					</br>\
					<hr>\
					<p>Morans.info</p>'
			};

			transporter.sendMail(mailOptions, function (err, info) {
			   if(err)
			     console.log(err)
			   //else
			     //console.log(info);
			});

			req.flash('success', 'Request filled successfully.');
			res.redirect('/' + process.env.APP_PREFIX + '/myrequests');
		};
	});
});

module.exports = router;