// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var cheerio = require ("cheerio");
var request = require ("request");

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from nytimes:" +
            "\n***********************************\n");


// Database configuration
var databaseUrl = "newsScraper";
var collections = ["headlines"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
// Make a request for the news section of `nytimes`
request ("https://www.nytimes.com/section/politics", function (err, res, html){
    var $ = cheerio.load(html);

    var scrapingData = [];

    $("h2.headline").each(function(i, element){
        var title = $(element).text();
        var link = $(element).children().attr("href");

// If this found element had both a title and a link
        if (title && link) {
        // Insert the data in the headlines db
        db.headlines.insert({
            title: title,
            link: link            
        },
        function(err, inserted) {
            if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
        }
            else {
            // Otherwise, log the inserted data
            console.log("inserted");
}
        });
        }
    });
});

  // Send a "Scrape Complete" message to the browser
res.send("Scrape Complete");
});


// Retrieve scraped data from the headlines db
app.get("/all", function(req, res) {
    // Find all results from the scrapedData collection in the db
    db.headlines.find({}, function(error, found) {
    // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        res.json(found);
      }
    });
  });


// Listen on port 3000
app.listen(3000, function() {
    console.log("News-Scraper running on port 3000!");
  });