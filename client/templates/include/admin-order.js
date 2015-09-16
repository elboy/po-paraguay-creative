Template.adminOrder.helpers({
	'photos': function(){
		var images = Images.find({order_id: this._id});
		return images;
	}
});

Template.adminOrder.events({
	'click .approve-admin': function(){
		Orders.update(this._id, {$set: {admin_approval: true, admin_approval_id: Meteor.userId()}}, function(error, result){
			if (error){
				console.log("error: ", error);
			} else {
				console.log(result);
			}
		});
	},
	'click .unapprove-admin': function(){
		Orders.update(this._id, {$set: {admin_approval: false}}, function(error, result){
			if (error){
				console.log("error: ", error);
			} else {
				console.log(result);
			}
		});
	}
});