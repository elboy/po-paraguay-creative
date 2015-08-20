Router.configure({
	layoutTemplate: 'layout'
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