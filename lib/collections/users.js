validateUser = function (user) { 
	var errors = {};

	if (!isNotEmpty(user.username))
		errors.username = 'Please fill in all required fields.';

	if (!isUsername(user.username))
		errors.username = "Username should be 6 characters or longer.";

	if (!isValidPassword(user.password))
		errors.password = "Your password should be 6 characters or longer.";

	if (!areValidPasswords(user.password, user.passwordConfirm))
		errors.password = "Your two passwords are not equivalent.";
	
	return errors; 
};
