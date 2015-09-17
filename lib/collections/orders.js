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

	if (order.birthday.indexOf("Día") > -1 || 
		order.birthday.indexOf("Mes") > -1 ||
		order.birthday.indexOf("Año") > -1)
		errors.birthday = "Please fill in all inputs";

	if (!order.address)
		errors.address = "Please fill in an address";

	if (!order.phone){
		errors.phone = "Please fill in an phone";
	} else if (!/^\(\d{3}\) \d{3}-\d{3}$/.test(order.phone)){
		errors.phone = "Must be in format (021) 123-456";
	}

	return errors; 
}

Meteor.methods({
	orderInsert: function(){
		var userId = Meteor.userId();
		var createdAt = new Date;
		var args = {user_id: userId, created_at: createdAt};
		var orderId = Orders.insert(args, function(error){
			if (error){
				console.log(error);
			}
		});
		return {
			_id: orderId
		};
	},
	orderCreate: function(orderAttributes, orderId) {
		//check(this.userId, String); 

		var errors = validateOrder(orderAttributes); 
		if (errors.name || errors.birthday || errors.address || errors.phone)
			throw new Meteor.Error('invalid-order', "You must set the fields for your order");
		

		//var user = Meteor.user();
		//var order = _.extend(postAttributes, {
		//	userId: user._id, 
		//	author: user.username, 
		//	submitted: new Date()
		//});

		var validateError = 0;
		Orders.update(orderId, {$set: orderAttributes}, function(error){
			if (error) 
				validateError = error.message;
		});
		console.log("in method order created");

		if (validateError)
			return {error: validateError};
	},
	orderPersonalize: function(colors, orderId){
		colors.reached_checkout = true;
		console.log(colors);
		Orders.update(orderId, {$set: colors}, function(error, result){
			if (error){
				console.log("in method error is: ", error);
			} else {
				console.log("in method result is: ", result);
			}
		});
	},
	orderReachedPersonalize: function(orderId){
		Orders.update(orderId, {$set: {reached_personalize: true}}, function(error, result){
			if (error){
				console.log("in method error is: ", error);
			} else {
				console.log("in method result is: ", result);
			}
		});
	}
});