Template.info.onCreated(function(){
	Session.set("tab", "tab-info");
});

Template.info.events({
	'click .link-to-photo':function(){
		var orderId = this._id;
		Router.go('photo', {_id: orderId});
	}
});

