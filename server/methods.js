// Server side cloudinary methods
Meteor.methods({
	// When client side remove image is clicked, delete isntance from database
	removeImage: function(imageId){
		Images.remove(imageId);
		return "Image removed";
	},
	addImage: function(data){
		Images.insert(data);
		return "Image inserted";
	}
});