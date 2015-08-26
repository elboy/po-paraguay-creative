Template.signIn.events({
    'submit #signin-form': function(e, t) {
        e.preventDefault();

        var signInForm = $(e.currentTarget),
            email = trimInput(signInForm.find('#signin-email').val().toLowerCase()),
            password = signInForm.find('#signin-password').val();

        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {

            Meteor.loginWithPassword(email, password, function(err) {
                if (err) {
                    console.log('These credentials are not valid.');
                } else {
                    console.log('Welcome back Po User!');
                    $('#signin-modal').modal('hide');
                    Router.go('dashboard');
                }
            });
        }
        return false;
    },
    'click #signup-button': function(){
        $("#signup-modal").modal();
    },
    'click #facebook-signin': function(){
        Meteor.loginWithFacebook(function(err){
            if (err) {
                console.log("Error in loginWithFacebook in signin");
            } else {
                console.log('Welcome back Po User!');
                $('#signin-modal').modal('hide');
                Router.go('dashboard');
            }
        });
    }
});


/* Multiple Modals:
 * http://stackoverflow.com/questions/19528173/bootstrap-open-another-modal-in-modal
 */