var express 	= require('express'),
	router		= express.Router(),
	crypto		= require('crypto'),
	nodemailer	= require('nodemailer'),
	Invite		= require('../models/invite'),
	User 		= require('../models/user'),
	functions 	= require('../functions/main'),
	middleware	= require('../middleware');

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
//Admin Routes
//=======================

router.get('/dashboard', middleware.isLoggedIn, middleware.isAdmin, function(req,res){
	res.render('dashboard/index');
});

router.get('/invite', middleware.isLoggedIn, middleware.isAdmin, function(req,res){
	res.render('invites/index');
});

router.post('/invite', middleware.isLoggedIn, middleware.isAdmin, function(req,res){
	var inviteEmail = req.body.email.toLowerCase();
	var inviteCode = functions.generateInvite(inviteEmail);
	var invite = new Invite({
		email: inviteEmail,
		code: inviteCode
	});
	var query = {};
	query['email'] = inviteEmail;

	User.findOne(query, function(err, foundUser){
		if(!foundUser){
			invite.save(function(err,invite){
				if(err){
					console.log(err);
					req.flash('error', 'There was a problem sending this invite. Error: ' + err);
					res.redirect('/' + process.env.APP_PREFIX + '/dashboard');
				};

				var mailOptions = {
					from: 'Postmaster <postmaster@morans.info>',
					to: inviteEmail,
					subject: 'Morans.info Book Request Invite',
					html: 
						'<p>Your invite code for morans.info book requests is below:</p>\
						</br>\
						<p>Please use your individual code to register your account. <a href="https://morans.info/bookrequest/register">Register Here</a>.\
						</br>\
						<p>Invite code: ' + inviteCode + '</p>\
						</br>\
						<p>If you did not request this account, please reply back to this message and the account will be taken care of.'
				};

				transporter.sendMail(mailOptions, function (err, info) {
				   if(err)
				     console.log(err)
				   //else
				     //console.log(info);
				});

				//Send Email with invite code
				req.flash('success', 'Invite submitted successfully!');
				res.redirect('/' + process.env.APP_PREFIX + '/dashboard');
			});
		} else {
			req.flash('error', 'That email address is already associated with an account. Only one account may exist per email address.');
			res.redirect('/' + process.env.APP_PREFIX + '/invite');
		};
	});
});

router.get('/users', middleware.isLoggedIn, middleware.isAdmin, function(req,res){
	User.find(function(err, foundUsers){
		if(err){
			console.log(err);
		};

		res.render('users/index', {users: foundUsers});
	});
});

module.exports = router