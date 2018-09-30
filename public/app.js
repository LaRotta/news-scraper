function displayResults(articles) {
    // First, empty the table
    $("tbody").empty();
  
    // Then, for each entry of that json...
    headlines.forEach(function(headline) {
      // Append each of the animal's properties to the table
      $("tbody").append("<tr><td>" + headline.title + "</td>" + 
                            "<td>" + headline.link + "</td>");
    });
  }