// publishes data of current order for current user
Meteor.publish('currentOrder', function(currentOrder){
	var userId = this.userId;
	return Orders.find({user_id: userId, _id: currentOrder});
});

Meteor.publish('adminOrder', function(currentOrder){
	return Orders.find({_id: currentOrder});
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
Meteor.publish('orderPhotos', function(currentOrder){
	var userId = this.userId;
	return Images.find({user_id: userId, order_id: currentOrder});
});

// publishes data of pictures corresponding to current order (for admin)
Meteor.publish('adminOrderPhotos', function(currentOrder){
	return Images.find({order_id: currentOrder});
});

// publishes data of all users (for admin)
Meteor.publish('allUsers', function(){
	return Meteor.users.find({});
});