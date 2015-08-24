Template.dashboard.helpers({
	orders: function(){
		return Orders.find({}, {sort: {created_at: -1}});
	}
});

Template.dashboard.events({
	'click .go-to-order': function(){
		var orderId = this._id;
		//Session.set('currentOrder', orderId);
		Router.go('photo.upload', {_id: orderId});
	},
	'click .go-to-checkout': function(){
		var orderId = this._id;
		Router.go('checkout', {_id: orderId});
	}
});