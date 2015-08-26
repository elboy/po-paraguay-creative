/* Default options for all routes.
 * Options declared on specific route
 * will override these options.
 */
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/', function(){
	this.render('home');
}, {
	name: 'home',
	layoutTemplate: 'homeLayout'
});

/** Router for profile pages **/
/* profile home should access all orders from that user */
Router.route('/dashboard', {
	name: 'dashboard',
	waitOn: function(){
		var orders = Meteor.subscribe('userOrders');
		return orders;
	},
	action: function(){
		this.render('dashboard');
	}
});

/** Router for profile pages **/
/* admin page should access everything  */
Router.route('/adminDashboard', {
	name: 'admin',
	path: '/admin/dashboard',
	// access to all data
	waitOn: function(){
		var orders = Meteor.subscribe('allOrders');
		var photos = Meteor.subscribe('allPhotos');
		var users = Meteor.subscribe('allUsers');
		return [orders, photos, users];
	},
	// data (this) is all orders for easy posting
	data: function(){
		return Orders.find({}, {sort: {created_at: -1}});
	},
	action: function(){
		this.render('adminDashboard');
	},
	// user must be an admin
	onBeforeAction: function(){
		var user = Meteor.user();
		if(!Roles.userIsInRole(user, 'admin')){
			this.redirect('profile.home');
			this.stop();
		} else {
			this.next();
		}
	}
});

Router.route('/create');

/* User _id will upload photos */
Router.route('/create/info/:_id', {
	name: 'info',
	// Subscribe to current order and corresponding photos
	waitOn: function(){
		// Subscribe to current order and corresponding photos
		var order = Meteor.subscribe('currentOrder', this.params._id);
		return order;
	},
	// data (this) is current order
	data: function(){
		return Orders.findOne({_id: this.params._id});
	},
	action: function(){
		this.render('info');
	}
});

/* User _id will upload photos */
Router.route('/create/photo/:_id', {
	name: 'photo',
	// Subscribe to current order and corresponding photos
	waitOn: function(){
		// Subscribe to current order and corresponding photos
		var order = Meteor.subscribe('currentOrder', this.params._id);
		var photos = Meteor.subscribe('orderPhotos', this.params._id);
		return [order, photos];
	},
	// data (this) is current order
	data: function(){
		return Orders.findOne({_id: this.params._id});
	},
	action: function(){
		this.render('photo');
	}
});

Router.route('/create/post-photo/:_id', {
	name: 'postPhoto',
	// Subscribe to current order
	waitOn: function(){
		var order = Meteor.subscribe('currentOrder', this.params._id);
		return order;
	},
	// data (this) is current order
	data: function(){
		return Orders.findOne({_id: this.params._id});
	},
	action: function(){
		this.render('postPhoto');
	}
});

/* User _id will personalize colors */
Router.route('/create/personalize/:_id', {
	name: 'personalize',
	// Subscribe to current order
	waitOn: function(){
		var order = Meteor.subscribe('currentOrder', this.params._id);
		return order;
	},
	// data (this) is current order
	data: function(){
		return Orders.findOne({_id: this.params._id});
	},
	action: function(){
		this.render('personalize');
	}
});

Router.route('create/checkout/:_id', {
	name: 'checkout',
	// Subscribe to current order
	waitOn: function(){
		var order = Meteor.subscribe('currentOrder', this.params._id);
		return order;
	},
	// data (this) is current order
	data: function(){
		return Orders.findOne({_id: this.params._id});
	},
	action: function(){
		this.render('checkout');
	}
});


/*
 * If user goes to a link that requires login,
 * but is not logged in, redirect them to home page.
 */
Router.onBeforeAction(function(){
	if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('home');
        this.stop();
    } else {
        // required by Iron to process the route handler
        this.next();
    }
}, {
	except: ['home']
});