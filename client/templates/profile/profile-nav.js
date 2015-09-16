Template.profileNav.onRendered(function(){

	$(".nav-tabs li").removeClass("active");
	var active = "li." + Session.get("tab");
	$(active).addClass('active');
});

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
	'click .tab-to-dashboard':function(){
		Router.go('dashboard');
	},
	'click .tab-to-info':function(){
		var orderId = this._id;
		if (orderId){
			Router.go('info', {_id: orderId});
			//$(".nav-tabs li").removeClass("active");
			//$(e.currentTarget).addClass('active');
		}
	},
	'click .tab-to-photo':function(){
		var orderId = this._id;
		if (orderId){
			Router.go('photo', {_id: orderId});
		}
	},
	'click .tab-to-personalize':function(){

		var orderId = this._id;
		if (orderId){
			if (this.admin_approval){
				Router.go('personalize', {_id: orderId});
			}
		}
	},
	'click .tab-to-checkout':function(){
		var orderId = this._id;
		if (orderId){
			if (this.reached_checkout){
				Router.go('checkout', {_id: orderId});
			}
		}
	}
});