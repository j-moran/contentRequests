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
	secret: 'Maryhadalittlelamb',
	resave: false,
	saveUninitialized: false
}));

app.use(pageRoutes);
app.use(authRoutes);

//=======================
//Server Settings
//=======================
var port = process.env.PORT || 80;
app.listen(port, function(){
	console.log('Server Started!');
});