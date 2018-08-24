# liri-node-app

## Objective and Goal
The purpose of this github repo is to build a LIRI bot app that takes input from node command line arguments.The LIRI bot searches for songs, movies, and concert events. 

## Technolgies Used

1. Node-Spotify-API
    1. https://www.npmjs.com/package/node-spotify-api
2. Request
    1. https://www.npmjs.com/package/request
3. OMBD API
    1. http://www.omdbapi.com
4. Bands in Town API
    1. http://www.artists.bandsintown.com/bandsintown-api
5. Moment
    1. https://www.npmjs.com/package/moment
6. DotEnv
    1. https://www.npmjs.com/package/dotenv

## Command Arguments to Activate LIRI BOT

* Search for Concerts
    * node liri.js concert-this '<Name of Band/Artist>'
    * Request used to pull API.
    * The Following Information Will Be Displayed:
        * Name of Venue:
        * Venue Location:
        * Date of Event (Moment Used to Format into MM/DD/YYYY)

* Search for Songs
    * node liri.js spotify-this-song '<Song Name Here>'
    * Used Spotify's Search function to pull API.
    * If no song is inputed, it will default to "The Sign" by Ace of Base.
    * The Following Information Will Be Displayed (Limited to 5):
        * Artist(s)
        * The song's name
        * A preview link of the song from Spotify
        * The album that the song is from

* Search for Movies
    * node liri.js movie-this '<Movie Name Here>"
    * If no movie is inputed, it will default to the movie "Mr. Nobody".
    * Request used to pull API.
    * The Following Information Will Be Displayed: 
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

* Searches dependent on random.txt file
    * node liri.js do-what-it says
    * fs.readFile used to read from random.txt file.
    * This will read from the random.txt file and run a search (song or movie) depending on what was inputed in the random.txt.

* Just running liri.js without any other arguments.
    * Error Message Occurs.

## Additional Notes

All data searches are logged and appended in the log.txt file. 
