// publishes data of current order for current user
Meteor.publish('currentOrder', function(currentOrder){
	var userId = this.userId;
	return Orders.find({user_id: userId, _id: currentOrder});
});

// publishes data of all orders for current user
Meteor.publish('userOrders', function(){
	var userId = this.userId;
	return Orders.find({user_id: userId, active: true});
});

// publishes data of all orders (for admin)
Meteor.publish('allOrders', function(){
	return Orders.find({});
});

// publishes data of pictures corresponding to current order
Meteor.publish('orderPhotos', function(orderId){
	var userId = this.userId;
	return Images.find({user_id: userId, order_id: orderId});
});

// publishes data of pictures corresponding to current order (for admin)
Meteor.publish('allPhotos', function(){
	return Images.find({});
});

// publishes data of all users (for admin)
Meteor.publish('allUsers', function(){
	return Meteor.users.find({});
});