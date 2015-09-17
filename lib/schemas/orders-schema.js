Orders.attachSchema(new SimpleSchema({
	user_id: {
		type: String,
		label: "User id"
	},
	created_at: {
		type: Date,
		label: "Created at"
	},
	name: {
		type: String,
		label: "Name",
		optional: true
	},
	birthday: {
		type: String,
		label: "Date of birth",
		optional: true

	},
	address: {
		type: String,
		label: "Address",
		optional: true

	},
	phone: {
	    type: String,
	    label: 'Phone Number',
	    optional: true
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
		optional: true
	},
	hand_color: {
		type: String,
		label: "Color of hand",
		optional: true
	},
	fingers_color: {
		type: String,
		label: "Color of fingers",
		optional: true
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
	reached_personalize: {
		type: Boolean,
		label: "Has reached personalize step?",
		defaultValue: false
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
	},
	additions: {
		type: String,
		label: "Special order requests",
		optional: true
	}
}));