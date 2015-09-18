Template.dashboard.onRendered(function(){
	Session.set("step", "section-flow-dashboard");
});

orders = Orders.find({name: {$exists: true}}, {sort: {created_at: -1}});

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
		Session.set("step", "section-flow-info");
		var orderId = this._id;
		Router.go('flow', {_id: orderId});
	},
	/*
	'click .link-to-photo':function(){
		Session.set("step", "section-flow-photo");
		var orderId = this._id;
		Router.go('flow', {_id: orderId});
	},
	'click .link-to-personalize':function(){
		Session.set("step", "section-flow-personalize");
		var orderId = this._id;
		Router.go('flow', {_id: orderId});
	},
	'click .link-to-checkout':function(){
		Session.set("step", "section-flow-checkout");
		var orderId = this._id;
		Router.go('flow', {_id: orderId});
	},
	*/
	'click #link-to-create-hand':function(){
		Meteor.call('orderInsert', function(error, result) { 
			// print the error to the console and abort
			if (error){
				console.log(error);
				return;
			}

			Session.set("step", "info");
	    	Router.go('flow', {_id: result._id});
	    });
	}
});

Template.order.helpers({
	photoColor:function(){
		return this.reached_personalize ? "progress-bar-success" : "progress-bar-warning";
	},
	personalizeColor:function(){
		return this.reached_checkout ? "progress-bar-success" : "progress-bar-warning";
	},
	checkoutColor:function(){
		return this.order_complete ? "progress-bar-success" : "progress-bar-warning";
		
	}
});