angular.module('userCtrl', ['userService', 'authService'])

.controller('userController', function(User) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the users at page load
	User.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.processing = false;

			// bind the users that come back to vm.users
			vm.users = data;
		});

	// function to delete a user
	vm.deleteUser = function(id) {
		vm.processing = true;

    //accepts the user id as a parameter
		User.delete(id)
			.success(function(data) {

				// get all users to update the table
				// you can also set up your api
				// to return the list of users with the delete call
				User.all()
					.success(function(data) {
						vm.processing = false;
						vm.users = data;
					});

			});
	};

})

// controller applied to user creation page
.controller('userCreateController', function(User, Auth, $location) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveUser = function() {
		vm.processing = true;

    //clear the message
		vm.message = '';

		// use the create function in the userService
		User.create(vm.userData)
			.success(function(data) {
				vm.processing = false;

				vm.message = data.message;
				vm.user_id = data.user_id;

				Auth.login(vm.userData.username, vm.userData.password)
					.success(function(data) {
						vm.processing = false;

						// if a user successfully logs in, redirect to profile page
						if (data.success)
							$location.path('/users/'+ vm.user_id );
						else
							vm.error = data.message;

					});
        //clear the form
      //  vm.userData = {};
				//$location.path('/login');
			});

	};

})

// controller applied to user edit page
.controller('userEditController', function($routeParams, User) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the user data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	User.get($routeParams.user_id)
		.success(function(data) {
			vm.userData = data;
		});

	// function to save the user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// call the userService function to update
		User.update($routeParams.user_id, vm.userData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.userData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
			});
	};

})

.controller('userShowController', function($routeParams, User) {
	var vm = this;
	vm.type = 'show';

	User.get($routeParams.user_id)
		.success(function(data) {
			vm.userData = data;
		});
})

.controller('userPicksController', function($routeParams, User) {
	var vm = this;
	vm.type = 'show';

	User.get($routeParams.user_id)
		.success(function(data) {
			vm.userData = data;
			console.log("GOT A USER:",vm.userData);
		});
vm.submitPicks = function(){
	console.log("INSIDE SUBMIT PICKS!!----------");


	var race = {
		country: "",
		starting_grid: [],
		race_result: []
	};
	race.country = 'Japan';
	race.starting_grid.push(vm.grid1, vm.grid2, vm.grid3, vm.grid4, vm.grid5, vm.grid6, vm.grid7, vm.grid8, vm.grid9, vm.grid10);
	race.race_result.push(vm.result1, vm.result2, vm.result3, vm.result4, vm.result5, vm.result6, vm.result7, vm.result8, vm.result9, vm.result10);

	console.log("Race Added:",race);
	vm.userData.picks = [];
	vm.userData.picks.push(race);
	console.log("Alter data",vm.userData);

	// call the userService function to update
	User.update($routeParams.user_id, vm.userData)
		.success(function(data) {
			vm.processing = false;
			console.log("User data processed", data);
			// clear the form
			vm.userData = {};

			// bind the message from our API to vm.message
			vm.message = data.message;
		});
	};

})
// ====================

