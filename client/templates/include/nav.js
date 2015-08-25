Template.nav.onRendered(function(){
    // Initialize WOW.js Scrolling Animations
	new WOW().init();

});

Template.nav.events({
	// Closes the Responsive Menu on Menu Item Click
	'click .navbar-collapse ul li a': function() {
    	$('.navbar-toggle:visible').click();
	},
    'click .signout':function(){
        Meteor.logout(function(err) {
            if(err){
                console.log("Error in logging out: ", err);
            } else {
                console.log('Bye Meteorite! Come back whenever you want!');
                // Iron Router routes to home
            }
        });
    }
});

