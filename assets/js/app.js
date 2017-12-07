//jquery container

$( document ).ready(function() {

//start variables for buttons
var animals = ["puppies", "tiger", "liger", "puma", "fox"];


//creates buttons
function buttonSet() {
	$("#buttons-view").empty();
	for (var i = 0; i < animals.length; i++){
		var gifButton = $("<button>");
		gifButton.addClass("animal");
		gifButton.attr("data-name", animals[i]);
		gifButton.text(animals[i]);
		$("#buttons-view").append(gifButton);
	}
}

//listener for events

$(document).on("click", ".animal", animatedPull);

$(document).on("click", ".image", function(){
var state = $(this).attr("data-state");


});

buttonSet();
newButton();

//calls api, loops from button press to search api, outputs images and rating to the page
function animatedPull() {
	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=RhlloSkF2KMuA3TRcdt0a4uWLWfwdLNo&q=" + animal + "&limit=10&offset=0&rating=PG&lang=en";
	console.log(queryURL);
		$.ajax({
        url: queryURL,
        method: 'GET'
    })

	.done(function(response){
		console.log(response);
		$("#animals-view").empty();
		var output = response.data;

		console.log("output: " + output);

		for (var i=0; i < output.length; i++){

	var imageUrl = output.image_original_url;

	var pulledImage = $("<img>");
	var ratingText = $("<h2>");

	pulledImage.attr("src", output[i].images.downsized_still.url);
	pulledImage.addClass("imageDiv");
    pulledImage.attr("alt", "animated-images");
    pulledImage.attr("data-still", output[i].images.downsized_still.url);
    pulledImage.attr("data-animate", output[i].images.downsized.url);
    pulledImage.attr("data-state", "still");

    ratingText.text("Rating: " + output[i].rating);

	$("#animals-view").prepend(pulledImage);
	$("#animals-view").prepend(ratingText);	
}
	});
		}

//creates new button on page, adds to animal array
function newButton(){
$("#add-animal").on("click", function(event){
	event.preventDefault();
	var animal = $("#animal-input").val().trim();
	if (animal == ""){
		return false;
	}
	animals.push(animal);
	buttonSet();

});
};

//clicking image switches from still state and still version pull from the api  to the animated state and pull from api
$(document).on("click", ".animal", animatedPull);
$(document).on("click", ".imageDiv", function(){
	var state = $(this).attr('data-state');
	if (state === "still"){
		$(this).attr("src", $(this).data('animate'));
		$(this).attr("data-state", 'animate');
	}else{
		$(this).attr("src", $(this).data("still"));
		$(this).attr("data-state", "still");
	}
	

});




});


