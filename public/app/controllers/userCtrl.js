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
// When only the name of the module is passed in,
// the 'module' method returns the specified module.
.controller('startingGridController', function($routeParams, User){ //(how you name the controller to reference to it in the html, how you name the function controller)

		var vm = this; //we know that 'self' always refers to the Constructor
		vm.sortType = 'pos';
		vm.sortReverse = false;

		//get all user data so I can use to make the table data
		User.all()
			.success(function(data) {
				console.log(data);
				vm.users = data;
				var sg01 = [];
				var sg02 = [];
				var sg03 = [];
				var sg04 = [];
				var sg05 = [];
				var sg06 = [];
				var sg07 = [];
				var sg08 = [];
				var sg09 = [];
				var sg10 = [];
				//push each driver pick into an array for each position in the grid sg01 = starting grid 01
				for (var i = 0; i <= vm.users.length - 1 ; i++){
					sg01.push(vm.users[i].picks[0].starting_grid[0]);
					sg02.push(vm.users[i].picks[0].starting_grid[1]);
					sg03.push(vm.users[i].picks[0].starting_grid[2]);
					sg04.push(vm.users[i].picks[0].starting_grid[3]);
					sg05.push(vm.users[i].picks[0].starting_grid[4]);
					sg06.push(vm.users[i].picks[0].starting_grid[5]);
					sg07.push(vm.users[i].picks[0].starting_grid[6]);
					sg08.push(vm.users[i].picks[0].starting_grid[7]);
					sg09.push(vm.users[i].picks[0].starting_grid[8]);
					sg10.push(vm.users[i].picks[0].starting_grid[9]);
				}

				//Create objects to hold how many picks for each driver exist in each grid position
				var countsSg01 = {};
				var countsSg02 = {};
				var countsSg03 = {};
				var countsSg04 = {};
				var countsSg05 = {};
				var countsSg06 = {};
				var countsSg07 = {};
				var countsSg08 = {};
				var countsSg09 = {};
				var countsSg10 = {};
				sg01.forEach(function(x) { countsSg01[x] = (countsSg01[x] || 0)+1; });
				sg02.forEach(function(x) { countsSg02[x] = (countsSg02[x] || 0)+1; });
				sg03.forEach(function(x) { countsSg03[x] = (countsSg03[x] || 0)+1; });
				sg04.forEach(function(x) { countsSg04[x] = (countsSg04[x] || 0)+1; });
				sg05.forEach(function(x) { countsSg05[x] = (countsSg05[x] || 0)+1; });
				sg06.forEach(function(x) { countsSg06[x] = (countsSg06[x] || 0)+1; });
				sg07.forEach(function(x) { countsSg07[x] = (countsSg07[x] || 0)+1; });
				sg08.forEach(function(x) { countsSg08[x] = (countsSg08[x] || 0)+1; });
				sg09.forEach(function(x) { countsSg09[x] = (countsSg09[x] || 0)+1; });
				sg10.forEach(function(x) { countsSg10[x] = (countsSg10[x] || 0)+1; });

				//Total picks for each driver
				var hamiltonTotal = (countsSg01.Hamilton || 0) + (countsSg02.Hamilton || 0) + (countsSg03.Hamilton || 0) + (countsSg04.Hamilton || 0) + (countsSg05.Hamilton || 0) + (countsSg06.Hamilton || 0) + (countsSg07.Hamilton || 0) + (countsSg08.Hamilton || 0) + (countsSg09.Hamilton || 0) + (countsSg10.Hamilton || 0);
				//Percentage
				var hamiltonPercent = Math.round((hamiltonTotal/vm.users.length)*100);
				//Driver Status
				var hamiltonStatus = "";
				if(hamiltonPercent >= 85){ hamiltonStatus = "Favorite";} else if (hamiltonPercent >= 50){ hamiltonStatus = "Very Likely";} else if (hamiltonPercent >= 15){ hamiltonStatus = "Less Likely";} else { hamiltonStatus = "Underdog";}

				var rosbergTotal = (countsSg01.Rosberg || 0) + (countsSg02.Rosberg || 0) + (countsSg03.Rosberg || 0) + (countsSg04.Rosberg || 0) + (countsSg05.Rosberg || 0) + (countsSg06.Rosberg || 0) + (countsSg07.Rosberg || 0) + (countsSg08.Rosberg || 0) + (countsSg09.Rosberg || 0) + (countsSg10.Rosberg || 0);
				var rosbergPercent = Math.round((rosbergTotal/vm.users.length)*100);
				var rosbergStatus = "";
				if(rosbergPercent >= 85){ rosbergStatus = "Favorite";} else if (rosbergPercent >= 50){ rosbergStatus = "Very Likely";} else if (rosbergPercent >= 15){ rosbergStatus = "Less Likely";} else { rosbergStatus = "Underdog";}

				var vettelTotal = (countsSg01.Vettel || 0) + (countsSg02.Vettel || 0) + (countsSg03.Vettel || 0) + (countsSg04.Vettel || 0) + (countsSg05.Vettel || 0) + (countsSg06.Vettel || 0) + (countsSg07.Vettel || 0) + (countsSg08.Vettel || 0) + (countsSg09.Vettel || 0) + (countsSg10.Vettel || 0);
				var vettelPercent = Math.round((vettelTotal/vm.users.length)*100);
				var vettelStatus = "";
				if(vettelPercent >= 85){ vettelStatus = "Favorite";} else if (vettelPercent >= 50){ vettelStatus = "Very Likely";} else if (vettelPercent >= 15){ vettelStatus = "Less Likely";} else { vettelStatus = "Underdog";}

				var raikkonenTotal = (countsSg01.Raikkonen || 0) + (countsSg02.Raikkonen || 0) + (countsSg03.Raikkonen || 0) + (countsSg04.Raikkonen || 0) + (countsSg05.Raikkonen || 0) + (countsSg06.Raikkonen || 0) + (countsSg07.Raikkonen || 0) + (countsSg08.Raikkonen || 0) + (countsSg09.Raikkonen || 0) + (countsSg10.Raikkonen || 0);
				var raikkonenPercent = Math.round((raikkonenTotal/vm.users.length)*100);
				var raikkonenStatus = "";
				if(raikkonenPercent >= 85){ raikkonenStatus = "Favorite";} else if (raikkonenPercent >= 50){ raikkonenStatus = "Very Likely";} else if (raikkonenPercent >= 15){ raikkonenStatus = "Less Likely";} else { raikkonenStatus = "Underdog";}

				var massaTotal = (countsSg01.Massa || 0) + (countsSg02.Massa || 0) + (countsSg03.Massa || 0) + (countsSg04.Massa || 0) + (countsSg05.Massa || 0) + (countsSg06.Massa || 0) + (countsSg07.Massa || 0) + (countsSg08.Massa || 0) + (countsSg09.Massa || 0) + (countsSg10.Massa || 0);
				var massaPercent = Math.round((massaTotal/vm.users.length)*100);
				var massaStatus = "";
				if(massaPercent >= 85){ massaStatus = "Favorite";} else if (massaPercent >= 50){ massaStatus = "Very Likely";} else if (massaPercent >= 15){ massaStatus = "Less Likely";} else { massaStatus = "Underdog";}

				var bottasTotal = (countsSg01.Bottas || 0) + (countsSg02.Bottas || 0) + (countsSg03.Bottas || 0) + (countsSg04.Bottas || 0) + (countsSg05.Bottas || 0) + (countsSg06.Bottas || 0) + (countsSg07.Bottas || 0) + (countsSg08.Bottas || 0) + (countsSg09.Bottas || 0) + (countsSg10.Bottas || 0);
				var bottasPercent = Math.round((bottasTotal/vm.users.length)*100);
				var bottasStatus = "";
				if(bottasPercent >= 85){ bottasStatus = "Favorite";} else if (bottasPercent >= 50){ bottasStatus = "Very Likely";} else if (bottasPercent >= 15){ bottasStatus = "Less Likely";} else { bottasStatus = "Underdog";}

				var kvyatTotal = (countsSg01.Kvyat || 0) + (countsSg02.Kvyat || 0) + (countsSg03.Kvyat || 0) + (countsSg04.Kvyat || 0) + (countsSg05.Kvyat || 0) + (countsSg06.Kvyat || 0) + (countsSg07.Kvyat || 0) + (countsSg08.Kvyat || 0) + (countsSg09.Kvyat || 0) + (countsSg10.Kvyat || 0);
				var kvyatPercent = Math.round((kvyatTotal/vm.users.length)*100);
				var kvyatStatus = "";
				if(kvyatPercent >= 85){ kvyatStatus = "Favorite";} else if (kvyatPercent >= 50){ kvyatStatus = "Very Likely";} else if (kvyatPercent >= 15){ kvyatStatus = "Less Likely";} else { kvyatStatus = "Underdog";}

				var ricciardoTotal = (countsSg01.Ricciardo || 0) + (countsSg02.Ricciardo || 0) + (countsSg03.Ricciardo || 0) + (countsSg04.Ricciardo || 0) + (countsSg05.Ricciardo || 0) + (countsSg06.Ricciardo || 0) + (countsSg07.Ricciardo || 0) + (countsSg08.Ricciardo || 0) + (countsSg09.Ricciardo || 0) + (countsSg10.Ricciardo || 0);
				var ricciardoPercent = Math.round((ricciardoTotal/vm.users.length)*100);
				var ricciardoStatus = "";
				if(ricciardoPercent >= 85){ ricciardoStatus = "Favorite";} else if (ricciardoPercent >= 50){ ricciardoStatus = "Very Likely";} else if (ricciardoPercent >= 15){ ricciardoStatus = "Less Likely";} else { ricciardoStatus = "Underdog";}

				var perezTotal = (countsSg01.Perez || 0) + (countsSg02.Perez || 0) + (countsSg03.Perez || 0) + (countsSg04.Perez || 0) + (countsSg05.Perez || 0) + (countsSg06.Perez || 0) + (countsSg07.Perez || 0) + (countsSg08.Perez || 0) + (countsSg09.Perez || 0) + (countsSg10.Perez || 0);
				var perezPercent = Math.round((perezTotal/vm.users.length)*100);
				var perezStatus = "";
				if(perezPercent >= 85){ perezStatus = "Favorite";} else if (perezPercent >= 50){ perezStatus = "Very Likely";} else if (perezPercent >= 15){ perezStatus = "Less Likely";} else { perezStatus = "Underdog";}

				var hulkenbergTotal = (countsSg01.Hulkenberg || 0) + (countsSg02.Hulkenberg || 0) + (countsSg03.Hulkenberg || 0) + (countsSg04.Hulkenberg || 0) + (countsSg05.Hulkenberg || 0) + (countsSg06.Hulkenberg || 0) + (countsSg07.Hulkenberg || 0) + (countsSg08.Hulkenberg || 0) + (countsSg09.Hulkenberg || 0) + (countsSg10.Hulkenberg || 0);
				var hulkenbergPercent = Math.round((hulkenbergTotal/vm.users.length)*100);
				var hulkenbergStatus = "";
				if(hulkenbergPercent >= 85){ hulkenbergStatus = "Favorite";} else if (hulkenbergPercent >= 50){ hulkenbergStatus = "Very Likely";} else if (hulkenbergPercent >= 15){ hulkenbergStatus = "Less Likely";} else { hulkenbergStatus = "Underdog";}

				var grosjeanTotal = (countsSg01.Grosjean || 0) + (countsSg02.Grosjean || 0) + (countsSg03.Grosjean || 0) + (countsSg04.Grosjean || 0) + (countsSg05.Grosjean || 0) + (countsSg06.Grosjean || 0) + (countsSg07.Grosjean || 0) + (countsSg08.Grosjean || 0) + (countsSg09.Grosjean || 0) + (countsSg10.Grosjean || 0);
				var grosjeanPercent = Math.round((grosjeanTotal/vm.users.length)*100);
				var grosjeanStatus = "";
				if(grosjeanPercent >= 85){ grosjeanStatus = "Favorite";} else if (grosjeanPercent >= 50){ grosjeanStatus = "Very Likely";} else if (grosjeanPercent >= 15){ grosjeanStatus = "Less Likely";} else { grosjeanStatus = "Underdog";}

				var maldonadoTotal = (countsSg01.Maldonado || 0) + (countsSg02.Maldonado || 0) + (countsSg03.Maldonado || 0) + (countsSg04.Maldonado || 0) + (countsSg05.Maldonado || 0) + (countsSg06.Maldonado || 0) + (countsSg07.Maldonado || 0) + (countsSg08.Maldonado || 0) + (countsSg09.Maldonado || 0) + (countsSg10.Maldonado || 0);
				var maldonadoPercent = Math.round((maldonadoTotal/vm.users.length)*100);
				var maldonadoStatus = "";
				if(maldonadoPercent >= 85){ maldonadoStatus = "Favorite";} else if (maldonadoPercent >= 50){ maldonadoStatus = "Very Likely";} else if (maldonadoPercent >= 15){ maldonadoStatus = "Less Likely";} else { maldonadoStatus = "Underdog";}

				var verstappenTotal = (countsSg01.Verstappen || 0) + (countsSg02.Verstappen || 0) + (countsSg03.Verstappen || 0) + (countsSg04.Verstappen || 0) + (countsSg05.Verstappen || 0) + (countsSg06.Verstappen || 0) + (countsSg07.Verstappen || 0) + (countsSg08.Verstappen || 0) + (countsSg09.Verstappen || 0) + (countsSg10.Verstappen || 0);
				var verstappenPercent = Math.round((verstappenTotal/vm.users.length)*100);
				var verstappenStatus = "";
				if(verstappenPercent >= 85){ verstappenStatus = "Favorite";} else if (verstappenPercent >= 50){ verstappenStatus = "Very Likely";} else if (verstappenPercent >= 15){ verstappenStatus = "Less Likely";} else { verstappenStatus = "Underdog";}

				var sainzTotal = (countsSg01.Sainz || 0) + (countsSg02.Sainz || 0) + (countsSg03.Sainz || 0) + (countsSg04.Sainz || 0) + (countsSg05.Sainz || 0) + (countsSg06.Sainz || 0) + (countsSg07.Sainz || 0) + (countsSg08.Sainz || 0) + (countsSg09.Sainz || 0) + (countsSg10.Sainz || 0);
				var sainzPercent = Math.round((sainzTotal/vm.users.length)*100);
				var sainzStatus = "";
				if(sainzPercent >= 85){ sainzStatus = "Favorite";} else if (sainzPercent >= 50){ sainzStatus = "Very Likely";} else if (sainzPercent >= 15){ sainzStatus = "Less Likely";} else { sainzStatus = "Underdog";}

				var ericssonTotal = (countsSg01.Ericsson || 0) + (countsSg02.Ericsson || 0) + (countsSg03.Ericsson || 0) + (countsSg04.Ericsson || 0) + (countsSg05.Ericsson || 0) + (countsSg06.Ericsson || 0) + (countsSg07.Ericsson || 0) + (countsSg08.Ericsson || 0) + (countsSg09.Ericsson || 0) + (countsSg10.Ericsson || 0);
				var ericssonPercent = Math.round((ericssonTotal/vm.users.length)*100);
				var ericssonStatus = "";
				if(ericssonPercent >= 85){ ericssonStatus = "Favorite";} else if (ericssonPercent >= 50){ ericssonStatus = "Very Likely";} else if (ericssonPercent >= 15){ ericssonStatus = "Less Likely";} else { ericssonStatus = "Underdog";}

				var nasrTotal = (countsSg01.Nasr || 0) + (countsSg02.Nasr || 0) + (countsSg03.Nasr || 0) + (countsSg04.Nasr || 0) + (countsSg05.Nasr || 0) + (countsSg06.Nasr || 0) + (countsSg07.Nasr || 0) + (countsSg08.Nasr || 0) + (countsSg09.Nasr || 0) + (countsSg10.Nasr || 0);
				var nasrPercent = Math.round((nasrTotal/vm.users.length)*100);
				var nasrStatus = "";
				if(nasrPercent >= 85){ nasrStatus = "Favorite";} else if (nasrPercent >= 50){ nasrStatus = "Very Likely";} else if (nasrPercent >= 15){ nasrStatus = "Less Likely";} else { nasrStatus = "Underdog";}

				var alonsoTotal = (countsSg01.Alonso || 0) + (countsSg02.Alonso || 0) + (countsSg03.Alonso || 0) + (countsSg04.Alonso || 0) + (countsSg05.Alonso || 0) + (countsSg06.Alonso || 0) + (countsSg07.Alonso || 0) + (countsSg08.Alonso || 0) + (countsSg09.Alonso || 0) + (countsSg10.Alonso || 0);
				var alonsoPercent = Math.round((alonsoTotal/vm.users.length)*100);
				var alonsoStatus = "";
				if(alonsoPercent >= 85){ alonsoStatus = "Favorite";} else if (alonsoPercent >= 50){ alonsoStatus = "Very Likely";} else if (alonsoPercent >= 15){ alonsoStatus = "Less Likely";} else { alonsoStatus = "Underdog";}

				var buttonTotal = (countsSg01.Button || 0) + (countsSg02.Button || 0) + (countsSg03.Button || 0) + (countsSg04.Button || 0) + (countsSg05.Button || 0) + (countsSg06.Button || 0) + (countsSg07.Button || 0) + (countsSg08.Button || 0) + (countsSg09.Button || 0) + (countsSg10.Button || 0);
				var buttonPercent = Math.round((buttonTotal/vm.users.length)*100);
				var buttonStatus = "";
				if(buttonPercent >= 85){ buttonStatus = "Favorite";} else if (buttonPercent >= 50){ buttonStatus = "Very Likely";} else if (buttonPercent >= 15){ buttonStatus = "Less Likely";} else { buttonStatus = "Underdog";}

				var stevensTotal = (countsSg01.Stevens || 0) + (countsSg02.Stevens || 0) + (countsSg03.Stevens || 0) + (countsSg04.Stevens || 0) + (countsSg05.Stevens || 0) + (countsSg06.Stevens || 0) + (countsSg07.Stevens || 0) + (countsSg08.Stevens || 0) + (countsSg09.Stevens || 0) + (countsSg10.Stevens || 0);
				var stevensPercent = Math.round((stevensTotal/vm.users.length)*100);
				var stevensStatus = "";
				if(stevensPercent >= 85){ stevensStatus = "Favorite";} else if (stevensPercent >= 50){ stevensStatus = "Very Likely";} else if (stevensPercent >= 15){ stevensStatus = "Less Likely";} else { stevensStatus = "Underdog";}

				var merhiTotal = (countsSg01.Merhi || 0) + (countsSg02.Merhi || 0) + (countsSg03.Merhi || 0) + (countsSg04.Merhi || 0) + (countsSg05.Merhi || 0) + (countsSg06.Merhi || 0) + (countsSg07.Merhi || 0) + (countsSg08.Merhi || 0) + (countsSg09.Merhi || 0) + (countsSg10.Merhi || 0);
				var merhiPercent = Math.round((merhiTotal/vm.users.length)*100);
				var merhiStatus = "";
				if(merhiPercent >= 85){ merhiStatus = "Favorite";} else if (merhiPercent >= 50){ merhiStatus = "Very Likely";} else if (merhiPercent >= 15){ merhiStatus = "Less Likely";} else { merhiStatus = "Underdog";}


				//prepopulate a list of drivers
				vm.drivers = [
				    { pos: 1, driver: "Hamilton",    one: countsSg01.Hamilton || 0,   two: countsSg02.Hamilton || 0,   three: countsSg03.Hamilton || 0,   four: countsSg04.Hamilton || 0,   five: countsSg05.Hamilton || 0,   six: countsSg06.Hamilton || 0,   seven: countsSg07.Hamilton || 0,   eight: countsSg08.Hamilton || 0,   nine: countsSg09.Hamilton || 0,   ten: countsSg10.Hamilton || 0,   total: hamiltonTotal, percent: hamiltonPercent, status: hamiltonStatus},
				    { pos: 2, driver: "Rosberg",     one: countsSg01.Rosberg || 0,    two: countsSg02.Rosberg || 0,    three: countsSg03.Rosberg || 0,    four: countsSg04.Rosberg || 0,    five: countsSg05.Rosberg || 0,    six: countsSg06.Rosberg || 0,    seven: countsSg07.Rosberg || 0,    eight: countsSg08.Rosberg || 0,    nine: countsSg09.Rosberg || 0,    ten: countsSg10.Rosberg || 0,    total: rosbergTotal, percent: rosbergPercent, status: rosbergStatus},
				    { pos: 3, driver: "Vettel",      one: countsSg01.Vettel || 0,     two: countsSg02.Vettel || 0,     three: countsSg03.Vettel || 0,     four: countsSg04.Vettel || 0,     five: countsSg05.Vettel || 0,     six: countsSg06.Vettel || 0,     seven: countsSg07.Vettel || 0,     eight: countsSg08.Vettel || 0,     nine: countsSg09.Vettel || 0,     ten: countsSg10.Vettel || 0,     total: vettelTotal, percent: vettelPercent, status: vettelStatus},
				    { pos: 4, driver: "Raikkonen",   one: countsSg01.Raikkonen || 0,  two: countsSg02.Raikkonen || 0,  three: countsSg03.Raikkonen || 0,  four: countsSg04.Raikkonen || 0,  five: countsSg05.Raikkonen || 0,  six: countsSg06.Raikkonen || 0,  seven: countsSg07.Raikkonen || 0,  eight: countsSg08.Raikkonen || 0,  nine: countsSg09.Raikkonen || 0,  ten: countsSg10.Raikkonen || 0,  total: raikkonenTotal, percent: raikkonenPercent, status: raikkonenStatus},
				    { pos: 5, driver: "Massa",       one: countsSg01.Massa || 0,      two: countsSg02.Massa || 0,      three: countsSg03.Massa || 0,      four: countsSg04.Massa || 0,      five: countsSg05.Massa || 0,      six: countsSg06.Massa || 0,      seven: countsSg07.Massa || 0,      eight: countsSg08.Massa || 0,      nine: countsSg09.Massa || 0,      ten: countsSg10.Massa || 0,      total: massaTotal, percent: massaPercent, status: massaStatus},
				    { pos: 6, driver: "Bottas",      one: countsSg01.Bottas || 0,     two: countsSg02.Bottas || 0,     three: countsSg03.Bottas || 0,     four: countsSg04.Bottas || 0,     five: countsSg05.Bottas || 0,     six: countsSg06.Bottas || 0,     seven: countsSg07.Bottas || 0,     eight: countsSg08.Bottas || 0,     nine: countsSg09.Bottas || 0,     ten: countsSg10.Bottas || 0,     total: bottasTotal, percent: bottasPercent, status: bottasStatus},
				    { pos: 7, driver: "Kvyat",       one: countsSg01.Kvyat || 0,      two: countsSg02.Kvyat || 0,      three: countsSg03.Kvyat || 0,      four: countsSg04.Kvyat || 0,      five: countsSg05.Kvyat || 0,      six: countsSg06.Kvyat || 0,      seven: countsSg07.Kvyat || 0,      eight: countsSg08.Kvyat || 0,      nine: countsSg09.Kvyat || 0,      ten: countsSg10.Kvyat || 0,      total: kvyatTotal, percent: kvyatPercent, status: kvyatStatus},
				    { pos: 8, driver: "Ricciardo",   one: countsSg01.Ricciardo || 0,  two: countsSg02.Ricciardo || 0,  three: countsSg03.Ricciardo || 0,  four: countsSg04.Ricciardo || 0,  five: countsSg05.Ricciardo || 0,  six: countsSg06.Ricciardo || 0,  seven: countsSg07.Ricciardo || 0,  eight: countsSg08.Ricciardo || 0,  nine: countsSg09.Ricciardo || 0,  ten: countsSg10.Ricciardo || 0,  total: ricciardoTotal, percent: ricciardoPercent, status: ricciardoStatus},
				    { pos: 9, driver: "Perez",       one: countsSg01.Perez || 0,      two: countsSg02.Perez || 0,      three: countsSg03.Perez || 0,      four: countsSg04.Perez || 0,      five: countsSg05.Perez || 0,      six: countsSg06.Perez || 0,      seven: countsSg07.Perez || 0,      eight: countsSg08.Perez || 0,      nine: countsSg09.Perez || 0,      ten: countsSg10.Perez || 0,      total: perezTotal, percent: perezPercent, status: perezStatus},
				    { pos: 10, driver: "Hulkenberg", one: countsSg01.Hulkenberg || 0, two: countsSg02.Hulkenberg || 0, three: countsSg03.Hulkenberg || 0, four: countsSg04.Hulkenberg || 0, five: countsSg05.Hulkenberg || 0, six: countsSg06.Hulkenberg || 0, seven: countsSg07.Hulkenberg || 0, eight: countsSg08.Hulkenberg || 0, nine: countsSg09.Hulkenberg || 0, ten: countsSg10.Hulkenberg || 0, total: hulkenbergTotal, percent: hulkenbergPercent, status: hulkenbergStatus},
				    { pos: 11, driver: "Grosjean",   one: countsSg01.Grosjean || 0,   two: countsSg02.Grosjean || 0,   three: countsSg03.Grosjean || 0,   four: countsSg04.Grosjean || 0,   five: countsSg05.Grosjean || 0,   six: countsSg06.Grosjean || 0,   seven: countsSg07.Grosjean || 0,   eight: countsSg08.Grosjean || 0,   nine: countsSg09.Grosjean || 0,   ten: countsSg10.Grosjean || 0,   total: grosjeanTotal, percent: grosjeanPercent, status: grosjeanStatus},
				    { pos: 12, driver: "Maldonado",  one: countsSg01.Maldonado || 0,  two: countsSg02.Maldonado || 0,  three: countsSg03.Maldonado || 0,  four: countsSg04.Maldonado || 0,  five: countsSg05.Maldonado || 0,  six: countsSg06.Maldonado || 0,  seven: countsSg07.Maldonado || 0,  eight: countsSg08.Maldonado || 0,  nine: countsSg09.Maldonado || 0,  ten: countsSg10.Maldonado || 0,  total: maldonadoTotal, percent: maldonadoPercent, status: maldonadoStatus},
				    { pos: 13, driver: "Verstappen", one: countsSg01.Verstappen || 0, two: countsSg02.Verstappen || 0, three: countsSg03.Verstappen || 0, four: countsSg04.Verstappen || 0, five: countsSg05.Verstappen || 0, six: countsSg06.Verstappen || 0, seven: countsSg07.Verstappen || 0, eight: countsSg08.Verstappen || 0, nine: countsSg09.Verstappen || 0, ten: countsSg10.Verstappen || 0, total: verstappenTotal, percent: verstappenPercent, status: verstappenStatus},
				    { pos: 14, driver: "Sainz",      one: countsSg01.Sainz || 0,      two: countsSg02.Sainz || 0,      three: countsSg03.Sainz || 0,      four: countsSg04.Sainz || 0,      five: countsSg05.Sainz || 0,      six: countsSg06.Sainz || 0,      seven: countsSg07.Sainz || 0,      eight: countsSg08.Sainz || 0,      nine: countsSg09.Sainz || 0,      ten: countsSg10.Sainz || 0,      total: sainzTotal, percent: sainzPercent, status: sainzStatus},
				    { pos: 15, driver: "Ericsson",   one: countsSg01.Ericsson || 0,   two: countsSg02.Ericsson || 0,   three: countsSg03.Ericsson || 0,   four: countsSg04.Ericsson || 0,   five: countsSg05.Ericsson || 0,   six: countsSg06.Ericsson || 0,   seven: countsSg07.Ericsson || 0,   eight: countsSg08.Ericsson || 0,   nine: countsSg09.Ericsson || 0,   ten: countsSg10.Ericsson || 0,   total: ericssonTotal, percent: ericssonPercent, status: ericssonStatus},
				    { pos: 16, driver: "Nasr",       one: countsSg01.Nasr || 0,       two: countsSg02.Nasr || 0,       three: countsSg03.Nasr || 0,       four: countsSg04.Nasr || 0,       five: countsSg05.Nasr || 0,       six: countsSg06.Nasr || 0,       seven: countsSg07.Nasr || 0,       eight: countsSg08.Nasr || 0,       nine: countsSg09.Nasr || 0,       ten: countsSg10.Nasr || 0,       total: nasrTotal, percent: nasrPercent, status: nasrStatus},
				    { pos: 17, driver: "Alonso",     one: countsSg01.Alonso || 0,     two: countsSg02.Alonso || 0,     three: countsSg03.Alonso || 0,     four: countsSg04.Alonso || 0,     five: countsSg05.Alonso || 0,     six: countsSg06.Alonso || 0,     seven: countsSg07.Alonso || 0,     eight: countsSg08.Alonso || 0,     nine: countsSg09.Alonso || 0,     ten: countsSg10.Alonso || 0,     total: alonsoTotal, percent: alonsoPercent, status: alonsoStatus},
				    { pos: 18, driver: "Button",     one: countsSg01.Button || 0,     two: countsSg02.Button || 0,     three: countsSg03.Button || 0,     four: countsSg04.Button || 0,     five: countsSg05.Button || 0,     six: countsSg06.Button || 0,     seven: countsSg07.Button || 0,     eight: countsSg08.Button || 0,     nine: countsSg09.Button || 0,     ten: countsSg10.Button || 0,     total: buttonTotal, percent: buttonPercent, status: buttonStatus},
				    { pos: 19, driver: "Stevens",    one: countsSg01.Stevens || 0,    two: countsSg02.Stevens || 0,    three: countsSg03.Stevens || 0,    four: countsSg04.Stevens || 0,    five: countsSg05.Stevens || 0,    six: countsSg06.Stevens || 0,    seven: countsSg07.Stevens || 0,    eight: countsSg08.Stevens || 0,    nine: countsSg09.Stevens || 0,    ten: countsSg10.Stevens || 0,    total: stevensTotal, percent: stevensPercent, status: stevensStatus},
				    { pos: 20, driver: "Merhi",      one: countsSg01.Merhi || 0,      two: countsSg02.Merhi || 0,      three: countsSg03.Merhi || 0,      four: countsSg04.Merhi || 0,      five: countsSg05.Merhi || 0,      six: countsSg06.Merhi || 0,      seven: countsSg07.Merhi || 0,      eight: countsSg08.Merhi || 0,      nine: countsSg09.Merhi || 0,      ten: countsSg10.Merhi || 0,      total: merhiTotal, percent: merhiPercent, status: merhiStatus},
				];

				//==========================
				//POINTS table
				//==========================
				    vm.sortType = 'pos';
				    vm.sortReverse = false;

						//Percentage
						//Hamilton
						var hamiltonSg01Percent = Math.round((countsSg01.Hamilton/vm.users.length)*100) || 0;
						var hamiltonSg02Percent = Math.round((countsSg02.Hamilton/vm.users.length)*100) || 0;
						var hamiltonSg03Percent = Math.round((countsSg03.Hamilton/vm.users.length)*100) || 0;
						var hamiltonSg04Percent = Math.round((countsSg04.Hamilton/vm.users.length)*100) || 0;
						var hamiltonSg05Percent = Math.round((countsSg05.Hamilton/vm.users.length)*100) || 0;
						var hamiltonSg06Percent = Math.round((countsSg06.Hamilton/vm.users.length)*100) || 0;
						var hamiltonSg07Percent = Math.round((countsSg07.Hamilton/vm.users.length)*100) || 0;
						var hamiltonSg08Percent = Math.round((countsSg08.Hamilton/vm.users.length)*100) || 0;
						var hamiltonSg09Percent = Math.round((countsSg09.Hamilton/vm.users.length)*100) || 0;
						var hamiltonSg10Percent = Math.round((countsSg10.Hamilton/vm.users.length)*100) || 0;
						//Rosberg
						var rosbergSg01Percent = Math.round((countsSg01.Rosberg/vm.users.length)*100) || 0;
						var rosbergSg02Percent = Math.round((countsSg02.Rosberg/vm.users.length)*100) || 0;
						var rosbergSg03Percent = Math.round((countsSg03.Rosberg/vm.users.length)*100) || 0;
						var rosbergSg04Percent = Math.round((countsSg04.Rosberg/vm.users.length)*100) || 0;
						var rosbergSg05Percent = Math.round((countsSg05.Rosberg/vm.users.length)*100) || 0;
						var rosbergSg06Percent = Math.round((countsSg06.Rosberg/vm.users.length)*100) || 0;
						var rosbergSg07Percent = Math.round((countsSg07.Rosberg/vm.users.length)*100) || 0;
						var rosbergSg08Percent = Math.round((countsSg08.Rosberg/vm.users.length)*100) || 0;
						var rosbergSg09Percent = Math.round((countsSg09.Rosberg/vm.users.length)*100) || 0;
						var rosbergSg10Percent = Math.round((countsSg10.Rosberg/vm.users.length)*100) || 0;
						//Vettel
						var vettelSg01Percent = Math.round((countsSg01.Vettel/vm.users.length)*100) || 0;
						var vettelSg02Percent = Math.round((countsSg02.Vettel/vm.users.length)*100) || 0;
						var vettelSg03Percent = Math.round((countsSg03.Vettel/vm.users.length)*100) || 0;
						var vettelSg04Percent = Math.round((countsSg04.Vettel/vm.users.length)*100) || 0;
						var vettelSg05Percent = Math.round((countsSg05.Vettel/vm.users.length)*100) || 0;
						var vettelSg06Percent = Math.round((countsSg06.Vettel/vm.users.length)*100) || 0;
						var vettelSg07Percent = Math.round((countsSg07.Vettel/vm.users.length)*100) || 0;
						var vettelSg08Percent = Math.round((countsSg08.Vettel/vm.users.length)*100) || 0;
						var vettelSg09Percent = Math.round((countsSg09.Vettel/vm.users.length)*100) || 0;
						var vettelSg10Percent = Math.round((countsSg10.Vettel/vm.users.length)*100) || 0;
						//Raikkonen
						var raikkonenSg01Percent = Math.round((countsSg01.Raikkonen/vm.users.length)*100) || 0;
						var raikkonenSg02Percent = Math.round((countsSg02.Raikkonen/vm.users.length)*100) || 0;
						var raikkonenSg03Percent = Math.round((countsSg03.Raikkonen/vm.users.length)*100) || 0;
						var raikkonenSg04Percent = Math.round((countsSg04.Raikkonen/vm.users.length)*100) || 0;
						var raikkonenSg05Percent = Math.round((countsSg05.Raikkonen/vm.users.length)*100) || 0;
						var raikkonenSg06Percent = Math.round((countsSg06.Raikkonen/vm.users.length)*100) || 0;
						var raikkonenSg07Percent = Math.round((countsSg07.Raikkonen/vm.users.length)*100) || 0;
						var raikkonenSg08Percent = Math.round((countsSg08.Raikkonen/vm.users.length)*100) || 0;
						var raikkonenSg09Percent = Math.round((countsSg09.Raikkonen/vm.users.length)*100) || 0;
						var raikkonenSg10Percent = Math.round((countsSg10.Raikkonen/vm.users.length)*100) || 0;
						//Massa
						var massaSg01Percent = Math.round((countsSg01.Massa/vm.users.length)*100) || 0;
						var massaSg02Percent = Math.round((countsSg02.Massa/vm.users.length)*100) || 0;
						var massaSg03Percent = Math.round((countsSg03.Massa/vm.users.length)*100) || 0;
						var massaSg04Percent = Math.round((countsSg04.Massa/vm.users.length)*100) || 0;
						var massaSg05Percent = Math.round((countsSg05.Massa/vm.users.length)*100) || 0;
						var massaSg06Percent = Math.round((countsSg06.Massa/vm.users.length)*100) || 0;
						var massaSg07Percent = Math.round((countsSg07.Massa/vm.users.length)*100) || 0;
						var massaSg08Percent = Math.round((countsSg08.Massa/vm.users.length)*100) || 0;
						var massaSg09Percent = Math.round((countsSg09.Massa/vm.users.length)*100) || 0;
						var massaSg10Percent = Math.round((countsSg10.Massa/vm.users.length)*100) || 0;
						//Bottas
						var bottasSg01Percent = Math.round((countsSg01.Bottas/vm.users.length)*100) || 0;
						var bottasSg02Percent = Math.round((countsSg02.Bottas/vm.users.length)*100) || 0;
						var bottasSg03Percent = Math.round((countsSg03.Bottas/vm.users.length)*100) || 0;
						var bottasSg04Percent = Math.round((countsSg04.Bottas/vm.users.length)*100) || 0;
						var bottasSg05Percent = Math.round((countsSg05.Bottas/vm.users.length)*100) || 0;
						var bottasSg06Percent = Math.round((countsSg06.Bottas/vm.users.length)*100) || 0;
						var bottasSg07Percent = Math.round((countsSg07.Bottas/vm.users.length)*100) || 0;
						var bottasSg08Percent = Math.round((countsSg08.Bottas/vm.users.length)*100) || 0;
						var bottasSg09Percent = Math.round((countsSg09.Bottas/vm.users.length)*100) || 0;
						var bottasSg10Percent = Math.round((countsSg10.Bottas/vm.users.length)*100) || 0;
						//Kvyat
						var kvyatSg01Percent = Math.round((countsSg01.Kvyat/vm.users.length)*100) || 0;
						var kvyatSg02Percent = Math.round((countsSg02.Kvyat/vm.users.length)*100) || 0;
						var kvyatSg03Percent = Math.round((countsSg03.Kvyat/vm.users.length)*100) || 0;
						var kvyatSg04Percent = Math.round((countsSg04.Kvyat/vm.users.length)*100) || 0;
						var kvyatSg05Percent = Math.round((countsSg05.Kvyat/vm.users.length)*100) || 0;
						var kvyatSg06Percent = Math.round((countsSg06.Kvyat/vm.users.length)*100) || 0;
						var kvyatSg07Percent = Math.round((countsSg07.Kvyat/vm.users.length)*100) || 0;
						var kvyatSg08Percent = Math.round((countsSg08.Kvyat/vm.users.length)*100) || 0;
						var kvyatSg09Percent = Math.round((countsSg09.Kvyat/vm.users.length)*100) || 0;
						var kvyatSg10Percent = Math.round((countsSg10.Kvyat/vm.users.length)*100) || 0;
						//Ricciardo
						var ricciardoSg01Percent = Math.round((countsSg01.Ricciardo/vm.users.length)*100) || 0;
						var ricciardoSg02Percent = Math.round((countsSg02.Ricciardo/vm.users.length)*100) || 0;
						var ricciardoSg03Percent = Math.round((countsSg03.Ricciardo/vm.users.length)*100) || 0;
						var ricciardoSg04Percent = Math.round((countsSg04.Ricciardo/vm.users.length)*100) || 0;
						var ricciardoSg05Percent = Math.round((countsSg05.Ricciardo/vm.users.length)*100) || 0;
						var ricciardoSg06Percent = Math.round((countsSg06.Ricciardo/vm.users.length)*100) || 0;
						var ricciardoSg07Percent = Math.round((countsSg07.Ricciardo/vm.users.length)*100) || 0;
						var ricciardoSg08Percent = Math.round((countsSg08.Ricciardo/vm.users.length)*100) || 0;
						var ricciardoSg09Percent = Math.round((countsSg09.Ricciardo/vm.users.length)*100) || 0;
						var ricciardoSg10Percent = Math.round((countsSg10.Ricciardo/vm.users.length)*100) || 0;
						//Perez
						var perezSg01Percent = Math.round((countsSg01.Perez/vm.users.length)*100) || 0;
						var perezSg02Percent = Math.round((countsSg02.Perez/vm.users.length)*100) || 0;
						var perezSg03Percent = Math.round((countsSg03.Perez/vm.users.length)*100) || 0;
						var perezSg04Percent = Math.round((countsSg04.Perez/vm.users.length)*100) || 0;
						var perezSg05Percent = Math.round((countsSg05.Perez/vm.users.length)*100) || 0;
						var perezSg06Percent = Math.round((countsSg06.Perez/vm.users.length)*100) || 0;
						var perezSg07Percent = Math.round((countsSg07.Perez/vm.users.length)*100) || 0;
						var perezSg08Percent = Math.round((countsSg08.Perez/vm.users.length)*100) || 0;
						var perezSg09Percent = Math.round((countsSg09.Perez/vm.users.length)*100) || 0;
						var perezSg10Percent = Math.round((countsSg10.Perez/vm.users.length)*100) || 0;
						//Hulkenberg
						var hulkenbergSg01Percent = Math.round((countsSg01.Hulkenberg/vm.users.length)*100) || 0;
						var hulkenbergSg02Percent = Math.round((countsSg02.Hulkenberg/vm.users.length)*100) || 0;
						var hulkenbergSg03Percent = Math.round((countsSg03.Hulkenberg/vm.users.length)*100) || 0;
						var hulkenbergSg04Percent = Math.round((countsSg04.Hulkenberg/vm.users.length)*100) || 0;
						var hulkenbergSg05Percent = Math.round((countsSg05.Hulkenberg/vm.users.length)*100) || 0;
						var hulkenbergSg06Percent = Math.round((countsSg06.Hulkenberg/vm.users.length)*100) || 0;
						var hulkenbergSg07Percent = Math.round((countsSg07.Hulkenberg/vm.users.length)*100) || 0;
						var hulkenbergSg08Percent = Math.round((countsSg08.Hulkenberg/vm.users.length)*100) || 0;
						var hulkenbergSg09Percent = Math.round((countsSg09.Hulkenberg/vm.users.length)*100) || 0;
						var hulkenbergSg10Percent = Math.round((countsSg10.Hulkenberg/vm.users.length)*100) || 0;
						//Grosjean
						var grosjeanSg01Percent = Math.round((countsSg01.Grosjean/vm.users.length)*100) || 0;
						var grosjeanSg02Percent = Math.round((countsSg02.Grosjean/vm.users.length)*100) || 0;
						var grosjeanSg03Percent = Math.round((countsSg03.Grosjean/vm.users.length)*100) || 0;
						var grosjeanSg04Percent = Math.round((countsSg04.Grosjean/vm.users.length)*100) || 0;
						var grosjeanSg05Percent = Math.round((countsSg05.Grosjean/vm.users.length)*100) || 0;
						var grosjeanSg06Percent = Math.round((countsSg06.Grosjean/vm.users.length)*100) || 0;
						var grosjeanSg07Percent = Math.round((countsSg07.Grosjean/vm.users.length)*100) || 0;
						var grosjeanSg08Percent = Math.round((countsSg08.Grosjean/vm.users.length)*100) || 0;
						var grosjeanSg09Percent = Math.round((countsSg09.Grosjean/vm.users.length)*100) || 0;
						var grosjeanSg10Percent = Math.round((countsSg10.Grosjean/vm.users.length)*100) || 0;
						//Maldonado
						var maldonadoSg01Percent = Math.round((countsSg01.Maldonado/vm.users.length)*100) || 0;
						var maldonadoSg02Percent = Math.round((countsSg02.Maldonado/vm.users.length)*100) || 0;
						var maldonadoSg03Percent = Math.round((countsSg03.Maldonado/vm.users.length)*100) || 0;
						var maldonadoSg04Percent = Math.round((countsSg04.Maldonado/vm.users.length)*100) || 0;
						var maldonadoSg05Percent = Math.round((countsSg05.Maldonado/vm.users.length)*100) || 0;
						var maldonadoSg06Percent = Math.round((countsSg06.Maldonado/vm.users.length)*100) || 0;
						var maldonadoSg07Percent = Math.round((countsSg07.Maldonado/vm.users.length)*100) || 0;
						var maldonadoSg08Percent = Math.round((countsSg08.Maldonado/vm.users.length)*100) || 0;
						var maldonadoSg09Percent = Math.round((countsSg09.Maldonado/vm.users.length)*100) || 0;
						var maldonadoSg10Percent = Math.round((countsSg10.Maldonado/vm.users.length)*100) || 0;
						//Verstappen
						var verstappenSg01Percent = Math.round((countsSg01.Verstappen/vm.users.length)*100) || 0;
						var verstappenSg02Percent = Math.round((countsSg02.Verstappen/vm.users.length)*100) || 0;
						var verstappenSg03Percent = Math.round((countsSg03.Verstappen/vm.users.length)*100) || 0;
						var verstappenSg04Percent = Math.round((countsSg04.Verstappen/vm.users.length)*100) || 0;
						var verstappenSg05Percent = Math.round((countsSg05.Verstappen/vm.users.length)*100) || 0;
						var verstappenSg06Percent = Math.round((countsSg06.Verstappen/vm.users.length)*100) || 0;
						var verstappenSg07Percent = Math.round((countsSg07.Verstappen/vm.users.length)*100) || 0;
						var verstappenSg08Percent = Math.round((countsSg08.Verstappen/vm.users.length)*100) || 0;
						var verstappenSg09Percent = Math.round((countsSg09.Verstappen/vm.users.length)*100) || 0;
						var verstappenSg10Percent = Math.round((countsSg10.Verstappen/vm.users.length)*100) || 0;
						//Sainz
						var sainzSg01Percent = Math.round((countsSg01.Sainz/vm.users.length)*100) || 0;
						var sainzSg02Percent = Math.round((countsSg02.Sainz/vm.users.length)*100) || 0;
						var sainzSg03Percent = Math.round((countsSg03.Sainz/vm.users.length)*100) || 0;
						var sainzSg04Percent = Math.round((countsSg04.Sainz/vm.users.length)*100) || 0;
						var sainzSg05Percent = Math.round((countsSg05.Sainz/vm.users.length)*100) || 0;
						var sainzSg06Percent = Math.round((countsSg06.Sainz/vm.users.length)*100) || 0;
						var sainzSg07Percent = Math.round((countsSg07.Sainz/vm.users.length)*100) || 0;
						var sainzSg08Percent = Math.round((countsSg08.Sainz/vm.users.length)*100) || 0;
						var sainzSg09Percent = Math.round((countsSg09.Sainz/vm.users.length)*100) || 0;
						var sainzSg10Percent = Math.round((countsSg10.Sainz/vm.users.length)*100) || 0;
						//Ericsson
						var ericssonSg01Percent = Math.round((countsSg01.Ericsson/vm.users.length)*100) || 0;
						var ericssonSg02Percent = Math.round((countsSg02.Ericsson/vm.users.length)*100) || 0;
						var ericssonSg03Percent = Math.round((countsSg03.Ericsson/vm.users.length)*100) || 0;
						var ericssonSg04Percent = Math.round((countsSg04.Ericsson/vm.users.length)*100) || 0;
						var ericssonSg05Percent = Math.round((countsSg05.Ericsson/vm.users.length)*100) || 0;
						var ericssonSg06Percent = Math.round((countsSg06.Ericsson/vm.users.length)*100) || 0;
						var ericssonSg07Percent = Math.round((countsSg07.Ericsson/vm.users.length)*100) || 0;
						var ericssonSg08Percent = Math.round((countsSg08.Ericsson/vm.users.length)*100) || 0;
						var ericssonSg09Percent = Math.round((countsSg09.Ericsson/vm.users.length)*100) || 0;
						var ericssonSg10Percent = Math.round((countsSg10.Ericsson/vm.users.length)*100) || 0;
						//Nasr
						var nasrSg01Percent = Math.round((countsSg01.Nasr/vm.users.length)*100) || 0;
						var nasrSg02Percent = Math.round((countsSg02.Nasr/vm.users.length)*100) || 0;
						var nasrSg03Percent = Math.round((countsSg03.Nasr/vm.users.length)*100) || 0;
						var nasrSg04Percent = Math.round((countsSg04.Nasr/vm.users.length)*100) || 0;
						var nasrSg05Percent = Math.round((countsSg05.Nasr/vm.users.length)*100) || 0;
						var nasrSg06Percent = Math.round((countsSg06.Nasr/vm.users.length)*100) || 0;
						var nasrSg07Percent = Math.round((countsSg07.Nasr/vm.users.length)*100) || 0;
						var nasrSg08Percent = Math.round((countsSg08.Nasr/vm.users.length)*100) || 0;
						var nasrSg09Percent = Math.round((countsSg09.Nasr/vm.users.length)*100) || 0;
						var nasrSg10Percent = Math.round((countsSg10.Nasr/vm.users.length)*100) || 0;
						//Alonso
						var alonsoSg01Percent = Math.round((countsSg01.Alonso/vm.users.length)*100) || 0;
						var alonsoSg02Percent = Math.round((countsSg02.Alonso/vm.users.length)*100) || 0;
						var alonsoSg03Percent = Math.round((countsSg03.Alonso/vm.users.length)*100) || 0;
						var alonsoSg04Percent = Math.round((countsSg04.Alonso/vm.users.length)*100) || 0;
						var alonsoSg05Percent = Math.round((countsSg05.Alonso/vm.users.length)*100) || 0;
						var alonsoSg06Percent = Math.round((countsSg06.Alonso/vm.users.length)*100) || 0;
						var alonsoSg07Percent = Math.round((countsSg07.Alonso/vm.users.length)*100) || 0;
						var alonsoSg08Percent = Math.round((countsSg08.Alonso/vm.users.length)*100) || 0;
						var alonsoSg09Percent = Math.round((countsSg09.Alonso/vm.users.length)*100) || 0;
						var alonsoSg10Percent = Math.round((countsSg10.Alonso/vm.users.length)*100) || 0;
						//Button
						var buttonSg01Percent = Math.round((countsSg01.Button/vm.users.length)*100) || 0;
						var buttonSg02Percent = Math.round((countsSg02.Button/vm.users.length)*100) || 0;
						var buttonSg03Percent = Math.round((countsSg03.Button/vm.users.length)*100) || 0;
						var buttonSg04Percent = Math.round((countsSg04.Button/vm.users.length)*100) || 0;
						var buttonSg05Percent = Math.round((countsSg05.Button/vm.users.length)*100) || 0;
						var buttonSg06Percent = Math.round((countsSg06.Button/vm.users.length)*100) || 0;
						var buttonSg07Percent = Math.round((countsSg07.Button/vm.users.length)*100) || 0;
						var buttonSg08Percent = Math.round((countsSg08.Button/vm.users.length)*100) || 0;
						var buttonSg09Percent = Math.round((countsSg09.Button/vm.users.length)*100) || 0;
						var buttonSg10Percent = Math.round((countsSg10.Button/vm.users.length)*100) || 0;
						//Stevens
						var stevensSg01Percent = Math.round((countsSg01.Stevens/vm.users.length)*100) || 0;
						var stevensSg02Percent = Math.round((countsSg02.Stevens/vm.users.length)*100) || 0;
						var stevensSg03Percent = Math.round((countsSg03.Stevens/vm.users.length)*100) || 0;
						var stevensSg04Percent = Math.round((countsSg04.Stevens/vm.users.length)*100) || 0;
						var stevensSg05Percent = Math.round((countsSg05.Stevens/vm.users.length)*100) || 0;
						var stevensSg06Percent = Math.round((countsSg06.Stevens/vm.users.length)*100) || 0;
						var stevensSg07Percent = Math.round((countsSg07.Stevens/vm.users.length)*100) || 0;
						var stevensSg08Percent = Math.round((countsSg08.Stevens/vm.users.length)*100) || 0;
						var stevensSg09Percent = Math.round((countsSg09.Stevens/vm.users.length)*100) || 0;
						var stevensSg10Percent = Math.round((countsSg10.Stevens/vm.users.length)*100) || 0;
						//Merhi
						var merhiSg01Percent = Math.round((countsSg01.Merhi/vm.users.length)*100) || 0;
						var merhiSg02Percent = Math.round((countsSg02.Merhi/vm.users.length)*100) || 0;
						var merhiSg03Percent = Math.round((countsSg03.Merhi/vm.users.length)*100) || 0;
						var merhiSg04Percent = Math.round((countsSg04.Merhi/vm.users.length)*100) || 0;
						var merhiSg05Percent = Math.round((countsSg05.Merhi/vm.users.length)*100) || 0;
						var merhiSg06Percent = Math.round((countsSg06.Merhi/vm.users.length)*100) || 0;
						var merhiSg07Percent = Math.round((countsSg07.Merhi/vm.users.length)*100) || 0;
						var merhiSg08Percent = Math.round((countsSg08.Merhi/vm.users.length)*100) || 0;
						var merhiSg09Percent = Math.round((countsSg09.Merhi/vm.users.length)*100) || 0;
						var merhiSg10Percent = Math.round((countsSg10.Merhi/vm.users.length)*100) || 0;


						//Driver Pick Status
						//Hamilton
						var hamiltonSg01PickStatus = "";
						if(hamiltonSg01Percent === 0){ hamiltonSg01PickStatus = "Zero";} else if (hamiltonSg01Percent >= 20){ hamiltonSg01PickStatus = "High";} else if (hamiltonSg01Percent >= 10){ hamiltonSg01PickStatus = "Medium";}  else { hamiltonSg01PickStatus = "Low";}
						var hamiltonSg02PickStatus = "";
						if(hamiltonSg02Percent === 0){ hamiltonSg02PickStatus = "Zero";} else if (hamiltonSg02Percent >= 20){ hamiltonSg02PickStatus = "High";} else if (hamiltonSg02Percent >= 10){ hamiltonSg02PickStatus = "Medium";}  else { hamiltonSg02PickStatus = "Low";}
						var hamiltonSg03PickStatus = "";
						if(hamiltonSg03Percent === 0){ hamiltonSg03PickStatus = "Zero";} else if (hamiltonSg03Percent >= 20){ hamiltonSg03PickStatus = "High";} else if (hamiltonSg03Percent >= 10){ hamiltonSg03PickStatus = "Medium";}  else { hamiltonSg03PickStatus = "Low";}
						var hamiltonSg04PickStatus = "";
						if(hamiltonSg04Percent === 0){ hamiltonSg04PickStatus = "Zero";} else if (hamiltonSg04Percent >= 20){ hamiltonSg04PickStatus = "High";} else if (hamiltonSg04Percent >= 10){ hamiltonSg04PickStatus = "Medium";}  else { hamiltonSg04PickStatus = "Low";}
						var hamiltonSg05PickStatus = "";
						if(hamiltonSg05Percent === 0){ hamiltonSg05PickStatus = "Zero";} else if (hamiltonSg05Percent >= 20){ hamiltonSg05PickStatus = "High";} else if (hamiltonSg05Percent >= 10){ hamiltonSg05PickStatus = "Medium";}  else { hamiltonSg05PickStatus = "Low";}
						var hamiltonSg06PickStatus = "";
						if(hamiltonSg06Percent === 0){ hamiltonSg06PickStatus = "Zero";} else if (hamiltonSg06Percent >= 20){ hamiltonSg06PickStatus = "High";} else if (hamiltonSg06Percent >= 10){ hamiltonSg06PickStatus = "Medium";}  else { hamiltonSg06PickStatus = "Low";}
						var hamiltonSg07PickStatus = "";
						if(hamiltonSg07Percent === 0){ hamiltonSg07PickStatus = "Zero";} else if (hamiltonSg07Percent >= 20){ hamiltonSg07PickStatus = "High";} else if (hamiltonSg07Percent >= 10){ hamiltonSg07PickStatus = "Medium";}  else { hamiltonSg07PickStatus = "Low";}
						var hamiltonSg08PickStatus = "";
						if(hamiltonSg08Percent === 0){ hamiltonSg08PickStatus = "Zero";} else if (hamiltonSg08Percent >= 20){ hamiltonSg08PickStatus = "High";} else if (hamiltonSg08Percent >= 10){ hamiltonSg08PickStatus = "Medium";}  else { hamiltonSg08PickStatus = "Low";}
						var hamiltonSg09PickStatus = "";
						if(hamiltonSg09Percent === 0){ hamiltonSg09PickStatus = "Zero";} else if (hamiltonSg09Percent >= 20){ hamiltonSg09PickStatus = "High";} else if (hamiltonSg09Percent >= 10){ hamiltonSg09PickStatus = "Medium";}  else { hamiltonSg09PickStatus = "Low";}
						var hamiltonSg10PickStatus = "";
						if(hamiltonSg10Percent === 0){ hamiltonSg10PickStatus = "Zero";} else if (hamiltonSg10Percent >= 20){ hamiltonSg10PickStatus = "High";} else if (hamiltonSg10Percent >= 10){ hamiltonSg10PickStatus = "Medium";}  else { hamiltonSg10PickStatus = "Low";}

						//Rosberg
						var rosbergSg01PickStatus = "";
						if(rosbergSg01Percent === 0){ rosbergSg01PickStatus = "Zero";} else if (rosbergSg01Percent >= 20){ rosbergSg01PickStatus = "High";} else if (rosbergSg01Percent >= 10){ rosbergSg01PickStatus = "Medium";}  else { rosbergSg01PickStatus = "Low";}
						var rosbergSg02PickStatus = "";
						if(rosbergSg02Percent === 0){ rosbergSg02PickStatus = "Zero";} else if (rosbergSg02Percent >= 20){ rosbergSg02PickStatus = "High";} else if (rosbergSg02Percent >= 10){ rosbergSg02PickStatus = "Medium";}  else { rosbergSg02PickStatus = "Low";}
						var rosbergSg03PickStatus = "";
						if(rosbergSg03Percent === 0){ rosbergSg03PickStatus = "Zero";} else if (rosbergSg03Percent >= 20){ rosbergSg03PickStatus = "High";} else if (rosbergSg03Percent >= 10){ rosbergSg03PickStatus = "Medium";}  else { rosbergSg03PickStatus = "Low";}
						var rosbergSg04PickStatus = "";
						if(rosbergSg04Percent === 0){ rosbergSg04PickStatus = "Zero";} else if (rosbergSg04Percent >= 20){ rosbergSg04PickStatus = "High";} else if (rosbergSg04Percent >= 10){ rosbergSg04PickStatus = "Medium";}  else { rosbergSg04PickStatus = "Low";}
						var rosbergSg05PickStatus = "";
						if(rosbergSg05Percent === 0){ rosbergSg05PickStatus = "Zero";} else if (rosbergSg05Percent >= 20){ rosbergSg05PickStatus = "High";} else if (rosbergSg05Percent >= 10){ rosbergSg05PickStatus = "Medium";}  else { rosbergSg05PickStatus = "Low";}
						var rosbergSg06PickStatus = "";
						if(rosbergSg06Percent === 0){ rosbergSg06PickStatus = "Zero";} else if (rosbergSg06Percent >= 20){ rosbergSg06PickStatus = "High";} else if (rosbergSg06Percent >= 10){ rosbergSg06PickStatus = "Medium";}  else { rosbergSg06PickStatus = "Low";}
						var rosbergSg07PickStatus = "";
						if(rosbergSg07Percent === 0){ rosbergSg07PickStatus = "Zero";} else if (rosbergSg07Percent >= 20){ rosbergSg07PickStatus = "High";} else if (rosbergSg07Percent >= 10){ rosbergSg07PickStatus = "Medium";}  else { rosbergSg07PickStatus = "Low";}
						var rosbergSg08PickStatus = "";
						if(rosbergSg08Percent === 0){ rosbergSg08PickStatus = "Zero";} else if (rosbergSg08Percent >= 20){ rosbergSg08PickStatus = "High";} else if (rosbergSg08Percent >= 10){ rosbergSg08PickStatus = "Medium";}  else { rosbergSg08PickStatus = "Low";}
						var rosbergSg09PickStatus = "";
						if(rosbergSg09Percent === 0){ rosbergSg09PickStatus = "Zero";} else if (rosbergSg09Percent >= 20){ rosbergSg09PickStatus = "High";} else if (rosbergSg09Percent >= 10){ rosbergSg09PickStatus = "Medium";}  else { rosbergSg09PickStatus = "Low";}
						var rosbergSg10PickStatus = "";
						if(rosbergSg10Percent === 0){ rosbergSg10PickStatus = "Zero";} else if (rosbergSg10Percent >= 20){ rosbergSg10PickStatus = "High";} else if (rosbergSg10Percent >= 10){ rosbergSg10PickStatus = "Medium";}  else { rosbergSg10PickStatus = "Low";}

						//Vettel
						var vettelSg01PickStatus = "";
						if(vettelSg01Percent === 0){ vettelSg01PickStatus = "Zero";} else if (vettelSg01Percent >= 20){ vettelSg01PickStatus = "High";} else if (vettelSg01Percent >= 10){ vettelSg01PickStatus = "Medium";}  else { vettelSg01PickStatus = "Low";}
						var vettelSg02PickStatus = "";
						if(vettelSg02Percent === 0){ vettelSg02PickStatus = "Zero";} else if (vettelSg02Percent >= 20){ vettelSg02PickStatus = "High";} else if (vettelSg02Percent >= 10){ vettelSg02PickStatus = "Medium";}  else { vettelSg02PickStatus = "Low";}
						var vettelSg03PickStatus = "";
						if(vettelSg03Percent === 0){ vettelSg03PickStatus = "Zero";} else if (vettelSg03Percent >= 20){ vettelSg03PickStatus = "High";} else if (vettelSg03Percent >= 10){ vettelSg03PickStatus = "Medium";}  else { vettelSg03PickStatus = "Low";}
						var vettelSg04PickStatus = "";
						if(vettelSg04Percent === 0){ vettelSg04PickStatus = "Zero";} else if (vettelSg04Percent >= 20){ vettelSg04PickStatus = "High";} else if (vettelSg04Percent >= 10){ vettelSg04PickStatus = "Medium";}  else { vettelSg04PickStatus = "Low";}
						var vettelSg05PickStatus = "";
						if(vettelSg05Percent === 0){ vettelSg05PickStatus = "Zero";} else if (vettelSg05Percent >= 20){ vettelSg05PickStatus = "High";} else if (vettelSg05Percent >= 10){ vettelSg05PickStatus = "Medium";}  else { vettelSg05PickStatus = "Low";}
						var vettelSg06PickStatus = "";
						if(vettelSg06Percent === 0){ vettelSg06PickStatus = "Zero";} else if (vettelSg06Percent >= 20){ vettelSg06PickStatus = "High";} else if (vettelSg06Percent >= 10){ vettelSg06PickStatus = "Medium";}  else { vettelSg06PickStatus = "Low";}
						var vettelSg07PickStatus = "";
						if(vettelSg07Percent === 0){ vettelSg07PickStatus = "Zero";} else if (vettelSg07Percent >= 20){ vettelSg07PickStatus = "High";} else if (vettelSg07Percent >= 10){ vettelSg07PickStatus = "Medium";}  else { vettelSg07PickStatus = "Low";}
						var vettelSg08PickStatus = "";
						if(vettelSg08Percent === 0){ vettelSg08PickStatus = "Zero";} else if (vettelSg08Percent >= 20){ vettelSg08PickStatus = "High";} else if (vettelSg08Percent >= 10){ vettelSg08PickStatus = "Medium";}  else { vettelSg08PickStatus = "Low";}
						var vettelSg09PickStatus = "";
						if(vettelSg09Percent === 0){ vettelSg09PickStatus = "Zero";} else if (vettelSg09Percent >= 20){ vettelSg09PickStatus = "High";} else if (vettelSg09Percent >= 10){ vettelSg09PickStatus = "Medium";}  else { vettelSg09PickStatus = "Low";}
						var vettelSg10PickStatus = "";
						if(vettelSg10Percent === 0){ vettelSg10PickStatus = "Zero";} else if (vettelSg10Percent >= 20){ vettelSg10PickStatus = "High";} else if (vettelSg10Percent >= 10){ vettelSg10PickStatus = "Medium";}  else { vettelSg10PickStatus = "Low";}

						//Raikkonen
						var raikkonenSg01PickStatus = "";
						if(raikkonenSg01Percent === 0){ raikkonenSg01PickStatus = "Zero";} else if (raikkonenSg01Percent >= 20){ raikkonenSg01PickStatus = "High";} else if (raikkonenSg01Percent >= 10){ raikkonenSg01PickStatus = "Medium";}  else { raikkonenSg01PickStatus = "Low";}
						var raikkonenSg02PickStatus = "";
						if(raikkonenSg02Percent === 0){ raikkonenSg02PickStatus = "Zero";} else if (raikkonenSg02Percent >= 20){ raikkonenSg02PickStatus = "High";} else if (raikkonenSg02Percent >= 10){ raikkonenSg02PickStatus = "Medium";}  else { raikkonenSg02PickStatus = "Low";}
						var raikkonenSg03PickStatus = "";
						if(raikkonenSg03Percent === 0){ raikkonenSg03PickStatus = "Zero";} else if (raikkonenSg03Percent >= 20){ raikkonenSg03PickStatus = "High";} else if (raikkonenSg03Percent >= 10){ raikkonenSg03PickStatus = "Medium";}  else { raikkonenSg03PickStatus = "Low";}
						var raikkonenSg04PickStatus = "";
						if(raikkonenSg04Percent === 0){ raikkonenSg04PickStatus = "Zero";} else if (raikkonenSg04Percent >= 20){ raikkonenSg04PickStatus = "High";} else if (raikkonenSg04Percent >= 10){ raikkonenSg04PickStatus = "Medium";}  else { raikkonenSg04PickStatus = "Low";}
						var raikkonenSg05PickStatus = "";
						if(raikkonenSg05Percent === 0){ raikkonenSg05PickStatus = "Zero";} else if (raikkonenSg05Percent >= 20){ raikkonenSg05PickStatus = "High";} else if (raikkonenSg05Percent >= 10){ raikkonenSg05PickStatus = "Medium";}  else { raikkonenSg05PickStatus = "Low";}
						var raikkonenSg06PickStatus = "";
						if(raikkonenSg06Percent === 0){ raikkonenSg06PickStatus = "Zero";} else if (raikkonenSg06Percent >= 20){ raikkonenSg06PickStatus = "High";} else if (raikkonenSg06Percent >= 10){ raikkonenSg06PickStatus = "Medium";}  else { raikkonenSg06PickStatus = "Low";}
						var raikkonenSg07PickStatus = "";
						if(raikkonenSg07Percent === 0){ raikkonenSg07PickStatus = "Zero";} else if (raikkonenSg07Percent >= 20){ raikkonenSg07PickStatus = "High";} else if (raikkonenSg07Percent >= 10){ raikkonenSg07PickStatus = "Medium";}  else { raikkonenSg07PickStatus = "Low";}
						var raikkonenSg08PickStatus = "";
						if(raikkonenSg08Percent === 0){ raikkonenSg08PickStatus = "Zero";} else if (raikkonenSg08Percent >= 20){ raikkonenSg08PickStatus = "High";} else if (raikkonenSg08Percent >= 10){ raikkonenSg08PickStatus = "Medium";}  else { raikkonenSg08PickStatus = "Low";}
						var raikkonenSg09PickStatus = "";
						if(raikkonenSg09Percent === 0){ raikkonenSg09PickStatus = "Zero";} else if (raikkonenSg09Percent >= 20){ raikkonenSg09PickStatus = "High";} else if (raikkonenSg09Percent >= 10){ raikkonenSg09PickStatus = "Medium";}  else { raikkonenSg09PickStatus = "Low";}
						var raikkonenSg10PickStatus = "";
						if(raikkonenSg10Percent === 0){ raikkonenSg10PickStatus = "Zero";} else if (raikkonenSg10Percent >= 20){ raikkonenSg10PickStatus = "High";} else if (raikkonenSg10Percent >= 10){ raikkonenSg10PickStatus = "Medium";}  else { raikkonenSg10PickStatus = "Low";}

						//Massa
						var massaSg01PickStatus = "";
						if(massaSg01Percent === 0){ massaSg01PickStatus = "Zero";} else if (massaSg01Percent >= 20){ massaSg01PickStatus = "High";} else if (massaSg01Percent >= 10){ massaSg01PickStatus = "Medium";}  else { massaSg01PickStatus = "Low";}
						var massaSg02PickStatus = "";
						if(massaSg02Percent === 0){ massaSg02PickStatus = "Zero";} else if (massaSg02Percent >= 20){ massaSg02PickStatus = "High";} else if (massaSg02Percent >= 10){ massaSg02PickStatus = "Medium";}  else { massaSg02PickStatus = "Low";}
						var massaSg03PickStatus = "";
						if(massaSg03Percent === 0){ massaSg03PickStatus = "Zero";} else if (massaSg03Percent >= 20){ massaSg03PickStatus = "High";} else if (massaSg03Percent >= 10){ massaSg03PickStatus = "Medium";}  else { massaSg03PickStatus = "Low";}
						var massaSg04PickStatus = "";
						if(massaSg04Percent === 0){ massaSg04PickStatus = "Zero";} else if (massaSg04Percent >= 20){ massaSg04PickStatus = "High";} else if (massaSg04Percent >= 10){ massaSg04PickStatus = "Medium";}  else { massaSg04PickStatus = "Low";}
						var massaSg05PickStatus = "";
						if(massaSg05Percent === 0){ massaSg05PickStatus = "Zero";} else if (massaSg05Percent >= 20){ massaSg05PickStatus = "High";} else if (massaSg05Percent >= 10){ massaSg05PickStatus = "Medium";}  else { massaSg05PickStatus = "Low";}
						var massaSg06PickStatus = "";
						if(massaSg06Percent === 0){ massaSg06PickStatus = "Zero";} else if (massaSg06Percent >= 20){ massaSg06PickStatus = "High";} else if (massaSg06Percent >= 10){ massaSg06PickStatus = "Medium";}  else { massaSg06PickStatus = "Low";}
						var massaSg07PickStatus = "";
						if(massaSg07Percent === 0){ massaSg07PickStatus = "Zero";} else if (massaSg07Percent >= 20){ massaSg07PickStatus = "High";} else if (massaSg07Percent >= 10){ massaSg07PickStatus = "Medium";}  else { massaSg07PickStatus = "Low";}
						var massaSg08PickStatus = "";
						if(massaSg08Percent === 0){ massaSg08PickStatus = "Zero";} else if (massaSg08Percent >= 20){ massaSg08PickStatus = "High";} else if (massaSg08Percent >= 10){ massaSg08PickStatus = "Medium";}  else { massaSg08PickStatus = "Low";}
						var massaSg09PickStatus = "";
						if(massaSg09Percent === 0){ massaSg09PickStatus = "Zero";} else if (massaSg09Percent >= 20){ massaSg09PickStatus = "High";} else if (massaSg09Percent >= 10){ massaSg09PickStatus = "Medium";}  else { massaSg09PickStatus = "Low";}
						var massaSg10PickStatus = "";
						if(massaSg10Percent === 0){ massaSg10PickStatus = "Zero";} else if (massaSg10Percent >= 20){ massaSg10PickStatus = "High";} else if (massaSg10Percent >= 10){ massaSg10PickStatus = "Medium";}  else { massaSg10PickStatus = "Low";}

						//Bottas
						var bottasSg01PickStatus = "";
						if(bottasSg01Percent === 0){ bottasSg01PickStatus = "Zero";} else if (bottasSg01Percent >= 20){ bottasSg01PickStatus = "High";} else if (bottasSg01Percent >= 10){ bottasSg01PickStatus = "Medium";}  else { bottasSg01PickStatus = "Low";}
						var bottasSg02PickStatus = "";
						if(bottasSg02Percent === 0){ bottasSg02PickStatus = "Zero";} else if (bottasSg02Percent >= 20){ bottasSg02PickStatus = "High";} else if (bottasSg02Percent >= 10){ bottasSg02PickStatus = "Medium";}  else { bottasSg02PickStatus = "Low";}
						var bottasSg03PickStatus = "";
						if(bottasSg03Percent === 0){ bottasSg03PickStatus = "Zero";} else if (bottasSg03Percent >= 20){ bottasSg03PickStatus = "High";} else if (bottasSg03Percent >= 10){ bottasSg03PickStatus = "Medium";}  else { bottasSg03PickStatus = "Low";}
						var bottasSg04PickStatus = "";
						if(bottasSg04Percent === 0){ bottasSg04PickStatus = "Zero";} else if (bottasSg04Percent >= 20){ bottasSg04PickStatus = "High";} else if (bottasSg04Percent >= 10){ bottasSg04PickStatus = "Medium";}  else { bottasSg04PickStatus = "Low";}
						var bottasSg05PickStatus = "";
						if(bottasSg05Percent === 0){ bottasSg05PickStatus = "Zero";} else if (bottasSg05Percent >= 20){ bottasSg05PickStatus = "High";} else if (bottasSg05Percent >= 10){ bottasSg05PickStatus = "Medium";}  else { bottasSg05PickStatus = "Low";}
						var bottasSg06PickStatus = "";
						if(bottasSg06Percent === 0){ bottasSg06PickStatus = "Zero";} else if (bottasSg06Percent >= 20){ bottasSg06PickStatus = "High";} else if (bottasSg06Percent >= 10){ bottasSg06PickStatus = "Medium";}  else { bottasSg06PickStatus = "Low";}
						var bottasSg07PickStatus = "";
						if(bottasSg07Percent === 0){ bottasSg07PickStatus = "Zero";} else if (bottasSg07Percent >= 20){ bottasSg07PickStatus = "High";} else if (bottasSg07Percent >= 10){ bottasSg07PickStatus = "Medium";}  else { bottasSg07PickStatus = "Low";}
						var bottasSg08PickStatus = "";
						if(bottasSg08Percent === 0){ bottasSg08PickStatus = "Zero";} else if (bottasSg08Percent >= 20){ bottasSg08PickStatus = "High";} else if (bottasSg08Percent >= 10){ bottasSg08PickStatus = "Medium";}  else { bottasSg08PickStatus = "Low";}
						var bottasSg09PickStatus = "";
						if(bottasSg09Percent === 0){ bottasSg09PickStatus = "Zero";} else if (bottasSg09Percent >= 20){ bottasSg09PickStatus = "High";} else if (bottasSg09Percent >= 10){ bottasSg09PickStatus = "Medium";}  else { bottasSg09PickStatus = "Low";}
						var bottasSg10PickStatus = "";
						if(bottasSg10Percent === 0){ bottasSg10PickStatus = "Zero";} else if (bottasSg10Percent >= 20){ bottasSg10PickStatus = "High";} else if (bottasSg10Percent >= 10){ bottasSg10PickStatus = "Medium";}  else { bottasSg10PickStatus = "Low";}

						//Kvyat
						var kvyatSg01PickStatus = "";
						if(kvyatSg01Percent === 0){ kvyatSg01PickStatus = "Zero";} else if (kvyatSg01Percent >= 20){ kvyatSg01PickStatus = "High";} else if (kvyatSg01Percent >= 10){ kvyatSg01PickStatus = "Medium";}  else { kvyatSg01PickStatus = "Low";}
						var kvyatSg02PickStatus = "";
						if(kvyatSg02Percent === 0){ kvyatSg02PickStatus = "Zero";} else if (kvyatSg02Percent >= 20){ kvyatSg02PickStatus = "High";} else if (kvyatSg02Percent >= 10){ kvyatSg02PickStatus = "Medium";}  else { kvyatSg02PickStatus = "Low";}
						var kvyatSg03PickStatus = "";
						if(kvyatSg03Percent === 0){ kvyatSg03PickStatus = "Zero";} else if (kvyatSg03Percent >= 20){ kvyatSg03PickStatus = "High";} else if (kvyatSg03Percent >= 10){ kvyatSg03PickStatus = "Medium";}  else { kvyatSg03PickStatus = "Low";}
						var kvyatSg04PickStatus = "";
						if(kvyatSg04Percent === 0){ kvyatSg04PickStatus = "Zero";} else if (kvyatSg04Percent >= 20){ kvyatSg04PickStatus = "High";} else if (kvyatSg04Percent >= 10){ kvyatSg04PickStatus = "Medium";}  else { kvyatSg04PickStatus = "Low";}
						var kvyatSg05PickStatus = "";
						if(kvyatSg05Percent === 0){ kvyatSg05PickStatus = "Zero";} else if (kvyatSg05Percent >= 20){ kvyatSg05PickStatus = "High";} else if (kvyatSg05Percent >= 10){ kvyatSg05PickStatus = "Medium";}  else { kvyatSg05PickStatus = "Low";}
						var kvyatSg06PickStatus = "";
						if(kvyatSg06Percent === 0){ kvyatSg06PickStatus = "Zero";} else if (kvyatSg06Percent >= 20){ kvyatSg06PickStatus = "High";} else if (kvyatSg06Percent >= 10){ kvyatSg06PickStatus = "Medium";}  else { kvyatSg06PickStatus = "Low";}
						var kvyatSg07PickStatus = "";
						if(kvyatSg07Percent === 0){ kvyatSg07PickStatus = "Zero";} else if (kvyatSg07Percent >= 20){ kvyatSg07PickStatus = "High";} else if (kvyatSg07Percent >= 10){ kvyatSg07PickStatus = "Medium";}  else { kvyatSg07PickStatus = "Low";}
						var kvyatSg08PickStatus = "";
						if(kvyatSg08Percent === 0){ kvyatSg08PickStatus = "Zero";} else if (kvyatSg08Percent >= 20){ kvyatSg08PickStatus = "High";} else if (kvyatSg08Percent >= 10){ kvyatSg08PickStatus = "Medium";}  else { kvyatSg08PickStatus = "Low";}
						var kvyatSg09PickStatus = "";
						if(kvyatSg09Percent === 0){ kvyatSg09PickStatus = "Zero";} else if (kvyatSg09Percent >= 20){ kvyatSg09PickStatus = "High";} else if (kvyatSg09Percent >= 10){ kvyatSg09PickStatus = "Medium";}  else { kvyatSg09PickStatus = "Low";}
						var kvyatSg10PickStatus = "";
						if(kvyatSg10Percent === 0){ kvyatSg10PickStatus = "Zero";} else if (kvyatSg10Percent >= 20){ kvyatSg10PickStatus = "High";} else if (kvyatSg10Percent >= 10){ kvyatSg10PickStatus = "Medium";}  else { kvyatSg10PickStatus = "Low";}

						//Ricciardo
						var ricciardoSg01PickStatus = "";
						if(ricciardoSg01Percent === 0){ ricciardoSg01PickStatus = "Zero";} else if (ricciardoSg01Percent >= 20){ ricciardoSg01PickStatus = "High";} else if (ricciardoSg01Percent >= 10){ ricciardoSg01PickStatus = "Medium";}  else { ricciardoSg01PickStatus = "Low";}
						var ricciardoSg02PickStatus = "";
						if(ricciardoSg02Percent === 0){ ricciardoSg02PickStatus = "Zero";} else if (ricciardoSg02Percent >= 20){ ricciardoSg02PickStatus = "High";} else if (ricciardoSg02Percent >= 10){ ricciardoSg02PickStatus = "Medium";}  else { ricciardoSg02PickStatus = "Low";}
						var ricciardoSg03PickStatus = "";
						if(ricciardoSg03Percent === 0){ ricciardoSg03PickStatus = "Zero";} else if (ricciardoSg03Percent >= 20){ ricciardoSg03PickStatus = "High";} else if (ricciardoSg03Percent >= 10){ ricciardoSg03PickStatus = "Medium";}  else { ricciardoSg03PickStatus = "Low";}
						var ricciardoSg04PickStatus = "";
						if(ricciardoSg04Percent === 0){ ricciardoSg04PickStatus = "Zero";} else if (ricciardoSg04Percent >= 20){ ricciardoSg04PickStatus = "High";} else if (ricciardoSg04Percent >= 10){ ricciardoSg04PickStatus = "Medium";}  else { ricciardoSg04PickStatus = "Low";}
						var ricciardoSg05PickStatus = "";
						if(ricciardoSg05Percent === 0){ ricciardoSg05PickStatus = "Zero";} else if (ricciardoSg05Percent >= 20){ ricciardoSg05PickStatus = "High";} else if (ricciardoSg05Percent >= 10){ ricciardoSg05PickStatus = "Medium";}  else { ricciardoSg05PickStatus = "Low";}
						var ricciardoSg06PickStatus = "";
						if(ricciardoSg06Percent === 0){ ricciardoSg06PickStatus = "Zero";} else if (ricciardoSg06Percent >= 20){ ricciardoSg06PickStatus = "High";} else if (ricciardoSg06Percent >= 10){ ricciardoSg06PickStatus = "Medium";}  else { ricciardoSg06PickStatus = "Low";}
						var ricciardoSg07PickStatus = "";
						if(ricciardoSg07Percent === 0){ ricciardoSg07PickStatus = "Zero";} else if (ricciardoSg07Percent >= 20){ ricciardoSg07PickStatus = "High";} else if (ricciardoSg07Percent >= 10){ ricciardoSg07PickStatus = "Medium";}  else { ricciardoSg07PickStatus = "Low";}
						var ricciardoSg08PickStatus = "";
						if(ricciardoSg08Percent === 0){ ricciardoSg08PickStatus = "Zero";} else if (ricciardoSg08Percent >= 20){ ricciardoSg08PickStatus = "High";} else if (ricciardoSg08Percent >= 10){ ricciardoSg08PickStatus = "Medium";}  else { ricciardoSg08PickStatus = "Low";}
						var ricciardoSg09PickStatus = "";
						if(ricciardoSg09Percent === 0){ ricciardoSg09PickStatus = "Zero";} else if (ricciardoSg09Percent >= 20){ ricciardoSg09PickStatus = "High";} else if (ricciardoSg09Percent >= 10){ ricciardoSg09PickStatus = "Medium";}  else { ricciardoSg09PickStatus = "Low";}
						var ricciardoSg10PickStatus = "";
						if(ricciardoSg10Percent === 0){ ricciardoSg10PickStatus = "Zero";} else if (ricciardoSg10Percent >= 20){ ricciardoSg10PickStatus = "High";} else if (ricciardoSg10Percent >= 10){ ricciardoSg10PickStatus = "Medium";}  else { ricciardoSg10PickStatus = "Low";}

						//Perez
						var perezSg01PickStatus = "";
						if(perezSg01Percent === 0){ perezSg01PickStatus = "Zero";} else if (perezSg01Percent >= 20){ perezSg01PickStatus = "High";} else if (perezSg01Percent >= 10){ perezSg01PickStatus = "Medium";}  else { perezSg01PickStatus = "Low";}
						var perezSg02PickStatus = "";
						if(perezSg02Percent === 0){ perezSg02PickStatus = "Zero";} else if (perezSg02Percent >= 20){ perezSg02PickStatus = "High";} else if (perezSg02Percent >= 10){ perezSg02PickStatus = "Medium";}  else { perezSg02PickStatus = "Low";}
						var perezSg03PickStatus = "";
						if(perezSg03Percent === 0){ perezSg03PickStatus = "Zero";} else if (perezSg03Percent >= 20){ perezSg03PickStatus = "High";} else if (perezSg03Percent >= 10){ perezSg03PickStatus = "Medium";}  else { perezSg03PickStatus = "Low";}
						var perezSg04PickStatus = "";
						if(perezSg04Percent === 0){ perezSg04PickStatus = "Zero";} else if (perezSg04Percent >= 20){ perezSg04PickStatus = "High";} else if (perezSg04Percent >= 10){ perezSg04PickStatus = "Medium";}  else { perezSg04PickStatus = "Low";}
						var perezSg05PickStatus = "";
						if(perezSg05Percent === 0){ perezSg05PickStatus = "Zero";} else if (perezSg05Percent >= 20){ perezSg05PickStatus = "High";} else if (perezSg05Percent >= 10){ perezSg05PickStatus = "Medium";}  else { perezSg05PickStatus = "Low";}
						var perezSg06PickStatus = "";
						if(perezSg06Percent === 0){ perezSg06PickStatus = "Zero";} else if (perezSg06Percent >= 20){ perezSg06PickStatus = "High";} else if (perezSg06Percent >= 10){ perezSg06PickStatus = "Medium";}  else { perezSg06PickStatus = "Low";}
						var perezSg07PickStatus = "";
						if(perezSg07Percent === 0){ perezSg07PickStatus = "Zero";} else if (perezSg07Percent >= 20){ perezSg07PickStatus = "High";} else if (perezSg07Percent >= 10){ perezSg07PickStatus = "Medium";}  else { perezSg07PickStatus = "Low";}
						var perezSg08PickStatus = "";
						if(perezSg08Percent === 0){ perezSg08PickStatus = "Zero";} else if (perezSg08Percent >= 20){ perezSg08PickStatus = "High";} else if (perezSg08Percent >= 10){ perezSg08PickStatus = "Medium";}  else { perezSg08PickStatus = "Low";}
						var perezSg09PickStatus = "";
						if(perezSg09Percent === 0){ perezSg09PickStatus = "Zero";} else if (perezSg09Percent >= 20){ perezSg09PickStatus = "High";} else if (perezSg09Percent >= 10){ perezSg09PickStatus = "Medium";}  else { perezSg09PickStatus = "Low";}
						var perezSg10PickStatus = "";
						if(perezSg10Percent === 0){ perezSg10PickStatus = "Zero";} else if (perezSg10Percent >= 20){ perezSg10PickStatus = "High";} else if (perezSg10Percent >= 10){ perezSg10PickStatus = "Medium";}  else { perezSg10PickStatus = "Low";}

						//Hulkenberg
						var hulkenbergSg01PickStatus = "";
						if(hulkenbergSg01Percent === 0){ hulkenbergSg01PickStatus = "Zero";} else if (hulkenbergSg01Percent >= 20){ hulkenbergSg01PickStatus = "High";} else if (hulkenbergSg01Percent >= 10){ hulkenbergSg01PickStatus = "Medium";}  else { hulkenbergSg01PickStatus = "Low";}
						var hulkenbergSg02PickStatus = "";
						if(hulkenbergSg02Percent === 0){ hulkenbergSg02PickStatus = "Zero";} else if (hulkenbergSg02Percent >= 20){ hulkenbergSg02PickStatus = "High";} else if (hulkenbergSg02Percent >= 10){ hulkenbergSg02PickStatus = "Medium";}  else { hulkenbergSg02PickStatus = "Low";}
						var hulkenbergSg03PickStatus = "";
						if(hulkenbergSg03Percent === 0){ hulkenbergSg03PickStatus = "Zero";} else if (hulkenbergSg03Percent >= 20){ hulkenbergSg03PickStatus = "High";} else if (hulkenbergSg03Percent >= 10){ hulkenbergSg03PickStatus = "Medium";}  else { hulkenbergSg03PickStatus = "Low";}
						var hulkenbergSg04PickStatus = "";
						if(hulkenbergSg04Percent === 0){ hulkenbergSg04PickStatus = "Zero";} else if (hulkenbergSg04Percent >= 20){ hulkenbergSg04PickStatus = "High";} else if (hulkenbergSg04Percent >= 10){ hulkenbergSg04PickStatus = "Medium";}  else { hulkenbergSg04PickStatus = "Low";}
						var hulkenbergSg05PickStatus = "";
						if(hulkenbergSg05Percent === 0){ hulkenbergSg05PickStatus = "Zero";} else if (hulkenbergSg05Percent >= 20){ hulkenbergSg05PickStatus = "High";} else if (hulkenbergSg05Percent >= 10){ hulkenbergSg05PickStatus = "Medium";}  else { hulkenbergSg05PickStatus = "Low";}
						var hulkenbergSg06PickStatus = "";
						if(hulkenbergSg06Percent === 0){ hulkenbergSg06PickStatus = "Zero";} else if (hulkenbergSg06Percent >= 20){ hulkenbergSg06PickStatus = "High";} else if (hulkenbergSg06Percent >= 10){ hulkenbergSg06PickStatus = "Medium";}  else { hulkenbergSg06PickStatus = "Low";}
						var hulkenbergSg07PickStatus = "";
						if(hulkenbergSg07Percent === 0){ hulkenbergSg07PickStatus = "Zero";} else if (hulkenbergSg07Percent >= 20){ hulkenbergSg07PickStatus = "High";} else if (hulkenbergSg07Percent >= 10){ hulkenbergSg07PickStatus = "Medium";}  else { hulkenbergSg07PickStatus = "Low";}
						var hulkenbergSg08PickStatus = "";
						if(hulkenbergSg08Percent === 0){ hulkenbergSg08PickStatus = "Zero";} else if (hulkenbergSg08Percent >= 20){ hulkenbergSg08PickStatus = "High";} else if (hulkenbergSg08Percent >= 10){ hulkenbergSg08PickStatus = "Medium";}  else { hulkenbergSg08PickStatus = "Low";}
						var hulkenbergSg09PickStatus = "";
						if(hulkenbergSg09Percent === 0){ hulkenbergSg09PickStatus = "Zero";} else if (hulkenbergSg09Percent >= 20){ hulkenbergSg09PickStatus = "High";} else if (hulkenbergSg09Percent >= 10){ hulkenbergSg09PickStatus = "Medium";}  else { hulkenbergSg09PickStatus = "Low";}
						var hulkenbergSg10PickStatus = "";
						if(hulkenbergSg10Percent === 0){ hulkenbergSg10PickStatus = "Zero";} else if (hulkenbergSg10Percent >= 20){ hulkenbergSg10PickStatus = "High";} else if (hulkenbergSg10Percent >= 10){ hulkenbergSg10PickStatus = "Medium";}  else { hulkenbergSg10PickStatus = "Low";}

						//Grosjean
						var grosjeanSg01PickStatus = "";
						if(grosjeanSg01Percent === 0){ grosjeanSg01PickStatus = "Zero";} else if (grosjeanSg01Percent >= 20){ grosjeanSg01PickStatus = "High";} else if (grosjeanSg01Percent >= 10){ grosjeanSg01PickStatus = "Medium";}  else { grosjeanSg01PickStatus = "Low";}
						var grosjeanSg02PickStatus = "";
						if(grosjeanSg02Percent === 0){ grosjeanSg02PickStatus = "Zero";} else if (grosjeanSg02Percent >= 20){ grosjeanSg02PickStatus = "High";} else if (grosjeanSg02Percent >= 10){ grosjeanSg02PickStatus = "Medium";}  else { grosjeanSg02PickStatus = "Low";}
						var grosjeanSg03PickStatus = "";
						if(grosjeanSg03Percent === 0){ grosjeanSg03PickStatus = "Zero";} else if (grosjeanSg03Percent >= 20){ grosjeanSg03PickStatus = "High";} else if (grosjeanSg03Percent >= 10){ grosjeanSg03PickStatus = "Medium";}  else { grosjeanSg03PickStatus = "Low";}
						var grosjeanSg04PickStatus = "";
						if(grosjeanSg04Percent === 0){ grosjeanSg04PickStatus = "Zero";} else if (grosjeanSg04Percent >= 20){ grosjeanSg04PickStatus = "High";} else if (grosjeanSg04Percent >= 10){ grosjeanSg04PickStatus = "Medium";}  else { grosjeanSg04PickStatus = "Low";}
						var grosjeanSg05PickStatus = "";
						if(grosjeanSg05Percent === 0){ grosjeanSg05PickStatus = "Zero";} else if (grosjeanSg05Percent >= 20){ grosjeanSg05PickStatus = "High";} else if (grosjeanSg05Percent >= 10){ grosjeanSg05PickStatus = "Medium";}  else { grosjeanSg05PickStatus = "Low";}
						var grosjeanSg06PickStatus = "";
						if(grosjeanSg06Percent === 0){ grosjeanSg06PickStatus = "Zero";} else if (grosjeanSg06Percent >= 20){ grosjeanSg06PickStatus = "High";} else if (grosjeanSg06Percent >= 10){ grosjeanSg06PickStatus = "Medium";}  else { grosjeanSg06PickStatus = "Low";}
						var grosjeanSg07PickStatus = "";
						if(grosjeanSg07Percent === 0){ grosjeanSg07PickStatus = "Zero";} else if (grosjeanSg07Percent >= 20){ grosjeanSg07PickStatus = "High";} else if (grosjeanSg07Percent >= 10){ grosjeanSg07PickStatus = "Medium";}  else { grosjeanSg07PickStatus = "Low";}
						var grosjeanSg08PickStatus = "";
						if(grosjeanSg08Percent === 0){ grosjeanSg08PickStatus = "Zero";} else if (grosjeanSg08Percent >= 20){ grosjeanSg08PickStatus = "High";} else if (grosjeanSg08Percent >= 10){ grosjeanSg08PickStatus = "Medium";}  else { grosjeanSg08PickStatus = "Low";}
						var grosjeanSg09PickStatus = "";
						if(grosjeanSg09Percent === 0){ grosjeanSg09PickStatus = "Zero";} else if (grosjeanSg09Percent >= 20){ grosjeanSg09PickStatus = "High";} else if (grosjeanSg09Percent >= 10){ grosjeanSg09PickStatus = "Medium";}  else { grosjeanSg09PickStatus = "Low";}
						var grosjeanSg10PickStatus = "";
						if(grosjeanSg10Percent === 0){ grosjeanSg10PickStatus = "Zero";} else if (grosjeanSg10Percent >= 20){ grosjeanSg10PickStatus = "High";} else if (grosjeanSg10Percent >= 10){ grosjeanSg10PickStatus = "Medium";}  else { grosjeanSg10PickStatus = "Low";}

						//Maldonado
						var maldonadoSg01PickStatus = "";
						if(maldonadoSg01Percent === 0){ maldonadoSg01PickStatus = "Zero";} else if (maldonadoSg01Percent >= 20){ maldonadoSg01PickStatus = "High";} else if (maldonadoSg01Percent >= 10){ maldonadoSg01PickStatus = "Medium";}  else { maldonadoSg01PickStatus = "Low";}
						var maldonadoSg02PickStatus = "";
						if(maldonadoSg02Percent === 0){ maldonadoSg02PickStatus = "Zero";} else if (maldonadoSg02Percent >= 20){ maldonadoSg02PickStatus = "High";} else if (maldonadoSg02Percent >= 10){ maldonadoSg02PickStatus = "Medium";}  else { maldonadoSg02PickStatus = "Low";}
						var maldonadoSg03PickStatus = "";
						if(maldonadoSg03Percent === 0){ maldonadoSg03PickStatus = "Zero";} else if (maldonadoSg03Percent >= 20){ maldonadoSg03PickStatus = "High";} else if (maldonadoSg03Percent >= 10){ maldonadoSg03PickStatus = "Medium";}  else { maldonadoSg03PickStatus = "Low";}
						var maldonadoSg04PickStatus = "";
						if(maldonadoSg04Percent === 0){ maldonadoSg04PickStatus = "Zero";} else if (maldonadoSg04Percent >= 20){ maldonadoSg04PickStatus = "High";} else if (maldonadoSg04Percent >= 10){ maldonadoSg04PickStatus = "Medium";}  else { maldonadoSg04PickStatus = "Low";}
						var maldonadoSg05PickStatus = "";
						if(maldonadoSg05Percent === 0){ maldonadoSg05PickStatus = "Zero";} else if (maldonadoSg05Percent >= 20){ maldonadoSg05PickStatus = "High";} else if (maldonadoSg05Percent >= 10){ maldonadoSg05PickStatus = "Medium";}  else { maldonadoSg05PickStatus = "Low";}
						var maldonadoSg06PickStatus = "";
						if(maldonadoSg06Percent === 0){ maldonadoSg06PickStatus = "Zero";} else if (maldonadoSg06Percent >= 20){ maldonadoSg06PickStatus = "High";} else if (maldonadoSg06Percent >= 10){ maldonadoSg06PickStatus = "Medium";}  else { maldonadoSg06PickStatus = "Low";}
						var maldonadoSg07PickStatus = "";
						if(maldonadoSg07Percent === 0){ maldonadoSg07PickStatus = "Zero";} else if (maldonadoSg07Percent >= 20){ maldonadoSg07PickStatus = "High";} else if (maldonadoSg07Percent >= 10){ maldonadoSg07PickStatus = "Medium";}  else { maldonadoSg07PickStatus = "Low";}
						var maldonadoSg08PickStatus = "";
						if(maldonadoSg08Percent === 0){ maldonadoSg08PickStatus = "Zero";} else if (maldonadoSg08Percent >= 20){ maldonadoSg08PickStatus = "High";} else if (maldonadoSg08Percent >= 10){ maldonadoSg08PickStatus = "Medium";}  else { maldonadoSg08PickStatus = "Low";}
						var maldonadoSg09PickStatus = "";
						if(maldonadoSg09Percent === 0){ maldonadoSg09PickStatus = "Zero";} else if (maldonadoSg09Percent >= 20){ maldonadoSg09PickStatus = "High";} else if (maldonadoSg09Percent >= 10){ maldonadoSg09PickStatus = "Medium";}  else { maldonadoSg09PickStatus = "Low";}
						var maldonadoSg10PickStatus = "";
						if(maldonadoSg10Percent === 0){ maldonadoSg10PickStatus = "Zero";} else if (maldonadoSg10Percent >= 20){ maldonadoSg10PickStatus = "High";} else if (maldonadoSg10Percent >= 10){ maldonadoSg10PickStatus = "Medium";}  else { maldonadoSg10PickStatus = "Low";}

						//Verstappen
						var verstappenSg01PickStatus = "";
						if(verstappenSg01Percent === 0){ verstappenSg01PickStatus = "Zero";} else if (verstappenSg01Percent >= 20){ verstappenSg01PickStatus = "High";} else if (verstappenSg01Percent >= 10){ verstappenSg01PickStatus = "Medium";}  else { verstappenSg01PickStatus = "Low";}
						var verstappenSg02PickStatus = "";
						if(verstappenSg02Percent === 0){ verstappenSg02PickStatus = "Zero";} else if (verstappenSg02Percent >= 20){ verstappenSg02PickStatus = "High";} else if (verstappenSg02Percent >= 10){ verstappenSg02PickStatus = "Medium";}  else { verstappenSg02PickStatus = "Low";}
						var verstappenSg03PickStatus = "";
						if(verstappenSg03Percent === 0){ verstappenSg03PickStatus = "Zero";} else if (verstappenSg03Percent >= 20){ verstappenSg03PickStatus = "High";} else if (verstappenSg03Percent >= 10){ verstappenSg03PickStatus = "Medium";}  else { verstappenSg03PickStatus = "Low";}
						var verstappenSg04PickStatus = "";
						if(verstappenSg04Percent === 0){ verstappenSg04PickStatus = "Zero";} else if (verstappenSg04Percent >= 20){ verstappenSg04PickStatus = "High";} else if (verstappenSg04Percent >= 10){ verstappenSg04PickStatus = "Medium";}  else { verstappenSg04PickStatus = "Low";}
						var verstappenSg05PickStatus = "";
						if(verstappenSg05Percent === 0){ verstappenSg05PickStatus = "Zero";} else if (verstappenSg05Percent >= 20){ verstappenSg05PickStatus = "High";} else if (verstappenSg05Percent >= 10){ verstappenSg05PickStatus = "Medium";}  else { verstappenSg05PickStatus = "Low";}
						var verstappenSg06PickStatus = "";
						if(verstappenSg06Percent === 0){ verstappenSg06PickStatus = "Zero";} else if (verstappenSg06Percent >= 20){ verstappenSg06PickStatus = "High";} else if (verstappenSg06Percent >= 10){ verstappenSg06PickStatus = "Medium";}  else { verstappenSg06PickStatus = "Low";}
						var verstappenSg07PickStatus = "";
						if(verstappenSg07Percent === 0){ verstappenSg07PickStatus = "Zero";} else if (verstappenSg07Percent >= 20){ verstappenSg07PickStatus = "High";} else if (verstappenSg07Percent >= 10){ verstappenSg07PickStatus = "Medium";}  else { verstappenSg07PickStatus = "Low";}
						var verstappenSg08PickStatus = "";
						if(verstappenSg08Percent === 0){ verstappenSg08PickStatus = "Zero";} else if (verstappenSg08Percent >= 20){ verstappenSg08PickStatus = "High";} else if (verstappenSg08Percent >= 10){ verstappenSg08PickStatus = "Medium";}  else { verstappenSg08PickStatus = "Low";}
						var verstappenSg09PickStatus = "";
						if(verstappenSg09Percent === 0){ verstappenSg09PickStatus = "Zero";} else if (verstappenSg09Percent >= 20){ verstappenSg09PickStatus = "High";} else if (verstappenSg09Percent >= 10){ verstappenSg09PickStatus = "Medium";}  else { verstappenSg09PickStatus = "Low";}
						var verstappenSg10PickStatus = "";
						if(verstappenSg10Percent === 0){ verstappenSg10PickStatus = "Zero";} else if (verstappenSg10Percent >= 20){ verstappenSg10PickStatus = "High";} else if (verstappenSg10Percent >= 10){ verstappenSg10PickStatus = "Medium";}  else { verstappenSg10PickStatus = "Low";}

						//Sainz
						var sainzSg01PickStatus = "";
						if(sainzSg01Percent === 0){ sainzSg01PickStatus = "Zero";} else if (sainzSg01Percent >= 20){ sainzSg01PickStatus = "High";} else if (sainzSg01Percent >= 10){ sainzSg01PickStatus = "Medium";}  else { sainzSg01PickStatus = "Low";}
						var sainzSg02PickStatus = "";
						if(sainzSg02Percent === 0){ sainzSg02PickStatus = "Zero";} else if (sainzSg02Percent >= 20){ sainzSg02PickStatus = "High";} else if (sainzSg02Percent >= 10){ sainzSg02PickStatus = "Medium";}  else { sainzSg02PickStatus = "Low";}
						var sainzSg03PickStatus = "";
						if(sainzSg03Percent === 0){ sainzSg03PickStatus = "Zero";} else if (sainzSg03Percent >= 20){ sainzSg03PickStatus = "High";} else if (sainzSg03Percent >= 10){ sainzSg03PickStatus = "Medium";}  else { sainzSg03PickStatus = "Low";}
						var sainzSg04PickStatus = "";
						if(sainzSg04Percent === 0){ sainzSg04PickStatus = "Zero";} else if (sainzSg04Percent >= 20){ sainzSg04PickStatus = "High";} else if (sainzSg04Percent >= 10){ sainzSg04PickStatus = "Medium";}  else { sainzSg04PickStatus = "Low";}
						var sainzSg05PickStatus = "";
						if(sainzSg05Percent === 0){ sainzSg05PickStatus = "Zero";} else if (sainzSg05Percent >= 20){ sainzSg05PickStatus = "High";} else if (sainzSg05Percent >= 10){ sainzSg05PickStatus = "Medium";}  else { sainzSg05PickStatus = "Low";}
						var sainzSg06PickStatus = "";
						if(sainzSg06Percent === 0){ sainzSg06PickStatus = "Zero";} else if (sainzSg06Percent >= 20){ sainzSg06PickStatus = "High";} else if (sainzSg06Percent >= 10){ sainzSg06PickStatus = "Medium";}  else { sainzSg06PickStatus = "Low";}
						var sainzSg07PickStatus = "";
						if(sainzSg07Percent === 0){ sainzSg07PickStatus = "Zero";} else if (sainzSg07Percent >= 20){ sainzSg07PickStatus = "High";} else if (sainzSg07Percent >= 10){ sainzSg07PickStatus = "Medium";}  else { sainzSg07PickStatus = "Low";}
						var sainzSg08PickStatus = "";
						if(sainzSg08Percent === 0){ sainzSg08PickStatus = "Zero";} else if (sainzSg08Percent >= 20){ sainzSg08PickStatus = "High";} else if (sainzSg08Percent >= 10){ sainzSg08PickStatus = "Medium";}  else { sainzSg08PickStatus = "Low";}
						var sainzSg09PickStatus = "";
						if(sainzSg09Percent === 0){ sainzSg09PickStatus = "Zero";} else if (sainzSg09Percent >= 20){ sainzSg09PickStatus = "High";} else if (sainzSg09Percent >= 10){ sainzSg09PickStatus = "Medium";}  else { sainzSg09PickStatus = "Low";}
						var sainzSg10PickStatus = "";
						if(sainzSg10Percent === 0){ sainzSg10PickStatus = "Zero";} else if (sainzSg10Percent >= 20){ sainzSg10PickStatus = "High";} else if (sainzSg10Percent >= 10){ sainzSg10PickStatus = "Medium";}  else { sainzSg10PickStatus = "Low";}

						//Ericsson
						var ericssonSg01PickStatus = "";
						if(ericssonSg01Percent === 0){ ericssonSg01PickStatus = "Zero";} else if (ericssonSg01Percent >= 20){ ericssonSg01PickStatus = "High";} else if (ericssonSg01Percent >= 10){ ericssonSg01PickStatus = "Medium";}  else { ericssonSg01PickStatus = "Low";}
						var ericssonSg02PickStatus = "";
						if(ericssonSg02Percent === 0){ ericssonSg02PickStatus = "Zero";} else if (ericssonSg02Percent >= 20){ ericssonSg02PickStatus = "High";} else if (ericssonSg02Percent >= 10){ ericssonSg02PickStatus = "Medium";}  else { ericssonSg02PickStatus = "Low";}
						var ericssonSg03PickStatus = "";
						if(ericssonSg03Percent === 0){ ericssonSg03PickStatus = "Zero";} else if (ericssonSg03Percent >= 20){ ericssonSg03PickStatus = "High";} else if (ericssonSg03Percent >= 10){ ericssonSg03PickStatus = "Medium";}  else { ericssonSg03PickStatus = "Low";}
						var ericssonSg04PickStatus = "";
						if(ericssonSg04Percent === 0){ ericssonSg04PickStatus = "Zero";} else if (ericssonSg04Percent >= 20){ ericssonSg04PickStatus = "High";} else if (ericssonSg04Percent >= 10){ ericssonSg04PickStatus = "Medium";}  else { ericssonSg04PickStatus = "Low";}
						var ericssonSg05PickStatus = "";
						if(ericssonSg05Percent === 0){ ericssonSg05PickStatus = "Zero";} else if (ericssonSg05Percent >= 20){ ericssonSg05PickStatus = "High";} else if (ericssonSg05Percent >= 10){ ericssonSg05PickStatus = "Medium";}  else { ericssonSg05PickStatus = "Low";}
						var ericssonSg06PickStatus = "";
						if(ericssonSg06Percent === 0){ ericssonSg06PickStatus = "Zero";} else if (ericssonSg06Percent >= 20){ ericssonSg06PickStatus = "High";} else if (ericssonSg06Percent >= 10){ ericssonSg06PickStatus = "Medium";}  else { ericssonSg06PickStatus = "Low";}
						var ericssonSg07PickStatus = "";
						if(ericssonSg07Percent === 0){ ericssonSg07PickStatus = "Zero";} else if (ericssonSg07Percent >= 20){ ericssonSg07PickStatus = "High";} else if (ericssonSg07Percent >= 10){ ericssonSg07PickStatus = "Medium";}  else { ericssonSg07PickStatus = "Low";}
						var ericssonSg08PickStatus = "";
						if(ericssonSg08Percent === 0){ ericssonSg08PickStatus = "Zero";} else if (ericssonSg08Percent >= 20){ ericssonSg08PickStatus = "High";} else if (ericssonSg08Percent >= 10){ ericssonSg08PickStatus = "Medium";}  else { ericssonSg08PickStatus = "Low";}
						var ericssonSg09PickStatus = "";
						if(ericssonSg09Percent === 0){ ericssonSg09PickStatus = "Zero";} else if (ericssonSg09Percent >= 20){ ericssonSg09PickStatus = "High";} else if (ericssonSg09Percent >= 10){ ericssonSg09PickStatus = "Medium";}  else { ericssonSg09PickStatus = "Low";}
						var ericssonSg10PickStatus = "";
						if(ericssonSg10Percent === 0){ ericssonSg10PickStatus = "Zero";} else if (ericssonSg10Percent >= 20){ ericssonSg10PickStatus = "High";} else if (ericssonSg10Percent >= 10){ ericssonSg10PickStatus = "Medium";}  else { ericssonSg10PickStatus = "Low";}

						//Nasr
						var nasrSg01PickStatus = "";
						if(nasrSg01Percent === 0){ nasrSg01PickStatus = "Zero";} else if (nasrSg01Percent >= 20){ nasrSg01PickStatus = "High";} else if (nasrSg01Percent >= 10){ nasrSg01PickStatus = "Medium";}  else { nasrSg01PickStatus = "Low";}
						var nasrSg02PickStatus = "";
						if(nasrSg02Percent === 0){ nasrSg02PickStatus = "Zero";} else if (nasrSg02Percent >= 20){ nasrSg02PickStatus = "High";} else if (nasrSg02Percent >= 10){ nasrSg02PickStatus = "Medium";}  else { nasrSg02PickStatus = "Low";}
						var nasrSg03PickStatus = "";
						if(nasrSg03Percent === 0){ nasrSg03PickStatus = "Zero";} else if (nasrSg03Percent >= 20){ nasrSg03PickStatus = "High";} else if (nasrSg03Percent >= 10){ nasrSg03PickStatus = "Medium";}  else { nasrSg03PickStatus = "Low";}
						var nasrSg04PickStatus = "";
						if(nasrSg04Percent === 0){ nasrSg04PickStatus = "Zero";} else if (nasrSg04Percent >= 20){ nasrSg04PickStatus = "High";} else if (nasrSg04Percent >= 10){ nasrSg04PickStatus = "Medium";}  else { nasrSg04PickStatus = "Low";}
						var nasrSg05PickStatus = "";
						if(nasrSg05Percent === 0){ nasrSg05PickStatus = "Zero";} else if (nasrSg05Percent >= 20){ nasrSg05PickStatus = "High";} else if (nasrSg05Percent >= 10){ nasrSg05PickStatus = "Medium";}  else { nasrSg05PickStatus = "Low";}
						var nasrSg06PickStatus = "";
						if(nasrSg06Percent === 0){ nasrSg06PickStatus = "Zero";} else if (nasrSg06Percent >= 20){ nasrSg06PickStatus = "High";} else if (nasrSg06Percent >= 10){ nasrSg06PickStatus = "Medium";}  else { nasrSg06PickStatus = "Low";}
						var nasrSg07PickStatus = "";
						if(nasrSg07Percent === 0){ nasrSg07PickStatus = "Zero";} else if (nasrSg07Percent >= 20){ nasrSg07PickStatus = "High";} else if (nasrSg07Percent >= 10){ nasrSg07PickStatus = "Medium";}  else { nasrSg07PickStatus = "Low";}
						var nasrSg08PickStatus = "";
						if(nasrSg08Percent === 0){ nasrSg08PickStatus = "Zero";} else if (nasrSg08Percent >= 20){ nasrSg08PickStatus = "High";} else if (nasrSg08Percent >= 10){ nasrSg08PickStatus = "Medium";}  else { nasrSg08PickStatus = "Low";}
						var nasrSg09PickStatus = "";
						if(nasrSg09Percent === 0){ nasrSg09PickStatus = "Zero";} else if (nasrSg09Percent >= 20){ nasrSg09PickStatus = "High";} else if (nasrSg09Percent >= 10){ nasrSg09PickStatus = "Medium";}  else { nasrSg09PickStatus = "Low";}
						var nasrSg10PickStatus = "";
						if(nasrSg10Percent === 0){ nasrSg10PickStatus = "Zero";} else if (nasrSg10Percent >= 20){ nasrSg10PickStatus = "High";} else if (nasrSg10Percent >= 10){ nasrSg10PickStatus = "Medium";}  else { nasrSg10PickStatus = "Low";}

						//Alonso
						var alonsoSg01PickStatus = "";
						if(alonsoSg01Percent === 0){ alonsoSg01PickStatus = "Zero";} else if (alonsoSg01Percent >= 20){ alonsoSg01PickStatus = "High";} else if (alonsoSg01Percent >= 10){ alonsoSg01PickStatus = "Medium";}  else { alonsoSg01PickStatus = "Low";}
						var alonsoSg02PickStatus = "";
						if(alonsoSg02Percent === 0){ alonsoSg02PickStatus = "Zero";} else if (alonsoSg02Percent >= 20){ alonsoSg02PickStatus = "High";} else if (alonsoSg02Percent >= 10){ alonsoSg02PickStatus = "Medium";}  else { alonsoSg02PickStatus = "Low";}
						var alonsoSg03PickStatus = "";
						if(alonsoSg03Percent === 0){ alonsoSg03PickStatus = "Zero";} else if (alonsoSg03Percent >= 20){ alonsoSg03PickStatus = "High";} else if (alonsoSg03Percent >= 10){ alonsoSg03PickStatus = "Medium";}  else { alonsoSg03PickStatus = "Low";}
						var alonsoSg04PickStatus = "";
						if(alonsoSg04Percent === 0){ alonsoSg04PickStatus = "Zero";} else if (alonsoSg04Percent >= 20){ alonsoSg04PickStatus = "High";} else if (alonsoSg04Percent >= 10){ alonsoSg04PickStatus = "Medium";}  else { alonsoSg04PickStatus = "Low";}
						var alonsoSg05PickStatus = "";
						if(alonsoSg05Percent === 0){ alonsoSg05PickStatus = "Zero";} else if (alonsoSg05Percent >= 20){ alonsoSg05PickStatus = "High";} else if (alonsoSg05Percent >= 10){ alonsoSg05PickStatus = "Medium";}  else { alonsoSg05PickStatus = "Low";}
						var alonsoSg06PickStatus = "";
						if(alonsoSg06Percent === 0){ alonsoSg06PickStatus = "Zero";} else if (alonsoSg06Percent >= 20){ alonsoSg06PickStatus = "High";} else if (alonsoSg06Percent >= 10){ alonsoSg06PickStatus = "Medium";}  else { alonsoSg06PickStatus = "Low";}
						var alonsoSg07PickStatus = "";
						if(alonsoSg07Percent === 0){ alonsoSg07PickStatus = "Zero";} else if (alonsoSg07Percent >= 20){ alonsoSg07PickStatus = "High";} else if (alonsoSg07Percent >= 10){ alonsoSg07PickStatus = "Medium";}  else { alonsoSg07PickStatus = "Low";}
						var alonsoSg08PickStatus = "";
						if(alonsoSg08Percent === 0){ alonsoSg08PickStatus = "Zero";} else if (alonsoSg08Percent >= 20){ alonsoSg08PickStatus = "High";} else if (alonsoSg08Percent >= 10){ alonsoSg08PickStatus = "Medium";}  else { alonsoSg08PickStatus = "Low";}
						var alonsoSg09PickStatus = "";
						if(alonsoSg09Percent === 0){ alonsoSg09PickStatus = "Zero";} else if (alonsoSg09Percent >= 20){ alonsoSg09PickStatus = "High";} else if (alonsoSg09Percent >= 10){ alonsoSg09PickStatus = "Medium";}  else { alonsoSg09PickStatus = "Low";}
						var alonsoSg10PickStatus = "";
						if(alonsoSg10Percent === 0){ alonsoSg10PickStatus = "Zero";} else if (alonsoSg10Percent >= 20){ alonsoSg10PickStatus = "High";} else if (alonsoSg10Percent >= 10){ alonsoSg10PickStatus = "Medium";}  else { alonsoSg10PickStatus = "Low";}

						//Button
						var buttonSg01PickStatus = "";
						if(buttonSg01Percent === 0){ buttonSg01PickStatus = "Zero";} else if (buttonSg01Percent >= 20){ buttonSg01PickStatus = "High";} else if (buttonSg01Percent >= 10){ buttonSg01PickStatus = "Medium";}  else { buttonSg01PickStatus = "Low";}
						var buttonSg02PickStatus = "";
						if(buttonSg02Percent === 0){ buttonSg02PickStatus = "Zero";} else if (buttonSg02Percent >= 20){ buttonSg02PickStatus = "High";} else if (buttonSg02Percent >= 10){ buttonSg02PickStatus = "Medium";}  else { buttonSg02PickStatus = "Low";}
						var buttonSg03PickStatus = "";
						if(buttonSg03Percent === 0){ buttonSg03PickStatus = "Zero";} else if (buttonSg03Percent >= 20){ buttonSg03PickStatus = "High";} else if (buttonSg03Percent >= 10){ buttonSg03PickStatus = "Medium";}  else { buttonSg03PickStatus = "Low";}
						var buttonSg04PickStatus = "";
						if(buttonSg04Percent === 0){ buttonSg04PickStatus = "Zero";} else if (buttonSg04Percent >= 20){ buttonSg04PickStatus = "High";} else if (buttonSg04Percent >= 10){ buttonSg04PickStatus = "Medium";}  else { buttonSg04PickStatus = "Low";}
						var buttonSg05PickStatus = "";
						if(buttonSg05Percent === 0){ buttonSg05PickStatus = "Zero";} else if (buttonSg05Percent >= 20){ buttonSg05PickStatus = "High";} else if (buttonSg05Percent >= 10){ buttonSg05PickStatus = "Medium";}  else { buttonSg05PickStatus = "Low";}
						var buttonSg06PickStatus = "";
						if(buttonSg06Percent === 0){ buttonSg06PickStatus = "Zero";} else if (buttonSg06Percent >= 20){ buttonSg06PickStatus = "High";} else if (buttonSg06Percent >= 10){ buttonSg06PickStatus = "Medium";}  else { buttonSg06PickStatus = "Low";}
						var buttonSg07PickStatus = "";
						if(buttonSg07Percent === 0){ buttonSg07PickStatus = "Zero";} else if (buttonSg07Percent >= 20){ buttonSg07PickStatus = "High";} else if (buttonSg07Percent >= 10){ buttonSg07PickStatus = "Medium";}  else { buttonSg07PickStatus = "Low";}
						var buttonSg08PickStatus = "";
						if(buttonSg08Percent === 0){ buttonSg08PickStatus = "Zero";} else if (buttonSg08Percent >= 20){ buttonSg08PickStatus = "High";} else if (buttonSg08Percent >= 10){ buttonSg08PickStatus = "Medium";}  else { buttonSg08PickStatus = "Low";}
						var buttonSg09PickStatus = "";
						if(buttonSg09Percent === 0){ buttonSg09PickStatus = "Zero";} else if (buttonSg09Percent >= 20){ buttonSg09PickStatus = "High";} else if (buttonSg09Percent >= 10){ buttonSg09PickStatus = "Medium";}  else { buttonSg09PickStatus = "Low";}
						var buttonSg10PickStatus = "";
						if(buttonSg10Percent === 0){ buttonSg10PickStatus = "Zero";} else if (buttonSg10Percent >= 20){ buttonSg10PickStatus = "High";} else if (buttonSg10Percent >= 10){ buttonSg10PickStatus = "Medium";}  else { buttonSg10PickStatus = "Low";}

						//Stevens
						var stevensSg01PickStatus = "";
						if(stevensSg01Percent === 0){ stevensSg01PickStatus = "Zero";} else if (stevensSg01Percent >= 20){ stevensSg01PickStatus = "High";} else if (stevensSg01Percent >= 10){ stevensSg01PickStatus = "Medium";}  else { stevensSg01PickStatus = "Low";}
						var stevensSg02PickStatus = "";
						if(stevensSg02Percent === 0){ stevensSg02PickStatus = "Zero";} else if (stevensSg02Percent >= 20){ stevensSg02PickStatus = "High";} else if (stevensSg02Percent >= 10){ stevensSg02PickStatus = "Medium";}  else { stevensSg02PickStatus = "Low";}
						var stevensSg03PickStatus = "";
						if(stevensSg03Percent === 0){ stevensSg03PickStatus = "Zero";} else if (stevensSg03Percent >= 20){ stevensSg03PickStatus = "High";} else if (stevensSg03Percent >= 10){ stevensSg03PickStatus = "Medium";}  else { stevensSg03PickStatus = "Low";}
						var stevensSg04PickStatus = "";
						if(stevensSg04Percent === 0){ stevensSg04PickStatus = "Zero";} else if (stevensSg04Percent >= 20){ stevensSg04PickStatus = "High";} else if (stevensSg04Percent >= 10){ stevensSg04PickStatus = "Medium";}  else { stevensSg04PickStatus = "Low";}
						var stevensSg05PickStatus = "";
						if(stevensSg05Percent === 0){ stevensSg05PickStatus = "Zero";} else if (stevensSg05Percent >= 20){ stevensSg05PickStatus = "High";} else if (stevensSg05Percent >= 10){ stevensSg05PickStatus = "Medium";}  else { stevensSg05PickStatus = "Low";}
						var stevensSg06PickStatus = "";
						if(stevensSg06Percent === 0){ stevensSg06PickStatus = "Zero";} else if (stevensSg06Percent >= 20){ stevensSg06PickStatus = "High";} else if (stevensSg06Percent >= 10){ stevensSg06PickStatus = "Medium";}  else { stevensSg06PickStatus = "Low";}
						var stevensSg07PickStatus = "";
						if(stevensSg07Percent === 0){ stevensSg07PickStatus = "Zero";} else if (stevensSg07Percent >= 20){ stevensSg07PickStatus = "High";} else if (stevensSg07Percent >= 10){ stevensSg07PickStatus = "Medium";}  else { stevensSg07PickStatus = "Low";}
						var stevensSg08PickStatus = "";
						if(stevensSg08Percent === 0){ stevensSg08PickStatus = "Zero";} else if (stevensSg08Percent >= 20){ stevensSg08PickStatus = "High";} else if (stevensSg08Percent >= 10){ stevensSg08PickStatus = "Medium";}  else { stevensSg08PickStatus = "Low";}
						var stevensSg09PickStatus = "";
						if(stevensSg09Percent === 0){ stevensSg09PickStatus = "Zero";} else if (stevensSg09Percent >= 20){ stevensSg09PickStatus = "High";} else if (stevensSg09Percent >= 10){ stevensSg09PickStatus = "Medium";}  else { stevensSg09PickStatus = "Low";}
						var stevensSg10PickStatus = "";
						if(stevensSg10Percent === 0){ stevensSg10PickStatus = "Zero";} else if (stevensSg10Percent >= 20){ stevensSg10PickStatus = "High";} else if (stevensSg10Percent >= 10){ stevensSg10PickStatus = "Medium";}  else { stevensSg10PickStatus = "Low";}

						//Merhi
						var merhiSg01PickStatus = "";
						if(merhiSg01Percent === 0){ merhiSg01PickStatus = "Zero";} else if (merhiSg01Percent >= 20){ merhiSg01PickStatus = "High";} else if (merhiSg01Percent >= 10){ merhiSg01PickStatus = "Medium";}  else { merhiSg01PickStatus = "Low";}
						var merhiSg02PickStatus = "";
						if(merhiSg02Percent === 0){ merhiSg02PickStatus = "Zero";} else if (merhiSg02Percent >= 20){ merhiSg02PickStatus = "High";} else if (merhiSg02Percent >= 10){ merhiSg02PickStatus = "Medium";}  else { merhiSg02PickStatus = "Low";}
						var merhiSg03PickStatus = "";
						if(merhiSg03Percent === 0){ merhiSg03PickStatus = "Zero";} else if (merhiSg03Percent >= 20){ merhiSg03PickStatus = "High";} else if (merhiSg03Percent >= 10){ merhiSg03PickStatus = "Medium";}  else { merhiSg03PickStatus = "Low";}
						var merhiSg04PickStatus = "";
						if(merhiSg04Percent === 0){ merhiSg04PickStatus = "Zero";} else if (merhiSg04Percent >= 20){ merhiSg04PickStatus = "High";} else if (merhiSg04Percent >= 10){ merhiSg04PickStatus = "Medium";}  else { merhiSg04PickStatus = "Low";}
						var merhiSg05PickStatus = "";
						if(merhiSg05Percent === 0){ merhiSg05PickStatus = "Zero";} else if (merhiSg05Percent >= 20){ merhiSg05PickStatus = "High";} else if (merhiSg05Percent >= 10){ merhiSg05PickStatus = "Medium";}  else { merhiSg05PickStatus = "Low";}
						var merhiSg06PickStatus = "";
						if(merhiSg06Percent === 0){ merhiSg06PickStatus = "Zero";} else if (merhiSg06Percent >= 20){ merhiSg06PickStatus = "High";} else if (merhiSg06Percent >= 10){ merhiSg06PickStatus = "Medium";}  else { merhiSg06PickStatus = "Low";}
						var merhiSg07PickStatus = "";
						if(merhiSg07Percent === 0){ merhiSg07PickStatus = "Zero";} else if (merhiSg07Percent >= 20){ merhiSg07PickStatus = "High";} else if (merhiSg07Percent >= 10){ merhiSg07PickStatus = "Medium";}  else { merhiSg07PickStatus = "Low";}
						var merhiSg08PickStatus = "";
						if(merhiSg08Percent === 0){ merhiSg08PickStatus = "Zero";} else if (merhiSg08Percent >= 20){ merhiSg08PickStatus = "High";} else if (merhiSg08Percent >= 10){ merhiSg08PickStatus = "Medium";}  else { merhiSg08PickStatus = "Low";}
						var merhiSg09PickStatus = "";
						if(merhiSg09Percent === 0){ merhiSg09PickStatus = "Zero";} else if (merhiSg09Percent >= 20){ merhiSg09PickStatus = "High";} else if (merhiSg09Percent >= 10){ merhiSg09PickStatus = "Medium";}  else { merhiSg09PickStatus = "Low";}
						var merhiSg10PickStatus = "";
						if(merhiSg10Percent === 0){ merhiSg10PickStatus = "Zero";} else if (merhiSg10Percent >= 20){ merhiSg10PickStatus = "High";} else if (merhiSg10Percent >= 10){ merhiSg10PickStatus = "Medium";}  else { merhiSg10PickStatus = "Low";}

						//Here are the IF statements to determine the points "paid" by each driver in each position
						//Hamilton
						var hamiltonOne;
						if (hamiltonSg01PickStatus === "Zero") { hamiltonOne = 0;}
						if (hamiltonSg01PickStatus === "High"   && hamiltonStatus === "Favorite"){ hamiltonOne = 4;}
						if (hamiltonSg01PickStatus === "High"   && hamiltonStatus === "Very Likely"){ hamiltonOne = 8;}
						if (hamiltonSg01PickStatus === "High"   && hamiltonStatus === "Less Likely"){ hamiltonOne = 12;}
						if (hamiltonSg01PickStatus === "High"   && hamiltonStatus === "Underdog"){ hamiltonOne = 16;}
						if (hamiltonSg01PickStatus === "Medium" && hamiltonStatus === "Favorite"){ hamiltonOne = 6;}
						if (hamiltonSg01PickStatus === "Medium" && hamiltonStatus === "Very Likely"){ hamiltonOne = 10;}
						if (hamiltonSg01PickStatus === "Medium" && hamiltonStatus === "Less Likely"){ hamiltonOne = 14;}
						if (hamiltonSg01PickStatus === "Medium" && hamiltonStatus === "Underdog"){ hamiltonOne = 18;}
						if (hamiltonSg01PickStatus === "Low"    && hamiltonStatus === "Favorite"){ hamiltonOne = 8;}
						if (hamiltonSg01PickStatus === "Low"    && hamiltonStatus === "Very Likely"){ hamiltonOne = 12;}
						if (hamiltonSg01PickStatus === "Low"    && hamiltonStatus === "Less Likely"){ hamiltonOne = 16;}
						if (hamiltonSg01PickStatus === "Low"    && hamiltonStatus === "Underdog"){ hamiltonOne = 20;}

						var hamiltonTwo;
						if (hamiltonSg02PickStatus === "Zero") { hamiltonTwo = 0;}
						if (hamiltonSg02PickStatus === "High"   && hamiltonStatus === "Favorite"){ hamiltonTwo = 4;}
						if (hamiltonSg02PickStatus === "High"   && hamiltonStatus === "Very Likely"){ hamiltonTwo = 8;}
						if (hamiltonSg02PickStatus === "High"   && hamiltonStatus === "Less Likely"){ hamiltonTwo = 12;}
						if (hamiltonSg02PickStatus === "High"   && hamiltonStatus === "Underdog"){ hamiltonTwo = 16;}
						if (hamiltonSg02PickStatus === "Medium" && hamiltonStatus === "Favorite"){ hamiltonTwo = 6;}
						if (hamiltonSg02PickStatus === "Medium" && hamiltonStatus === "Very Likely"){ hamiltonTwo = 10;}
						if (hamiltonSg02PickStatus === "Medium" && hamiltonStatus === "Less Likely"){ hamiltonTwo = 14;}
						if (hamiltonSg02PickStatus === "Medium" && hamiltonStatus === "Underdog"){ hamiltonTwo = 18;}
						if (hamiltonSg02PickStatus === "Low"    && hamiltonStatus === "Favorite"){ hamiltonTwo = 8;}
						if (hamiltonSg02PickStatus === "Low"    && hamiltonStatus === "Very Likely"){ hamiltonTwo = 12;}
						if (hamiltonSg02PickStatus === "Low"    && hamiltonStatus === "Less Likely"){ hamiltonTwo = 16;}
						if (hamiltonSg02PickStatus === "Low"    && hamiltonStatus === "Underdog"){ hamiltonTwo = 20;}

						var hamiltonThree;
						if (hamiltonSg03PickStatus === "Zero") { hamiltonThree = 0;}
						if (hamiltonSg03PickStatus === "High"   && hamiltonStatus === "Favorite"){ hamiltonThree = 4;}
						if (hamiltonSg03PickStatus === "High"   && hamiltonStatus === "Very Likely"){ hamiltonThree = 8;}
						if (hamiltonSg03PickStatus === "High"   && hamiltonStatus === "Less Likely"){ hamiltonThree = 12;}
						if (hamiltonSg03PickStatus === "High"   && hamiltonStatus === "Underdog"){ hamiltonThree = 16;}
						if (hamiltonSg03PickStatus === "Medium" && hamiltonStatus === "Favorite"){ hamiltonThree = 6;}
						if (hamiltonSg03PickStatus === "Medium" && hamiltonStatus === "Very Likely"){ hamiltonThree = 10;}
						if (hamiltonSg03PickStatus === "Medium" && hamiltonStatus === "Less Likely"){ hamiltonThree = 14;}
						if (hamiltonSg03PickStatus === "Medium" && hamiltonStatus === "Underdog"){ hamiltonThree = 18;}
						if (hamiltonSg03PickStatus === "Low"    && hamiltonStatus === "Favorite"){ hamiltonThree = 8;}
						if (hamiltonSg03PickStatus === "Low"    && hamiltonStatus === "Very Likely"){ hamiltonThree = 12;}
						if (hamiltonSg03PickStatus === "Low"    && hamiltonStatus === "Less Likely"){ hamiltonThree = 16;}
						if (hamiltonSg03PickStatus === "Low"    && hamiltonStatus === "Underdog"){ hamiltonThree = 20;}

						var hamiltonFour;
						if (hamiltonSg04PickStatus === "Zero") { hamiltonFour = 0;}
						if (hamiltonSg04PickStatus === "High"   && hamiltonStatus === "Favorite"){ hamiltonFour = 4;}
						if (hamiltonSg04PickStatus === "High"   && hamiltonStatus === "Very Likely"){ hamiltonFour = 8;}
						if (hamiltonSg04PickStatus === "High"   && hamiltonStatus === "Less Likely"){ hamiltonFour = 12;}
						if (hamiltonSg04PickStatus === "High"   && hamiltonStatus === "Underdog"){ hamiltonFour = 16;}
						if (hamiltonSg04PickStatus === "Medium" && hamiltonStatus === "Favorite"){ hamiltonFour = 6;}
						if (hamiltonSg04PickStatus === "Medium" && hamiltonStatus === "Very Likely"){ hamiltonFour = 10;}
						if (hamiltonSg04PickStatus === "Medium" && hamiltonStatus === "Less Likely"){ hamiltonFour = 14;}
						if (hamiltonSg04PickStatus === "Medium" && hamiltonStatus === "Underdog"){ hamiltonFour = 18;}
						if (hamiltonSg04PickStatus === "Low"    && hamiltonStatus === "Favorite"){ hamiltonFour = 8;}
						if (hamiltonSg04PickStatus === "Low"    && hamiltonStatus === "Very Likely"){ hamiltonFour = 12;}
						if (hamiltonSg04PickStatus === "Low"    && hamiltonStatus === "Less Likely"){ hamiltonFour = 16;}
						if (hamiltonSg04PickStatus === "Low"    && hamiltonStatus === "Underdog"){ hamiltonFour = 20;}

						var hamiltonFive;
						if (hamiltonSg05PickStatus === "Zero") { hamiltonFive = 0;}
						if (hamiltonSg05PickStatus === "High"   && hamiltonStatus === "Favorite"){ hamiltonFive = 4;}
						if (hamiltonSg05PickStatus === "High"   && hamiltonStatus === "Very Likely"){ hamiltonFive = 8;}
						if (hamiltonSg05PickStatus === "High"   && hamiltonStatus === "Less Likely"){ hamiltonFive = 12;}
						if (hamiltonSg05PickStatus === "High"   && hamiltonStatus === "Underdog"){ hamiltonFive = 16;}
						if (hamiltonSg05PickStatus === "Medium" && hamiltonStatus === "Favorite"){ hamiltonFive = 6;}
						if (hamiltonSg05PickStatus === "Medium" && hamiltonStatus === "Very Likely"){ hamiltonFive = 10;}
						if (hamiltonSg05PickStatus === "Medium" && hamiltonStatus === "Less Likely"){ hamiltonFive = 14;}
						if (hamiltonSg05PickStatus === "Medium" && hamiltonStatus === "Underdog"){ hamiltonFive = 18;}
						if (hamiltonSg05PickStatus === "Low"    && hamiltonStatus === "Favorite"){ hamiltonFive = 8;}
						if (hamiltonSg05PickStatus === "Low"    && hamiltonStatus === "Very Likely"){ hamiltonFive = 12;}
						if (hamiltonSg05PickStatus === "Low"    && hamiltonStatus === "Less Likely"){ hamiltonFive = 16;}
						if (hamiltonSg05PickStatus === "Low"    && hamiltonStatus === "Underdog"){ hamiltonFive = 20;}

						var hamiltonSix;
						if (hamiltonSg06PickStatus === "Zero") { hamiltonSix = 0;}
						if (hamiltonSg06PickStatus === "High"   && hamiltonStatus === "Favorite"){ hamiltonSix = 4;}
						if (hamiltonSg06PickStatus === "High"   && hamiltonStatus === "Very Likely"){ hamiltonSix = 8;}
						if (hamiltonSg06PickStatus === "High"   && hamiltonStatus === "Less Likely"){ hamiltonSix = 12;}
						if (hamiltonSg06PickStatus === "High"   && hamiltonStatus === "Underdog"){ hamiltonSix = 16;}
						if (hamiltonSg06PickStatus === "Medium" && hamiltonStatus === "Favorite"){ hamiltonSix = 6;}
						if (hamiltonSg06PickStatus === "Medium" && hamiltonStatus === "Very Likely"){ hamiltonSix = 10;}
						if (hamiltonSg06PickStatus === "Medium" && hamiltonStatus === "Less Likely"){ hamiltonSix = 14;}
						if (hamiltonSg06PickStatus === "Medium" && hamiltonStatus === "Underdog"){ hamiltonSix = 18;}
						if (hamiltonSg06PickStatus === "Low"    && hamiltonStatus === "Favorite"){ hamiltonSix = 8;}
						if (hamiltonSg06PickStatus === "Low"    && hamiltonStatus === "Very Likely"){ hamiltonSix = 12;}
						if (hamiltonSg06PickStatus === "Low"    && hamiltonStatus === "Less Likely"){ hamiltonSix = 16;}
						if (hamiltonSg06PickStatus === "Low"    && hamiltonStatus === "Underdog"){ hamiltonSix = 20;}

						var hamiltonSeven;
						if (hamiltonSg07PickStatus === "Zero") { hamiltonSeven = 0;}
						if (hamiltonSg07PickStatus === "High"   && hamiltonStatus === "Favorite"){ hamiltonSeven = 4;}
						if (hamiltonSg07PickStatus === "High"   && hamiltonStatus === "Very Likely"){ hamiltonSeven = 8;}
						if (hamiltonSg07PickStatus === "High"   && hamiltonStatus === "Less Likely"){ hamiltonSeven = 12;}
						if (hamiltonSg07PickStatus === "High"   && hamiltonStatus === "Underdog"){ hamiltonSeven = 16;}
						if (hamiltonSg07PickStatus === "Medium" && hamiltonStatus === "Favorite"){ hamiltonSeven = 6;}
						if (hamiltonSg07PickStatus === "Medium" && hamiltonStatus === "Very Likely"){ hamiltonSeven = 10;}
						if (hamiltonSg07PickStatus === "Medium" && hamiltonStatus === "Less Likely"){ hamiltonSeven = 14;}
						if (hamiltonSg07PickStatus === "Medium" && hamiltonStatus === "Underdog"){ hamiltonSeven = 18;}
						if (hamiltonSg07PickStatus === "Low"    && hamiltonStatus === "Favorite"){ hamiltonSeven = 8;}
						if (hamiltonSg07PickStatus === "Low"    && hamiltonStatus === "Very Likely"){ hamiltonSeven = 12;}
						if (hamiltonSg07PickStatus === "Low"    && hamiltonStatus === "Less Likely"){ hamiltonSeven = 16;}
						if (hamiltonSg07PickStatus === "Low"    && hamiltonStatus === "Underdog"){ hamiltonSeven = 20;}

						var hamiltonEight;
						if (hamiltonSg08PickStatus === "Zero") { hamiltonEight = 0;}
						if (hamiltonSg08PickStatus === "High"   && hamiltonStatus === "Favorite"){ hamiltonEight = 4;}
						if (hamiltonSg08PickStatus === "High"   && hamiltonStatus === "Very Likely"){ hamiltonEight = 8;}
						if (hamiltonSg08PickStatus === "High"   && hamiltonStatus === "Less Likely"){ hamiltonEight = 12;}
						if (hamiltonSg08PickStatus === "High"   && hamiltonStatus === "Underdog"){ hamiltonEight = 16;}
						if (hamiltonSg08PickStatus === "Medium" && hamiltonStatus === "Favorite"){ hamiltonEight = 6;}
						if (hamiltonSg08PickStatus === "Medium" && hamiltonStatus === "Very Likely"){ hamiltonEight = 10;}
						if (hamiltonSg08PickStatus === "Medium" && hamiltonStatus === "Less Likely"){ hamiltonEight = 14;}
						if (hamiltonSg08PickStatus === "Medium" && hamiltonStatus === "Underdog"){ hamiltonEight = 18;}
						if (hamiltonSg08PickStatus === "Low"    && hamiltonStatus === "Favorite"){ hamiltonEight = 8;}
						if (hamiltonSg08PickStatus === "Low"    && hamiltonStatus === "Very Likely"){ hamiltonEight = 12;}
						if (hamiltonSg08PickStatus === "Low"    && hamiltonStatus === "Less Likely"){ hamiltonEight = 16;}
						if (hamiltonSg08PickStatus === "Low"    && hamiltonStatus === "Underdog"){ hamiltonEight = 20;}

						var hamiltonNine;
						if (hamiltonSg09PickStatus === "Zero") { hamiltonNine = 0;}
						if (hamiltonSg09PickStatus === "High"   && hamiltonStatus === "Favorite"){ hamiltonNine = 4;}
						if (hamiltonSg09PickStatus === "High"   && hamiltonStatus === "Very Likely"){ hamiltonNine = 8;}
						if (hamiltonSg09PickStatus === "High"   && hamiltonStatus === "Less Likely"){ hamiltonNine = 12;}
						if (hamiltonSg09PickStatus === "High"   && hamiltonStatus === "Underdog"){ hamiltonNine = 16;}
						if (hamiltonSg09PickStatus === "Medium" && hamiltonStatus === "Favorite"){ hamiltonNine = 6;}
						if (hamiltonSg09PickStatus === "Medium" && hamiltonStatus === "Very Likely"){ hamiltonNine = 10;}
						if (hamiltonSg09PickStatus === "Medium" && hamiltonStatus === "Less Likely"){ hamiltonNine = 14;}
						if (hamiltonSg09PickStatus === "Medium" && hamiltonStatus === "Underdog"){ hamiltonNine = 18;}
						if (hamiltonSg09PickStatus === "Low"    && hamiltonStatus === "Favorite"){ hamiltonNine = 8;}
						if (hamiltonSg09PickStatus === "Low"    && hamiltonStatus === "Very Likely"){ hamiltonNine = 12;}
						if (hamiltonSg09PickStatus === "Low"    && hamiltonStatus === "Less Likely"){ hamiltonNine = 16;}
						if (hamiltonSg09PickStatus === "Low"    && hamiltonStatus === "Underdog"){ hamiltonNine = 20;}

						var hamiltonTen;
						if (hamiltonSg10PickStatus === "Zero") { hamiltonTen = 0;}
						if (hamiltonSg10PickStatus === "High"   && hamiltonStatus === "Favorite"){ hamiltonTen = 4;}
						if (hamiltonSg10PickStatus === "High"   && hamiltonStatus === "Very Likely"){ hamiltonTen = 8;}
						if (hamiltonSg10PickStatus === "High"   && hamiltonStatus === "Less Likely"){ hamiltonTen = 12;}
						if (hamiltonSg10PickStatus === "High"   && hamiltonStatus === "Underdog"){ hamiltonTen = 16;}
						if (hamiltonSg10PickStatus === "Medium" && hamiltonStatus === "Favorite"){ hamiltonTen = 6;}
						if (hamiltonSg10PickStatus === "Medium" && hamiltonStatus === "Very Likely"){ hamiltonTen = 10;}
						if (hamiltonSg10PickStatus === "Medium" && hamiltonStatus === "Less Likely"){ hamiltonTen = 14;}
						if (hamiltonSg10PickStatus === "Medium" && hamiltonStatus === "Underdog"){ hamiltonTen = 18;}
						if (hamiltonSg10PickStatus === "Low"    && hamiltonStatus === "Favorite"){ hamiltonTen = 8;}
						if (hamiltonSg10PickStatus === "Low"    && hamiltonStatus === "Very Likely"){ hamiltonTen = 12;}
						if (hamiltonSg10PickStatus === "Low"    && hamiltonStatus === "Less Likely"){ hamiltonTen = 16;}
						if (hamiltonSg10PickStatus === "Low"    && hamiltonStatus === "Underdog"){ hamiltonTen = 20;}

						//Rosberg
						var rosbergOne;
						if (rosbergSg01PickStatus === "Zero") { rosbergOne = 0;}
						if (rosbergSg01PickStatus === "High"   && rosbergStatus === "Favorite"){ rosbergOne = 4;}
						if (rosbergSg01PickStatus === "High"   && rosbergStatus === "Very Likely"){ rosbergOne = 8;}
						if (rosbergSg01PickStatus === "High"   && rosbergStatus === "Less Likely"){ rosbergOne = 12;}
						if (rosbergSg01PickStatus === "High"   && rosbergStatus === "Underdog"){ rosbergOne = 16;}
						if (rosbergSg01PickStatus === "Medium" && rosbergStatus === "Favorite"){ rosbergOne = 6;}
						if (rosbergSg01PickStatus === "Medium" && rosbergStatus === "Very Likely"){ rosbergOne = 10;}
						if (rosbergSg01PickStatus === "Medium" && rosbergStatus === "Less Likely"){ rosbergOne = 14;}
						if (rosbergSg01PickStatus === "Medium" && rosbergStatus === "Underdog"){ rosbergOne = 18;}
						if (rosbergSg01PickStatus === "Low"    && rosbergStatus === "Favorite"){ rosbergOne = 8;}
						if (rosbergSg01PickStatus === "Low"    && rosbergStatus === "Very Likely"){ rosbergOne = 12;}
						if (rosbergSg01PickStatus === "Low"    && rosbergStatus === "Less Likely"){ rosbergOne = 16;}
						if (rosbergSg01PickStatus === "Low"    && rosbergStatus === "Underdog"){ rosbergOne = 20;}

						var rosbergTwo;
						if (rosbergSg02PickStatus === "Zero") { rosbergTwo = 0;}
						if (rosbergSg02PickStatus === "High"   && rosbergStatus === "Favorite"){ rosbergTwo = 4;}
						if (rosbergSg02PickStatus === "High"   && rosbergStatus === "Very Likely"){ rosbergTwo = 8;}
						if (rosbergSg02PickStatus === "High"   && rosbergStatus === "Less Likely"){ rosbergTwo = 12;}
						if (rosbergSg02PickStatus === "High"   && rosbergStatus === "Underdog"){ rosbergTwo = 16;}
						if (rosbergSg02PickStatus === "Medium" && rosbergStatus === "Favorite"){ rosbergTwo = 6;}
						if (rosbergSg02PickStatus === "Medium" && rosbergStatus === "Very Likely"){ rosbergTwo = 10;}
						if (rosbergSg02PickStatus === "Medium" && rosbergStatus === "Less Likely"){ rosbergTwo = 14;}
						if (rosbergSg02PickStatus === "Medium" && rosbergStatus === "Underdog"){ rosbergTwo = 18;}
						if (rosbergSg02PickStatus === "Low"    && rosbergStatus === "Favorite"){ rosbergTwo = 8;}
						if (rosbergSg02PickStatus === "Low"    && rosbergStatus === "Very Likely"){ rosbergTwo = 12;}
						if (rosbergSg02PickStatus === "Low"    && rosbergStatus === "Less Likely"){ rosbergTwo = 16;}
						if (rosbergSg02PickStatus === "Low"    && rosbergStatus === "Underdog"){ rosbergTwo = 20;}

						var rosbergThree;
						if (rosbergSg03PickStatus === "Zero") { rosbergThree = 0;}
						if (rosbergSg03PickStatus === "High"   && rosbergStatus === "Favorite"){ rosbergThree = 4;}
						if (rosbergSg03PickStatus === "High"   && rosbergStatus === "Very Likely"){ rosbergThree = 8;}
						if (rosbergSg03PickStatus === "High"   && rosbergStatus === "Less Likely"){ rosbergThree = 12;}
						if (rosbergSg03PickStatus === "High"   && rosbergStatus === "Underdog"){ rosbergThree = 16;}
						if (rosbergSg03PickStatus === "Medium" && rosbergStatus === "Favorite"){ rosbergThree = 6;}
						if (rosbergSg03PickStatus === "Medium" && rosbergStatus === "Very Likely"){ rosbergThree = 10;}
						if (rosbergSg03PickStatus === "Medium" && rosbergStatus === "Less Likely"){ rosbergThree = 14;}
						if (rosbergSg03PickStatus === "Medium" && rosbergStatus === "Underdog"){ rosbergThree = 18;}
						if (rosbergSg03PickStatus === "Low"    && rosbergStatus === "Favorite"){ rosbergThree = 8;}
						if (rosbergSg03PickStatus === "Low"    && rosbergStatus === "Very Likely"){ rosbergThree = 12;}
						if (rosbergSg03PickStatus === "Low"    && rosbergStatus === "Less Likely"){ rosbergThree = 16;}
						if (rosbergSg03PickStatus === "Low"    && rosbergStatus === "Underdog"){ rosbergThree = 20;}

						var rosbergFour;
						if (rosbergSg04PickStatus === "Zero") { rosbergFour = 0;}
						if (rosbergSg04PickStatus === "High"   && rosbergStatus === "Favorite"){ rosbergFour = 4;}
						if (rosbergSg04PickStatus === "High"   && rosbergStatus === "Very Likely"){ rosbergFour = 8;}
						if (rosbergSg04PickStatus === "High"   && rosbergStatus === "Less Likely"){ rosbergFour = 12;}
						if (rosbergSg04PickStatus === "High"   && rosbergStatus === "Underdog"){ rosbergFour = 16;}
						if (rosbergSg04PickStatus === "Medium" && rosbergStatus === "Favorite"){ rosbergFour = 6;}
						if (rosbergSg04PickStatus === "Medium" && rosbergStatus === "Very Likely"){ rosbergFour = 10;}
						if (rosbergSg04PickStatus === "Medium" && rosbergStatus === "Less Likely"){ rosbergFour = 14;}
						if (rosbergSg04PickStatus === "Medium" && rosbergStatus === "Underdog"){ rosbergFour = 18;}
						if (rosbergSg04PickStatus === "Low"    && rosbergStatus === "Favorite"){ rosbergFour = 8;}
						if (rosbergSg04PickStatus === "Low"    && rosbergStatus === "Very Likely"){ rosbergFour = 12;}
						if (rosbergSg04PickStatus === "Low"    && rosbergStatus === "Less Likely"){ rosbergFour = 16;}
						if (rosbergSg04PickStatus === "Low"    && rosbergStatus === "Underdog"){ rosbergFour = 20;}

						var rosbergFive;
						if (rosbergSg05PickStatus === "Zero") { rosbergFive = 0;}
						if (rosbergSg05PickStatus === "High"   && rosbergStatus === "Favorite"){ rosbergFive = 4;}
						if (rosbergSg05PickStatus === "High"   && rosbergStatus === "Very Likely"){ rosbergFive = 8;}
						if (rosbergSg05PickStatus === "High"   && rosbergStatus === "Less Likely"){ rosbergFive = 12;}
						if (rosbergSg05PickStatus === "High"   && rosbergStatus === "Underdog"){ rosbergFive = 16;}
						if (rosbergSg05PickStatus === "Medium" && rosbergStatus === "Favorite"){ rosbergFive = 6;}
						if (rosbergSg05PickStatus === "Medium" && rosbergStatus === "Very Likely"){ rosbergFive = 10;}
						if (rosbergSg05PickStatus === "Medium" && rosbergStatus === "Less Likely"){ rosbergFive = 14;}
						if (rosbergSg05PickStatus === "Medium" && rosbergStatus === "Underdog"){ rosbergFive = 18;}
						if (rosbergSg05PickStatus === "Low"    && rosbergStatus === "Favorite"){ rosbergFive = 8;}
						if (rosbergSg05PickStatus === "Low"    && rosbergStatus === "Very Likely"){ rosbergFive = 12;}
						if (rosbergSg05PickStatus === "Low"    && rosbergStatus === "Less Likely"){ rosbergFive = 16;}
						if (rosbergSg05PickStatus === "Low"    && rosbergStatus === "Underdog"){ rosbergFive = 20;}

						var rosbergSix;
						if (rosbergSg06PickStatus === "Zero") { rosbergSix = 0;}
						if (rosbergSg06PickStatus === "High"   && rosbergStatus === "Favorite"){ rosbergSix = 4;}
						if (rosbergSg06PickStatus === "High"   && rosbergStatus === "Very Likely"){ rosbergSix = 8;}
						if (rosbergSg06PickStatus === "High"   && rosbergStatus === "Less Likely"){ rosbergSix = 12;}
						if (rosbergSg06PickStatus === "High"   && rosbergStatus === "Underdog"){ rosbergSix = 16;}
						if (rosbergSg06PickStatus === "Medium" && rosbergStatus === "Favorite"){ rosbergSix = 6;}
						if (rosbergSg06PickStatus === "Medium" && rosbergStatus === "Very Likely"){ rosbergSix = 10;}
						if (rosbergSg06PickStatus === "Medium" && rosbergStatus === "Less Likely"){ rosbergSix = 14;}
						if (rosbergSg06PickStatus === "Medium" && rosbergStatus === "Underdog"){ rosbergSix = 18;}
						if (rosbergSg06PickStatus === "Low"    && rosbergStatus === "Favorite"){ rosbergSix = 8;}
						if (rosbergSg06PickStatus === "Low"    && rosbergStatus === "Very Likely"){ rosbergSix = 12;}
						if (rosbergSg06PickStatus === "Low"    && rosbergStatus === "Less Likely"){ rosbergSix = 16;}
						if (rosbergSg06PickStatus === "Low"    && rosbergStatus === "Underdog"){ rosbergSix = 20;}

						var rosbergSeven;
						if (rosbergSg07PickStatus === "Zero") { rosbergSeven = 0;}
						if (rosbergSg07PickStatus === "High"   && rosbergStatus === "Favorite"){ rosbergSeven = 4;}
						if (rosbergSg07PickStatus === "High"   && rosbergStatus === "Very Likely"){ rosbergSeven = 8;}
						if (rosbergSg07PickStatus === "High"   && rosbergStatus === "Less Likely"){ rosbergSeven = 12;}
						if (rosbergSg07PickStatus === "High"   && rosbergStatus === "Underdog"){ rosbergSeven = 16;}
						if (rosbergSg07PickStatus === "Medium" && rosbergStatus === "Favorite"){ rosbergSeven = 6;}
						if (rosbergSg07PickStatus === "Medium" && rosbergStatus === "Very Likely"){ rosbergSeven = 10;}
						if (rosbergSg07PickStatus === "Medium" && rosbergStatus === "Less Likely"){ rosbergSeven = 14;}
						if (rosbergSg07PickStatus === "Medium" && rosbergStatus === "Underdog"){ rosbergSeven = 18;}
						if (rosbergSg07PickStatus === "Low"    && rosbergStatus === "Favorite"){ rosbergSeven = 8;}
						if (rosbergSg07PickStatus === "Low"    && rosbergStatus === "Very Likely"){ rosbergSeven = 12;}
						if (rosbergSg07PickStatus === "Low"    && rosbergStatus === "Less Likely"){ rosbergSeven = 16;}
						if (rosbergSg07PickStatus === "Low"    && rosbergStatus === "Underdog"){ rosbergSeven = 20;}

						var rosbergEight;
						if (rosbergSg08PickStatus === "Zero") { rosbergEight = 0;}
						if (rosbergSg08PickStatus === "High"   && rosbergStatus === "Favorite"){ rosbergEight = 4;}
						if (rosbergSg08PickStatus === "High"   && rosbergStatus === "Very Likely"){ rosbergEight = 8;}
						if (rosbergSg08PickStatus === "High"   && rosbergStatus === "Less Likely"){ rosbergEight = 12;}
						if (rosbergSg08PickStatus === "High"   && rosbergStatus === "Underdog"){ rosbergEight = 16;}
						if (rosbergSg08PickStatus === "Medium" && rosbergStatus === "Favorite"){ rosbergEight = 6;}
						if (rosbergSg08PickStatus === "Medium" && rosbergStatus === "Very Likely"){ rosbergEight = 10;}
						if (rosbergSg08PickStatus === "Medium" && rosbergStatus === "Less Likely"){ rosbergEight = 14;}
						if (rosbergSg08PickStatus === "Medium" && rosbergStatus === "Underdog"){ rosbergEight = 18;}
						if (rosbergSg08PickStatus === "Low"    && rosbergStatus === "Favorite"){ rosbergEight = 8;}
						if (rosbergSg08PickStatus === "Low"    && rosbergStatus === "Very Likely"){ rosbergEight = 12;}
						if (rosbergSg08PickStatus === "Low"    && rosbergStatus === "Less Likely"){ rosbergEight = 16;}
						if (rosbergSg08PickStatus === "Low"    && rosbergStatus === "Underdog"){ rosbergEight = 20;}

						var rosbergNine;
						if (rosbergSg09PickStatus === "Zero") { rosbergNine = 0;}
						if (rosbergSg09PickStatus === "High"   && rosbergStatus === "Favorite"){ rosbergNine = 4;}
						if (rosbergSg09PickStatus === "High"   && rosbergStatus === "Very Likely"){ rosbergNine = 8;}
						if (rosbergSg09PickStatus === "High"   && rosbergStatus === "Less Likely"){ rosbergNine = 12;}
						if (rosbergSg09PickStatus === "High"   && rosbergStatus === "Underdog"){ rosbergNine = 16;}
						if (rosbergSg09PickStatus === "Medium" && rosbergStatus === "Favorite"){ rosbergNine = 6;}
						if (rosbergSg09PickStatus === "Medium" && rosbergStatus === "Very Likely"){ rosbergNine = 10;}
						if (rosbergSg09PickStatus === "Medium" && rosbergStatus === "Less Likely"){ rosbergNine = 14;}
						if (rosbergSg09PickStatus === "Medium" && rosbergStatus === "Underdog"){ rosbergNine = 18;}
						if (rosbergSg09PickStatus === "Low"    && rosbergStatus === "Favorite"){ rosbergNine = 8;}
						if (rosbergSg09PickStatus === "Low"    && rosbergStatus === "Very Likely"){ rosbergNine = 12;}
						if (rosbergSg09PickStatus === "Low"    && rosbergStatus === "Less Likely"){ rosbergNine = 16;}
						if (rosbergSg09PickStatus === "Low"    && rosbergStatus === "Underdog"){ rosbergNine = 20;}

						var rosbergTen;
						if (rosbergSg10PickStatus === "Zero") { rosbergTen = 0;}
						if (rosbergSg10PickStatus === "High"   && rosbergStatus === "Favorite"){ rosbergTen = 4;}
						if (rosbergSg10PickStatus === "High"   && rosbergStatus === "Very Likely"){ rosbergTen = 8;}
						if (rosbergSg10PickStatus === "High"   && rosbergStatus === "Less Likely"){ rosbergTen = 12;}
						if (rosbergSg10PickStatus === "High"   && rosbergStatus === "Underdog"){ rosbergTen = 16;}
						if (rosbergSg10PickStatus === "Medium" && rosbergStatus === "Favorite"){ rosbergTen = 6;}
						if (rosbergSg10PickStatus === "Medium" && rosbergStatus === "Very Likely"){ rosbergTen = 10;}
						if (rosbergSg10PickStatus === "Medium" && rosbergStatus === "Less Likely"){ rosbergTen = 14;}
						if (rosbergSg10PickStatus === "Medium" && rosbergStatus === "Underdog"){ rosbergTen = 18;}
						if (rosbergSg10PickStatus === "Low"    && rosbergStatus === "Favorite"){ rosbergTen = 8;}
						if (rosbergSg10PickStatus === "Low"    && rosbergStatus === "Very Likely"){ rosbergTen = 12;}
						if (rosbergSg10PickStatus === "Low"    && rosbergStatus === "Less Likely"){ rosbergTen = 16;}
						if (rosbergSg10PickStatus === "Low"    && rosbergStatus === "Underdog"){ rosbergTen = 20;}

						//Vettel
						var vettelOne;
						if (vettelSg01PickStatus === "Zero") { vettelOne = 0;}
						if (vettelSg01PickStatus === "High"   && vettelStatus === "Favorite"){ vettelOne = 4;}
						if (vettelSg01PickStatus === "High"   && vettelStatus === "Very Likely"){ vettelOne = 8;}
						if (vettelSg01PickStatus === "High"   && vettelStatus === "Less Likely"){ vettelOne = 12;}
						if (vettelSg01PickStatus === "High"   && vettelStatus === "Underdog"){ vettelOne = 16;}
						if (vettelSg01PickStatus === "Medium" && vettelStatus === "Favorite"){ vettelOne = 6;}
						if (vettelSg01PickStatus === "Medium" && vettelStatus === "Very Likely"){ vettelOne = 10;}
						if (vettelSg01PickStatus === "Medium" && vettelStatus === "Less Likely"){ vettelOne = 14;}
						if (vettelSg01PickStatus === "Medium" && vettelStatus === "Underdog"){ vettelOne = 18;}
						if (vettelSg01PickStatus === "Low"    && vettelStatus === "Favorite"){ vettelOne = 8;}
						if (vettelSg01PickStatus === "Low"    && vettelStatus === "Very Likely"){ vettelOne = 12;}
						if (vettelSg01PickStatus === "Low"    && vettelStatus === "Less Likely"){ vettelOne = 16;}
						if (vettelSg01PickStatus === "Low"    && vettelStatus === "Underdog"){ vettelOne = 20;}

						var vettelTwo;
						if (vettelSg02PickStatus === "Zero") { vettelTwo = 0;}
						if (vettelSg02PickStatus === "High"   && vettelStatus === "Favorite"){ vettelTwo = 4;}
						if (vettelSg02PickStatus === "High"   && vettelStatus === "Very Likely"){ vettelTwo = 8;}
						if (vettelSg02PickStatus === "High"   && vettelStatus === "Less Likely"){ vettelTwo = 12;}
						if (vettelSg02PickStatus === "High"   && vettelStatus === "Underdog"){ vettelTwo = 16;}
						if (vettelSg02PickStatus === "Medium" && vettelStatus === "Favorite"){ vettelTwo = 6;}
						if (vettelSg02PickStatus === "Medium" && vettelStatus === "Very Likely"){ vettelTwo = 10;}
						if (vettelSg02PickStatus === "Medium" && vettelStatus === "Less Likely"){ vettelTwo = 14;}
						if (vettelSg02PickStatus === "Medium" && vettelStatus === "Underdog"){ vettelTwo = 18;}
						if (vettelSg02PickStatus === "Low"    && vettelStatus === "Favorite"){ vettelTwo = 8;}
						if (vettelSg02PickStatus === "Low"    && vettelStatus === "Very Likely"){ vettelTwo = 12;}
						if (vettelSg02PickStatus === "Low"    && vettelStatus === "Less Likely"){ vettelTwo = 16;}
						if (vettelSg02PickStatus === "Low"    && vettelStatus === "Underdog"){ vettelTwo = 20;}

						var vettelThree;
						if (vettelSg03PickStatus === "Zero") { vettelThree = 0;}
						if (vettelSg03PickStatus === "High"   && vettelStatus === "Favorite"){ vettelThree = 4;}
						if (vettelSg03PickStatus === "High"   && vettelStatus === "Very Likely"){ vettelThree = 8;}
						if (vettelSg03PickStatus === "High"   && vettelStatus === "Less Likely"){ vettelThree = 12;}
						if (vettelSg03PickStatus === "High"   && vettelStatus === "Underdog"){ vettelThree = 16;}
						if (vettelSg03PickStatus === "Medium" && vettelStatus === "Favorite"){ vettelThree = 6;}
						if (vettelSg03PickStatus === "Medium" && vettelStatus === "Very Likely"){ vettelThree = 10;}
						if (vettelSg03PickStatus === "Medium" && vettelStatus === "Less Likely"){ vettelThree = 14;}
						if (vettelSg03PickStatus === "Medium" && vettelStatus === "Underdog"){ vettelThree = 18;}
						if (vettelSg03PickStatus === "Low"    && vettelStatus === "Favorite"){ vettelThree = 8;}
						if (vettelSg03PickStatus === "Low"    && vettelStatus === "Very Likely"){ vettelThree = 12;}
						if (vettelSg03PickStatus === "Low"    && vettelStatus === "Less Likely"){ vettelThree = 16;}
						if (vettelSg03PickStatus === "Low"    && vettelStatus === "Underdog"){ vettelThree = 20;}

						var vettelFour;
						if (vettelSg04PickStatus === "Zero") { vettelFour = 0;}
						if (vettelSg04PickStatus === "High"   && vettelStatus === "Favorite"){ vettelFour = 4;}
						if (vettelSg04PickStatus === "High"   && vettelStatus === "Very Likely"){ vettelFour = 8;}
						if (vettelSg04PickStatus === "High"   && vettelStatus === "Less Likely"){ vettelFour = 12;}
						if (vettelSg04PickStatus === "High"   && vettelStatus === "Underdog"){ vettelFour = 16;}
						if (vettelSg04PickStatus === "Medium" && vettelStatus === "Favorite"){ vettelFour = 6;}
						if (vettelSg04PickStatus === "Medium" && vettelStatus === "Very Likely"){ vettelFour = 10;}
						if (vettelSg04PickStatus === "Medium" && vettelStatus === "Less Likely"){ vettelFour = 14;}
						if (vettelSg04PickStatus === "Medium" && vettelStatus === "Underdog"){ vettelFour = 18;}
						if (vettelSg04PickStatus === "Low"    && vettelStatus === "Favorite"){ vettelFour = 8;}
						if (vettelSg04PickStatus === "Low"    && vettelStatus === "Very Likely"){ vettelFour = 12;}
						if (vettelSg04PickStatus === "Low"    && vettelStatus === "Less Likely"){ vettelFour = 16;}
						if (vettelSg04PickStatus === "Low"    && vettelStatus === "Underdog"){ vettelFour = 20;}

						var vettelFive;
						if (vettelSg05PickStatus === "Zero") { vettelFive = 0;}
						if (vettelSg05PickStatus === "High"   && vettelStatus === "Favorite"){ vettelFive = 4;}
						if (vettelSg05PickStatus === "High"   && vettelStatus === "Very Likely"){ vettelFive = 8;}
						if (vettelSg05PickStatus === "High"   && vettelStatus === "Less Likely"){ vettelFive = 12;}
						if (vettelSg05PickStatus === "High"   && vettelStatus === "Underdog"){ vettelFive = 16;}
						if (vettelSg05PickStatus === "Medium" && vettelStatus === "Favorite"){ vettelFive = 6;}
						if (vettelSg05PickStatus === "Medium" && vettelStatus === "Very Likely"){ vettelFive = 10;}
						if (vettelSg05PickStatus === "Medium" && vettelStatus === "Less Likely"){ vettelFive = 14;}
						if (vettelSg05PickStatus === "Medium" && vettelStatus === "Underdog"){ vettelFive = 18;}
						if (vettelSg05PickStatus === "Low"    && vettelStatus === "Favorite"){ vettelFive = 8;}
						if (vettelSg05PickStatus === "Low"    && vettelStatus === "Very Likely"){ vettelFive = 12;}
						if (vettelSg05PickStatus === "Low"    && vettelStatus === "Less Likely"){ vettelFive = 16;}
						if (vettelSg05PickStatus === "Low"    && vettelStatus === "Underdog"){ vettelFive = 20;}

						var vettelSix;
						if (vettelSg06PickStatus === "Zero") { vettelSix = 0;}
						if (vettelSg06PickStatus === "High"   && vettelStatus === "Favorite"){ vettelSix = 4;}
						if (vettelSg06PickStatus === "High"   && vettelStatus === "Very Likely"){ vettelSix = 8;}
						if (vettelSg06PickStatus === "High"   && vettelStatus === "Less Likely"){ vettelSix = 12;}
						if (vettelSg06PickStatus === "High"   && vettelStatus === "Underdog"){ vettelSix = 16;}
						if (vettelSg06PickStatus === "Medium" && vettelStatus === "Favorite"){ vettelSix = 6;}
						if (vettelSg06PickStatus === "Medium" && vettelStatus === "Very Likely"){ vettelSix = 10;}
						if (vettelSg06PickStatus === "Medium" && vettelStatus === "Less Likely"){ vettelSix = 14;}
						if (vettelSg06PickStatus === "Medium" && vettelStatus === "Underdog"){ vettelSix = 18;}
						if (vettelSg06PickStatus === "Low"    && vettelStatus === "Favorite"){ vettelSix = 8;}
						if (vettelSg06PickStatus === "Low"    && vettelStatus === "Very Likely"){ vettelSix = 12;}
						if (vettelSg06PickStatus === "Low"    && vettelStatus === "Less Likely"){ vettelSix = 16;}
						if (vettelSg06PickStatus === "Low"    && vettelStatus === "Underdog"){ vettelSix = 20;}

						var vettelSeven;
						if (vettelSg07PickStatus === "Zero") { vettelSeven = 0;}
						if (vettelSg07PickStatus === "High"   && vettelStatus === "Favorite"){ vettelSeven = 4;}
						if (vettelSg07PickStatus === "High"   && vettelStatus === "Very Likely"){ vettelSeven = 8;}
						if (vettelSg07PickStatus === "High"   && vettelStatus === "Less Likely"){ vettelSeven = 12;}
						if (vettelSg07PickStatus === "High"   && vettelStatus === "Underdog"){ vettelSeven = 16;}
						if (vettelSg07PickStatus === "Medium" && vettelStatus === "Favorite"){ vettelSeven = 6;}
						if (vettelSg07PickStatus === "Medium" && vettelStatus === "Very Likely"){ vettelSeven = 10;}
						if (vettelSg07PickStatus === "Medium" && vettelStatus === "Less Likely"){ vettelSeven = 14;}
						if (vettelSg07PickStatus === "Medium" && vettelStatus === "Underdog"){ vettelSeven = 18;}
						if (vettelSg07PickStatus === "Low"    && vettelStatus === "Favorite"){ vettelSeven = 8;}
						if (vettelSg07PickStatus === "Low"    && vettelStatus === "Very Likely"){ vettelSeven = 12;}
						if (vettelSg07PickStatus === "Low"    && vettelStatus === "Less Likely"){ vettelSeven = 16;}
						if (vettelSg07PickStatus === "Low"    && vettelStatus === "Underdog"){ vettelSeven = 20;}

						var vettelEight;
						if (vettelSg08PickStatus === "Zero") { vettelEight = 0;}
						if (vettelSg08PickStatus === "High"   && vettelStatus === "Favorite"){ vettelEight = 4;}
						if (vettelSg08PickStatus === "High"   && vettelStatus === "Very Likely"){ vettelEight = 8;}
						if (vettelSg08PickStatus === "High"   && vettelStatus === "Less Likely"){ vettelEight = 12;}
						if (vettelSg08PickStatus === "High"   && vettelStatus === "Underdog"){ vettelEight = 16;}
						if (vettelSg08PickStatus === "Medium" && vettelStatus === "Favorite"){ vettelEight = 6;}
						if (vettelSg08PickStatus === "Medium" && vettelStatus === "Very Likely"){ vettelEight = 10;}
						if (vettelSg08PickStatus === "Medium" && vettelStatus === "Less Likely"){ vettelEight = 14;}
						if (vettelSg08PickStatus === "Medium" && vettelStatus === "Underdog"){ vettelEight = 18;}
						if (vettelSg08PickStatus === "Low"    && vettelStatus === "Favorite"){ vettelEight = 8;}
						if (vettelSg08PickStatus === "Low"    && vettelStatus === "Very Likely"){ vettelEight = 12;}
						if (vettelSg08PickStatus === "Low"    && vettelStatus === "Less Likely"){ vettelEight = 16;}
						if (vettelSg08PickStatus === "Low"    && vettelStatus === "Underdog"){ vettelEight = 20;}

						var vettelNine;
						if (vettelSg09PickStatus === "Zero") { vettelNine = 0;}
						if (vettelSg09PickStatus === "High"   && vettelStatus === "Favorite"){ vettelNine = 4;}
						if (vettelSg09PickStatus === "High"   && vettelStatus === "Very Likely"){ vettelNine = 8;}
						if (vettelSg09PickStatus === "High"   && vettelStatus === "Less Likely"){ vettelNine = 12;}
						if (vettelSg09PickStatus === "High"   && vettelStatus === "Underdog"){ vettelNine = 16;}
						if (vettelSg09PickStatus === "Medium" && vettelStatus === "Favorite"){ vettelNine = 6;}
						if (vettelSg09PickStatus === "Medium" && vettelStatus === "Very Likely"){ vettelNine = 10;}
						if (vettelSg09PickStatus === "Medium" && vettelStatus === "Less Likely"){ vettelNine = 14;}
						if (vettelSg09PickStatus === "Medium" && vettelStatus === "Underdog"){ vettelNine = 18;}
						if (vettelSg09PickStatus === "Low"    && vettelStatus === "Favorite"){ vettelNine = 8;}
						if (vettelSg09PickStatus === "Low"    && vettelStatus === "Very Likely"){ vettelNine = 12;}
						if (vettelSg09PickStatus === "Low"    && vettelStatus === "Less Likely"){ vettelNine = 16;}
						if (vettelSg09PickStatus === "Low"    && vettelStatus === "Underdog"){ vettelNine = 20;}

						var vettelTen;
						if (vettelSg10PickStatus === "Zero") { vettelTen = 0;}
						if (vettelSg10PickStatus === "High"   && vettelStatus === "Favorite"){ vettelTen = 4;}
						if (vettelSg10PickStatus === "High"   && vettelStatus === "Very Likely"){ vettelTen = 8;}
						if (vettelSg10PickStatus === "High"   && vettelStatus === "Less Likely"){ vettelTen = 12;}
						if (vettelSg10PickStatus === "High"   && vettelStatus === "Underdog"){ vettelTen = 16;}
						if (vettelSg10PickStatus === "Medium" && vettelStatus === "Favorite"){ vettelTen = 6;}
						if (vettelSg10PickStatus === "Medium" && vettelStatus === "Very Likely"){ vettelTen = 10;}
						if (vettelSg10PickStatus === "Medium" && vettelStatus === "Less Likely"){ vettelTen = 14;}
						if (vettelSg10PickStatus === "Medium" && vettelStatus === "Underdog"){ vettelTen = 18;}
						if (vettelSg10PickStatus === "Low"    && vettelStatus === "Favorite"){ vettelTen = 8;}
						if (vettelSg10PickStatus === "Low"    && vettelStatus === "Very Likely"){ vettelTen = 12;}
						if (vettelSg10PickStatus === "Low"    && vettelStatus === "Less Likely"){ vettelTen = 16;}
						if (vettelSg10PickStatus === "Low"    && vettelStatus === "Underdog"){ vettelTen = 20;}

						//Raikkonen
						var raikkonenOne;
						if (raikkonenSg01PickStatus === "Zero") { raikkonenOne = 0;}
						if (raikkonenSg01PickStatus === "High"   && raikkonenStatus === "Favorite"){ raikkonenOne = 4;}
						if (raikkonenSg01PickStatus === "High"   && raikkonenStatus === "Very Likely"){ raikkonenOne = 8;}
						if (raikkonenSg01PickStatus === "High"   && raikkonenStatus === "Less Likely"){ raikkonenOne = 12;}
						if (raikkonenSg01PickStatus === "High"   && raikkonenStatus === "Underdog"){ raikkonenOne = 16;}
						if (raikkonenSg01PickStatus === "Medium" && raikkonenStatus === "Favorite"){ raikkonenOne = 6;}
						if (raikkonenSg01PickStatus === "Medium" && raikkonenStatus === "Very Likely"){ raikkonenOne = 10;}
						if (raikkonenSg01PickStatus === "Medium" && raikkonenStatus === "Less Likely"){ raikkonenOne = 14;}
						if (raikkonenSg01PickStatus === "Medium" && raikkonenStatus === "Underdog"){ raikkonenOne = 18;}
						if (raikkonenSg01PickStatus === "Low"    && raikkonenStatus === "Favorite"){ raikkonenOne = 8;}
						if (raikkonenSg01PickStatus === "Low"    && raikkonenStatus === "Very Likely"){ raikkonenOne = 12;}
						if (raikkonenSg01PickStatus === "Low"    && raikkonenStatus === "Less Likely"){ raikkonenOne = 16;}
						if (raikkonenSg01PickStatus === "Low"    && raikkonenStatus === "Underdog"){ raikkonenOne = 20;}

						var raikkonenTwo;
						if (raikkonenSg02PickStatus === "Zero") { raikkonenTwo = 0;}
						if (raikkonenSg02PickStatus === "High"   && raikkonenStatus === "Favorite"){ raikkonentwo = 4;}
						if (raikkonenSg02PickStatus === "High"   && raikkonenStatus === "Very Likely"){ raikkonentwo = 8;}
						if (raikkonenSg02PickStatus === "High"   && raikkonenStatus === "Less Likely"){ raikkonentwo = 12;}
						if (raikkonenSg02PickStatus === "High"   && raikkonenStatus === "Underdog"){ raikkonentwo = 16;}
						if (raikkonenSg02PickStatus === "Medium" && raikkonenStatus === "Favorite"){ raikkonentwo = 6;}
						if (raikkonenSg02PickStatus === "Medium" && raikkonenStatus === "Very Likely"){ raikkonentwo = 10;}
						if (raikkonenSg02PickStatus === "Medium" && raikkonenStatus === "Less Likely"){ raikkonentwo = 14;}
						if (raikkonenSg02PickStatus === "Medium" && raikkonenStatus === "Underdog"){ raikkonentwo = 18;}
						if (raikkonenSg02PickStatus === "Low"    && raikkonenStatus === "Favorite"){ raikkonentwo = 8;}
						if (raikkonenSg02PickStatus === "Low"    && raikkonenStatus === "Very Likely"){ raikkonentwo = 12;}
						if (raikkonenSg02PickStatus === "Low"    && raikkonenStatus === "Less Likely"){ raikkonentwo = 16;}
						if (raikkonenSg02PickStatus === "Low"    && raikkonenStatus === "Underdog"){ raikkonentwo = 20;}

						var raikkonenThree;
						if (raikkonenSg03PickStatus === "Zero") { raikkonenThree = 0;}
						if (raikkonenSg03PickStatus === "High"   && raikkonenStatus === "Favorite"){ raikkonenThree = 4;}
						if (raikkonenSg03PickStatus === "High"   && raikkonenStatus === "Very Likely"){ raikkonenThree = 8;}
						if (raikkonenSg03PickStatus === "High"   && raikkonenStatus === "Less Likely"){ raikkonenThree = 12;}
						if (raikkonenSg03PickStatus === "High"   && raikkonenStatus === "Underdog"){ raikkonenThree = 16;}
						if (raikkonenSg03PickStatus === "Medium" && raikkonenStatus === "Favorite"){ raikkonenThree = 6;}
						if (raikkonenSg03PickStatus === "Medium" && raikkonenStatus === "Very Likely"){ raikkonenThree = 10;}
						if (raikkonenSg03PickStatus === "Medium" && raikkonenStatus === "Less Likely"){ raikkonenThree = 14;}
						if (raikkonenSg03PickStatus === "Medium" && raikkonenStatus === "Underdog"){ raikkonenThree = 18;}
						if (raikkonenSg03PickStatus === "Low"    && raikkonenStatus === "Favorite"){ raikkonenThree = 8;}
						if (raikkonenSg03PickStatus === "Low"    && raikkonenStatus === "Very Likely"){ raikkonenThree = 12;}
						if (raikkonenSg03PickStatus === "Low"    && raikkonenStatus === "Less Likely"){ raikkonenThree = 16;}
						if (raikkonenSg03PickStatus === "Low"    && raikkonenStatus === "Underdog"){ raikkonenThree = 20;}

						var raikkonenFour;
						if (raikkonenSg04PickStatus === "Zero") { raikkonenFour = 0;}
						if (raikkonenSg04PickStatus === "High"   && raikkonenStatus === "Favorite"){ raikkonenFour = 4;}
						if (raikkonenSg04PickStatus === "High"   && raikkonenStatus === "Very Likely"){ raikkonenFour = 8;}
						if (raikkonenSg04PickStatus === "High"   && raikkonenStatus === "Less Likely"){ raikkonenFour = 12;}
						if (raikkonenSg04PickStatus === "High"   && raikkonenStatus === "Underdog"){ raikkonenFour = 16;}
						if (raikkonenSg04PickStatus === "Medium" && raikkonenStatus === "Favorite"){ raikkonenFour = 6;}
						if (raikkonenSg04PickStatus === "Medium" && raikkonenStatus === "Very Likely"){ raikkonenFour = 10;}
						if (raikkonenSg04PickStatus === "Medium" && raikkonenStatus === "Less Likely"){ raikkonenFour = 14;}
						if (raikkonenSg04PickStatus === "Medium" && raikkonenStatus === "Underdog"){ raikkonenFour = 18;}
						if (raikkonenSg04PickStatus === "Low"    && raikkonenStatus === "Favorite"){ raikkonenFour = 8;}
						if (raikkonenSg04PickStatus === "Low"    && raikkonenStatus === "Very Likely"){ raikkonenFour = 12;}
						if (raikkonenSg04PickStatus === "Low"    && raikkonenStatus === "Less Likely"){ raikkonenFour = 16;}
						if (raikkonenSg04PickStatus === "Low"    && raikkonenStatus === "Underdog"){ raikkonenFour = 20;}

						var raikkonenFive;
						if (raikkonenSg05PickStatus === "Zero") { raikkonenFive = 0;}
						if (raikkonenSg05PickStatus === "High"   && raikkonenStatus === "Favorite"){ raikkonenFive = 4;}
						if (raikkonenSg05PickStatus === "High"   && raikkonenStatus === "Very Likely"){ raikkonenFive = 8;}
						if (raikkonenSg05PickStatus === "High"   && raikkonenStatus === "Less Likely"){ raikkonenFive = 12;}
						if (raikkonenSg05PickStatus === "High"   && raikkonenStatus === "Underdog"){ raikkonenFive = 16;}
						if (raikkonenSg05PickStatus === "Medium" && raikkonenStatus === "Favorite"){ raikkonenFive = 6;}
						if (raikkonenSg05PickStatus === "Medium" && raikkonenStatus === "Very Likely"){ raikkonenFive = 10;}
						if (raikkonenSg05PickStatus === "Medium" && raikkonenStatus === "Less Likely"){ raikkonenFive = 14;}
						if (raikkonenSg05PickStatus === "Medium" && raikkonenStatus === "Underdog"){ raikkonenFive = 18;}
						if (raikkonenSg05PickStatus === "Low"    && raikkonenStatus === "Favorite"){ raikkonenFive = 8;}
						if (raikkonenSg05PickStatus === "Low"    && raikkonenStatus === "Very Likely"){ raikkonenFive = 12;}
						if (raikkonenSg05PickStatus === "Low"    && raikkonenStatus === "Less Likely"){ raikkonenFive = 16;}
						if (raikkonenSg05PickStatus === "Low"    && raikkonenStatus === "Underdog"){ raikkonenFive = 20;}

						var raikkonenSix;
						if (raikkonenSg06PickStatus === "Zero") { raikkonenSix = 0;}
						if (raikkonenSg06PickStatus === "High"   && raikkonenStatus === "Favorite"){ raikkonenSix = 4;}
						if (raikkonenSg06PickStatus === "High"   && raikkonenStatus === "Very Likely"){ raikkonenSix = 8;}
						if (raikkonenSg06PickStatus === "High"   && raikkonenStatus === "Less Likely"){ raikkonenSix = 12;}
						if (raikkonenSg06PickStatus === "High"   && raikkonenStatus === "Underdog"){ raikkonenSix = 16;}
						if (raikkonenSg06PickStatus === "Medium" && raikkonenStatus === "Favorite"){ raikkonenSix = 6;}
						if (raikkonenSg06PickStatus === "Medium" && raikkonenStatus === "Very Likely"){ raikkonenSix = 10;}
						if (raikkonenSg06PickStatus === "Medium" && raikkonenStatus === "Less Likely"){ raikkonenSix = 14;}
						if (raikkonenSg06PickStatus === "Medium" && raikkonenStatus === "Underdog"){ raikkonenSix = 18;}
						if (raikkonenSg06PickStatus === "Low"    && raikkonenStatus === "Favorite"){ raikkonenSix = 8;}
						if (raikkonenSg06PickStatus === "Low"    && raikkonenStatus === "Very Likely"){ raikkonenSix = 12;}
						if (raikkonenSg06PickStatus === "Low"    && raikkonenStatus === "Less Likely"){ raikkonenSix = 16;}
						if (raikkonenSg06PickStatus === "Low"    && raikkonenStatus === "Underdog"){ raikkonenSix = 20;}

						var raikkonenSeven;
						if (raikkonenSg07PickStatus === "Zero") { raikkonenSeven = 0;}
						if (raikkonenSg07PickStatus === "High"   && raikkonenStatus === "Favorite"){ raikkonenSeven = 4;}
						if (raikkonenSg07PickStatus === "High"   && raikkonenStatus === "Very Likely"){ raikkonenSeven = 8;}
						if (raikkonenSg07PickStatus === "High"   && raikkonenStatus === "Less Likely"){ raikkonenSeven = 12;}
						if (raikkonenSg07PickStatus === "High"   && raikkonenStatus === "Underdog"){ raikkonenSeven = 16;}
						if (raikkonenSg07PickStatus === "Medium" && raikkonenStatus === "Favorite"){ raikkonenSeven = 6;}
						if (raikkonenSg07PickStatus === "Medium" && raikkonenStatus === "Very Likely"){ raikkonenSeven = 10;}
						if (raikkonenSg07PickStatus === "Medium" && raikkonenStatus === "Less Likely"){ raikkonenSeven = 14;}
						if (raikkonenSg07PickStatus === "Medium" && raikkonenStatus === "Underdog"){ raikkonenSeven = 18;}
						if (raikkonenSg07PickStatus === "Low"    && raikkonenStatus === "Favorite"){ raikkonenSeven = 8;}
						if (raikkonenSg07PickStatus === "Low"    && raikkonenStatus === "Very Likely"){ raikkonenSeven = 12;}
						if (raikkonenSg07PickStatus === "Low"    && raikkonenStatus === "Less Likely"){ raikkonenSeven = 16;}
						if (raikkonenSg07PickStatus === "Low"    && raikkonenStatus === "Underdog"){ raikkonenSeven = 20;}

						var raikkonenEight;
						if (raikkonenSg08PickStatus === "Zero") { raikkonenEight = 0;}
						if (raikkonenSg08PickStatus === "High"   && raikkonenStatus === "Favorite"){ raikkonenEight = 4;}
						if (raikkonenSg08PickStatus === "High"   && raikkonenStatus === "Very Likely"){ raikkonenEight = 8;}
						if (raikkonenSg08PickStatus === "High"   && raikkonenStatus === "Less Likely"){ raikkonenEight = 12;}
						if (raikkonenSg08PickStatus === "High"   && raikkonenStatus === "Underdog"){ raikkonenEight = 16;}
						if (raikkonenSg08PickStatus === "Medium" && raikkonenStatus === "Favorite"){ raikkonenEight = 6;}
						if (raikkonenSg08PickStatus === "Medium" && raikkonenStatus === "Very Likely"){ raikkonenEight = 10;}
						if (raikkonenSg08PickStatus === "Medium" && raikkonenStatus === "Less Likely"){ raikkonenEight = 14;}
						if (raikkonenSg08PickStatus === "Medium" && raikkonenStatus === "Underdog"){ raikkonenEight = 18;}
						if (raikkonenSg08PickStatus === "Low"    && raikkonenStatus === "Favorite"){ raikkonenEight = 8;}
						if (raikkonenSg08PickStatus === "Low"    && raikkonenStatus === "Very Likely"){ raikkonenEight = 12;}
						if (raikkonenSg08PickStatus === "Low"    && raikkonenStatus === "Less Likely"){ raikkonenEight = 16;}
						if (raikkonenSg08PickStatus === "Low"    && raikkonenStatus === "Underdog"){ raikkonenEight = 20;}

						var raikkonenNine;
						if (raikkonenSg09PickStatus === "Zero") { raikkonenNine = 0;}
						if (raikkonenSg09PickStatus === "High"   && raikkonenStatus === "Favorite"){ raikkonenNine = 4;}
						if (raikkonenSg09PickStatus === "High"   && raikkonenStatus === "Very Likely"){ raikkonenNine = 8;}
						if (raikkonenSg09PickStatus === "High"   && raikkonenStatus === "Less Likely"){ raikkonenNine = 12;}
						if (raikkonenSg09PickStatus === "High"   && raikkonenStatus === "Underdog"){ raikkonenNine = 16;}
						if (raikkonenSg09PickStatus === "Medium" && raikkonenStatus === "Favorite"){ raikkonenNine = 6;}
						if (raikkonenSg09PickStatus === "Medium" && raikkonenStatus === "Very Likely"){ raikkonenNine = 10;}
						if (raikkonenSg09PickStatus === "Medium" && raikkonenStatus === "Less Likely"){ raikkonenNine = 14;}
						if (raikkonenSg09PickStatus === "Medium" && raikkonenStatus === "Underdog"){ raikkonenNine = 18;}
						if (raikkonenSg09PickStatus === "Low"    && raikkonenStatus === "Favorite"){ raikkonenNine = 8;}
						if (raikkonenSg09PickStatus === "Low"    && raikkonenStatus === "Very Likely"){ raikkonenNine = 12;}
						if (raikkonenSg09PickStatus === "Low"    && raikkonenStatus === "Less Likely"){ raikkonenNine = 16;}
						if (raikkonenSg09PickStatus === "Low"    && raikkonenStatus === "Underdog"){ raikkonenNine = 20;}

						var raikkonenTen;
						if (raikkonenSg10PickStatus === "Zero") { raikkonenTen = 0;}
						if (raikkonenSg10PickStatus === "High"   && raikkonenStatus === "Favorite"){ raikkonenTen = 4;}
						if (raikkonenSg10PickStatus === "High"   && raikkonenStatus === "Very Likely"){ raikkonenTen = 8;}
						if (raikkonenSg10PickStatus === "High"   && raikkonenStatus === "Less Likely"){ raikkonenTen = 12;}
						if (raikkonenSg10PickStatus === "High"   && raikkonenStatus === "Underdog"){ raikkonenTen = 16;}
						if (raikkonenSg10PickStatus === "Medium" && raikkonenStatus === "Favorite"){ raikkonenTen = 6;}
						if (raikkonenSg10PickStatus === "Medium" && raikkonenStatus === "Very Likely"){ raikkonenTen = 10;}
						if (raikkonenSg10PickStatus === "Medium" && raikkonenStatus === "Less Likely"){ raikkonenTen = 14;}
						if (raikkonenSg10PickStatus === "Medium" && raikkonenStatus === "Underdog"){ raikkonenTen = 18;}
						if (raikkonenSg10PickStatus === "Low"    && raikkonenStatus === "Favorite"){ raikkonenTen = 8;}
						if (raikkonenSg10PickStatus === "Low"    && raikkonenStatus === "Very Likely"){ raikkonenTen = 12;}
						if (raikkonenSg10PickStatus === "Low"    && raikkonenStatus === "Less Likely"){ raikkonenTen = 16;}
						if (raikkonenSg10PickStatus === "Low"    && raikkonenStatus === "Underdog"){ raikkonenTen = 20;}

						//Massa
						var massaOne;
						if (massaSg01PickStatus === "Zero") { massaOne = 0;}
						if (massaSg01PickStatus === "High"   && massaStatus === "Favorite"){ massaOne = 4;}
						if (massaSg01PickStatus === "High"   && massaStatus === "Very Likely"){ massaOne = 8;}
						if (massaSg01PickStatus === "High"   && massaStatus === "Less Likely"){ massaOne = 12;}
						if (massaSg01PickStatus === "High"   && massaStatus === "Underdog"){ massaOne = 16;}
						if (massaSg01PickStatus === "Medium" && massaStatus === "Favorite"){ massaOne = 6;}
						if (massaSg01PickStatus === "Medium" && massaStatus === "Very Likely"){ massaOne = 10;}
						if (massaSg01PickStatus === "Medium" && massaStatus === "Less Likely"){ massaOne = 14;}
						if (massaSg01PickStatus === "Medium" && massaStatus === "Underdog"){ massaOne = 18;}
						if (massaSg01PickStatus === "Low"    && massaStatus === "Favorite"){ massaOne = 8;}
						if (massaSg01PickStatus === "Low"    && massaStatus === "Very Likely"){ massaOne = 12;}
						if (massaSg01PickStatus === "Low"    && massaStatus === "Less Likely"){ massaOne = 16;}
						if (massaSg01PickStatus === "Low"    && massaStatus === "Underdog"){ massaOne = 20;}

						var massaTwo;
						if (massaSg02PickStatus === "Zero") { massaTwo = 0;}
						if (massaSg02PickStatus === "High"   && massaStatus === "Favorite"){ massaTwo = 4;}
						if (massaSg02PickStatus === "High"   && massaStatus === "Very Likely"){ massaTwo = 8;}
						if (massaSg02PickStatus === "High"   && massaStatus === "Less Likely"){ massaTwo = 12;}
						if (massaSg02PickStatus === "High"   && massaStatus === "Underdog"){ massaTwo = 16;}
						if (massaSg02PickStatus === "Medium" && massaStatus === "Favorite"){ massaTwo = 6;}
						if (massaSg02PickStatus === "Medium" && massaStatus === "Very Likely"){ massaTwo = 10;}
						if (massaSg02PickStatus === "Medium" && massaStatus === "Less Likely"){ massaTwo = 14;}
						if (massaSg02PickStatus === "Medium" && massaStatus === "Underdog"){ massaTwo = 18;}
						if (massaSg02PickStatus === "Low"    && massaStatus === "Favorite"){ massaTwo = 8;}
						if (massaSg02PickStatus === "Low"    && massaStatus === "Very Likely"){ massaTwo = 12;}
						if (massaSg02PickStatus === "Low"    && massaStatus === "Less Likely"){ massaTwo = 16;}
						if (massaSg02PickStatus === "Low"    && massaStatus === "Underdog"){ massaTwo = 20;}

						var massaThree;
						if (massaSg03PickStatus === "Zero") { massaThree = 0;}
						if (massaSg03PickStatus === "High"   && massaStatus === "Favorite"){ massaThree = 4;}
						if (massaSg03PickStatus === "High"   && massaStatus === "Very Likely"){ massaThree = 8;}
						if (massaSg03PickStatus === "High"   && massaStatus === "Less Likely"){ massaThree = 12;}
						if (massaSg03PickStatus === "High"   && massaStatus === "Underdog"){ massaThree = 16;}
						if (massaSg03PickStatus === "Medium" && massaStatus === "Favorite"){ massaThree = 6;}
						if (massaSg03PickStatus === "Medium" && massaStatus === "Very Likely"){ massaThree = 10;}
						if (massaSg03PickStatus === "Medium" && massaStatus === "Less Likely"){ massaThree = 14;}
						if (massaSg03PickStatus === "Medium" && massaStatus === "Underdog"){ massaThree = 18;}
						if (massaSg03PickStatus === "Low"    && massaStatus === "Favorite"){ massaThree = 8;}
						if (massaSg03PickStatus === "Low"    && massaStatus === "Very Likely"){ massaThree = 12;}
						if (massaSg03PickStatus === "Low"    && massaStatus === "Less Likely"){ massaThree = 16;}
						if (massaSg03PickStatus === "Low"    && massaStatus === "Underdog"){ massaThree = 20;}

						var massaFour;
						if (massaSg04PickStatus === "Zero") { massaFour = 0;}
						if (massaSg04PickStatus === "High"   && massaStatus === "Favorite"){ massaFour = 4;}
						if (massaSg04PickStatus === "High"   && massaStatus === "Very Likely"){ massaFour = 8;}
						if (massaSg04PickStatus === "High"   && massaStatus === "Less Likely"){ massaFour = 12;}
						if (massaSg04PickStatus === "High"   && massaStatus === "Underdog"){ massaFour = 16;}
						if (massaSg04PickStatus === "Medium" && massaStatus === "Favorite"){ massaFour = 6;}
						if (massaSg04PickStatus === "Medium" && massaStatus === "Very Likely"){ massaFour = 10;}
						if (massaSg04PickStatus === "Medium" && massaStatus === "Less Likely"){ massaFour = 14;}
						if (massaSg04PickStatus === "Medium" && massaStatus === "Underdog"){ massaFour = 18;}
						if (massaSg04PickStatus === "Low"    && massaStatus === "Favorite"){ massaFour = 8;}
						if (massaSg04PickStatus === "Low"    && massaStatus === "Very Likely"){ massaFour = 12;}
						if (massaSg04PickStatus === "Low"    && massaStatus === "Less Likely"){ massaFour = 16;}
						if (massaSg04PickStatus === "Low"    && massaStatus === "Underdog"){ massaFour = 20;}

						var massaFive;
						if (massaSg05PickStatus === "Zero") { massaFive = 0;}
						if (massaSg05PickStatus === "High"   && massaStatus === "Favorite"){ massaFive = 4;}
						if (massaSg05PickStatus === "High"   && massaStatus === "Very Likely"){ massaFive = 8;}
						if (massaSg05PickStatus === "High"   && massaStatus === "Less Likely"){ massaFive = 12;}
						if (massaSg05PickStatus === "High"   && massaStatus === "Underdog"){ massaFive = 16;}
						if (massaSg05PickStatus === "Medium" && massaStatus === "Favorite"){ massaFive = 6;}
						if (massaSg05PickStatus === "Medium" && massaStatus === "Very Likely"){ massaFive = 10;}
						if (massaSg05PickStatus === "Medium" && massaStatus === "Less Likely"){ massaFive = 14;}
						if (massaSg05PickStatus === "Medium" && massaStatus === "Underdog"){ massaFive = 18;}
						if (massaSg05PickStatus === "Low"    && massaStatus === "Favorite"){ massaFive = 8;}
						if (massaSg05PickStatus === "Low"    && massaStatus === "Very Likely"){ massaFive = 12;}
						if (massaSg05PickStatus === "Low"    && massaStatus === "Less Likely"){ massaFive = 16;}
						if (massaSg05PickStatus === "Low"    && massaStatus === "Underdog"){ massaFive = 20;}

						var massaSix;
						if (massaSg06PickStatus === "Zero") { massaSix = 0;}
						if (massaSg06PickStatus === "High"   && massaStatus === "Favorite"){ massaSix = 4;}
						if (massaSg06PickStatus === "High"   && massaStatus === "Very Likely"){ massaSix = 8;}
						if (massaSg06PickStatus === "High"   && massaStatus === "Less Likely"){ massaSix = 12;}
						if (massaSg06PickStatus === "High"   && massaStatus === "Underdog"){ massaSix = 16;}
						if (massaSg06PickStatus === "Medium" && massaStatus === "Favorite"){ massaSix = 6;}
						if (massaSg06PickStatus === "Medium" && massaStatus === "Very Likely"){ massaSix = 10;}
						if (massaSg06PickStatus === "Medium" && massaStatus === "Less Likely"){ massaSix = 14;}
						if (massaSg06PickStatus === "Medium" && massaStatus === "Underdog"){ massaSix = 18;}
						if (massaSg06PickStatus === "Low"    && massaStatus === "Favorite"){ massaSix = 8;}
						if (massaSg06PickStatus === "Low"    && massaStatus === "Very Likely"){ massaSix = 12;}
						if (massaSg06PickStatus === "Low"    && massaStatus === "Less Likely"){ massaSix = 16;}
						if (massaSg06PickStatus === "Low"    && massaStatus === "Underdog"){ massaSix = 20;}

						var massaSeven;
						if (massaSg07PickStatus === "Zero") { massaSeven = 0;}
						if (massaSg07PickStatus === "High"   && massaStatus === "Favorite"){ massaSeven = 4;}
						if (massaSg07PickStatus === "High"   && massaStatus === "Very Likely"){ massaSeven = 8;}
						if (massaSg07PickStatus === "High"   && massaStatus === "Less Likely"){ massaSeven = 12;}
						if (massaSg07PickStatus === "High"   && massaStatus === "Underdog"){ massaSeven = 16;}
						if (massaSg07PickStatus === "Medium" && massaStatus === "Favorite"){ massaSeven = 6;}
						if (massaSg07PickStatus === "Medium" && massaStatus === "Very Likely"){ massaSeven = 10;}
						if (massaSg07PickStatus === "Medium" && massaStatus === "Less Likely"){ massaSeven = 14;}
						if (massaSg07PickStatus === "Medium" && massaStatus === "Underdog"){ massaSeven = 18;}
						if (massaSg07PickStatus === "Low"    && massaStatus === "Favorite"){ massaSeven = 8;}
						if (massaSg07PickStatus === "Low"    && massaStatus === "Very Likely"){ massaSeven = 12;}
						if (massaSg07PickStatus === "Low"    && massaStatus === "Less Likely"){ massaSeven = 16;}
						if (massaSg07PickStatus === "Low"    && massaStatus === "Underdog"){ massaSeven = 20;}

						var massaEight;
						if (massaSg08PickStatus === "Zero") { massaEight = 0;}
						if (massaSg08PickStatus === "High"   && massaStatus === "Favorite"){ massaEight = 4;}
						if (massaSg08PickStatus === "High"   && massaStatus === "Very Likely"){ massaEight = 8;}
						if (massaSg08PickStatus === "High"   && massaStatus === "Less Likely"){ massaEight = 12;}
						if (massaSg08PickStatus === "High"   && massaStatus === "Underdog"){ massaEight = 16;}
						if (massaSg08PickStatus === "Medium" && massaStatus === "Favorite"){ massaEight = 6;}
						if (massaSg08PickStatus === "Medium" && massaStatus === "Very Likely"){ massaEight = 10;}
						if (massaSg08PickStatus === "Medium" && massaStatus === "Less Likely"){ massaEight = 14;}
						if (massaSg08PickStatus === "Medium" && massaStatus === "Underdog"){ massaEight = 18;}
						if (massaSg08PickStatus === "Low"    && massaStatus === "Favorite"){ massaEight = 8;}
						if (massaSg08PickStatus === "Low"    && massaStatus === "Very Likely"){ massaEight = 12;}
						if (massaSg08PickStatus === "Low"    && massaStatus === "Less Likely"){ massaEight = 16;}
						if (massaSg08PickStatus === "Low"    && massaStatus === "Underdog"){ massaEight = 20;}

						var massaNine;
						if (massaSg09PickStatus === "Zero") { massaNine = 0;}
						if (massaSg09PickStatus === "High"   && massaStatus === "Favorite"){ massaNine = 4;}
						if (massaSg09PickStatus === "High"   && massaStatus === "Very Likely"){ massaNine = 8;}
						if (massaSg09PickStatus === "High"   && massaStatus === "Less Likely"){ massaNine = 12;}
						if (massaSg09PickStatus === "High"   && massaStatus === "Underdog"){ massaNine = 16;}
						if (massaSg09PickStatus === "Medium" && massaStatus === "Favorite"){ massaNine = 6;}
						if (massaSg09PickStatus === "Medium" && massaStatus === "Very Likely"){ massaNine = 10;}
						if (massaSg09PickStatus === "Medium" && massaStatus === "Less Likely"){ massaNine = 14;}
						if (massaSg09PickStatus === "Medium" && massaStatus === "Underdog"){ massaNine = 18;}
						if (massaSg09PickStatus === "Low"    && massaStatus === "Favorite"){ massaNine = 8;}
						if (massaSg09PickStatus === "Low"    && massaStatus === "Very Likely"){ massaNine = 12;}
						if (massaSg09PickStatus === "Low"    && massaStatus === "Less Likely"){ massaNine = 16;}
						if (massaSg09PickStatus === "Low"    && massaStatus === "Underdog"){ massaNine = 20;}

						var massaTen;
						if (massaSg10PickStatus === "Zero") { massaTen = 0;}
						if (massaSg10PickStatus === "High"   && massaStatus === "Favorite"){ massaTen = 4;}
						if (massaSg10PickStatus === "High"   && massaStatus === "Very Likely"){ massaTen = 8;}
						if (massaSg10PickStatus === "High"   && massaStatus === "Less Likely"){ massaTen = 12;}
						if (massaSg10PickStatus === "High"   && massaStatus === "Underdog"){ massaTen = 16;}
						if (massaSg10PickStatus === "Medium" && massaStatus === "Favorite"){ massaTen = 6;}
						if (massaSg10PickStatus === "Medium" && massaStatus === "Very Likely"){ massaTen = 10;}
						if (massaSg10PickStatus === "Medium" && massaStatus === "Less Likely"){ massaTen = 14;}
						if (massaSg10PickStatus === "Medium" && massaStatus === "Underdog"){ massaTen = 18;}
						if (massaSg10PickStatus === "Low"    && massaStatus === "Favorite"){ massaTen = 8;}
						if (massaSg10PickStatus === "Low"    && massaStatus === "Very Likely"){ massaTen = 12;}
						if (massaSg10PickStatus === "Low"    && massaStatus === "Less Likely"){ massaTen = 16;}
						if (massaSg10PickStatus === "Low"    && massaStatus === "Underdog"){ massaTen = 20;}

						//Bottas
						var bottasOne;
						if (bottasSg01PickStatus === "Zero") { bottasOne = 0;}
						if (bottasSg01PickStatus === "High"   && bottasStatus === "Favorite"){ bottasOne = 4;}
						if (bottasSg01PickStatus === "High"   && bottasStatus === "Very Likely"){ bottasOne = 8;}
						if (bottasSg01PickStatus === "High"   && bottasStatus === "Less Likely"){ bottasOne = 12;}
						if (bottasSg01PickStatus === "High"   && bottasStatus === "Underdog"){ bottasOne = 16;}
						if (bottasSg01PickStatus === "Medium" && bottasStatus === "Favorite"){ bottasOne = 6;}
						if (bottasSg01PickStatus === "Medium" && bottasStatus === "Very Likely"){ bottasOne = 10;}
						if (bottasSg01PickStatus === "Medium" && bottasStatus === "Less Likely"){ bottasOne = 14;}
						if (bottasSg01PickStatus === "Medium" && bottasStatus === "Underdog"){ bottasOne = 18;}
						if (bottasSg01PickStatus === "Low"    && bottasStatus === "Favorite"){ bottasOne = 8;}
						if (bottasSg01PickStatus === "Low"    && bottasStatus === "Very Likely"){ bottasOne = 12;}
						if (bottasSg01PickStatus === "Low"    && bottasStatus === "Less Likely"){ bottasOne = 16;}
						if (bottasSg01PickStatus === "Low"    && bottasStatus === "Underdog"){ bottasOne = 20;}

						var bottasTwo;
						if (bottasSg02PickStatus === "Zero") { bottasTwo = 0;}
						if (bottasSg02PickStatus === "High"   && bottasStatus === "Favorite"){ bottasTwo = 4;}
						if (bottasSg02PickStatus === "High"   && bottasStatus === "Very Likely"){ bottasTwo = 8;}
						if (bottasSg02PickStatus === "High"   && bottasStatus === "Less Likely"){ bottasTwo = 12;}
						if (bottasSg02PickStatus === "High"   && bottasStatus === "Underdog"){ bottasTwo = 16;}
						if (bottasSg02PickStatus === "Medium" && bottasStatus === "Favorite"){ bottasTwo = 6;}
						if (bottasSg02PickStatus === "Medium" && bottasStatus === "Very Likely"){ bottasTwo = 10;}
						if (bottasSg02PickStatus === "Medium" && bottasStatus === "Less Likely"){ bottasTwo = 14;}
						if (bottasSg02PickStatus === "Medium" && bottasStatus === "Underdog"){ bottasTwo = 18;}
						if (bottasSg02PickStatus === "Low"    && bottasStatus === "Favorite"){ bottasTwo = 8;}
						if (bottasSg02PickStatus === "Low"    && bottasStatus === "Very Likely"){ bottasTwo = 12;}
						if (bottasSg02PickStatus === "Low"    && bottasStatus === "Less Likely"){ bottasTwo = 16;}
						if (bottasSg02PickStatus === "Low"    && bottasStatus === "Underdog"){ bottasTwo = 20;}

						var bottasThree;
						if (bottasSg03PickStatus === "Zero") { bottasThree = 0;}
						if (bottasSg03PickStatus === "High"   && bottasStatus === "Favorite"){ bottasThree = 4;}
						if (bottasSg03PickStatus === "High"   && bottasStatus === "Very Likely"){ bottasThree = 8;}
						if (bottasSg03PickStatus === "High"   && bottasStatus === "Less Likely"){ bottasThree = 12;}
						if (bottasSg03PickStatus === "High"   && bottasStatus === "Underdog"){ bottasThree = 16;}
						if (bottasSg03PickStatus === "Medium" && bottasStatus === "Favorite"){ bottasThree = 6;}
						if (bottasSg03PickStatus === "Medium" && bottasStatus === "Very Likely"){ bottasThree = 10;}
						if (bottasSg03PickStatus === "Medium" && bottasStatus === "Less Likely"){ bottasThree = 14;}
						if (bottasSg03PickStatus === "Medium" && bottasStatus === "Underdog"){ bottasThree = 18;}
						if (bottasSg03PickStatus === "Low"    && bottasStatus === "Favorite"){ bottasThree = 8;}
						if (bottasSg03PickStatus === "Low"    && bottasStatus === "Very Likely"){ bottasThree = 12;}
						if (bottasSg03PickStatus === "Low"    && bottasStatus === "Less Likely"){ bottasThree = 16;}
						if (bottasSg03PickStatus === "Low"    && bottasStatus === "Underdog"){ bottasThree = 20;}

						var bottasFour;
						if (bottasSg04PickStatus === "Zero") { bottasFour = 0;}
						if (bottasSg04PickStatus === "High"   && bottasStatus === "Favorite"){ bottasFour = 4;}
						if (bottasSg04PickStatus === "High"   && bottasStatus === "Very Likely"){ bottasFour = 8;}
						if (bottasSg04PickStatus === "High"   && bottasStatus === "Less Likely"){ bottasFour = 12;}
						if (bottasSg04PickStatus === "High"   && bottasStatus === "Underdog"){ bottasFour = 16;}
						if (bottasSg04PickStatus === "Medium" && bottasStatus === "Favorite"){ bottasFour = 6;}
						if (bottasSg04PickStatus === "Medium" && bottasStatus === "Very Likely"){ bottasFour = 10;}
						if (bottasSg04PickStatus === "Medium" && bottasStatus === "Less Likely"){ bottasFour = 14;}
						if (bottasSg04PickStatus === "Medium" && bottasStatus === "Underdog"){ bottasFour = 18;}
						if (bottasSg04PickStatus === "Low"    && bottasStatus === "Favorite"){ bottasFour = 8;}
						if (bottasSg04PickStatus === "Low"    && bottasStatus === "Very Likely"){ bottasFour = 12;}
						if (bottasSg04PickStatus === "Low"    && bottasStatus === "Less Likely"){ bottasFour = 16;}
						if (bottasSg04PickStatus === "Low"    && bottasStatus === "Underdog"){ bottasFour = 20;}

						var bottasFive;
						if (bottasSg05PickStatus === "Zero") { bottasFive = 0;}
						if (bottasSg05PickStatus === "High"   && bottasStatus === "Favorite"){ bottasFive = 4;}
						if (bottasSg05PickStatus === "High"   && bottasStatus === "Very Likely"){ bottasFive = 8;}
						if (bottasSg05PickStatus === "High"   && bottasStatus === "Less Likely"){ bottasFive = 12;}
						if (bottasSg05PickStatus === "High"   && bottasStatus === "Underdog"){ bottasFive = 16;}
						if (bottasSg05PickStatus === "Medium" && bottasStatus === "Favorite"){ bottasFive = 6;}
						if (bottasSg05PickStatus === "Medium" && bottasStatus === "Very Likely"){ bottasFive = 10;}
						if (bottasSg05PickStatus === "Medium" && bottasStatus === "Less Likely"){ bottasFive = 14;}
						if (bottasSg05PickStatus === "Medium" && bottasStatus === "Underdog"){ bottasFive = 18;}
						if (bottasSg05PickStatus === "Low"    && bottasStatus === "Favorite"){ bottasFive = 8;}
						if (bottasSg05PickStatus === "Low"    && bottasStatus === "Very Likely"){ bottasFive = 12;}
						if (bottasSg05PickStatus === "Low"    && bottasStatus === "Less Likely"){ bottasFive = 16;}
						if (bottasSg05PickStatus === "Low"    && bottasStatus === "Underdog"){ bottasFive = 20;}

						var bottasSix;
						if (bottasSg06PickStatus === "Zero") { bottasSix = 0;}
						if (bottasSg06PickStatus === "High"   && bottasStatus === "Favorite"){ bottasSix = 4;}
						if (bottasSg06PickStatus === "High"   && bottasStatus === "Very Likely"){ bottasSix = 8;}
						if (bottasSg06PickStatus === "High"   && bottasStatus === "Less Likely"){ bottasSix = 12;}
						if (bottasSg06PickStatus === "High"   && bottasStatus === "Underdog"){ bottasSix = 16;}
						if (bottasSg06PickStatus === "Medium" && bottasStatus === "Favorite"){ bottasSix = 6;}
						if (bottasSg06PickStatus === "Medium" && bottasStatus === "Very Likely"){ bottasSix = 10;}
						if (bottasSg06PickStatus === "Medium" && bottasStatus === "Less Likely"){ bottasSix = 14;}
						if (bottasSg06PickStatus === "Medium" && bottasStatus === "Underdog"){ bottasSix = 18;}
						if (bottasSg06PickStatus === "Low"    && bottasStatus === "Favorite"){ bottasSix = 8;}
						if (bottasSg06PickStatus === "Low"    && bottasStatus === "Very Likely"){ bottasSix = 12;}
						if (bottasSg06PickStatus === "Low"    && bottasStatus === "Less Likely"){ bottasSix = 16;}
						if (bottasSg06PickStatus === "Low"    && bottasStatus === "Underdog"){ bottasSix = 20;}

						var bottasSeven;
						if (bottasSg07PickStatus === "Zero") { bottasSeven = 0;}
						if (bottasSg07PickStatus === "High"   && bottasStatus === "Favorite"){ bottasSeven = 4;}
						if (bottasSg07PickStatus === "High"   && bottasStatus === "Very Likely"){ bottasSeven = 8;}
						if (bottasSg07PickStatus === "High"   && bottasStatus === "Less Likely"){ bottasSeven = 12;}
						if (bottasSg07PickStatus === "High"   && bottasStatus === "Underdog"){ bottasSeven = 16;}
						if (bottasSg07PickStatus === "Medium" && bottasStatus === "Favorite"){ bottasSeven = 6;}
						if (bottasSg07PickStatus === "Medium" && bottasStatus === "Very Likely"){ bottasSeven = 10;}
						if (bottasSg07PickStatus === "Medium" && bottasStatus === "Less Likely"){ bottasSeven = 14;}
						if (bottasSg07PickStatus === "Medium" && bottasStatus === "Underdog"){ bottasSeven = 18;}
						if (bottasSg07PickStatus === "Low"    && bottasStatus === "Favorite"){ bottasSeven = 8;}
						if (bottasSg07PickStatus === "Low"    && bottasStatus === "Very Likely"){ bottasSeven = 12;}
						if (bottasSg07PickStatus === "Low"    && bottasStatus === "Less Likely"){ bottasSeven = 16;}
						if (bottasSg07PickStatus === "Low"    && bottasStatus === "Underdog"){ bottasSeven = 20;}

						var bottasEight;
						if (bottasSg08PickStatus === "Zero") { bottasEight = 0;}
						if (bottasSg08PickStatus === "High"   && bottasStatus === "Favorite"){ bottasEight = 4;}
						if (bottasSg08PickStatus === "High"   && bottasStatus === "Very Likely"){ bottasEight = 8;}
						if (bottasSg08PickStatus === "High"   && bottasStatus === "Less Likely"){ bottasEight = 12;}
						if (bottasSg08PickStatus === "High"   && bottasStatus === "Underdog"){ bottasEight = 16;}
						if (bottasSg08PickStatus === "Medium" && bottasStatus === "Favorite"){ bottasEight = 6;}
						if (bottasSg08PickStatus === "Medium" && bottasStatus === "Very Likely"){ bottasEight = 10;}
						if (bottasSg08PickStatus === "Medium" && bottasStatus === "Less Likely"){ bottasEight = 14;}
						if (bottasSg08PickStatus === "Medium" && bottasStatus === "Underdog"){ bottasEight = 18;}
						if (bottasSg08PickStatus === "Low"    && bottasStatus === "Favorite"){ bottasEight = 8;}
						if (bottasSg08PickStatus === "Low"    && bottasStatus === "Very Likely"){ bottasEight = 12;}
						if (bottasSg08PickStatus === "Low"    && bottasStatus === "Less Likely"){ bottasEight = 16;}
						if (bottasSg08PickStatus === "Low"    && bottasStatus === "Underdog"){ bottasEight = 20;}

						var bottasNine;
						if (bottasSg09PickStatus === "Zero") { bottasNine = 0;}
						if (bottasSg09PickStatus === "High"   && bottasStatus === "Favorite"){ bottasNine = 4;}
						if (bottasSg09PickStatus === "High"   && bottasStatus === "Very Likely"){ bottasNine = 8;}
						if (bottasSg09PickStatus === "High"   && bottasStatus === "Less Likely"){ bottasNine = 12;}
						if (bottasSg09PickStatus === "High"   && bottasStatus === "Underdog"){ bottasNine = 16;}
						if (bottasSg09PickStatus === "Medium" && bottasStatus === "Favorite"){ bottasNine = 6;}
						if (bottasSg09PickStatus === "Medium" && bottasStatus === "Very Likely"){ bottasNine = 10;}
						if (bottasSg09PickStatus === "Medium" && bottasStatus === "Less Likely"){ bottasNine = 14;}
						if (bottasSg09PickStatus === "Medium" && bottasStatus === "Underdog"){ bottasNine = 18;}
						if (bottasSg09PickStatus === "Low"    && bottasStatus === "Favorite"){ bottasNine = 8;}
						if (bottasSg09PickStatus === "Low"    && bottasStatus === "Very Likely"){ bottasNine = 12;}
						if (bottasSg09PickStatus === "Low"    && bottasStatus === "Less Likely"){ bottasNine = 16;}
						if (bottasSg09PickStatus === "Low"    && bottasStatus === "Underdog"){ bottasNine = 20;}

						var bottasTen;
						if (bottasSg10PickStatus === "Zero") { bottasTen = 0;}
						if (bottasSg10PickStatus === "High"   && bottasStatus === "Favorite"){ bottasTen = 4;}
						if (bottasSg10PickStatus === "High"   && bottasStatus === "Very Likely"){ bottasTen = 8;}
						if (bottasSg10PickStatus === "High"   && bottasStatus === "Less Likely"){ bottasTen = 12;}
						if (bottasSg10PickStatus === "High"   && bottasStatus === "Underdog"){ bottasTen = 16;}
						if (bottasSg10PickStatus === "Medium" && bottasStatus === "Favorite"){ bottasTen = 6;}
						if (bottasSg10PickStatus === "Medium" && bottasStatus === "Very Likely"){ bottasTen = 10;}
						if (bottasSg10PickStatus === "Medium" && bottasStatus === "Less Likely"){ bottasTen = 14;}
						if (bottasSg10PickStatus === "Medium" && bottasStatus === "Underdog"){ bottasTen = 18;}
						if (bottasSg10PickStatus === "Low"    && bottasStatus === "Favorite"){ bottasTen = 8;}
						if (bottasSg10PickStatus === "Low"    && bottasStatus === "Very Likely"){ bottasTen = 12;}
						if (bottasSg10PickStatus === "Low"    && bottasStatus === "Less Likely"){ bottasTen = 16;}
						if (bottasSg10PickStatus === "Low"    && bottasStatus === "Underdog"){ bottasTen = 20;}

						//Kvyat
						var kvyatOne;
						if (kvyatSg01PickStatus === "Zero") { kvyatOne = 0;}
						if (kvyatSg01PickStatus === "High"   && kvyatStatus === "Favorite"){ kvyatOne = 4;}
						if (kvyatSg01PickStatus === "High"   && kvyatStatus === "Very Likely"){ kvyatOne = 8;}
						if (kvyatSg01PickStatus === "High"   && kvyatStatus === "Less Likely"){ kvyatOne = 12;}
						if (kvyatSg01PickStatus === "High"   && kvyatStatus === "Underdog"){ kvyatOne = 16;}
						if (kvyatSg01PickStatus === "Medium" && kvyatStatus === "Favorite"){ kvyatOne = 6;}
						if (kvyatSg01PickStatus === "Medium" && kvyatStatus === "Very Likely"){ kvyatOne = 10;}
						if (kvyatSg01PickStatus === "Medium" && kvyatStatus === "Less Likely"){ kvyatOne = 14;}
						if (kvyatSg01PickStatus === "Medium" && kvyatStatus === "Underdog"){ kvyatOne = 18;}
						if (kvyatSg01PickStatus === "Low"    && kvyatStatus === "Favorite"){ kvyatOne = 8;}
						if (kvyatSg01PickStatus === "Low"    && kvyatStatus === "Very Likely"){ kvyatOne = 12;}
						if (kvyatSg01PickStatus === "Low"    && kvyatStatus === "Less Likely"){ kvyatOne = 16;}
						if (kvyatSg01PickStatus === "Low"    && kvyatStatus === "Underdog"){ kvyatOne = 20;}

						var kvyatTwo;
						if (kvyatSg02PickStatus === "Zero") { kvyatTwo = 0;}
						if (kvyatSg02PickStatus === "High"   && kvyatStatus === "Favorite"){ kvyatTwo = 4;}
						if (kvyatSg02PickStatus === "High"   && kvyatStatus === "Very Likely"){ kvyatTwo = 8;}
						if (kvyatSg02PickStatus === "High"   && kvyatStatus === "Less Likely"){ kvyatTwo = 12;}
						if (kvyatSg02PickStatus === "High"   && kvyatStatus === "Underdog"){ kvyatTwo = 16;}
						if (kvyatSg02PickStatus === "Medium" && kvyatStatus === "Favorite"){ kvyatTwo = 6;}
						if (kvyatSg02PickStatus === "Medium" && kvyatStatus === "Very Likely"){ kvyatTwo = 10;}
						if (kvyatSg02PickStatus === "Medium" && kvyatStatus === "Less Likely"){ kvyatTwo = 14;}
						if (kvyatSg02PickStatus === "Medium" && kvyatStatus === "Underdog"){ kvyatTwo = 18;}
						if (kvyatSg02PickStatus === "Low"    && kvyatStatus === "Favorite"){ kvyatTwo = 8;}
						if (kvyatSg02PickStatus === "Low"    && kvyatStatus === "Very Likely"){ kvyatTwo = 12;}
						if (kvyatSg02PickStatus === "Low"    && kvyatStatus === "Less Likely"){ kvyatTwo = 16;}
						if (kvyatSg02PickStatus === "Low"    && kvyatStatus === "Underdog"){ kvyatTwo = 20;}

						var kvyatThree;
						if (kvyatSg03PickStatus === "Zero") { kvyatThree = 0;}
						if (kvyatSg03PickStatus === "High"   && kvyatStatus === "Favorite"){ kvyatThree = 4;}
						if (kvyatSg03PickStatus === "High"   && kvyatStatus === "Very Likely"){ kvyatThree = 8;}
						if (kvyatSg03PickStatus === "High"   && kvyatStatus === "Less Likely"){ kvyatThree = 12;}
						if (kvyatSg03PickStatus === "High"   && kvyatStatus === "Underdog"){ kvyatThree = 16;}
						if (kvyatSg03PickStatus === "Medium" && kvyatStatus === "Favorite"){ kvyatThree = 6;}
						if (kvyatSg03PickStatus === "Medium" && kvyatStatus === "Very Likely"){ kvyatThree = 10;}
						if (kvyatSg03PickStatus === "Medium" && kvyatStatus === "Less Likely"){ kvyatThree = 14;}
						if (kvyatSg03PickStatus === "Medium" && kvyatStatus === "Underdog"){ kvyatThree = 18;}
						if (kvyatSg03PickStatus === "Low"    && kvyatStatus === "Favorite"){ kvyatThree = 8;}
						if (kvyatSg03PickStatus === "Low"    && kvyatStatus === "Very Likely"){ kvyatThree = 12;}
						if (kvyatSg03PickStatus === "Low"    && kvyatStatus === "Less Likely"){ kvyatThree = 16;}
						if (kvyatSg03PickStatus === "Low"    && kvyatStatus === "Underdog"){ kvyatThree = 20;}

						var kvyatFour;
						if (kvyatSg04PickStatus === "Zero") { kvyatFour = 0;}
						if (kvyatSg04PickStatus === "High"   && kvyatStatus === "Favorite"){ kvyatFour = 4;}
						if (kvyatSg04PickStatus === "High"   && kvyatStatus === "Very Likely"){ kvyatFour = 8;}
						if (kvyatSg04PickStatus === "High"   && kvyatStatus === "Less Likely"){ kvyatFour = 12;}
						if (kvyatSg04PickStatus === "High"   && kvyatStatus === "Underdog"){ kvyatFour = 16;}
						if (kvyatSg04PickStatus === "Medium" && kvyatStatus === "Favorite"){ kvyatFour = 6;}
						if (kvyatSg04PickStatus === "Medium" && kvyatStatus === "Very Likely"){ kvyatFour = 10;}
						if (kvyatSg04PickStatus === "Medium" && kvyatStatus === "Less Likely"){ kvyatFour = 14;}
						if (kvyatSg04PickStatus === "Medium" && kvyatStatus === "Underdog"){ kvyatFour = 18;}
						if (kvyatSg04PickStatus === "Low"    && kvyatStatus === "Favorite"){ kvyatFour = 8;}
						if (kvyatSg04PickStatus === "Low"    && kvyatStatus === "Very Likely"){ kvyatFour = 12;}
						if (kvyatSg04PickStatus === "Low"    && kvyatStatus === "Less Likely"){ kvyatFour = 16;}
						if (kvyatSg04PickStatus === "Low"    && kvyatStatus === "Underdog"){ kvyatFour = 20;}

						var kvyatFive;
						if (kvyatSg05PickStatus === "Zero") { kvyatFive = 0;}
						if (kvyatSg05PickStatus === "High"   && kvyatStatus === "Favorite"){ kvyatFive = 4;}
						if (kvyatSg05PickStatus === "High"   && kvyatStatus === "Very Likely"){ kvyatFive = 8;}
						if (kvyatSg05PickStatus === "High"   && kvyatStatus === "Less Likely"){ kvyatFive = 12;}
						if (kvyatSg05PickStatus === "High"   && kvyatStatus === "Underdog"){ kvyatFive = 16;}
						if (kvyatSg05PickStatus === "Medium" && kvyatStatus === "Favorite"){ kvyatFive = 6;}
						if (kvyatSg05PickStatus === "Medium" && kvyatStatus === "Very Likely"){ kvyatFive = 10;}
						if (kvyatSg05PickStatus === "Medium" && kvyatStatus === "Less Likely"){ kvyatFive = 14;}
						if (kvyatSg05PickStatus === "Medium" && kvyatStatus === "Underdog"){ kvyatFive = 18;}
						if (kvyatSg05PickStatus === "Low"    && kvyatStatus === "Favorite"){ kvyatFive = 8;}
						if (kvyatSg05PickStatus === "Low"    && kvyatStatus === "Very Likely"){ kvyatFive = 12;}
						if (kvyatSg05PickStatus === "Low"    && kvyatStatus === "Less Likely"){ kvyatFive = 16;}
						if (kvyatSg05PickStatus === "Low"    && kvyatStatus === "Underdog"){ kvyatFive = 20;}

						var kvyatSix;
						if (kvyatSg06PickStatus === "Zero") { kvyatSix = 0;}
						if (kvyatSg06PickStatus === "High"   && kvyatStatus === "Favorite"){ kvyatSix = 4;}
						if (kvyatSg06PickStatus === "High"   && kvyatStatus === "Very Likely"){ kvyatSix = 8;}
						if (kvyatSg06PickStatus === "High"   && kvyatStatus === "Less Likely"){ kvyatSix = 12;}
						if (kvyatSg06PickStatus === "High"   && kvyatStatus === "Underdog"){ kvyatSix = 16;}
						if (kvyatSg06PickStatus === "Medium" && kvyatStatus === "Favorite"){ kvyatSix = 6;}
						if (kvyatSg06PickStatus === "Medium" && kvyatStatus === "Very Likely"){ kvyatSix = 10;}
						if (kvyatSg06PickStatus === "Medium" && kvyatStatus === "Less Likely"){ kvyatSix = 14;}
						if (kvyatSg06PickStatus === "Medium" && kvyatStatus === "Underdog"){ kvyatSix = 18;}
						if (kvyatSg06PickStatus === "Low"    && kvyatStatus === "Favorite"){ kvyatSix = 8;}
						if (kvyatSg06PickStatus === "Low"    && kvyatStatus === "Very Likely"){ kvyatSix = 12;}
						if (kvyatSg06PickStatus === "Low"    && kvyatStatus === "Less Likely"){ kvyatSix = 16;}
						if (kvyatSg06PickStatus === "Low"    && kvyatStatus === "Underdog"){ kvyatSix = 20;}

						var kvyatSeven;
						if (kvyatSg07PickStatus === "Zero") { kvyatSeven = 0;}
						if (kvyatSg07PickStatus === "High"   && kvyatStatus === "Favorite"){ kvyatSeven = 4;}
						if (kvyatSg07PickStatus === "High"   && kvyatStatus === "Very Likely"){ kvyatSeven = 8;}
						if (kvyatSg07PickStatus === "High"   && kvyatStatus === "Less Likely"){ kvyatSeven = 12;}
						if (kvyatSg07PickStatus === "High"   && kvyatStatus === "Underdog"){ kvyatSeven = 16;}
						if (kvyatSg07PickStatus === "Medium" && kvyatStatus === "Favorite"){ kvyatSeven = 6;}
						if (kvyatSg07PickStatus === "Medium" && kvyatStatus === "Very Likely"){ kvyatSeven = 10;}
						if (kvyatSg07PickStatus === "Medium" && kvyatStatus === "Less Likely"){ kvyatSeven = 14;}
						if (kvyatSg07PickStatus === "Medium" && kvyatStatus === "Underdog"){ kvyatSeven = 18;}
						if (kvyatSg07PickStatus === "Low"    && kvyatStatus === "Favorite"){ kvyatSeven = 8;}
						if (kvyatSg07PickStatus === "Low"    && kvyatStatus === "Very Likely"){ kvyatSeven = 12;}
						if (kvyatSg07PickStatus === "Low"    && kvyatStatus === "Less Likely"){ kvyatSeven = 16;}
						if (kvyatSg07PickStatus === "Low"    && kvyatStatus === "Underdog"){ kvyatSeven = 20;}

						var kvyatEight;
						if (kvyatSg08PickStatus === "Zero") { kvyatEight = 0;}
						if (kvyatSg08PickStatus === "High"   && kvyatStatus === "Favorite"){ kvyatEight = 4;}
						if (kvyatSg08PickStatus === "High"   && kvyatStatus === "Very Likely"){ kvyatEight = 8;}
						if (kvyatSg08PickStatus === "High"   && kvyatStatus === "Less Likely"){ kvyatEight = 12;}
						if (kvyatSg08PickStatus === "High"   && kvyatStatus === "Underdog"){ kvyatEight = 16;}
						if (kvyatSg08PickStatus === "Medium" && kvyatStatus === "Favorite"){ kvyatEight = 6;}
						if (kvyatSg08PickStatus === "Medium" && kvyatStatus === "Very Likely"){ kvyatEight = 10;}
						if (kvyatSg08PickStatus === "Medium" && kvyatStatus === "Less Likely"){ kvyatEight = 14;}
						if (kvyatSg08PickStatus === "Medium" && kvyatStatus === "Underdog"){ kvyatEight = 18;}
						if (kvyatSg08PickStatus === "Low"    && kvyatStatus === "Favorite"){ kvyatEight = 8;}
						if (kvyatSg08PickStatus === "Low"    && kvyatStatus === "Very Likely"){ kvyatEight = 12;}
						if (kvyatSg08PickStatus === "Low"    && kvyatStatus === "Less Likely"){ kvyatEight = 16;}
						if (kvyatSg08PickStatus === "Low"    && kvyatStatus === "Underdog"){ kvyatEight = 20;}

						var kvyatNine;
						if (kvyatSg09PickStatus === "Zero") { kvyatNine = 0;}
						if (kvyatSg09PickStatus === "High"   && kvyatStatus === "Favorite"){ kvyatNine = 4;}
						if (kvyatSg09PickStatus === "High"   && kvyatStatus === "Very Likely"){ kvyatNine = 8;}
						if (kvyatSg09PickStatus === "High"   && kvyatStatus === "Less Likely"){ kvyatNine = 12;}
						if (kvyatSg09PickStatus === "High"   && kvyatStatus === "Underdog"){ kvyatNine = 16;}
						if (kvyatSg09PickStatus === "Medium" && kvyatStatus === "Favorite"){ kvyatNine = 6;}
						if (kvyatSg09PickStatus === "Medium" && kvyatStatus === "Very Likely"){ kvyatNine = 10;}
						if (kvyatSg09PickStatus === "Medium" && kvyatStatus === "Less Likely"){ kvyatNine = 14;}
						if (kvyatSg09PickStatus === "Medium" && kvyatStatus === "Underdog"){ kvyatNine = 18;}
						if (kvyatSg09PickStatus === "Low"    && kvyatStatus === "Favorite"){ kvyatNine = 8;}
						if (kvyatSg09PickStatus === "Low"    && kvyatStatus === "Very Likely"){ kvyatNine = 12;}
						if (kvyatSg09PickStatus === "Low"    && kvyatStatus === "Less Likely"){ kvyatNine = 16;}
						if (kvyatSg09PickStatus === "Low"    && kvyatStatus === "Underdog"){ kvyatNine = 20;}

						var kvyatTen;
						if (kvyatSg10PickStatus === "Zero") { kvyatTen = 0;}
						if (kvyatSg10PickStatus === "High"   && kvyatStatus === "Favorite"){ kvyatTen = 4;}
						if (kvyatSg10PickStatus === "High"   && kvyatStatus === "Very Likely"){ kvyatTen = 8;}
						if (kvyatSg10PickStatus === "High"   && kvyatStatus === "Less Likely"){ kvyatTen = 12;}
						if (kvyatSg10PickStatus === "High"   && kvyatStatus === "Underdog"){ kvyatTen = 16;}
						if (kvyatSg10PickStatus === "Medium" && kvyatStatus === "Favorite"){ kvyatTen = 6;}
						if (kvyatSg10PickStatus === "Medium" && kvyatStatus === "Very Likely"){ kvyatTen = 10;}
						if (kvyatSg10PickStatus === "Medium" && kvyatStatus === "Less Likely"){ kvyatTen = 14;}
						if (kvyatSg10PickStatus === "Medium" && kvyatStatus === "Underdog"){ kvyatTen = 18;}
						if (kvyatSg10PickStatus === "Low"    && kvyatStatus === "Favorite"){ kvyatTen = 8;}
						if (kvyatSg10PickStatus === "Low"    && kvyatStatus === "Very Likely"){ kvyatTen = 12;}
						if (kvyatSg10PickStatus === "Low"    && kvyatStatus === "Less Likely"){ kvyatTen = 16;}
						if (kvyatSg10PickStatus === "Low"    && kvyatStatus === "Underdog"){ kvyatTen = 20;}

						//Ricciardo
						var ricciardoOne;
						if (ricciardoSg01PickStatus === "Zero") { ricciardoOne = 0;}
						if (ricciardoSg01PickStatus === "High"   && ricciardoStatus === "Favorite"){ ricciardoOne = 4;}
						if (ricciardoSg01PickStatus === "High"   && ricciardoStatus === "Very Likely"){ ricciardoOne = 8;}
						if (ricciardoSg01PickStatus === "High"   && ricciardoStatus === "Less Likely"){ ricciardoOne = 12;}
						if (ricciardoSg01PickStatus === "High"   && ricciardoStatus === "Underdog"){ ricciardoOne = 16;}
						if (ricciardoSg01PickStatus === "Medium" && ricciardoStatus === "Favorite"){ ricciardoOne = 6;}
						if (ricciardoSg01PickStatus === "Medium" && ricciardoStatus === "Very Likely"){ ricciardoOne = 10;}
						if (ricciardoSg01PickStatus === "Medium" && ricciardoStatus === "Less Likely"){ ricciardoOne = 14;}
						if (ricciardoSg01PickStatus === "Medium" && ricciardoStatus === "Underdog"){ ricciardoOne = 18;}
						if (ricciardoSg01PickStatus === "Low"    && ricciardoStatus === "Favorite"){ ricciardoOne = 8;}
						if (ricciardoSg01PickStatus === "Low"    && ricciardoStatus === "Very Likely"){ ricciardoOne = 12;}
						if (ricciardoSg01PickStatus === "Low"    && ricciardoStatus === "Less Likely"){ ricciardoOne = 16;}
						if (ricciardoSg01PickStatus === "Low"    && ricciardoStatus === "Underdog"){ ricciardoOne = 20;}

						var ricciardoTwo;
						if (ricciardoSg02PickStatus === "Zero") { ricciardoTwo = 0;}
						if (ricciardoSg02PickStatus === "High"   && ricciardoStatus === "Favorite"){ ricciardoTwo = 4;}
						if (ricciardoSg02PickStatus === "High"   && ricciardoStatus === "Very Likely"){ ricciardoTwo = 8;}
						if (ricciardoSg02PickStatus === "High"   && ricciardoStatus === "Less Likely"){ ricciardoTwo = 12;}
						if (ricciardoSg02PickStatus === "High"   && ricciardoStatus === "Underdog"){ ricciardoTwo = 16;}
						if (ricciardoSg02PickStatus === "Medium" && ricciardoStatus === "Favorite"){ ricciardoTwo = 6;}
						if (ricciardoSg02PickStatus === "Medium" && ricciardoStatus === "Very Likely"){ ricciardoTwo = 10;}
						if (ricciardoSg02PickStatus === "Medium" && ricciardoStatus === "Less Likely"){ ricciardoTwo = 14;}
						if (ricciardoSg02PickStatus === "Medium" && ricciardoStatus === "Underdog"){ ricciardoTwo = 18;}
						if (ricciardoSg02PickStatus === "Low"    && ricciardoStatus === "Favorite"){ ricciardoTwo = 8;}
						if (ricciardoSg02PickStatus === "Low"    && ricciardoStatus === "Very Likely"){ ricciardoTwo = 12;}
						if (ricciardoSg02PickStatus === "Low"    && ricciardoStatus === "Less Likely"){ ricciardoTwo = 16;}
						if (ricciardoSg02PickStatus === "Low"    && ricciardoStatus === "Underdog"){ ricciardoTwo = 20;}

						var ricciardoThree;
						if (ricciardoSg03PickStatus === "Zero") { ricciardoThree = 0;}
						if (ricciardoSg03PickStatus === "High"   && ricciardoStatus === "Favorite"){ ricciardoThree = 4;}
						if (ricciardoSg03PickStatus === "High"   && ricciardoStatus === "Very Likely"){ ricciardoThree = 8;}
						if (ricciardoSg03PickStatus === "High"   && ricciardoStatus === "Less Likely"){ ricciardoThree = 12;}
						if (ricciardoSg03PickStatus === "High"   && ricciardoStatus === "Underdog"){ ricciardoThree = 16;}
						if (ricciardoSg03PickStatus === "Medium" && ricciardoStatus === "Favorite"){ ricciardoThree = 6;}
						if (ricciardoSg03PickStatus === "Medium" && ricciardoStatus === "Very Likely"){ ricciardoThree = 10;}
						if (ricciardoSg03PickStatus === "Medium" && ricciardoStatus === "Less Likely"){ ricciardoThree = 14;}
						if (ricciardoSg03PickStatus === "Medium" && ricciardoStatus === "Underdog"){ ricciardoThree = 18;}
						if (ricciardoSg03PickStatus === "Low"    && ricciardoStatus === "Favorite"){ ricciardoThree = 8;}
						if (ricciardoSg03PickStatus === "Low"    && ricciardoStatus === "Very Likely"){ ricciardoThree = 12;}
						if (ricciardoSg03PickStatus === "Low"    && ricciardoStatus === "Less Likely"){ ricciardoThree = 16;}
						if (ricciardoSg03PickStatus === "Low"    && ricciardoStatus === "Underdog"){ ricciardoThree = 20;}

						var ricciardoFour;
						if (ricciardoSg04PickStatus === "Zero") { ricciardoFour = 0;}
						if (ricciardoSg04PickStatus === "High"   && ricciardoStatus === "Favorite"){ ricciardoFour = 4;}
						if (ricciardoSg04PickStatus === "High"   && ricciardoStatus === "Very Likely"){ ricciardoFour = 8;}
						if (ricciardoSg04PickStatus === "High"   && ricciardoStatus === "Less Likely"){ ricciardoFour = 12;}
						if (ricciardoSg04PickStatus === "High"   && ricciardoStatus === "Underdog"){ ricciardoFour = 16;}
						if (ricciardoSg04PickStatus === "Medium" && ricciardoStatus === "Favorite"){ ricciardoFour = 6;}
						if (ricciardoSg04PickStatus === "Medium" && ricciardoStatus === "Very Likely"){ ricciardoFour = 10;}
						if (ricciardoSg04PickStatus === "Medium" && ricciardoStatus === "Less Likely"){ ricciardoFour = 14;}
						if (ricciardoSg04PickStatus === "Medium" && ricciardoStatus === "Underdog"){ ricciardoFour = 18;}
						if (ricciardoSg04PickStatus === "Low"    && ricciardoStatus === "Favorite"){ ricciardoFour = 8;}
						if (ricciardoSg04PickStatus === "Low"    && ricciardoStatus === "Very Likely"){ ricciardoFour = 12;}
						if (ricciardoSg04PickStatus === "Low"    && ricciardoStatus === "Less Likely"){ ricciardoFour = 16;}
						if (ricciardoSg04PickStatus === "Low"    && ricciardoStatus === "Underdog"){ ricciardoFour = 20;}

						var ricciardoFive;
						if (ricciardoSg05PickStatus === "Zero") { ricciardoFive = 0;}
						if (ricciardoSg05PickStatus === "High"   && ricciardoStatus === "Favorite"){ ricciardoFive = 4;}
						if (ricciardoSg05PickStatus === "High"   && ricciardoStatus === "Very Likely"){ ricciardoFive = 8;}
						if (ricciardoSg05PickStatus === "High"   && ricciardoStatus === "Less Likely"){ ricciardoFive = 12;}
						if (ricciardoSg05PickStatus === "High"   && ricciardoStatus === "Underdog"){ ricciardoFive = 16;}
						if (ricciardoSg05PickStatus === "Medium" && ricciardoStatus === "Favorite"){ ricciardoFive = 6;}
						if (ricciardoSg05PickStatus === "Medium" && ricciardoStatus === "Very Likely"){ ricciardoFive = 10;}
						if (ricciardoSg05PickStatus === "Medium" && ricciardoStatus === "Less Likely"){ ricciardoFive = 14;}
						if (ricciardoSg05PickStatus === "Medium" && ricciardoStatus === "Underdog"){ ricciardoFive = 18;}
						if (ricciardoSg05PickStatus === "Low"    && ricciardoStatus === "Favorite"){ ricciardoFive = 8;}
						if (ricciardoSg05PickStatus === "Low"    && ricciardoStatus === "Very Likely"){ ricciardoFive = 12;}
						if (ricciardoSg05PickStatus === "Low"    && ricciardoStatus === "Less Likely"){ ricciardoFive = 16;}
						if (ricciardoSg05PickStatus === "Low"    && ricciardoStatus === "Underdog"){ ricciardoFive = 20;}

						var ricciardoSix;
						if (ricciardoSg06PickStatus === "Zero") { ricciardoSix = 0;}
						if (ricciardoSg06PickStatus === "High"   && ricciardoStatus === "Favorite"){ ricciardoSix = 4;}
						if (ricciardoSg06PickStatus === "High"   && ricciardoStatus === "Very Likely"){ ricciardoSix = 8;}
						if (ricciardoSg06PickStatus === "High"   && ricciardoStatus === "Less Likely"){ ricciardoSix = 12;}
						if (ricciardoSg06PickStatus === "High"   && ricciardoStatus === "Underdog"){ ricciardoSix = 16;}
						if (ricciardoSg06PickStatus === "Medium" && ricciardoStatus === "Favorite"){ ricciardoSix = 6;}
						if (ricciardoSg06PickStatus === "Medium" && ricciardoStatus === "Very Likely"){ ricciardoSix = 10;}
						if (ricciardoSg06PickStatus === "Medium" && ricciardoStatus === "Less Likely"){ ricciardoSix = 14;}
						if (ricciardoSg06PickStatus === "Medium" && ricciardoStatus === "Underdog"){ ricciardoSix = 18;}
						if (ricciardoSg06PickStatus === "Low"    && ricciardoStatus === "Favorite"){ ricciardoSix = 8;}
						if (ricciardoSg06PickStatus === "Low"    && ricciardoStatus === "Very Likely"){ ricciardoSix = 12;}
						if (ricciardoSg06PickStatus === "Low"    && ricciardoStatus === "Less Likely"){ ricciardoSix = 16;}
						if (ricciardoSg06PickStatus === "Low"    && ricciardoStatus === "Underdog"){ ricciardoSix = 20;}

						var ricciardoSeven;
						if (ricciardoSg07PickStatus === "Zero") { ricciardoSeven = 0;}
						if (ricciardoSg07PickStatus === "High"   && ricciardoStatus === "Favorite"){ ricciardoSeven = 4;}
						if (ricciardoSg07PickStatus === "High"   && ricciardoStatus === "Very Likely"){ ricciardoSeven = 8;}
						if (ricciardoSg07PickStatus === "High"   && ricciardoStatus === "Less Likely"){ ricciardoSeven = 12;}
						if (ricciardoSg07PickStatus === "High"   && ricciardoStatus === "Underdog"){ ricciardoSeven = 16;}
						if (ricciardoSg07PickStatus === "Medium" && ricciardoStatus === "Favorite"){ ricciardoSeven = 6;}
						if (ricciardoSg07PickStatus === "Medium" && ricciardoStatus === "Very Likely"){ ricciardoSeven = 10;}
						if (ricciardoSg07PickStatus === "Medium" && ricciardoStatus === "Less Likely"){ ricciardoSeven = 14;}
						if (ricciardoSg07PickStatus === "Medium" && ricciardoStatus === "Underdog"){ ricciardoSeven = 18;}
						if (ricciardoSg07PickStatus === "Low"    && ricciardoStatus === "Favorite"){ ricciardoSeven = 8;}
						if (ricciardoSg07PickStatus === "Low"    && ricciardoStatus === "Very Likely"){ ricciardoSeven = 12;}
						if (ricciardoSg07PickStatus === "Low"    && ricciardoStatus === "Less Likely"){ ricciardoSeven = 16;}
						if (ricciardoSg07PickStatus === "Low"    && ricciardoStatus === "Underdog"){ ricciardoSeven = 20;}

						var ricciardoEight;
						if (ricciardoSg08PickStatus === "Zero") { ricciardoEight = 0;}
						if (ricciardoSg08PickStatus === "High"   && ricciardoStatus === "Favorite"){ ricciardoEight = 4;}
						if (ricciardoSg08PickStatus === "High"   && ricciardoStatus === "Very Likely"){ ricciardoEight = 8;}
						if (ricciardoSg08PickStatus === "High"   && ricciardoStatus === "Less Likely"){ ricciardoEight = 12;}
						if (ricciardoSg08PickStatus === "High"   && ricciardoStatus === "Underdog"){ ricciardoEight = 16;}
						if (ricciardoSg08PickStatus === "Medium" && ricciardoStatus === "Favorite"){ ricciardoEight = 6;}
						if (ricciardoSg08PickStatus === "Medium" && ricciardoStatus === "Very Likely"){ ricciardoEight = 10;}
						if (ricciardoSg08PickStatus === "Medium" && ricciardoStatus === "Less Likely"){ ricciardoEight = 14;}
						if (ricciardoSg08PickStatus === "Medium" && ricciardoStatus === "Underdog"){ ricciardoEight = 18;}
						if (ricciardoSg08PickStatus === "Low"    && ricciardoStatus === "Favorite"){ ricciardoEight = 8;}
						if (ricciardoSg08PickStatus === "Low"    && ricciardoStatus === "Very Likely"){ ricciardoEight = 12;}
						if (ricciardoSg08PickStatus === "Low"    && ricciardoStatus === "Less Likely"){ ricciardoEight = 16;}
						if (ricciardoSg08PickStatus === "Low"    && ricciardoStatus === "Underdog"){ ricciardoEight = 20;}

						var ricciardoNine;
						if (ricciardoSg09PickStatus === "Zero") { ricciardoNine = 0;}
						if (ricciardoSg09PickStatus === "High"   && ricciardoStatus === "Favorite"){ ricciardoNine = 4;}
						if (ricciardoSg09PickStatus === "High"   && ricciardoStatus === "Very Likely"){ ricciardoNine = 8;}
						if (ricciardoSg09PickStatus === "High"   && ricciardoStatus === "Less Likely"){ ricciardoNine = 12;}
						if (ricciardoSg09PickStatus === "High"   && ricciardoStatus === "Underdog"){ ricciardoNine = 16;}
						if (ricciardoSg09PickStatus === "Medium" && ricciardoStatus === "Favorite"){ ricciardoNine = 6;}
						if (ricciardoSg09PickStatus === "Medium" && ricciardoStatus === "Very Likely"){ ricciardoNine = 10;}
						if (ricciardoSg09PickStatus === "Medium" && ricciardoStatus === "Less Likely"){ ricciardoNine = 14;}
						if (ricciardoSg09PickStatus === "Medium" && ricciardoStatus === "Underdog"){ ricciardoNine = 18;}
						if (ricciardoSg09PickStatus === "Low"    && ricciardoStatus === "Favorite"){ ricciardoNine = 8;}
						if (ricciardoSg09PickStatus === "Low"    && ricciardoStatus === "Very Likely"){ ricciardoNine = 12;}
						if (ricciardoSg09PickStatus === "Low"    && ricciardoStatus === "Less Likely"){ ricciardoNine = 16;}
						if (ricciardoSg09PickStatus === "Low"    && ricciardoStatus === "Underdog"){ ricciardoNine = 20;}

						var ricciardoTen;
						if (ricciardoSg10PickStatus === "Zero") { ricciardoTen = 0;}
						if (ricciardoSg10PickStatus === "High"   && ricciardoStatus === "Favorite"){ ricciardoTen = 4;}
						if (ricciardoSg10PickStatus === "High"   && ricciardoStatus === "Very Likely"){ ricciardoTen = 8;}
						if (ricciardoSg10PickStatus === "High"   && ricciardoStatus === "Less Likely"){ ricciardoTen = 12;}
						if (ricciardoSg10PickStatus === "High"   && ricciardoStatus === "Underdog"){ ricciardoTen = 16;}
						if (ricciardoSg10PickStatus === "Medium" && ricciardoStatus === "Favorite"){ ricciardoTen = 6;}
						if (ricciardoSg10PickStatus === "Medium" && ricciardoStatus === "Very Likely"){ ricciardoTen = 10;}
						if (ricciardoSg10PickStatus === "Medium" && ricciardoStatus === "Less Likely"){ ricciardoTen = 14;}
						if (ricciardoSg10PickStatus === "Medium" && ricciardoStatus === "Underdog"){ ricciardoTen = 18;}
						if (ricciardoSg10PickStatus === "Low"    && ricciardoStatus === "Favorite"){ ricciardoTen = 8;}
						if (ricciardoSg10PickStatus === "Low"    && ricciardoStatus === "Very Likely"){ ricciardoTen = 12;}
						if (ricciardoSg10PickStatus === "Low"    && ricciardoStatus === "Less Likely"){ ricciardoTen = 16;}
						if (ricciardoSg10PickStatus === "Low"    && ricciardoStatus === "Underdog"){ ricciardoTen = 20;}

						//Perez
						var perezOne;
						if (perezSg01PickStatus === "Zero") { perezOne = 0;}
						if (perezSg01PickStatus === "High"   && perezStatus === "Favorite"){ perezOne = 4;}
						if (perezSg01PickStatus === "High"   && perezStatus === "Very Likely"){ perezOne = 8;}
						if (perezSg01PickStatus === "High"   && perezStatus === "Less Likely"){ perezOne = 12;}
						if (perezSg01PickStatus === "High"   && perezStatus === "Underdog"){ perezOne = 16;}
						if (perezSg01PickStatus === "Medium" && perezStatus === "Favorite"){ perezOne = 6;}
						if (perezSg01PickStatus === "Medium" && perezStatus === "Very Likely"){ perezOne = 10;}
						if (perezSg01PickStatus === "Medium" && perezStatus === "Less Likely"){ perezOne = 14;}
						if (perezSg01PickStatus === "Medium" && perezStatus === "Underdog"){ perezOne = 18;}
						if (perezSg01PickStatus === "Low"    && perezStatus === "Favorite"){ perezOne = 8;}
						if (perezSg01PickStatus === "Low"    && perezStatus === "Very Likely"){ perezOne = 12;}
						if (perezSg01PickStatus === "Low"    && perezStatus === "Less Likely"){ perezOne = 16;}
						if (perezSg01PickStatus === "Low"    && perezStatus === "Underdog"){ perezOne = 20;}

						var perezTwo;
						if (perezSg02PickStatus === "Zero") { perezTwo = 0;}
						if (perezSg02PickStatus === "High"   && perezStatus === "Favorite"){ perezTwo = 4;}
						if (perezSg02PickStatus === "High"   && perezStatus === "Very Likely"){ perezTwo = 8;}
						if (perezSg02PickStatus === "High"   && perezStatus === "Less Likely"){ perezTwo = 12;}
						if (perezSg02PickStatus === "High"   && perezStatus === "Underdog"){ perezTwo = 16;}
						if (perezSg02PickStatus === "Medium" && perezStatus === "Favorite"){ perezTwo = 6;}
						if (perezSg02PickStatus === "Medium" && perezStatus === "Very Likely"){ perezTwo = 10;}
						if (perezSg02PickStatus === "Medium" && perezStatus === "Less Likely"){ perezTwo = 14;}
						if (perezSg02PickStatus === "Medium" && perezStatus === "Underdog"){ perezTwo = 18;}
						if (perezSg02PickStatus === "Low"    && perezStatus === "Favorite"){ perezTwo = 8;}
						if (perezSg02PickStatus === "Low"    && perezStatus === "Very Likely"){ perezTwo = 12;}
						if (perezSg02PickStatus === "Low"    && perezStatus === "Less Likely"){ perezTwo = 16;}
						if (perezSg02PickStatus === "Low"    && perezStatus === "Underdog"){ perezTwo = 20;}

						var perezThree;
						if (perezSg03PickStatus === "Zero") { perezThree = 0;}
						if (perezSg03PickStatus === "High"   && perezStatus === "Favorite"){ perezThree = 4;}
						if (perezSg03PickStatus === "High"   && perezStatus === "Very Likely"){ perezThree = 8;}
						if (perezSg03PickStatus === "High"   && perezStatus === "Less Likely"){ perezThree = 12;}
						if (perezSg03PickStatus === "High"   && perezStatus === "Underdog"){ perezThree = 16;}
						if (perezSg03PickStatus === "Medium" && perezStatus === "Favorite"){ perezThree = 6;}
						if (perezSg03PickStatus === "Medium" && perezStatus === "Very Likely"){ perezThree = 10;}
						if (perezSg03PickStatus === "Medium" && perezStatus === "Less Likely"){ perezThree = 14;}
						if (perezSg03PickStatus === "Medium" && perezStatus === "Underdog"){ perezThree = 18;}
						if (perezSg03PickStatus === "Low"    && perezStatus === "Favorite"){ perezThree = 8;}
						if (perezSg03PickStatus === "Low"    && perezStatus === "Very Likely"){ perezThree = 12;}
						if (perezSg03PickStatus === "Low"    && perezStatus === "Less Likely"){ perezThree = 16;}
						if (perezSg03PickStatus === "Low"    && perezStatus === "Underdog"){ perezThree = 20;}

						var perezFour;
						if (perezSg04PickStatus === "Zero") { perezFour = 0;}
						if (perezSg04PickStatus === "High"   && perezStatus === "Favorite"){ perezFour = 4;}
						if (perezSg04PickStatus === "High"   && perezStatus === "Very Likely"){ perezFour = 8;}
						if (perezSg04PickStatus === "High"   && perezStatus === "Less Likely"){ perezFour = 12;}
						if (perezSg04PickStatus === "High"   && perezStatus === "Underdog"){ perezFour = 16;}
						if (perezSg04PickStatus === "Medium" && perezStatus === "Favorite"){ perezFour = 6;}
						if (perezSg04PickStatus === "Medium" && perezStatus === "Very Likely"){ perezFour = 10;}
						if (perezSg04PickStatus === "Medium" && perezStatus === "Less Likely"){ perezFour = 14;}
						if (perezSg04PickStatus === "Medium" && perezStatus === "Underdog"){ perezFour = 18;}
						if (perezSg04PickStatus === "Low"    && perezStatus === "Favorite"){ perezFour = 8;}
						if (perezSg04PickStatus === "Low"    && perezStatus === "Very Likely"){ perezFour = 12;}
						if (perezSg04PickStatus === "Low"    && perezStatus === "Less Likely"){ perezFour = 16;}
						if (perezSg04PickStatus === "Low"    && perezStatus === "Underdog"){ perezFour = 20;}

						var perezFive;
						if (perezSg05PickStatus === "Zero") { perezFive = 0;}
						if (perezSg05PickStatus === "High"   && perezStatus === "Favorite"){ perezFive = 4;}
						if (perezSg05PickStatus === "High"   && perezStatus === "Very Likely"){ perezFive = 8;}
						if (perezSg05PickStatus === "High"   && perezStatus === "Less Likely"){ perezFive = 12;}
						if (perezSg05PickStatus === "High"   && perezStatus === "Underdog"){ perezFive = 16;}
						if (perezSg05PickStatus === "Medium" && perezStatus === "Favorite"){ perezFive = 6;}
						if (perezSg05PickStatus === "Medium" && perezStatus === "Very Likely"){ perezFive = 10;}
						if (perezSg05PickStatus === "Medium" && perezStatus === "Less Likely"){ perezFive = 14;}
						if (perezSg05PickStatus === "Medium" && perezStatus === "Underdog"){ perezFive = 18;}
						if (perezSg05PickStatus === "Low"    && perezStatus === "Favorite"){ perezFive = 8;}
						if (perezSg05PickStatus === "Low"    && perezStatus === "Very Likely"){ perezFive = 12;}
						if (perezSg05PickStatus === "Low"    && perezStatus === "Less Likely"){ perezFive = 16;}
						if (perezSg05PickStatus === "Low"    && perezStatus === "Underdog"){ perezFive = 20;}

						var perezSix;
						if (perezSg06PickStatus === "Zero") { perezSix = 0;}
						if (perezSg06PickStatus === "High"   && perezStatus === "Favorite"){ perezSix = 4;}
						if (perezSg06PickStatus === "High"   && perezStatus === "Very Likely"){ perezSix = 8;}
						if (perezSg06PickStatus === "High"   && perezStatus === "Less Likely"){ perezSix = 12;}
						if (perezSg06PickStatus === "High"   && perezStatus === "Underdog"){ perezSix = 16;}
						if (perezSg06PickStatus === "Medium" && perezStatus === "Favorite"){ perezSix = 6;}
						if (perezSg06PickStatus === "Medium" && perezStatus === "Very Likely"){ perezSix = 10;}
						if (perezSg06PickStatus === "Medium" && perezStatus === "Less Likely"){ perezSix = 14;}
						if (perezSg06PickStatus === "Medium" && perezStatus === "Underdog"){ perezSix = 18;}
						if (perezSg06PickStatus === "Low"    && perezStatus === "Favorite"){ perezSix = 8;}
						if (perezSg06PickStatus === "Low"    && perezStatus === "Very Likely"){ perezSix = 12;}
						if (perezSg06PickStatus === "Low"    && perezStatus === "Less Likely"){ perezSix = 16;}
						if (perezSg06PickStatus === "Low"    && perezStatus === "Underdog"){ perezSix = 20;}

						var perezSeven;
						if (perezSg07PickStatus === "Zero") { perezSeven = 0;}
						if (perezSg07PickStatus === "High"   && perezStatus === "Favorite"){ perezSeven = 4;}
						if (perezSg07PickStatus === "High"   && perezStatus === "Very Likely"){ perezSeven = 8;}
						if (perezSg07PickStatus === "High"   && perezStatus === "Less Likely"){ perezSeven = 12;}
						if (perezSg07PickStatus === "High"   && perezStatus === "Underdog"){ perezSeven = 16;}
						if (perezSg07PickStatus === "Medium" && perezStatus === "Favorite"){ perezSeven = 6;}
						if (perezSg07PickStatus === "Medium" && perezStatus === "Very Likely"){ perezSeven = 10;}
						if (perezSg07PickStatus === "Medium" && perezStatus === "Less Likely"){ perezSeven = 14;}
						if (perezSg07PickStatus === "Medium" && perezStatus === "Underdog"){ perezSeven = 18;}
						if (perezSg07PickStatus === "Low"    && perezStatus === "Favorite"){ perezSeven = 8;}
						if (perezSg07PickStatus === "Low"    && perezStatus === "Very Likely"){ perezSeven = 12;}
						if (perezSg07PickStatus === "Low"    && perezStatus === "Less Likely"){ perezSeven = 16;}
						if (perezSg07PickStatus === "Low"    && perezStatus === "Underdog"){ perezSeven = 20;}

						var perezEight;
						if (perezSg08PickStatus === "Zero") { perezEight = 0;}
						if (perezSg08PickStatus === "High"   && perezStatus === "Favorite"){ perezEight = 4;}
						if (perezSg08PickStatus === "High"   && perezStatus === "Very Likely"){ perezEight = 8;}
						if (perezSg08PickStatus === "High"   && perezStatus === "Less Likely"){ perezEight = 12;}
						if (perezSg08PickStatus === "High"   && perezStatus === "Underdog"){ perezEight = 16;}
						if (perezSg08PickStatus === "Medium" && perezStatus === "Favorite"){ perezEight = 6;}
						if (perezSg08PickStatus === "Medium" && perezStatus === "Very Likely"){ perezEight = 10;}
						if (perezSg08PickStatus === "Medium" && perezStatus === "Less Likely"){ perezEight = 14;}
						if (perezSg08PickStatus === "Medium" && perezStatus === "Underdog"){ perezEight = 18;}
						if (perezSg08PickStatus === "Low"    && perezStatus === "Favorite"){ perezEight = 8;}
						if (perezSg08PickStatus === "Low"    && perezStatus === "Very Likely"){ perezEight = 12;}
						if (perezSg08PickStatus === "Low"    && perezStatus === "Less Likely"){ perezEight = 16;}
						if (perezSg08PickStatus === "Low"    && perezStatus === "Underdog"){ perezEight = 20;}

						var perezNine;
						if (perezSg09PickStatus === "Zero") { perezNine = 0;}
						if (perezSg09PickStatus === "High"   && perezStatus === "Favorite"){ perezNine = 4;}
						if (perezSg09PickStatus === "High"   && perezStatus === "Very Likely"){ perezNine = 8;}
						if (perezSg09PickStatus === "High"   && perezStatus === "Less Likely"){ perezNine = 12;}
						if (perezSg09PickStatus === "High"   && perezStatus === "Underdog"){ perezNine = 16;}
						if (perezSg09PickStatus === "Medium" && perezStatus === "Favorite"){ perezNine = 6;}
						if (perezSg09PickStatus === "Medium" && perezStatus === "Very Likely"){ perezNine = 10;}
						if (perezSg09PickStatus === "Medium" && perezStatus === "Less Likely"){ perezNine = 14;}
						if (perezSg09PickStatus === "Medium" && perezStatus === "Underdog"){ perezNine = 18;}
						if (perezSg09PickStatus === "Low"    && perezStatus === "Favorite"){ perezNine = 8;}
						if (perezSg09PickStatus === "Low"    && perezStatus === "Very Likely"){ perezNine = 12;}
						if (perezSg09PickStatus === "Low"    && perezStatus === "Less Likely"){ perezNine = 16;}
						if (perezSg09PickStatus === "Low"    && perezStatus === "Underdog"){ perezNine = 20;}

						var perezTen;
						if (perezSg10PickStatus === "Zero") { perezTen = 0;}
						if (perezSg10PickStatus === "High"   && perezStatus === "Favorite"){ perezTen = 4;}
						if (perezSg10PickStatus === "High"   && perezStatus === "Very Likely"){ perezTen = 8;}
						if (perezSg10PickStatus === "High"   && perezStatus === "Less Likely"){ perezTen = 12;}
						if (perezSg10PickStatus === "High"   && perezStatus === "Underdog"){ perezTen = 16;}
						if (perezSg10PickStatus === "Medium" && perezStatus === "Favorite"){ perezTen = 6;}
						if (perezSg10PickStatus === "Medium" && perezStatus === "Very Likely"){ perezTen = 10;}
						if (perezSg10PickStatus === "Medium" && perezStatus === "Less Likely"){ perezTen = 14;}
						if (perezSg10PickStatus === "Medium" && perezStatus === "Underdog"){ perezTen = 18;}
						if (perezSg10PickStatus === "Low"    && perezStatus === "Favorite"){ perezTen = 8;}
						if (perezSg10PickStatus === "Low"    && perezStatus === "Very Likely"){ perezTen = 12;}
						if (perezSg10PickStatus === "Low"    && perezStatus === "Less Likely"){ perezTen = 16;}
						if (perezSg10PickStatus === "Low"    && perezStatus === "Underdog"){ perezTen = 20;}

						//Hulkenberg
						var hulkenbergOne;
						if (hulkenbergSg01PickStatus === "Zero") { hulkenbergOne = 0;}
						if (hulkenbergSg01PickStatus === "High"   && hulkenbergStatus === "Favorite"){ hulkenbergOne = 4;}
						if (hulkenbergSg01PickStatus === "High"   && hulkenbergStatus === "Very Likely"){ hulkenbergOne = 8;}
						if (hulkenbergSg01PickStatus === "High"   && hulkenbergStatus === "Less Likely"){ hulkenbergOne = 12;}
						if (hulkenbergSg01PickStatus === "High"   && hulkenbergStatus === "Underdog"){ hulkenbergOne = 16;}
						if (hulkenbergSg01PickStatus === "Medium" && hulkenbergStatus === "Favorite"){ hulkenbergOne = 6;}
						if (hulkenbergSg01PickStatus === "Medium" && hulkenbergStatus === "Very Likely"){ hulkenbergOne = 10;}
						if (hulkenbergSg01PickStatus === "Medium" && hulkenbergStatus === "Less Likely"){ hulkenbergOne = 14;}
						if (hulkenbergSg01PickStatus === "Medium" && hulkenbergStatus === "Underdog"){ hulkenbergOne = 18;}
						if (hulkenbergSg01PickStatus === "Low"    && hulkenbergStatus === "Favorite"){ hulkenbergOne = 8;}
						if (hulkenbergSg01PickStatus === "Low"    && hulkenbergStatus === "Very Likely"){ hulkenbergOne = 12;}
						if (hulkenbergSg01PickStatus === "Low"    && hulkenbergStatus === "Less Likely"){ hulkenbergOne = 16;}
						if (hulkenbergSg01PickStatus === "Low"    && hulkenbergStatus === "Underdog"){ hulkenbergOne = 20;}

						var hulkenbergTwo;
						if (hulkenbergSg02PickStatus === "Zero") { hulkenbergTwo = 0;}
						if (hulkenbergSg02PickStatus === "High"   && hulkenbergStatus === "Favorite"){ hulkenbergTwo = 4;}
						if (hulkenbergSg02PickStatus === "High"   && hulkenbergStatus === "Very Likely"){ hulkenbergTwo = 8;}
						if (hulkenbergSg02PickStatus === "High"   && hulkenbergStatus === "Less Likely"){ hulkenbergTwo = 12;}
						if (hulkenbergSg02PickStatus === "High"   && hulkenbergStatus === "Underdog"){ hulkenbergTwo = 16;}
						if (hulkenbergSg02PickStatus === "Medium" && hulkenbergStatus === "Favorite"){ hulkenbergTwo = 6;}
						if (hulkenbergSg02PickStatus === "Medium" && hulkenbergStatus === "Very Likely"){ hulkenbergTwo = 10;}
						if (hulkenbergSg02PickStatus === "Medium" && hulkenbergStatus === "Less Likely"){ hulkenbergTwo = 14;}
						if (hulkenbergSg02PickStatus === "Medium" && hulkenbergStatus === "Underdog"){ hulkenbergTwo = 18;}
						if (hulkenbergSg02PickStatus === "Low"    && hulkenbergStatus === "Favorite"){ hulkenbergTwo = 8;}
						if (hulkenbergSg02PickStatus === "Low"    && hulkenbergStatus === "Very Likely"){ hulkenbergTwo = 12;}
						if (hulkenbergSg02PickStatus === "Low"    && hulkenbergStatus === "Less Likely"){ hulkenbergTwo = 16;}
						if (hulkenbergSg02PickStatus === "Low"    && hulkenbergStatus === "Underdog"){ hulkenbergTwo = 20;}

						var hulkenbergThree;
						if (hulkenbergSg03PickStatus === "Zero") { hulkenbergThree = 0;}
						if (hulkenbergSg03PickStatus === "High"   && hulkenbergStatus === "Favorite"){ hulkenbergThree = 4;}
						if (hulkenbergSg03PickStatus === "High"   && hulkenbergStatus === "Very Likely"){ hulkenbergThree = 8;}
						if (hulkenbergSg03PickStatus === "High"   && hulkenbergStatus === "Less Likely"){ hulkenbergThree = 12;}
						if (hulkenbergSg03PickStatus === "High"   && hulkenbergStatus === "Underdog"){ hulkenbergThree = 16;}
						if (hulkenbergSg03PickStatus === "Medium" && hulkenbergStatus === "Favorite"){ hulkenbergThree = 6;}
						if (hulkenbergSg03PickStatus === "Medium" && hulkenbergStatus === "Very Likely"){ hulkenbergThree = 10;}
						if (hulkenbergSg03PickStatus === "Medium" && hulkenbergStatus === "Less Likely"){ hulkenbergThree = 14;}
						if (hulkenbergSg03PickStatus === "Medium" && hulkenbergStatus === "Underdog"){ hulkenbergThree = 18;}
						if (hulkenbergSg03PickStatus === "Low"    && hulkenbergStatus === "Favorite"){ hulkenbergThree = 8;}
						if (hulkenbergSg03PickStatus === "Low"    && hulkenbergStatus === "Very Likely"){ hulkenbergThree = 12;}
						if (hulkenbergSg03PickStatus === "Low"    && hulkenbergStatus === "Less Likely"){ hulkenbergThree = 16;}
						if (hulkenbergSg03PickStatus === "Low"    && hulkenbergStatus === "Underdog"){ hulkenbergThree = 20;}

						var hulkenbergFour;
						if (hulkenbergSg04PickStatus === "Zero") { hulkenbergFour = 0;}
						if (hulkenbergSg04PickStatus === "High"   && hulkenbergStatus === "Favorite"){ hulkenbergFour = 4;}
						if (hulkenbergSg04PickStatus === "High"   && hulkenbergStatus === "Very Likely"){ hulkenbergFour = 8;}
						if (hulkenbergSg04PickStatus === "High"   && hulkenbergStatus === "Less Likely"){ hulkenbergFour = 12;}
						if (hulkenbergSg04PickStatus === "High"   && hulkenbergStatus === "Underdog"){ hulkenbergFour = 16;}
						if (hulkenbergSg04PickStatus === "Medium" && hulkenbergStatus === "Favorite"){ hulkenbergFour = 6;}
						if (hulkenbergSg04PickStatus === "Medium" && hulkenbergStatus === "Very Likely"){ hulkenbergFour = 10;}
						if (hulkenbergSg04PickStatus === "Medium" && hulkenbergStatus === "Less Likely"){ hulkenbergFour = 14;}
						if (hulkenbergSg04PickStatus === "Medium" && hulkenbergStatus === "Underdog"){ hulkenbergFour = 18;}
						if (hulkenbergSg04PickStatus === "Low"    && hulkenbergStatus === "Favorite"){ hulkenbergFour = 8;}
						if (hulkenbergSg04PickStatus === "Low"    && hulkenbergStatus === "Very Likely"){ hulkenbergFour = 12;}
						if (hulkenbergSg04PickStatus === "Low"    && hulkenbergStatus === "Less Likely"){ hulkenbergFour = 16;}
						if (hulkenbergSg04PickStatus === "Low"    && hulkenbergStatus === "Underdog"){ hulkenbergFour = 20;}

						var hulkenbergFive;
						if (hulkenbergSg05PickStatus === "Zero") { hulkenbergFive = 0;}
						if (hulkenbergSg05PickStatus === "High"   && hulkenbergStatus === "Favorite"){ hulkenbergFive = 4;}
						if (hulkenbergSg05PickStatus === "High"   && hulkenbergStatus === "Very Likely"){ hulkenbergFive = 8;}
						if (hulkenbergSg05PickStatus === "High"   && hulkenbergStatus === "Less Likely"){ hulkenbergFive = 12;}
						if (hulkenbergSg05PickStatus === "High"   && hulkenbergStatus === "Underdog"){ hulkenbergFive = 16;}
						if (hulkenbergSg05PickStatus === "Medium" && hulkenbergStatus === "Favorite"){ hulkenbergFive = 6;}
						if (hulkenbergSg05PickStatus === "Medium" && hulkenbergStatus === "Very Likely"){ hulkenbergFive = 10;}
						if (hulkenbergSg05PickStatus === "Medium" && hulkenbergStatus === "Less Likely"){ hulkenbergFive = 14;}
						if (hulkenbergSg05PickStatus === "Medium" && hulkenbergStatus === "Underdog"){ hulkenbergFive = 18;}
						if (hulkenbergSg05PickStatus === "Low"    && hulkenbergStatus === "Favorite"){ hulkenbergFive = 8;}
						if (hulkenbergSg05PickStatus === "Low"    && hulkenbergStatus === "Very Likely"){ hulkenbergFive = 12;}
						if (hulkenbergSg05PickStatus === "Low"    && hulkenbergStatus === "Less Likely"){ hulkenbergFive = 16;}
						if (hulkenbergSg05PickStatus === "Low"    && hulkenbergStatus === "Underdog"){ hulkenbergFive = 20;}

						var hulkenbergSix;
						if (hulkenbergSg06PickStatus === "Zero") { hulkenbergSix = 0;}
						if (hulkenbergSg06PickStatus === "High"   && hulkenbergStatus === "Favorite"){ hulkenbergSix = 4;}
						if (hulkenbergSg06PickStatus === "High"   && hulkenbergStatus === "Very Likely"){ hulkenbergSix = 8;}
						if (hulkenbergSg06PickStatus === "High"   && hulkenbergStatus === "Less Likely"){ hulkenbergSix = 12;}
						if (hulkenbergSg06PickStatus === "High"   && hulkenbergStatus === "Underdog"){ hulkenbergSix = 16;}
						if (hulkenbergSg06PickStatus === "Medium" && hulkenbergStatus === "Favorite"){ hulkenbergSix = 6;}
						if (hulkenbergSg06PickStatus === "Medium" && hulkenbergStatus === "Very Likely"){ hulkenbergSix = 10;}
						if (hulkenbergSg06PickStatus === "Medium" && hulkenbergStatus === "Less Likely"){ hulkenbergSix = 14;}
						if (hulkenbergSg06PickStatus === "Medium" && hulkenbergStatus === "Underdog"){ hulkenbergSix = 18;}
						if (hulkenbergSg06PickStatus === "Low"    && hulkenbergStatus === "Favorite"){ hulkenbergSix = 8;}
						if (hulkenbergSg06PickStatus === "Low"    && hulkenbergStatus === "Very Likely"){ hulkenbergSix = 12;}
						if (hulkenbergSg06PickStatus === "Low"    && hulkenbergStatus === "Less Likely"){ hulkenbergSix = 16;}
						if (hulkenbergSg06PickStatus === "Low"    && hulkenbergStatus === "Underdog"){ hulkenbergSix = 20;}

						var hulkenbergSeven;
						if (hulkenbergSg07PickStatus === "Zero") { hulkenbergSeven = 0;}
						if (hulkenbergSg07PickStatus === "High"   && hulkenbergStatus === "Favorite"){ hulkenbergSeven = 4;}
						if (hulkenbergSg07PickStatus === "High"   && hulkenbergStatus === "Very Likely"){ hulkenbergSeven = 8;}
						if (hulkenbergSg07PickStatus === "High"   && hulkenbergStatus === "Less Likely"){ hulkenbergSeven = 12;}
						if (hulkenbergSg07PickStatus === "High"   && hulkenbergStatus === "Underdog"){ hulkenbergSeven = 16;}
						if (hulkenbergSg07PickStatus === "Medium" && hulkenbergStatus === "Favorite"){ hulkenbergSeven = 6;}
						if (hulkenbergSg07PickStatus === "Medium" && hulkenbergStatus === "Very Likely"){ hulkenbergSeven = 10;}
						if (hulkenbergSg07PickStatus === "Medium" && hulkenbergStatus === "Less Likely"){ hulkenbergSeven = 14;}
						if (hulkenbergSg07PickStatus === "Medium" && hulkenbergStatus === "Underdog"){ hulkenbergSeven = 18;}
						if (hulkenbergSg07PickStatus === "Low"    && hulkenbergStatus === "Favorite"){ hulkenbergSeven = 8;}
						if (hulkenbergSg07PickStatus === "Low"    && hulkenbergStatus === "Very Likely"){ hulkenbergSeven = 12;}
						if (hulkenbergSg07PickStatus === "Low"    && hulkenbergStatus === "Less Likely"){ hulkenbergSeven = 16;}
						if (hulkenbergSg07PickStatus === "Low"    && hulkenbergStatus === "Underdog"){ hulkenbergSeven = 20;}

						var hulkenbergEight;
						if (hulkenbergSg08PickStatus === "Zero") { hulkenbergEight = 0;}
						if (hulkenbergSg08PickStatus === "High"   && hulkenbergStatus === "Favorite"){ hulkenbergEight = 4;}
						if (hulkenbergSg08PickStatus === "High"   && hulkenbergStatus === "Very Likely"){ hulkenbergEight = 8;}
						if (hulkenbergSg08PickStatus === "High"   && hulkenbergStatus === "Less Likely"){ hulkenbergEight = 12;}
						if (hulkenbergSg08PickStatus === "High"   && hulkenbergStatus === "Underdog"){ hulkenbergEight = 16;}
						if (hulkenbergSg08PickStatus === "Medium" && hulkenbergStatus === "Favorite"){ hulkenbergEight = 6;}
						if (hulkenbergSg08PickStatus === "Medium" && hulkenbergStatus === "Very Likely"){ hulkenbergEight = 10;}
						if (hulkenbergSg08PickStatus === "Medium" && hulkenbergStatus === "Less Likely"){ hulkenbergEight = 14;}
						if (hulkenbergSg08PickStatus === "Medium" && hulkenbergStatus === "Underdog"){ hulkenbergEight = 18;}
						if (hulkenbergSg08PickStatus === "Low"    && hulkenbergStatus === "Favorite"){ hulkenbergEight = 8;}
						if (hulkenbergSg08PickStatus === "Low"    && hulkenbergStatus === "Very Likely"){ hulkenbergEight = 12;}
						if (hulkenbergSg08PickStatus === "Low"    && hulkenbergStatus === "Less Likely"){ hulkenbergEight = 16;}
						if (hulkenbergSg08PickStatus === "Low"    && hulkenbergStatus === "Underdog"){ hulkenbergEight = 20;}

						var hulkenbergNine;
						if (hulkenbergSg09PickStatus === "Zero") { hulkenbergNine = 0;}
						if (hulkenbergSg09PickStatus === "High"   && hulkenbergStatus === "Favorite"){ hulkenbergNine = 4;}
						if (hulkenbergSg09PickStatus === "High"   && hulkenbergStatus === "Very Likely"){ hulkenbergNine = 8;}
						if (hulkenbergSg09PickStatus === "High"   && hulkenbergStatus === "Less Likely"){ hulkenbergNine = 12;}
						if (hulkenbergSg09PickStatus === "High"   && hulkenbergStatus === "Underdog"){ hulkenbergNine = 16;}
						if (hulkenbergSg09PickStatus === "Medium" && hulkenbergStatus === "Favorite"){ hulkenbergNine = 6;}
						if (hulkenbergSg09PickStatus === "Medium" && hulkenbergStatus === "Very Likely"){ hulkenbergNine = 10;}
						if (hulkenbergSg09PickStatus === "Medium" && hulkenbergStatus === "Less Likely"){ hulkenbergNine = 14;}
						if (hulkenbergSg09PickStatus === "Medium" && hulkenbergStatus === "Underdog"){ hulkenbergNine = 18;}
						if (hulkenbergSg09PickStatus === "Low"    && hulkenbergStatus === "Favorite"){ hulkenbergNine = 8;}
						if (hulkenbergSg09PickStatus === "Low"    && hulkenbergStatus === "Very Likely"){ hulkenbergNine = 12;}
						if (hulkenbergSg09PickStatus === "Low"    && hulkenbergStatus === "Less Likely"){ hulkenbergNine = 16;}
						if (hulkenbergSg09PickStatus === "Low"    && hulkenbergStatus === "Underdog"){ hulkenbergNine = 20;}

						var hulkenbergTen;
						if (hulkenbergSg10PickStatus === "Zero") { hulkenbergTen = 0;}
						if (hulkenbergSg10PickStatus === "High"   && hulkenbergStatus === "Favorite"){ hulkenbergTen = 4;}
						if (hulkenbergSg10PickStatus === "High"   && hulkenbergStatus === "Very Likely"){ hulkenbergTen = 8;}
						if (hulkenbergSg10PickStatus === "High"   && hulkenbergStatus === "Less Likely"){ hulkenbergTen = 12;}
						if (hulkenbergSg10PickStatus === "High"   && hulkenbergStatus === "Underdog"){ hulkenbergTen = 16;}
						if (hulkenbergSg10PickStatus === "Medium" && hulkenbergStatus === "Favorite"){ hulkenbergTen = 6;}
						if (hulkenbergSg10PickStatus === "Medium" && hulkenbergStatus === "Very Likely"){ hulkenbergTen = 10;}
						if (hulkenbergSg10PickStatus === "Medium" && hulkenbergStatus === "Less Likely"){ hulkenbergTen = 14;}
						if (hulkenbergSg10PickStatus === "Medium" && hulkenbergStatus === "Underdog"){ hulkenbergTen = 18;}
						if (hulkenbergSg10PickStatus === "Low"    && hulkenbergStatus === "Favorite"){ hulkenbergTen = 8;}
						if (hulkenbergSg10PickStatus === "Low"    && hulkenbergStatus === "Very Likely"){ hulkenbergTen = 12;}
						if (hulkenbergSg10PickStatus === "Low"    && hulkenbergStatus === "Less Likely"){ hulkenbergTen = 16;}
						if (hulkenbergSg10PickStatus === "Low"    && hulkenbergStatus === "Underdog"){ hulkenbergTen = 20;}

						//Grosjean
						var grosjeanOne;
						if (grosjeanSg01PickStatus === "Zero") { grosjeanOne = 0;}
						if (grosjeanSg01PickStatus === "High"   && grosjeanStatus === "Favorite"){ grosjeanOne = 4;}
						if (grosjeanSg01PickStatus === "High"   && grosjeanStatus === "Very Likely"){ grosjeanOne = 8;}
						if (grosjeanSg01PickStatus === "High"   && grosjeanStatus === "Less Likely"){ grosjeanOne = 12;}
						if (grosjeanSg01PickStatus === "High"   && grosjeanStatus === "Underdog"){ grosjeanOne = 16;}
						if (grosjeanSg01PickStatus === "Medium" && grosjeanStatus === "Favorite"){ grosjeanOne = 6;}
						if (grosjeanSg01PickStatus === "Medium" && grosjeanStatus === "Very Likely"){ grosjeanOne = 10;}
						if (grosjeanSg01PickStatus === "Medium" && grosjeanStatus === "Less Likely"){ grosjeanOne = 14;}
						if (grosjeanSg01PickStatus === "Medium" && grosjeanStatus === "Underdog"){ grosjeanOne = 18;}
						if (grosjeanSg01PickStatus === "Low"    && grosjeanStatus === "Favorite"){ grosjeanOne = 8;}
						if (grosjeanSg01PickStatus === "Low"    && grosjeanStatus === "Very Likely"){ grosjeanOne = 12;}
						if (grosjeanSg01PickStatus === "Low"    && grosjeanStatus === "Less Likely"){ grosjeanOne = 16;}
						if (grosjeanSg01PickStatus === "Low"    && grosjeanStatus === "Underdog"){ grosjeanOne = 20;}

						var grosjeanTwo;
						if (grosjeanSg02PickStatus === "Zero") { grosjeanTwo = 0;}
						if (grosjeanSg02PickStatus === "High"   && grosjeanStatus === "Favorite"){ grosjeanTwo = 4;}
						if (grosjeanSg02PickStatus === "High"   && grosjeanStatus === "Very Likely"){ grosjeanTwo = 8;}
						if (grosjeanSg02PickStatus === "High"   && grosjeanStatus === "Less Likely"){ grosjeanTwo = 12;}
						if (grosjeanSg02PickStatus === "High"   && grosjeanStatus === "Underdog"){ grosjeanTwo = 16;}
						if (grosjeanSg02PickStatus === "Medium" && grosjeanStatus === "Favorite"){ grosjeanTwo = 6;}
						if (grosjeanSg02PickStatus === "Medium" && grosjeanStatus === "Very Likely"){ grosjeanTwo = 10;}
						if (grosjeanSg02PickStatus === "Medium" && grosjeanStatus === "Less Likely"){ grosjeanTwo = 14;}
						if (grosjeanSg02PickStatus === "Medium" && grosjeanStatus === "Underdog"){ grosjeanTwo = 18;}
						if (grosjeanSg02PickStatus === "Low"    && grosjeanStatus === "Favorite"){ grosjeanTwo = 8;}
						if (grosjeanSg02PickStatus === "Low"    && grosjeanStatus === "Very Likely"){ grosjeanTwo = 12;}
						if (grosjeanSg02PickStatus === "Low"    && grosjeanStatus === "Less Likely"){ grosjeanTwo = 16;}
						if (grosjeanSg02PickStatus === "Low"    && grosjeanStatus === "Underdog"){ grosjeanTwo = 20;}

						var grosjeanThree;
						if (grosjeanSg03PickStatus === "Zero") { grosjeanThree = 0;}
						if (grosjeanSg03PickStatus === "High"   && grosjeanStatus === "Favorite"){ grosjeanThree = 4;}
						if (grosjeanSg03PickStatus === "High"   && grosjeanStatus === "Very Likely"){ grosjeanThree = 8;}
						if (grosjeanSg03PickStatus === "High"   && grosjeanStatus === "Less Likely"){ grosjeanThree = 12;}
						if (grosjeanSg03PickStatus === "High"   && grosjeanStatus === "Underdog"){ grosjeanThree = 16;}
						if (grosjeanSg03PickStatus === "Medium" && grosjeanStatus === "Favorite"){ grosjeanThree = 6;}
						if (grosjeanSg03PickStatus === "Medium" && grosjeanStatus === "Very Likely"){ grosjeanThree = 10;}
						if (grosjeanSg03PickStatus === "Medium" && grosjeanStatus === "Less Likely"){ grosjeanThree = 14;}
						if (grosjeanSg03PickStatus === "Medium" && grosjeanStatus === "Underdog"){ grosjeanThree = 18;}
						if (grosjeanSg03PickStatus === "Low"    && grosjeanStatus === "Favorite"){ grosjeanThree = 8;}
						if (grosjeanSg03PickStatus === "Low"    && grosjeanStatus === "Very Likely"){ grosjeanThree = 12;}
						if (grosjeanSg03PickStatus === "Low"    && grosjeanStatus === "Less Likely"){ grosjeanThree = 16;}
						if (grosjeanSg03PickStatus === "Low"    && grosjeanStatus === "Underdog"){ grosjeanThree = 20;}

						var grosjeanFour;
						if (grosjeanSg04PickStatus === "Zero") { grosjeanFour = 0;}
						if (grosjeanSg04PickStatus === "High"   && grosjeanStatus === "Favorite"){ grosjeanFour = 4;}
						if (grosjeanSg04PickStatus === "High"   && grosjeanStatus === "Very Likely"){ grosjeanFour = 8;}
						if (grosjeanSg04PickStatus === "High"   && grosjeanStatus === "Less Likely"){ grosjeanFour = 12;}
						if (grosjeanSg04PickStatus === "High"   && grosjeanStatus === "Underdog"){ grosjeanFour = 16;}
						if (grosjeanSg04PickStatus === "Medium" && grosjeanStatus === "Favorite"){ grosjeanFour = 6;}
						if (grosjeanSg04PickStatus === "Medium" && grosjeanStatus === "Very Likely"){ grosjeanFour = 10;}
						if (grosjeanSg04PickStatus === "Medium" && grosjeanStatus === "Less Likely"){ grosjeanFour = 14;}
						if (grosjeanSg04PickStatus === "Medium" && grosjeanStatus === "Underdog"){ grosjeanFour = 18;}
						if (grosjeanSg04PickStatus === "Low"    && grosjeanStatus === "Favorite"){ grosjeanFour = 8;}
						if (grosjeanSg04PickStatus === "Low"    && grosjeanStatus === "Very Likely"){ grosjeanFour = 12;}
						if (grosjeanSg04PickStatus === "Low"    && grosjeanStatus === "Less Likely"){ grosjeanFour = 16;}
						if (grosjeanSg04PickStatus === "Low"    && grosjeanStatus === "Underdog"){ grosjeanFour = 20;}

						var grosjeanFive;
						if (grosjeanSg05PickStatus === "Zero") { grosjeanFive = 0;}
						if (grosjeanSg05PickStatus === "High"   && grosjeanStatus === "Favorite"){ grosjeanFive = 4;}
						if (grosjeanSg05PickStatus === "High"   && grosjeanStatus === "Very Likely"){ grosjeanFive = 8;}
						if (grosjeanSg05PickStatus === "High"   && grosjeanStatus === "Less Likely"){ grosjeanFive = 12;}
						if (grosjeanSg05PickStatus === "High"   && grosjeanStatus === "Underdog"){ grosjeanFive = 16;}
						if (grosjeanSg05PickStatus === "Medium" && grosjeanStatus === "Favorite"){ grosjeanFive = 6;}
						if (grosjeanSg05PickStatus === "Medium" && grosjeanStatus === "Very Likely"){ grosjeanFive = 10;}
						if (grosjeanSg05PickStatus === "Medium" && grosjeanStatus === "Less Likely"){ grosjeanFive = 14;}
						if (grosjeanSg05PickStatus === "Medium" && grosjeanStatus === "Underdog"){ grosjeanFive = 18;}
						if (grosjeanSg05PickStatus === "Low"    && grosjeanStatus === "Favorite"){ grosjeanFive = 8;}
						if (grosjeanSg05PickStatus === "Low"    && grosjeanStatus === "Very Likely"){ grosjeanFive = 12;}
						if (grosjeanSg05PickStatus === "Low"    && grosjeanStatus === "Less Likely"){ grosjeanFive = 16;}
						if (grosjeanSg05PickStatus === "Low"    && grosjeanStatus === "Underdog"){ grosjeanFive = 20;}

						var grosjeanSix;
						if (grosjeanSg06PickStatus === "Zero") { grosjeanSix = 0;}
						if (grosjeanSg06PickStatus === "High"   && grosjeanStatus === "Favorite"){ grosjeanSix = 4;}
						if (grosjeanSg06PickStatus === "High"   && grosjeanStatus === "Very Likely"){ grosjeanSix = 8;}
						if (grosjeanSg06PickStatus === "High"   && grosjeanStatus === "Less Likely"){ grosjeanSix = 12;}
						if (grosjeanSg06PickStatus === "High"   && grosjeanStatus === "Underdog"){ grosjeanSix = 16;}
						if (grosjeanSg06PickStatus === "Medium" && grosjeanStatus === "Favorite"){ grosjeanSix = 6;}
						if (grosjeanSg06PickStatus === "Medium" && grosjeanStatus === "Very Likely"){ grosjeanSix = 10;}
						if (grosjeanSg06PickStatus === "Medium" && grosjeanStatus === "Less Likely"){ grosjeanSix = 14;}
						if (grosjeanSg06PickStatus === "Medium" && grosjeanStatus === "Underdog"){ grosjeanSix = 18;}
						if (grosjeanSg06PickStatus === "Low"    && grosjeanStatus === "Favorite"){ grosjeanSix = 8;}
						if (grosjeanSg06PickStatus === "Low"    && grosjeanStatus === "Very Likely"){ grosjeanSix = 12;}
						if (grosjeanSg06PickStatus === "Low"    && grosjeanStatus === "Less Likely"){ grosjeanSix = 16;}
						if (grosjeanSg06PickStatus === "Low"    && grosjeanStatus === "Underdog"){ grosjeanSix = 20;}

						var grosjeanSeven;
						if (grosjeanSg07PickStatus === "Zero") { grosjeanSeven = 0;}
						if (grosjeanSg07PickStatus === "High"   && grosjeanStatus === "Favorite"){ grosjeanSeven = 4;}
						if (grosjeanSg07PickStatus === "High"   && grosjeanStatus === "Very Likely"){ grosjeanSeven = 8;}
						if (grosjeanSg07PickStatus === "High"   && grosjeanStatus === "Less Likely"){ grosjeanSeven = 12;}
						if (grosjeanSg07PickStatus === "High"   && grosjeanStatus === "Underdog"){ grosjeanSeven = 16;}
						if (grosjeanSg07PickStatus === "Medium" && grosjeanStatus === "Favorite"){ grosjeanSeven = 6;}
						if (grosjeanSg07PickStatus === "Medium" && grosjeanStatus === "Very Likely"){ grosjeanSeven = 10;}
						if (grosjeanSg07PickStatus === "Medium" && grosjeanStatus === "Less Likely"){ grosjeanSeven = 14;}
						if (grosjeanSg07PickStatus === "Medium" && grosjeanStatus === "Underdog"){ grosjeanSeven = 18;}
						if (grosjeanSg07PickStatus === "Low"    && grosjeanStatus === "Favorite"){ grosjeanSeven = 8;}
						if (grosjeanSg07PickStatus === "Low"    && grosjeanStatus === "Very Likely"){ grosjeanSeven = 12;}
						if (grosjeanSg07PickStatus === "Low"    && grosjeanStatus === "Less Likely"){ grosjeanSeven = 16;}
						if (grosjeanSg07PickStatus === "Low"    && grosjeanStatus === "Underdog"){ grosjeanSeven = 20;}

						var grosjeanEight;
						if (grosjeanSg08PickStatus === "Zero") { grosjeanEight = 0;}
						if (grosjeanSg08PickStatus === "High"   && grosjeanStatus === "Favorite"){ grosjeanEight = 4;}
						if (grosjeanSg08PickStatus === "High"   && grosjeanStatus === "Very Likely"){ grosjeanEight = 8;}
						if (grosjeanSg08PickStatus === "High"   && grosjeanStatus === "Less Likely"){ grosjeanEight = 12;}
						if (grosjeanSg08PickStatus === "High"   && grosjeanStatus === "Underdog"){ grosjeanEight = 16;}
						if (grosjeanSg08PickStatus === "Medium" && grosjeanStatus === "Favorite"){ grosjeanEight = 6;}
						if (grosjeanSg08PickStatus === "Medium" && grosjeanStatus === "Very Likely"){ grosjeanEight = 10;}
						if (grosjeanSg08PickStatus === "Medium" && grosjeanStatus === "Less Likely"){ grosjeanEight = 14;}
						if (grosjeanSg08PickStatus === "Medium" && grosjeanStatus === "Underdog"){ grosjeanEight = 18;}
						if (grosjeanSg08PickStatus === "Low"    && grosjeanStatus === "Favorite"){ grosjeanEight = 8;}
						if (grosjeanSg08PickStatus === "Low"    && grosjeanStatus === "Very Likely"){ grosjeanEight = 12;}
						if (grosjeanSg08PickStatus === "Low"    && grosjeanStatus === "Less Likely"){ grosjeanEight = 16;}
						if (grosjeanSg08PickStatus === "Low"    && grosjeanStatus === "Underdog"){ grosjeanEight = 20;}

						var grosjeanNine;
						if (grosjeanSg09PickStatus === "Zero") { grosjeanNine = 0;}
						if (grosjeanSg09PickStatus === "High"   && grosjeanStatus === "Favorite"){ grosjeanNine = 4;}
						if (grosjeanSg09PickStatus === "High"   && grosjeanStatus === "Very Likely"){ grosjeanNine = 8;}
						if (grosjeanSg09PickStatus === "High"   && grosjeanStatus === "Less Likely"){ grosjeanNine = 12;}
						if (grosjeanSg09PickStatus === "High"   && grosjeanStatus === "Underdog"){ grosjeanNine = 16;}
						if (grosjeanSg09PickStatus === "Medium" && grosjeanStatus === "Favorite"){ grosjeanNine = 6;}
						if (grosjeanSg09PickStatus === "Medium" && grosjeanStatus === "Very Likely"){ grosjeanNine = 10;}
						if (grosjeanSg09PickStatus === "Medium" && grosjeanStatus === "Less Likely"){ grosjeanNine = 14;}
						if (grosjeanSg09PickStatus === "Medium" && grosjeanStatus === "Underdog"){ grosjeanNine = 18;}
						if (grosjeanSg09PickStatus === "Low"    && grosjeanStatus === "Favorite"){ grosjeanNine = 8;}
						if (grosjeanSg09PickStatus === "Low"    && grosjeanStatus === "Very Likely"){ grosjeanNine = 12;}
						if (grosjeanSg09PickStatus === "Low"    && grosjeanStatus === "Less Likely"){ grosjeanNine = 16;}
						if (grosjeanSg09PickStatus === "Low"    && grosjeanStatus === "Underdog"){ grosjeanNine = 20;}

						var grosjeanTen;
						if (grosjeanSg10PickStatus === "Zero") { grosjeanTen = 0;}
						if (grosjeanSg10PickStatus === "High"   && grosjeanStatus === "Favorite"){ grosjeanTen = 4;}
						if (grosjeanSg10PickStatus === "High"   && grosjeanStatus === "Very Likely"){ grosjeanTen = 8;}
						if (grosjeanSg10PickStatus === "High"   && grosjeanStatus === "Less Likely"){ grosjeanTen = 12;}
						if (grosjeanSg10PickStatus === "High"   && grosjeanStatus === "Underdog"){ grosjeanTen = 16;}
						if (grosjeanSg10PickStatus === "Medium" && grosjeanStatus === "Favorite"){ grosjeanTen = 6;}
						if (grosjeanSg10PickStatus === "Medium" && grosjeanStatus === "Very Likely"){ grosjeanTen = 10;}
						if (grosjeanSg10PickStatus === "Medium" && grosjeanStatus === "Less Likely"){ grosjeanTen = 14;}
						if (grosjeanSg10PickStatus === "Medium" && grosjeanStatus === "Underdog"){ grosjeanTen = 18;}
						if (grosjeanSg10PickStatus === "Low"    && grosjeanStatus === "Favorite"){ grosjeanTen = 8;}
						if (grosjeanSg10PickStatus === "Low"    && grosjeanStatus === "Very Likely"){ grosjeanTen = 12;}
						if (grosjeanSg10PickStatus === "Low"    && grosjeanStatus === "Less Likely"){ grosjeanTen = 16;}
						if (grosjeanSg10PickStatus === "Low"    && grosjeanStatus === "Underdog"){ grosjeanTen = 20;}

						//Maldonado
						var maldonadoOne;
						if (maldonadoSg01PickStatus === "Zero") { maldonadoOne = 0;}
						if (maldonadoSg01PickStatus === "High"   && maldonadoStatus === "Favorite"){ maldonadoOne = 4;}
						if (maldonadoSg01PickStatus === "High"   && maldonadoStatus === "Very Likely"){ maldonadoOne = 8;}
						if (maldonadoSg01PickStatus === "High"   && maldonadoStatus === "Less Likely"){ maldonadoOne = 12;}
						if (maldonadoSg01PickStatus === "High"   && maldonadoStatus === "Underdog"){ maldonadoOne = 16;}
						if (maldonadoSg01PickStatus === "Medium" && maldonadoStatus === "Favorite"){ maldonadoOne = 6;}
						if (maldonadoSg01PickStatus === "Medium" && maldonadoStatus === "Very Likely"){ maldonadoOne = 10;}
						if (maldonadoSg01PickStatus === "Medium" && maldonadoStatus === "Less Likely"){ maldonadoOne = 14;}
						if (maldonadoSg01PickStatus === "Medium" && maldonadoStatus === "Underdog"){ maldonadoOne = 18;}
						if (maldonadoSg01PickStatus === "Low"    && maldonadoStatus === "Favorite"){ maldonadoOne = 8;}
						if (maldonadoSg01PickStatus === "Low"    && maldonadoStatus === "Very Likely"){ maldonadoOne = 12;}
						if (maldonadoSg01PickStatus === "Low"    && maldonadoStatus === "Less Likely"){ maldonadoOne = 16;}
						if (maldonadoSg01PickStatus === "Low"    && maldonadoStatus === "Underdog"){ maldonadoOne = 20;}

						var maldonadoTwo;
						if (maldonadoSg02PickStatus === "Zero") { maldonadoTwo = 0;}
						if (maldonadoSg02PickStatus === "High"   && maldonadoStatus === "Favorite"){ maldonadoTwo = 4;}
						if (maldonadoSg02PickStatus === "High"   && maldonadoStatus === "Very Likely"){ maldonadoTwo = 8;}
						if (maldonadoSg02PickStatus === "High"   && maldonadoStatus === "Less Likely"){ maldonadoTwo = 12;}
						if (maldonadoSg02PickStatus === "High"   && maldonadoStatus === "Underdog"){ maldonadoTwo = 16;}
						if (maldonadoSg02PickStatus === "Medium" && maldonadoStatus === "Favorite"){ maldonadoTwo = 6;}
						if (maldonadoSg02PickStatus === "Medium" && maldonadoStatus === "Very Likely"){ maldonadoTwo = 10;}
						if (maldonadoSg02PickStatus === "Medium" && maldonadoStatus === "Less Likely"){ maldonadoTwo = 14;}
						if (maldonadoSg02PickStatus === "Medium" && maldonadoStatus === "Underdog"){ maldonadoTwo = 18;}
						if (maldonadoSg02PickStatus === "Low"    && maldonadoStatus === "Favorite"){ maldonadoTwo = 8;}
						if (maldonadoSg02PickStatus === "Low"    && maldonadoStatus === "Very Likely"){ maldonadoTwo = 12;}
						if (maldonadoSg02PickStatus === "Low"    && maldonadoStatus === "Less Likely"){ maldonadoTwo = 16;}
						if (maldonadoSg02PickStatus === "Low"    && maldonadoStatus === "Underdog"){ maldonadoTwo = 20;}

						var maldonadoThree;
						if (maldonadoSg03PickStatus === "Zero") { maldonadoThree = 0;}
						if (maldonadoSg03PickStatus === "High"   && maldonadoStatus === "Favorite"){ maldonadoThree = 4;}
						if (maldonadoSg03PickStatus === "High"   && maldonadoStatus === "Very Likely"){ maldonadoThree = 8;}
						if (maldonadoSg03PickStatus === "High"   && maldonadoStatus === "Less Likely"){ maldonadoThree = 12;}
						if (maldonadoSg03PickStatus === "High"   && maldonadoStatus === "Underdog"){ maldonadoThree = 16;}
						if (maldonadoSg03PickStatus === "Medium" && maldonadoStatus === "Favorite"){ maldonadoThree = 6;}
						if (maldonadoSg03PickStatus === "Medium" && maldonadoStatus === "Very Likely"){ maldonadoThree = 10;}
						if (maldonadoSg03PickStatus === "Medium" && maldonadoStatus === "Less Likely"){ maldonadoThree = 14;}
						if (maldonadoSg03PickStatus === "Medium" && maldonadoStatus === "Underdog"){ maldonadoThree = 18;}
						if (maldonadoSg03PickStatus === "Low"    && maldonadoStatus === "Favorite"){ maldonadoThree = 8;}
						if (maldonadoSg03PickStatus === "Low"    && maldonadoStatus === "Very Likely"){ maldonadoThree = 12;}
						if (maldonadoSg03PickStatus === "Low"    && maldonadoStatus === "Less Likely"){ maldonadoThree = 16;}
						if (maldonadoSg03PickStatus === "Low"    && maldonadoStatus === "Underdog"){ maldonadoThree = 20;}

						var maldonadoFour;
						if (maldonadoSg04PickStatus === "Zero") { maldonadoFour = 0;}
						if (maldonadoSg04PickStatus === "High"   && maldonadoStatus === "Favorite"){ maldonadoFour = 4;}
						if (maldonadoSg04PickStatus === "High"   && maldonadoStatus === "Very Likely"){ maldonadoFour = 8;}
						if (maldonadoSg04PickStatus === "High"   && maldonadoStatus === "Less Likely"){ maldonadoFour = 12;}
						if (maldonadoSg04PickStatus === "High"   && maldonadoStatus === "Underdog"){ maldonadoFour = 16;}
						if (maldonadoSg04PickStatus === "Medium" && maldonadoStatus === "Favorite"){ maldonadoFour = 6;}
						if (maldonadoSg04PickStatus === "Medium" && maldonadoStatus === "Very Likely"){ maldonadoFour = 10;}
						if (maldonadoSg04PickStatus === "Medium" && maldonadoStatus === "Less Likely"){ maldonadoFour = 14;}
						if (maldonadoSg04PickStatus === "Medium" && maldonadoStatus === "Underdog"){ maldonadoFour = 18;}
						if (maldonadoSg04PickStatus === "Low"    && maldonadoStatus === "Favorite"){ maldonadoFour = 8;}
						if (maldonadoSg04PickStatus === "Low"    && maldonadoStatus === "Very Likely"){ maldonadoFour = 12;}
						if (maldonadoSg04PickStatus === "Low"    && maldonadoStatus === "Less Likely"){ maldonadoFour = 16;}
						if (maldonadoSg04PickStatus === "Low"    && maldonadoStatus === "Underdog"){ maldonadoFour = 20;}

						var maldonadoFive;
						if (maldonadoSg05PickStatus === "Zero") { maldonadoFive = 0;}
						if (maldonadoSg05PickStatus === "High"   && maldonadoStatus === "Favorite"){ maldonadoFive = 4;}
						if (maldonadoSg05PickStatus === "High"   && maldonadoStatus === "Very Likely"){ maldonadoFive = 8;}
						if (maldonadoSg05PickStatus === "High"   && maldonadoStatus === "Less Likely"){ maldonadoFive = 12;}
						if (maldonadoSg05PickStatus === "High"   && maldonadoStatus === "Underdog"){ maldonadoFive = 16;}
						if (maldonadoSg05PickStatus === "Medium" && maldonadoStatus === "Favorite"){ maldonadoFive = 6;}
						if (maldonadoSg05PickStatus === "Medium" && maldonadoStatus === "Very Likely"){ maldonadoFive = 10;}
						if (maldonadoSg05PickStatus === "Medium" && maldonadoStatus === "Less Likely"){ maldonadoFive = 14;}
						if (maldonadoSg05PickStatus === "Medium" && maldonadoStatus === "Underdog"){ maldonadoFive = 18;}
						if (maldonadoSg05PickStatus === "Low"    && maldonadoStatus === "Favorite"){ maldonadoFive = 8;}
						if (maldonadoSg05PickStatus === "Low"    && maldonadoStatus === "Very Likely"){ maldonadoFive = 12;}
						if (maldonadoSg05PickStatus === "Low"    && maldonadoStatus === "Less Likely"){ maldonadoFive = 16;}
						if (maldonadoSg05PickStatus === "Low"    && maldonadoStatus === "Underdog"){ maldonadoFive = 20;}

						var maldonadoSix;
						if (maldonadoSg06PickStatus === "Zero") { maldonadoSix = 0;}
						if (maldonadoSg06PickStatus === "High"   && maldonadoStatus === "Favorite"){ maldonadoSix = 4;}
						if (maldonadoSg06PickStatus === "High"   && maldonadoStatus === "Very Likely"){ maldonadoSix = 8;}
						if (maldonadoSg06PickStatus === "High"   && maldonadoStatus === "Less Likely"){ maldonadoSix = 12;}
						if (maldonadoSg06PickStatus === "High"   && maldonadoStatus === "Underdog"){ maldonadoSix = 16;}
						if (maldonadoSg06PickStatus === "Medium" && maldonadoStatus === "Favorite"){ maldonadoSix = 6;}
						if (maldonadoSg06PickStatus === "Medium" && maldonadoStatus === "Very Likely"){ maldonadoSix = 10;}
						if (maldonadoSg06PickStatus === "Medium" && maldonadoStatus === "Less Likely"){ maldonadoSix = 14;}
						if (maldonadoSg06PickStatus === "Medium" && maldonadoStatus === "Underdog"){ maldonadoSix = 18;}
						if (maldonadoSg06PickStatus === "Low"    && maldonadoStatus === "Favorite"){ maldonadoSix = 8;}
						if (maldonadoSg06PickStatus === "Low"    && maldonadoStatus === "Very Likely"){ maldonadoSix = 12;}
						if (maldonadoSg06PickStatus === "Low"    && maldonadoStatus === "Less Likely"){ maldonadoSix = 16;}
						if (maldonadoSg06PickStatus === "Low"    && maldonadoStatus === "Underdog"){ maldonadoSix = 20;}

						var maldonadoSeven;
						if (maldonadoSg07PickStatus === "Zero") { maldonadoSeven = 0;}
						if (maldonadoSg07PickStatus === "High"   && maldonadoStatus === "Favorite"){ maldonadoSeven = 4;}
						if (maldonadoSg07PickStatus === "High"   && maldonadoStatus === "Very Likely"){ maldonadoSeven = 8;}
						if (maldonadoSg07PickStatus === "High"   && maldonadoStatus === "Less Likely"){ maldonadoSeven = 12;}
						if (maldonadoSg07PickStatus === "High"   && maldonadoStatus === "Underdog"){ maldonadoSeven = 16;}
						if (maldonadoSg07PickStatus === "Medium" && maldonadoStatus === "Favorite"){ maldonadoSeven = 6;}
						if (maldonadoSg07PickStatus === "Medium" && maldonadoStatus === "Very Likely"){ maldonadoSeven = 10;}
						if (maldonadoSg07PickStatus === "Medium" && maldonadoStatus === "Less Likely"){ maldonadoSeven = 14;}
						if (maldonadoSg07PickStatus === "Medium" && maldonadoStatus === "Underdog"){ maldonadoSeven = 18;}
						if (maldonadoSg07PickStatus === "Low"    && maldonadoStatus === "Favorite"){ maldonadoSeven = 8;}
						if (maldonadoSg07PickStatus === "Low"    && maldonadoStatus === "Very Likely"){ maldonadoSeven = 12;}
						if (maldonadoSg07PickStatus === "Low"    && maldonadoStatus === "Less Likely"){ maldonadoSeven = 16;}
						if (maldonadoSg07PickStatus === "Low"    && maldonadoStatus === "Underdog"){ maldonadoSeven = 20;}

						var maldonadoEight;
						if (maldonadoSg08PickStatus === "Zero") { maldonadoEight = 0;}
						if (maldonadoSg08PickStatus === "High"   && maldonadoStatus === "Favorite"){ maldonadoEight = 4;}
						if (maldonadoSg08PickStatus === "High"   && maldonadoStatus === "Very Likely"){ maldonadoEight = 8;}
						if (maldonadoSg08PickStatus === "High"   && maldonadoStatus === "Less Likely"){ maldonadoEight = 12;}
						if (maldonadoSg08PickStatus === "High"   && maldonadoStatus === "Underdog"){ maldonadoEight = 16;}
						if (maldonadoSg08PickStatus === "Medium" && maldonadoStatus === "Favorite"){ maldonadoEight = 6;}
						if (maldonadoSg08PickStatus === "Medium" && maldonadoStatus === "Very Likely"){ maldonadoEight = 10;}
						if (maldonadoSg08PickStatus === "Medium" && maldonadoStatus === "Less Likely"){ maldonadoEight = 14;}
						if (maldonadoSg08PickStatus === "Medium" && maldonadoStatus === "Underdog"){ maldonadoEight = 18;}
						if (maldonadoSg08PickStatus === "Low"    && maldonadoStatus === "Favorite"){ maldonadoEight = 8;}
						if (maldonadoSg08PickStatus === "Low"    && maldonadoStatus === "Very Likely"){ maldonadoEight = 12;}
						if (maldonadoSg08PickStatus === "Low"    && maldonadoStatus === "Less Likely"){ maldonadoEight = 16;}
						if (maldonadoSg08PickStatus === "Low"    && maldonadoStatus === "Underdog"){ maldonadoEight = 20;}

						var maldonadoNine;
						if (maldonadoSg09PickStatus === "Zero") { maldonadoNine = 0;}
						if (maldonadoSg09PickStatus === "High"   && maldonadoStatus === "Favorite"){ maldonadoNine = 4;}
						if (maldonadoSg09PickStatus === "High"   && maldonadoStatus === "Very Likely"){ maldonadoNine = 8;}
						if (maldonadoSg09PickStatus === "High"   && maldonadoStatus === "Less Likely"){ maldonadoNine = 12;}
						if (maldonadoSg09PickStatus === "High"   && maldonadoStatus === "Underdog"){ maldonadoNine = 16;}
						if (maldonadoSg09PickStatus === "Medium" && maldonadoStatus === "Favorite"){ maldonadoNine = 6;}
						if (maldonadoSg09PickStatus === "Medium" && maldonadoStatus === "Very Likely"){ maldonadoNine = 10;}
						if (maldonadoSg09PickStatus === "Medium" && maldonadoStatus === "Less Likely"){ maldonadoNine = 14;}
						if (maldonadoSg09PickStatus === "Medium" && maldonadoStatus === "Underdog"){ maldonadoNine = 18;}
						if (maldonadoSg09PickStatus === "Low"    && maldonadoStatus === "Favorite"){ maldonadoNine = 8;}
						if (maldonadoSg09PickStatus === "Low"    && maldonadoStatus === "Very Likely"){ maldonadoNine = 12;}
						if (maldonadoSg09PickStatus === "Low"    && maldonadoStatus === "Less Likely"){ maldonadoNine = 16;}
						if (maldonadoSg09PickStatus === "Low"    && maldonadoStatus === "Underdog"){ maldonadoNine = 20;}

						var maldonadoTen;
						if (maldonadoSg10PickStatus === "Zero") { maldonadoTen = 0;}
						if (maldonadoSg10PickStatus === "High"   && maldonadoStatus === "Favorite"){ maldonadoTen = 4;}
						if (maldonadoSg10PickStatus === "High"   && maldonadoStatus === "Very Likely"){ maldonadoTen = 8;}
						if (maldonadoSg10PickStatus === "High"   && maldonadoStatus === "Less Likely"){ maldonadoTen = 12;}
						if (maldonadoSg10PickStatus === "High"   && maldonadoStatus === "Underdog"){ maldonadoTen = 16;}
						if (maldonadoSg10PickStatus === "Medium" && maldonadoStatus === "Favorite"){ maldonadoTen = 6;}
						if (maldonadoSg10PickStatus === "Medium" && maldonadoStatus === "Very Likely"){ maldonadoTen = 10;}
						if (maldonadoSg10PickStatus === "Medium" && maldonadoStatus === "Less Likely"){ maldonadoTen = 14;}
						if (maldonadoSg10PickStatus === "Medium" && maldonadoStatus === "Underdog"){ maldonadoTen = 18;}
						if (maldonadoSg10PickStatus === "Low"    && maldonadoStatus === "Favorite"){ maldonadoTen = 8;}
						if (maldonadoSg10PickStatus === "Low"    && maldonadoStatus === "Very Likely"){ maldonadoTen = 12;}
						if (maldonadoSg10PickStatus === "Low"    && maldonadoStatus === "Less Likely"){ maldonadoTen = 16;}
						if (maldonadoSg10PickStatus === "Low"    && maldonadoStatus === "Underdog"){ maldonadoTen = 20;}

						//Verstappen
						var verstappenOne;
						if (verstappenSg01PickStatus === "Zero") { verstappenOne = 0;}
						if (verstappenSg01PickStatus === "High"   && verstappenStatus === "Favorite"){ verstappenOne = 4;}
						if (verstappenSg01PickStatus === "High"   && verstappenStatus === "Very Likely"){ verstappenOne = 8;}
						if (verstappenSg01PickStatus === "High"   && verstappenStatus === "Less Likely"){ verstappenOne = 12;}
						if (verstappenSg01PickStatus === "High"   && verstappenStatus === "Underdog"){ verstappenOne = 16;}
						if (verstappenSg01PickStatus === "Medium" && verstappenStatus === "Favorite"){ verstappenOne = 6;}
						if (verstappenSg01PickStatus === "Medium" && verstappenStatus === "Very Likely"){ verstappenOne = 10;}
						if (verstappenSg01PickStatus === "Medium" && verstappenStatus === "Less Likely"){ verstappenOne = 14;}
						if (verstappenSg01PickStatus === "Medium" && verstappenStatus === "Underdog"){ verstappenOne = 18;}
						if (verstappenSg01PickStatus === "Low"    && verstappenStatus === "Favorite"){ verstappenOne = 8;}
						if (verstappenSg01PickStatus === "Low"    && verstappenStatus === "Very Likely"){ verstappenOne = 12;}
						if (verstappenSg01PickStatus === "Low"    && verstappenStatus === "Less Likely"){ verstappenOne = 16;}
						if (verstappenSg01PickStatus === "Low"    && verstappenStatus === "Underdog"){ verstappenOne = 20;}

						var verstappenTwo;
						if (verstappenSg02PickStatus === "Zero") { verstappenTwo = 0;}
						if (verstappenSg02PickStatus === "High"   && verstappenStatus === "Favorite"){ verstappenTwo = 4;}
						if (verstappenSg02PickStatus === "High"   && verstappenStatus === "Very Likely"){ verstappenTwo = 8;}
						if (verstappenSg02PickStatus === "High"   && verstappenStatus === "Less Likely"){ verstappenTwo = 12;}
						if (verstappenSg02PickStatus === "High"   && verstappenStatus === "Underdog"){ verstappenTwo = 16;}
						if (verstappenSg02PickStatus === "Medium" && verstappenStatus === "Favorite"){ verstappenTwo = 6;}
						if (verstappenSg02PickStatus === "Medium" && verstappenStatus === "Very Likely"){ verstappenTwo = 10;}
						if (verstappenSg02PickStatus === "Medium" && verstappenStatus === "Less Likely"){ verstappenTwo = 14;}
						if (verstappenSg02PickStatus === "Medium" && verstappenStatus === "Underdog"){ verstappenTwo = 18;}
						if (verstappenSg02PickStatus === "Low"    && verstappenStatus === "Favorite"){ verstappenTwo = 8;}
						if (verstappenSg02PickStatus === "Low"    && verstappenStatus === "Very Likely"){ verstappenTwo = 12;}
						if (verstappenSg02PickStatus === "Low"    && verstappenStatus === "Less Likely"){ verstappenTwo = 16;}
						if (verstappenSg02PickStatus === "Low"    && verstappenStatus === "Underdog"){ verstappenTwo = 20;}

						var verstappenThree;
						if (verstappenSg03PickStatus === "Zero") { verstappenThree = 0;}
						if (verstappenSg03PickStatus === "High"   && verstappenStatus === "Favorite"){ verstappenThree = 4;}
						if (verstappenSg03PickStatus === "High"   && verstappenStatus === "Very Likely"){ verstappenThree = 8;}
						if (verstappenSg03PickStatus === "High"   && verstappenStatus === "Less Likely"){ verstappenThree = 12;}
						if (verstappenSg03PickStatus === "High"   && verstappenStatus === "Underdog"){ verstappenThree = 16;}
						if (verstappenSg03PickStatus === "Medium" && verstappenStatus === "Favorite"){ verstappenThree = 6;}
						if (verstappenSg03PickStatus === "Medium" && verstappenStatus === "Very Likely"){ verstappenThree = 10;}
						if (verstappenSg03PickStatus === "Medium" && verstappenStatus === "Less Likely"){ verstappenThree = 14;}
						if (verstappenSg03PickStatus === "Medium" && verstappenStatus === "Underdog"){ verstappenThree = 18;}
						if (verstappenSg03PickStatus === "Low"    && verstappenStatus === "Favorite"){ verstappenThree = 8;}
						if (verstappenSg03PickStatus === "Low"    && verstappenStatus === "Very Likely"){ verstappenThree = 12;}
						if (verstappenSg03PickStatus === "Low"    && verstappenStatus === "Less Likely"){ verstappenThree = 16;}
						if (verstappenSg03PickStatus === "Low"    && verstappenStatus === "Underdog"){ verstappenThree = 20;}

						var verstappenFour;
						if (verstappenSg04PickStatus === "Zero") { verstappenFour = 0;}
						if (verstappenSg04PickStatus === "High"   && verstappenStatus === "Favorite"){ verstappenFour = 4;}
						if (verstappenSg04PickStatus === "High"   && verstappenStatus === "Very Likely"){ verstappenFour = 8;}
						if (verstappenSg04PickStatus === "High"   && verstappenStatus === "Less Likely"){ verstappenFour = 12;}
						if (verstappenSg04PickStatus === "High"   && verstappenStatus === "Underdog"){ verstappenFour = 16;}
						if (verstappenSg04PickStatus === "Medium" && verstappenStatus === "Favorite"){ verstappenFour = 6;}
						if (verstappenSg04PickStatus === "Medium" && verstappenStatus === "Very Likely"){ verstappenFour = 10;}
						if (verstappenSg04PickStatus === "Medium" && verstappenStatus === "Less Likely"){ verstappenFour = 14;}
						if (verstappenSg04PickStatus === "Medium" && verstappenStatus === "Underdog"){ verstappenFour = 18;}
						if (verstappenSg04PickStatus === "Low"    && verstappenStatus === "Favorite"){ verstappenFour = 8;}
						if (verstappenSg04PickStatus === "Low"    && verstappenStatus === "Very Likely"){ verstappenFour = 12;}
						if (verstappenSg04PickStatus === "Low"    && verstappenStatus === "Less Likely"){ verstappenFour = 16;}
						if (verstappenSg04PickStatus === "Low"    && verstappenStatus === "Underdog"){ verstappenFour = 20;}

						var verstappenFive;
						if (verstappenSg05PickStatus === "Zero") { verstappenFive = 0;}
						if (verstappenSg05PickStatus === "High"   && verstappenStatus === "Favorite"){ verstappenFive = 4;}
						if (verstappenSg05PickStatus === "High"   && verstappenStatus === "Very Likely"){ verstappenFive = 8;}
						if (verstappenSg05PickStatus === "High"   && verstappenStatus === "Less Likely"){ verstappenFive = 12;}
						if (verstappenSg05PickStatus === "High"   && verstappenStatus === "Underdog"){ verstappenFive = 16;}
						if (verstappenSg05PickStatus === "Medium" && verstappenStatus === "Favorite"){ verstappenFive = 6;}
						if (verstappenSg05PickStatus === "Medium" && verstappenStatus === "Very Likely"){ verstappenFive = 10;}
						if (verstappenSg05PickStatus === "Medium" && verstappenStatus === "Less Likely"){ verstappenFive = 14;}
						if (verstappenSg05PickStatus === "Medium" && verstappenStatus === "Underdog"){ verstappenFive = 18;}
						if (verstappenSg05PickStatus === "Low"    && verstappenStatus === "Favorite"){ verstappenFive = 8;}
						if (verstappenSg05PickStatus === "Low"    && verstappenStatus === "Very Likely"){ verstappenFive = 12;}
						if (verstappenSg05PickStatus === "Low"    && verstappenStatus === "Less Likely"){ verstappenFive = 16;}
						if (verstappenSg05PickStatus === "Low"    && verstappenStatus === "Underdog"){ verstappenFive = 20;}

						var verstappenSix;
						if (verstappenSg06PickStatus === "Zero") { verstappenSix = 0;}
						if (verstappenSg06PickStatus === "High"   && verstappenStatus === "Favorite"){ verstappenSix = 4;}
						if (verstappenSg06PickStatus === "High"   && verstappenStatus === "Very Likely"){ verstappenSix = 8;}
						if (verstappenSg06PickStatus === "High"   && verstappenStatus === "Less Likely"){ verstappenSix = 12;}
						if (verstappenSg06PickStatus === "High"   && verstappenStatus === "Underdog"){ verstappenSix = 16;}
						if (verstappenSg06PickStatus === "Medium" && verstappenStatus === "Favorite"){ verstappenSix = 6;}
						if (verstappenSg06PickStatus === "Medium" && verstappenStatus === "Very Likely"){ verstappenSix = 10;}
						if (verstappenSg06PickStatus === "Medium" && verstappenStatus === "Less Likely"){ verstappenSix = 14;}
						if (verstappenSg06PickStatus === "Medium" && verstappenStatus === "Underdog"){ verstappenSix = 18;}
						if (verstappenSg06PickStatus === "Low"    && verstappenStatus === "Favorite"){ verstappenSix = 8;}
						if (verstappenSg06PickStatus === "Low"    && verstappenStatus === "Very Likely"){ verstappenSix = 12;}
						if (verstappenSg06PickStatus === "Low"    && verstappenStatus === "Less Likely"){ verstappenSix = 16;}
						if (verstappenSg06PickStatus === "Low"    && verstappenStatus === "Underdog"){ verstappenSix = 20;}

						var verstappenSeven;
						if (verstappenSg07PickStatus === "Zero") { verstappenSeven = 0;}
						if (verstappenSg07PickStatus === "High"   && verstappenStatus === "Favorite"){ verstappenSeven = 4;}
						if (verstappenSg07PickStatus === "High"   && verstappenStatus === "Very Likely"){ verstappenSeven = 8;}
						if (verstappenSg07PickStatus === "High"   && verstappenStatus === "Less Likely"){ verstappenSeven = 12;}
						if (verstappenSg07PickStatus === "High"   && verstappenStatus === "Underdog"){ verstappenSeven = 16;}
						if (verstappenSg07PickStatus === "Medium" && verstappenStatus === "Favorite"){ verstappenSeven = 6;}
						if (verstappenSg07PickStatus === "Medium" && verstappenStatus === "Very Likely"){ verstappenSeven = 10;}
						if (verstappenSg07PickStatus === "Medium" && verstappenStatus === "Less Likely"){ verstappenSeven = 14;}
						if (verstappenSg07PickStatus === "Medium" && verstappenStatus === "Underdog"){ verstappenSeven = 18;}
						if (verstappenSg07PickStatus === "Low"    && verstappenStatus === "Favorite"){ verstappenSeven = 8;}
						if (verstappenSg07PickStatus === "Low"    && verstappenStatus === "Very Likely"){ verstappenSeven = 12;}
						if (verstappenSg07PickStatus === "Low"    && verstappenStatus === "Less Likely"){ verstappenSeven = 16;}
						if (verstappenSg07PickStatus === "Low"    && verstappenStatus === "Underdog"){ verstappenSeven = 20;}

						var verstappenEight;
						if (verstappenSg08PickStatus === "Zero") { verstappenEight = 0;}
						if (verstappenSg08PickStatus === "High"   && verstappenStatus === "Favorite"){ verstappenEight = 4;}
						if (verstappenSg08PickStatus === "High"   && verstappenStatus === "Very Likely"){ verstappenEight = 8;}
						if (verstappenSg08PickStatus === "High"   && verstappenStatus === "Less Likely"){ verstappenEight = 12;}
						if (verstappenSg08PickStatus === "High"   && verstappenStatus === "Underdog"){ verstappenEight = 16;}
						if (verstappenSg08PickStatus === "Medium" && verstappenStatus === "Favorite"){ verstappenEight = 6;}
						if (verstappenSg08PickStatus === "Medium" && verstappenStatus === "Very Likely"){ verstappenEight = 10;}
						if (verstappenSg08PickStatus === "Medium" && verstappenStatus === "Less Likely"){ verstappenEight = 14;}
						if (verstappenSg08PickStatus === "Medium" && verstappenStatus === "Underdog"){ verstappenEight = 18;}
						if (verstappenSg08PickStatus === "Low"    && verstappenStatus === "Favorite"){ verstappenEight = 8;}
						if (verstappenSg08PickStatus === "Low"    && verstappenStatus === "Very Likely"){ verstappenEight = 12;}
						if (verstappenSg08PickStatus === "Low"    && verstappenStatus === "Less Likely"){ verstappenEight = 16;}
						if (verstappenSg08PickStatus === "Low"    && verstappenStatus === "Underdog"){ verstappenEight = 20;}

						var verstappenNine;
						if (verstappenSg09PickStatus === "Zero") { verstappenNine = 0;}
						if (verstappenSg09PickStatus === "High"   && verstappenStatus === "Favorite"){ verstappenNine = 4;}
						if (verstappenSg09PickStatus === "High"   && verstappenStatus === "Very Likely"){ verstappenNine = 8;}
						if (verstappenSg09PickStatus === "High"   && verstappenStatus === "Less Likely"){ verstappenNine = 12;}
						if (verstappenSg09PickStatus === "High"   && verstappenStatus === "Underdog"){ verstappenNine = 16;}
						if (verstappenSg09PickStatus === "Medium" && verstappenStatus === "Favorite"){ verstappenNine = 6;}
						if (verstappenSg09PickStatus === "Medium" && verstappenStatus === "Very Likely"){ verstappenNine = 10;}
						if (verstappenSg09PickStatus === "Medium" && verstappenStatus === "Less Likely"){ verstappenNine = 14;}
						if (verstappenSg09PickStatus === "Medium" && verstappenStatus === "Underdog"){ verstappenNine = 18;}
						if (verstappenSg09PickStatus === "Low"    && verstappenStatus === "Favorite"){ verstappenNine = 8;}
						if (verstappenSg09PickStatus === "Low"    && verstappenStatus === "Very Likely"){ verstappenNine = 12;}
						if (verstappenSg09PickStatus === "Low"    && verstappenStatus === "Less Likely"){ verstappenNine = 16;}
						if (verstappenSg09PickStatus === "Low"    && verstappenStatus === "Underdog"){ verstappenNine = 20;}

						var verstappenTen;
						if (verstappenSg10PickStatus === "Zero") { verstappenTen = 0;}
						if (verstappenSg10PickStatus === "High"   && verstappenStatus === "Favorite"){ verstappenTen = 4;}
						if (verstappenSg10PickStatus === "High"   && verstappenStatus === "Very Likely"){ verstappenTen = 8;}
						if (verstappenSg10PickStatus === "High"   && verstappenStatus === "Less Likely"){ verstappenTen = 12;}
						if (verstappenSg10PickStatus === "High"   && verstappenStatus === "Underdog"){ verstappenTen = 16;}
						if (verstappenSg10PickStatus === "Medium" && verstappenStatus === "Favorite"){ verstappenTen = 6;}
						if (verstappenSg10PickStatus === "Medium" && verstappenStatus === "Very Likely"){ verstappenTen = 10;}
						if (verstappenSg10PickStatus === "Medium" && verstappenStatus === "Less Likely"){ verstappenTen = 14;}
						if (verstappenSg10PickStatus === "Medium" && verstappenStatus === "Underdog"){ verstappenTen = 18;}
						if (verstappenSg10PickStatus === "Low"    && verstappenStatus === "Favorite"){ verstappenTen = 8;}
						if (verstappenSg10PickStatus === "Low"    && verstappenStatus === "Very Likely"){ verstappenTen = 12;}
						if (verstappenSg10PickStatus === "Low"    && verstappenStatus === "Less Likely"){ verstappenTen = 16;}
						if (verstappenSg10PickStatus === "Low"    && verstappenStatus === "Underdog"){ verstappenTen = 20;}

						//Sainz
						var sainzOne;
						if (sainzSg01PickStatus === "Zero") { sainzOne = 0;}
						if (sainzSg01PickStatus === "High"   && sainzStatus === "Favorite"){ sainzOne = 4;}
						if (sainzSg01PickStatus === "High"   && sainzStatus === "Very Likely"){ sainzOne = 8;}
						if (sainzSg01PickStatus === "High"   && sainzStatus === "Less Likely"){ sainzOne = 12;}
						if (sainzSg01PickStatus === "High"   && sainzStatus === "Underdog"){ sainzOne = 16;}
						if (sainzSg01PickStatus === "Medium" && sainzStatus === "Favorite"){ sainzOne = 6;}
						if (sainzSg01PickStatus === "Medium" && sainzStatus === "Very Likely"){ sainzOne = 10;}
						if (sainzSg01PickStatus === "Medium" && sainzStatus === "Less Likely"){ sainzOne = 14;}
						if (sainzSg01PickStatus === "Medium" && sainzStatus === "Underdog"){ sainzOne = 18;}
						if (sainzSg01PickStatus === "Low"    && sainzStatus === "Favorite"){ sainzOne = 8;}
						if (sainzSg01PickStatus === "Low"    && sainzStatus === "Very Likely"){ sainzOne = 12;}
						if (sainzSg01PickStatus === "Low"    && sainzStatus === "Less Likely"){ sainzOne = 16;}
						if (sainzSg01PickStatus === "Low"    && sainzStatus === "Underdog"){ sainzOne = 20;}

						var sainzTwo;
						if (sainzSg02PickStatus === "Zero") { sainzTwo = 0;}
						if (sainzSg02PickStatus === "High"   && sainzStatus === "Favorite"){ sainzTwo = 4;}
						if (sainzSg02PickStatus === "High"   && sainzStatus === "Very Likely"){ sainzTwo = 8;}
						if (sainzSg02PickStatus === "High"   && sainzStatus === "Less Likely"){ sainzTwo = 12;}
						if (sainzSg02PickStatus === "High"   && sainzStatus === "Underdog"){ sainzTwo = 16;}
						if (sainzSg02PickStatus === "Medium" && sainzStatus === "Favorite"){ sainzTwo = 6;}
						if (sainzSg02PickStatus === "Medium" && sainzStatus === "Very Likely"){ sainzTwo = 10;}
						if (sainzSg02PickStatus === "Medium" && sainzStatus === "Less Likely"){ sainzTwo = 14;}
						if (sainzSg02PickStatus === "Medium" && sainzStatus === "Underdog"){ sainzTwo = 18;}
						if (sainzSg02PickStatus === "Low"    && sainzStatus === "Favorite"){ sainzTwo = 8;}
						if (sainzSg02PickStatus === "Low"    && sainzStatus === "Very Likely"){ sainzTwo = 12;}
						if (sainzSg02PickStatus === "Low"    && sainzStatus === "Less Likely"){ sainzTwo = 16;}
						if (sainzSg02PickStatus === "Low"    && sainzStatus === "Underdog"){ sainzTwo = 20;}

						var sainzThree;
						if (sainzSg03PickStatus === "Zero") { sainzThree = 0;}
						if (sainzSg03PickStatus === "High"   && sainzStatus === "Favorite"){ sainzThree = 4;}
						if (sainzSg03PickStatus === "High"   && sainzStatus === "Very Likely"){ sainzThree = 8;}
						if (sainzSg03PickStatus === "High"   && sainzStatus === "Less Likely"){ sainzThree = 12;}
						if (sainzSg03PickStatus === "High"   && sainzStatus === "Underdog"){ sainzThree = 16;}
						if (sainzSg03PickStatus === "Medium" && sainzStatus === "Favorite"){ sainzThree = 6;}
						if (sainzSg03PickStatus === "Medium" && sainzStatus === "Very Likely"){ sainzThree = 10;}
						if (sainzSg03PickStatus === "Medium" && sainzStatus === "Less Likely"){ sainzThree = 14;}
						if (sainzSg03PickStatus === "Medium" && sainzStatus === "Underdog"){ sainzThree = 18;}
						if (sainzSg03PickStatus === "Low"    && sainzStatus === "Favorite"){ sainzThree = 8;}
						if (sainzSg03PickStatus === "Low"    && sainzStatus === "Very Likely"){ sainzThree = 12;}
						if (sainzSg03PickStatus === "Low"    && sainzStatus === "Less Likely"){ sainzThree = 16;}
						if (sainzSg03PickStatus === "Low"    && sainzStatus === "Underdog"){ sainzThree = 20;}

						var sainzFour;
						if (sainzSg04PickStatus === "Zero") { sainzFour = 0;}
						if (sainzSg04PickStatus === "High"   && sainzStatus === "Favorite"){ sainzFour = 4;}
						if (sainzSg04PickStatus === "High"   && sainzStatus === "Very Likely"){ sainzFour = 8;}
						if (sainzSg04PickStatus === "High"   && sainzStatus === "Less Likely"){ sainzFour = 12;}
						if (sainzSg04PickStatus === "High"   && sainzStatus === "Underdog"){ sainzFour = 16;}
						if (sainzSg04PickStatus === "Medium" && sainzStatus === "Favorite"){ sainzFour = 6;}
						if (sainzSg04PickStatus === "Medium" && sainzStatus === "Very Likely"){ sainzFour = 10;}
						if (sainzSg04PickStatus === "Medium" && sainzStatus === "Less Likely"){ sainzFour = 14;}
						if (sainzSg04PickStatus === "Medium" && sainzStatus === "Underdog"){ sainzFour = 18;}
						if (sainzSg04PickStatus === "Low"    && sainzStatus === "Favorite"){ sainzFour = 8;}
						if (sainzSg04PickStatus === "Low"    && sainzStatus === "Very Likely"){ sainzFour = 12;}
						if (sainzSg04PickStatus === "Low"    && sainzStatus === "Less Likely"){ sainzFour = 16;}
						if (sainzSg04PickStatus === "Low"    && sainzStatus === "Underdog"){ sainzFour = 20;}

						var sainzFive;
						if (sainzSg05PickStatus === "Zero") { sainzFive = 0;}
						if (sainzSg05PickStatus === "High"   && sainzStatus === "Favorite"){ sainzFive = 4;}
						if (sainzSg05PickStatus === "High"   && sainzStatus === "Very Likely"){ sainzFive = 8;}
						if (sainzSg05PickStatus === "High"   && sainzStatus === "Less Likely"){ sainzFive = 12;}
						if (sainzSg05PickStatus === "High"   && sainzStatus === "Underdog"){ sainzFive = 16;}
						if (sainzSg05PickStatus === "Medium" && sainzStatus === "Favorite"){ sainzFive = 6;}
						if (sainzSg05PickStatus === "Medium" && sainzStatus === "Very Likely"){ sainzFive = 10;}
						if (sainzSg05PickStatus === "Medium" && sainzStatus === "Less Likely"){ sainzFive = 14;}
						if (sainzSg05PickStatus === "Medium" && sainzStatus === "Underdog"){ sainzFive = 18;}
						if (sainzSg05PickStatus === "Low"    && sainzStatus === "Favorite"){ sainzFive = 8;}
						if (sainzSg05PickStatus === "Low"    && sainzStatus === "Very Likely"){ sainzFive = 12;}
						if (sainzSg05PickStatus === "Low"    && sainzStatus === "Less Likely"){ sainzFive = 16;}
						if (sainzSg05PickStatus === "Low"    && sainzStatus === "Underdog"){ sainzFive = 20;}

						var sainzSix;
						if (sainzSg06PickStatus === "Zero") { sainzSix = 0;}
						if (sainzSg06PickStatus === "High"   && sainzStatus === "Favorite"){ sainzSix = 4;}
						if (sainzSg06PickStatus === "High"   && sainzStatus === "Very Likely"){ sainzSix = 8;}
						if (sainzSg06PickStatus === "High"   && sainzStatus === "Less Likely"){ sainzSix = 12;}
						if (sainzSg06PickStatus === "High"   && sainzStatus === "Underdog"){ sainzSix = 16;}
						if (sainzSg06PickStatus === "Medium" && sainzStatus === "Favorite"){ sainzSix = 6;}
						if (sainzSg06PickStatus === "Medium" && sainzStatus === "Very Likely"){ sainzSix = 10;}
						if (sainzSg06PickStatus === "Medium" && sainzStatus === "Less Likely"){ sainzSix = 14;}
						if (sainzSg06PickStatus === "Medium" && sainzStatus === "Underdog"){ sainzSix = 18;}
						if (sainzSg06PickStatus === "Low"    && sainzStatus === "Favorite"){ sainzSix = 8;}
						if (sainzSg06PickStatus === "Low"    && sainzStatus === "Very Likely"){ sainzSix = 12;}
						if (sainzSg06PickStatus === "Low"    && sainzStatus === "Less Likely"){ sainzSix = 16;}
						if (sainzSg06PickStatus === "Low"    && sainzStatus === "Underdog"){ sainzSix = 20;}

						var sainzSeven;
						if (sainzSg07PickStatus === "Zero") { sainzSeven = 0;}
						if (sainzSg07PickStatus === "High"   && sainzStatus === "Favorite"){ sainzSeven = 4;}
						if (sainzSg07PickStatus === "High"   && sainzStatus === "Very Likely"){ sainzSeven = 8;}
						if (sainzSg07PickStatus === "High"   && sainzStatus === "Less Likely"){ sainzSeven = 12;}
						if (sainzSg07PickStatus === "High"   && sainzStatus === "Underdog"){ sainzSeven = 16;}
						if (sainzSg07PickStatus === "Medium" && sainzStatus === "Favorite"){ sainzSeven = 6;}
						if (sainzSg07PickStatus === "Medium" && sainzStatus === "Very Likely"){ sainzSeven = 10;}
						if (sainzSg07PickStatus === "Medium" && sainzStatus === "Less Likely"){ sainzSeven = 14;}
						if (sainzSg07PickStatus === "Medium" && sainzStatus === "Underdog"){ sainzSeven = 18;}
						if (sainzSg07PickStatus === "Low"    && sainzStatus === "Favorite"){ sainzSeven = 8;}
						if (sainzSg07PickStatus === "Low"    && sainzStatus === "Very Likely"){ sainzSeven = 12;}
						if (sainzSg07PickStatus === "Low"    && sainzStatus === "Less Likely"){ sainzSeven = 16;}
						if (sainzSg07PickStatus === "Low"    && sainzStatus === "Underdog"){ sainzSeven = 20;}

						var sainzEight;
						if (sainzSg08PickStatus === "Zero") { sainzEight = 0;}
						if (sainzSg08PickStatus === "High"   && sainzStatus === "Favorite"){ sainzEight = 4;}
						if (sainzSg08PickStatus === "High"   && sainzStatus === "Very Likely"){ sainzEight = 8;}
						if (sainzSg08PickStatus === "High"   && sainzStatus === "Less Likely"){ sainzEight = 12;}
						if (sainzSg08PickStatus === "High"   && sainzStatus === "Underdog"){ sainzEight = 16;}
						if (sainzSg08PickStatus === "Medium" && sainzStatus === "Favorite"){ sainzEight = 6;}
						if (sainzSg08PickStatus === "Medium" && sainzStatus === "Very Likely"){ sainzEight = 10;}
						if (sainzSg08PickStatus === "Medium" && sainzStatus === "Less Likely"){ sainzEight = 14;}
						if (sainzSg08PickStatus === "Medium" && sainzStatus === "Underdog"){ sainzEight = 18;}
						if (sainzSg08PickStatus === "Low"    && sainzStatus === "Favorite"){ sainzEight = 8;}
						if (sainzSg08PickStatus === "Low"    && sainzStatus === "Very Likely"){ sainzEight = 12;}
						if (sainzSg08PickStatus === "Low"    && sainzStatus === "Less Likely"){ sainzEight = 16;}
						if (sainzSg08PickStatus === "Low"    && sainzStatus === "Underdog"){ sainzEight = 20;}

						var sainzNine;
						if (sainzSg09PickStatus === "Zero") { sainzNine = 0;}
						if (sainzSg09PickStatus === "High"   && sainzStatus === "Favorite"){ sainzNine = 4;}
						if (sainzSg09PickStatus === "High"   && sainzStatus === "Very Likely"){ sainzNine = 8;}
						if (sainzSg09PickStatus === "High"   && sainzStatus === "Less Likely"){ sainzNine = 12;}
						if (sainzSg09PickStatus === "High"   && sainzStatus === "Underdog"){ sainzNine = 16;}
						if (sainzSg09PickStatus === "Medium" && sainzStatus === "Favorite"){ sainzNine = 6;}
						if (sainzSg09PickStatus === "Medium" && sainzStatus === "Very Likely"){ sainzNine = 10;}
						if (sainzSg09PickStatus === "Medium" && sainzStatus === "Less Likely"){ sainzNine = 14;}
						if (sainzSg09PickStatus === "Medium" && sainzStatus === "Underdog"){ sainzNine = 18;}
						if (sainzSg09PickStatus === "Low"    && sainzStatus === "Favorite"){ sainzNine = 8;}
						if (sainzSg09PickStatus === "Low"    && sainzStatus === "Very Likely"){ sainzNine = 12;}
						if (sainzSg09PickStatus === "Low"    && sainzStatus === "Less Likely"){ sainzNine = 16;}
						if (sainzSg09PickStatus === "Low"    && sainzStatus === "Underdog"){ sainzNine = 20;}

						var sainzTen;
						if (sainzSg10PickStatus === "Zero") { sainzTen = 0;}
						if (sainzSg10PickStatus === "High"   && sainzStatus === "Favorite"){ sainzTen = 4;}
						if (sainzSg10PickStatus === "High"   && sainzStatus === "Very Likely"){ sainzTen = 8;}
						if (sainzSg10PickStatus === "High"   && sainzStatus === "Less Likely"){ sainzTen = 12;}
						if (sainzSg10PickStatus === "High"   && sainzStatus === "Underdog"){ sainzTen = 16;}
						if (sainzSg10PickStatus === "Medium" && sainzStatus === "Favorite"){ sainzTen = 6;}
						if (sainzSg10PickStatus === "Medium" && sainzStatus === "Very Likely"){ sainzTen = 10;}
						if (sainzSg10PickStatus === "Medium" && sainzStatus === "Less Likely"){ sainzTen = 14;}
						if (sainzSg10PickStatus === "Medium" && sainzStatus === "Underdog"){ sainzTen = 18;}
						if (sainzSg10PickStatus === "Low"    && sainzStatus === "Favorite"){ sainzTen = 8;}
						if (sainzSg10PickStatus === "Low"    && sainzStatus === "Very Likely"){ sainzTen = 12;}
						if (sainzSg10PickStatus === "Low"    && sainzStatus === "Less Likely"){ sainzTen = 16;}
						if (sainzSg10PickStatus === "Low"    && sainzStatus === "Underdog"){ sainzTen = 20;}

						//Ericsson
						var ericssonOne;
						if (ericssonSg01PickStatus === "Zero") { ericssonOne = 0;}
						if (ericssonSg01PickStatus === "High"   && ericssonStatus === "Favorite"){ ericssonOne = 4;}
						if (ericssonSg01PickStatus === "High"   && ericssonStatus === "Very Likely"){ ericssonOne = 8;}
						if (ericssonSg01PickStatus === "High"   && ericssonStatus === "Less Likely"){ ericssonOne = 12;}
						if (ericssonSg01PickStatus === "High"   && ericssonStatus === "Underdog"){ ericssonOne = 16;}
						if (ericssonSg01PickStatus === "Medium" && ericssonStatus === "Favorite"){ ericssonOne = 6;}
						if (ericssonSg01PickStatus === "Medium" && ericssonStatus === "Very Likely"){ ericssonOne = 10;}
						if (ericssonSg01PickStatus === "Medium" && ericssonStatus === "Less Likely"){ ericssonOne = 14;}
						if (ericssonSg01PickStatus === "Medium" && ericssonStatus === "Underdog"){ ericssonOne = 18;}
						if (ericssonSg01PickStatus === "Low"    && ericssonStatus === "Favorite"){ ericssonOne = 8;}
						if (ericssonSg01PickStatus === "Low"    && ericssonStatus === "Very Likely"){ ericssonOne = 12;}
						if (ericssonSg01PickStatus === "Low"    && ericssonStatus === "Less Likely"){ ericssonOne = 16;}
						if (ericssonSg01PickStatus === "Low"    && ericssonStatus === "Underdog"){ ericssonOne = 20;}

						var ericssonTwo;
						if (ericssonSg02PickStatus === "Zero") { ericssonTwo = 0;}
						if (ericssonSg02PickStatus === "High"   && ericssonStatus === "Favorite"){ ericssonTwo = 4;}
						if (ericssonSg02PickStatus === "High"   && ericssonStatus === "Very Likely"){ ericssonTwo = 8;}
						if (ericssonSg02PickStatus === "High"   && ericssonStatus === "Less Likely"){ ericssonTwo = 12;}
						if (ericssonSg02PickStatus === "High"   && ericssonStatus === "Underdog"){ ericssonTwo = 16;}
						if (ericssonSg02PickStatus === "Medium" && ericssonStatus === "Favorite"){ ericssonTwo = 6;}
						if (ericssonSg02PickStatus === "Medium" && ericssonStatus === "Very Likely"){ ericssonTwo = 10;}
						if (ericssonSg02PickStatus === "Medium" && ericssonStatus === "Less Likely"){ ericssonTwo = 14;}
						if (ericssonSg02PickStatus === "Medium" && ericssonStatus === "Underdog"){ ericssonTwo = 18;}
						if (ericssonSg02PickStatus === "Low"    && ericssonStatus === "Favorite"){ ericssonTwo = 8;}
						if (ericssonSg02PickStatus === "Low"    && ericssonStatus === "Very Likely"){ ericssonTwo = 12;}
						if (ericssonSg02PickStatus === "Low"    && ericssonStatus === "Less Likely"){ ericssonTwo = 16;}
						if (ericssonSg02PickStatus === "Low"    && ericssonStatus === "Underdog"){ ericssonTwo = 20;}

						var ericssonThree;
						if (ericssonSg03PickStatus === "Zero") { ericssonThree = 0;}
						if (ericssonSg03PickStatus === "High"   && ericssonStatus === "Favorite"){ ericssonThree = 4;}
						if (ericssonSg03PickStatus === "High"   && ericssonStatus === "Very Likely"){ ericssonThree = 8;}
						if (ericssonSg03PickStatus === "High"   && ericssonStatus === "Less Likely"){ ericssonThree = 12;}
						if (ericssonSg03PickStatus === "High"   && ericssonStatus === "Underdog"){ ericssonThree = 16;}
						if (ericssonSg03PickStatus === "Medium" && ericssonStatus === "Favorite"){ ericssonThree = 6;}
						if (ericssonSg03PickStatus === "Medium" && ericssonStatus === "Very Likely"){ ericssonThree = 10;}
						if (ericssonSg03PickStatus === "Medium" && ericssonStatus === "Less Likely"){ ericssonThree = 14;}
						if (ericssonSg03PickStatus === "Medium" && ericssonStatus === "Underdog"){ ericssonThree = 18;}
						if (ericssonSg03PickStatus === "Low"    && ericssonStatus === "Favorite"){ ericssonThree = 8;}
						if (ericssonSg03PickStatus === "Low"    && ericssonStatus === "Very Likely"){ ericssonThree = 12;}
						if (ericssonSg03PickStatus === "Low"    && ericssonStatus === "Less Likely"){ ericssonThree = 16;}
						if (ericssonSg03PickStatus === "Low"    && ericssonStatus === "Underdog"){ ericssonThree = 20;}

						var ericssonFour;
						if (ericssonSg04PickStatus === "Zero") { ericssonFour = 0;}
						if (ericssonSg04PickStatus === "High"   && ericssonStatus === "Favorite"){ ericssonFour = 4;}
						if (ericssonSg04PickStatus === "High"   && ericssonStatus === "Very Likely"){ ericssonFour = 8;}
						if (ericssonSg04PickStatus === "High"   && ericssonStatus === "Less Likely"){ ericssonFour = 12;}
						if (ericssonSg04PickStatus === "High"   && ericssonStatus === "Underdog"){ ericssonFour = 16;}
						if (ericssonSg04PickStatus === "Medium" && ericssonStatus === "Favorite"){ ericssonFour = 6;}
						if (ericssonSg04PickStatus === "Medium" && ericssonStatus === "Very Likely"){ ericssonFour = 10;}
						if (ericssonSg04PickStatus === "Medium" && ericssonStatus === "Less Likely"){ ericssonFour = 14;}
						if (ericssonSg04PickStatus === "Medium" && ericssonStatus === "Underdog"){ ericssonFour = 18;}
						if (ericssonSg04PickStatus === "Low"    && ericssonStatus === "Favorite"){ ericssonFour = 8;}
						if (ericssonSg04PickStatus === "Low"    && ericssonStatus === "Very Likely"){ ericssonFour = 12;}
						if (ericssonSg04PickStatus === "Low"    && ericssonStatus === "Less Likely"){ ericssonFour = 16;}
						if (ericssonSg04PickStatus === "Low"    && ericssonStatus === "Underdog"){ ericssonFour = 20;}

						var ericssonFive;
						if (ericssonSg05PickStatus === "Zero") { ericssonFive = 0;}
						if (ericssonSg05PickStatus === "High"   && ericssonStatus === "Favorite"){ ericssonFive = 4;}
						if (ericssonSg05PickStatus === "High"   && ericssonStatus === "Very Likely"){ ericssonFive = 8;}
						if (ericssonSg05PickStatus === "High"   && ericssonStatus === "Less Likely"){ ericssonFive = 12;}
						if (ericssonSg05PickStatus === "High"   && ericssonStatus === "Underdog"){ ericssonFive = 16;}
						if (ericssonSg05PickStatus === "Medium" && ericssonStatus === "Favorite"){ ericssonFive = 6;}
						if (ericssonSg05PickStatus === "Medium" && ericssonStatus === "Very Likely"){ ericssonFive = 10;}
						if (ericssonSg05PickStatus === "Medium" && ericssonStatus === "Less Likely"){ ericssonFive = 14;}
						if (ericssonSg05PickStatus === "Medium" && ericssonStatus === "Underdog"){ ericssonFive = 18;}
						if (ericssonSg05PickStatus === "Low"    && ericssonStatus === "Favorite"){ ericssonFive = 8;}
						if (ericssonSg05PickStatus === "Low"    && ericssonStatus === "Very Likely"){ ericssonFive = 12;}
						if (ericssonSg05PickStatus === "Low"    && ericssonStatus === "Less Likely"){ ericssonFive = 16;}
						if (ericssonSg05PickStatus === "Low"    && ericssonStatus === "Underdog"){ ericssonFive = 20;}

						var ericssonSix;
						if (ericssonSg06PickStatus === "Zero") { ericssonSix = 0;}
						if (ericssonSg06PickStatus === "High"   && ericssonStatus === "Favorite"){ ericssonSix = 4;}
						if (ericssonSg06PickStatus === "High"   && ericssonStatus === "Very Likely"){ ericssonSix = 8;}
						if (ericssonSg06PickStatus === "High"   && ericssonStatus === "Less Likely"){ ericssonSix = 12;}
						if (ericssonSg06PickStatus === "High"   && ericssonStatus === "Underdog"){ ericssonSix = 16;}
						if (ericssonSg06PickStatus === "Medium" && ericssonStatus === "Favorite"){ ericssonSix = 6;}
						if (ericssonSg06PickStatus === "Medium" && ericssonStatus === "Very Likely"){ ericssonSix = 10;}
						if (ericssonSg06PickStatus === "Medium" && ericssonStatus === "Less Likely"){ ericssonSix = 14;}
						if (ericssonSg06PickStatus === "Medium" && ericssonStatus === "Underdog"){ ericssonSix = 18;}
						if (ericssonSg06PickStatus === "Low"    && ericssonStatus === "Favorite"){ ericssonSix = 8;}
						if (ericssonSg06PickStatus === "Low"    && ericssonStatus === "Very Likely"){ ericssonSix = 12;}
						if (ericssonSg06PickStatus === "Low"    && ericssonStatus === "Less Likely"){ ericssonSix = 16;}
						if (ericssonSg06PickStatus === "Low"    && ericssonStatus === "Underdog"){ ericssonSix = 20;}

						var ericssonSeven;
						if (ericssonSg07PickStatus === "Zero") { ericssonSeven = 0;}
						if (ericssonSg07PickStatus === "High"   && ericssonStatus === "Favorite"){ ericssonSeven = 4;}
						if (ericssonSg07PickStatus === "High"   && ericssonStatus === "Very Likely"){ ericssonSeven = 8;}
						if (ericssonSg07PickStatus === "High"   && ericssonStatus === "Less Likely"){ ericssonSeven = 12;}
						if (ericssonSg07PickStatus === "High"   && ericssonStatus === "Underdog"){ ericssonSeven = 16;}
						if (ericssonSg07PickStatus === "Medium" && ericssonStatus === "Favorite"){ ericssonSeven = 6;}
						if (ericssonSg07PickStatus === "Medium" && ericssonStatus === "Very Likely"){ ericssonSeven = 10;}
						if (ericssonSg07PickStatus === "Medium" && ericssonStatus === "Less Likely"){ ericssonSeven = 14;}
						if (ericssonSg07PickStatus === "Medium" && ericssonStatus === "Underdog"){ ericssonSeven = 18;}
						if (ericssonSg07PickStatus === "Low"    && ericssonStatus === "Favorite"){ ericssonSeven = 8;}
						if (ericssonSg07PickStatus === "Low"    && ericssonStatus === "Very Likely"){ ericssonSeven = 12;}
						if (ericssonSg07PickStatus === "Low"    && ericssonStatus === "Less Likely"){ ericssonSeven = 16;}
						if (ericssonSg07PickStatus === "Low"    && ericssonStatus === "Underdog"){ ericssonSeven = 20;}

						var ericssonEight;
						if (ericssonSg08PickStatus === "Zero") { ericssonEight = 0;}
						if (ericssonSg08PickStatus === "High"   && ericssonStatus === "Favorite"){ ericssonEight = 4;}
						if (ericssonSg08PickStatus === "High"   && ericssonStatus === "Very Likely"){ ericssonEight = 8;}
						if (ericssonSg08PickStatus === "High"   && ericssonStatus === "Less Likely"){ ericssonEight = 12;}
						if (ericssonSg08PickStatus === "High"   && ericssonStatus === "Underdog"){ ericssonEight = 16;}
						if (ericssonSg08PickStatus === "Medium" && ericssonStatus === "Favorite"){ ericssonEight = 6;}
						if (ericssonSg08PickStatus === "Medium" && ericssonStatus === "Very Likely"){ ericssonEight = 10;}
						if (ericssonSg08PickStatus === "Medium" && ericssonStatus === "Less Likely"){ ericssonEight = 14;}
						if (ericssonSg08PickStatus === "Medium" && ericssonStatus === "Underdog"){ ericssonEight = 18;}
						if (ericssonSg08PickStatus === "Low"    && ericssonStatus === "Favorite"){ ericssonEight = 8;}
						if (ericssonSg08PickStatus === "Low"    && ericssonStatus === "Very Likely"){ ericssonEight = 12;}
						if (ericssonSg08PickStatus === "Low"    && ericssonStatus === "Less Likely"){ ericssonEight = 16;}
						if (ericssonSg08PickStatus === "Low"    && ericssonStatus === "Underdog"){ ericssonEight = 20;}

						var ericssonNine;
						if (ericssonSg09PickStatus === "Zero") { ericssonNine = 0;}
						if (ericssonSg09PickStatus === "High"   && ericssonStatus === "Favorite"){ ericssonNine = 4;}
						if (ericssonSg09PickStatus === "High"   && ericssonStatus === "Very Likely"){ ericssonNine = 8;}
						if (ericssonSg09PickStatus === "High"   && ericssonStatus === "Less Likely"){ ericssonNine = 12;}
						if (ericssonSg09PickStatus === "High"   && ericssonStatus === "Underdog"){ ericssonNine = 16;}
						if (ericssonSg09PickStatus === "Medium" && ericssonStatus === "Favorite"){ ericssonNine = 6;}
						if (ericssonSg09PickStatus === "Medium" && ericssonStatus === "Very Likely"){ ericssonNine = 10;}
						if (ericssonSg09PickStatus === "Medium" && ericssonStatus === "Less Likely"){ ericssonNine = 14;}
						if (ericssonSg09PickStatus === "Medium" && ericssonStatus === "Underdog"){ ericssonNine = 18;}
						if (ericssonSg09PickStatus === "Low"    && ericssonStatus === "Favorite"){ ericssonNine = 8;}
						if (ericssonSg09PickStatus === "Low"    && ericssonStatus === "Very Likely"){ ericssonNine = 12;}
						if (ericssonSg09PickStatus === "Low"    && ericssonStatus === "Less Likely"){ ericssonNine = 16;}
						if (ericssonSg09PickStatus === "Low"    && ericssonStatus === "Underdog"){ ericssonNine = 20;}

						var ericssonTen;
						if (ericssonSg10PickStatus === "Zero") { ericssonTen = 0;}
						if (ericssonSg10PickStatus === "High"   && ericssonStatus === "Favorite"){ ericssonTen = 4;}
						if (ericssonSg10PickStatus === "High"   && ericssonStatus === "Very Likely"){ ericssonTen = 8;}
						if (ericssonSg10PickStatus === "High"   && ericssonStatus === "Less Likely"){ ericssonTen = 12;}
						if (ericssonSg10PickStatus === "High"   && ericssonStatus === "Underdog"){ ericssonTen = 16;}
						if (ericssonSg10PickStatus === "Medium" && ericssonStatus === "Favorite"){ ericssonTen = 6;}
						if (ericssonSg10PickStatus === "Medium" && ericssonStatus === "Very Likely"){ ericssonTen = 10;}
						if (ericssonSg10PickStatus === "Medium" && ericssonStatus === "Less Likely"){ ericssonTen = 14;}
						if (ericssonSg10PickStatus === "Medium" && ericssonStatus === "Underdog"){ ericssonTen = 18;}
						if (ericssonSg10PickStatus === "Low"    && ericssonStatus === "Favorite"){ ericssonTen = 8;}
						if (ericssonSg10PickStatus === "Low"    && ericssonStatus === "Very Likely"){ ericssonTen = 12;}
						if (ericssonSg10PickStatus === "Low"    && ericssonStatus === "Less Likely"){ ericssonTen = 16;}
						if (ericssonSg10PickStatus === "Low"    && ericssonStatus === "Underdog"){ ericssonTen = 20;}

						//Nasr
						var nasrOne;
						if (nasrSg01PickStatus === "Zero") { nasrOne = 0;}
						if (nasrSg01PickStatus === "High"   && nasrStatus === "Favorite"){ nasrOne = 4;}
						if (nasrSg01PickStatus === "High"   && nasrStatus === "Very Likely"){ nasrOne = 8;}
						if (nasrSg01PickStatus === "High"   && nasrStatus === "Less Likely"){ nasrOne = 12;}
						if (nasrSg01PickStatus === "High"   && nasrStatus === "Underdog"){ nasrOne = 16;}
						if (nasrSg01PickStatus === "Medium" && nasrStatus === "Favorite"){ nasrOne = 6;}
						if (nasrSg01PickStatus === "Medium" && nasrStatus === "Very Likely"){ nasrOne = 10;}
						if (nasrSg01PickStatus === "Medium" && nasrStatus === "Less Likely"){ nasrOne = 14;}
						if (nasrSg01PickStatus === "Medium" && nasrStatus === "Underdog"){ nasrOne = 18;}
						if (nasrSg01PickStatus === "Low"    && nasrStatus === "Favorite"){ nasrOne = 8;}
						if (nasrSg01PickStatus === "Low"    && nasrStatus === "Very Likely"){ nasrOne = 12;}
						if (nasrSg01PickStatus === "Low"    && nasrStatus === "Less Likely"){ nasrOne = 16;}
						if (nasrSg01PickStatus === "Low"    && nasrStatus === "Underdog"){ nasrOne = 20;}

						var nasrTwo;
						if (nasrSg02PickStatus === "Zero") { nasrTwo = 0;}
						if (nasrSg02PickStatus === "High"   && nasrStatus === "Favorite"){ nasrTwo = 4;}
						if (nasrSg02PickStatus === "High"   && nasrStatus === "Very Likely"){ nasrTwo = 8;}
						if (nasrSg02PickStatus === "High"   && nasrStatus === "Less Likely"){ nasrTwo = 12;}
						if (nasrSg02PickStatus === "High"   && nasrStatus === "Underdog"){ nasrTwo = 16;}
						if (nasrSg02PickStatus === "Medium" && nasrStatus === "Favorite"){ nasrTwo = 6;}
						if (nasrSg02PickStatus === "Medium" && nasrStatus === "Very Likely"){ nasrTwo = 10;}
						if (nasrSg02PickStatus === "Medium" && nasrStatus === "Less Likely"){ nasrTwo = 14;}
						if (nasrSg02PickStatus === "Medium" && nasrStatus === "Underdog"){ nasrTwo = 18;}
						if (nasrSg02PickStatus === "Low"    && nasrStatus === "Favorite"){ nasrTwo = 8;}
						if (nasrSg02PickStatus === "Low"    && nasrStatus === "Very Likely"){ nasrTwo = 12;}
						if (nasrSg02PickStatus === "Low"    && nasrStatus === "Less Likely"){ nasrTwo = 16;}
						if (nasrSg02PickStatus === "Low"    && nasrStatus === "Underdog"){ nasrTwo = 20;}

						var nasrThree;
						if (nasrSg03PickStatus === "Zero") { nasrThree = 0;}
						if (nasrSg03PickStatus === "High"   && nasrStatus === "Favorite"){ nasrThree = 4;}
						if (nasrSg03PickStatus === "High"   && nasrStatus === "Very Likely"){ nasrThree = 8;}
						if (nasrSg03PickStatus === "High"   && nasrStatus === "Less Likely"){ nasrThree = 12;}
						if (nasrSg03PickStatus === "High"   && nasrStatus === "Underdog"){ nasrThree = 16;}
						if (nasrSg03PickStatus === "Medium" && nasrStatus === "Favorite"){ nasrThree = 6;}
						if (nasrSg03PickStatus === "Medium" && nasrStatus === "Very Likely"){ nasrThree = 10;}
						if (nasrSg03PickStatus === "Medium" && nasrStatus === "Less Likely"){ nasrThree = 14;}
						if (nasrSg03PickStatus === "Medium" && nasrStatus === "Underdog"){ nasrThree = 18;}
						if (nasrSg03PickStatus === "Low"    && nasrStatus === "Favorite"){ nasrThree = 8;}
						if (nasrSg03PickStatus === "Low"    && nasrStatus === "Very Likely"){ nasrThree = 12;}
						if (nasrSg03PickStatus === "Low"    && nasrStatus === "Less Likely"){ nasrThree = 16;}
						if (nasrSg03PickStatus === "Low"    && nasrStatus === "Underdog"){ nasrThree = 20;}

						var nasrFour;
						if (nasrSg04PickStatus === "Zero") { nasrFour = 0;}
						if (nasrSg04PickStatus === "High"   && nasrStatus === "Favorite"){ nasrFour = 4;}
						if (nasrSg04PickStatus === "High"   && nasrStatus === "Very Likely"){ nasrFour = 8;}
						if (nasrSg04PickStatus === "High"   && nasrStatus === "Less Likely"){ nasrFour = 12;}
						if (nasrSg04PickStatus === "High"   && nasrStatus === "Underdog"){ nasrFour = 16;}
						if (nasrSg04PickStatus === "Medium" && nasrStatus === "Favorite"){ nasrFour = 6;}
						if (nasrSg04PickStatus === "Medium" && nasrStatus === "Very Likely"){ nasrFour = 10;}
						if (nasrSg04PickStatus === "Medium" && nasrStatus === "Less Likely"){ nasrFour = 14;}
						if (nasrSg04PickStatus === "Medium" && nasrStatus === "Underdog"){ nasrFour = 18;}
						if (nasrSg04PickStatus === "Low"    && nasrStatus === "Favorite"){ nasrFour = 8;}
						if (nasrSg04PickStatus === "Low"    && nasrStatus === "Very Likely"){ nasrFour = 12;}
						if (nasrSg04PickStatus === "Low"    && nasrStatus === "Less Likely"){ nasrFour = 16;}
						if (nasrSg04PickStatus === "Low"    && nasrStatus === "Underdog"){ nasrFour = 20;}

						var nasrFive;
						if (nasrSg05PickStatus === "Zero") { nasrFive = 0;}
						if (nasrSg05PickStatus === "High"   && nasrStatus === "Favorite"){ nasrFive = 4;}
						if (nasrSg05PickStatus === "High"   && nasrStatus === "Very Likely"){ nasrFive = 8;}
						if (nasrSg05PickStatus === "High"   && nasrStatus === "Less Likely"){ nasrFive = 12;}
						if (nasrSg05PickStatus === "High"   && nasrStatus === "Underdog"){ nasrFive = 16;}
						if (nasrSg05PickStatus === "Medium" && nasrStatus === "Favorite"){ nasrFive = 6;}
						if (nasrSg05PickStatus === "Medium" && nasrStatus === "Very Likely"){ nasrFive = 10;}
						if (nasrSg05PickStatus === "Medium" && nasrStatus === "Less Likely"){ nasrFive = 14;}
						if (nasrSg05PickStatus === "Medium" && nasrStatus === "Underdog"){ nasrFive = 18;}
						if (nasrSg05PickStatus === "Low"    && nasrStatus === "Favorite"){ nasrFive = 8;}
						if (nasrSg05PickStatus === "Low"    && nasrStatus === "Very Likely"){ nasrFive = 12;}
						if (nasrSg05PickStatus === "Low"    && nasrStatus === "Less Likely"){ nasrFive = 16;}
						if (nasrSg05PickStatus === "Low"    && nasrStatus === "Underdog"){ nasrFive = 20;}

						var nasrSix;
						if (nasrSg06PickStatus === "Zero") { nasrSix = 0;}
						if (nasrSg06PickStatus === "High"   && nasrStatus === "Favorite"){ nasrSix = 4;}
						if (nasrSg06PickStatus === "High"   && nasrStatus === "Very Likely"){ nasrSix = 8;}
						if (nasrSg06PickStatus === "High"   && nasrStatus === "Less Likely"){ nasrSix = 12;}
						if (nasrSg06PickStatus === "High"   && nasrStatus === "Underdog"){ nasrSix = 16;}
						if (nasrSg06PickStatus === "Medium" && nasrStatus === "Favorite"){ nasrSix = 6;}
						if (nasrSg06PickStatus === "Medium" && nasrStatus === "Very Likely"){ nasrSix = 10;}
						if (nasrSg06PickStatus === "Medium" && nasrStatus === "Less Likely"){ nasrSix = 14;}
						if (nasrSg06PickStatus === "Medium" && nasrStatus === "Underdog"){ nasrSix = 18;}
						if (nasrSg06PickStatus === "Low"    && nasrStatus === "Favorite"){ nasrSix = 8;}
						if (nasrSg06PickStatus === "Low"    && nasrStatus === "Very Likely"){ nasrSix = 12;}
						if (nasrSg06PickStatus === "Low"    && nasrStatus === "Less Likely"){ nasrSix = 16;}
						if (nasrSg06PickStatus === "Low"    && nasrStatus === "Underdog"){ nasrSix = 20;}

						var nasrSeven;
						if (nasrSg07PickStatus === "Zero") { nasrSeven = 0;}
						if (nasrSg07PickStatus === "High"   && nasrStatus === "Favorite"){ nasrSeven = 4;}
						if (nasrSg07PickStatus === "High"   && nasrStatus === "Very Likely"){ nasrSeven = 8;}
						if (nasrSg07PickStatus === "High"   && nasrStatus === "Less Likely"){ nasrSeven = 12;}
						if (nasrSg07PickStatus === "High"   && nasrStatus === "Underdog"){ nasrSeven = 16;}
						if (nasrSg07PickStatus === "Medium" && nasrStatus === "Favorite"){ nasrSeven = 6;}
						if (nasrSg07PickStatus === "Medium" && nasrStatus === "Very Likely"){ nasrSeven = 10;}
						if (nasrSg07PickStatus === "Medium" && nasrStatus === "Less Likely"){ nasrSeven = 14;}
						if (nasrSg07PickStatus === "Medium" && nasrStatus === "Underdog"){ nasrSeven = 18;}
						if (nasrSg07PickStatus === "Low"    && nasrStatus === "Favorite"){ nasrSeven = 8;}
						if (nasrSg07PickStatus === "Low"    && nasrStatus === "Very Likely"){ nasrSeven = 12;}
						if (nasrSg07PickStatus === "Low"    && nasrStatus === "Less Likely"){ nasrSeven = 16;}
						if (nasrSg07PickStatus === "Low"    && nasrStatus === "Underdog"){ nasrSeven = 20;}

						var nasrEight;
						if (nasrSg08PickStatus === "Zero") { nasrEight = 0;}
						if (nasrSg08PickStatus === "High"   && nasrStatus === "Favorite"){ nasrEight = 4;}
						if (nasrSg08PickStatus === "High"   && nasrStatus === "Very Likely"){ nasrEight = 8;}
						if (nasrSg08PickStatus === "High"   && nasrStatus === "Less Likely"){ nasrEight = 12;}
						if (nasrSg08PickStatus === "High"   && nasrStatus === "Underdog"){ nasrEight = 16;}
						if (nasrSg08PickStatus === "Medium" && nasrStatus === "Favorite"){ nasrEight = 6;}
						if (nasrSg08PickStatus === "Medium" && nasrStatus === "Very Likely"){ nasrEight = 10;}
						if (nasrSg08PickStatus === "Medium" && nasrStatus === "Less Likely"){ nasrEight = 14;}
						if (nasrSg08PickStatus === "Medium" && nasrStatus === "Underdog"){ nasrEight = 18;}
						if (nasrSg08PickStatus === "Low"    && nasrStatus === "Favorite"){ nasrEight = 8;}
						if (nasrSg08PickStatus === "Low"    && nasrStatus === "Very Likely"){ nasrEight = 12;}
						if (nasrSg08PickStatus === "Low"    && nasrStatus === "Less Likely"){ nasrEight = 16;}
						if (nasrSg08PickStatus === "Low"    && nasrStatus === "Underdog"){ nasrEight = 20;}

						var nasrNine;
						if (nasrSg09PickStatus === "Zero") { nasrNine = 0;}
						if (nasrSg09PickStatus === "High"   && nasrStatus === "Favorite"){ nasrNine = 4;}
						if (nasrSg09PickStatus === "High"   && nasrStatus === "Very Likely"){ nasrNine = 8;}
						if (nasrSg09PickStatus === "High"   && nasrStatus === "Less Likely"){ nasrNine = 12;}
						if (nasrSg09PickStatus === "High"   && nasrStatus === "Underdog"){ nasrNine = 16;}
						if (nasrSg09PickStatus === "Medium" && nasrStatus === "Favorite"){ nasrNine = 6;}
						if (nasrSg09PickStatus === "Medium" && nasrStatus === "Very Likely"){ nasrNine = 10;}
						if (nasrSg09PickStatus === "Medium" && nasrStatus === "Less Likely"){ nasrNine = 14;}
						if (nasrSg09PickStatus === "Medium" && nasrStatus === "Underdog"){ nasrNine = 18;}
						if (nasrSg09PickStatus === "Low"    && nasrStatus === "Favorite"){ nasrNine = 8;}
						if (nasrSg09PickStatus === "Low"    && nasrStatus === "Very Likely"){ nasrNine = 12;}
						if (nasrSg09PickStatus === "Low"    && nasrStatus === "Less Likely"){ nasrNine = 16;}
						if (nasrSg09PickStatus === "Low"    && nasrStatus === "Underdog"){ nasrNine = 20;}

						var nasrTen;
						if (nasrSg10PickStatus === "Zero") { nasrTen = 0;}
						if (nasrSg10PickStatus === "High"   && nasrStatus === "Favorite"){ nasrTen = 4;}
						if (nasrSg10PickStatus === "High"   && nasrStatus === "Very Likely"){ nasrTen = 8;}
						if (nasrSg10PickStatus === "High"   && nasrStatus === "Less Likely"){ nasrTen = 12;}
						if (nasrSg10PickStatus === "High"   && nasrStatus === "Underdog"){ nasrTen = 16;}
						if (nasrSg10PickStatus === "Medium" && nasrStatus === "Favorite"){ nasrTen = 6;}
						if (nasrSg10PickStatus === "Medium" && nasrStatus === "Very Likely"){ nasrTen = 10;}
						if (nasrSg10PickStatus === "Medium" && nasrStatus === "Less Likely"){ nasrTen = 14;}
						if (nasrSg10PickStatus === "Medium" && nasrStatus === "Underdog"){ nasrTen = 18;}
						if (nasrSg10PickStatus === "Low"    && nasrStatus === "Favorite"){ nasrTen = 8;}
						if (nasrSg10PickStatus === "Low"    && nasrStatus === "Very Likely"){ nasrTen = 12;}
						if (nasrSg10PickStatus === "Low"    && nasrStatus === "Less Likely"){ nasrTen = 16;}
						if (nasrSg10PickStatus === "Low"    && nasrStatus === "Underdog"){ nasrTen = 20;}

						//Alonso
						var alonsoOne;
						if (alonsoSg01PickStatus === "Zero") { alonsoOne = 0;}
						if (alonsoSg01PickStatus === "High"   && alonsoStatus === "Favorite"){ alonsoOne = 4;}
						if (alonsoSg01PickStatus === "High"   && alonsoStatus === "Very Likely"){ alonsoOne = 8;}
						if (alonsoSg01PickStatus === "High"   && alonsoStatus === "Less Likely"){ alonsoOne = 12;}
						if (alonsoSg01PickStatus === "High"   && alonsoStatus === "Underdog"){ alonsoOne = 16;}
						if (alonsoSg01PickStatus === "Medium" && alonsoStatus === "Favorite"){ alonsoOne = 6;}
						if (alonsoSg01PickStatus === "Medium" && alonsoStatus === "Very Likely"){ alonsoOne = 10;}
						if (alonsoSg01PickStatus === "Medium" && alonsoStatus === "Less Likely"){ alonsoOne = 14;}
						if (alonsoSg01PickStatus === "Medium" && alonsoStatus === "Underdog"){ alonsoOne = 18;}
						if (alonsoSg01PickStatus === "Low"    && alonsoStatus === "Favorite"){ alonsoOne = 8;}
						if (alonsoSg01PickStatus === "Low"    && alonsoStatus === "Very Likely"){ alonsoOne = 12;}
						if (alonsoSg01PickStatus === "Low"    && alonsoStatus === "Less Likely"){ alonsoOne = 16;}
						if (alonsoSg01PickStatus === "Low"    && alonsoStatus === "Underdog"){ alonsoOne = 20;}

						var alonsoTwo;
						if (alonsoSg02PickStatus === "Zero") { alonsoTwo = 0;}
						if (alonsoSg02PickStatus === "High"   && alonsoStatus === "Favorite"){ alonsoTwo = 4;}
						if (alonsoSg02PickStatus === "High"   && alonsoStatus === "Very Likely"){ alonsoTwo = 8;}
						if (alonsoSg02PickStatus === "High"   && alonsoStatus === "Less Likely"){ alonsoTwo = 12;}
						if (alonsoSg02PickStatus === "High"   && alonsoStatus === "Underdog"){ alonsoTwo = 16;}
						if (alonsoSg02PickStatus === "Medium" && alonsoStatus === "Favorite"){ alonsoTwo = 6;}
						if (alonsoSg02PickStatus === "Medium" && alonsoStatus === "Very Likely"){ alonsoTwo = 10;}
						if (alonsoSg02PickStatus === "Medium" && alonsoStatus === "Less Likely"){ alonsoTwo = 14;}
						if (alonsoSg02PickStatus === "Medium" && alonsoStatus === "Underdog"){ alonsoTwo = 18;}
						if (alonsoSg02PickStatus === "Low"    && alonsoStatus === "Favorite"){ alonsoTwo = 8;}
						if (alonsoSg02PickStatus === "Low"    && alonsoStatus === "Very Likely"){ alonsoTwo = 12;}
						if (alonsoSg02PickStatus === "Low"    && alonsoStatus === "Less Likely"){ alonsoTwo = 16;}
						if (alonsoSg02PickStatus === "Low"    && alonsoStatus === "Underdog"){ alonsoTwo = 20;}

						var alonsoThree;
						if (alonsoSg03PickStatus === "Zero") { alonsoThree = 0;}
						if (alonsoSg03PickStatus === "High"   && alonsoStatus === "Favorite"){ alonsoThree = 4;}
						if (alonsoSg03PickStatus === "High"   && alonsoStatus === "Very Likely"){ alonsoThree = 8;}
						if (alonsoSg03PickStatus === "High"   && alonsoStatus === "Less Likely"){ alonsoThree = 12;}
						if (alonsoSg03PickStatus === "High"   && alonsoStatus === "Underdog"){ alonsoThree = 16;}
						if (alonsoSg03PickStatus === "Medium" && alonsoStatus === "Favorite"){ alonsoThree = 6;}
						if (alonsoSg03PickStatus === "Medium" && alonsoStatus === "Very Likely"){ alonsoThree = 10;}
						if (alonsoSg03PickStatus === "Medium" && alonsoStatus === "Less Likely"){ alonsoThree = 14;}
						if (alonsoSg03PickStatus === "Medium" && alonsoStatus === "Underdog"){ alonsoThree = 18;}
						if (alonsoSg03PickStatus === "Low"    && alonsoStatus === "Favorite"){ alonsoThree = 8;}
						if (alonsoSg03PickStatus === "Low"    && alonsoStatus === "Very Likely"){ alonsoThree = 12;}
						if (alonsoSg03PickStatus === "Low"    && alonsoStatus === "Less Likely"){ alonsoThree = 16;}
						if (alonsoSg03PickStatus === "Low"    && alonsoStatus === "Underdog"){ alonsoThree = 20;}

						var alonsoFour;
						if (alonsoSg04PickStatus === "Zero") { alonsoFour = 0;}
						if (alonsoSg04PickStatus === "High"   && alonsoStatus === "Favorite"){ alonsoFour = 4;}
						if (alonsoSg04PickStatus === "High"   && alonsoStatus === "Very Likely"){ alonsoFour = 8;}
						if (alonsoSg04PickStatus === "High"   && alonsoStatus === "Less Likely"){ alonsoFour = 12;}
						if (alonsoSg04PickStatus === "High"   && alonsoStatus === "Underdog"){ alonsoFour = 16;}
						if (alonsoSg04PickStatus === "Medium" && alonsoStatus === "Favorite"){ alonsoFour = 6;}
						if (alonsoSg04PickStatus === "Medium" && alonsoStatus === "Very Likely"){ alonsoFour = 10;}
						if (alonsoSg04PickStatus === "Medium" && alonsoStatus === "Less Likely"){ alonsoFour = 14;}
						if (alonsoSg04PickStatus === "Medium" && alonsoStatus === "Underdog"){ alonsoFour = 18;}
						if (alonsoSg04PickStatus === "Low"    && alonsoStatus === "Favorite"){ alonsoFour = 8;}
						if (alonsoSg04PickStatus === "Low"    && alonsoStatus === "Very Likely"){ alonsoFour = 12;}
						if (alonsoSg04PickStatus === "Low"    && alonsoStatus === "Less Likely"){ alonsoFour = 16;}
						if (alonsoSg04PickStatus === "Low"    && alonsoStatus === "Underdog"){ alonsoFour = 20;}

						var alonsoFive;
						if (alonsoSg05PickStatus === "Zero") { alonsoFive = 0;}
						if (alonsoSg05PickStatus === "High"   && alonsoStatus === "Favorite"){ alonsoFive = 4;}
						if (alonsoSg05PickStatus === "High"   && alonsoStatus === "Very Likely"){ alonsoFive = 8;}
						if (alonsoSg05PickStatus === "High"   && alonsoStatus === "Less Likely"){ alonsoFive = 12;}
						if (alonsoSg05PickStatus === "High"   && alonsoStatus === "Underdog"){ alonsoFive = 16;}
						if (alonsoSg05PickStatus === "Medium" && alonsoStatus === "Favorite"){ alonsoFive = 6;}
						if (alonsoSg05PickStatus === "Medium" && alonsoStatus === "Very Likely"){ alonsoFive = 10;}
						if (alonsoSg05PickStatus === "Medium" && alonsoStatus === "Less Likely"){ alonsoFive = 14;}
						if (alonsoSg05PickStatus === "Medium" && alonsoStatus === "Underdog"){ alonsoFive = 18;}
						if (alonsoSg05PickStatus === "Low"    && alonsoStatus === "Favorite"){ alonsoFive = 8;}
						if (alonsoSg05PickStatus === "Low"    && alonsoStatus === "Very Likely"){ alonsoFive = 12;}
						if (alonsoSg05PickStatus === "Low"    && alonsoStatus === "Less Likely"){ alonsoFive = 16;}
						if (alonsoSg05PickStatus === "Low"    && alonsoStatus === "Underdog"){ alonsoFive = 20;}

						var alonsoSix;
						if (alonsoSg06PickStatus === "Zero") { alonsoSix = 0;}
						if (alonsoSg06PickStatus === "High"   && alonsoStatus === "Favorite"){ alonsoSix = 4;}
						if (alonsoSg06PickStatus === "High"   && alonsoStatus === "Very Likely"){ alonsoSix = 8;}
						if (alonsoSg06PickStatus === "High"   && alonsoStatus === "Less Likely"){ alonsoSix = 12;}
						if (alonsoSg06PickStatus === "High"   && alonsoStatus === "Underdog"){ alonsoSix = 16;}
						if (alonsoSg06PickStatus === "Medium" && alonsoStatus === "Favorite"){ alonsoSix = 6;}
						if (alonsoSg06PickStatus === "Medium" && alonsoStatus === "Very Likely"){ alonsoSix = 10;}
						if (alonsoSg06PickStatus === "Medium" && alonsoStatus === "Less Likely"){ alonsoSix = 14;}
						if (alonsoSg06PickStatus === "Medium" && alonsoStatus === "Underdog"){ alonsoSix = 18;}
						if (alonsoSg06PickStatus === "Low"    && alonsoStatus === "Favorite"){ alonsoSix = 8;}
						if (alonsoSg06PickStatus === "Low"    && alonsoStatus === "Very Likely"){ alonsoSix = 12;}
						if (alonsoSg06PickStatus === "Low"    && alonsoStatus === "Less Likely"){ alonsoSix = 16;}
						if (alonsoSg06PickStatus === "Low"    && alonsoStatus === "Underdog"){ alonsoSix = 20;}

						var alonsoSeven;
						if (alonsoSg07PickStatus === "Zero") { alonsoSeven = 0;}
						if (alonsoSg07PickStatus === "High"   && alonsoStatus === "Favorite"){ alonsoSeven = 4;}
						if (alonsoSg07PickStatus === "High"   && alonsoStatus === "Very Likely"){ alonsoSeven = 8;}
						if (alonsoSg07PickStatus === "High"   && alonsoStatus === "Less Likely"){ alonsoSeven = 12;}
						if (alonsoSg07PickStatus === "High"   && alonsoStatus === "Underdog"){ alonsoSeven = 16;}
						if (alonsoSg07PickStatus === "Medium" && alonsoStatus === "Favorite"){ alonsoSeven = 6;}
						if (alonsoSg07PickStatus === "Medium" && alonsoStatus === "Very Likely"){ alonsoSeven = 10;}
						if (alonsoSg07PickStatus === "Medium" && alonsoStatus === "Less Likely"){ alonsoSeven = 14;}
						if (alonsoSg07PickStatus === "Medium" && alonsoStatus === "Underdog"){ alonsoSeven = 18;}
						if (alonsoSg07PickStatus === "Low"    && alonsoStatus === "Favorite"){ alonsoSeven = 8;}
						if (alonsoSg07PickStatus === "Low"    && alonsoStatus === "Very Likely"){ alonsoSeven = 12;}
						if (alonsoSg07PickStatus === "Low"    && alonsoStatus === "Less Likely"){ alonsoSeven = 16;}
						if (alonsoSg07PickStatus === "Low"    && alonsoStatus === "Underdog"){ alonsoSeven = 20;}

						var alonsoEight;
						if (alonsoSg08PickStatus === "Zero") { alonsoEight = 0;}
						if (alonsoSg08PickStatus === "High"   && alonsoStatus === "Favorite"){ alonsoEight = 4;}
						if (alonsoSg08PickStatus === "High"   && alonsoStatus === "Very Likely"){ alonsoEight = 8;}
						if (alonsoSg08PickStatus === "High"   && alonsoStatus === "Less Likely"){ alonsoEight = 12;}
						if (alonsoSg08PickStatus === "High"   && alonsoStatus === "Underdog"){ alonsoEight = 16;}
						if (alonsoSg08PickStatus === "Medium" && alonsoStatus === "Favorite"){ alonsoEight = 6;}
						if (alonsoSg08PickStatus === "Medium" && alonsoStatus === "Very Likely"){ alonsoEight = 10;}
						if (alonsoSg08PickStatus === "Medium" && alonsoStatus === "Less Likely"){ alonsoEight = 14;}
						if (alonsoSg08PickStatus === "Medium" && alonsoStatus === "Underdog"){ alonsoEight = 18;}
						if (alonsoSg08PickStatus === "Low"    && alonsoStatus === "Favorite"){ alonsoEight = 8;}
						if (alonsoSg08PickStatus === "Low"    && alonsoStatus === "Very Likely"){ alonsoEight = 12;}
						if (alonsoSg08PickStatus === "Low"    && alonsoStatus === "Less Likely"){ alonsoEight = 16;}
						if (alonsoSg08PickStatus === "Low"    && alonsoStatus === "Underdog"){ alonsoEight = 20;}

						var alonsoNine;
						if (alonsoSg09PickStatus === "Zero") { alonsoNine = 0;}
						if (alonsoSg09PickStatus === "High"   && alonsoStatus === "Favorite"){ alonsoNine = 4;}
						if (alonsoSg09PickStatus === "High"   && alonsoStatus === "Very Likely"){ alonsoNine = 8;}
						if (alonsoSg09PickStatus === "High"   && alonsoStatus === "Less Likely"){ alonsoNine = 12;}
						if (alonsoSg09PickStatus === "High"   && alonsoStatus === "Underdog"){ alonsoNine = 16;}
						if (alonsoSg09PickStatus === "Medium" && alonsoStatus === "Favorite"){ alonsoNine = 6;}
						if (alonsoSg09PickStatus === "Medium" && alonsoStatus === "Very Likely"){ alonsoNine = 10;}
						if (alonsoSg09PickStatus === "Medium" && alonsoStatus === "Less Likely"){ alonsoNine = 14;}
						if (alonsoSg09PickStatus === "Medium" && alonsoStatus === "Underdog"){ alonsoNine = 18;}
						if (alonsoSg09PickStatus === "Low"    && alonsoStatus === "Favorite"){ alonsoNine = 8;}
						if (alonsoSg09PickStatus === "Low"    && alonsoStatus === "Very Likely"){ alonsoNine = 12;}
						if (alonsoSg09PickStatus === "Low"    && alonsoStatus === "Less Likely"){ alonsoNine = 16;}
						if (alonsoSg09PickStatus === "Low"    && alonsoStatus === "Underdog"){ alonsoNine = 20;}

						var alonsoTen;
						if (alonsoSg10PickStatus === "Zero") { alonsoTen = 0;}
						if (alonsoSg10PickStatus === "High"   && alonsoStatus === "Favorite"){ alonsoTen = 4;}
						if (alonsoSg10PickStatus === "High"   && alonsoStatus === "Very Likely"){ alonsoTen = 8;}
						if (alonsoSg10PickStatus === "High"   && alonsoStatus === "Less Likely"){ alonsoTen = 12;}
						if (alonsoSg10PickStatus === "High"   && alonsoStatus === "Underdog"){ alonsoTen = 16;}
						if (alonsoSg10PickStatus === "Medium" && alonsoStatus === "Favorite"){ alonsoTen = 6;}
						if (alonsoSg10PickStatus === "Medium" && alonsoStatus === "Very Likely"){ alonsoTen = 10;}
						if (alonsoSg10PickStatus === "Medium" && alonsoStatus === "Less Likely"){ alonsoTen = 14;}
						if (alonsoSg10PickStatus === "Medium" && alonsoStatus === "Underdog"){ alonsoTen = 18;}
						if (alonsoSg10PickStatus === "Low"    && alonsoStatus === "Favorite"){ alonsoTen = 8;}
						if (alonsoSg10PickStatus === "Low"    && alonsoStatus === "Very Likely"){ alonsoTen = 12;}
						if (alonsoSg10PickStatus === "Low"    && alonsoStatus === "Less Likely"){ alonsoTen = 16;}
						if (alonsoSg10PickStatus === "Low"    && alonsoStatus === "Underdog"){ alonsoTen = 20;}

						//Button
						var buttonOne;
						if (buttonSg01PickStatus === "Zero") { buttonOne = 0;}
						if (buttonSg01PickStatus === "High"   && buttonStatus === "Favorite"){ buttonOne = 4;}
						if (buttonSg01PickStatus === "High"   && buttonStatus === "Very Likely"){ buttonOne = 8;}
						if (buttonSg01PickStatus === "High"   && buttonStatus === "Less Likely"){ buttonOne = 12;}
						if (buttonSg01PickStatus === "High"   && buttonStatus === "Underdog"){ buttonOne = 16;}
						if (buttonSg01PickStatus === "Medium" && buttonStatus === "Favorite"){ buttonOne = 6;}
						if (buttonSg01PickStatus === "Medium" && buttonStatus === "Very Likely"){ buttonOne = 10;}
						if (buttonSg01PickStatus === "Medium" && buttonStatus === "Less Likely"){ buttonOne = 14;}
						if (buttonSg01PickStatus === "Medium" && buttonStatus === "Underdog"){ buttonOne = 18;}
						if (buttonSg01PickStatus === "Low"    && buttonStatus === "Favorite"){ buttonOne = 8;}
						if (buttonSg01PickStatus === "Low"    && buttonStatus === "Very Likely"){ buttonOne = 12;}
						if (buttonSg01PickStatus === "Low"    && buttonStatus === "Less Likely"){ buttonOne = 16;}
						if (buttonSg01PickStatus === "Low"    && buttonStatus === "Underdog"){ buttonOne = 20;}

						var buttonTwo;
						if (buttonSg02PickStatus === "Zero") { buttonTwo = 0;}
						if (buttonSg02PickStatus === "High"   && buttonStatus === "Favorite"){ buttonTwo = 4;}
						if (buttonSg02PickStatus === "High"   && buttonStatus === "Very Likely"){ buttonTwo = 8;}
						if (buttonSg02PickStatus === "High"   && buttonStatus === "Less Likely"){ buttonTwo = 12;}
						if (buttonSg02PickStatus === "High"   && buttonStatus === "Underdog"){ buttonTwo = 16;}
						if (buttonSg02PickStatus === "Medium" && buttonStatus === "Favorite"){ buttonTwo = 6;}
						if (buttonSg02PickStatus === "Medium" && buttonStatus === "Very Likely"){ buttonTwo = 10;}
						if (buttonSg02PickStatus === "Medium" && buttonStatus === "Less Likely"){ buttonTwo = 14;}
						if (buttonSg02PickStatus === "Medium" && buttonStatus === "Underdog"){ buttonTwo = 18;}
						if (buttonSg02PickStatus === "Low"    && buttonStatus === "Favorite"){ buttonTwo = 8;}
						if (buttonSg02PickStatus === "Low"    && buttonStatus === "Very Likely"){ buttonTwo = 12;}
						if (buttonSg02PickStatus === "Low"    && buttonStatus === "Less Likely"){ buttonTwo = 16;}
						if (buttonSg02PickStatus === "Low"    && buttonStatus === "Underdog"){ buttonTwo = 20;}

						var buttonThree;
						if (buttonSg03PickStatus === "Zero") { buttonThree = 0;}
						if (buttonSg03PickStatus === "High"   && buttonStatus === "Favorite"){ buttonThree = 4;}
						if (buttonSg03PickStatus === "High"   && buttonStatus === "Very Likely"){ buttonThree = 8;}
						if (buttonSg03PickStatus === "High"   && buttonStatus === "Less Likely"){ buttonThree = 12;}
						if (buttonSg03PickStatus === "High"   && buttonStatus === "Underdog"){ buttonThree = 16;}
						if (buttonSg03PickStatus === "Medium" && buttonStatus === "Favorite"){ buttonThree = 6;}
						if (buttonSg03PickStatus === "Medium" && buttonStatus === "Very Likely"){ buttonThree = 10;}
						if (buttonSg03PickStatus === "Medium" && buttonStatus === "Less Likely"){ buttonThree = 14;}
						if (buttonSg03PickStatus === "Medium" && buttonStatus === "Underdog"){ buttonThree = 18;}
						if (buttonSg03PickStatus === "Low"    && buttonStatus === "Favorite"){ buttonThree = 8;}
						if (buttonSg03PickStatus === "Low"    && buttonStatus === "Very Likely"){ buttonThree = 12;}
						if (buttonSg03PickStatus === "Low"    && buttonStatus === "Less Likely"){ buttonThree = 16;}
						if (buttonSg03PickStatus === "Low"    && buttonStatus === "Underdog"){ buttonThree = 20;}

						var buttonFour;
						if (buttonSg04PickStatus === "Zero") { buttonFour = 0;}
						if (buttonSg04PickStatus === "High"   && buttonStatus === "Favorite"){ buttonFour = 4;}
						if (buttonSg04PickStatus === "High"   && buttonStatus === "Very Likely"){ buttonFour = 8;}
						if (buttonSg04PickStatus === "High"   && buttonStatus === "Less Likely"){ buttonFour = 12;}
						if (buttonSg04PickStatus === "High"   && buttonStatus === "Underdog"){ buttonFour = 16;}
						if (buttonSg04PickStatus === "Medium" && buttonStatus === "Favorite"){ buttonFour = 6;}
						if (buttonSg04PickStatus === "Medium" && buttonStatus === "Very Likely"){ buttonFour = 10;}
						if (buttonSg04PickStatus === "Medium" && buttonStatus === "Less Likely"){ buttonFour = 14;}
						if (buttonSg04PickStatus === "Medium" && buttonStatus === "Underdog"){ buttonFour = 18;}
						if (buttonSg04PickStatus === "Low"    && buttonStatus === "Favorite"){ buttonFour = 8;}
						if (buttonSg04PickStatus === "Low"    && buttonStatus === "Very Likely"){ buttonFour = 12;}
						if (buttonSg04PickStatus === "Low"    && buttonStatus === "Less Likely"){ buttonFour = 16;}
						if (buttonSg04PickStatus === "Low"    && buttonStatus === "Underdog"){ buttonFour = 20;}

						var buttonFive;
						if (buttonSg05PickStatus === "Zero") { buttonFive = 0;}
						if (buttonSg05PickStatus === "High"   && buttonStatus === "Favorite"){ buttonFive = 4;}
						if (buttonSg05PickStatus === "High"   && buttonStatus === "Very Likely"){ buttonFive = 8;}
						if (buttonSg05PickStatus === "High"   && buttonStatus === "Less Likely"){ buttonFive = 12;}
						if (buttonSg05PickStatus === "High"   && buttonStatus === "Underdog"){ buttonFive = 16;}
						if (buttonSg05PickStatus === "Medium" && buttonStatus === "Favorite"){ buttonFive = 6;}
						if (buttonSg05PickStatus === "Medium" && buttonStatus === "Very Likely"){ buttonFive = 10;}
						if (buttonSg05PickStatus === "Medium" && buttonStatus === "Less Likely"){ buttonFive = 14;}
						if (buttonSg05PickStatus === "Medium" && buttonStatus === "Underdog"){ buttonFive = 18;}
						if (buttonSg05PickStatus === "Low"    && buttonStatus === "Favorite"){ buttonFive = 8;}
						if (buttonSg05PickStatus === "Low"    && buttonStatus === "Very Likely"){ buttonFive = 12;}
						if (buttonSg05PickStatus === "Low"    && buttonStatus === "Less Likely"){ buttonFive = 16;}
						if (buttonSg05PickStatus === "Low"    && buttonStatus === "Underdog"){ buttonFive = 20;}

						var buttonSix;
						if (buttonSg06PickStatus === "Zero") { buttonSix = 0;}
						if (buttonSg06PickStatus === "High"   && buttonStatus === "Favorite"){ buttonSix = 4;}
						if (buttonSg06PickStatus === "High"   && buttonStatus === "Very Likely"){ buttonSix = 8;}
						if (buttonSg06PickStatus === "High"   && buttonStatus === "Less Likely"){ buttonSix = 12;}
						if (buttonSg06PickStatus === "High"   && buttonStatus === "Underdog"){ buttonSix = 16;}
						if (buttonSg06PickStatus === "Medium" && buttonStatus === "Favorite"){ buttonSix = 6;}
						if (buttonSg06PickStatus === "Medium" && buttonStatus === "Very Likely"){ buttonSix = 10;}
						if (buttonSg06PickStatus === "Medium" && buttonStatus === "Less Likely"){ buttonSix = 14;}
						if (buttonSg06PickStatus === "Medium" && buttonStatus === "Underdog"){ buttonSix = 18;}
						if (buttonSg06PickStatus === "Low"    && buttonStatus === "Favorite"){ buttonSix = 8;}
						if (buttonSg06PickStatus === "Low"    && buttonStatus === "Very Likely"){ buttonSix = 12;}
						if (buttonSg06PickStatus === "Low"    && buttonStatus === "Less Likely"){ buttonSix = 16;}
						if (buttonSg06PickStatus === "Low"    && buttonStatus === "Underdog"){ buttonSix = 20;}

						var buttonSeven;
						if (buttonSg07PickStatus === "Zero") { buttonSeven = 0;}
						if (buttonSg07PickStatus === "High"   && buttonStatus === "Favorite"){ buttonSeven = 4;}
						if (buttonSg07PickStatus === "High"   && buttonStatus === "Very Likely"){ buttonSeven = 8;}
						if (buttonSg07PickStatus === "High"   && buttonStatus === "Less Likely"){ buttonSeven = 12;}
						if (buttonSg07PickStatus === "High"   && buttonStatus === "Underdog"){ buttonSeven = 16;}
						if (buttonSg07PickStatus === "Medium" && buttonStatus === "Favorite"){ buttonSeven = 6;}
						if (buttonSg07PickStatus === "Medium" && buttonStatus === "Very Likely"){ buttonSeven = 10;}
						if (buttonSg07PickStatus === "Medium" && buttonStatus === "Less Likely"){ buttonSeven = 14;}
						if (buttonSg07PickStatus === "Medium" && buttonStatus === "Underdog"){ buttonSeven = 18;}
						if (buttonSg07PickStatus === "Low"    && buttonStatus === "Favorite"){ buttonSeven = 8;}
						if (buttonSg07PickStatus === "Low"    && buttonStatus === "Very Likely"){ buttonSeven = 12;}
						if (buttonSg07PickStatus === "Low"    && buttonStatus === "Less Likely"){ buttonSeven = 16;}
						if (buttonSg07PickStatus === "Low"    && buttonStatus === "Underdog"){ buttonSeven = 20;}

						var buttonEight;
						if (buttonSg08PickStatus === "Zero") { buttonEight = 0;}
						if (buttonSg08PickStatus === "High"   && buttonStatus === "Favorite"){ buttonEight = 4;}
						if (buttonSg08PickStatus === "High"   && buttonStatus === "Very Likely"){ buttonEight = 8;}
						if (buttonSg08PickStatus === "High"   && buttonStatus === "Less Likely"){ buttonEight = 12;}
						if (buttonSg08PickStatus === "High"   && buttonStatus === "Underdog"){ buttonEight = 16;}
						if (buttonSg08PickStatus === "Medium" && buttonStatus === "Favorite"){ buttonEight = 6;}
						if (buttonSg08PickStatus === "Medium" && buttonStatus === "Very Likely"){ buttonEight = 10;}
						if (buttonSg08PickStatus === "Medium" && buttonStatus === "Less Likely"){ buttonEight = 14;}
						if (buttonSg08PickStatus === "Medium" && buttonStatus === "Underdog"){ buttonEight = 18;}
						if (buttonSg08PickStatus === "Low"    && buttonStatus === "Favorite"){ buttonEight = 8;}
						if (buttonSg08PickStatus === "Low"    && buttonStatus === "Very Likely"){ buttonEight = 12;}
						if (buttonSg08PickStatus === "Low"    && buttonStatus === "Less Likely"){ buttonEight = 16;}
						if (buttonSg08PickStatus === "Low"    && buttonStatus === "Underdog"){ buttonEight = 20;}

						var buttonNine;
						if (buttonSg09PickStatus === "Zero") { buttonNine = 0;}
						if (buttonSg09PickStatus === "High"   && buttonStatus === "Favorite"){ buttonNine = 4;}
						if (buttonSg09PickStatus === "High"   && buttonStatus === "Very Likely"){ buttonNine = 8;}
						if (buttonSg09PickStatus === "High"   && buttonStatus === "Less Likely"){ buttonNine = 12;}
						if (buttonSg09PickStatus === "High"   && buttonStatus === "Underdog"){ buttonNine = 16;}
						if (buttonSg09PickStatus === "Medium" && buttonStatus === "Favorite"){ buttonNine = 6;}
						if (buttonSg09PickStatus === "Medium" && buttonStatus === "Very Likely"){ buttonNine = 10;}
						if (buttonSg09PickStatus === "Medium" && buttonStatus === "Less Likely"){ buttonNine = 14;}
						if (buttonSg09PickStatus === "Medium" && buttonStatus === "Underdog"){ buttonNine = 18;}
						if (buttonSg09PickStatus === "Low"    && buttonStatus === "Favorite"){ buttonNine = 8;}
						if (buttonSg09PickStatus === "Low"    && buttonStatus === "Very Likely"){ buttonNine = 12;}
						if (buttonSg09PickStatus === "Low"    && buttonStatus === "Less Likely"){ buttonNine = 16;}
						if (buttonSg09PickStatus === "Low"    && buttonStatus === "Underdog"){ buttonNine = 20;}

						var buttonTen;
						if (buttonSg10PickStatus === "Zero") { buttonTen = 0;}
						if (buttonSg10PickStatus === "High"   && buttonStatus === "Favorite"){ buttonTen = 4;}
						if (buttonSg10PickStatus === "High"   && buttonStatus === "Very Likely"){ buttonTen = 8;}
						if (buttonSg10PickStatus === "High"   && buttonStatus === "Less Likely"){ buttonTen = 12;}
						if (buttonSg10PickStatus === "High"   && buttonStatus === "Underdog"){ buttonTen = 16;}
						if (buttonSg10PickStatus === "Medium" && buttonStatus === "Favorite"){ buttonTen = 6;}
						if (buttonSg10PickStatus === "Medium" && buttonStatus === "Very Likely"){ buttonTen = 10;}
						if (buttonSg10PickStatus === "Medium" && buttonStatus === "Less Likely"){ buttonTen = 14;}
						if (buttonSg10PickStatus === "Medium" && buttonStatus === "Underdog"){ buttonTen = 18;}
						if (buttonSg10PickStatus === "Low"    && buttonStatus === "Favorite"){ buttonTen = 8;}
						if (buttonSg10PickStatus === "Low"    && buttonStatus === "Very Likely"){ buttonTen = 12;}
						if (buttonSg10PickStatus === "Low"    && buttonStatus === "Less Likely"){ buttonTen = 16;}
						if (buttonSg10PickStatus === "Low"    && buttonStatus === "Underdog"){ buttonTen = 20;}

						//Stevens
						var stevensOne;
						if (stevensSg01PickStatus === "Zero") { stevensOne = 0;}
						if (stevensSg01PickStatus === "High"   && stevensStatus === "Favorite"){ stevensOne = 4;}
						if (stevensSg01PickStatus === "High"   && stevensStatus === "Very Likely"){ stevensOne = 8;}
						if (stevensSg01PickStatus === "High"   && stevensStatus === "Less Likely"){ stevensOne = 12;}
						if (stevensSg01PickStatus === "High"   && stevensStatus === "Underdog"){ stevensOne = 16;}
						if (stevensSg01PickStatus === "Medium" && stevensStatus === "Favorite"){ stevensOne = 6;}
						if (stevensSg01PickStatus === "Medium" && stevensStatus === "Very Likely"){ stevensOne = 10;}
						if (stevensSg01PickStatus === "Medium" && stevensStatus === "Less Likely"){ stevensOne = 14;}
						if (stevensSg01PickStatus === "Medium" && stevensStatus === "Underdog"){ stevensOne = 18;}
						if (stevensSg01PickStatus === "Low"    && stevensStatus === "Favorite"){ stevensOne = 8;}
						if (stevensSg01PickStatus === "Low"    && stevensStatus === "Very Likely"){ stevensOne = 12;}
						if (stevensSg01PickStatus === "Low"    && stevensStatus === "Less Likely"){ stevensOne = 16;}
						if (stevensSg01PickStatus === "Low"    && stevensStatus === "Underdog"){ stevensOne = 20;}

						var stevensTwo;
						if (stevensSg02PickStatus === "Zero") { stevensTwo = 0;}
						if (stevensSg02PickStatus === "High"   && stevensStatus === "Favorite"){ stevensTwo = 4;}
						if (stevensSg02PickStatus === "High"   && stevensStatus === "Very Likely"){ stevensTwo = 8;}
						if (stevensSg02PickStatus === "High"   && stevensStatus === "Less Likely"){ stevensTwo = 12;}
						if (stevensSg02PickStatus === "High"   && stevensStatus === "Underdog"){ stevensTwo = 16;}
						if (stevensSg02PickStatus === "Medium" && stevensStatus === "Favorite"){ stevensTwo = 6;}
						if (stevensSg02PickStatus === "Medium" && stevensStatus === "Very Likely"){ stevensTwo = 10;}
						if (stevensSg02PickStatus === "Medium" && stevensStatus === "Less Likely"){ stevensTwo = 14;}
						if (stevensSg02PickStatus === "Medium" && stevensStatus === "Underdog"){ stevensTwo = 18;}
						if (stevensSg02PickStatus === "Low"    && stevensStatus === "Favorite"){ stevensTwo = 8;}
						if (stevensSg02PickStatus === "Low"    && stevensStatus === "Very Likely"){ stevensTwo = 12;}
						if (stevensSg02PickStatus === "Low"    && stevensStatus === "Less Likely"){ stevensTwo = 16;}
						if (stevensSg02PickStatus === "Low"    && stevensStatus === "Underdog"){ stevensTwo = 20;}

						var stevensThree;
						if (stevensSg03PickStatus === "Zero") { stevensThree = 0;}
						if (stevensSg03PickStatus === "High"   && stevensStatus === "Favorite"){ stevensThree = 4;}
						if (stevensSg03PickStatus === "High"   && stevensStatus === "Very Likely"){ stevensThree = 8;}
						if (stevensSg03PickStatus === "High"   && stevensStatus === "Less Likely"){ stevensThree = 12;}
						if (stevensSg03PickStatus === "High"   && stevensStatus === "Underdog"){ stevensThree = 16;}
						if (stevensSg03PickStatus === "Medium" && stevensStatus === "Favorite"){ stevensThree = 6;}
						if (stevensSg03PickStatus === "Medium" && stevensStatus === "Very Likely"){ stevensThree = 10;}
						if (stevensSg03PickStatus === "Medium" && stevensStatus === "Less Likely"){ stevensThree = 14;}
						if (stevensSg03PickStatus === "Medium" && stevensStatus === "Underdog"){ stevensThree = 18;}
						if (stevensSg03PickStatus === "Low"    && stevensStatus === "Favorite"){ stevensThree = 8;}
						if (stevensSg03PickStatus === "Low"    && stevensStatus === "Very Likely"){ stevensThree = 12;}
						if (stevensSg03PickStatus === "Low"    && stevensStatus === "Less Likely"){ stevensThree = 16;}
						if (stevensSg03PickStatus === "Low"    && stevensStatus === "Underdog"){ stevensThree = 20;}

						var stevensFour;
						if (stevensSg04PickStatus === "Zero") { stevensFour = 0;}
						if (stevensSg04PickStatus === "High"   && stevensStatus === "Favorite"){ stevensFour = 4;}
						if (stevensSg04PickStatus === "High"   && stevensStatus === "Very Likely"){ stevensFour = 8;}
						if (stevensSg04PickStatus === "High"   && stevensStatus === "Less Likely"){ stevensFour = 12;}
						if (stevensSg04PickStatus === "High"   && stevensStatus === "Underdog"){ stevensFour = 16;}
						if (stevensSg04PickStatus === "Medium" && stevensStatus === "Favorite"){ stevensFour = 6;}
						if (stevensSg04PickStatus === "Medium" && stevensStatus === "Very Likely"){ stevensFour = 10;}
						if (stevensSg04PickStatus === "Medium" && stevensStatus === "Less Likely"){ stevensFour = 14;}
						if (stevensSg04PickStatus === "Medium" && stevensStatus === "Underdog"){ stevensFour = 18;}
						if (stevensSg04PickStatus === "Low"    && stevensStatus === "Favorite"){ stevensFour = 8;}
						if (stevensSg04PickStatus === "Low"    && stevensStatus === "Very Likely"){ stevensFour = 12;}
						if (stevensSg04PickStatus === "Low"    && stevensStatus === "Less Likely"){ stevensFour = 16;}
						if (stevensSg04PickStatus === "Low"    && stevensStatus === "Underdog"){ stevensFour = 20;}

						var stevensFive;
						if (stevensSg05PickStatus === "Zero") { stevensFive = 0;}
						if (stevensSg05PickStatus === "High"   && stevensStatus === "Favorite"){ stevensFive = 4;}
						if (stevensSg05PickStatus === "High"   && stevensStatus === "Very Likely"){ stevensFive = 8;}
						if (stevensSg05PickStatus === "High"   && stevensStatus === "Less Likely"){ stevensFive = 12;}
						if (stevensSg05PickStatus === "High"   && stevensStatus === "Underdog"){ stevensFive = 16;}
						if (stevensSg05PickStatus === "Medium" && stevensStatus === "Favorite"){ stevensFive = 6;}
						if (stevensSg05PickStatus === "Medium" && stevensStatus === "Very Likely"){ stevensFive = 10;}
						if (stevensSg05PickStatus === "Medium" && stevensStatus === "Less Likely"){ stevensFive = 14;}
						if (stevensSg05PickStatus === "Medium" && stevensStatus === "Underdog"){ stevensFive = 18;}
						if (stevensSg05PickStatus === "Low"    && stevensStatus === "Favorite"){ stevensFive = 8;}
						if (stevensSg05PickStatus === "Low"    && stevensStatus === "Very Likely"){ stevensFive = 12;}
						if (stevensSg05PickStatus === "Low"    && stevensStatus === "Less Likely"){ stevensFive = 16;}
						if (stevensSg05PickStatus === "Low"    && stevensStatus === "Underdog"){ stevensFive = 20;}

						var stevensSix;
						if (stevensSg06PickStatus === "Zero") { stevensSix = 0;}
						if (stevensSg06PickStatus === "High"   && stevensStatus === "Favorite"){ stevensSix = 4;}
						if (stevensSg06PickStatus === "High"   && stevensStatus === "Very Likely"){ stevensSix = 8;}
						if (stevensSg06PickStatus === "High"   && stevensStatus === "Less Likely"){ stevensSix = 12;}
						if (stevensSg06PickStatus === "High"   && stevensStatus === "Underdog"){ stevensSix = 16;}
						if (stevensSg06PickStatus === "Medium" && stevensStatus === "Favorite"){ stevensSix = 6;}
						if (stevensSg06PickStatus === "Medium" && stevensStatus === "Very Likely"){ stevensSix = 10;}
						if (stevensSg06PickStatus === "Medium" && stevensStatus === "Less Likely"){ stevensSix = 14;}
						if (stevensSg06PickStatus === "Medium" && stevensStatus === "Underdog"){ stevensSix = 18;}
						if (stevensSg06PickStatus === "Low"    && stevensStatus === "Favorite"){ stevensSix = 8;}
						if (stevensSg06PickStatus === "Low"    && stevensStatus === "Very Likely"){ stevensSix = 12;}
						if (stevensSg06PickStatus === "Low"    && stevensStatus === "Less Likely"){ stevensSix = 16;}
						if (stevensSg06PickStatus === "Low"    && stevensStatus === "Underdog"){ stevensSix = 20;}

						var stevensSeven;
						if (stevensSg07PickStatus === "Zero") { stevensSeven = 0;}
						if (stevensSg07PickStatus === "High"   && stevensStatus === "Favorite"){ stevensSeven = 4;}
						if (stevensSg07PickStatus === "High"   && stevensStatus === "Very Likely"){ stevensSeven = 8;}
						if (stevensSg07PickStatus === "High"   && stevensStatus === "Less Likely"){ stevensSeven = 12;}
						if (stevensSg07PickStatus === "High"   && stevensStatus === "Underdog"){ stevensSeven = 16;}
						if (stevensSg07PickStatus === "Medium" && stevensStatus === "Favorite"){ stevensSeven = 6;}
						if (stevensSg07PickStatus === "Medium" && stevensStatus === "Very Likely"){ stevensSeven = 10;}
						if (stevensSg07PickStatus === "Medium" && stevensStatus === "Less Likely"){ stevensSeven = 14;}
						if (stevensSg07PickStatus === "Medium" && stevensStatus === "Underdog"){ stevensSeven = 18;}
						if (stevensSg07PickStatus === "Low"    && stevensStatus === "Favorite"){ stevensSeven = 8;}
						if (stevensSg07PickStatus === "Low"    && stevensStatus === "Very Likely"){ stevensSeven = 12;}
						if (stevensSg07PickStatus === "Low"    && stevensStatus === "Less Likely"){ stevensSeven = 16;}
						if (stevensSg07PickStatus === "Low"    && stevensStatus === "Underdog"){ stevensSeven = 20;}

						var stevensEight;
						if (stevensSg08PickStatus === "Zero") { stevensEight = 0;}
						if (stevensSg08PickStatus === "High"   && stevensStatus === "Favorite"){ stevensEight = 4;}
						if (stevensSg08PickStatus === "High"   && stevensStatus === "Very Likely"){ stevensEight = 8;}
						if (stevensSg08PickStatus === "High"   && stevensStatus === "Less Likely"){ stevensEight = 12;}
						if (stevensSg08PickStatus === "High"   && stevensStatus === "Underdog"){ stevensEight = 16;}
						if (stevensSg08PickStatus === "Medium" && stevensStatus === "Favorite"){ stevensEight = 6;}
						if (stevensSg08PickStatus === "Medium" && stevensStatus === "Very Likely"){ stevensEight = 10;}
						if (stevensSg08PickStatus === "Medium" && stevensStatus === "Less Likely"){ stevensEight = 14;}
						if (stevensSg08PickStatus === "Medium" && stevensStatus === "Underdog"){ stevensEight = 18;}
						if (stevensSg08PickStatus === "Low"    && stevensStatus === "Favorite"){ stevensEight = 8;}
						if (stevensSg08PickStatus === "Low"    && stevensStatus === "Very Likely"){ stevensEight = 12;}
						if (stevensSg08PickStatus === "Low"    && stevensStatus === "Less Likely"){ stevensEight = 16;}
						if (stevensSg08PickStatus === "Low"    && stevensStatus === "Underdog"){ stevensEight = 20;}

						var stevensNine;
						if (stevensSg09PickStatus === "Zero") { stevensNine = 0;}
						if (stevensSg09PickStatus === "High"   && stevensStatus === "Favorite"){ stevensNine = 4;}
						if (stevensSg09PickStatus === "High"   && stevensStatus === "Very Likely"){ stevensNine = 8;}
						if (stevensSg09PickStatus === "High"   && stevensStatus === "Less Likely"){ stevensNine = 12;}
						if (stevensSg09PickStatus === "High"   && stevensStatus === "Underdog"){ stevensNine = 16;}
						if (stevensSg09PickStatus === "Medium" && stevensStatus === "Favorite"){ stevensNine = 6;}
						if (stevensSg09PickStatus === "Medium" && stevensStatus === "Very Likely"){ stevensNine = 10;}
						if (stevensSg09PickStatus === "Medium" && stevensStatus === "Less Likely"){ stevensNine = 14;}
						if (stevensSg09PickStatus === "Medium" && stevensStatus === "Underdog"){ stevensNine = 18;}
						if (stevensSg09PickStatus === "Low"    && stevensStatus === "Favorite"){ stevensNine = 8;}
						if (stevensSg09PickStatus === "Low"    && stevensStatus === "Very Likely"){ stevensNine = 12;}
						if (stevensSg09PickStatus === "Low"    && stevensStatus === "Less Likely"){ stevensNine = 16;}
						if (stevensSg09PickStatus === "Low"    && stevensStatus === "Underdog"){ stevensNine = 20;}

						var stevensTen;
						if (stevensSg10PickStatus === "Zero") { stevensTen = 0;}
						if (stevensSg10PickStatus === "High"   && stevensStatus === "Favorite"){ stevensTen = 4;}
						if (stevensSg10PickStatus === "High"   && stevensStatus === "Very Likely"){ stevensTen = 8;}
						if (stevensSg10PickStatus === "High"   && stevensStatus === "Less Likely"){ stevensTen = 12;}
						if (stevensSg10PickStatus === "High"   && stevensStatus === "Underdog"){ stevensTen = 16;}
						if (stevensSg10PickStatus === "Medium" && stevensStatus === "Favorite"){ stevensTen = 6;}
						if (stevensSg10PickStatus === "Medium" && stevensStatus === "Very Likely"){ stevensTen = 10;}
						if (stevensSg10PickStatus === "Medium" && stevensStatus === "Less Likely"){ stevensTen = 14;}
						if (stevensSg10PickStatus === "Medium" && stevensStatus === "Underdog"){ stevensTen = 18;}
						if (stevensSg10PickStatus === "Low"    && stevensStatus === "Favorite"){ stevensTen = 8;}
						if (stevensSg10PickStatus === "Low"    && stevensStatus === "Very Likely"){ stevensTen = 12;}
						if (stevensSg10PickStatus === "Low"    && stevensStatus === "Less Likely"){ stevensTen = 16;}
						if (stevensSg10PickStatus === "Low"    && stevensStatus === "Underdog"){ stevensTen = 20;}

						//Merhi
						var merhiOne;
						if (merhiSg01PickStatus === "Zero") { merhiOne = 0;}
						if (merhiSg01PickStatus === "High"   && merhiStatus === "Favorite"){ merhiOne = 4;}
						if (merhiSg01PickStatus === "High"   && merhiStatus === "Very Likely"){ merhiOne = 8;}
						if (merhiSg01PickStatus === "High"   && merhiStatus === "Less Likely"){ merhiOne = 12;}
						if (merhiSg01PickStatus === "High"   && merhiStatus === "Underdog"){ merhiOne = 16;}
						if (merhiSg01PickStatus === "Medium" && merhiStatus === "Favorite"){ merhiOne = 6;}
						if (merhiSg01PickStatus === "Medium" && merhiStatus === "Very Likely"){ merhiOne = 10;}
						if (merhiSg01PickStatus === "Medium" && merhiStatus === "Less Likely"){ merhiOne = 14;}
						if (merhiSg01PickStatus === "Medium" && merhiStatus === "Underdog"){ merhiOne = 18;}
						if (merhiSg01PickStatus === "Low"    && merhiStatus === "Favorite"){ merhiOne = 8;}
						if (merhiSg01PickStatus === "Low"    && merhiStatus === "Very Likely"){ merhiOne = 12;}
						if (merhiSg01PickStatus === "Low"    && merhiStatus === "Less Likely"){ merhiOne = 16;}
						if (merhiSg01PickStatus === "Low"    && merhiStatus === "Underdog"){ merhiOne = 20;}

						var merhiTwo;
						if (merhiSg02PickStatus === "Zero") { merhiTwo = 0;}
						if (merhiSg02PickStatus === "High"   && merhiStatus === "Favorite"){ merhiTwo = 4;}
						if (merhiSg02PickStatus === "High"   && merhiStatus === "Very Likely"){ merhiTwo = 8;}
						if (merhiSg02PickStatus === "High"   && merhiStatus === "Less Likely"){ merhiTwo = 12;}
						if (merhiSg02PickStatus === "High"   && merhiStatus === "Underdog"){ merhiTwo = 16;}
						if (merhiSg02PickStatus === "Medium" && merhiStatus === "Favorite"){ merhiTwo = 6;}
						if (merhiSg02PickStatus === "Medium" && merhiStatus === "Very Likely"){ merhiTwo = 10;}
						if (merhiSg02PickStatus === "Medium" && merhiStatus === "Less Likely"){ merhiTwo = 14;}
						if (merhiSg02PickStatus === "Medium" && merhiStatus === "Underdog"){ merhiTwo = 18;}
						if (merhiSg02PickStatus === "Low"    && merhiStatus === "Favorite"){ merhiTwo = 8;}
						if (merhiSg02PickStatus === "Low"    && merhiStatus === "Very Likely"){ merhiTwo = 12;}
						if (merhiSg02PickStatus === "Low"    && merhiStatus === "Less Likely"){ merhiTwo = 16;}
						if (merhiSg02PickStatus === "Low"    && merhiStatus === "Underdog"){ merhiTwo = 20;}

						var merhiThree;
						if (merhiSg03PickStatus === "Zero") { merhiThree = 0;}
						if (merhiSg03PickStatus === "High"   && merhiStatus === "Favorite"){ merhiThree = 4;}
						if (merhiSg03PickStatus === "High"   && merhiStatus === "Very Likely"){ merhiThree = 8;}
						if (merhiSg03PickStatus === "High"   && merhiStatus === "Less Likely"){ merhiThree = 12;}
						if (merhiSg03PickStatus === "High"   && merhiStatus === "Underdog"){ merhiThree = 16;}
						if (merhiSg03PickStatus === "Medium" && merhiStatus === "Favorite"){ merhiThree = 6;}
						if (merhiSg03PickStatus === "Medium" && merhiStatus === "Very Likely"){ merhiThree = 10;}
						if (merhiSg03PickStatus === "Medium" && merhiStatus === "Less Likely"){ merhiThree = 14;}
						if (merhiSg03PickStatus === "Medium" && merhiStatus === "Underdog"){ merhiThree = 18;}
						if (merhiSg03PickStatus === "Low"    && merhiStatus === "Favorite"){ merhiThree = 8;}
						if (merhiSg03PickStatus === "Low"    && merhiStatus === "Very Likely"){ merhiThree = 12;}
						if (merhiSg03PickStatus === "Low"    && merhiStatus === "Less Likely"){ merhiThree = 16;}
						if (merhiSg03PickStatus === "Low"    && merhiStatus === "Underdog"){ merhiThree = 20;}

						var merhiFour;
						if (merhiSg04PickStatus === "Zero") { merhiFour = 0;}
						if (merhiSg04PickStatus === "High"   && merhiStatus === "Favorite"){ merhiFour = 4;}
						if (merhiSg04PickStatus === "High"   && merhiStatus === "Very Likely"){ merhiFour = 8;}
						if (merhiSg04PickStatus === "High"   && merhiStatus === "Less Likely"){ merhiFour = 12;}
						if (merhiSg04PickStatus === "High"   && merhiStatus === "Underdog"){ merhiFour = 16;}
						if (merhiSg04PickStatus === "Medium" && merhiStatus === "Favorite"){ merhiFour = 6;}
						if (merhiSg04PickStatus === "Medium" && merhiStatus === "Very Likely"){ merhiFour = 10;}
						if (merhiSg04PickStatus === "Medium" && merhiStatus === "Less Likely"){ merhiFour = 14;}
						if (merhiSg04PickStatus === "Medium" && merhiStatus === "Underdog"){ merhiFour = 18;}
						if (merhiSg04PickStatus === "Low"    && merhiStatus === "Favorite"){ merhiFour = 8;}
						if (merhiSg04PickStatus === "Low"    && merhiStatus === "Very Likely"){ merhiFour = 12;}
						if (merhiSg04PickStatus === "Low"    && merhiStatus === "Less Likely"){ merhiFour = 16;}
						if (merhiSg04PickStatus === "Low"    && merhiStatus === "Underdog"){ merhiFour = 20;}

						var merhiFive;
						if (merhiSg05PickStatus === "Zero") { merhiFive = 0;}
						if (merhiSg05PickStatus === "High"   && merhiStatus === "Favorite"){ merhiFive = 4;}
						if (merhiSg05PickStatus === "High"   && merhiStatus === "Very Likely"){ merhiFive = 8;}
						if (merhiSg05PickStatus === "High"   && merhiStatus === "Less Likely"){ merhiFive = 12;}
						if (merhiSg05PickStatus === "High"   && merhiStatus === "Underdog"){ merhiFive = 16;}
						if (merhiSg05PickStatus === "Medium" && merhiStatus === "Favorite"){ merhiFive = 6;}
						if (merhiSg05PickStatus === "Medium" && merhiStatus === "Very Likely"){ merhiFive = 10;}
						if (merhiSg05PickStatus === "Medium" && merhiStatus === "Less Likely"){ merhiFive = 14;}
						if (merhiSg05PickStatus === "Medium" && merhiStatus === "Underdog"){ merhiFive = 18;}
						if (merhiSg05PickStatus === "Low"    && merhiStatus === "Favorite"){ merhiFive = 8;}
						if (merhiSg05PickStatus === "Low"    && merhiStatus === "Very Likely"){ merhiFive = 12;}
						if (merhiSg05PickStatus === "Low"    && merhiStatus === "Less Likely"){ merhiFive = 16;}
						if (merhiSg05PickStatus === "Low"    && merhiStatus === "Underdog"){ merhiFive = 20;}

						var merhiSix;
						if (merhiSg06PickStatus === "Zero") { merhiSix = 0;}
						if (merhiSg06PickStatus === "High"   && merhiStatus === "Favorite"){ merhiSix = 4;}
						if (merhiSg06PickStatus === "High"   && merhiStatus === "Very Likely"){ merhiSix = 8;}
						if (merhiSg06PickStatus === "High"   && merhiStatus === "Less Likely"){ merhiSix = 12;}
						if (merhiSg06PickStatus === "High"   && merhiStatus === "Underdog"){ merhiSix = 16;}
						if (merhiSg06PickStatus === "Medium" && merhiStatus === "Favorite"){ merhiSix = 6;}
						if (merhiSg06PickStatus === "Medium" && merhiStatus === "Very Likely"){ merhiSix = 10;}
						if (merhiSg06PickStatus === "Medium" && merhiStatus === "Less Likely"){ merhiSix = 14;}
						if (merhiSg06PickStatus === "Medium" && merhiStatus === "Underdog"){ merhiSix = 18;}
						if (merhiSg06PickStatus === "Low"    && merhiStatus === "Favorite"){ merhiSix = 8;}
						if (merhiSg06PickStatus === "Low"    && merhiStatus === "Very Likely"){ merhiSix = 12;}
						if (merhiSg06PickStatus === "Low"    && merhiStatus === "Less Likely"){ merhiSix = 16;}
						if (merhiSg06PickStatus === "Low"    && merhiStatus === "Underdog"){ merhiSix = 20;}

						var merhiSeven;
						if (merhiSg07PickStatus === "Zero") { merhiSeven = 0;}
						if (merhiSg07PickStatus === "High"   && merhiStatus === "Favorite"){ merhiSeven = 4;}
						if (merhiSg07PickStatus === "High"   && merhiStatus === "Very Likely"){ merhiSeven = 8;}
						if (merhiSg07PickStatus === "High"   && merhiStatus === "Less Likely"){ merhiSeven = 12;}
						if (merhiSg07PickStatus === "High"   && merhiStatus === "Underdog"){ merhiSeven = 16;}
						if (merhiSg07PickStatus === "Medium" && merhiStatus === "Favorite"){ merhiSeven = 6;}
						if (merhiSg07PickStatus === "Medium" && merhiStatus === "Very Likely"){ merhiSeven = 10;}
						if (merhiSg07PickStatus === "Medium" && merhiStatus === "Less Likely"){ merhiSeven = 14;}
						if (merhiSg07PickStatus === "Medium" && merhiStatus === "Underdog"){ merhiSeven = 18;}
						if (merhiSg07PickStatus === "Low"    && merhiStatus === "Favorite"){ merhiSeven = 8;}
						if (merhiSg07PickStatus === "Low"    && merhiStatus === "Very Likely"){ merhiSeven = 12;}
						if (merhiSg07PickStatus === "Low"    && merhiStatus === "Less Likely"){ merhiSeven = 16;}
						if (merhiSg07PickStatus === "Low"    && merhiStatus === "Underdog"){ merhiSeven = 20;}

						var merhiEight;
						if (merhiSg08PickStatus === "Zero") { merhiEight = 0;}
						if (merhiSg08PickStatus === "High"   && merhiStatus === "Favorite"){ merhiEight = 4;}
						if (merhiSg08PickStatus === "High"   && merhiStatus === "Very Likely"){ merhiEight = 8;}
						if (merhiSg08PickStatus === "High"   && merhiStatus === "Less Likely"){ merhiEight = 12;}
						if (merhiSg08PickStatus === "High"   && merhiStatus === "Underdog"){ merhiEight = 16;}
						if (merhiSg08PickStatus === "Medium" && merhiStatus === "Favorite"){ merhiEight = 6;}
						if (merhiSg08PickStatus === "Medium" && merhiStatus === "Very Likely"){ merhiEight = 10;}
						if (merhiSg08PickStatus === "Medium" && merhiStatus === "Less Likely"){ merhiEight = 14;}
						if (merhiSg08PickStatus === "Medium" && merhiStatus === "Underdog"){ merhiEight = 18;}
						if (merhiSg08PickStatus === "Low"    && merhiStatus === "Favorite"){ merhiEight = 8;}
						if (merhiSg08PickStatus === "Low"    && merhiStatus === "Very Likely"){ merhiEight = 12;}
						if (merhiSg08PickStatus === "Low"    && merhiStatus === "Less Likely"){ merhiEight = 16;}
						if (merhiSg08PickStatus === "Low"    && merhiStatus === "Underdog"){ merhiEight = 20;}

						var merhiNine;
						if (merhiSg09PickStatus === "Zero") { merhiNine = 0;}
						if (merhiSg09PickStatus === "High"   && merhiStatus === "Favorite"){ merhiNine = 4;}
						if (merhiSg09PickStatus === "High"   && merhiStatus === "Very Likely"){ merhiNine = 8;}
						if (merhiSg09PickStatus === "High"   && merhiStatus === "Less Likely"){ merhiNine = 12;}
						if (merhiSg09PickStatus === "High"   && merhiStatus === "Underdog"){ merhiNine = 16;}
						if (merhiSg09PickStatus === "Medium" && merhiStatus === "Favorite"){ merhiNine = 6;}
						if (merhiSg09PickStatus === "Medium" && merhiStatus === "Very Likely"){ merhiNine = 10;}
						if (merhiSg09PickStatus === "Medium" && merhiStatus === "Less Likely"){ merhiNine = 14;}
						if (merhiSg09PickStatus === "Medium" && merhiStatus === "Underdog"){ merhiNine = 18;}
						if (merhiSg09PickStatus === "Low"    && merhiStatus === "Favorite"){ merhiNine = 8;}
						if (merhiSg09PickStatus === "Low"    && merhiStatus === "Very Likely"){ merhiNine = 12;}
						if (merhiSg09PickStatus === "Low"    && merhiStatus === "Less Likely"){ merhiNine = 16;}
						if (merhiSg09PickStatus === "Low"    && merhiStatus === "Underdog"){ merhiNine = 20;}

						var merhiTen;
						if (merhiSg10PickStatus === "Zero") { merhiTen = 0;}
						if (merhiSg10PickStatus === "High"   && merhiStatus === "Favorite"){ merhiTen = 4;}
						if (merhiSg10PickStatus === "High"   && merhiStatus === "Very Likely"){ merhiTen = 8;}
						if (merhiSg10PickStatus === "High"   && merhiStatus === "Less Likely"){ merhiTen = 12;}
						if (merhiSg10PickStatus === "High"   && merhiStatus === "Underdog"){ merhiTen = 16;}
						if (merhiSg10PickStatus === "Medium" && merhiStatus === "Favorite"){ merhiTen = 6;}
						if (merhiSg10PickStatus === "Medium" && merhiStatus === "Very Likely"){ merhiTen = 10;}
						if (merhiSg10PickStatus === "Medium" && merhiStatus === "Less Likely"){ merhiTen = 14;}
						if (merhiSg10PickStatus === "Medium" && merhiStatus === "Underdog"){ merhiTen = 18;}
						if (merhiSg10PickStatus === "Low"    && merhiStatus === "Favorite"){ merhiTen = 8;}
						if (merhiSg10PickStatus === "Low"    && merhiStatus === "Very Likely"){ merhiTen = 12;}
						if (merhiSg10PickStatus === "Low"    && merhiStatus === "Less Likely"){ merhiTen = 16;}
						if (merhiSg10PickStatus === "Low"    && merhiStatus === "Underdog"){ merhiTen = 20;}
						console.log(rosbergSg01PickStatus);
						console.log(rosbergSg02PickStatus);
						console.log(rosbergSg03PickStatus);
						console.log(rosbergStatus);
						console.log(rosbergOne);
						console.log(rosbergTwo);
						console.log(rosbergThree);

				    //prepopulate a list of drivers
				    vm.driversPoints = [
				        { pos: 1, driver: "Hamilton",    oneP:   hamiltonOne, oneN:   hamiltonOne/2, oneTen:   hamiltonOne/4,
					                                       twoP:   hamiltonTwo, twoN:   hamiltonTwo/2, twoTen:   hamiltonTwo/4,
					                                       threeP: hamiltonThree, threeN: hamiltonThree/2, threeTen: hamiltonThree/4,
					                                       fourP:  hamiltonFour, fourN:  hamiltonFour/2, fourTen:  hamiltonFour/4,
					                                       fiveP:  hamiltonFive, fiveN:  hamiltonFive/2, fiveTen:  hamiltonFive/4,
					                                       sixP:   hamiltonSix, sixN:   hamiltonSix/2, sixTen:   hamiltonSix/4,
					                                       sevenP: hamiltonSeven, sevenN: hamiltonSeven/2, sevenTen: hamiltonSeven/4,
					                                       eightP: hamiltonEight, eightN: hamiltonEight/2, eightTen: hamiltonEight/4,
					                                       nineP:  hamiltonNine, nineN:  hamiltonNine/2, nineTen:  hamiltonNine/4,
					                                       tenP:   hamiltonTen, tenN:   hamiltonTen/2, tenTen:   hamiltonTen/4},
				        { pos: 2, driver: "Rosberg",     oneP:   rosbergOne, oneN:   rosbergOne/2, oneTen:   rosbergOne/4,
					                                       twoP:   rosbergTwo, twoN:   rosbergTwo/2, twoTen:   rosbergTwo/4,
					                                       threeP: rosbergThree, threeN: rosbergThree/2, threeTen: rosbergThree/4,
					                                       fourP:  rosbergFour, fourN:  rosbergFour/2, fourTen:  rosbergFour/4,
					                                       fiveP:  rosbergFive, fiveN:  rosbergFive/2, fiveTen:  rosbergFive/4,
					                                       sixP:   rosbergSix, sixN:   rosbergSix/2, sixTen:   rosbergSix/4,
					                                       sevenP: rosbergSeven, sevenN: rosbergSeven/2, sevenTen: rosbergSeven/4,
					                                       eightP: rosbergEight, eightN: rosbergEight/2, eightTen: rosbergEight/4,
					                                       nineP:  rosbergNine, nineN:  rosbergNine/2, nineTen:  rosbergNine/4,
					                                       tenP:   rosbergTen, tenN:   rosbergTen/2, tenTen:   rosbergTen/4},
				        { pos: 3, driver: "Vettel", 	   oneP:   vettelOne, oneN:   vettelOne/2, oneTen:   vettelOne/4,
					                                       twoP:   vettelTwo, twoN:   vettelTwo/2, twoTen:   vettelTwo/4,
					                                       threeP: vettelThree, threeN: vettelThree/2, threeTen: vettelThree/4,
					                                       fourP:  vettelFour, fourN:  vettelFour/2, fourTen:  vettelFour/4,
					                                       fiveP:  vettelFive, fiveN:  vettelFive/2, fiveTen:  vettelFive/4,
					                                       sixP:   vettelSix, sixN:   vettelSix/2, sixTen:   vettelSix/4,
					                                       sevenP: vettelSeven, sevenN: vettelSeven/2, sevenTen: vettelSeven/4,
					                                       eightP: vettelEight, eightN: vettelEight/2, eightTen: vettelEight/4,
					                                       nineP:  vettelNine, nineN:  vettelNine/2, nineTen:  vettelNine/4,
					                                       tenP:   vettelTen, tenN:   vettelTen/2, tenTen:   vettelTen/4},
				        { pos: 4, driver: "Raikkonen",   oneP:   raikkonenOne, oneN:   raikkonenOne/2, oneTen:   raikkonenOne/4,
					                                       twoP:   raikkonenTwo, twoN:   raikkonenTwo/2, twoTen:   raikkonenTwo/4,
					                                       threeP: raikkonenThree, threeN: raikkonenThree/2, threeTen: raikkonenThree/4,
					                                       fourP:  raikkonenFour, fourN:  raikkonenFour/2, fourTen:  raikkonenFour/4,
					                                       fiveP:  raikkonenFive, fiveN:  raikkonenFive/2, fiveTen:  raikkonenFive/4,
					                                       sixP:   raikkonenSix, sixN:   raikkonenSix/2, sixTen:   raikkonenSix/4,
					                                       sevenP: raikkonenSeven, sevenN: raikkonenSeven/2, sevenTen: raikkonenSeven/4,
					                                       eightP: raikkonenEight, eightN: raikkonenEight/2, eightTen: raikkonenEight/4,
					                                       nineP:  raikkonenNine, nineN:  raikkonenNine/2, nineTen:  raikkonenNine/4,
					                                       tenP:   raikkonenTen, tenN:   raikkonenTen/2, tenTen:   raikkonenTen/4},
				        { pos: 5, driver: "Massa",       oneP:   massaOne, oneN:   massaOne/2, oneTen:   massaOne/4,
					                                       twoP:   massaTwo, twoN:   massaTwo/2, twoTen:   massaTwo/4,
					                                       threeP: massaThree, threeN: massaThree/2, threeTen: massaThree/4,
					                                       fourP:  massaFour, fourN:  massaFour/2, fourTen:  massaFour/4,
					                                       fiveP:  massaFive, fiveN:  massaFive/2, fiveTen:  massaFive/4,
					                                       sixP:   massaSix, sixN:   massaSix/2, sixTen:   massaSix/4,
					                                       sevenP: massaSeven, sevenN: massaSeven/2, sevenTen: massaSeven/4,
					                                       eightP: massaEight, eightN: massaEight/2, eightTen: massaEight/4,
					                                       nineP:  massaNine, nineN:  massaNine/2, nineTen:  massaNine/4,
					                                       tenP:   massaTen, tenN:   massaTen/2, tenTen:   massaTen/4},
				        { pos: 6, driver: "Bottas",      oneP:   bottasOne, oneN:   bottasOne/2, oneTen:   bottasOne/4,
					                                       twoP:   bottasTwo, twoN:   bottasTwo/2, twoTen:   bottasTwo/4,
					                                       threeP: bottasThree, threeN: bottasThree/2, threeTen: bottasThree/4,
					                                       fourP:  bottasFour, fourN:  bottasFour/2, fourTen:  bottasFour/4,
					                                       fiveP:  bottasFive, fiveN:  bottasFive/2, fiveTen:  bottasFive/4,
					                                       sixP:   bottasSix, sixN:   bottasSix/2, sixTen:   bottasSix/4,
					                                       sevenP: bottasSeven, sevenN: bottasSeven/2, sevenTen: bottasSeven/4,
					                                       eightP: bottasEight, eightN: bottasEight/2, eightTen: bottasEight/4,
					                                       nineP:  bottasNine, nineN:  bottasNine/2, nineTen:  bottasNine/4,
					                                       tenP:   bottasTen, tenN:   bottasTen/2, tenTen:   bottasTen/4},
				        { pos: 7, driver: "Kvyat",       oneP:   kvyatOne, oneN:   kvyatOne/2, oneTen:   kvyatOne/4,
					                                       twoP:   kvyatTwo, twoN:   kvyatTwo/2, twoTen:   kvyatTwo/4,
					                                       threeP: kvyatThree, threeN: kvyatThree/2, threeTen: kvyatThree/4,
					                                       fourP:  kvyatFour, fourN:  kvyatFour/2, fourTen:  kvyatFour/4,
					                                       fiveP:  kvyatFive, fiveN:  kvyatFive/2, fiveTen:  kvyatFive/4,
					                                       sixP:   kvyatSix, sixN:   kvyatSix/2, sixTen:   kvyatSix/4,
					                                       sevenP: kvyatSeven, sevenN: kvyatSeven/2, sevenTen: kvyatSeven/4,
					                                       eightP: kvyatEight, eightN: kvyatEight/2, eightTen: kvyatEight/4,
					                                       nineP:  kvyatNine, nineN:  kvyatNine/2, nineTen:  kvyatNine/4,
					                                       tenP:   kvyatTen, tenN:   kvyatTen/2, tenTen:   kvyatTen/4},
				        { pos: 8, driver: "Ricciardo",   oneP:   ricciardoOne, oneN:   ricciardoOne/2, oneTen:   ricciardoOne/4,
					                                       twoP:   ricciardoTwo, twoN:   ricciardoTwo/2, twoTen:   ricciardoTwo/4,
					                                       threeP: ricciardoThree, threeN: ricciardoThree/2, threeTen: ricciardoThree/4,
					                                       fourP:  ricciardoFour, fourN:  ricciardoFour/2, fourTen:  ricciardoFour/4,
					                                       fiveP:  ricciardoFive, fiveN:  ricciardoFive/2, fiveTen:  ricciardoFive/4,
					                                       sixP:   ricciardoSix, sixN:   ricciardoSix/2, sixTen:   ricciardoSix/4,
					                                       sevenP: ricciardoSeven, sevenN: ricciardoSeven/2, sevenTen: ricciardoSeven/4,
					                                       eightP: ricciardoEight, eightN: ricciardoEight/2, eightTen: ricciardoEight/4,
					                                       nineP:  ricciardoNine, nineN:  ricciardoNine/2, nineTen:  ricciardoNine/4,
					                                       tenP:   ricciardoTen, tenN:   ricciardoTen/2, tenTen:   ricciardoTen/4},
				        { pos: 9, driver: "Perez",     	 oneP:   perezOne, oneN:   perezOne/2, oneTen:   perezOne/4,
					                                       twoP:   perezTwo, twoN:   perezTwo/2, twoTen:   perezTwo/4,
					                                       threeP: perezThree, threeN: perezThree/2, threeTen: perezThree/4,
					                                       fourP:  perezFour, fourN:  perezFour/2, fourTen:  perezFour/4,
					                                       fiveP:  perezFive, fiveN:  perezFive/2, fiveTen:  perezFive/4,
					                                       sixP:   perezSix, sixN:   perezSix/2, sixTen:   perezSix/4,
					                                       sevenP: perezSeven, sevenN: perezSeven/2, sevenTen: perezSeven/4,
					                                       eightP: perezEight, eightN: perezEight/2, eightTen: perezEight/4,
					                                       nineP:  perezNine, nineN:  perezNine/2, nineTen:  perezNine/4,
					                                       tenP:   perezTen, tenN:   perezTen/2, tenTen:   perezTen/4},
				        { pos: 10, driver: "Hulkenberg", oneP:   hulkenbergOne, oneN:   hulkenbergOne/2, oneTen:   hulkenbergOne/4,
					                                       twoP:   hulkenbergTwo, twoN:   hulkenbergTwo/2, twoTen:   hulkenbergTwo/4,
					                                       threeP: hulkenbergThree, threeN: hulkenbergThree/2, threeTen: hulkenbergThree/4,
					                                       fourP:  hulkenbergFour, fourN:  hulkenbergFour/2, fourTen:  hulkenbergFour/4,
					                                       fiveP:  hulkenbergFive, fiveN:  hulkenbergFive/2, fiveTen:  hulkenbergFive/4,
					                                       sixP:   hulkenbergSix, sixN:   hulkenbergSix/2, sixTen:   hulkenbergSix/4,
					                                       sevenP: hulkenbergSeven, sevenN: hulkenbergSeven/2, sevenTen: hulkenbergSeven/4,
					                                       eightP: hulkenbergEight, eightN: hulkenbergEight/2, eightTen: hulkenbergEight/4,
					                                       nineP:  hulkenbergNine, nineN:  hulkenbergNine/2, nineTen:  hulkenbergNine/4,
					                                       tenP:   hulkenbergTen, tenN:   hulkenbergTen/2, tenTen:   hulkenbergTen/4},
				        { pos: 11, driver: "Grosjean",   oneP:   grosjeanOne, oneN:   grosjeanOne/2, oneTen:   grosjeanOne/4,
					                                       twoP:   grosjeanTwo, twoN:   grosjeanTwo/2, twoTen:   grosjeanTwo/4,
					                                       threeP: grosjeanThree, threeN: grosjeanThree/2, threeTen: grosjeanThree/4,
					                                       fourP:  grosjeanFour, fourN:  grosjeanFour/2, fourTen:  grosjeanFour/4,
					                                       fiveP:  grosjeanFive, fiveN:  grosjeanFive/2, fiveTen:  grosjeanFive/4,
					                                       sixP:   grosjeanSix, sixN:   grosjeanSix/2, sixTen:   grosjeanSix/4,
					                                       sevenP: grosjeanSeven, sevenN: grosjeanSeven/2, sevenTen: grosjeanSeven/4,
					                                       eightP: grosjeanEight, eightN: grosjeanEight/2, eightTen: grosjeanEight/4,
					                                       nineP:  grosjeanNine, nineN:  grosjeanNine/2, nineTen:  grosjeanNine/4,
					                                       tenP:   grosjeanTen, tenN:   grosjeanTen/2, tenTen:   grosjeanTen/4},
				        { pos: 12, driver: "Maldonado",  oneP:   maldonadoOne, oneN:   maldonadoOne/2, oneTen:   maldonadoOne/4,
					                                       twoP:   maldonadoTwo, twoN:   maldonadoTwo/2, twoTen:   maldonadoTwo/4,
					                                       threeP: maldonadoThree, threeN: maldonadoThree/2, threeTen: maldonadoThree/4,
					                                       fourP:  maldonadoFour, fourN:  maldonadoFour/2, fourTen:  maldonadoFour/4,
					                                       fiveP:  maldonadoFive, fiveN:  maldonadoFive/2, fiveTen:  maldonadoFive/4,
					                                       sixP:   maldonadoSix, sixN:   maldonadoSix/2, sixTen:   maldonadoSix/4,
					                                       sevenP: maldonadoSeven, sevenN: maldonadoSeven/2, sevenTen: maldonadoSeven/4,
					                                       eightP: maldonadoEight, eightN: maldonadoEight/2, eightTen: maldonadoEight/4,
					                                       nineP:  maldonadoNine, nineN:  maldonadoNine/2, nineTen:  maldonadoNine/4,
					                                       tenP:   maldonadoTen, tenN:   maldonadoTen/2, tenTen:   maldonadoTen/4},
				        { pos: 13, driver: "Verstappen", oneP:   verstappenOne, oneN:   verstappenOne/2, oneTen:   verstappenOne/4,
					                                       twoP:   verstappenTwo, twoN:   verstappenTwo/2, twoTen:   verstappenTwo/4,
					                                       threeP: verstappenThree, threeN: verstappenThree/2, threeTen: verstappenThree/4,
					                                       fourP:  verstappenFour, fourN:  verstappenFour/2, fourTen:  verstappenFour/4,
					                                       fiveP:  verstappenFive, fiveN:  verstappenFive/2, fiveTen:  verstappenFive/4,
					                                       sixP:   verstappenSix, sixN:   verstappenSix/2, sixTen:   verstappenSix/4,
					                                       sevenP: verstappenSeven, sevenN: verstappenSeven/2, sevenTen: verstappenSeven/4,
					                                       eightP: verstappenEight, eightN: verstappenEight/2, eightTen: verstappenEight/4,
					                                       nineP:  verstappenNine, nineN:  verstappenNine/2, nineTen:  verstappenNine/4,
					                                       tenP:   verstappenTen, tenN:   verstappenTen/2, tenTen:   verstappenTen/4},
				        { pos: 14, driver: "Sainz",      oneP:   sainzOne, oneN:   sainzOne/2, oneTen:   sainzOne/4,
					                                       twoP:   sainzTwo, twoN:   sainzTwo/2, twoTen:   sainzTwo/4,
					                                       threeP: sainzThree, threeN: sainzThree/2, threeTen: sainzThree/4,
					                                       fourP:  sainzFour, fourN:  sainzFour/2, fourTen:  sainzFour/4,
					                                       fiveP:  sainzFive, fiveN:  sainzFive/2, fiveTen:  sainzFive/4,
					                                       sixP:   sainzSix, sixN:   sainzSix/2, sixTen:   sainzSix/4,
					                                       sevenP: sainzSeven, sevenN: sainzSeven/2, sevenTen: sainzSeven/4,
					                                       eightP: sainzEight, eightN: sainzEight/2, eightTen: sainzEight/4,
					                                       nineP:  sainzNine, nineN:  sainzNine/2, nineTen:  sainzNine/4,
					                                       tenP:   sainzTen, tenN:   sainzTen/2, tenTen:   sainzTen/4},
				        { pos: 15, driver: "Ericsson",   oneP:   ericssonOne, oneN:   ericssonOne/2, oneTen:   ericssonOne/4,
					                                       twoP:   ericssonTwo, twoN:   ericssonTwo/2, twoTen:   ericssonTwo/4,
					                                       threeP: ericssonThree, threeN: ericssonThree/2, threeTen: ericssonThree/4,
					                                       fourP:  ericssonFour, fourN:  ericssonFour/2, fourTen:  ericssonFour/4,
					                                       fiveP:  ericssonFive, fiveN:  ericssonFive/2, fiveTen:  ericssonFive/4,
					                                       sixP:   ericssonSix, sixN:   ericssonSix/2, sixTen:   ericssonSix/4,
					                                       sevenP: ericssonSeven, sevenN: ericssonSeven/2, sevenTen: ericssonSeven/4,
					                                       eightP: ericssonEight, eightN: ericssonEight/2, eightTen: ericssonEight/4,
					                                       nineP:  ericssonNine, nineN:  ericssonNine/2, nineTen:  ericssonNine/4,
					                                       tenP:   ericssonTen, tenN:   ericssonTen/2, tenTen:   ericssonTen/4},
				        { pos: 16, driver: "Nasr",       oneP:   nasrOne, oneN:   nasrOne/2, oneTen:   nasrOne/4,
					                                       twoP:   nasrTwo, twoN:   nasrTwo/2, twoTen:   nasrTwo/4,
					                                       threeP: nasrThree, threeN: nasrThree/2, threeTen: nasrThree/4,
					                                       fourP:  nasrFour, fourN:  nasrFour/2, fourTen:  nasrFour/4,
					                                       fiveP:  nasrFive, fiveN:  nasrFive/2, fiveTen:  nasrFive/4,
					                                       sixP:   nasrSix, sixN:   nasrSix/2, sixTen:   nasrSix/4,
					                                       sevenP: nasrSeven, sevenN: nasrSeven/2, sevenTen: nasrSeven/4,
					                                       eightP: nasrEight, eightN: nasrEight/2, eightTen: nasrEight/4,
					                                       nineP:  nasrNine, nineN:  nasrNine/2, nineTen:  nasrNine/4,
					                                       tenP:   nasrTen, tenN:   nasrTen/2, tenTen:   nasrTen/4},
				        { pos: 17, driver: "Alonso",   	 oneP:   alonsoOne, oneN:   alonsoOne/2, oneTen:   alonsoOne/4,
					                                       twoP:   alonsoTwo, twoN:   alonsoTwo/2, twoTen:   alonsoTwo/4,
					                                       threeP: alonsoThree, threeN: alonsoThree/2, threeTen: alonsoThree/4,
					                                       fourP:  alonsoFour, fourN:  alonsoFour/2, fourTen:  alonsoFour/4,
					                                       fiveP:  alonsoFive, fiveN:  alonsoFive/2, fiveTen:  alonsoFive/4,
					                                       sixP:   alonsoSix, sixN:   alonsoSix/2, sixTen:   alonsoSix/4,
					                                       sevenP: alonsoSeven, sevenN: alonsoSeven/2, sevenTen: alonsoSeven/4,
					                                       eightP: alonsoEight, eightN: alonsoEight/2, eightTen: alonsoEight/4,
					                                       nineP:  alonsoNine, nineN:  alonsoNine/2, nineTen:  alonsoNine/4,
					                                       tenP:   alonsoTen, tenN:   alonsoTen/2, tenTen:   alonsoTen/4},
				        { pos: 18, driver: "Button",   	 oneP:   buttonOne, oneN:   buttonOne/2, oneTen:   buttonOne/4,
					                                       twoP:   buttonTwo, twoN:   buttonTwo/2, twoTen:   buttonTwo/4,
					                                       threeP: buttonThree, threeN: buttonThree/2, threeTen: buttonThree/4,
					                                       fourP:  buttonFour, fourN:  buttonFour/2, fourTen:  buttonFour/4,
					                                       fiveP:  buttonFive, fiveN:  buttonFive/2, fiveTen:  buttonFive/4,
					                                       sixP:   buttonSix, sixN:   buttonSix/2, sixTen:   buttonSix/4,
					                                       sevenP: buttonSeven, sevenN: buttonSeven/2, sevenTen: buttonSeven/4,
					                                       eightP: buttonEight, eightN: buttonEight/2, eightTen: buttonEight/4,
					                                       nineP:  buttonNine, nineN:  buttonNine/2, nineTen:  buttonNine/4,
					                                       tenP:   buttonTen, tenN:   buttonTen/2, tenTen:   buttonTen/4},
				        { pos: 19, driver: "Stevens",    oneP:   stevensOne, oneN:   stevensOne/2, oneTen:   stevensOne/4,
					                                       twoP:   stevensTwo, twoN:   stevensTwo/2, twoTen:   stevensTwo/4,
					                                       threeP: stevensThree, threeN: stevensThree/2, threeTen: stevensThree/4,
					                                       fourP:  stevensFour, fourN:  stevensFour/2, fourTen:  stevensFour/4,
					                                       fiveP:  stevensFive, fiveN:  stevensFive/2, fiveTen:  stevensFive/4,
					                                       sixP:   stevensSix, sixN:   stevensSix/2, sixTen:   stevensSix/4,
					                                       sevenP: stevensSeven, sevenN: stevensSeven/2, sevenTen: stevensSeven/4,
					                                       eightP: stevensEight, eightN: stevensEight/2, eightTen: stevensEight/4,
					                                       nineP:  stevensNine, nineN:  stevensNine/2, nineTen:  stevensNine/4,
					                                       tenP:   stevensTen, tenN:   stevensTen/2, tenTen:   stevensTen/4},
				        { pos: 20, driver: "Merhi",      oneP:   merhiOne, oneN:   merhiOne/2, oneTen:   merhiOne/4,
					                                       twoP:   merhiTwo, twoN:   merhiTwo/2, twoTen:   merhiTwo/4,
					                                       threeP: merhiThree, threeN: merhiThree/2, threeTen: merhiThree/4,
					                                       fourP:  merhiFour, fourN:  merhiFour/2, fourTen:  merhiFour/4,
					                                       fiveP:  merhiFive, fiveN:  merhiFive/2, fiveTen:  merhiFive/4,
					                                       sixP:   merhiSix, sixN:   merhiSix/2, sixTen:   merhiSix/4,
					                                       sevenP: merhiSeven, sevenN: merhiSeven/2, sevenTen: merhiSeven/4,
					                                       eightP: merhiEight, eightN: merhiEight/2, eightTen: merhiEight/4,
					                                       nineP:  merhiNine, nineN:  merhiNine/2, nineTen:  merhiNine/4,
					                                       tenP:   merhiTen, tenN:   merhiTen/2, tenTen:   merhiTen/4}
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
