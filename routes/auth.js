var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request');

router.get('/login', function(req,res){
	res.render('login');
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true, successFlash: 'You have been successfully signed in!'}), function(req,res){
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

	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", "Unable to create user. Please contact site administrator. Error: " + err.message);
			return res.redirect('/register');
		};
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.email = req.body.email;
		user.save();

		req.flash("success", "You have successfully created your new account! To use the site please log in below!");
		res.redirect('/' + process.env.APP_PREFIX + '/login');
	});
});

module.exports = router;