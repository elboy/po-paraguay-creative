/* Default options for all routes.
 * Options declared on specific route
 * will override these options.
 */
Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/', function(){
	this.render('home');
}, {
	name: 'home'
});

Router.route('/signout', function(){
	this.render('SignOut');
}, {
	name: 'signout'
});