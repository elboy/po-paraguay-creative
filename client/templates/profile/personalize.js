Template.personalize.onCreated(function(){
	Session.set("tab", "tab-personalize");
	console.log("in on created in personalize");
});

Template.personalize.helpers({
	
});

Template.personalize.events({
	'click .personalize-to-checkout':function(){
		var orderId = this._id;
		Orders.update(orderId, {$set: {reached_checkout: true}}, function(error, result){
			if (error){
				console.log("error: ", error);
			} else {
				console.log("result is: ", result);
				Router.go('checkout', {_id: orderId});
			}
		});
	}
});