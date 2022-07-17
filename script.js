const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
// for local storage, will be added as additional info for developers due to not being able to click the card once you match it
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if (noClicking) return;
  if(event.target.classList.contains('flipped')) return;

  // clicked card will change background color to match class
  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    // conditional ternary operator
    card2 = currentCard === card1 ? null : currentCard;
  }
  
  // executes if card1 & card2 are both truthy
  if (card1 && card2) {
    // changes variable noClicking from false to true
    noClicking = true;
    // define variables with className property
    let gif1 = card1.className;
    let gif2 = card2.className;
    // conditional if card1 & card2 have the same class name 
    if (gif1 === gif2) {
      // User can only pick 2 cards at a time
      cardsFlipped += 2;
      //removes the event listener on the 2 cards picked
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);

      card1 = null;
      card2 = null;
      noClicking = false;
    }
    else {
      // set 1 second after selecting 2nd card. Will turn cards back to white if they are not pairs
      setTimeout(function() {
        // removes class names from card1 & card2
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        // set background color for both cards to white
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        // set the card back to null 
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }     
}
if (cardsFlipped === COLORS.length) alert("game over!");

// when the DOM loads
createDivsForColors(shuffledColors);

/* */