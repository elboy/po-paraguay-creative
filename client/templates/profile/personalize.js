Template.personalize.helpers({
	
});

Template.personalize.events({
	'click .link-to-checkout':function(){
		var orderId = this._id;
		Orders.update(orderId, {$set: {reached_checkout: true}}, function(error, result){
			if (error){
				console.log("error: ", error);
			} else {
				console.log(result);
				Router.go('checkout', {_id: orderId});
			}
		});
	}
});