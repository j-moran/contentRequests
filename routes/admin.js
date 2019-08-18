var express 	= require('express'),
	router		= express.Router();

router.get('/dashboard', function(req,res){
	res.render('dashboard/index');
});