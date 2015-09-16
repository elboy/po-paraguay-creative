/* 
 * When this website starts up, add admin and user roles
 */


if (Meteor.roles.find().count() === 0){
	Roles.createRole('admin');
	Roles.createRole('user');
}


if (Meteor.users.find().count() === 0) { 
	
 	var id = Accounts.createUser({
		username: "poadmin1",
		email: "poadmin1@yahoo.com",
		password: "adminpassword",
		profile: { name: "poadmin" }
	});


	Roles.addUsersToRoles(id, 'admin');
}

