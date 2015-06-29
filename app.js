// require the other js file by indicating the path to it. ./ means the current directory.
var profile = require("./profile.js"); // path is mandatory, but .js is not

// create an array of users so you can loop over them to print them out
// var users = ["chalkers", "amitlubling", "joykesten2"];

// use .forEach to loop over the array and pass each instance of it into the callback function
// users.forEach(function(username){
//   profile.get(username);
// });

//OR
//users.forEach(profile.get);


// to get multiple usernames in, instead of defining them up front, user the .argv array on the global process object
// by using process.argv and then the slice method, you can slice from the second index (the first username) onwards
var users = process.argv.slice(2);


// get the username
// profile.get("amitlubling");
