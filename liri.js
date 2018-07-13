require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keysFile = require("./keys.js");
var request = require("request");
var command = process.argv[2];
var title = process.argv.slice(3).join(" ");

function doSomething() {

	switch (command) {
		
		// Gets list of tweets.
		case "my-tweets": 
		getMyTweets();
		break;

		// Gets song information.
		case "spotify-this-song":
    getSongInfo(title);
		break;

		// Gets movie information.
		case "movie-this":
		getMovieInfo(title);
    break;
        
    case "do-what-it-says": 
		doWhatItSays();
		break;
	}
}

var getMyTweets = function(){
	// * This will show your last 20 tweets and when they were created at in your terminal/bash window.
	var client = new Twitter({
		consumer_key: keysFile.twitter.consumer_key,
		consumer_secret: keysFile.twitter.consumer_secret,
		access_token_key: keysFile.twitter.access_token_key,
		access_token_secret: keysFile.twitter.access_token_secret,
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
		id: keysFile.spotify.id,
		secret: keysFile.spotify.secret,
	  });
	  spotify.search({ type: 'track', query: title, limit: 1}, function(err, data) {
		if (err) {
		  return console.log('Error occurred: ' + err);
		}
			var songInfo = data.tracks.items[0];
			console.log("Artist: " + songInfo.artists[0].name);
			console.log("Song: " + songInfo.name);
			console.log("Preview URL: " + songInfo.preview_url);
			console.log("Album: " + songInfo.album.name);
})
// * If no song is provided then your program will default to "The Sign" by Ace of Base.
			// TODO: if nothing is given as an argument in the 3rd slot, set title to "The Sign" and run the function as usual 
}

var getMovieInfo = function(){
	request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  if (!error && response.statusCode === 200) {
		var movieInfo = JSON.parse(body);

		console.log(movieInfo.Title);
		console.log(movieInfo.Ratings[0]);
		console.log(movieInfo.Ratings[1]);
		console.log(movieInfo.Country);
		console.log(movieInfo.Language);
		console.log(movieInfo.Plot);
		console.log(movieInfo.Actors);
	}
	// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
			// TODO: if nothing is given as an argument in the 3rd slot, set title to "Mr. Robot" and run the function as usual 
});
}

var doWhatItSays = function() {
	// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
	// * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
	
	// * Feel free to change the text in that document to test out the feature for other commands.

	
}
doSomething();