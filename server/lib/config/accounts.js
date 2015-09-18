// Set up login services
// Default publishes username, emails, and profile
Meteor.startup(function() {
});



// Add Facebook configuration entry
ServiceConfiguration.configurations.upsert(
	{ service: "facebook" },
	{ $set: {
		// deployed on meteor
		appId: "1858839847675421",
    	secret: "b7013705f8c3d8e466c5ceb511d8e076"

    	// local
    	//appId: "861172040640182",
    	//secret: "d61b9018a06439f1d012c90e6f55db8c"
		}
	}
);