function seedDB(){
	if(!User.find({"username" : "admin"})){
		User.register({username: 'admin'}, 'password', function(err, user){
			if(err){
				console.log(err);
			};
			user.permissions = ['admin'];
			user.save();
			console.log('User created');
		});
	};
};

module.exports = seedDB;