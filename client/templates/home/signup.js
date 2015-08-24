Template.signUp.events({
    'submit #signUpForm': function(e, t) {
        e.preventDefault();

        var signUpForm = $(e.currentTarget),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase()),
            password = signUpForm.find('#signUpPassword').val(),
            passwordConfirm = signUpForm.find('#signUpPasswordConfirm').val();

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {

            Accounts.createUser({email: email, password: password}, function(err) {
                if (err) {
                    if (err.message === 'Email already exists. [403]') {
                        console.log('We are sorry but this email is already used.');
                    } else {
                        console.log('We are sorry but something went wrong.');
                    }
                } else {
                    console.log('Congrats new Meteorite, you\'re in!');
                    $('#signup-modal').modal('hide');
                    Router.go('/dashboard');
                }
            });

        }
        return false;
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