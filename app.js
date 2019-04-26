//=======================
//General Variables and Requires
//=======================
var express 		= require('express')
	app 			= express(),
	bodyParser 		= require('body-parser'),
	mongoose 		= require('mongoose'),
	flash 			= require('connect-flash'),
	passport 		= require('passport'),
	LocalStrategy 	= require('passport-local').Strategy,
	User			= require('./models/user'),
	Request			= require('./models/request');

require('dotenv').config();

//=======================
//Route Variables
//=======================
var pageRoutes 		= require('./routes/page'),
	authRoutes 		= require('./routes/auth');

//=======================
//Database Setup
//=======================
var Database		= require('./scripts/database');


//=======================
//App Setup
//=======================
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(require('express-session')({
	secret: process.env.APP_SECRET,
	resave: false,
	saveUninitialized: false
}));

// app.use((req, res, next) => {
//     req.session.referrer = req.protocol + '://' + req.get('host') + req.originalUrl;
//     next();
// });

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(pageRoutes);
app.use(authRoutes);

//=======================
//Server Settings
//=======================
var port = process.env.APP_PORT;
app.listen(port, function(){
	console.log('Server Started!');
});