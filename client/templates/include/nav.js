Template.nav.onRendered(function(){
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    // Initialize WOW.js Scrolling Animations
	new WOW().init();

});

Template.nav.events({
	// Closes the Responsive Menu on Menu Item Click
	'click .navbar-collapse ul li a': function() {
    	$('.navbar-toggle:visible').click();
	},
	'click .page-scroll':function(event) {
        var $anchor = $(event.target);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    },
    'click #nav-signin':function(){
        if (Meteor.user()){
            Router.go("/dashboard");
        } else {
            $("#signin-modal").modal();
        }
    },
    'click #nav-signout':function(){
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

