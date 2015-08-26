/* 
 * When this website starts up, add admin and user roles
 */

if (Meteor.roles.find().count() === 0){
	Roles.createRole('admin');
	Roles.createRole('user');
}