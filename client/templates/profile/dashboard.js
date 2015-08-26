orders = Orders.find({}, {sort: {created_at: -1}});

Template.dashboard.helpers({
	orders: function(){
		return orders;
	},
	orderCount: function(){
		return orders.count();
	}
});

Template.dashboard.events({
	'click .link-to-info':function(){
		var orderId = this._id;
		Router.go('info', {_id: orderId});
	},
	'click .link-to-photo':function(){
		var orderId = this._id;
		Router.go('photo', {_id: orderId});
	},
	'click .link-to-personalize':function(){
		var orderId = this._id;
		Router.go('personalize', {_id: orderId});
	},
	'click .link-to-checkout':function(){
		var orderId = this._id;
		Router.go('checkout', {_id: orderId});
	}
});