//Create a list that holds all of your cards

var cardList = $(".card");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var shuffledArray = shuffle(cardList);

for (let i = 0; i < shuffledArray.length; i++) {
    $(".deck").append(shuffledArray[i]);
}

//update the timer

var seconds = Number($("#seconds").text());
var minutes = Number($("#minutes").text());

function updateSeconds() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        $("#seconds").text("0" + String(seconds));
    }
    if (seconds < 10) {
        seconds = "0" + String(seconds);
        $("#seconds").text(seconds);
    }
    $("#seconds").text(String(seconds));
}

function updateMinutes() {
    minutes++;
    if (minutes < 10) {
        minutes = "0" + String(minutes);
        $("#minutes").text(minutes);
    }
    $("#minutes").text(String(minutes));
}

var secondsIntervalId;
var minutesIntervalId;

//An array to keep track of the first clicked card to fire the timer

var fireTimer = [];

//An array to store the class of the icon clicked

var openedIcons = [];

//An array to store the clicked cards

var openedCards = [];

//An array to track how pair of matched cards have been found

var matchedCards = [];

var moves = Number($(".moves").text());

$(".card").click(function (event) {

    //start the timer when the player clicks on the first tile

    fireTimer.push("click");
    if (fireTimer.length === 1) {
        secondsIntervalId = setInterval(updateSeconds, 1000);
        minutesIntervalId = setInterval(updateMinutes, 60000);
    }

    //open the clicked card and store it and its icon class 

    if ($(this).hasClass("open show") === false) {
        $(this).addClass("open show");
        openedIcons.push($(this).children().attr("class"));
        openedCards.push($(this));
    }

    if (openedCards.length === 2) {

        //compare the two cards

        if ($(this).children().attr("class") === openedIcons[openedIcons.length - 2]) {
            $(this).addClass("match");
            openedCards[openedCards.length - 2].addClass("match");
            matchedCards.push("matched");
        } else {
            setTimeout(function wait() {
                $(".card").removeClass("open show");
            }, 150);
        }

        openedCards = [];
        openedIcons = [];

        //calculate the number of moves and adjust the star rate accordingly 

        moves++;
        $(".moves").text(String(moves));

        if (moves === 17) {
            $(".stars i").last().attr("class", "fa fa-star-o");
        }

        if (moves === 22) {
            $(".stars li:nth-child(2) i").attr("class", "fa fa-star-o");
        }

        //When the player wins, Show the modal and its content

        if (matchedCards.length === 8) {

            //Stop the timer

            clearInterval(secondsIntervalId);
            clearInterval(minutesIntervalId);

            //display A congratulations message, time passed, star rate and number of moves made

            var timer = $("#timer").text();
            var stars = $(".stars").html();
            $(".modal").css("display", "block");
            $("#finish").text(timer);
            $("#rating").html(stars);
            $("#moves").text(String(moves));
        }
    }
});

//the reset function

function reset() {
    var shuffledArray = shuffle(cardList);
    for (let i = 0; i < shuffledArray.length; i++) {
        $(".deck").append(shuffledArray[i]);
    }
    $(".card").removeClass("open show match");
    clearInterval(secondsIntervalId);
    clearInterval(minutesIntervalId);
    seconds = 0;
    $("#seconds").text("0" + String(seconds));
    minutes = 0;
    $("#minutes").text("0" + String(minutes));
    $(".stars").html('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star second-star"></i></li><li><i class="fa fa-star"></i></li>');
    moves = 0;
    $(".moves").text(String(moves));
    fireTimer = [];
    matchedCards = [];
    openedCards = [];
    openedIcons = [];
}

//when clicking the play-again button

$("input").click(function () {
    $(".modal").css("display", "none");
    $("#finish").empty();
    $("#rating").empty();
    reset();
});

//when clicking restart 

$(".restart").click(function (event) {
    reset();
});
