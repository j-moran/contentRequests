var express 	= require('express'),
	router		= express.Router(),
	nodemailer	= require('nodemailer'),
	Invite 		= require('../models/invite'),
	User		= require('../models/user'),
	Request		= require('../models/request');

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
//Auth Routes
//=======================
router.get('/login', function(req,res){
	res.render('login');
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/' + process.env.APP_PREFIX + '/login', failureFlash: true, successFlash: 'You have been successfully signed in!'}), function(req,res){
	if(req.session.redirect_to){
		var redirect = req.session.redirect_to;
		delete req.session.redirect_to;
		
		res.redirect(redirect);
	} else {
		res.redirect('/' + process.env.APP_PREFIX);
	};
});

router.get('/logout', function(req,res){
	req.logout();
	req.flash("success", "You have been successfully logged out!");
	res.redirect('/' + process.env.APP_PREFIX + '/login');
});

router.get('/register', function(req,res){
	res.render('register');
});

router.post('/register', function(req,res){
	var newUser = new User({username: req.body.username});
	var query = {};
	query['code'] = req.body.invite;

	Invite.findOne(query, function(err, foundInvite){
		if(err){
			req.flash("error", "Unable to create user. Please contact site administrator. Error: " + err.message);
			return res.redirect('/' + process.env.APP_PREFIX + '/register');
		};

		if(!foundInvite){
			req.flash('error', 'Invalid invite code entered. Please use a valid invite code and try again.');
			return res.redirect('/' + process.env.APP_PREFIX + '/register');
		} else if(foundInvite){
			User.register(newUser, req.body.password, function(err, user){
				if(err){
					req.flash("error", "Unable to create user. Please contact site administrator. Error: " + err.message);
					return res.redirect('/' + process.env.APP_PREFIX + '/register');
				};
				user.firstName = req.body.firstName;
				user.lastName = req.body.lastName;
				user.email = req.body.email;
				user.save();

				var mailOptions = {
					from: 'Postmaster <postmaster@morans.info>',
					to: user.email,
					subject: 'New Account Created',
					html: 
						'<p>New account set up for: ' + req.body.username + '</p>\
						</br>\
						<p>Please sign in at <a href="https://morans.info/bookrequest">morans.info/bookrequest</a>.\
						</br>\
						<p>If you did not request this account, please reply back to this message and the account will be taken care of.'
				};

				transporter.sendMail(mailOptions, function (err, info) {
				   if(err)
				     console.log(err)
				   //else
				     //console.log(info);
				});

				Invite.deleteOne(query, function(err){
					if(err){
						console.log(err);
					};

					req.flash("success", "You have successfully created your new account! To use the site please log in below!");
					res.redirect('/' + process.env.APP_PREFIX + '/login');
				});
			});
		};
	});
});

module.exports = router;