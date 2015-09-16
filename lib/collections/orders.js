Orders = new Mongo.Collection('orders');

Orders.allow({
	insert: function(userId, doc){
		return true;
	},
	update: function(userId, doc, fields, modifier){
		return true;
	},
	remove: function(userId, doc){
		return true;
	}
});


validateOrder = function (order) { 
	var errors = {};

	if (!order.name)
		errors.name = "Please fill in a name";

	if (!order.birthday)
		errors.birthday = "Please fill in a URL";

	if (!order.address)
		errors.address = "Please fill in an address";

	if (!order.phone){
		errors.phone = "Please fill in an phone";
	} else if (!/^\d{10}$/.test(order.phone)){
		errors.phone = "Must be in format (201) 123-4567";
	}

	return errors; 
}

Meteor.methods({
	orderInsert: function(orderAttributes) {
		check(this.userId, String); 
		//check(postAttributes, {
		//	title: String,
		//	url: String
		//});

		var errors = validateOrder(orderAttributes); 
		if (errors.name || errors.birthday || errors.address || errors.phone)
			throw new Meteor.Error('invalid-order', "You must set a the fields for your order");
		

		//var user = Meteor.user();
		//var order = _.extend(postAttributes, {
		//	userId: user._id, 
		//	author: user.username, 
		//	submitted: new Date()
		//});

		var validateError = 0;
		var orderId = Orders.insert(orderAttributes, function(error){
			if (error) 
				validateError = error.message;
		});

		if (validateError)
			return {error: validateError};

		return {
			_id: orderId
		};
	}
});