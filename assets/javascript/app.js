var animals = ["unicorn", "snipe", "jackalope", "otter", "sloth", "panda"];
var favorites = [];
var favoriteString = "";

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayAnimalGifs() {


    var selectedAnimal = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=KdBCqPcToVQzdpIm8RgsyqIj0vdUGGFg&q=" + selectedAnimal + "&limit=10";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Create the div for the entire animal
        $animalAllDiv = new $("<div>");

        // create the header for the animal
        $animalHeaderDiv = new $("<div>");
        $animalHeaderDiv.addClass("fav-animal-header");
        $animalHeaderDiv.attr("style", "width: 100%; height: 20px; border-bottom: 1px solid black; text-align: center");

        $animalSpan = new $("<span>");
        $animalSpan.addClass("fav-animal-span");
        $animalSpan.attr("style", "font-size: 40px; background-color: #ffffff; padding: 0 10px;");
        $animalSpan.text(selectedAnimal);

        $animalHeaderDiv.append($animalSpan);
        $animalAllDiv.append($animalHeaderDiv);
        for (var i = 0; i < response.data.length; i++) {
            $gifCard = new $("<div>");
            $gifCard.addClass("card");
            $gifRating = new $("<h5>");
            $gifRating.addClass("card-title");
            $gifRating.text("Rating: " + response.data[i].rating);

            $gifCard.append($gifRating);

            $gifImg = new $("<img>");
            $gifImg.addClass("card-bottom");
            $gifImg.attr("src", response.data[i].images.fixed_height_small_still.url);
            $gifImg.attr("data-still-url", response.data[i].images.fixed_height_small_still.url);
            $gifImg.attr("data-moving-url", response.data[i].images.fixed_height_small.url);
            $gifImg.attr("data-img-type", "still");
            $gifImg.attr("src", response.data[i].images.fixed_height_small_still.url);

            $gifImg.attr("alt", response.data[i].title);
            $gifImg.addClass("animal-img");
            $gifCard.append($gifImg);

            $gifCardBody = new $("<div>");
            $gifCardBody.addClass("card-body");

            $gifCopyButton = new $("<button>");
            $gifCopyButton.addClass("btn");
            $gifCopyButton.addClass("btn-copy");
            $gifCopyButton.addClass("btn-primary");
            $gifCopyButton.attr("data-copy-value", response.data[i].url);
            $gifCopyButton.text("Copy");
            $gifCardBody.append($gifCopyButton);

            $gifFavButton = new $("<button>");
            $gifFavButton.addClass("btn");
            $gifFavButton.addClass("btn-fav");
            $gifFavButton.addClass("btn-primary");
            $gifFavButton.text("Favorite");
            $gifFavButton.attr("data-gif-id", response.data[i].id);
            $gifCardBody.append($gifFavButton);

            $gifCard.append($gifCardBody);


            $animalAllDiv.append($gifCard);


            // // Prepend it all to the movie-view section.
            $("#the-gifs").prepend($animalAllDiv);
        }
    });

}

