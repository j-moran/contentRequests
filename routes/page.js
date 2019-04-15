var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/user'),
	Request		= require('../models/request');

router.get('/', function(req,res){
	res.render('landing');
});

router.get('/profile', function(req,res){
	res.render('users/index');
});

// router.get('/search', function(req,res){
// 	switch(req.params.type){
// 		case 'ebook':

// 			break;
// 		case 'manga':
// 			break;
// 		case 'novel':
// 			break; 
// 	};
// });

//router.get('/results', function(req,res){

//});

router.get('/request', function(req,res){
	res.render('requests/index');
});

module.exports = router;