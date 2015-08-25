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
	waitOn: function(){
		var orders = Meteor.subscribe('allOrders');
		var photos = Meteor.subscribe('allPhotos');
		var users = Meteor.subscribe('allUsers');
		return [orders, photos, users];
	},
	data: function(){
		return Orders.find({}, {sort: {created_at: -1}});
	},
	action: function(){
		this.render('adminDashboard');
	},
	onBeforeAction: function(){
		var user = Meteor.user();
		if(!Roles.userIsInRole(user, 'admin')){
			console.log("stopped");
			this.redirect('profile.home');
			this.stop();
		} else {
			console.log("went through");
			this.next();
		}
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