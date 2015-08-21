// Set up login services
// Default publishes username, emails, and profile
Meteor.startup(function() {
});



// Add Facebook configuration entry
ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  { $set: {
      appId: "861172040640182",
      secret: "d61b9018a06439f1d012c90e6f55db8c"
    }
  }
);