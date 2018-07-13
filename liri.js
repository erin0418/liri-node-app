require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keysFile = require("./keys.js");
var request = require("request");
var fs = require("fs");
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
	var params = {screen_name: 'Erin09306415', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
			for(var i = 0; i<tweets.length; i++){
				var tweetInfo = tweets[i];
				console.log("Tweet: " + tweetInfo.text + " @ " + tweetInfo.created_at);
		}
	}
// 	for (var i = 0; i < tweets.statuses.length; i++) {

// };
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
	fs.readFile("random.txt", "utf8", function(err, data){
		if(err){
			console.log("Error!")
		}
		var txtTitle = data.split(',');
		title = txtTitle[1]
		getSongInfo(title);
	})
	
}
doSomething();