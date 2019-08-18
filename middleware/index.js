var middleware = {
	isLoggedIn: function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		};

		req.session.redirect_to = '/' + process.env.APP_PREFIX + req.path;
		req.flash("error", "You must be logged in to access this page!");
		res.redirect("/" + process.env.APP_PREFIX + "/login");
	},

	isAdmin: function(req,res,next){
		if(res.locals.currentUser.permissions.includes('admin')){
			return next();
		} else {
			req.flash("error", "You must be an admin to view this page!");
			res.redirect(( req.path || '/'));
		};
	},

	previousPage: function(req,res,next){
		req.session.redirect_to = '/' + process.env.APP_PREFIX + req.path;
	}	
};

module.exports = middleware;