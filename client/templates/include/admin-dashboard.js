Template.adminDashboard.events({
	'click .admin-order-item':function(){
		var orderId = this._id;
		console.log(orderId);
		Router.go('adminOrder', {_id: orderId});
	}
});