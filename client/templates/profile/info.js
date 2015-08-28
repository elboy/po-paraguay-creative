Template.profileNav.helpers({
	personalizeDisabled: function(){
		return this.admin_approval ? "link" : "disabled";
	},
	checkoutDisabled: function(){
		return this.reached_checkout ? "link" : "disabled";
	},
	order_id:function(){
		return this._id;
	}
});

Template.profileNav.events({
	'click .link-to-info':function(){
		var orderId = this._id;
		Router.go('info', {_id: orderId});
	},
	'click .link-to-photo':function(){
		var orderId = this._id;
		Router.go('photo', {_id: orderId});
	},
	'click .link-to-personalize':function(){
		if (this.admin_approval){
			var orderId = this._id;
			Router.go('personalize', {_id: orderId});
		}
	},
	'click .link-to-checkout':function(){
		if (this.reached_checkout){
			var orderId = this._id;
			Router.go('checkout', {_id: orderId});
		}
	}
});

