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
    $("#gif-view").empty();
    var character = $(this).data("name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=HucJDNOr1gAN0XSUCBGBoj1ReC8PQa8Y&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        for (var i = 0; i < 10; i++) {
            //create a div to hold an image and its rating
            var gifWrap = $("<div>");
            gifWrap.addClass("col-md-4 wrap");

            //create an img tag to hold image url
            var gifDiv = $("<img>");
            gifDiv.addClass("gif");
            gifDiv.attr("src", response.data[i].images.fixed_height_small_still.url);
            gifDiv.data("still", response.data[i].images.fixed_height_small_still.url);
            gifDiv.data("animate", response.data[i].images.fixed_height_small.url);
            gifDiv.data("state", "still");
            //append the image to the div
            gifWrap.append(gifDiv);

            //create a p tag to hold rating
            var ratingDiv = $("<p>");
            ratingDiv.addClass("rating");
            ratingDiv.text("Rating: " + response.data[i].rating);
            //append the rating p tag to the div
            gifWrap.append(ratingDiv);

            //append the div wrapping the image and rating to the gif-view div
            $("#gif-view").append(gifWrap);
        }
    })
}

//function to listen to click on element with class=gif to kick off showAnimate function
$(document).on("click", ".gif", showAnimate);

//function to swap the url of still and animate
function showAnimate() {
    var state = $(this).data("state");

    if (state === "still") {
        console.log('it is still', $(this).data('animate'));
        $(this).attr("src", $(this).data("animate"));
        $(this).data("state", "animate");
    } else {
        console.log('it is not still');
        $(this).attr("src", $(this).data("still"));
        $(this).data("state", "still");
    }
}

//function to listen to click on element with id=add-gif to kick on createButtons function
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#input").val().trim();
    if (!gif) {
        console.log("abc");
        return
    } else {
        checkButton(gif);
        createButtons();
    }
})

//function to check whether the button has already existed
function checkButton(userInput) {
    for (var i = 0; i < topics.length; i++) {
        if (userInput.toLowerCase() === topics[i].toLowerCase()) {
            $("#gif-view").text("This button has already existed.");
            return;
        } else {
            topics.push(userInput);
            return userInput;
        };
    };
};