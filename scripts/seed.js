function seedDB(){
	User.find({"username" : "admin"}, function(user,err){
		if(!user){
			User.register({username: 'admin'}, 'password', function(err, user){
				if(err){
					return false;
				};
				user.permissions = ['admin'];
				user.firstLogOn = true;
				console.log(user);
				user.save();
				console.log('User created');
			});
		};
	});
};

module.exports = seedDB;
		