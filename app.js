//=======================
//General Variables and Requires
//=======================
var express 	= require('express')
	app 		= express(),
	bodyparser 	= require('body-parser'),
	mongoose 	= require('mongoose'),
	flash 		= require('connect-flash');

//=======================
//Route Variables
//=======================


//=======================
//Database Setup
//=======================


//=======================
//App Setup (Passport and Express)
//=======================


//=======================
//Server Settings
//=======================
var port = process.env.PORT || 80;
app.listen(port, function(){
	console.log('Server Started!');
});