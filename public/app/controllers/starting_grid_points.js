angular.module('myApp', [])

// When only the name of the module is passed in,
// the 'module' method returns the specified module.
    .controller('HomeController', HomeController); //(how you name the controller to reference to it in the html, how you name the function controller)

// This is the function definition for our controller.
// Note that we capitalize it as it is used as a constructor function!
function HomeController() {

    var self = this; //we know that 'self' always refers to the Constructor
    self.sortType = 'pos';
    self.sortReverse = false;
    //prepopulate a list of drivers
    self.drivers = [
        { pos: 1, driver: "Hamilton",  oneP:   4, oneN:   2, oneTen:   1,
                                       twoP:   6, twoN:   3, twoTen:   1.5,
                                       threeP: 8, threeN: 4, threeTen: 2,
                                       fourP:  0, fourN:  0, fourTen:  0,
                                       fiveP:  0, fiveN:  0, fiveTen:  0,
                                       sixP:   0, sixN:   0, sixTen:   0,
                                       sevenP: 0, sevenN: 0, sevenTen: 0,
                                       eightP: 0, eightN: 0, eightTen: 0,
                                       nineP:  0, nineN:  0, nineTen:  0,
                                       tenP:   0, tenN:   0, tenTen:   0},
        { pos: 2, driver: "Rosberg",   oneP:   4, oneN:   2, oneTen:   1,
                                       twoP:   4, twoN:   2, twoTen:   1,
                                       threeP: 8, threeN: 4, threeTen: 2,
                                       fourP:  8, fourN:  4, fourTen:  2,
                                       fiveP:  0, fiveN:  0, fiveTen:  0,
                                       sixP:   0, sixN:   0, sixTen:   0,
                                       sevenP: 0, sevenN: 0, sevenTen: 0,
                                       eightP: 0, eightN: 0, eightTen: 0,
                                       nineP:  0, nineN:  0, nineTen:  0,
                                       tenP:   0, tenN:   0, tenTen:   0},
        { pos: 3, driver: "Ricciardo", oneP:   0, oneN:   0, oneTen:   0,
                                       twoP:   0, twoN:   0, twoTen:   0,
                                       threeP: 12, threeN: 6, threeTen: 3,
                                       fourP:  12, fourN: 6, fourTen:  3,
                                       fiveP:  12, fiveN: 6, fiveTen:  3,
                                       sixP:   12, sixN:  6, sixTen:  3,
                                       sevenP: 8, sevenN: 4, sevenTen: 2,
                                       eightP: 8, eightN: 4, eightTen: 2,
                                       nineP:  10, nineN: 5, nineTen: 2.5,
                                       tenP:   12, tenN:  6, tenTen:  3}
    ];

    }
