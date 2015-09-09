Template.signUp.onCreated(function() { 
    Session.set('signupSubmitErrors', {});
});

Template.signUp.helpers({ 
    errorMessage: function(field) {
        return Session.get('signupSubmitErrors')[field]; 
    },
    errorClass: function (field) {
        return !!Session.get('signupSubmitErrors')[field] ? 'has-error' : '';
    } 
});

Template.signUp.events({
    'submit #signUpForm': function(e, t) {
        e.preventDefault();

        var signInForm = $(e.currentTarget);
        var user = {
            username: trimInput(signInForm.find('#signup-username').val().toLowerCase()),
            password: signInForm.find('#signup-password').val(),
            passwordConfirm: signInForm.find('#signup-password-confirm').val()
        };

        var errors = validateUser(user); 
        if (errors.username || errors.password)
            return Session.set('signupSubmitErrors', errors);

        Accounts.createUser({username: user.username, password: user.password}, function(err) {
            if (err) {
                console.log(err);
                if (err.message === 'Username already exists. [403]') {
                    errors = {username: "We are sorry but this username is already used."};
                } else {
                    errors = {username: "We are sorry but something went wrong."};
                }
                return Session.set('signupSubmitErrors', errors);
            } else {
                $('#signup-modal').modal('hide');
                Router.go('/dashboard');
            }
        });
    },
    'click #signin-button': function(){
        $("#signin-modal").modal();
    },
    'click #facebook-signup': function(){
        Meteor.loginWithFacebook(function(err){
            if (err) {
                console.log("Error in loginWithFacebook in signup");
            } else {
                console.log('Congrats new Meteorite, you\'re in!');
                $('#signup-modal').modal('hide');
                Router.go('/dashboard');
            }
        });
    }
});