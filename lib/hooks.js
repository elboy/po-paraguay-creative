if(Meteor.isClient){
	// When a user is logged in, take them to the signout page
	Accounts.onLogin(function(){
		Router.go("/signout");
	});

	// Not necessary, loginWith<Service> handles this error
	Accounts.onLoginFailure(function(){
		// do nothing
	});
}