Template.flow.onRendered(function(){
	Session.set("step", "section-flow-info");
	// Affix for steps navbar
	/*
    $('#steps-navbar').affix({
        offset: {
            top: 0
        }
    });
	*/
});

Template.flow.helpers({
	'created':function(){
		var order = Orders.findOne({});
		// if order has a name, it's been created
		return order.name;
	}
})

Template.flow.events({
	'click .flowlist li .flow-title':function(e){

		var section = e.currentTarget.parentElement;
		// only allowed steps can be clicked
		if ($(section).hasClass("allow")){
			// none are allowed or active
			$(".flowlist li").removeClass("allow");
			$(".flowlist li").removeClass("active");
			$(".nav-tabs li").removeClass("active");

			var clickedId = section.id;
			var $sections = $('.flowlist li');
			// iterate through steps to find clicked one
			for (var i = 0; i < $sections.length; i++){
				$($sections[i]).addClass("allow");
				// if clicked step, make it active
				if ($sections[i].id === clickedId){
					// Set profileNav active
					Session.set("step", clickedId);
					// Set workflow active
					$($sections[i]).addClass("active");
					break;
				}
			}
			window.scrollTo(0, 50);
		}
	},
	'click .to-photo-step':function(e){
		// if access to photo
		$(".flowlist li#section-flow-info").removeClass("active");
		$('.flowlist li#section-flow-photo').addClass("active");
		Session.set("step", "section-flow-photo");
		window.scrollTo(0, 50);
	},
	'click .to-personalize-step':function(e){
		Meteor.call('orderReachedPersonalize', this._id, function(error){
			if (error){
				console.log(error);
				return;
			}
			$(".flowlist li#section-flow-photo").addClass("allow");
			$(".flowlist li#section-flow-photo").removeClass("active");
			$('.flowlist li#section-flow-personalize').addClass("active");
			Session.set("step", "section-flow-personalize");
			window.scrollTo(0, 50);
		});
	},
	'submit form#create-form': function(e){
		e.preventDefault();

		var day = $('#birthday-day').val();
		var month = $('#birthday-month').val();
		var year = $('#birthday-year').val();

		var birthday = day + " de " + month + ", " + year;
		console.log(birthday);


		var order = {
			name: $('[name=name]').val(), 
			birthday: birthday,
			address: $('[name=address]').val(),
			phone: $('[name=phone]').val()
		};

/*
		if (order.phone)
			order.phone = order.phone.replace(/\D/g, '');
*/

		var errors = validateOrder(order); 
		if (errors.name || errors.birthday || errors.address || errors.phone)
			return Session.set('orderSubmitErrors', errors);

		Meteor.call('orderCreate', order, this._id, function(error, result) { 
			// display the error to the user and abort
			if (error){
				console.log(error);
				return;
			}

			$(".flowlist li#section-flow-info").removeClass("active");
			$('.flowlist li#section-flow-photo').addClass("active");
			Session.set("step", "section-flow-photo");
			window.scrollTo(0, 50);
	    });
	},
	'submit form#personalize-form':function(e){
		e.preventDefault();
		
		var colors = {
			wrist_color: $(e.target).find('#select-wrist').val(),
			hand_color: $(e.target).find('#select-hand').val(),
			fingers_color: $(e.target).find('#select-fingers').val()
		};

		var addons = $(e.target).find('#addons').val();
		if (addons){
			colors.additions = addons;
		}

		Meteor.call('orderPersonalize', colors, this._id, function(error, result){
			// display the error to the console and abort
			if (error){
				console.log(error);
				return;
			}

			$(".flowlist li#section-flow-personalize").addClass("allow");
			$(".flowlist li#section-flow-personalize").removeClass("active");
			$('.flowlist li#section-flow-checkout').addClass("active");
			Session.set("step", "section-flow-checkout");
			window.scrollTo(0, 50);
		});
	}
});