.controller('startingGridController', function($routeParams, User){ //(how you name the controller to reference to it in the html, how you name the function controller)

		var vm = this; //we know that 'self' always refers to the Constructor
		vm.sortType = 'pos';
		vm.sortReverse = false;

		//get all user data so I can use to make the table data
		User.all()
			.success(function(data) {
				console.log(data);
				vm.users = data;

				//Calculating the picks table
				var allSgPicks = {
					sg01: [],
					sg02: [],
					sg03: [],
					sg04: [],
					sg05: [],
					sg06: [],
					sg07: [],
					sg08: [],
					sg09: [],
					sg10: []
				};
				//push each driver pick into an array for each position in the grid sg01 = starting grid 01
				for (var i = 0; i <= vm.users.length - 1 ; i++){
					allSgPicks.sg01.push(vm.users[i].picks[0].starting_grid[0]);
					allSgPicks.sg02.push(vm.users[i].picks[0].starting_grid[1]);
					allSgPicks.sg03.push(vm.users[i].picks[0].starting_grid[2]);
					allSgPicks.sg04.push(vm.users[i].picks[0].starting_grid[3]);
					allSgPicks.sg05.push(vm.users[i].picks[0].starting_grid[4]);
					allSgPicks.sg06.push(vm.users[i].picks[0].starting_grid[5]);
					allSgPicks.sg07.push(vm.users[i].picks[0].starting_grid[6]);
					allSgPicks.sg08.push(vm.users[i].picks[0].starting_grid[7]);
					allSgPicks.sg09.push(vm.users[i].picks[0].starting_grid[8]);
					allSgPicks.sg10.push(vm.users[i].picks[0].starting_grid[9]);
				}
				console.log(allSgPicks);

				console.log(allSgPicks[Object.keys(allSgPicks)[1]]);

				//Create objects to hold how many picks for each driver exist in each grid position
				var counts = {
					Sg01:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Sg02:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Sg03:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Sg04:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Sg05:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Sg06:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Sg07:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Sg08:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Sg09:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Sg10:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Total:   { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Percent: { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Status:  { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 }
				};

				//Adding the number of picks for each driver in each position. Accessed using counts.Sg01[Object.keys(counts.Sg01)[0]]
				var picks = 0; //picks goes from 0 to 9 representing each grid position
				while (picks < 10){
					allSgPicks[Object.keys(allSgPicks)[picks]].forEach(function(x) { counts[Object.keys(counts)[picks]][x] = (counts[Object.keys(counts)[picks]][x] || 0)+1; }); //adds how many picks each driver has for each grid position to the counts object
					picks++;
				}

				console.log(counts.Sg01[Object.keys(counts.Sg01)[0]]); //this will show the number of picks that Hamilton has at Sg01
				console.log(counts[Object.keys(counts)[1]][Object.keys(counts[Object.keys(counts)[1]])[19]]);//This will show  Sg02 and Merhi. First number goes from 0 to 9 and second goes from 0 to 19

				//Total picks for each driver
				var sg = 0;
				var dr = 0;
				while (dr < 20){
					while (sg < 10){
						counts[Object.keys(counts)[10]][Object.keys(counts[Object.keys(counts)[10]])[dr]] = counts[Object.keys(counts)[10]][Object.keys(counts[Object.keys(counts)[10]])[dr]] + counts[Object.keys(counts)[sg]][Object.keys(counts[Object.keys(counts)[sg]])[dr]];
						sg++;
					}
					sg = 0;
					dr++;
				}

				//Percentage, based on how many players picked each specific driver in any of the 10 starting grid positions.
				dr = 0; //resetting the Drivers variable
				while (dr < 20){
					counts[Object.keys(counts)[11]][Object.keys(counts[Object.keys(counts)[11]])[dr]] = Math.round((counts[Object.keys(counts)[10]][Object.keys(counts[Object.keys(counts)[10]])[dr]]/vm.users.length)*100);
					dr++;
				}

				//Driver Status
				dr = 0; //resetting the Driver variable
				while (dr < 20){
					if(counts[Object.keys(counts)[11]][Object.keys(counts[Object.keys(counts)[11]])[dr]] >= 85){
						counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] = "Favorite";
					} else if (counts[Object.keys(counts)[11]][Object.keys(counts[Object.keys(counts)[11]])[dr]] >= 50){
						counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] = "Very Likely";
					} else if (counts[Object.keys(counts)[11]][Object.keys(counts[Object.keys(counts)[11]])[dr]] >= 15){
						counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] = "Less Likely";
					} else {counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] = "Underdog";
					}
					dr++;
				}

				//prepopulate a list of drivers
				vm.drivers = [
				    { pos: 1, driver: "Hamilton",    one: counts.Sg01.Hamilton || 0,   two: counts.Sg02.Hamilton || 0,   three: counts.Sg03.Hamilton || 0,   four: counts.Sg04.Hamilton || 0,   five: counts.Sg05.Hamilton || 0,   six: counts.Sg06.Hamilton || 0,   seven: counts.Sg07.Hamilton || 0,   eight: counts.Sg08.Hamilton || 0,   nine: counts.Sg09.Hamilton || 0,   ten: counts.Sg10.Hamilton || 0,   total: counts.Total.Hamilton,   percent: counts.Percent.Hamilton,   status: counts.Status.Hamilton},
				    { pos: 2, driver: "Rosberg",     one: counts.Sg01.Rosberg || 0,    two: counts.Sg02.Rosberg || 0,    three: counts.Sg03.Rosberg || 0,    four: counts.Sg04.Rosberg || 0,    five: counts.Sg05.Rosberg || 0,    six: counts.Sg06.Rosberg || 0,    seven: counts.Sg07.Rosberg || 0,    eight: counts.Sg08.Rosberg || 0,    nine: counts.Sg09.Rosberg || 0,    ten: counts.Sg10.Rosberg || 0,    total: counts.Total.Rosberg,    percent: counts.Percent.Rosberg,    status: counts.Status.Rosberg},
				    { pos: 3, driver: "Vettel",      one: counts.Sg01.Vettel || 0,     two: counts.Sg02.Vettel || 0,     three: counts.Sg03.Vettel || 0,     four: counts.Sg04.Vettel || 0,     five: counts.Sg05.Vettel || 0,     six: counts.Sg06.Vettel || 0,     seven: counts.Sg07.Vettel || 0,     eight: counts.Sg08.Vettel || 0,     nine: counts.Sg09.Vettel || 0,     ten: counts.Sg10.Vettel || 0,     total: counts.Total.Vettel,     percent: counts.Percent.Vettel,     status: counts.Status.Vettel},
				    { pos: 4, driver: "Raikkonen",   one: counts.Sg01.Raikkonen || 0,  two: counts.Sg02.Raikkonen || 0,  three: counts.Sg03.Raikkonen || 0,  four: counts.Sg04.Raikkonen || 0,  five: counts.Sg05.Raikkonen || 0,  six: counts.Sg06.Raikkonen || 0,  seven: counts.Sg07.Raikkonen || 0,  eight: counts.Sg08.Raikkonen || 0,  nine: counts.Sg09.Raikkonen || 0,  ten: counts.Sg10.Raikkonen || 0,  total: counts.Total.Raikkonen,  percent: counts.Percent.Raikkonen,  status: counts.Status.Raikkonen},
				    { pos: 5, driver: "Massa",       one: counts.Sg01.Massa || 0,      two: counts.Sg02.Massa || 0,      three: counts.Sg03.Massa || 0,      four: counts.Sg04.Massa || 0,      five: counts.Sg05.Massa || 0,      six: counts.Sg06.Massa || 0,      seven: counts.Sg07.Massa || 0,      eight: counts.Sg08.Massa || 0,      nine: counts.Sg09.Massa || 0,      ten: counts.Sg10.Massa || 0,      total: counts.Total.Massa,      percent: counts.Percent.Massa,      status: counts.Status.Massa},
				    { pos: 6, driver: "Bottas",      one: counts.Sg01.Bottas || 0,     two: counts.Sg02.Bottas || 0,     three: counts.Sg03.Bottas || 0,     four: counts.Sg04.Bottas || 0,     five: counts.Sg05.Bottas || 0,     six: counts.Sg06.Bottas || 0,     seven: counts.Sg07.Bottas || 0,     eight: counts.Sg08.Bottas || 0,     nine: counts.Sg09.Bottas || 0,     ten: counts.Sg10.Bottas || 0,     total: counts.Total.Bottas,     percent: counts.Percent.Bottas,     status: counts.Status.Bottas},
				    { pos: 7, driver: "Kvyat",       one: counts.Sg01.Kvyat || 0,      two: counts.Sg02.Kvyat || 0,      three: counts.Sg03.Kvyat || 0,      four: counts.Sg04.Kvyat || 0,      five: counts.Sg05.Kvyat || 0,      six: counts.Sg06.Kvyat || 0,      seven: counts.Sg07.Kvyat || 0,      eight: counts.Sg08.Kvyat || 0,      nine: counts.Sg09.Kvyat || 0,      ten: counts.Sg10.Kvyat || 0,      total: counts.Total.Kvyat,      percent: counts.Percent.Kvyat,      status: counts.Status.Kvyat},
				    { pos: 8, driver: "Ricciardo",   one: counts.Sg01.Ricciardo || 0,  two: counts.Sg02.Ricciardo || 0,  three: counts.Sg03.Ricciardo || 0,  four: counts.Sg04.Ricciardo || 0,  five: counts.Sg05.Ricciardo || 0,  six: counts.Sg06.Ricciardo || 0,  seven: counts.Sg07.Ricciardo || 0,  eight: counts.Sg08.Ricciardo || 0,  nine: counts.Sg09.Ricciardo || 0,  ten: counts.Sg10.Ricciardo || 0,  total: counts.Total.Ricciardo,  percent: counts.Percent.Ricciardo,  status: counts.Status.Ricciardo},
				    { pos: 9, driver: "Perez",       one: counts.Sg01.Perez || 0,      two: counts.Sg02.Perez || 0,      three: counts.Sg03.Perez || 0,      four: counts.Sg04.Perez || 0,      five: counts.Sg05.Perez || 0,      six: counts.Sg06.Perez || 0,      seven: counts.Sg07.Perez || 0,      eight: counts.Sg08.Perez || 0,      nine: counts.Sg09.Perez || 0,      ten: counts.Sg10.Perez || 0,      total: counts.Total.Perez,      percent: counts.Percent.Perez,      status: counts.Status.Perez},
				    { pos: 10, driver: "Hulkenberg", one: counts.Sg01.Hulkenberg || 0, two: counts.Sg02.Hulkenberg || 0, three: counts.Sg03.Hulkenberg || 0, four: counts.Sg04.Hulkenberg || 0, five: counts.Sg05.Hulkenberg || 0, six: counts.Sg06.Hulkenberg || 0, seven: counts.Sg07.Hulkenberg || 0, eight: counts.Sg08.Hulkenberg || 0, nine: counts.Sg09.Hulkenberg || 0, ten: counts.Sg10.Hulkenberg || 0, total: counts.Total.Hulkenberg, percent: counts.Percent.Hulkenberg, status: counts.Status.Hulkenberg},
				    { pos: 11, driver: "Grosjean",   one: counts.Sg01.Grosjean || 0,   two: counts.Sg02.Grosjean || 0,   three: counts.Sg03.Grosjean || 0,   four: counts.Sg04.Grosjean || 0,   five: counts.Sg05.Grosjean || 0,   six: counts.Sg06.Grosjean || 0,   seven: counts.Sg07.Grosjean || 0,   eight: counts.Sg08.Grosjean || 0,   nine: counts.Sg09.Grosjean || 0,   ten: counts.Sg10.Grosjean || 0,   total: counts.Total.Grosjean,   percent: counts.Percent.Grosjean,   status: counts.Status.Grosjean},
				    { pos: 12, driver: "Maldonado",  one: counts.Sg01.Maldonado || 0,  two: counts.Sg02.Maldonado || 0,  three: counts.Sg03.Maldonado || 0,  four: counts.Sg04.Maldonado || 0,  five: counts.Sg05.Maldonado || 0,  six: counts.Sg06.Maldonado || 0,  seven: counts.Sg07.Maldonado || 0,  eight: counts.Sg08.Maldonado || 0,  nine: counts.Sg09.Maldonado || 0,  ten: counts.Sg10.Maldonado || 0,  total: counts.Total.Maldonado,  percent: counts.Percent.Maldonado,  status: counts.Status.Maldonado},
				    { pos: 13, driver: "Verstappen", one: counts.Sg01.Verstappen || 0, two: counts.Sg02.Verstappen || 0, three: counts.Sg03.Verstappen || 0, four: counts.Sg04.Verstappen || 0, five: counts.Sg05.Verstappen || 0, six: counts.Sg06.Verstappen || 0, seven: counts.Sg07.Verstappen || 0, eight: counts.Sg08.Verstappen || 0, nine: counts.Sg09.Verstappen || 0, ten: counts.Sg10.Verstappen || 0, total: counts.Total.Verstappen, percent: counts.Percent.Verstappen, status: counts.Status.Verstappen},
				    { pos: 14, driver: "Sainz",      one: counts.Sg01.Sainz || 0,      two: counts.Sg02.Sainz || 0,      three: counts.Sg03.Sainz || 0,      four: counts.Sg04.Sainz || 0,      five: counts.Sg05.Sainz || 0,      six: counts.Sg06.Sainz || 0,      seven: counts.Sg07.Sainz || 0,      eight: counts.Sg08.Sainz || 0,      nine: counts.Sg09.Sainz || 0,      ten: counts.Sg10.Sainz || 0,      total: counts.Total.Sainz,      percent: counts.Percent.Sainz,      status: counts.Status.Sainz},
				    { pos: 15, driver: "Ericsson",   one: counts.Sg01.Ericsson || 0,   two: counts.Sg02.Ericsson || 0,   three: counts.Sg03.Ericsson || 0,   four: counts.Sg04.Ericsson || 0,   five: counts.Sg05.Ericsson || 0,   six: counts.Sg06.Ericsson || 0,   seven: counts.Sg07.Ericsson || 0,   eight: counts.Sg08.Ericsson || 0,   nine: counts.Sg09.Ericsson || 0,   ten: counts.Sg10.Ericsson || 0,   total: counts.Total.Ericsson,   percent: counts.Percent.Ericsson,   status: counts.Status.Ericsson},
				    { pos: 16, driver: "Nasr",       one: counts.Sg01.Nasr || 0,       two: counts.Sg02.Nasr || 0,       three: counts.Sg03.Nasr || 0,       four: counts.Sg04.Nasr || 0,       five: counts.Sg05.Nasr || 0,       six: counts.Sg06.Nasr || 0,       seven: counts.Sg07.Nasr || 0,       eight: counts.Sg08.Nasr || 0,       nine: counts.Sg09.Nasr || 0,       ten: counts.Sg10.Nasr || 0,       total: counts.Total.Nasr,       percent: counts.Percent.Nasr,       status: counts.Status.Nasr},
				    { pos: 17, driver: "Alonso",     one: counts.Sg01.Alonso || 0,     two: counts.Sg02.Alonso || 0,     three: counts.Sg03.Alonso || 0,     four: counts.Sg04.Alonso || 0,     five: counts.Sg05.Alonso || 0,     six: counts.Sg06.Alonso || 0,     seven: counts.Sg07.Alonso || 0,     eight: counts.Sg08.Alonso || 0,     nine: counts.Sg09.Alonso || 0,     ten: counts.Sg10.Alonso || 0,     total: counts.Total.Alonso,     percent: counts.Percent.Alonso,     status: counts.Status.Alonso},
				    { pos: 18, driver: "Button",     one: counts.Sg01.Button || 0,     two: counts.Sg02.Button || 0,     three: counts.Sg03.Button || 0,     four: counts.Sg04.Button || 0,     five: counts.Sg05.Button || 0,     six: counts.Sg06.Button || 0,     seven: counts.Sg07.Button || 0,     eight: counts.Sg08.Button || 0,     nine: counts.Sg09.Button || 0,     ten: counts.Sg10.Button || 0,     total: counts.Total.Button,     percent: counts.Percent.Button,     status: counts.Status.Button},
				    { pos: 19, driver: "Stevens",    one: counts.Sg01.Stevens || 0,    two: counts.Sg02.Stevens || 0,    three: counts.Sg03.Stevens || 0,    four: counts.Sg04.Stevens || 0,    five: counts.Sg05.Stevens || 0,    six: counts.Sg06.Stevens || 0,    seven: counts.Sg07.Stevens || 0,    eight: counts.Sg08.Stevens || 0,    nine: counts.Sg09.Stevens || 0,    ten: counts.Sg10.Stevens || 0,    total: counts.Total.Stevens,    percent: counts.Percent.Stevens,    status: counts.Status.Stevens},
				    { pos: 20, driver: "Merhi",      one: counts.Sg01.Merhi || 0,      two: counts.Sg02.Merhi || 0,      three: counts.Sg03.Merhi || 0,      four: counts.Sg04.Merhi || 0,      five: counts.Sg05.Merhi || 0,      six: counts.Sg06.Merhi || 0,      seven: counts.Sg07.Merhi || 0,      eight: counts.Sg08.Merhi || 0,      nine: counts.Sg09.Merhi || 0,      ten: counts.Sg10.Merhi || 0,      total: counts.Total.Merhi,      percent: counts.Percent.Merhi,      status: counts.Status.Merhi}
				];

				//==========================
				//POINTS table
				//==========================
				    vm.sortType = 'pos';
				    vm.sortReverse = false;

						// creating an object to hold all the values we need for each driver and picks tocalculate the points table.
						var sgPercentage = {
							Hamilton:   { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Rosberg:    { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Vettel:     { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Raikkonen:  { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Massa:      { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Bottas:     { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Kvyat:      { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Ricciardo:  { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Perez:      { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Hulkenberg: { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Grosjean:   { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Maldonado:  { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Verstappen: { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Sainz:      { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Ericsson:   { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Nasr:       { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Alonso:     { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Button:     { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Stevens:    { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0},
							Merhi:      { Sg01Percent:    0, Sg02Percent:    0, Sg03Percent:    0, Sg04Percent:    0, Sg05Percent:    0, Sg06Percent:    0, Sg07Percent:    0, Sg08Percent:    0, Sg09Percent:    0, Sg10Percent:    0,
							 							Sg01PickStatus: 0, Sg02PickStatus: 0, Sg03PickStatus: 0, Sg04PickStatus: 0, Sg05PickStatus: 0, Sg06PickStatus: 0, Sg07PickStatus: 0, Sg08PickStatus: 0, Sg09PickStatus: 0, Sg10PickStatus: 0,
							 							Sg01Points:     0, Sg02Points:     0, Sg03Points:     0, Sg04Points:     0, Sg05Points:     0, Sg06Points:     0, Sg07Points:     0, Sg08Points:     0, Sg09Points:     0, Sg10Points:     0}
						};

						//var dr goes from 0 to 19 and represents the driver name, which is a key in the sgPercentage object
						//var gp goes from 0 to 9 and represents the grid position, which is a key in the sgPercentage object
						//the while formula bellow gets very complicated, so this is a breakdown to remember what it is doing.
						//The first part will get the driver name "dr" and all his grid positions "gr". "dr" goes from 0 to 19 to pick all 20 drivers and "sg" goes from 0 to 9 to pick all 10 positions.
						console.log(sgPercentage[Object.keys(sgPercentage)[5]][Object.keys(sgPercentage[Object.keys(sgPercentage)[5]])[3]]); //This will get driver 5 which is Bottas and Sg04.
						//The second part with Math.round finds the starting grid position "sg" from 0 to 9 and the driver name "dr" from 0 to 19 and divides it by the number of users to get a percentage.
						console.log(counts[Object.keys(counts)[1]][Object.keys(counts[Object.keys(counts)[1]])[19]]);//This will get Sg02 and Merhi. First number goes from 0 to 9 and second goes from 0 to 19

        //======================================================

						//Percentage of picks per specific grid position
						dr = 0; //resetting it. stands for driver name and it goes from 0 to 19
						sg = 0; //resetting it. stands for starting grid position and it goes from 0 to 9. declared a while ago.
						while (dr < 20) {
							while (sg < 10){
								sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[sg]] = Math.round((counts[Object.keys(counts)[sg]][Object.keys(counts[Object.keys(counts)[sg]])[dr]]/vm.users.length)*100) || 0;
								sg++;
							}
							sg = 0;
							dr++;
						}

						console.log(sgPercentage);

        //======================================================

						//Driver Pick Status
						dr = 0;
						sg = 0;
						var ps = 10; //ps stands for pick status and it goes from 10 to 19 in the sgPercentage object

						while (dr < 20){
							while (sg < 10){
								if(sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[sg]] === 0){ // Percentage per grid position
									sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] = "Zero"; // Pick Status
								} else if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[sg]] >= 20){
									sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] = "High";
								} else if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[sg]] >= 10){
									sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] = "Medium";
								} else {
									sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] = "Low";
								}
								sg ++;
								ps ++;
							}
							sg = 0;
							ps = 10;
							dr++;
						}

				//======================================================

						//Here are the IF statements to determine the Points "paid" by each driver in each position

						dr = 0; //resetting the Drivers variable
						ps = 10; //resetting the Pick Status variable. Starts at 10.
						var pts = 20; //Points variable starts at position 20 in the Object

						while (dr < 20){
							while (ps < 20){
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "Zero") {
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 0;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "High" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Favorite"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 4;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "High" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Very Likely"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 8;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "High" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Less Likely"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 12;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "High" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Underdog"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 16;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "Medium" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Favorite"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 6;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "Medium" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Very Likely"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 10;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "Medium" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Less Likely"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 14;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "Medium" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Underdog"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 18;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "Low" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Favorite"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 8;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "Low" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Very Likely"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 12;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "Low" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Less Likely"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 16;
										}
								if (sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[ps]] === "Low" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Underdog"){
											sgPercentage[Object.keys(sgPercentage)[dr]][Object.keys(sgPercentage[Object.keys(sgPercentage)[dr]])[pts]] = 20;
										}
								ps++;
								pts++;
							}
							ps = 10; //resetting for next driver
							pts = 20; //resetting for next driver
							dr++;
						}

				    //prepopulate a list of drivers
				    vm.driversPoints = [
				        { pos: 1, driver: "Hamilton",    oneP:   sgPercentage.Hamilton.Sg01Points, oneN:   sgPercentage.Hamilton.Sg01Points/2, oneTen:   sgPercentage.Hamilton.Sg01Points/4,
					                                       twoP:   sgPercentage.Hamilton.Sg02Points, twoN:   sgPercentage.Hamilton.Sg02Points/2, twoTen:   sgPercentage.Hamilton.Sg02Points/4,
					                                       threeP: sgPercentage.Hamilton.Sg03Points, threeN:   sgPercentage.Hamilton.Sg03Points/2, threeTen:   sgPercentage.Hamilton.Sg03Points/4,
					                                       fourP:  sgPercentage.Hamilton.Sg04Points, fourN:   sgPercentage.Hamilton.Sg04Points/2, fourTen:   sgPercentage.Hamilton.Sg04Points/4,
					                                       fiveP:  sgPercentage.Hamilton.Sg05Points, fiveN:   sgPercentage.Hamilton.Sg05Points/2, fiveTen:   sgPercentage.Hamilton.Sg05Points/4,
					                                       sixP:   sgPercentage.Hamilton.Sg06Points, sixN:   sgPercentage.Hamilton.Sg06Points/2, sixTen:   sgPercentage.Hamilton.Sg06Points/4,
					                                       sevenP: sgPercentage.Hamilton.Sg07Points, sevenN:   sgPercentage.Hamilton.Sg07Points/2, sevenTen:   sgPercentage.Hamilton.Sg07Points/4,
					                                       eightP: sgPercentage.Hamilton.Sg08Points, eightN:   sgPercentage.Hamilton.Sg08Points/2, eightTen:   sgPercentage.Hamilton.Sg08Points/4,
					                                       nineP:  sgPercentage.Hamilton.Sg09Points, nineN:   sgPercentage.Hamilton.Sg09Points/2, nineTen:   sgPercentage.Hamilton.Sg09Points/4,
					                                       tenP:   sgPercentage.Hamilton.Sg10Points, tenN:   sgPercentage.Hamilton.Sg10Points/2, tenTen:   sgPercentage.Hamilton.Sg10Points/4},
				        { pos: 2, driver: "Rosberg",     oneP:   sgPercentage.Rosberg.Sg01Points, oneN:   sgPercentage.Rosberg.Sg01Points/2, oneTen:   sgPercentage.Rosberg.Sg01Points/4,
					                                       twoP:   sgPercentage.Rosberg.Sg02Points, twoN:   sgPercentage.Rosberg.Sg02Points/2, twoTen:   sgPercentage.Rosberg.Sg02Points/4,
					                                       threeP: sgPercentage.Rosberg.Sg03Points, threeN:   sgPercentage.Rosberg.Sg03Points/2, threeTen:   sgPercentage.Rosberg.Sg03Points/4,
					                                       fourP:  sgPercentage.Rosberg.Sg04Points, fourN:   sgPercentage.Rosberg.Sg04Points/2, fourTen:   sgPercentage.Rosberg.Sg04Points/4,
					                                       fiveP:  sgPercentage.Rosberg.Sg05Points, fiveN:   sgPercentage.Rosberg.Sg05Points/2, fiveTen:   sgPercentage.Rosberg.Sg05Points/4,
					                                       sixP:   sgPercentage.Rosberg.Sg06Points, sixN:   sgPercentage.Rosberg.Sg06Points/2, sixTen:   sgPercentage.Rosberg.Sg06Points/4,
					                                       sevenP: sgPercentage.Rosberg.Sg07Points, sevenN:   sgPercentage.Rosberg.Sg07Points/2, sevenTen:   sgPercentage.Rosberg.Sg07Points/4,
					                                       eightP: sgPercentage.Rosberg.Sg08Points, eightN:   sgPercentage.Rosberg.Sg08Points/2, eightTen:   sgPercentage.Rosberg.Sg08Points/4,
					                                       nineP:  sgPercentage.Rosberg.Sg09Points, nineN:   sgPercentage.Rosberg.Sg09Points/2, nineTen:   sgPercentage.Rosberg.Sg09Points/4,
					                                       tenP:   sgPercentage.Rosberg.Sg10Points, tenN:   sgPercentage.Rosberg.Sg10Points/2, tenTen:   sgPercentage.Rosberg.Sg10Points/4},
				        { pos: 3, driver: "Vettel", 	   oneP:   sgPercentage.Vettel.Sg01Points, oneN:   sgPercentage.Vettel.Sg01Points/2, oneTen:   sgPercentage.Vettel.Sg01Points/4,
					                                       twoP:   sgPercentage.Vettel.Sg02Points, twoN:   sgPercentage.Vettel.Sg02Points/2, twoTen:   sgPercentage.Vettel.Sg02Points/4,
					                                       threeP: sgPercentage.Vettel.Sg03Points, threeN:   sgPercentage.Vettel.Sg03Points/2, threeTen:   sgPercentage.Vettel.Sg03Points/4,
					                                       fourP:  sgPercentage.Vettel.Sg04Points, fourN:   sgPercentage.Vettel.Sg04Points/2, fourTen:   sgPercentage.Vettel.Sg04Points/4,
					                                       fiveP:  sgPercentage.Vettel.Sg05Points, fiveN:   sgPercentage.Vettel.Sg05Points/2, fiveTen:   sgPercentage.Vettel.Sg05Points/4,
					                                       sixP:   sgPercentage.Vettel.Sg06Points, sixN:   sgPercentage.Vettel.Sg06Points/2, sixTen:   sgPercentage.Vettel.Sg06Points/4,
					                                       sevenP: sgPercentage.Vettel.Sg07Points, sevenN:   sgPercentage.Vettel.Sg07Points/2, sevenTen:   sgPercentage.Vettel.Sg07Points/4,
					                                       eightP: sgPercentage.Vettel.Sg08Points, eightN:   sgPercentage.Vettel.Sg08Points/2, eightTen:   sgPercentage.Vettel.Sg08Points/4,
					                                       nineP:  sgPercentage.Vettel.Sg09Points, nineN:   sgPercentage.Vettel.Sg09Points/2, nineTen:   sgPercentage.Vettel.Sg09Points/4,
					                                       tenP:   sgPercentage.Vettel.Sg10Points, tenN:   sgPercentage.Vettel.Sg10Points/2, tenTen:   sgPercentage.Vettel.Sg10Points/4},
				        { pos: 4, driver: "Raikkonen",   oneP:   sgPercentage.Raikkonen.Sg01Points, oneN:   sgPercentage.Raikkonen.Sg01Points/2, oneTen:   sgPercentage.Raikkonen.Sg01Points/4,
					                                       twoP:   sgPercentage.Raikkonen.Sg02Points, twoN:   sgPercentage.Raikkonen.Sg02Points/2, twoTen:   sgPercentage.Raikkonen.Sg02Points/4,
					                                       threeP: sgPercentage.Raikkonen.Sg03Points, threeN:   sgPercentage.Raikkonen.Sg03Points/2, threeTen:   sgPercentage.Raikkonen.Sg03Points/4,
					                                       fourP:  sgPercentage.Raikkonen.Sg04Points, fourN:   sgPercentage.Raikkonen.Sg04Points/2, fourTen:   sgPercentage.Raikkonen.Sg04Points/4,
					                                       fiveP:  sgPercentage.Raikkonen.Sg05Points, fiveN:   sgPercentage.Raikkonen.Sg05Points/2, fiveTen:   sgPercentage.Raikkonen.Sg05Points/4,
					                                       sixP:   sgPercentage.Raikkonen.Sg06Points, sixN:   sgPercentage.Raikkonen.Sg06Points/2, sixTen:   sgPercentage.Raikkonen.Sg06Points/4,
					                                       sevenP: sgPercentage.Raikkonen.Sg07Points, sevenN:   sgPercentage.Raikkonen.Sg07Points/2, sevenTen:   sgPercentage.Raikkonen.Sg07Points/4,
					                                       eightP: sgPercentage.Raikkonen.Sg08Points, eightN:   sgPercentage.Raikkonen.Sg08Points/2, eightTen:   sgPercentage.Raikkonen.Sg08Points/4,
					                                       nineP:  sgPercentage.Raikkonen.Sg09Points, nineN:   sgPercentage.Raikkonen.Sg09Points/2, nineTen:   sgPercentage.Raikkonen.Sg09Points/4,
					                                       tenP:   sgPercentage.Raikkonen.Sg10Points, tenN:   sgPercentage.Raikkonen.Sg10Points/2, tenTen:   sgPercentage.Raikkonen.Sg10Points/4},
				        { pos: 5, driver: "Massa",       oneP:   sgPercentage.Massa.Sg01Points, oneN:   sgPercentage.Massa.Sg01Points/2, oneTen:   sgPercentage.Massa.Sg01Points/4,
					                                       twoP:   sgPercentage.Massa.Sg02Points, twoN:   sgPercentage.Massa.Sg02Points/2, twoTen:   sgPercentage.Massa.Sg02Points/4,
					                                       threeP: sgPercentage.Massa.Sg03Points, threeN:   sgPercentage.Massa.Sg03Points/2, threeTen:   sgPercentage.Massa.Sg03Points/4,
					                                       fourP:  sgPercentage.Massa.Sg04Points, fourN:   sgPercentage.Massa.Sg04Points/2, fourTen:   sgPercentage.Massa.Sg04Points/4,
					                                       fiveP:  sgPercentage.Massa.Sg05Points, fiveN:   sgPercentage.Massa.Sg05Points/2, fiveTen:   sgPercentage.Massa.Sg05Points/4,
					                                       sixP:   sgPercentage.Massa.Sg06Points, sixN:   sgPercentage.Massa.Sg06Points/2, sixTen:   sgPercentage.Massa.Sg06Points/4,
					                                       sevenP: sgPercentage.Massa.Sg07Points, sevenN:   sgPercentage.Massa.Sg07Points/2, sevenTen:   sgPercentage.Massa.Sg07Points/4,
					                                       eightP: sgPercentage.Massa.Sg08Points, eightN:   sgPercentage.Massa.Sg08Points/2, eightTen:   sgPercentage.Massa.Sg08Points/4,
					                                       nineP:  sgPercentage.Massa.Sg09Points, nineN:   sgPercentage.Massa.Sg09Points/2, nineTen:   sgPercentage.Massa.Sg09Points/4,
					                                       tenP:   sgPercentage.Massa.Sg10Points, tenN:   sgPercentage.Massa.Sg10Points/2, tenTen:   sgPercentage.Massa.Sg10Points/4},
				        { pos: 6, driver: "Bottas",      oneP:   sgPercentage.Bottas.Sg01Points, oneN:   sgPercentage.Bottas.Sg01Points/2, oneTen:   sgPercentage.Bottas.Sg01Points/4,
					                                       twoP:   sgPercentage.Bottas.Sg02Points, twoN:   sgPercentage.Bottas.Sg02Points/2, twoTen:   sgPercentage.Bottas.Sg02Points/4,
					                                       threeP: sgPercentage.Bottas.Sg03Points, threeN:   sgPercentage.Bottas.Sg03Points/2, threeTen:   sgPercentage.Bottas.Sg03Points/4,
					                                       fourP:  sgPercentage.Bottas.Sg04Points, fourN:   sgPercentage.Bottas.Sg04Points/2, fourTen:   sgPercentage.Bottas.Sg04Points/4,
					                                       fiveP:  sgPercentage.Bottas.Sg05Points, fiveN:   sgPercentage.Bottas.Sg05Points/2, fiveTen:   sgPercentage.Bottas.Sg05Points/4,
					                                       sixP:   sgPercentage.Bottas.Sg06Points, sixN:   sgPercentage.Bottas.Sg06Points/2, sixTen:   sgPercentage.Bottas.Sg06Points/4,
					                                       sevenP: sgPercentage.Bottas.Sg07Points, sevenN:   sgPercentage.Bottas.Sg07Points/2, sevenTen:   sgPercentage.Bottas.Sg07Points/4,
					                                       eightP: sgPercentage.Bottas.Sg08Points, eightN:   sgPercentage.Bottas.Sg08Points/2, eightTen:   sgPercentage.Bottas.Sg08Points/4,
					                                       nineP:  sgPercentage.Bottas.Sg09Points, nineN:   sgPercentage.Bottas.Sg09Points/2, nineTen:   sgPercentage.Bottas.Sg09Points/4,
					                                       tenP:   sgPercentage.Bottas.Sg10Points, tenN:   sgPercentage.Bottas.Sg10Points/2, tenTen:   sgPercentage.Bottas.Sg10Points/4},
				        { pos: 7, driver: "Kvyat",       oneP:   sgPercentage.Kvyat.Sg01Points, oneN:   sgPercentage.Kvyat.Sg01Points/2, oneTen:   sgPercentage.Kvyat.Sg01Points/4,
					                                       twoP:   sgPercentage.Kvyat.Sg02Points, twoN:   sgPercentage.Kvyat.Sg02Points/2, twoTen:   sgPercentage.Kvyat.Sg02Points/4,
					                                       threeP: sgPercentage.Kvyat.Sg03Points, threeN:   sgPercentage.Kvyat.Sg03Points/2, threeTen:   sgPercentage.Kvyat.Sg03Points/4,
					                                       fourP:  sgPercentage.Kvyat.Sg04Points, fourN:   sgPercentage.Kvyat.Sg04Points/2, fourTen:   sgPercentage.Kvyat.Sg04Points/4,
					                                       fiveP:  sgPercentage.Kvyat.Sg05Points, fiveN:   sgPercentage.Kvyat.Sg05Points/2, fiveTen:   sgPercentage.Kvyat.Sg05Points/4,
					                                       sixP:   sgPercentage.Kvyat.Sg06Points, sixN:   sgPercentage.Kvyat.Sg06Points/2, sixTen:   sgPercentage.Kvyat.Sg06Points/4,
					                                       sevenP: sgPercentage.Kvyat.Sg07Points, sevenN:   sgPercentage.Kvyat.Sg07Points/2, sevenTen:   sgPercentage.Kvyat.Sg07Points/4,
					                                       eightP: sgPercentage.Kvyat.Sg08Points, eightN:   sgPercentage.Kvyat.Sg08Points/2, eightTen:   sgPercentage.Kvyat.Sg08Points/4,
					                                       nineP:  sgPercentage.Kvyat.Sg09Points, nineN:   sgPercentage.Kvyat.Sg09Points/2, nineTen:   sgPercentage.Kvyat.Sg09Points/4,
					                                       tenP:   sgPercentage.Kvyat.Sg10Points, tenN:   sgPercentage.Kvyat.Sg10Points/2, tenTen:   sgPercentage.Kvyat.Sg10Points/4},
				        { pos: 8, driver: "Ricciardo",   oneP:   sgPercentage.Ricciardo.Sg01Points, oneN:   sgPercentage.Ricciardo.Sg01Points/2, oneTen:   sgPercentage.Ricciardo.Sg01Points/4,
					                                       twoP:   sgPercentage.Ricciardo.Sg02Points, twoN:   sgPercentage.Ricciardo.Sg02Points/2, twoTen:   sgPercentage.Ricciardo.Sg02Points/4,
					                                       threeP: sgPercentage.Ricciardo.Sg03Points, threeN:   sgPercentage.Ricciardo.Sg03Points/2, threeTen:   sgPercentage.Ricciardo.Sg03Points/4,
					                                       fourP:  sgPercentage.Ricciardo.Sg04Points, fourN:   sgPercentage.Ricciardo.Sg04Points/2, fourTen:   sgPercentage.Ricciardo.Sg04Points/4,
					                                       fiveP:  sgPercentage.Ricciardo.Sg05Points, fiveN:   sgPercentage.Ricciardo.Sg05Points/2, fiveTen:   sgPercentage.Ricciardo.Sg05Points/4,
					                                       sixP:   sgPercentage.Ricciardo.Sg06Points, sixN:   sgPercentage.Ricciardo.Sg06Points/2, sixTen:   sgPercentage.Ricciardo.Sg06Points/4,
					                                       sevenP: sgPercentage.Ricciardo.Sg07Points, sevenN:   sgPercentage.Ricciardo.Sg07Points/2, sevenTen:   sgPercentage.Ricciardo.Sg07Points/4,
					                                       eightP: sgPercentage.Ricciardo.Sg08Points, eightN:   sgPercentage.Ricciardo.Sg08Points/2, eightTen:   sgPercentage.Ricciardo.Sg08Points/4,
					                                       nineP:  sgPercentage.Ricciardo.Sg09Points, nineN:   sgPercentage.Ricciardo.Sg09Points/2, nineTen:   sgPercentage.Ricciardo.Sg09Points/4,
					                                       tenP:   sgPercentage.Ricciardo.Sg10Points, tenN:   sgPercentage.Ricciardo.Sg10Points/2, tenTen:   sgPercentage.Ricciardo.Sg10Points/4},
				        { pos: 9, driver: "Perez",     	 oneP:   sgPercentage.Perez.Sg01Points, oneN:   sgPercentage.Perez.Sg01Points/2, oneTen:   sgPercentage.Perez.Sg01Points/4,
					                                       twoP:   sgPercentage.Perez.Sg02Points, twoN:   sgPercentage.Perez.Sg02Points/2, twoTen:   sgPercentage.Perez.Sg02Points/4,
					                                       threeP: sgPercentage.Perez.Sg03Points, threeN:   sgPercentage.Perez.Sg03Points/2, threeTen:   sgPercentage.Perez.Sg03Points/4,
					                                       fourP:  sgPercentage.Perez.Sg04Points, fourN:   sgPercentage.Perez.Sg04Points/2, fourTen:   sgPercentage.Perez.Sg04Points/4,
					                                       fiveP:  sgPercentage.Perez.Sg05Points, fiveN:   sgPercentage.Perez.Sg05Points/2, fiveTen:   sgPercentage.Perez.Sg05Points/4,
					                                       sixP:   sgPercentage.Perez.Sg06Points, sixN:   sgPercentage.Perez.Sg06Points/2, sixTen:   sgPercentage.Perez.Sg06Points/4,
					                                       sevenP: sgPercentage.Perez.Sg07Points, sevenN:   sgPercentage.Perez.Sg07Points/2, sevenTen:   sgPercentage.Perez.Sg07Points/4,
					                                       eightP: sgPercentage.Perez.Sg08Points, eightN:   sgPercentage.Perez.Sg08Points/2, eightTen:   sgPercentage.Perez.Sg08Points/4,
					                                       nineP:  sgPercentage.Perez.Sg09Points, nineN:   sgPercentage.Perez.Sg09Points/2, nineTen:   sgPercentage.Perez.Sg09Points/4,
					                                       tenP:   sgPercentage.Perez.Sg10Points, tenN:   sgPercentage.Perez.Sg10Points/2, tenTen:   sgPercentage.Perez.Sg10Points/4},
				        { pos: 10, driver: "Hulkenberg", oneP:   sgPercentage.Hulkenberg.Sg01Points, oneN:   sgPercentage.Hulkenberg.Sg01Points/2, oneTen:   sgPercentage.Hulkenberg.Sg01Points/4,
					                                       twoP:   sgPercentage.Hulkenberg.Sg02Points, twoN:   sgPercentage.Hulkenberg.Sg02Points/2, twoTen:   sgPercentage.Hulkenberg.Sg02Points/4,
					                                       threeP: sgPercentage.Hulkenberg.Sg03Points, threeN:   sgPercentage.Hulkenberg.Sg03Points/2, threeTen:   sgPercentage.Hulkenberg.Sg03Points/4,
					                                       fourP:  sgPercentage.Hulkenberg.Sg04Points, fourN:   sgPercentage.Hulkenberg.Sg04Points/2, fourTen:   sgPercentage.Hulkenberg.Sg04Points/4,
					                                       fiveP:  sgPercentage.Hulkenberg.Sg05Points, fiveN:   sgPercentage.Hulkenberg.Sg05Points/2, fiveTen:   sgPercentage.Hulkenberg.Sg05Points/4,
					                                       sixP:   sgPercentage.Hulkenberg.Sg06Points, sixN:   sgPercentage.Hulkenberg.Sg06Points/2, sixTen:   sgPercentage.Hulkenberg.Sg06Points/4,
					                                       sevenP: sgPercentage.Hulkenberg.Sg07Points, sevenN:   sgPercentage.Hulkenberg.Sg07Points/2, sevenTen:   sgPercentage.Hulkenberg.Sg07Points/4,
					                                       eightP: sgPercentage.Hulkenberg.Sg08Points, eightN:   sgPercentage.Hulkenberg.Sg08Points/2, eightTen:   sgPercentage.Hulkenberg.Sg08Points/4,
					                                       nineP:  sgPercentage.Hulkenberg.Sg09Points, nineN:   sgPercentage.Hulkenberg.Sg09Points/2, nineTen:   sgPercentage.Hulkenberg.Sg09Points/4,
					                                       tenP:   sgPercentage.Hulkenberg.Sg10Points, tenN:   sgPercentage.Hulkenberg.Sg10Points/2, tenTen:   sgPercentage.Hulkenberg.Sg10Points/4},
				        { pos: 11, driver: "Grosjean",   oneP:   sgPercentage.Grosjean.Sg01Points, oneN:   sgPercentage.Grosjean.Sg01Points/2, oneTen:   sgPercentage.Grosjean.Sg01Points/4,
					                                       twoP:   sgPercentage.Grosjean.Sg02Points, twoN:   sgPercentage.Grosjean.Sg02Points/2, twoTen:   sgPercentage.Grosjean.Sg02Points/4,
					                                       threeP: sgPercentage.Grosjean.Sg03Points, threeN:   sgPercentage.Grosjean.Sg03Points/2, threeTen:   sgPercentage.Grosjean.Sg03Points/4,
					                                       fourP:  sgPercentage.Grosjean.Sg04Points, fourN:   sgPercentage.Grosjean.Sg04Points/2, fourTen:   sgPercentage.Grosjean.Sg04Points/4,
					                                       fiveP:  sgPercentage.Grosjean.Sg05Points, fiveN:   sgPercentage.Grosjean.Sg05Points/2, fiveTen:   sgPercentage.Grosjean.Sg05Points/4,
					                                       sixP:   sgPercentage.Grosjean.Sg06Points, sixN:   sgPercentage.Grosjean.Sg06Points/2, sixTen:   sgPercentage.Grosjean.Sg06Points/4,
					                                       sevenP: sgPercentage.Grosjean.Sg07Points, sevenN:   sgPercentage.Grosjean.Sg07Points/2, sevenTen:   sgPercentage.Grosjean.Sg07Points/4,
					                                       eightP: sgPercentage.Grosjean.Sg08Points, eightN:   sgPercentage.Grosjean.Sg08Points/2, eightTen:   sgPercentage.Grosjean.Sg08Points/4,
					                                       nineP:  sgPercentage.Grosjean.Sg09Points, nineN:   sgPercentage.Grosjean.Sg09Points/2, nineTen:   sgPercentage.Grosjean.Sg09Points/4,
					                                       tenP:   sgPercentage.Grosjean.Sg10Points, tenN:   sgPercentage.Grosjean.Sg10Points/2, tenTen:   sgPercentage.Grosjean.Sg10Points/4},
				        { pos: 12, driver: "Maldonado",  oneP:   sgPercentage.Maldonado.Sg01Points, oneN:   sgPercentage.Maldonado.Sg01Points/2, oneTen:   sgPercentage.Maldonado.Sg01Points/4,
					                                       twoP:   sgPercentage.Maldonado.Sg02Points, twoN:   sgPercentage.Maldonado.Sg02Points/2, twoTen:   sgPercentage.Maldonado.Sg02Points/4,
					                                       threeP: sgPercentage.Maldonado.Sg03Points, threeN:   sgPercentage.Maldonado.Sg03Points/2, threeTen:   sgPercentage.Maldonado.Sg03Points/4,
					                                       fourP:  sgPercentage.Maldonado.Sg04Points, fourN:   sgPercentage.Maldonado.Sg04Points/2, fourTen:   sgPercentage.Maldonado.Sg04Points/4,
					                                       fiveP:  sgPercentage.Maldonado.Sg05Points, fiveN:   sgPercentage.Maldonado.Sg05Points/2, fiveTen:   sgPercentage.Maldonado.Sg05Points/4,
					                                       sixP:   sgPercentage.Maldonado.Sg06Points, sixN:   sgPercentage.Maldonado.Sg06Points/2, sixTen:   sgPercentage.Maldonado.Sg06Points/4,
					                                       sevenP: sgPercentage.Maldonado.Sg07Points, sevenN:   sgPercentage.Maldonado.Sg07Points/2, sevenTen:   sgPercentage.Maldonado.Sg07Points/4,
					                                       eightP: sgPercentage.Maldonado.Sg08Points, eightN:   sgPercentage.Maldonado.Sg08Points/2, eightTen:   sgPercentage.Maldonado.Sg08Points/4,
					                                       nineP:  sgPercentage.Maldonado.Sg09Points, nineN:   sgPercentage.Maldonado.Sg09Points/2, nineTen:   sgPercentage.Maldonado.Sg09Points/4,
					                                       tenP:   sgPercentage.Maldonado.Sg10Points, tenN:   sgPercentage.Maldonado.Sg10Points/2, tenTen:   sgPercentage.Maldonado.Sg10Points/4},
				        { pos: 13, driver: "Verstappen", oneP:   sgPercentage.Verstappen.Sg01Points, oneN:   sgPercentage.Verstappen.Sg01Points/2, oneTen:   sgPercentage.Verstappen.Sg01Points/4,
					                                       twoP:   sgPercentage.Verstappen.Sg02Points, twoN:   sgPercentage.Verstappen.Sg02Points/2, twoTen:   sgPercentage.Verstappen.Sg02Points/4,
					                                       threeP: sgPercentage.Verstappen.Sg03Points, threeN:   sgPercentage.Verstappen.Sg03Points/2, threeTen:   sgPercentage.Verstappen.Sg03Points/4,
					                                       fourP:  sgPercentage.Verstappen.Sg04Points, fourN:   sgPercentage.Verstappen.Sg04Points/2, fourTen:   sgPercentage.Verstappen.Sg04Points/4,
					                                       fiveP:  sgPercentage.Verstappen.Sg05Points, fiveN:   sgPercentage.Verstappen.Sg05Points/2, fiveTen:   sgPercentage.Verstappen.Sg05Points/4,
					                                       sixP:   sgPercentage.Verstappen.Sg06Points, sixN:   sgPercentage.Verstappen.Sg06Points/2, sixTen:   sgPercentage.Verstappen.Sg06Points/4,
					                                       sevenP: sgPercentage.Verstappen.Sg07Points, sevenN:   sgPercentage.Verstappen.Sg07Points/2, sevenTen:   sgPercentage.Verstappen.Sg07Points/4,
					                                       eightP: sgPercentage.Verstappen.Sg08Points, eightN:   sgPercentage.Verstappen.Sg08Points/2, eightTen:   sgPercentage.Verstappen.Sg08Points/4,
					                                       nineP:  sgPercentage.Verstappen.Sg09Points, nineN:   sgPercentage.Verstappen.Sg09Points/2, nineTen:   sgPercentage.Verstappen.Sg09Points/4,
					                                       tenP:   sgPercentage.Verstappen.Sg10Points, tenN:   sgPercentage.Verstappen.Sg10Points/2, tenTen:   sgPercentage.Verstappen.Sg10Points/4},
				        { pos: 14, driver: "Sainz",      oneP:   sgPercentage.Sainz.Sg01Points, oneN:   sgPercentage.Sainz.Sg01Points/2, oneTen:   sgPercentage.Sainz.Sg01Points/4,
					                                       twoP:   sgPercentage.Sainz.Sg02Points, twoN:   sgPercentage.Sainz.Sg02Points/2, twoTen:   sgPercentage.Sainz.Sg02Points/4,
					                                       threeP: sgPercentage.Sainz.Sg03Points, threeN:   sgPercentage.Sainz.Sg03Points/2, threeTen:   sgPercentage.Sainz.Sg03Points/4,
					                                       fourP:  sgPercentage.Sainz.Sg04Points, fourN:   sgPercentage.Sainz.Sg04Points/2, fourTen:   sgPercentage.Sainz.Sg04Points/4,
					                                       fiveP:  sgPercentage.Sainz.Sg05Points, fiveN:   sgPercentage.Sainz.Sg05Points/2, fiveTen:   sgPercentage.Sainz.Sg05Points/4,
					                                       sixP:   sgPercentage.Sainz.Sg06Points, sixN:   sgPercentage.Sainz.Sg06Points/2, sixTen:   sgPercentage.Sainz.Sg06Points/4,
					                                       sevenP: sgPercentage.Sainz.Sg07Points, sevenN:   sgPercentage.Sainz.Sg07Points/2, sevenTen:   sgPercentage.Sainz.Sg07Points/4,
					                                       eightP: sgPercentage.Sainz.Sg08Points, eightN:   sgPercentage.Sainz.Sg08Points/2, eightTen:   sgPercentage.Sainz.Sg08Points/4,
					                                       nineP:  sgPercentage.Sainz.Sg09Points, nineN:   sgPercentage.Sainz.Sg09Points/2, nineTen:   sgPercentage.Sainz.Sg09Points/4,
					                                       tenP:   sgPercentage.Sainz.Sg10Points, tenN:   sgPercentage.Sainz.Sg10Points/2, tenTen:   sgPercentage.Sainz.Sg10Points/4},
				        { pos: 15, driver: "Ericsson",   oneP:   sgPercentage.Ericsson.Sg01Points, oneN:   sgPercentage.Ericsson.Sg01Points/2, oneTen:   sgPercentage.Ericsson.Sg01Points/4,
					                                       twoP:   sgPercentage.Ericsson.Sg02Points, twoN:   sgPercentage.Ericsson.Sg02Points/2, twoTen:   sgPercentage.Ericsson.Sg02Points/4,
					                                       threeP: sgPercentage.Ericsson.Sg03Points, threeN:   sgPercentage.Ericsson.Sg03Points/2, threeTen:   sgPercentage.Ericsson.Sg03Points/4,
					                                       fourP:  sgPercentage.Ericsson.Sg04Points, fourN:   sgPercentage.Ericsson.Sg04Points/2, fourTen:   sgPercentage.Ericsson.Sg04Points/4,
					                                       fiveP:  sgPercentage.Ericsson.Sg05Points, fiveN:   sgPercentage.Ericsson.Sg05Points/2, fiveTen:   sgPercentage.Ericsson.Sg05Points/4,
					                                       sixP:   sgPercentage.Ericsson.Sg06Points, sixN:   sgPercentage.Ericsson.Sg06Points/2, sixTen:   sgPercentage.Ericsson.Sg06Points/4,
					                                       sevenP: sgPercentage.Ericsson.Sg07Points, sevenN:   sgPercentage.Ericsson.Sg07Points/2, sevenTen:   sgPercentage.Ericsson.Sg07Points/4,
					                                       eightP: sgPercentage.Ericsson.Sg08Points, eightN:   sgPercentage.Ericsson.Sg08Points/2, eightTen:   sgPercentage.Ericsson.Sg08Points/4,
					                                       nineP:  sgPercentage.Ericsson.Sg09Points, nineN:   sgPercentage.Ericsson.Sg09Points/2, nineTen:   sgPercentage.Ericsson.Sg09Points/4,
					                                       tenP:   sgPercentage.Ericsson.Sg10Points, tenN:   sgPercentage.Ericsson.Sg10Points/2, tenTen:   sgPercentage.Ericsson.Sg10Points/4},
				        { pos: 16, driver: "Nasr",       oneP:   sgPercentage.Nasr.Sg01Points, oneN:   sgPercentage.Nasr.Sg01Points/2, oneTen:   sgPercentage.Nasr.Sg01Points/4,
					                                       twoP:   sgPercentage.Nasr.Sg02Points, twoN:   sgPercentage.Nasr.Sg02Points/2, twoTen:   sgPercentage.Nasr.Sg02Points/4,
					                                       threeP: sgPercentage.Nasr.Sg03Points, threeN:   sgPercentage.Nasr.Sg03Points/2, threeTen:   sgPercentage.Nasr.Sg03Points/4,
					                                       fourP:  sgPercentage.Nasr.Sg04Points, fourN:   sgPercentage.Nasr.Sg04Points/2, fourTen:   sgPercentage.Nasr.Sg04Points/4,
					                                       fiveP:  sgPercentage.Nasr.Sg05Points, fiveN:   sgPercentage.Nasr.Sg05Points/2, fiveTen:   sgPercentage.Nasr.Sg05Points/4,
					                                       sixP:   sgPercentage.Nasr.Sg06Points, sixN:   sgPercentage.Nasr.Sg06Points/2, sixTen:   sgPercentage.Nasr.Sg06Points/4,
					                                       sevenP: sgPercentage.Nasr.Sg07Points, sevenN:   sgPercentage.Nasr.Sg07Points/2, sevenTen:   sgPercentage.Nasr.Sg07Points/4,
					                                       eightP: sgPercentage.Nasr.Sg08Points, eightN:   sgPercentage.Nasr.Sg08Points/2, eightTen:   sgPercentage.Nasr.Sg08Points/4,
					                                       nineP:  sgPercentage.Nasr.Sg09Points, nineN:   sgPercentage.Nasr.Sg09Points/2, nineTen:   sgPercentage.Nasr.Sg09Points/4,
					                                       tenP:   sgPercentage.Nasr.Sg10Points, tenN:   sgPercentage.Nasr.Sg10Points/2, tenTen:   sgPercentage.Nasr.Sg10Points/4},
				        { pos: 17, driver: "Alonso",   	 oneP:   sgPercentage.Alonso.Sg01Points, oneN:   sgPercentage.Alonso.Sg01Points/2, oneTen:   sgPercentage.Alonso.Sg01Points/4,
					                                       twoP:   sgPercentage.Alonso.Sg02Points, twoN:   sgPercentage.Alonso.Sg02Points/2, twoTen:   sgPercentage.Alonso.Sg02Points/4,
					                                       threeP: sgPercentage.Alonso.Sg03Points, threeN:   sgPercentage.Alonso.Sg03Points/2, threeTen:   sgPercentage.Alonso.Sg03Points/4,
					                                       fourP:  sgPercentage.Alonso.Sg04Points, fourN:   sgPercentage.Alonso.Sg04Points/2, fourTen:   sgPercentage.Alonso.Sg04Points/4,
					                                       fiveP:  sgPercentage.Alonso.Sg05Points, fiveN:   sgPercentage.Alonso.Sg05Points/2, fiveTen:   sgPercentage.Alonso.Sg05Points/4,
					                                       sixP:   sgPercentage.Alonso.Sg06Points, sixN:   sgPercentage.Alonso.Sg06Points/2, sixTen:   sgPercentage.Alonso.Sg06Points/4,
					                                       sevenP: sgPercentage.Alonso.Sg07Points, sevenN:   sgPercentage.Alonso.Sg07Points/2, sevenTen:   sgPercentage.Alonso.Sg07Points/4,
					                                       eightP: sgPercentage.Alonso.Sg08Points, eightN:   sgPercentage.Alonso.Sg08Points/2, eightTen:   sgPercentage.Alonso.Sg08Points/4,
					                                       nineP:  sgPercentage.Alonso.Sg09Points, nineN:   sgPercentage.Alonso.Sg09Points/2, nineTen:   sgPercentage.Alonso.Sg09Points/4,
					                                       tenP:   sgPercentage.Alonso.Sg10Points, tenN:   sgPercentage.Alonso.Sg10Points/2, tenTen:   sgPercentage.Alonso.Sg10Points/4},
				        { pos: 18, driver: "Button",   	 oneP:   sgPercentage.Button.Sg01Points, oneN:   sgPercentage.Button.Sg01Points/2, oneTen:   sgPercentage.Button.Sg01Points/4,
					                                       twoP:   sgPercentage.Button.Sg02Points, twoN:   sgPercentage.Button.Sg02Points/2, twoTen:   sgPercentage.Button.Sg02Points/4,
					                                       threeP: sgPercentage.Button.Sg03Points, threeN:   sgPercentage.Button.Sg03Points/2, threeTen:   sgPercentage.Button.Sg03Points/4,
					                                       fourP:  sgPercentage.Button.Sg04Points, fourN:   sgPercentage.Button.Sg04Points/2, fourTen:   sgPercentage.Button.Sg04Points/4,
					                                       fiveP:  sgPercentage.Button.Sg05Points, fiveN:   sgPercentage.Button.Sg05Points/2, fiveTen:   sgPercentage.Button.Sg05Points/4,
					                                       sixP:   sgPercentage.Button.Sg06Points, sixN:   sgPercentage.Button.Sg06Points/2, sixTen:   sgPercentage.Button.Sg06Points/4,
					                                       sevenP: sgPercentage.Button.Sg07Points, sevenN:   sgPercentage.Button.Sg07Points/2, sevenTen:   sgPercentage.Button.Sg07Points/4,
					                                       eightP: sgPercentage.Button.Sg08Points, eightN:   sgPercentage.Button.Sg08Points/2, eightTen:   sgPercentage.Button.Sg08Points/4,
					                                       nineP:  sgPercentage.Button.Sg09Points, nineN:   sgPercentage.Button.Sg09Points/2, nineTen:   sgPercentage.Button.Sg09Points/4,
					                                       tenP:   sgPercentage.Button.Sg10Points, tenN:   sgPercentage.Button.Sg10Points/2, tenTen:   sgPercentage.Button.Sg10Points/4},
				        { pos: 19, driver: "Stevens",    oneP:   sgPercentage.Stevens.Sg01Points, oneN:   sgPercentage.Stevens.Sg01Points/2, oneTen:   sgPercentage.Stevens.Sg01Points/4,
					                                       twoP:   sgPercentage.Stevens.Sg02Points, twoN:   sgPercentage.Stevens.Sg02Points/2, twoTen:   sgPercentage.Stevens.Sg02Points/4,
					                                       threeP: sgPercentage.Stevens.Sg03Points, threeN:   sgPercentage.Stevens.Sg03Points/2, threeTen:   sgPercentage.Stevens.Sg03Points/4,
					                                       fourP:  sgPercentage.Stevens.Sg04Points, fourN:   sgPercentage.Stevens.Sg04Points/2, fourTen:   sgPercentage.Stevens.Sg04Points/4,
					                                       fiveP:  sgPercentage.Stevens.Sg05Points, fiveN:   sgPercentage.Stevens.Sg05Points/2, fiveTen:   sgPercentage.Stevens.Sg05Points/4,
					                                       sixP:   sgPercentage.Stevens.Sg06Points, sixN:   sgPercentage.Stevens.Sg06Points/2, sixTen:   sgPercentage.Stevens.Sg06Points/4,
					                                       sevenP: sgPercentage.Stevens.Sg07Points, sevenN:   sgPercentage.Stevens.Sg07Points/2, sevenTen:   sgPercentage.Stevens.Sg07Points/4,
					                                       eightP: sgPercentage.Stevens.Sg08Points, eightN:   sgPercentage.Stevens.Sg08Points/2, eightTen:   sgPercentage.Stevens.Sg08Points/4,
					                                       nineP:  sgPercentage.Stevens.Sg09Points, nineN:   sgPercentage.Stevens.Sg09Points/2, nineTen:   sgPercentage.Stevens.Sg09Points/4,
					                                       tenP:   sgPercentage.Stevens.Sg10Points, tenN:   sgPercentage.Stevens.Sg10Points/2, tenTen:   sgPercentage.Stevens.Sg10Points/4},
				        { pos: 20, driver: "Merhi",      oneP:   sgPercentage.Merhi.Sg01Points, oneN:   sgPercentage.Merhi.Sg01Points/2, oneTen:   sgPercentage.Merhi.Sg01Points/4,
					                                       twoP:   sgPercentage.Merhi.Sg02Points, twoN:   sgPercentage.Merhi.Sg02Points/2, twoTen:   sgPercentage.Merhi.Sg02Points/4,
					                                       threeP: sgPercentage.Merhi.Sg03Points, threeN:   sgPercentage.Merhi.Sg03Points/2, threeTen:   sgPercentage.Merhi.Sg03Points/4,
					                                       fourP:  sgPercentage.Merhi.Sg04Points, fourN:   sgPercentage.Merhi.Sg04Points/2, fourTen:   sgPercentage.Merhi.Sg04Points/4,
					                                       fiveP:  sgPercentage.Merhi.Sg05Points, fiveN:   sgPercentage.Merhi.Sg05Points/2, fiveTen:   sgPercentage.Merhi.Sg05Points/4,
					                                       sixP:   sgPercentage.Merhi.Sg06Points, sixN:   sgPercentage.Merhi.Sg06Points/2, sixTen:   sgPercentage.Merhi.Sg06Points/4,
					                                       sevenP: sgPercentage.Merhi.Sg07Points, sevenN:   sgPercentage.Merhi.Sg07Points/2, sevenTen:   sgPercentage.Merhi.Sg07Points/4,
					                                       eightP: sgPercentage.Merhi.Sg08Points, eightN:   sgPercentage.Merhi.Sg08Points/2, eightTen:   sgPercentage.Merhi.Sg08Points/4,
					                                       nineP:  sgPercentage.Merhi.Sg09Points, nineN:   sgPercentage.Merhi.Sg09Points/2, nineTen:   sgPercentage.Merhi.Sg09Points/4,
					                                       tenP:   sgPercentage.Merhi.Sg10Points, tenN:   sgPercentage.Merhi.Sg10Points/2, tenTen:   sgPercentage.Merhi.Sg10Points/4}
				    ];
			});

})


.controller('raceResultController', function($routeParams, User){ //(how you name the controller to reference to it in the html, how you name the function controller)

		var vm = this; //we know that 'self' always refers to the Constructor
		vm.sortType = 'pos';
		vm.sortReverse = false;

		//get all user data so I can use to make the table data
		User.all()
			.success(function(data) {
				console.log(data);
				vm.users = data;

				//Calculating the picks table
				var allRsPicks = {
					rs01: [],
					rs02: [],
					rs03: [],
					rs04: [],
					rs05: [],
					rs06: [],
					rs07: [],
					rs08: [],
					rs09: [],
					rs10: []
				};
				//push each driver pick into an array for each position in the race result rs01 = race result 01
				for (var i = 0; i <= vm.users.length - 1 ; i++){
					allRsPicks.rs01.push(vm.users[i].picks[0].race_result[0]);
					allRsPicks.rs02.push(vm.users[i].picks[0].race_result[1]);
					allRsPicks.rs03.push(vm.users[i].picks[0].race_result[2]);
					allRsPicks.rs04.push(vm.users[i].picks[0].race_result[3]);
					allRsPicks.rs05.push(vm.users[i].picks[0].race_result[4]);
					allRsPicks.rs06.push(vm.users[i].picks[0].race_result[5]);
					allRsPicks.rs07.push(vm.users[i].picks[0].race_result[6]);
					allRsPicks.rs08.push(vm.users[i].picks[0].race_result[7]);
					allRsPicks.rs09.push(vm.users[i].picks[0].race_result[8]);
					allRsPicks.rs10.push(vm.users[i].picks[0].race_result[9]);
				}
				console.log(allRsPicks);

				console.log(allRsPicks[Object.keys(allRsPicks)[1]]);

				//Create objects to hold how many picks for each driver exist in each race result position
				var counts = {
					Rs01:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Rs02:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Rs03:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Rs04:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Rs05:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Rs06:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Rs07:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Rs08:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Rs09:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Rs10:    { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Total:   { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Percent: { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 },
					Status:  { Hamilton: 0, Rosberg: 0, Vettel: 0, Raikkonen: 0, Massa: 0, Bottas: 0, Kvyat: 0, Ricciardo: 0, Perez: 0, Hulkenberg: 0, Grosjean: 0, Maldonado: 0, Verstappen: 0, Sainz: 0, Ericsson: 0, Nasr: 0, Alonso: 0, Button: 0, Stevens: 0, Merhi: 0 }
				};

				//Adding the number of picks for each driver in each position. Accessed using counts.Rs01[Object.keys(counts.Rs01)[0]]
				var picks = 0; //picks goes from 0 to 9 representing each race result position
				while (picks < 10){
					allRsPicks[Object.keys(allRsPicks)[picks]].forEach(function(x) { counts[Object.keys(counts)[picks]][x] = (counts[Object.keys(counts)[picks]][x] || 0)+1; }); //adds how many picks each driver has for each race result position to the counts object
					picks++;
				}

				console.log(counts.Rs01[Object.keys(counts.Rs01)[0]]); //this will show the number of picks that Hamilton has at Rs01
				console.log(counts[Object.keys(counts)[1]][Object.keys(counts[Object.keys(counts)[1]])[19]]);//This will show  Rs02 and Merhi. First number goes from 0 to 9 and second goes from 0 to 19

				//Total picks for each driver
				var rs = 0;
				var dr = 0;
				while (dr < 20){
					while (rs < 10){
						counts[Object.keys(counts)[10]][Object.keys(counts[Object.keys(counts)[10]])[dr]] = counts[Object.keys(counts)[10]][Object.keys(counts[Object.keys(counts)[10]])[dr]] + counts[Object.keys(counts)[rs]][Object.keys(counts[Object.keys(counts)[rs]])[dr]];
						rs++;
					}
					rs = 0;
					dr++;
				}

				//Percentage, based on how many players picked each specific driver in any of the 10 race result positions.
				dr = 0; //resetting the Drivers variable
				while (dr < 20){
					counts[Object.keys(counts)[11]][Object.keys(counts[Object.keys(counts)[11]])[dr]] = Math.round((counts[Object.keys(counts)[10]][Object.keys(counts[Object.keys(counts)[10]])[dr]]/vm.users.length)*100);
					dr++;
				}

				//Driver Status
				dr = 0; //resetting the Driver variable
				while (dr < 20){
					if(counts[Object.keys(counts)[11]][Object.keys(counts[Object.keys(counts)[11]])[dr]] >= 85){
						counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] = "Favorite";
					} else if (counts[Object.keys(counts)[11]][Object.keys(counts[Object.keys(counts)[11]])[dr]] >= 50){
						counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] = "Very Likely";
					} else if (counts[Object.keys(counts)[11]][Object.keys(counts[Object.keys(counts)[11]])[dr]] >= 15){
						counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] = "Less Likely";
					} else {counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] = "Underdog";
					}
					dr++;
				}

				//prepopulate a list of drivers
				vm.drivers = [
				    { pos: 1, driver: "Hamilton",    one: counts.Rs01.Hamilton || 0,   two: counts.Rs02.Hamilton || 0,   three: counts.Rs03.Hamilton || 0,   four: counts.Rs04.Hamilton || 0,   five: counts.Rs05.Hamilton || 0,   six: counts.Rs06.Hamilton || 0,   seven: counts.Rs07.Hamilton || 0,   eight: counts.Rs08.Hamilton || 0,   nine: counts.Rs09.Hamilton || 0,   ten: counts.Rs10.Hamilton || 0,   total: counts.Total.Hamilton,   percent: counts.Percent.Hamilton,   status: counts.Status.Hamilton},
				    { pos: 2, driver: "Rosberg",     one: counts.Rs01.Rosberg || 0,    two: counts.Rs02.Rosberg || 0,    three: counts.Rs03.Rosberg || 0,    four: counts.Rs04.Rosberg || 0,    five: counts.Rs05.Rosberg || 0,    six: counts.Rs06.Rosberg || 0,    seven: counts.Rs07.Rosberg || 0,    eight: counts.Rs08.Rosberg || 0,    nine: counts.Rs09.Rosberg || 0,    ten: counts.Rs10.Rosberg || 0,    total: counts.Total.Rosberg,    percent: counts.Percent.Rosberg,    status: counts.Status.Rosberg},
				    { pos: 3, driver: "Vettel",      one: counts.Rs01.Vettel || 0,     two: counts.Rs02.Vettel || 0,     three: counts.Rs03.Vettel || 0,     four: counts.Rs04.Vettel || 0,     five: counts.Rs05.Vettel || 0,     six: counts.Rs06.Vettel || 0,     seven: counts.Rs07.Vettel || 0,     eight: counts.Rs08.Vettel || 0,     nine: counts.Rs09.Vettel || 0,     ten: counts.Rs10.Vettel || 0,     total: counts.Total.Vettel,     percent: counts.Percent.Vettel,     status: counts.Status.Vettel},
				    { pos: 4, driver: "Raikkonen",   one: counts.Rs01.Raikkonen || 0,  two: counts.Rs02.Raikkonen || 0,  three: counts.Rs03.Raikkonen || 0,  four: counts.Rs04.Raikkonen || 0,  five: counts.Rs05.Raikkonen || 0,  six: counts.Rs06.Raikkonen || 0,  seven: counts.Rs07.Raikkonen || 0,  eight: counts.Rs08.Raikkonen || 0,  nine: counts.Rs09.Raikkonen || 0,  ten: counts.Rs10.Raikkonen || 0,  total: counts.Total.Raikkonen,  percent: counts.Percent.Raikkonen,  status: counts.Status.Raikkonen},
				    { pos: 5, driver: "Massa",       one: counts.Rs01.Massa || 0,      two: counts.Rs02.Massa || 0,      three: counts.Rs03.Massa || 0,      four: counts.Rs04.Massa || 0,      five: counts.Rs05.Massa || 0,      six: counts.Rs06.Massa || 0,      seven: counts.Rs07.Massa || 0,      eight: counts.Rs08.Massa || 0,      nine: counts.Rs09.Massa || 0,      ten: counts.Rs10.Massa || 0,      total: counts.Total.Massa,      percent: counts.Percent.Massa,      status: counts.Status.Massa},
				    { pos: 6, driver: "Bottas",      one: counts.Rs01.Bottas || 0,     two: counts.Rs02.Bottas || 0,     three: counts.Rs03.Bottas || 0,     four: counts.Rs04.Bottas || 0,     five: counts.Rs05.Bottas || 0,     six: counts.Rs06.Bottas || 0,     seven: counts.Rs07.Bottas || 0,     eight: counts.Rs08.Bottas || 0,     nine: counts.Rs09.Bottas || 0,     ten: counts.Rs10.Bottas || 0,     total: counts.Total.Bottas,     percent: counts.Percent.Bottas,     status: counts.Status.Bottas},
				    { pos: 7, driver: "Kvyat",       one: counts.Rs01.Kvyat || 0,      two: counts.Rs02.Kvyat || 0,      three: counts.Rs03.Kvyat || 0,      four: counts.Rs04.Kvyat || 0,      five: counts.Rs05.Kvyat || 0,      six: counts.Rs06.Kvyat || 0,      seven: counts.Rs07.Kvyat || 0,      eight: counts.Rs08.Kvyat || 0,      nine: counts.Rs09.Kvyat || 0,      ten: counts.Rs10.Kvyat || 0,      total: counts.Total.Kvyat,      percent: counts.Percent.Kvyat,      status: counts.Status.Kvyat},
				    { pos: 8, driver: "Ricciardo",   one: counts.Rs01.Ricciardo || 0,  two: counts.Rs02.Ricciardo || 0,  three: counts.Rs03.Ricciardo || 0,  four: counts.Rs04.Ricciardo || 0,  five: counts.Rs05.Ricciardo || 0,  six: counts.Rs06.Ricciardo || 0,  seven: counts.Rs07.Ricciardo || 0,  eight: counts.Rs08.Ricciardo || 0,  nine: counts.Rs09.Ricciardo || 0,  ten: counts.Rs10.Ricciardo || 0,  total: counts.Total.Ricciardo,  percent: counts.Percent.Ricciardo,  status: counts.Status.Ricciardo},
				    { pos: 9, driver: "Perez",       one: counts.Rs01.Perez || 0,      two: counts.Rs02.Perez || 0,      three: counts.Rs03.Perez || 0,      four: counts.Rs04.Perez || 0,      five: counts.Rs05.Perez || 0,      six: counts.Rs06.Perez || 0,      seven: counts.Rs07.Perez || 0,      eight: counts.Rs08.Perez || 0,      nine: counts.Rs09.Perez || 0,      ten: counts.Rs10.Perez || 0,      total: counts.Total.Perez,      percent: counts.Percent.Perez,      status: counts.Status.Perez},
				    { pos: 10, driver: "Hulkenberg", one: counts.Rs01.Hulkenberg || 0, two: counts.Rs02.Hulkenberg || 0, three: counts.Rs03.Hulkenberg || 0, four: counts.Rs04.Hulkenberg || 0, five: counts.Rs05.Hulkenberg || 0, six: counts.Rs06.Hulkenberg || 0, seven: counts.Rs07.Hulkenberg || 0, eight: counts.Rs08.Hulkenberg || 0, nine: counts.Rs09.Hulkenberg || 0, ten: counts.Rs10.Hulkenberg || 0, total: counts.Total.Hulkenberg, percent: counts.Percent.Hulkenberg, status: counts.Status.Hulkenberg},
				    { pos: 11, driver: "Grosjean",   one: counts.Rs01.Grosjean || 0,   two: counts.Rs02.Grosjean || 0,   three: counts.Rs03.Grosjean || 0,   four: counts.Rs04.Grosjean || 0,   five: counts.Rs05.Grosjean || 0,   six: counts.Rs06.Grosjean || 0,   seven: counts.Rs07.Grosjean || 0,   eight: counts.Rs08.Grosjean || 0,   nine: counts.Rs09.Grosjean || 0,   ten: counts.Rs10.Grosjean || 0,   total: counts.Total.Grosjean,   percent: counts.Percent.Grosjean,   status: counts.Status.Grosjean},
				    { pos: 12, driver: "Maldonado",  one: counts.Rs01.Maldonado || 0,  two: counts.Rs02.Maldonado || 0,  three: counts.Rs03.Maldonado || 0,  four: counts.Rs04.Maldonado || 0,  five: counts.Rs05.Maldonado || 0,  six: counts.Rs06.Maldonado || 0,  seven: counts.Rs07.Maldonado || 0,  eight: counts.Rs08.Maldonado || 0,  nine: counts.Rs09.Maldonado || 0,  ten: counts.Rs10.Maldonado || 0,  total: counts.Total.Maldonado,  percent: counts.Percent.Maldonado,  status: counts.Status.Maldonado},
				    { pos: 13, driver: "Verstappen", one: counts.Rs01.Verstappen || 0, two: counts.Rs02.Verstappen || 0, three: counts.Rs03.Verstappen || 0, four: counts.Rs04.Verstappen || 0, five: counts.Rs05.Verstappen || 0, six: counts.Rs06.Verstappen || 0, seven: counts.Rs07.Verstappen || 0, eight: counts.Rs08.Verstappen || 0, nine: counts.Rs09.Verstappen || 0, ten: counts.Rs10.Verstappen || 0, total: counts.Total.Verstappen, percent: counts.Percent.Verstappen, status: counts.Status.Verstappen},
				    { pos: 14, driver: "Sainz",      one: counts.Rs01.Sainz || 0,      two: counts.Rs02.Sainz || 0,      three: counts.Rs03.Sainz || 0,      four: counts.Rs04.Sainz || 0,      five: counts.Rs05.Sainz || 0,      six: counts.Rs06.Sainz || 0,      seven: counts.Rs07.Sainz || 0,      eight: counts.Rs08.Sainz || 0,      nine: counts.Rs09.Sainz || 0,      ten: counts.Rs10.Sainz || 0,      total: counts.Total.Sainz,      percent: counts.Percent.Sainz,      status: counts.Status.Sainz},
				    { pos: 15, driver: "Ericsson",   one: counts.Rs01.Ericsson || 0,   two: counts.Rs02.Ericsson || 0,   three: counts.Rs03.Ericsson || 0,   four: counts.Rs04.Ericsson || 0,   five: counts.Rs05.Ericsson || 0,   six: counts.Rs06.Ericsson || 0,   seven: counts.Rs07.Ericsson || 0,   eight: counts.Rs08.Ericsson || 0,   nine: counts.Rs09.Ericsson || 0,   ten: counts.Rs10.Ericsson || 0,   total: counts.Total.Ericsson,   percent: counts.Percent.Ericsson,   status: counts.Status.Ericsson},
				    { pos: 16, driver: "Nasr",       one: counts.Rs01.Nasr || 0,       two: counts.Rs02.Nasr || 0,       three: counts.Rs03.Nasr || 0,       four: counts.Rs04.Nasr || 0,       five: counts.Rs05.Nasr || 0,       six: counts.Rs06.Nasr || 0,       seven: counts.Rs07.Nasr || 0,       eight: counts.Rs08.Nasr || 0,       nine: counts.Rs09.Nasr || 0,       ten: counts.Rs10.Nasr || 0,       total: counts.Total.Nasr,       percent: counts.Percent.Nasr,       status: counts.Status.Nasr},
				    { pos: 17, driver: "Alonso",     one: counts.Rs01.Alonso || 0,     two: counts.Rs02.Alonso || 0,     three: counts.Rs03.Alonso || 0,     four: counts.Rs04.Alonso || 0,     five: counts.Rs05.Alonso || 0,     six: counts.Rs06.Alonso || 0,     seven: counts.Rs07.Alonso || 0,     eight: counts.Rs08.Alonso || 0,     nine: counts.Rs09.Alonso || 0,     ten: counts.Rs10.Alonso || 0,     total: counts.Total.Alonso,     percent: counts.Percent.Alonso,     status: counts.Status.Alonso},
				    { pos: 18, driver: "Button",     one: counts.Rs01.Button || 0,     two: counts.Rs02.Button || 0,     three: counts.Rs03.Button || 0,     four: counts.Rs04.Button || 0,     five: counts.Rs05.Button || 0,     six: counts.Rs06.Button || 0,     seven: counts.Rs07.Button || 0,     eight: counts.Rs08.Button || 0,     nine: counts.Rs09.Button || 0,     ten: counts.Rs10.Button || 0,     total: counts.Total.Button,     percent: counts.Percent.Button,     status: counts.Status.Button},
				    { pos: 19, driver: "Stevens",    one: counts.Rs01.Stevens || 0,    two: counts.Rs02.Stevens || 0,    three: counts.Rs03.Stevens || 0,    four: counts.Rs04.Stevens || 0,    five: counts.Rs05.Stevens || 0,    six: counts.Rs06.Stevens || 0,    seven: counts.Rs07.Stevens || 0,    eight: counts.Rs08.Stevens || 0,    nine: counts.Rs09.Stevens || 0,    ten: counts.Rs10.Stevens || 0,    total: counts.Total.Stevens,    percent: counts.Percent.Stevens,    status: counts.Status.Stevens},
				    { pos: 20, driver: "Merhi",      one: counts.Rs01.Merhi || 0,      two: counts.Rs02.Merhi || 0,      three: counts.Rs03.Merhi || 0,      four: counts.Rs04.Merhi || 0,      five: counts.Rs05.Merhi || 0,      six: counts.Rs06.Merhi || 0,      seven: counts.Rs07.Merhi || 0,      eight: counts.Rs08.Merhi || 0,      nine: counts.Rs09.Merhi || 0,      ten: counts.Rs10.Merhi || 0,      total: counts.Total.Merhi,      percent: counts.Percent.Merhi,      status: counts.Status.Merhi}
				];

				//==========================
				//POINTS table
				//==========================
				    vm.sortType = 'pos';
				    vm.sortReverse = false;

						// creating an object to hold all the values we need for each driver and picks tocalculate the points table.
						var rsPercentage = {
							Hamilton:   { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Rosberg:    { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Vettel:     { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Raikkonen:  { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Massa:      { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Bottas:     { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Kvyat:      { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Ricciardo:  { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Perez:      { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Hulkenberg: { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Grosjean:   { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Maldonado:  { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Verstappen: { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Sainz:      { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Ericsson:   { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Nasr:       { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Alonso:     { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Button:     { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Stevens:    { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0},
							Merhi:      { Rs01Percent:    0, Rs02Percent:    0, Rs03Percent:    0, Rs04Percent:    0, Rs05Percent:    0, Rs06Percent:    0, Rs07Percent:    0, Rs08Percent:    0, Rs09Percent:    0, Rs10Percent:    0,
							 							Rs01PickStatus: 0, Rs02PickStatus: 0, Rs03PickStatus: 0, Rs04PickStatus: 0, Rs05PickStatus: 0, Rs06PickStatus: 0, Rs07PickStatus: 0, Rs08PickStatus: 0, Rs09PickStatus: 0, Rs10PickStatus: 0,
							 							Rs01Points:     0, Rs02Points:     0, Rs03Points:     0, Rs04Points:     0, Rs05Points:     0, Rs06Points:     0, Rs07Points:     0, Rs08Points:     0, Rs09Points:     0, Rs10Points:     0}
						};

						//var dr goes from 0 to 19 and represents the driver name, which is a key in the rsPercentage object
						//var gp goes from 0 to 9 and represents the race result position, which is a key in the rsPercentage object
						//the while formula bellow gets very complicated, so this is a breakdown to remember what it is doing.
						//The first part will get the driver name "dr" and all his race result positions "gr". "dr" goes from 0 to 19 to pick all 20 drivers and "rs" goes from 0 to 9 to pick all 10 positions.
						console.log(rsPercentage[Object.keys(rsPercentage)[5]][Object.keys(rsPercentage[Object.keys(rsPercentage)[5]])[3]]); //This will get driver 5 which is Bottas and Rs04.
						//The second part with Math.round finds the race result position "rs" from 0 to 9 and the driver name "dr" from 0 to 19 and divides it by the number of users to get a percentage.
						console.log(counts[Object.keys(counts)[1]][Object.keys(counts[Object.keys(counts)[1]])[19]]);//This will get Rs02 and Merhi. First number goes from 0 to 9 and second goes from 0 to 19

        //======================================================

						//Percentage of picks per specific race result position
						dr = 0; //resetting it. stands for driver name and it goes from 0 to 19
						rs = 0; //resetting it. stands for race result position and it goes from 0 to 9. declared a while ago.
						while (dr < 20) {
							while (rs < 10){
								rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[rs]] = Math.round((counts[Object.keys(counts)[rs]][Object.keys(counts[Object.keys(counts)[rs]])[dr]]/vm.users.length)*100) || 0;
								rs++;
							}
							rs = 0;
							dr++;
						}

						console.log(rsPercentage);

        //======================================================

						//Driver Pick Status
						dr = 0;
						rs = 0;
						var ps = 10; //ps stands for pick status and it goes from 10 to 19 in the rsPercentage object

						while (dr < 20){
							while (rs < 10){
								if(rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[rs]] === 0){ // Percentage per race result position
									rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] = "Zero"; // Pick Status
								} else if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[rs]] >= 20){
									rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] = "High";
								} else if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[rs]] >= 10){
									rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] = "Medium";
								} else {
									rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] = "Low";
								}
								rs ++;
								ps ++;
							}
							rs = 0;
							ps = 10;
							dr++;
						}

				//======================================================

						//Here are the IF statements to determine the Points "paid" by each driver in each position

						dr = 0; //resetting the Drivers variable
						ps = 10; //resetting the Pick Status variable. Starts at 10.
						var pts = 20; //Points variable starts at position 20 in the Object

						while (dr < 20){
							while (ps < 20){
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "Zero") {
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 0;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "High" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Favorite"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 4;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "High" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Very Likely"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 8;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "High" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Less Likely"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 12;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "High" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Underdog"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 16;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "Medium" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Favorite"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 6;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "Medium" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Very Likely"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 10;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "Medium" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Less Likely"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 14;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "Medium" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Underdog"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 18;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "Low" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Favorite"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 8;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "Low" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Very Likely"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 12;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "Low" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Less Likely"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 16;
										}
								if (rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[ps]] === "Low" &&
								    counts[Object.keys(counts)[12]][Object.keys(counts[Object.keys(counts)[12]])[dr]] === "Underdog"){
											rsPercentage[Object.keys(rsPercentage)[dr]][Object.keys(rsPercentage[Object.keys(rsPercentage)[dr]])[pts]] = 20;
										}
								ps++;
								pts++;
							}
							ps = 10; //resetting for next driver
							pts = 20; //resetting for next driver
							dr++;
						}

				    //prepopulate a list of drivers
				    vm.driversPoints = [
				        { pos: 1, driver: "Hamilton",    oneP:   rsPercentage.Hamilton.Rs01Points, oneN:   rsPercentage.Hamilton.Rs01Points/2, oneTen:   rsPercentage.Hamilton.Rs01Points/4,
					                                       twoP:   rsPercentage.Hamilton.Rs02Points, twoN:   rsPercentage.Hamilton.Rs02Points/2, twoTen:   rsPercentage.Hamilton.Rs02Points/4,
					                                       threeP: rsPercentage.Hamilton.Rs03Points, threeN:   rsPercentage.Hamilton.Rs03Points/2, threeTen:   rsPercentage.Hamilton.Rs03Points/4,
					                                       fourP:  rsPercentage.Hamilton.Rs04Points, fourN:   rsPercentage.Hamilton.Rs04Points/2, fourTen:   rsPercentage.Hamilton.Rs04Points/4,
					                                       fiveP:  rsPercentage.Hamilton.Rs05Points, fiveN:   rsPercentage.Hamilton.Rs05Points/2, fiveTen:   rsPercentage.Hamilton.Rs05Points/4,
					                                       sixP:   rsPercentage.Hamilton.Rs06Points, sixN:   rsPercentage.Hamilton.Rs06Points/2, sixTen:   rsPercentage.Hamilton.Rs06Points/4,
					                                       sevenP: rsPercentage.Hamilton.Rs07Points, sevenN:   rsPercentage.Hamilton.Rs07Points/2, sevenTen:   rsPercentage.Hamilton.Rs07Points/4,
					                                       eightP: rsPercentage.Hamilton.Rs08Points, eightN:   rsPercentage.Hamilton.Rs08Points/2, eightTen:   rsPercentage.Hamilton.Rs08Points/4,
					                                       nineP:  rsPercentage.Hamilton.Rs09Points, nineN:   rsPercentage.Hamilton.Rs09Points/2, nineTen:   rsPercentage.Hamilton.Rs09Points/4,
					                                       tenP:   rsPercentage.Hamilton.Rs10Points, tenN:   rsPercentage.Hamilton.Rs10Points/2, tenTen:   rsPercentage.Hamilton.Rs10Points/4},
				        { pos: 2, driver: "Rosberg",     oneP:   rsPercentage.Rosberg.Rs01Points, oneN:   rsPercentage.Rosberg.Rs01Points/2, oneTen:   rsPercentage.Rosberg.Rs01Points/4,
					                                       twoP:   rsPercentage.Rosberg.Rs02Points, twoN:   rsPercentage.Rosberg.Rs02Points/2, twoTen:   rsPercentage.Rosberg.Rs02Points/4,
					                                       threeP: rsPercentage.Rosberg.Rs03Points, threeN:   rsPercentage.Rosberg.Rs03Points/2, threeTen:   rsPercentage.Rosberg.Rs03Points/4,
					                                       fourP:  rsPercentage.Rosberg.Rs04Points, fourN:   rsPercentage.Rosberg.Rs04Points/2, fourTen:   rsPercentage.Rosberg.Rs04Points/4,
					                                       fiveP:  rsPercentage.Rosberg.Rs05Points, fiveN:   rsPercentage.Rosberg.Rs05Points/2, fiveTen:   rsPercentage.Rosberg.Rs05Points/4,
					                                       sixP:   rsPercentage.Rosberg.Rs06Points, sixN:   rsPercentage.Rosberg.Rs06Points/2, sixTen:   rsPercentage.Rosberg.Rs06Points/4,
					                                       sevenP: rsPercentage.Rosberg.Rs07Points, sevenN:   rsPercentage.Rosberg.Rs07Points/2, sevenTen:   rsPercentage.Rosberg.Rs07Points/4,
					                                       eightP: rsPercentage.Rosberg.Rs08Points, eightN:   rsPercentage.Rosberg.Rs08Points/2, eightTen:   rsPercentage.Rosberg.Rs08Points/4,
					                                       nineP:  rsPercentage.Rosberg.Rs09Points, nineN:   rsPercentage.Rosberg.Rs09Points/2, nineTen:   rsPercentage.Rosberg.Rs09Points/4,
					                                       tenP:   rsPercentage.Rosberg.Rs10Points, tenN:   rsPercentage.Rosberg.Rs10Points/2, tenTen:   rsPercentage.Rosberg.Rs10Points/4},
				        { pos: 3, driver: "Vettel", 	   oneP:   rsPercentage.Vettel.Rs01Points, oneN:   rsPercentage.Vettel.Rs01Points/2, oneTen:   rsPercentage.Vettel.Rs01Points/4,
					                                       twoP:   rsPercentage.Vettel.Rs02Points, twoN:   rsPercentage.Vettel.Rs02Points/2, twoTen:   rsPercentage.Vettel.Rs02Points/4,
					                                       threeP: rsPercentage.Vettel.Rs03Points, threeN:   rsPercentage.Vettel.Rs03Points/2, threeTen:   rsPercentage.Vettel.Rs03Points/4,
					                                       fourP:  rsPercentage.Vettel.Rs04Points, fourN:   rsPercentage.Vettel.Rs04Points/2, fourTen:   rsPercentage.Vettel.Rs04Points/4,
					                                       fiveP:  rsPercentage.Vettel.Rs05Points, fiveN:   rsPercentage.Vettel.Rs05Points/2, fiveTen:   rsPercentage.Vettel.Rs05Points/4,
					                                       sixP:   rsPercentage.Vettel.Rs06Points, sixN:   rsPercentage.Vettel.Rs06Points/2, sixTen:   rsPercentage.Vettel.Rs06Points/4,
					                                       sevenP: rsPercentage.Vettel.Rs07Points, sevenN:   rsPercentage.Vettel.Rs07Points/2, sevenTen:   rsPercentage.Vettel.Rs07Points/4,
					                                       eightP: rsPercentage.Vettel.Rs08Points, eightN:   rsPercentage.Vettel.Rs08Points/2, eightTen:   rsPercentage.Vettel.Rs08Points/4,
					                                       nineP:  rsPercentage.Vettel.Rs09Points, nineN:   rsPercentage.Vettel.Rs09Points/2, nineTen:   rsPercentage.Vettel.Rs09Points/4,
					                                       tenP:   rsPercentage.Vettel.Rs10Points, tenN:   rsPercentage.Vettel.Rs10Points/2, tenTen:   rsPercentage.Vettel.Rs10Points/4},
				        { pos: 4, driver: "Raikkonen",   oneP:   rsPercentage.Raikkonen.Rs01Points, oneN:   rsPercentage.Raikkonen.Rs01Points/2, oneTen:   rsPercentage.Raikkonen.Rs01Points/4,
					                                       twoP:   rsPercentage.Raikkonen.Rs02Points, twoN:   rsPercentage.Raikkonen.Rs02Points/2, twoTen:   rsPercentage.Raikkonen.Rs02Points/4,
					                                       threeP: rsPercentage.Raikkonen.Rs03Points, threeN:   rsPercentage.Raikkonen.Rs03Points/2, threeTen:   rsPercentage.Raikkonen.Rs03Points/4,
					                                       fourP:  rsPercentage.Raikkonen.Rs04Points, fourN:   rsPercentage.Raikkonen.Rs04Points/2, fourTen:   rsPercentage.Raikkonen.Rs04Points/4,
					                                       fiveP:  rsPercentage.Raikkonen.Rs05Points, fiveN:   rsPercentage.Raikkonen.Rs05Points/2, fiveTen:   rsPercentage.Raikkonen.Rs05Points/4,
					                                       sixP:   rsPercentage.Raikkonen.Rs06Points, sixN:   rsPercentage.Raikkonen.Rs06Points/2, sixTen:   rsPercentage.Raikkonen.Rs06Points/4,
					                                       sevenP: rsPercentage.Raikkonen.Rs07Points, sevenN:   rsPercentage.Raikkonen.Rs07Points/2, sevenTen:   rsPercentage.Raikkonen.Rs07Points/4,
					                                       eightP: rsPercentage.Raikkonen.Rs08Points, eightN:   rsPercentage.Raikkonen.Rs08Points/2, eightTen:   rsPercentage.Raikkonen.Rs08Points/4,
					                                       nineP:  rsPercentage.Raikkonen.Rs09Points, nineN:   rsPercentage.Raikkonen.Rs09Points/2, nineTen:   rsPercentage.Raikkonen.Rs09Points/4,
					                                       tenP:   rsPercentage.Raikkonen.Rs10Points, tenN:   rsPercentage.Raikkonen.Rs10Points/2, tenTen:   rsPercentage.Raikkonen.Rs10Points/4},
				        { pos: 5, driver: "Massa",       oneP:   rsPercentage.Massa.Rs01Points, oneN:   rsPercentage.Massa.Rs01Points/2, oneTen:   rsPercentage.Massa.Rs01Points/4,
					                                       twoP:   rsPercentage.Massa.Rs02Points, twoN:   rsPercentage.Massa.Rs02Points/2, twoTen:   rsPercentage.Massa.Rs02Points/4,
					                                       threeP: rsPercentage.Massa.Rs03Points, threeN:   rsPercentage.Massa.Rs03Points/2, threeTen:   rsPercentage.Massa.Rs03Points/4,
					                                       fourP:  rsPercentage.Massa.Rs04Points, fourN:   rsPercentage.Massa.Rs04Points/2, fourTen:   rsPercentage.Massa.Rs04Points/4,
					                                       fiveP:  rsPercentage.Massa.Rs05Points, fiveN:   rsPercentage.Massa.Rs05Points/2, fiveTen:   rsPercentage.Massa.Rs05Points/4,
					                                       sixP:   rsPercentage.Massa.Rs06Points, sixN:   rsPercentage.Massa.Rs06Points/2, sixTen:   rsPercentage.Massa.Rs06Points/4,
					                                       sevenP: rsPercentage.Massa.Rs07Points, sevenN:   rsPercentage.Massa.Rs07Points/2, sevenTen:   rsPercentage.Massa.Rs07Points/4,
					                                       eightP: rsPercentage.Massa.Rs08Points, eightN:   rsPercentage.Massa.Rs08Points/2, eightTen:   rsPercentage.Massa.Rs08Points/4,
					                                       nineP:  rsPercentage.Massa.Rs09Points, nineN:   rsPercentage.Massa.Rs09Points/2, nineTen:   rsPercentage.Massa.Rs09Points/4,
					                                       tenP:   rsPercentage.Massa.Rs10Points, tenN:   rsPercentage.Massa.Rs10Points/2, tenTen:   rsPercentage.Massa.Rs10Points/4},
				        { pos: 6, driver: "Bottas",      oneP:   rsPercentage.Bottas.Rs01Points, oneN:   rsPercentage.Bottas.Rs01Points/2, oneTen:   rsPercentage.Bottas.Rs01Points/4,
					                                       twoP:   rsPercentage.Bottas.Rs02Points, twoN:   rsPercentage.Bottas.Rs02Points/2, twoTen:   rsPercentage.Bottas.Rs02Points/4,
					                                       threeP: rsPercentage.Bottas.Rs03Points, threeN:   rsPercentage.Bottas.Rs03Points/2, threeTen:   rsPercentage.Bottas.Rs03Points/4,
					                                       fourP:  rsPercentage.Bottas.Rs04Points, fourN:   rsPercentage.Bottas.Rs04Points/2, fourTen:   rsPercentage.Bottas.Rs04Points/4,
					                                       fiveP:  rsPercentage.Bottas.Rs05Points, fiveN:   rsPercentage.Bottas.Rs05Points/2, fiveTen:   rsPercentage.Bottas.Rs05Points/4,
					                                       sixP:   rsPercentage.Bottas.Rs06Points, sixN:   rsPercentage.Bottas.Rs06Points/2, sixTen:   rsPercentage.Bottas.Rs06Points/4,
					                                       sevenP: rsPercentage.Bottas.Rs07Points, sevenN:   rsPercentage.Bottas.Rs07Points/2, sevenTen:   rsPercentage.Bottas.Rs07Points/4,
					                                       eightP: rsPercentage.Bottas.Rs08Points, eightN:   rsPercentage.Bottas.Rs08Points/2, eightTen:   rsPercentage.Bottas.Rs08Points/4,
					                                       nineP:  rsPercentage.Bottas.Rs09Points, nineN:   rsPercentage.Bottas.Rs09Points/2, nineTen:   rsPercentage.Bottas.Rs09Points/4,
					                                       tenP:   rsPercentage.Bottas.Rs10Points, tenN:   rsPercentage.Bottas.Rs10Points/2, tenTen:   rsPercentage.Bottas.Rs10Points/4},
				        { pos: 7, driver: "Kvyat",       oneP:   rsPercentage.Kvyat.Rs01Points, oneN:   rsPercentage.Kvyat.Rs01Points/2, oneTen:   rsPercentage.Kvyat.Rs01Points/4,
					                                       twoP:   rsPercentage.Kvyat.Rs02Points, twoN:   rsPercentage.Kvyat.Rs02Points/2, twoTen:   rsPercentage.Kvyat.Rs02Points/4,
					                                       threeP: rsPercentage.Kvyat.Rs03Points, threeN:   rsPercentage.Kvyat.Rs03Points/2, threeTen:   rsPercentage.Kvyat.Rs03Points/4,
					                                       fourP:  rsPercentage.Kvyat.Rs04Points, fourN:   rsPercentage.Kvyat.Rs04Points/2, fourTen:   rsPercentage.Kvyat.Rs04Points/4,
					                                       fiveP:  rsPercentage.Kvyat.Rs05Points, fiveN:   rsPercentage.Kvyat.Rs05Points/2, fiveTen:   rsPercentage.Kvyat.Rs05Points/4,
					                                       sixP:   rsPercentage.Kvyat.Rs06Points, sixN:   rsPercentage.Kvyat.Rs06Points/2, sixTen:   rsPercentage.Kvyat.Rs06Points/4,
					                                       sevenP: rsPercentage.Kvyat.Rs07Points, sevenN:   rsPercentage.Kvyat.Rs07Points/2, sevenTen:   rsPercentage.Kvyat.Rs07Points/4,
					                                       eightP: rsPercentage.Kvyat.Rs08Points, eightN:   rsPercentage.Kvyat.Rs08Points/2, eightTen:   rsPercentage.Kvyat.Rs08Points/4,
					                                       nineP:  rsPercentage.Kvyat.Rs09Points, nineN:   rsPercentage.Kvyat.Rs09Points/2, nineTen:   rsPercentage.Kvyat.Rs09Points/4,
					                                       tenP:   rsPercentage.Kvyat.Rs10Points, tenN:   rsPercentage.Kvyat.Rs10Points/2, tenTen:   rsPercentage.Kvyat.Rs10Points/4},
				        { pos: 8, driver: "Ricciardo",   oneP:   rsPercentage.Ricciardo.Rs01Points, oneN:   rsPercentage.Ricciardo.Rs01Points/2, oneTen:   rsPercentage.Ricciardo.Rs01Points/4,
					                                       twoP:   rsPercentage.Ricciardo.Rs02Points, twoN:   rsPercentage.Ricciardo.Rs02Points/2, twoTen:   rsPercentage.Ricciardo.Rs02Points/4,
					                                       threeP: rsPercentage.Ricciardo.Rs03Points, threeN:   rsPercentage.Ricciardo.Rs03Points/2, threeTen:   rsPercentage.Ricciardo.Rs03Points/4,
					                                       fourP:  rsPercentage.Ricciardo.Rs04Points, fourN:   rsPercentage.Ricciardo.Rs04Points/2, fourTen:   rsPercentage.Ricciardo.Rs04Points/4,
					                                       fiveP:  rsPercentage.Ricciardo.Rs05Points, fiveN:   rsPercentage.Ricciardo.Rs05Points/2, fiveTen:   rsPercentage.Ricciardo.Rs05Points/4,
					                                       sixP:   rsPercentage.Ricciardo.Rs06Points, sixN:   rsPercentage.Ricciardo.Rs06Points/2, sixTen:   rsPercentage.Ricciardo.Rs06Points/4,
					                                       sevenP: rsPercentage.Ricciardo.Rs07Points, sevenN:   rsPercentage.Ricciardo.Rs07Points/2, sevenTen:   rsPercentage.Ricciardo.Rs07Points/4,
					                                       eightP: rsPercentage.Ricciardo.Rs08Points, eightN:   rsPercentage.Ricciardo.Rs08Points/2, eightTen:   rsPercentage.Ricciardo.Rs08Points/4,
					                                       nineP:  rsPercentage.Ricciardo.Rs09Points, nineN:   rsPercentage.Ricciardo.Rs09Points/2, nineTen:   rsPercentage.Ricciardo.Rs09Points/4,
					                                       tenP:   rsPercentage.Ricciardo.Rs10Points, tenN:   rsPercentage.Ricciardo.Rs10Points/2, tenTen:   rsPercentage.Ricciardo.Rs10Points/4},
				        { pos: 9, driver: "Perez",     	 oneP:   rsPercentage.Perez.Rs01Points, oneN:   rsPercentage.Perez.Rs01Points/2, oneTen:   rsPercentage.Perez.Rs01Points/4,
					                                       twoP:   rsPercentage.Perez.Rs02Points, twoN:   rsPercentage.Perez.Rs02Points/2, twoTen:   rsPercentage.Perez.Rs02Points/4,
					                                       threeP: rsPercentage.Perez.Rs03Points, threeN:   rsPercentage.Perez.Rs03Points/2, threeTen:   rsPercentage.Perez.Rs03Points/4,
					                                       fourP:  rsPercentage.Perez.Rs04Points, fourN:   rsPercentage.Perez.Rs04Points/2, fourTen:   rsPercentage.Perez.Rs04Points/4,
					                                       fiveP:  rsPercentage.Perez.Rs05Points, fiveN:   rsPercentage.Perez.Rs05Points/2, fiveTen:   rsPercentage.Perez.Rs05Points/4,
					                                       sixP:   rsPercentage.Perez.Rs06Points, sixN:   rsPercentage.Perez.Rs06Points/2, sixTen:   rsPercentage.Perez.Rs06Points/4,
					                                       sevenP: rsPercentage.Perez.Rs07Points, sevenN:   rsPercentage.Perez.Rs07Points/2, sevenTen:   rsPercentage.Perez.Rs07Points/4,
					                                       eightP: rsPercentage.Perez.Rs08Points, eightN:   rsPercentage.Perez.Rs08Points/2, eightTen:   rsPercentage.Perez.Rs08Points/4,
					                                       nineP:  rsPercentage.Perez.Rs09Points, nineN:   rsPercentage.Perez.Rs09Points/2, nineTen:   rsPercentage.Perez.Rs09Points/4,
					                                       tenP:   rsPercentage.Perez.Rs10Points, tenN:   rsPercentage.Perez.Rs10Points/2, tenTen:   rsPercentage.Perez.Rs10Points/4},
				        { pos: 10, driver: "Hulkenberg", oneP:   rsPercentage.Hulkenberg.Rs01Points, oneN:   rsPercentage.Hulkenberg.Rs01Points/2, oneTen:   rsPercentage.Hulkenberg.Rs01Points/4,
					                                       twoP:   rsPercentage.Hulkenberg.Rs02Points, twoN:   rsPercentage.Hulkenberg.Rs02Points/2, twoTen:   rsPercentage.Hulkenberg.Rs02Points/4,
					                                       threeP: rsPercentage.Hulkenberg.Rs03Points, threeN:   rsPercentage.Hulkenberg.Rs03Points/2, threeTen:   rsPercentage.Hulkenberg.Rs03Points/4,
					                                       fourP:  rsPercentage.Hulkenberg.Rs04Points, fourN:   rsPercentage.Hulkenberg.Rs04Points/2, fourTen:   rsPercentage.Hulkenberg.Rs04Points/4,
					                                       fiveP:  rsPercentage.Hulkenberg.Rs05Points, fiveN:   rsPercentage.Hulkenberg.Rs05Points/2, fiveTen:   rsPercentage.Hulkenberg.Rs05Points/4,
					                                       sixP:   rsPercentage.Hulkenberg.Rs06Points, sixN:   rsPercentage.Hulkenberg.Rs06Points/2, sixTen:   rsPercentage.Hulkenberg.Rs06Points/4,
					                                       sevenP: rsPercentage.Hulkenberg.Rs07Points, sevenN:   rsPercentage.Hulkenberg.Rs07Points/2, sevenTen:   rsPercentage.Hulkenberg.Rs07Points/4,
					                                       eightP: rsPercentage.Hulkenberg.Rs08Points, eightN:   rsPercentage.Hulkenberg.Rs08Points/2, eightTen:   rsPercentage.Hulkenberg.Rs08Points/4,
					                                       nineP:  rsPercentage.Hulkenberg.Rs09Points, nineN:   rsPercentage.Hulkenberg.Rs09Points/2, nineTen:   rsPercentage.Hulkenberg.Rs09Points/4,
					                                       tenP:   rsPercentage.Hulkenberg.Rs10Points, tenN:   rsPercentage.Hulkenberg.Rs10Points/2, tenTen:   rsPercentage.Hulkenberg.Rs10Points/4},
				        { pos: 11, driver: "Grosjean",   oneP:   rsPercentage.Grosjean.Rs01Points, oneN:   rsPercentage.Grosjean.Rs01Points/2, oneTen:   rsPercentage.Grosjean.Rs01Points/4,
					                                       twoP:   rsPercentage.Grosjean.Rs02Points, twoN:   rsPercentage.Grosjean.Rs02Points/2, twoTen:   rsPercentage.Grosjean.Rs02Points/4,
					                                       threeP: rsPercentage.Grosjean.Rs03Points, threeN:   rsPercentage.Grosjean.Rs03Points/2, threeTen:   rsPercentage.Grosjean.Rs03Points/4,
					                                       fourP:  rsPercentage.Grosjean.Rs04Points, fourN:   rsPercentage.Grosjean.Rs04Points/2, fourTen:   rsPercentage.Grosjean.Rs04Points/4,
					                                       fiveP:  rsPercentage.Grosjean.Rs05Points, fiveN:   rsPercentage.Grosjean.Rs05Points/2, fiveTen:   rsPercentage.Grosjean.Rs05Points/4,
					                                       sixP:   rsPercentage.Grosjean.Rs06Points, sixN:   rsPercentage.Grosjean.Rs06Points/2, sixTen:   rsPercentage.Grosjean.Rs06Points/4,
					                                       sevenP: rsPercentage.Grosjean.Rs07Points, sevenN:   rsPercentage.Grosjean.Rs07Points/2, sevenTen:   rsPercentage.Grosjean.Rs07Points/4,
					                                       eightP: rsPercentage.Grosjean.Rs08Points, eightN:   rsPercentage.Grosjean.Rs08Points/2, eightTen:   rsPercentage.Grosjean.Rs08Points/4,
					                                       nineP:  rsPercentage.Grosjean.Rs09Points, nineN:   rsPercentage.Grosjean.Rs09Points/2, nineTen:   rsPercentage.Grosjean.Rs09Points/4,
					                                       tenP:   rsPercentage.Grosjean.Rs10Points, tenN:   rsPercentage.Grosjean.Rs10Points/2, tenTen:   rsPercentage.Grosjean.Rs10Points/4},
				        { pos: 12, driver: "Maldonado",  oneP:   rsPercentage.Maldonado.Rs01Points, oneN:   rsPercentage.Maldonado.Rs01Points/2, oneTen:   rsPercentage.Maldonado.Rs01Points/4,
					                                       twoP:   rsPercentage.Maldonado.Rs02Points, twoN:   rsPercentage.Maldonado.Rs02Points/2, twoTen:   rsPercentage.Maldonado.Rs02Points/4,
					                                       threeP: rsPercentage.Maldonado.Rs03Points, threeN:   rsPercentage.Maldonado.Rs03Points/2, threeTen:   rsPercentage.Maldonado.Rs03Points/4,
					                                       fourP:  rsPercentage.Maldonado.Rs04Points, fourN:   rsPercentage.Maldonado.Rs04Points/2, fourTen:   rsPercentage.Maldonado.Rs04Points/4,
					                                       fiveP:  rsPercentage.Maldonado.Rs05Points, fiveN:   rsPercentage.Maldonado.Rs05Points/2, fiveTen:   rsPercentage.Maldonado.Rs05Points/4,
					                                       sixP:   rsPercentage.Maldonado.Rs06Points, sixN:   rsPercentage.Maldonado.Rs06Points/2, sixTen:   rsPercentage.Maldonado.Rs06Points/4,
					                                       sevenP: rsPercentage.Maldonado.Rs07Points, sevenN:   rsPercentage.Maldonado.Rs07Points/2, sevenTen:   rsPercentage.Maldonado.Rs07Points/4,
					                                       eightP: rsPercentage.Maldonado.Rs08Points, eightN:   rsPercentage.Maldonado.Rs08Points/2, eightTen:   rsPercentage.Maldonado.Rs08Points/4,
					                                       nineP:  rsPercentage.Maldonado.Rs09Points, nineN:   rsPercentage.Maldonado.Rs09Points/2, nineTen:   rsPercentage.Maldonado.Rs09Points/4,
					                                       tenP:   rsPercentage.Maldonado.Rs10Points, tenN:   rsPercentage.Maldonado.Rs10Points/2, tenTen:   rsPercentage.Maldonado.Rs10Points/4},
				        { pos: 13, driver: "Verstappen", oneP:   rsPercentage.Verstappen.Rs01Points, oneN:   rsPercentage.Verstappen.Rs01Points/2, oneTen:   rsPercentage.Verstappen.Rs01Points/4,
					                                       twoP:   rsPercentage.Verstappen.Rs02Points, twoN:   rsPercentage.Verstappen.Rs02Points/2, twoTen:   rsPercentage.Verstappen.Rs02Points/4,
					                                       threeP: rsPercentage.Verstappen.Rs03Points, threeN:   rsPercentage.Verstappen.Rs03Points/2, threeTen:   rsPercentage.Verstappen.Rs03Points/4,
					                                       fourP:  rsPercentage.Verstappen.Rs04Points, fourN:   rsPercentage.Verstappen.Rs04Points/2, fourTen:   rsPercentage.Verstappen.Rs04Points/4,
					                                       fiveP:  rsPercentage.Verstappen.Rs05Points, fiveN:   rsPercentage.Verstappen.Rs05Points/2, fiveTen:   rsPercentage.Verstappen.Rs05Points/4,
					                                       sixP:   rsPercentage.Verstappen.Rs06Points, sixN:   rsPercentage.Verstappen.Rs06Points/2, sixTen:   rsPercentage.Verstappen.Rs06Points/4,
					                                       sevenP: rsPercentage.Verstappen.Rs07Points, sevenN:   rsPercentage.Verstappen.Rs07Points/2, sevenTen:   rsPercentage.Verstappen.Rs07Points/4,
					                                       eightP: rsPercentage.Verstappen.Rs08Points, eightN:   rsPercentage.Verstappen.Rs08Points/2, eightTen:   rsPercentage.Verstappen.Rs08Points/4,
					                                       nineP:  rsPercentage.Verstappen.Rs09Points, nineN:   rsPercentage.Verstappen.Rs09Points/2, nineTen:   rsPercentage.Verstappen.Rs09Points/4,
					                                       tenP:   rsPercentage.Verstappen.Rs10Points, tenN:   rsPercentage.Verstappen.Rs10Points/2, tenTen:   rsPercentage.Verstappen.Rs10Points/4},
				        { pos: 14, driver: "Sainz",      oneP:   rsPercentage.Sainz.Rs01Points, oneN:   rsPercentage.Sainz.Rs01Points/2, oneTen:   rsPercentage.Sainz.Rs01Points/4,
					                                       twoP:   rsPercentage.Sainz.Rs02Points, twoN:   rsPercentage.Sainz.Rs02Points/2, twoTen:   rsPercentage.Sainz.Rs02Points/4,
					                                       threeP: rsPercentage.Sainz.Rs03Points, threeN:   rsPercentage.Sainz.Rs03Points/2, threeTen:   rsPercentage.Sainz.Rs03Points/4,
					                                       fourP:  rsPercentage.Sainz.Rs04Points, fourN:   rsPercentage.Sainz.Rs04Points/2, fourTen:   rsPercentage.Sainz.Rs04Points/4,
					                                       fiveP:  rsPercentage.Sainz.Rs05Points, fiveN:   rsPercentage.Sainz.Rs05Points/2, fiveTen:   rsPercentage.Sainz.Rs05Points/4,
					                                       sixP:   rsPercentage.Sainz.Rs06Points, sixN:   rsPercentage.Sainz.Rs06Points/2, sixTen:   rsPercentage.Sainz.Rs06Points/4,
					                                       sevenP: rsPercentage.Sainz.Rs07Points, sevenN:   rsPercentage.Sainz.Rs07Points/2, sevenTen:   rsPercentage.Sainz.Rs07Points/4,
					                                       eightP: rsPercentage.Sainz.Rs08Points, eightN:   rsPercentage.Sainz.Rs08Points/2, eightTen:   rsPercentage.Sainz.Rs08Points/4,
					                                       nineP:  rsPercentage.Sainz.Rs09Points, nineN:   rsPercentage.Sainz.Rs09Points/2, nineTen:   rsPercentage.Sainz.Rs09Points/4,
					                                       tenP:   rsPercentage.Sainz.Rs10Points, tenN:   rsPercentage.Sainz.Rs10Points/2, tenTen:   rsPercentage.Sainz.Rs10Points/4},
				        { pos: 15, driver: "Ericsson",   oneP:   rsPercentage.Ericsson.Rs01Points, oneN:   rsPercentage.Ericsson.Rs01Points/2, oneTen:   rsPercentage.Ericsson.Rs01Points/4,
					                                       twoP:   rsPercentage.Ericsson.Rs02Points, twoN:   rsPercentage.Ericsson.Rs02Points/2, twoTen:   rsPercentage.Ericsson.Rs02Points/4,
					                                       threeP: rsPercentage.Ericsson.Rs03Points, threeN:   rsPercentage.Ericsson.Rs03Points/2, threeTen:   rsPercentage.Ericsson.Rs03Points/4,
					                                       fourP:  rsPercentage.Ericsson.Rs04Points, fourN:   rsPercentage.Ericsson.Rs04Points/2, fourTen:   rsPercentage.Ericsson.Rs04Points/4,
					                                       fiveP:  rsPercentage.Ericsson.Rs05Points, fiveN:   rsPercentage.Ericsson.Rs05Points/2, fiveTen:   rsPercentage.Ericsson.Rs05Points/4,
					                                       sixP:   rsPercentage.Ericsson.Rs06Points, sixN:   rsPercentage.Ericsson.Rs06Points/2, sixTen:   rsPercentage.Ericsson.Rs06Points/4,
					                                       sevenP: rsPercentage.Ericsson.Rs07Points, sevenN:   rsPercentage.Ericsson.Rs07Points/2, sevenTen:   rsPercentage.Ericsson.Rs07Points/4,
					                                       eightP: rsPercentage.Ericsson.Rs08Points, eightN:   rsPercentage.Ericsson.Rs08Points/2, eightTen:   rsPercentage.Ericsson.Rs08Points/4,
					                                       nineP:  rsPercentage.Ericsson.Rs09Points, nineN:   rsPercentage.Ericsson.Rs09Points/2, nineTen:   rsPercentage.Ericsson.Rs09Points/4,
					                                       tenP:   rsPercentage.Ericsson.Rs10Points, tenN:   rsPercentage.Ericsson.Rs10Points/2, tenTen:   rsPercentage.Ericsson.Rs10Points/4},
				        { pos: 16, driver: "Nasr",       oneP:   rsPercentage.Nasr.Rs01Points, oneN:   rsPercentage.Nasr.Rs01Points/2, oneTen:   rsPercentage.Nasr.Rs01Points/4,
					                                       twoP:   rsPercentage.Nasr.Rs02Points, twoN:   rsPercentage.Nasr.Rs02Points/2, twoTen:   rsPercentage.Nasr.Rs02Points/4,
					                                       threeP: rsPercentage.Nasr.Rs03Points, threeN:   rsPercentage.Nasr.Rs03Points/2, threeTen:   rsPercentage.Nasr.Rs03Points/4,
					                                       fourP:  rsPercentage.Nasr.Rs04Points, fourN:   rsPercentage.Nasr.Rs04Points/2, fourTen:   rsPercentage.Nasr.Rs04Points/4,
					                                       fiveP:  rsPercentage.Nasr.Rs05Points, fiveN:   rsPercentage.Nasr.Rs05Points/2, fiveTen:   rsPercentage.Nasr.Rs05Points/4,
					                                       sixP:   rsPercentage.Nasr.Rs06Points, sixN:   rsPercentage.Nasr.Rs06Points/2, sixTen:   rsPercentage.Nasr.Rs06Points/4,
					                                       sevenP: rsPercentage.Nasr.Rs07Points, sevenN:   rsPercentage.Nasr.Rs07Points/2, sevenTen:   rsPercentage.Nasr.Rs07Points/4,
					                                       eightP: rsPercentage.Nasr.Rs08Points, eightN:   rsPercentage.Nasr.Rs08Points/2, eightTen:   rsPercentage.Nasr.Rs08Points/4,
					                                       nineP:  rsPercentage.Nasr.Rs09Points, nineN:   rsPercentage.Nasr.Rs09Points/2, nineTen:   rsPercentage.Nasr.Rs09Points/4,
					                                       tenP:   rsPercentage.Nasr.Rs10Points, tenN:   rsPercentage.Nasr.Rs10Points/2, tenTen:   rsPercentage.Nasr.Rs10Points/4},
				        { pos: 17, driver: "Alonso",   	 oneP:   rsPercentage.Alonso.Rs01Points, oneN:   rsPercentage.Alonso.Rs01Points/2, oneTen:   rsPercentage.Alonso.Rs01Points/4,
					                                       twoP:   rsPercentage.Alonso.Rs02Points, twoN:   rsPercentage.Alonso.Rs02Points/2, twoTen:   rsPercentage.Alonso.Rs02Points/4,
					                                       threeP: rsPercentage.Alonso.Rs03Points, threeN:   rsPercentage.Alonso.Rs03Points/2, threeTen:   rsPercentage.Alonso.Rs03Points/4,
					                                       fourP:  rsPercentage.Alonso.Rs04Points, fourN:   rsPercentage.Alonso.Rs04Points/2, fourTen:   rsPercentage.Alonso.Rs04Points/4,
					                                       fiveP:  rsPercentage.Alonso.Rs05Points, fiveN:   rsPercentage.Alonso.Rs05Points/2, fiveTen:   rsPercentage.Alonso.Rs05Points/4,
					                                       sixP:   rsPercentage.Alonso.Rs06Points, sixN:   rsPercentage.Alonso.Rs06Points/2, sixTen:   rsPercentage.Alonso.Rs06Points/4,
					                                       sevenP: rsPercentage.Alonso.Rs07Points, sevenN:   rsPercentage.Alonso.Rs07Points/2, sevenTen:   rsPercentage.Alonso.Rs07Points/4,
					                                       eightP: rsPercentage.Alonso.Rs08Points, eightN:   rsPercentage.Alonso.Rs08Points/2, eightTen:   rsPercentage.Alonso.Rs08Points/4,
					                                       nineP:  rsPercentage.Alonso.Rs09Points, nineN:   rsPercentage.Alonso.Rs09Points/2, nineTen:   rsPercentage.Alonso.Rs09Points/4,
					                                       tenP:   rsPercentage.Alonso.Rs10Points, tenN:   rsPercentage.Alonso.Rs10Points/2, tenTen:   rsPercentage.Alonso.Rs10Points/4},
				        { pos: 18, driver: "Button",   	 oneP:   rsPercentage.Button.Rs01Points, oneN:   rsPercentage.Button.Rs01Points/2, oneTen:   rsPercentage.Button.Rs01Points/4,
					                                       twoP:   rsPercentage.Button.Rs02Points, twoN:   rsPercentage.Button.Rs02Points/2, twoTen:   rsPercentage.Button.Rs02Points/4,
					                                       threeP: rsPercentage.Button.Rs03Points, threeN:   rsPercentage.Button.Rs03Points/2, threeTen:   rsPercentage.Button.Rs03Points/4,
					                                       fourP:  rsPercentage.Button.Rs04Points, fourN:   rsPercentage.Button.Rs04Points/2, fourTen:   rsPercentage.Button.Rs04Points/4,
					                                       fiveP:  rsPercentage.Button.Rs05Points, fiveN:   rsPercentage.Button.Rs05Points/2, fiveTen:   rsPercentage.Button.Rs05Points/4,
					                                       sixP:   rsPercentage.Button.Rs06Points, sixN:   rsPercentage.Button.Rs06Points/2, sixTen:   rsPercentage.Button.Rs06Points/4,
					                                       sevenP: rsPercentage.Button.Rs07Points, sevenN:   rsPercentage.Button.Rs07Points/2, sevenTen:   rsPercentage.Button.Rs07Points/4,
					                                       eightP: rsPercentage.Button.Rs08Points, eightN:   rsPercentage.Button.Rs08Points/2, eightTen:   rsPercentage.Button.Rs08Points/4,
					                                       nineP:  rsPercentage.Button.Rs09Points, nineN:   rsPercentage.Button.Rs09Points/2, nineTen:   rsPercentage.Button.Rs09Points/4,
					                                       tenP:   rsPercentage.Button.Rs10Points, tenN:   rsPercentage.Button.Rs10Points/2, tenTen:   rsPercentage.Button.Rs10Points/4},
				        { pos: 19, driver: "Stevens",    oneP:   rsPercentage.Stevens.Rs01Points, oneN:   rsPercentage.Stevens.Rs01Points/2, oneTen:   rsPercentage.Stevens.Rs01Points/4,
					                                       twoP:   rsPercentage.Stevens.Rs02Points, twoN:   rsPercentage.Stevens.Rs02Points/2, twoTen:   rsPercentage.Stevens.Rs02Points/4,
					                                       threeP: rsPercentage.Stevens.Rs03Points, threeN:   rsPercentage.Stevens.Rs03Points/2, threeTen:   rsPercentage.Stevens.Rs03Points/4,
					                                       fourP:  rsPercentage.Stevens.Rs04Points, fourN:   rsPercentage.Stevens.Rs04Points/2, fourTen:   rsPercentage.Stevens.Rs04Points/4,
					                                       fiveP:  rsPercentage.Stevens.Rs05Points, fiveN:   rsPercentage.Stevens.Rs05Points/2, fiveTen:   rsPercentage.Stevens.Rs05Points/4,
					                                       sixP:   rsPercentage.Stevens.Rs06Points, sixN:   rsPercentage.Stevens.Rs06Points/2, sixTen:   rsPercentage.Stevens.Rs06Points/4,
					                                       sevenP: rsPercentage.Stevens.Rs07Points, sevenN:   rsPercentage.Stevens.Rs07Points/2, sevenTen:   rsPercentage.Stevens.Rs07Points/4,
					                                       eightP: rsPercentage.Stevens.Rs08Points, eightN:   rsPercentage.Stevens.Rs08Points/2, eightTen:   rsPercentage.Stevens.Rs08Points/4,
					                                       nineP:  rsPercentage.Stevens.Rs09Points, nineN:   rsPercentage.Stevens.Rs09Points/2, nineTen:   rsPercentage.Stevens.Rs09Points/4,
					                                       tenP:   rsPercentage.Stevens.Rs10Points, tenN:   rsPercentage.Stevens.Rs10Points/2, tenTen:   rsPercentage.Stevens.Rs10Points/4},
				        { pos: 20, driver: "Merhi",      oneP:   rsPercentage.Merhi.Rs01Points, oneN:   rsPercentage.Merhi.Rs01Points/2, oneTen:   rsPercentage.Merhi.Rs01Points/4,
					                                       twoP:   rsPercentage.Merhi.Rs02Points, twoN:   rsPercentage.Merhi.Rs02Points/2, twoTen:   rsPercentage.Merhi.Rs02Points/4,
					                                       threeP: rsPercentage.Merhi.Rs03Points, threeN:   rsPercentage.Merhi.Rs03Points/2, threeTen:   rsPercentage.Merhi.Rs03Points/4,
					                                       fourP:  rsPercentage.Merhi.Rs04Points, fourN:   rsPercentage.Merhi.Rs04Points/2, fourTen:   rsPercentage.Merhi.Rs04Points/4,
					                                       fiveP:  rsPercentage.Merhi.Rs05Points, fiveN:   rsPercentage.Merhi.Rs05Points/2, fiveTen:   rsPercentage.Merhi.Rs05Points/4,
					                                       sixP:   rsPercentage.Merhi.Rs06Points, sixN:   rsPercentage.Merhi.Rs06Points/2, sixTen:   rsPercentage.Merhi.Rs06Points/4,
					                                       sevenP: rsPercentage.Merhi.Rs07Points, sevenN:   rsPercentage.Merhi.Rs07Points/2, sevenTen:   rsPercentage.Merhi.Rs07Points/4,
					                                       eightP: rsPercentage.Merhi.Rs08Points, eightN:   rsPercentage.Merhi.Rs08Points/2, eightTen:   rsPercentage.Merhi.Rs08Points/4,
					                                       nineP:  rsPercentage.Merhi.Rs09Points, nineN:   rsPercentage.Merhi.Rs09Points/2, nineTen:   rsPercentage.Merhi.Rs09Points/4,
					                                       tenP:   rsPercentage.Merhi.Rs10Points, tenN:   rsPercentage.Merhi.Rs10Points/2, tenTen:   rsPercentage.Merhi.Rs10Points/4}
				    ];
			});

})



.controller('raceCalendarController', function($routeParams, User){ //(how you name the controller to reference to it in the html, how you name the function controller)

	var vm = this; //we know that 'self' always refers to the Constructor

	//prepopulate a list of races
	vm.races = [
			{ flag: "/assets/img/icons/flags/Australia.png", country: "Australia", track: "Albert Park, Melbourne", dates: "March 15th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Malaysia.png", country: "Malaysia", track: "Sepang, Kuala Lumpur", dates: "March 29th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/China.png", country: "China", track: "Xangai, Xangai", dates: "April 12th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Bahrain.png", country: "Bahrain", track: "Sakhir, Sakhir", dates: "April 19th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Spain.png", country: "Spain", track: "Barcelona, Barcelona", dates: "May 10th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Monaco.png", country: "Monaco", track: "Monte Carlo, Monte Carlo", dates: "May 24th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Canada.png", country: "Canada", track: "Gilles Villeneuve, Montreal", dates: "Jun 07th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Austria.png", country: "Austria", track: "Red Bull Ring, Spielberg", dates: "Jun 21th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/England.png", country: "England", track: "Silverstone, Silverstone", dates: "Jul 05th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Hungary.png", country: "Hungary", track: "Hungaroring", dates: "Jul 26th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Belgium.png", country: "Belgium", track: "Spa-Francorchamps, Stavelot", dates: "August 23rd", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Italy.png", country: "Italy", track: "Monza, Monza", dates: "September 06th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Singapore.png", country: "Singapore", track: "Marina Bay, Singapore", dates: "September 20th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Japan.png", country: "Japan", track: "Suzuka, Suzuka", dates: "September 27th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Russia.png", country: "Russia", track: "Sochi", dates: "October 11th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/USA.png", country: "USA", track: "Circuit of the Americas, Austin", dates: "October 25th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Mexico.png", country: "Mexico", track: "Hermanos Rodriguez, Mexico City", dates: "November 01st", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Brazil.png", country: "Brazil", track: "Interlagos, Sao Paulo", dates: "November 15th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"},
			{ flag: "/assets/img/icons/flags/Emirates.png", country: "Emirates", track: "Yas Marina, Abu Dhabi", dates: "November 29th", gridPicks: "Button", racePicks: "Button", gridResults: "Button", raceResults: "Button"}
	];

});