function displayFavoriteGifs() {

    
    var queryURL = "https://api.giphy.com/v1/gifs?api_key=KdBCqPcToVQzdpIm8RgsyqIj0vdUGGFg&ids=" + favoriteString;
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Empty the "#the-favs" div
        $("#the-favs").empty();
        // Create the div for the entire animal
        for (var i = 0; i < response.data.length; i++) {
            $gifCard = new $("<div>");
            $gifCard.addClass("card");
            $gifRating = new $("<h5>");
            $gifRating.addClass("card-title");
            $gifRating.text("Rating: " + response.data[i].rating);

            $gifCard.append($gifRating);

            $gifImg = new $("<img>");
            $gifImg.addClass("card-bottom");
            $gifImg.attr("src", response.data[i].images.fixed_height_small_still.url);
            $gifImg.attr("data-still-url", response.data[i].images.fixed_height_small_still.url);
            $gifImg.attr("data-moving-url", response.data[i].images.fixed_height_small.url);
            $gifImg.attr("data-img-type", "still");
            $gifImg.attr("src", response.data[i].images.fixed_height_small_still.url);

            $gifImg.attr("alt", response.data[i].title);
            $gifImg.addClass("animal-img");
            $gifCard.append($gifImg);

            $gifCardBody = new $("<div>");
            $gifCardBody.addClass("card-body");

            $gifCopyButton = new $("<button>");
            $gifCopyButton.addClass("btn");
            $gifCopyButton.addClass("btn-copy");
            $gifCopyButton.addClass("btn-primary");
            $gifCopyButton.attr("data-copy-value",response.data[i].url);
            $gifCopyButton.text("Copy");
            $gifCardBody.append($gifCopyButton);

            $gifCard.append($gifCardBody);

            // // Prepend it all to the movie-view section.
            $("#the-favs").append($gifCard);
        }
    });
}

    // Function for displaying movie data
    function renderButtons() {
        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of movies
        for (var i = 0; i < animals.length; i++) {

            // Then dynamicaly generates buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var $newButton = $("<button>");
            // Adds a class of movie to our button
            $newButton.addClass("animal");
            $newButton.addClass("btn");
            $newButton.addClass("btn-animal");
            $newButton.addClass("btn-primary");
            // Added a data-attribute
            $newButton.attr("data-name", animals[i]);
            // Provided the initial button text
            $newButton.text(animals[i]);
            // Added the button to the buttons-view div
            $("#buttons-view").append($newButton);
        }
    }

    // Grab the animal, verify it is not blank or already in the array, then add it an re-render the buttons.
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var animal = $("#animal-input").val().trim();
        if ((animals.indexOf(animal.toLowerCase()) === -1) && (animal !== "")) {
            animals.push(animal.toLowerCase());
        }
        $("#animal-input").val("");
        // re-render those buttons.
        renderButtons();
    });

    // Add ids to favorites ID
    function addToFavorites(zID) {
        //ensure the ID is not aleady a favorite
        if (favorites.indexOf(zID) === -1) {
            // We can only have 10 facorites.. pop out the oldest
            if (favorites.length == 10) {
                for (i = 1; i < favorites.length; i++) {
                    favorites[i - 1] = favorites[i];
                }
                favorites[9] = zID;
            }
            else {
                favorites[favorites.length] = zID;
            }
            //build the favorite string (Go backwards to get the oldest one at the top)
            favoriteString = "";
            for (var i = favorites.length - 1; i >= 0; i--) {
                favoriteString = favoriteString + favorites[i] + ",";
            }
            // pull the last "," off of the string
            favoriteString = favoriteString.substr(0, favoriteString.length - 1);
            displayFavoriteGifs();
        }

    }


    // Adding click event listeners to all elements with a class of "animal"
    $(document).on("click", ".animal", displayAnimalGifs);

    // Adding a click event listener to all elements with a class of "animal-image" and have function determine if still or moving image should be displayed
    // If it is "still", update this to "moving" and set the image source to the value in "data-moving-url"
    // If it is moving, update this to "still" and set the image source to the value in the "data-still-url"
    $(document).on("click", ".animal-img", function () {
        if ($(this).attr("data-img-type") === "still") {
            $(this).attr("src", $(this).attr("data-moving-url"));
            $(this).attr("data-img-type", "moving");
        }
        else {
            $(this).attr("src", $(this).attr("data-still-url"));
            $(this).attr("data-img-type", "still");
        }
    });

    // Adding click event listeners to all elements with a class of "btn-fav"
    $(document).on("click", ".btn-fav", function () {
        addToFavorites($(this).attr("data-gif-id"));
    });

    // Adding click event listeners to all elements with a class of "btn-copy"
    $(document).on("click", ".btn-copy", function () {
        $("#animal-input").val($(this).attr("data-copy-value"));
        var copyText = document.getElementById("animal-input");
        copyText.select();
        document.execCommand("copy");
        $("#animal-input").val("");
    });

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
