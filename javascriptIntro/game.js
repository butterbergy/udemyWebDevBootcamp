// Create secret number
var secretNumber = 4;

// Ask user for guess
var guess = Number(prompt("Guess a number."));

// Check guess
if (guess === secretNumber) {
    alert("CORRECT!");
}
else if (guess > secretNumber) {
    alert("TOO HIGH");
}
else {
    alert("TOO LOW");
}
