const dotEnv = require("dotenv").config();
var keyFile = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keyFile.spotify);
var Twitter = require('twitter');
var client = new Twitter(keyFile.twitter);
var userInput = process.argv[2];


var request = require("request");
var nodeArgs = process.argv;

var movie = function () {
    var movieName = "";

    // starting from the third array, is where the user inputs the movie.this is pulling up the string of the movie name
    for (var i = 3; i < nodeArgs.length; i++) {
        // if the search is not [3], it is adding it into the string
        if (i > 3 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        } else {

            //+= is taking what i currrently have, and i add on to it. 
            movieName += nodeArgs[i];

        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


    request(queryUrl, function (error, response, body) {


        if (!error && response.statusCode === 200) {
            let parseBody = JSON.parse(body)
            // console.log("JSON.body: ", + parseBody);
            console.log("Release Year: " + parseBody.Year);
            console.log("Movie Title: " + parseBody.Title);
            console.log("Country: " + parseBody.Country);
            console.log("Plot: " + parseBody.Plot);
            console.log("Actors: " + parseBody.Actors)

        }
    });
}

switch (userInput) {
    case "my-tweets":
        result = tweets();
        break;

    case "spotify-this-song":
        result = songs();
        break;

    case "movie-this":
        result = movie();
        break;

        // case "do-what-it-says":
        //     result = doWhatItSays();
        //     break;

};

function tweets() {
    var screenName = {
        screen_name: "disc0Jenn"
    };
    client.get("statuses/user_timeline", screenName, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log("@disc0Jenn: " + tweets[i].text + " Created at: " + date.substring(0, 19));
            }
        } else {
            console.log("There has been an error.");
            console.log(error)
        }
    });
}

function songs() {
    var songName = ""
    for (var i = 3; i < nodeArgs.length; i++) {
        // if the search is not [3], it is adding it into the string
        if (i > 3 && i < nodeArgs.length) {

            songName= songName + " " + nodeArgs[i];
        } else {

            //+= is taking what i currrently have, and i add on to it. 
            songName += nodeArgs[i];

        }
    }
    console.log(songName)
    spotify.search({
        type: 'track',
        query: songName
    })
    .then(function(response) {
        console.log(response.tracks.items[0]);
      })
      .catch(function(err) {
        console.log(err);
      });

    }
//    spotify.tracks.items[3].spotify
