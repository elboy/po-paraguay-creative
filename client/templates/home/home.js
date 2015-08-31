Template.home.onRendered(function(){

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

});

Template.home.events({
    'click #myBtn': function(){
        if (Meteor.user()){
            Router.go("/dashboard");
        } else {
            $("#signin-modal").modal();
        }
    },
    'click .page-scroll':function(event) {
        var $anchor = $(event.target);
        console.log($anchor);
        console.log($anchor.attr("href"));
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    }
});