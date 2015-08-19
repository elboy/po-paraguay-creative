Template.home.onRendered(function(){
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    // Initialize WOW.js Scrolling Animations
	new WOW().init();

});

Template.home.events({
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
    'click #myBtn': function(){
        $("#myModal").modal();
    }
});

