Template.SignOut.events({
	'click #signOut': function(e, t) {

	    Meteor.logout(function(err) {
	    	if(err){
	    		console.log("Error in logging out: ", err);
	    	} else {
		    	console.log('Bye Meteorite! Come back whenever you want!');
		    	Router.go('/');
		    }
	    });

    	return false;
	}
});