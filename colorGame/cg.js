// General Vars
var colors = [];
var winningColor;
var numSquares = 6;

// Element Selection
var squares = document.querySelectorAll(".square");
var rgbDisplay = document.getElementById("rgbDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
  setupButtons();
  setupSquares();
  reset();

  // Default to hard mode, set initial winning color
  modeButtons[1].classList.add("selected");
  rgbDisplay.textContent = winningColor;
}

function reset(){
  colors = generateColors(numSquares);
  winningColor = pickColor();
  rgbDisplay.textContent = winningColor;
  for (i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
    }
    else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = null;
}

function changeColors(color){
  for(var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = winningColor;
  }
}

function pickColor(){
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateColors(num){
  var arr = [];
  for(i = 0; i < num; i++){
    arr[i] = randomColor();
  }
  return arr;
}

function randomColor(){
  var red = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function setupButtons(){
  // Mode Button Event Listeners
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
      reset();
    });
  }
  // Reset Button Event Listener
  resetButton.addEventListener("click", function () {
    reset();
  });
}

function setupSquares(){
  // Square Button Event Listeners
  for (i = 0; i < squares.length; i++) {
    // Don't display the sqaures until the colors are picked
    squares[i].style.display = "none";

    // Compare the color of the clicked square with the targed color.
    squares[i].addEventListener("click", function () {
      if (this.style.backgroundColor === winningColor) {
        messageDisplay.textContent = "You WIN!!!!"
        changeColors();
        h1.style.backgroundColor = winningColor;
        resetButton.textContent = "Play Again?";
      }
      else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again"
      }
    });
  }
}
