trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    //console.log('Please fill in all required fields.');
    return false;
};

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    //console.log('Please enter a valid email address.');
    return false;
};

isUsername = function(value) {
    if (value.length < 6) {
        //console.log('Username should be 6 characters or longer.');
        return false;
    }
    return true;
}

isValidPassword = function(password) {
    if (password.length < 6) {
        //console.log('Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};

areValidPasswords = function(password, confirm) {
    //if (!isValidPassword(password)) {
    //    return false;
    //}
    if (password !== confirm) {
        //console.log('Your two passwords are not equivalent.');
        return false;
    }
    return true;
};