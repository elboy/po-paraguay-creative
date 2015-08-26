Orders.attachSchema(new SimpleSchema({
	user_id: {
		type: String,
		label: "User id",
		autoValue: function(){
			if (this.isInsert){
				return Meteor.userId();
			} else {
				this.unset();
			}
		}
	},
	created_at: {
		type: Date,
		label: "Created at",
		autoValue: function(){
			if (this.isInsert){
				return new Date;
			} else {
				this.unset();
			}
		}
	},
	name: {
		type: String,
		label: "Name",
		min: 1,
		max: 30
	},
	date_of_birth: {
		type: String,
		label: "Date of birth",
		autoform: {
			placeholder: "dd/mm/aaaa"
		},
		max: 10

	},
	address: {
		type: String,
		label: "Address",
		min: 1,
		max: 50

	},
	phone_number: {
	    type: String,
	    label: 'Phone Number',
	    regEx: /^\d{10}$/,
	    autoform: {
	      'label-type': 'floating',
	      placeholder: 'eg: (201) 123-4567'
	    }
	},
	left_hand: {
		type: Object,
		label: "Left hand",
		optional: true
	},
	'left_hand.has': {
		type: Boolean,
		label: "Build left hand?",
		autoform: {
			options: [
				{label: 'Yes', value: true},
				{label: 'No', value: false}
			]
		}
	},
	'left_hand.movement': {
		type: Boolean,
		label: "Has wrist movement?",
		optional: true,
		autoform: {
			options: [
				{label: 'Yes', value: true},
				{label: 'No', value: false}
			]
		}
	},
	right_hand: {
		type: Object,
		label: "Right hand",
		optional: true
	},
	'right_hand.has': {
		type: Boolean,
		label: "Build right hand?",
		autoform: {
			options: [
				{label: 'Yes', value: true},
				{label: 'No', value: false}
			]
		}
	},
	'right_hand.movement': {
		type: Boolean,
		label: "Has wrist movement?",
		optional: true,
		autoform: {
			options: [
				{label: 'Yes', value: true},
				{label: 'No', value: false}
			]
		}
	},
	wrist_color: {
		type: String,
		label: "Color of wrist",
		optional: true,
		autoform: {
			options: [
				{label: 'Red', value: '#FF0000'},
				{label: 'Orange', value: '#FFA500'},
				{label: 'Yellow', value: '#FFFF00'},
				{label: 'Green', value: '#008000'},
				{label: 'Blue', value: '#0000FF'},
				{label: 'Indigo', value: '#4B0082'},
				{label: 'Violet', value: '#EE82EE'}
			]
		}
	},
	hand_color: {
		type: String,
		label: "Color of hand",
		optional: true,
		autoform: {
			options: [
				{label: 'Red', value: '#FF0000'},
				{label: 'Orange', value: '#FFA500'},
				{label: 'Yellow', value: '#FFFF00'},
				{label: 'Green', value: '#008000'},
				{label: 'Blue', value: '#0000FF'},
				{label: 'Indigo', value: '#4B0082'},
				{label: 'Violet', value: '#EE82EE'}
			]
		}
	},
	fingers_color: {
		type: String,
		label: "Color of fingers",
		optional: true,
		autoform: {
			options: [
				{label: 'Red', value: '#FF0000'},
				{label: 'Orange', value: '#FFA500'},
				{label: 'Yellow', value: '#FFFF00'},
				{label: 'Green', value: '#008000'},
				{label: 'Blue', value: '#0000FF'},
				{label: 'Indigo', value: '#4B0082'},
				{label: 'Violet', value: '#EE82EE'}
			]
		}
	},
	admin_approval: {
		type: Boolean,
		label: "Admin approved photos for creation",
		defaultValue: false
	},
	admin_approval_id: {
		type: String,
		label: "Id of admin who approved photos for creation",
		optional: true
	},
	reached_checkout: {
		type: Boolean,
		label: "Has reached checkout step?",
		defaultValue: false
	},
	order_complete: {
		type: Boolean,
		label: "Has order been completed?",
		defaultValue: false
	},
	active: {
		type: Boolean,
		label: "False if user deleted order.",
		defaultValue: true
	}
}));