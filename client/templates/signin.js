Template.SignIn.events({
  'submit #signInForm': function(e, t) {
    e.preventDefault();

    var signInForm = $(e.currentTarget),
          email = trimInput(signInForm.find('#signInEmail').val().toLowerCase()),
          password = signInForm.find('#signInPassword').val();

    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {

      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          console.log('These credentials are not valid.');
        } else {
          console.log('Welcome back Meteorite!');
          $('#signin-modal').modal('hide');
          Router.go('/signout');
        }
      });

    }
    return false;
  },
  'click #signup-button': function(){
        $("#signup-modal").modal();
    }
});


/* Multiple Modals:
 * http://stackoverflow.com/questions/19528173/bootstrap-open-another-modal-in-modal
 */