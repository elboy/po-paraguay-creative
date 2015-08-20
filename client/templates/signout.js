Template.SignOut.events({
  'click #signOut': function(e, t) {

    Meteor.logout(function() {
      console.log('Bye Meteorite! Come back whenever you want!');
      Router.go('/');
    });

    return false;
  }
});