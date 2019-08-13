// alert("asdfasdf")

var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var reset = document.querySelector("#reset");
var scoreInput = document.querySelector("#scoreInput");
var h1 = document.querySelector("h1");
var p1span = document.getElementById("p1span");
var p2span = document.getElementById("p2span");
var maxScoreSpan = document.getElementById("maxScore");

var p1score = 0;
var p2score = 0;
var maxScore = 7;
var gameOver = false;

// Updates main h1 header to reflect new score
function updateText(){
  p1span.textContent = p1score;
  p2span.textContent = p2score;
  // Continue game if max score is updated to a new higher value
  if (p1score >= maxScore) {
    p1span.style.color = "green";
    gameOver = true;
  }
  else if (p2score >= maxScore) {
    p2span.style.color = "green";
    gameOver = true;
  }
  else {
    p1span.style.color = "black";
    p2span.style.color = "black";
    gameOver = false;
    return;
  }
};

//Button Click Event Listeners
p1Button.addEventListener("click", function(){
  if (!gameOver) {
    p1score++;
  }
  updateText();
});

p2Button.addEventListener("click", function(){
  if (!gameOver){
    p2score++;
  }
  updateText();
});

reset.addEventListener("click", function(){
  p1score = 0;
  p2score = 0;
  updateText();
});

scoreInput.addEventListener("input", function(){
  maxScoreSpan.textContent = scoreInput.value;
  maxScore = scoreInput.value;
  updateText();
});
