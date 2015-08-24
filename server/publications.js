// publishes data of current order, from current user
Meteor.publish('currentOrder', function(currentOrder){
	var userId = this.userId;
	return Orders.find({user_id: userId, _id: currentOrder});
});

//** CAUTION ** contains all user orders
Meteor.publish('userOrders', function(){
	var userId = this.userId;
	return Orders.find({user_id: userId});
});

//** CAUTION ** contains all orders
Meteor.publish('allOrders', function(){
	return Orders.find({});
});

// publishes data of pictures corresponding to current order
Meteor.publish('userPhotos', function(orderId){
	var userId = this.userId;
	return Images.find({user_id: userId, order_id: orderId});
});

// publishes data of pictures corresponding to current order
Meteor.publish('allPhotos', function(orderId){
	var userId = this.userId;
	return Images.find({});
});

// publishes data of pictures corresponding to current order
Meteor.publish('allUsers', function(){
	return Meteor.users.find({});
});