Template.photo.onRendered(function(){
	Session.set("case", 0);
});

Template.photo.helpers({
	clicked:function(){
		return Session.get("case");
	},
	wristMovement:function(){
		return Session.get("case") === 1;
	}
	
});

Template.photo.events({
	'click #wrist-movement': function(){
		Session.set("case", 1);
	},
	'click #no-wrist-movement': function(){
		Session.set("case", 2);
	},
	'click .link-to-info':function(){
		var orderId = this._id;
		Router.go('info', {_id: orderId});
	},
	'click .link-to-photo':function(){
		var orderId = this._id;
		Router.go('photo', {_id: orderId});
	}
});