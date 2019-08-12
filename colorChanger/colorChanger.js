var button = document.querySelector("button");
var isPurple = false;
// GOAL: Create JS to switch from purple to
// white on every button click

button.addEventListener("click", changeColor);
var isPurple = false;

// Solution 1: Toggle using a boolean tracking the current color
// function changeColor(){
//   if(isPurple){
//     document.body.style.background = "white";
//   }
//   else{
//     document.body.style.background = "purple";
//   }
//   isPurple = !isPurple;
// }

// Solution 2: Toggle the CSS class on and off
function changeColor() {
  document.body.classList.toggle("purple");
}
