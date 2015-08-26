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
    }
});