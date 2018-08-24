
//Creation of Variables
require("dotenv").config();

//Requirements
var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");
var moment = require('moment');
var fs = require("fs");

//Specific Spotify Key
var spotify = new Spotify(keys.spotify);

// To Make Things Look Pretty in the log.txt file
var divider =
    "\n------------------------------------------------------------\n\n";

//Input Command Line Arguments

var command = process.argv[2];
var term = process.argv.slice(3).join(" ");

// Function for Spotify API Searches

function spotifySearcher (replaceTrackName,value,bool) {
    
    spotify
        .search({ type: "track", query: replaceTrackName, limit: value })
        .then(function(response) {

            if (bool===1) {
              for (var i=0;i<response.tracks.items.length;i++) {
                  var showData = [
                      "Artist Name: " + JSON.stringify(response.tracks.items[i].artists[0].name),
                      "Song Name: " +JSON.stringify(response.tracks.items[i].name),
                      "Preview Link: "+JSON.stringify(response.tracks.items[i].preview_url),
                      "Album: "+ JSON.stringify(response.tracks.items[i].album.name)
                  ].join("\n\n");
                  console.log(showData);
                  console.log("--------------------------")
                  
                  // Append showresponse and the divider to log.txt
                  
                  fs.appendFile("log.txt", showData + divider, function(err) {
                      if (err) throw err;
                  });
                  
              }
            }

            else {
                var showData = [
                    "Artist Name: " + JSON.stringify(response.tracks.items[5].artists[0].name),
                    "Song Name: " +JSON.stringify(response.tracks.items[5].name),
                    "Preview Link: "+JSON.stringify(response.tracks.items[5].preview_url),
                    "Album: "+ JSON.stringify(response.tracks.items[5].album.name)
                    ].join("\n\n");
                console.log(showData);
                console.log("--------------------------")
    
                fs.appendFile("log.txt", showData + divider, function(err) {
                    if (err) throw err;
                });
            }
              
        })
        .catch(function(err) {
            console.log(err);
        } 
    );
}

//Function for Movie API Searches
function movieSearcher (inputMovie) {
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + inputMovie + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

        //Accessing the Object's Data
        var movie=JSON.parse(body);

        var showData = [
            "Title: "+movie.Title,
            "Release Year: " + movie.Year,
            "IMDB Rating: "+movie.imdbRating,
            "Rotten Tomatoes Rating: "+ movie.Ratings[0].Value,
            "Country: "+movie.Country,
            "Language: "+movie.Language,
            "Plot:"+ movie.Plot,
            "Actors:"+ movie.Actors
        ].join("\n\n");
        console.log(showData);

        fs.appendFile("log.txt", showData + divider, function(err) {
            if (err) throw err;
        }); 

    }
    });
}

//Activating Different Commands for Different Functions (The Meat of the Code).

//CONCERT API
if (command==="concert-this") {
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

    request(URL, function(err, response, body) {
      // parse the response body (string) to a JSON object
      var jsonData = JSON.parse(body);

      // showData ends up being the string containing the show data we will print to the console
      for (var i=0;i<jsonData.length;i++) {
        var convertedDate = moment(jsonData[i].datetime);
        
        var showData = [
            "Venue Name: " + jsonData[i].venue.name,
            "Venue Country: " + jsonData[i].venue.country,
            "Venue City: "+jsonData[i].venue.city,
            "Venue Region:"+jsonData[i].venue.region,
            "Venue Date: "+convertedDate.format("MM/DD/YY")
        ].join("\n\n");
        
        console.log(showData);
        console.log("--------------------------")
        
        // Append showData and the divider to log.txt, print showData to the console
        fs.appendFile("log.txt", showData + divider, function(err) {
            if (err) throw err;
        });
        
        }     
    
    });
}

//Spotify API
else if (command==="spotify-this-song") {

    if (!term) {
        console.log("You Have Been Routed To This Pop Song");
        console.log("--------------------------")
        spotifySearcher("The Sign",20,0)
    }

    else {
        spotifySearcher(term,5,1);
    }
    
}

//Movie API
else if (command==="movie-this") {
   
    if (!term) {
        movieSearcher("Mr.Nobody")
    }

    else {
        movieSearcher(term);
    }
}

else if (command==="do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        //Array Indexes to Manipulate the Code (Can Be Expanded Upon)

        var replaceCommand=dataArr[0];
        var replaceTerm=dataArr[1];
        if (replaceCommand==="spotify-this-song"){
            spotifySearcher(replaceTerm,1,1);
        }
        else {
            movieSearcher(replaceTerm);
        }
      
    });
}

else {
    console.log("ERROR YOU DIDN'T FOLLOW THE CORRECT COMMANDS BUDDY");
}

