AutoForm.addHooks('insertOrderForm', {
	before: {
		insert: function(doc) {
	    	// Potentially alter the doc
	    	if (doc.phone_number){
	    		doc.phone_number = doc.phone_number.replace(/\D/g, '');
	    	}
	    	return doc;
	    }
	},
	onError: function (operation, error, template) {
	  	console.log(error);
	},
	// this.docId is id of doc attached to the form
	onSuccess: function(formType, result){
	  	//Session.set('orderId', this.docId);
	  	Router.go('photo', {_id: this.docId});
	}
});

Template.create.helpers({
	
});

Template.create.events({
	'keyup #desc': function(event){
		if(!event.shiftKey && event.keyCode !== 8 && event.keyCode !== 16){
			var $input = $(event.target);
			var curr_val = $input.val();
			var stripped = curr_val.replace(/\D/g, '');

			var len = stripped.length

			if (len < 3){
				$input.val("(" + stripped);
			} else if (len === 3) {
				$input.val("(" + stripped + ") ");
			} else if (len < 6) {
				$input.val("(" + stripped.substring(0,3) + ") " + stripped.substring(3, len));
			} else if (len < 11){
				$input.val("(" + stripped.substring(0,3) + ") " + stripped.substring(3, 6) + "-" + stripped.substring(6, len));
			} else {
				$input.val("(" + stripped.substring(0,3) + ") " + stripped.substring(3, 6) + "-" + stripped.substring(6, 10));
			}
		}
	}
	
});