require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keysFile = require("./keys.js");
var request = require("request");
var command = process.argv[2];


function doSomething() {

	switch (command) {
		
		// Gets list of tweets.
		case "my-tweets": 
		getMyTweets();
		break;

		// Gets song information.
		case "spotify-this-song":
        var songTitle = "All the small things";
        getSongInfo(songTitle);
		break;

		// Gets movie information.
		case "movie-this":
		var movieTitle = command;
        getMovieInfo(movieTitle);
        break;
        
        case "do-what-it-says": 
		doWhatItSays();
		break;
	}
}

var getMyTweets = function(){
	var client = new Twitter({
		consumer_key: keysFile.consumer_key,
		consumer_secret: keysFile.consumer_secret,
		access_token_key: keysFile.access_token_key,
		access_token_secret: keysFile.access_token_secret,
	  });
	var params = {screen_name: 'Erin09306415'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
	console.log(tweets);
	console.log(response);
  }
});
}

var getSongInfo = function(){
	var spotify = new Spotify({
		id: keysFile.id,
		secret: keysFile.secret,
	  });
	   
	  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
		if (err) {
		  return console.log('Error occurred: ' + err);
		}
	   
	  console.log(data); 
	  });
}

var getMovieInfo = function(){
	request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    console.log("The movie's rating is: " + JSON.parse(body).Genre);
  }
});
}

var doWhatItSays = function() {
	
}
doSomething();