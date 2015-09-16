Template.create.onCreated(function() { 
	Session.set('orderSubmitErrors', {});
	Session.set("tab", "tab-info");
});

Template.create.helpers({ 
	errorMessage: function(field) {
		return Session.get('orderSubmitErrors')[field]; 
	},
	errorClass: function (field) {
		return !!Session.get('orderSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.create.events({
	'submit form': function(e){
		e.preventDefault();

		var order = {
			name: $(e.target).find('[name=name]').val(), 
			birthday: $(e.target).find('[name=birthday]').val(),
			address: $(e.target).find('[name=address]').val(),
			phone: $(e.target).find('[name=phone]').val()
		};

		if (order.phone)
			order.phone = order.phone.replace(/\D/g, '');

		var errors = validateOrder(order); 
		if (errors.name || errors.birthday || errors.address || errors.phone)
			return Session.set('orderSubmitErrors', errors);

		Meteor.call('orderInsert', order, function(error, result) { 
			// display the error to the user and abort
			if (error){
				console.log(error);
				return;
			}
			//return throwError(error.reason);
	      
	    	Router.go('photo', {_id: result._id});
	    });
	},
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