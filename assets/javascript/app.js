// create an array of keys for buttons
var topics = ["Harry Potter", "Hermione Granger", "Ron Weasley", "Lord Voldemort", "Albus Dumbledore", "Severus Snape", "Rubeus Hagrid", "Draco Malfoy"];

//function to create buttons on html
function createButtons() {
	$("#buttons").empty();

	for (var i = 0; i < topics.length; i++) {
		var btn = $("<button>");
		btn.addClass("character btn");
		btn.data("name", topics[i]);
		btn.text(topics[i]);
		$("#buttons").append(btn);
	}
}

createButtons();

//function to listen to click on element with class=character to kick off displayGif function
$(document).on("click", ".character", displayGif);

//function to display GIFs by ajax call to get data to create elements to hold the data to show on html
function displayGif() {
	var character = $(this).data("name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=HucJDNOr1gAN0XSUCBGBoj1ReC8PQa8Y&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response);
		console.log(response.data[0].images.fixed_height_small_still.url);

		for (var i = 0; i < 9; i++) {
			var gifDiv = $("<img>");
			gifDiv.addClass("gif");
			gifDiv.data("index", i);
			gifDiv.attr("src", response.data[i].images.fixed_height_small_still.url);
			gifDiv.data("still", response.data[i].images.fixed_height_small_still.url);
			gifDiv.data("animate", response.data[i].images.fixed_height_small.url);
			gifDiv.data("state", "still");
			$("#gif-view").append(gifDiv);

			var ratingDiv = $("<div>");
			ratingDiv.addClass("rating");
			ratingDiv.data("index", i);
			ratingDiv.text("Rating: " + response.data[i].rating);
			$("#gif-view").append(ratingDiv);
		}
	})
}



