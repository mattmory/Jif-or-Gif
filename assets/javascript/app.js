var animals = ["unicorn", "snipe", "jackalope", "otter", "sloth", "panda"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayAnimalGifs() {

    //    1TJwaAD8LFceSa48aKwt3LHDxpt0kCvy

    var selectedAnimal = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=KdBCqPcToVQzdpIm8RgsyqIj0vdUGGFg&q=" + selectedAnimal + "&limit=10";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        
        console.log(response.data);
        // Create the div for the entire animal
        $animalAllDiv = new $("<div>");

        // create the header for the animal
        $animalHeaderDiv = new $("<div>");
        $animalHeaderDiv.attr("style", "width: 100%; height: 20px; border-bottom: 1px solid black; text-align: center");
        $animalSpan = new $("<span>");
        $animalSpan.attr("style", "font-size: 40px; background-color: #ffffff; padding: 0 10px;");
        $animalSpan.text(selectedAnimal);

        $animalHeaderDiv.append($animalSpan);
        $animalAllDiv.append($animalHeaderDiv);
        console.log(response.data.length);
        for (var i = 0; i < response.data.length; i++) {
            $gifRating = new $("<h5>");
            $gifRating.text("Rating: " + response.data[i].rating);
            $animalAllDiv.append($gifRating);

            $gifImg = new $("<img>");
            $gifImg.attr("src", response.data[i].images.fixed_height_small_still.url);
            $gifImg.attr("data-still-url", response.data[i].images.fixed_height_small_still.url);
            $gifImg.attr("data-moving-url", response.data[i].images.fixed_height_small.url);
            $gifImg.attr("data-img-type","still");
            $gifImg.attr("src", response.data[i].images.fixed_height_small_still.url);

            $gifImg.attr("alt", response.data[i].title);
            $gifImg.addClass("animal-img");
            $animalAllDiv.append($gifImg);

            // // Prepend it all to the movie-view section.
            $("#the-gifs").prepend($animalAllDiv);
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
    if (animals.indexOf(animal.toLowerCase()) === -1) {
        animals.push(animal.toLowerCase());
    }
    // re-render those buttons.
    renderButtons();
});


// Adding click event listeners to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalGifs);

// Adding a click event listener to all elements with a class of "animal-image" and have function determine if still or moving image should be displayed
// If it is "still", update this to "moving" and set the image source to the value in "data-moving-url"
// If it is moving, update this to "still" and set the image source to the value in the "data-still-url"
$(document).on("click", ".animal-img", function() {
    console.log($(this).attr("data-img-type"));
    if($(this).attr("data-img-type")==="still"){
        $(this).attr("src",$(this).attr("data-moving-url"));
        $(this).attr("data-img-type","moving");
    }
    else {
        $(this).attr("src",$(this).attr("data-still-url"));
        $(this).attr("data-img-type","still");
    }
});


// Calling the renderButtons function to display the intial buttons
renderButtons();
