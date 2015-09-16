Accounts.onCreateUser(function(options, user){
	console.log("options ", options);
	console.log("user ", user);
/*
	if (options.profile){
		// this link is photo
		options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
		// in onCreateUser you have to manually add profile to user
		user.profile = options.profile;
	}
*/

	// 10207418032194886 is facebook id for Elliott
	/*
	if (options.profile.name === "Elliott Chartock"){
		// Elliott is admin
		user.roles = 'admin';
	} else {
		// everyone else is user
		user.roles = 'user';
	}
	*/



	return user;
});
