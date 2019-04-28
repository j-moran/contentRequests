var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request');

router.get('/login', function(req,res){
	res.render('login');
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true, successFlash: 'You have been successfully signed in!'}), function(req,res){
	if(req.session.redirect_to){
		res.redirect(req.session.redirect_to);
		delete req.session.redirect_to;
	} else {
		res.redirect('/');
	};
});

router.get('/logout', function(req,res){
	req.logout();
	req.flash("success", "You have been successfully logged out!");
	res.redirect('/');
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
		user.permissions = '';
		user.save();

		// console.log(user);
		passport.authenticate('local')(req,res,function(){
			req.flash("success", "User created successfully!");
			res.redirect('/');
		});

	});
});

module.exports = router;