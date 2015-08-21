// Set up login services
// Default publishes username, emails, and profile
// Add Facebook configuration entry
ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  { $set: {
      appId: "861172040640182",
      secret: "d61b9018a06439f1d012c90e6f55db8c",
      loginStyle: "popup"
    }
  }
);


/* Called whenever a new user is created. Takes the new user object, 
 * and returns true to allow the creation or false to abort.
 * Can be called multiple times, all must return true.
 */
Accounts.validateNewUser(function(user){
  return true;
});

/* Called whenever a new user is created. Return the new user object, 
 * or throw an Error to abort the creation.
 * Default copies options.profile, this function overrides that.
 */
Accounts.onCreateUser(function(options, user){
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  return user;

});

/* Called whenever a login is attempted (either successful or unsuccessful). 
 * A login can be aborted by returning a falsy value or throwing an exception.
 * Calling stop() unregisters the callback.
 */
Accounts.validateLoginAttempt(function(attempt){
  return true;
});

/* Client takes care of onLogin handling
 */
Accounts.onLogin(function(){
  // do nothing
});

/* Client takes care of onLoginFailure handling
 */
Accounts.onLoginFailure(function(){
  // do nothing
});