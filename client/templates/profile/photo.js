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
	}
});