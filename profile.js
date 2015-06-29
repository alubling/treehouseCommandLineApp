// Problem: We need a simple way to look at a user's badge count and Javascript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

var http = require("http"); // need to require the http to gain access to API

// start with the end goal, what we're aiming for
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " in Javascript";
  console.log(message);
};

// Print out error messages
function printError(error){
  console.error(error.message);
};


function get(username) {
  // 1. Connect to the API URL (http://teamtreehouse.com/username.json)
  // use http.get to get the data, and run a callback ONCE the response is returned
  var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {

      //console.dir(response); // inspect the response object
      //console.log(response.statusCode);

    var body = ""; // construct the body

    // 2. Read the data from the response
    response.on("data", function(chunk) {

      body += chunk; // by adding chunks as they come in

    });


    response.on("end", function() {

      // wrap the whole on "end" callback in an if statement to catch non-200 status errors
      if (response.statusCode === 200) {

        try {

          // 3. Parse the data (read it from a string into a program friendly format)
          var profile = JSON.parse(body); // use JSON.parse to turn the string body into a JSON data object

          // 4. Print the data
          printMessage(username, profile.badges.length, profile.points.JavaScript);

          // console.dir(profile); // see what the profile looks like after being parsed
          // console.log(body); // log out the body when the response chunks end
          // console.log(typeof body); // will return "string", need to turn it into an object to parse it


        } catch(error) {

          //Parse Error
          printError(error);

        }

      } else {

          // Status code error (if the status code is NOT 200, print a message). In this case we're using the printError function, we're passing in an object we're custom defining instead of the standard error object, but we're using the same interface by have a key value of message: and the message. We're also adding the username, and the English string of the statusCode that we get that is not 200. We can access the statusCode because it's an object (at http.STATUS_CODES) and the key for the object is the statusCode, which we can ge from the response.
        printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});

      }


    });
  });


// printMessage("Chalkers", 1000, 2000000);

// handling errors - this code will be executed when an error event is emitted by the system on the request object (when you request the data)
//request.on("error", function(error) { // this callback will take an error argument
//  console.error(error.message); // all errors have a .message property
//});

// Connection Error
request.on("error", printError);
};

// this is required in order to have a .get method on profile module in app.js
// basically this code exports a .get method from this module, and makes it the get function that is in this file
module.exports.get = get;
