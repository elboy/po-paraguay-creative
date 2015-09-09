Template.signIn.onCreated(function() { 
    Session.set('signinSubmitErrors', {});
});

Template.signIn.helpers({ 
    errorMessage: function(field) {
        return Session.get('signinSubmitErrors')[field]; 
    },
    errorClass: function (field) {
        return !!Session.get('signinSubmitErrors')[field] ? 'has-error' : '';
    } 
});

Template.signIn.events({
    'submit #signin-form': function(e, t) {
        e.preventDefault();

        var signInForm = $(e.currentTarget);
        var user = {
            username: trimInput(signInForm.find('#signin-username').val().toLowerCase()),
            password: signInForm.find('#signin-password').val(),
            passwordConfirm: signInForm.find('#signin-password').val()
        };

        var errors = validateUser(user); 
        if (errors.username || errors.password)
            return Session.set('signinSubmitErrors', errors);

        Meteor.loginWithPassword(user.username, user.password, function(err) {
            if (err) {
                errors = {password: "These credentials are incorrect."};
                return Session.set('signinSubmitErrors', errors);
            } else {
                $('#signin-modal').modal('hide');
                Router.go('dashboard');
            }
        });
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