angular.module('appRoutes', ['ngRoute'])

  .config(function($routeProvider, $locationProvider){

    $routeProvider

      //home page route
      .when('/', {
        templateUrl: 'app/views/pages/home.html'
      })

      //login page
      .when('/login', {
        templateUrl : 'app/views/pages/login.html',
        controller  : 'mainController',
        controllerAs: 'login'
      })

      //show all users
      .when('/users', {
        templateUrl : 'app/views/pages/users/all.html',
        controller  : 'userController',
        controllerAs: 'user'
      })

      //form to create a new user
      //same view as edit page
      .when('/users/create', {
        templateUrl: 'app/views/pages/users/edit.html',
        controller: 'userCreateController',
        controllerAs: 'user'
      })

      //page to edit a user
      .when('/users/:user_id/edit', {
        templateUrl: 'app/views/pages/users/edit.html',
        controller: 'userEditController',
        controllerAs: 'user'
      })

      //Driver Standings page
      .when('/driver_standings', {
        templateUrl : 'app/views/pages/drivers/driver_standings.html',
        controller  : 'driverController',
        controllerAs: 'driver'
      })

      //Race Calendar page
      .when('/race_calendar', {
        templateUrl : 'app/views/pages/drivers/race_calendar.html',
        controller  : 'raceCalendarController',
        controllerAs: 'raceCtrl'
      })

      //starting grid picks page
      .when('/users/starting_grid_picks', {
        templateUrl: 'app/views/pages/users/starting_grid_picks.html',
        controller: 'startingGridController',
        controllerAs: 'sgPicksCtrl'
      })

      //starting grid points page
      .when('/users/starting_grid_points', {
        templateUrl: 'app/views/pages/users/starting_grid_points.html',
        controller: 'startingGridController',
        controllerAs: 'sgPointsCtrl'
      })

      //race results picks page
      .when('/users/race_result_picks', {
        templateUrl: 'app/views/pages/users/race_result_picks.html',
        controller: 'raceResultController',
        controllerAs: 'rsPicksCtrl'
      })

      //race results points page
      .when('/users/race_result_points', {
        templateUrl: 'app/views/pages/users/race_result_points.html',
        controller: 'raceResultController',
        controllerAs: 'rsPointsCtrl'
      })

      //user profile page
      .when('/users/:user_id', {
        templateUrl: 'app/views/pages/users/show.html',
        controller: 'userShowController',
        controllerAs: 'user'
      })

      //user picks page
      .when('/users/:user_id/picks', {
        templateUrl: 'app/views/pages/users/picks.html',
        controller: 'userPicksController',
        controllerAs: 'user'
      });

    //get rid of the hash in the URL
    $locationProvider.html5Mode(true);
  });
