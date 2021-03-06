// Initialize Firebase
var config = {
    apiKey: "AIzaSyB6bNBWNgILtdmnACejNKQSvK_Qa0WMWRk",
    authDomain: "hotplate-95b9e.firebaseapp.com",
    databaseURL: "https://hotplate-95b9e.firebaseio.com",
    projectId: "hotplate-95b9e",
    storageBucket: "hotplate-95b9e.appspot.com",
    messagingSenderId: "653620030609"
};
firebase.initializeApp(config);

var database = firebase.database();
var likedRestaurants = [];

database.ref().on("value", function(snapshot) {
    likedRestaurants = snapshot.val().liked;

    //Populate the previously liked restaurants.
    populateLikes();

// If any errors are experienced, log them to console.
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left'
    });
    //end nav bar
});

function populateLikes() {
    for (i = 0; i < likedRestaurants.length; i++) {

        var colDiv = $("<div>");
        colDiv.addClass("col s4");
        colDiv.attr("id", "colDiv" + i);

        var cardDiv = $("<div>");
        cardDiv.addClass("card");
        cardDiv.attr("id", "cardDiv" + i);

        var cardImgDiv = $("<div>");
        cardImgDiv.addClass("card-image waves-effect waves-block waves-light");
        cardImgDiv.attr("id", "cardImgDiv" + i);

        var cardImg = $("<img>");
        cardImg.addClass("activator");
        cardImg.attr("src", likedRestaurants[i].image_url);
        cardImg.attr("id", "cardImg" + i);

        var cardContentDiv = $("<div>");
        cardContentDiv.addClass("card-content");
        cardContentDiv.attr("id", "cardContentDiv" + i);

        var cardContentSpan = $("<span>");
        cardContentSpan.addClass("card-title activator grey-text text-darken-4");
        cardContentSpan.text(likedRestaurants[i].name);
        cardContentSpan.attr("id", "cardContentSpan" + i);

        var spanI = $("<i>");
        spanI.addClass("material-icons right getHealth");
        spanI.text("restaurant");
        spanI.attr("id", "spanI" + i);
        spanI.attr("data-name", likedRestaurants[i].name);

        var contentP = $("<p>");
        contentP.attr("id", "contentP" + i);

        var pLink = $("<a>");
        pLink.attr("href", likedRestaurants[i].url);
        pLink.attr("target", "_blank");
        pLink.text(likedRestaurants[i].name + " Website");
        pLink.attr("id", "pLink" + i);

        var cardRevealDiv = $("<div>");
        cardRevealDiv.addClass("card-reveal");
        cardRevealDiv.attr("id", "cardRevealDiv" + i);

        var cardRevealSpan = $("<span>");
        cardRevealSpan.addClass("card-title grey-text text-darken-4");
        cardRevealSpan.text(likedRestaurants[i].name);
        cardRevealSpan.attr("id", "cardRevealSpan" + i);

        var revealI = $("<i>");
        revealI.addClass("material-icons right");
        revealI.text("close");
        revealI.attr("id", "revealI" + i);

        var revealRating = $("<p>");
        revealRating.text(likedRestaurants[i].rating + "/5");
        revealRating.attr("id", "revealRating" + i);

        var revealGenre = $("<p>");
        revealGenre.text(likedRestaurants[i].categories[0].title);
        revealGenre.attr("id", "revealGenre" + i);

        var revealPrice = $("<p>");
        revealPrice.text(likedRestaurants[i].price);
        revealPrice.attr("id", "revealPrice" + i);

        var revealAddress = $("<p>");
        revealAddress.text(likedRestaurants[i].location.display_address);
        revealAddress.attr("id", "revealAddress" + i);

        var revealHealthScore = $("<p>");
        revealHealthScore.text("");
        revealHealthScore.attr("id", likedRestaurants[i].name.replace(/ +/g, ""));

        $("#favsGoHere").append(colDiv);
        $("#colDiv" + i).append(cardDiv);
        $("#cardDiv" + i).append(cardImgDiv);
        $("#cardDiv" + i).append(cardContentDiv);
        $("#cardDiv" + i).append(cardRevealDiv);
        // $("#cardDiv" + i).append(cardSmall);
        $("#cardImgDiv" + i).append(cardImg);
        $("#cardContentDiv" + i).append(cardContentSpan);
        $("#cardContentSpan" + i).append(spanI);
        $("#cardContentDiv" + i).append(contentP);
        $("#contentP" + i).append(pLink);
        $("#cardRevealDiv" + i).append(cardRevealSpan);
        $("#cardRevealSpan" + i).append(revealI);
        $("#cardRevealDiv" + i).append(revealRating);
        $("#cardRevealDiv" + i).append(revealGenre);
        $("#cardRevealDiv" + i).append(revealPrice);
        $("#cardRevealDiv" + i).append(revealAddress);
        $("#cardRevealDiv" + i).append(revealHealthScore);
    }
}

function getHealthScore(search) {
    var queryUrl = "https://data.austintexas.gov/resource/nguv-n54k.json?$q=" + search;
    $.ajax({
    url: queryUrl,
    type: "GET",
    data: {
        "$limit" : 1,
        "$$app_token" : "i03YK9NGI8Vg6d6pqTTHndSeF"
    }
    }).done(function(data) {
        $("#" + search.replace(/ +/g, "")).text("Health Score: " + data[0].score);
    });
}

$(document).on("click", ".getHealth", function () {
    getHealthScore($(this).data("name"));
    }
);

