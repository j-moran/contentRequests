var express 	= require('express'),
	router		= express.Router(),
	crypto		= require('crypto'),
	nodemailer	= require('nodemailer'),
	Invite		= require('../models/invite'),
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

router.get('/dashboard', function(req,res){
	res.render('dashboard/index');
});

router.get('/invite', middleware.isLoggedIn, middleware.isAdmin, function(req,res){
	res.render('invite');
});

router.post('/invite', function(req,res){
	var inviteEmail = req.body.email;
	var inviteCode = crypto.createHash('sha256').update(inviteEmail).digest('base64');
	var invite = new Invite({
		email: inviteEmail,
		code: inviteCode
	});

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
});

module.exports = router