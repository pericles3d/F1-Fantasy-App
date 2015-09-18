angular.module('userApp', [
  'ngAnimate',    //to add animations to all of our Angular directives
  'appRoutes',    //will be the routing for the application
  'authService',  //service file
  'mainCtrl',     //controller to encompass the main view
  'userCtrl',     //controllers for all the user management pages
  'userService'   //service file
])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});
