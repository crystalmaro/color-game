let numSquares = 6;
let colors = [];
let pickedColor;
// 1)diff between click and pick color:
// 2)click: user's action
// 3)pick: generated by Math.random()
let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay"); 
let messageDisplay = document.querySelector(".message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector(".reset");
let modeButtons = document.querySelectorAll(".mode");
let body = document.querySelector("body");

initial();

function initial(){
  setUpModeButtons();
  setUpSquares();
  reset();
  }

function setUpModeButtons(){
  for(let i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy 3" ? numSquares = 3: numSquares = 6;
// above "ternary operator" works the same as below if/else
// ternary structure order: if, then, otherwise---
// if(this.textContent === "Easy"){
//   numSquares = 3;
// } else {
//   numSquares = 6;
// }
      reset();
    });
}};

function setUpSquares(){
for(let i = 0; i < squares.length; i++){
// add click listeners to squares
  squares[i].addEventListener("click", function(){
// grab color of clicked square (this. refers to squares)
    let clickedColor = this.style.backgroundColor;
// compare color to pickedColor
    if (clickedColor === pickedColor) {
      messageDisplay.textContent = "^_^";
      changeColors(clickedColor);
      h1.style.backgroundColor = clickedColor;
      h1.style.color = "white";
      resetButton.textContent = "Play Again(!)";
      resetButton.classList.add("winner");
      messageDisplay.addEventListener("click", function(){
        reset();
      });
    } else {
// change incorrectly clicked color to background, aka disappear
      this.style.backgroundColor = "#eee9e9";
      messageDisplay.textContent = "-nope-";
    }
  });
}};

function reset(){
// generate all new colors
  colors = generateRandomColors(numSquares);
// pick a new random color from array
  pickedColor = pickColor();
// change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "#eee9e9";
  h1.style.color = "#5b5959";
  resetButton.style.backgroundColor = "white";
  resetButton.style.color = "#5b5959";
  resetButton.classList.remove("winner");
// change colors of squares
  for(let i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
};


resetButton.addEventListener("click", function(){
  reset();
});

// ------- WHAT IS THE LOGIC ??
function changeColors(color){
// loop through all sqaures
for(let i = 0; i < squares.length; i++){
// change each color to match given color
  squares[i].style.backgroundColor = color;
  }
};


// 1)colors.length is defined at top, in the colors variable
// 2)generateRandomColors pushed a num of elements into the colors array
// 3)pickColor is the action of randomly selecting an index from that array
function pickColor(){
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
};


// 1)the parameter num is defined at top, in the colors variable
// 2)let colors = generateRandomColors(num)
function generateRandomColors(num) {
// make an array
  let arr = []
// repeat randonColor() num-1 times
  for(let i = 0; i < num; i++){
// get random color and push into arr
    arr.push(randomColor());
  }
// return that array
  return arr;
}


// 1)* 256, cuz Math.random() returns 0 > num > 256, so 255.decimal
// 2)Math.floor() returns the largest integer less than or equal to a given number
function randomColor(){
// pick a "red" from 0 - 255
  let r = Math.floor(Math.random() * 256);
// pick a "green" from 0 - 255
  let g = Math.floor(Math.random() * 256);
// pick a "blue" from 0 - 255
  let b = Math.floor(Math.random() * 256);
// concatenate above random rgb value
  return "rgb(" + r + ", " + g + ", " + b + ")";
}