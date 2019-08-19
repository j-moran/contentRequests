var express 	= require('express'),
	router		= express.Router(),
	crypto		= require('crypto'),
	nodemailer	= require('nodemailer'),
	Invite		= require('../models/invite'),
	middleware	= require('../middleware');

router.get('/dashboard', function(req,res){
	res.render('dashboard/index');
});

router.get('/invite', middleware.isLoggedIn, middleware.isAdmin, function(req,res){
	res.render('invite');
});

router.post('/invite', function(req,res){
	var inviteEmail = req.body.email;
	var invite = new Invite({
		email: inviteEmail,
		code: crypto.createHash('sha256').update(inviteEmail).digest('base64')
	});

	invite.save(function(err,invite){
		if(err){
			console.log(err);
			req.flash('error', 'There was a problem sending this invite. Error: ' + err);
			res.redirect('/' + process.env.APP_PREFIX + '/dashboard');
		};

		//Send Email with invite code
		req.flash('success', 'Invite submitted successfully!');
		res.redirect('/' + process.env.APP_PREFIX + '/dashboard');
	});
});

module.exports = router