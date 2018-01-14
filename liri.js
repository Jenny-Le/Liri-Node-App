var keyFile = require("./keys.js");
const dotEnv = require("dotenv").config();
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keyFile.spotify);
var client = new Twitter(keyFile.twitter);
var userInput = process.argv[2];

spotify.search({
    type: '',
    query: ''
}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});

switch (userInput) {
    case "my-tweets":
        result = tweets();
        break;

    case "spotifiy-this-song":
        result = songs();
        break;

    case "movie-this":
        result = movie();
        break;

    case "do-what-it-says":
        result = doWhatItSays();
        break;

};

var request = require("request");
var nodeArgs = process.argv;

var movie = function(){
    var movieName = "";

    for (var i = 2; i < nodeArgs.length; i++) {
    
        if (i > 2 && i < nodeArgs.length) {
    
            movieName = movieName + "+" + nodeArgs[i];
    
        } else {
    
            movieName += nodeArgs[i];
    
        }
    }
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {

        console.log("Release Year: " + JSON.parse(body).Year);
    }
});
}