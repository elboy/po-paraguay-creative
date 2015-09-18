Template.create.onCreated(function() { 
	Session.set('orderSubmitErrors', {});
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