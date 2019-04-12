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

app.use(pageRoutes);
app.use(authRoutes);

//=======================
//Server Settings
//=======================
var port = process.env.APP_PORT;
app.listen(port, function(){
	console.log('Server Started!');
});