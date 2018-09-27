var cheerio = require ("cheerio");
var request = require ("request");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from nytimes:" +
            "\n***********************************\n");


request ("https://www.nytimes.com/section/politics", function (err, res, html){
    var $ = cheerio.load(html);

    var scrapingData = [];

    $("h2.headline").each(function(i, element){
        var title = $(element).text();
        var link = $(element).children().attr("href");
        
        scrapingData.push({
            title: title,
            link: link
        });
    });

    console.log(scrapingData);
});




