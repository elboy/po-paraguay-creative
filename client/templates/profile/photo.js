Template.photo.onCreated(function(){
	Session.set("uploading", 0);
	Session.set("tab", "tab-photo");
});

Template.photo.helpers({
	clicked:function(){
		return Session.get("case");
	},
	// if a photo is uploading, show progress bar
	hidden:function(){
		if (Session.get("uploading") === 0){
			return "hide-remove";
		} else {
			return "";
		}
	},
	photos: function(){
		return Images.find({});
	}
});

Template.photo.events({
	'click #upload-photo': function(){
		var order_id = this._id;
		addPhoto(order_id);
	},
	'click #photo-to-personalize':function(){
		var orderId = this._id;
		if (this.admin_approval){
			Router.go('personalize', {_id: orderId});
		} else {
			Router.go('postPhoto', {_id: orderId});
		}
	}
	/*,
  'click .delete':function(){
    // Remove instance from database
    Meteor.call("removeImage", this._id, function(e,r){
      if(e){
        throwError(e.reason);
      } else {
        throwWarning(r);
      }
    });
  }*/
});

Template.photoHolder.onRendered(function(){
	var selector = "#" + this.data._id;
	var url = this.data.public_id;

	$(selector).append($.cloudinary.image(url, imageDetails));
});

var imageDetails = {
	format: 'jpg',
	width: 600,
	height: 600,
	crop: 'scale',
	class: "img-thumbnail img-rounded img-responsive"
	//background: "#ffcf2b",
};

function addPhoto(order_id){
	$('.upload-form').unsigned_cloudinary_upload("payouw7z", { 
    	cloud_name: 'po-paraguay'
	}, {
    	multiple: true
	}).bind('cloudinarydone', function (e, data) {
    	data.result.user_id = Meteor.userId();
    	data.result.order_id = order_id;

    	// Add to database
    	Meteor.call("addImage", data.result, function(e, r){
    		if(e){
        		console.log(e.reason);
    		} else {
        		console.log(r);
    		}
    	});
		// When the upload is done, add it to the view and the database
		//$('.thumbnails').append($.cloudinary.image(data.result.public_id, imageDetails));
		// To make the progress bar disappear
		Session.set("uploading", 0);

	}).bind('cloudinaryprogress', function (e, data){

	    // While uploading, add it to the view and the database
	    console.log("data loaded is : " + data.loaded + " data size : " + data.total);
	    var percent = Math.round((data.loaded * 100.0) / data.total);
	    $('.progress-bar').css('aria-valuenow', percent);
	    $('.progress-bar').css('width', percent + '%');
	    Session.set("uploading", percent);

	}).bind('fileuploadfail', function(e){
		console.log(e);
		Session.set("uploading", 0);
	});
}