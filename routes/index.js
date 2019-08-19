var express = require('express'),
	router = express.Router();

router.use(require('./search'));
router.use(require('./auth'));
router.use(require('./user'));
router.use(require('./request'));
router.use(require('./admin'));

router.get('/', function(req,res){
	res.render('landing');
});

router.get('/about', function(req,res){
	res.render('about');
});

module.exports = router