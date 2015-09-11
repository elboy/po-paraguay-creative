Template.dashboard.onCreated(function(){
	Session.set("tab", "tab-dashboard");
});

orders = Orders.find({}, {sort: {created_at: -1}});

Template.dashboard.helpers({
	orders: function(){
		return orders;
	},
	orderCount: function(){
		return orders.count();
	},
	username: function(){
		var user = Meteor.user();
		return user.username;
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
	},
	'click #link-to-create-hand':function(){
		Router.go('create');
	}
});

Template.order.helpers({
	photoColor:function(){
		return this.admin_approval ? "progress-bar-success" : "progress-bar-warning";
	},
	personalizeColor:function(){
		return this.reached_checkout ? "progress-bar-success" : "progress-bar-warning";
	},
	checkoutColor:function(){
		return this.order_complete ? "progress-bar-success" : "progress-bar-warning";
		
	}
});