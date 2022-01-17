const body = document.body;
const input = document.querySelector("#numInp");
const checkBtn = document.querySelector(".check-btn");
const result = document.querySelector(".high-or-low");
const score = document.getElementById("scs");
const highscore = document.getElementById("hss");
const middleBox = document.querySelector(".middle-box");
const againBtn = document.querySelector(".again");
const resethighscore = document.querySelector(".upper-paragraph");
const h1 = document.querySelector("#h1");

function generateRandN() {
  let rand = Math.trunc(Math.random() * 50) + 1;
  return rand;
}

let randomNum = generateRandN();

function checkIfEmpty() {
  !input.value
    ? displayMessage("Please enter a number first!")
    : lastTry();
}

function lastTry() {
  score.innerHTML == "1"
    ? input.value == randomNum
      ? youWin()
      : gameover()
    : continueChecking();
}

function continueChecking() {
  let difference;
  difference =
    input.value < randomNum ? randomNum - input.value : input.value - randomNum;

  switch (true) {
    case input.value == randomNum:
      youWin(); break;
    case input.value > randomNum:
      decreaseScore();
      difference <= "5"
        ? displayMessage("you're close but still high")
        : displayMessage("Too high"); break;
    case input.value < randomNum:
      decreaseScore();
      difference <= "5"
        ? displayMessage("you're close but still low")
        : displayMessage("Too low"); break;
  }
}

function displayMessage(message) {
  result.innerHTML = message;
}

function youWin() {
  displayMessage("Correct number !");
  body.style.backgroundColor = "#56AA3F";
  middleBox.innerHTML = input.value;
  input.style.backgroundColor = "#56AA3F";
  checkBtn.style.display = "none";
  input.value = null;
  checkLocalStorage();
}

function decreaseScore() {
  score.innerHTML -= 1;
}

function checkLocalStorage() {
  let highscoreArray;
  highscoreArray = !localStorage.getItem("highscore")
    ? []
    : JSON.parse(localStorage.getItem("highscore"));

    Number(highscore.innerHTML) < Number(score.innerHTML) ? saveHighScore(highscoreArray) :false;

}

function saveHighScore(arr){
    highscore.innerHTML = score.innerHTML;
    arr[0] = highscore.innerHTML;
    localStorage.setItem("highscore", JSON.stringify(arr));
}

function getHighScore() {
    !localStorage.getItem("highscore") 
    ? highscore.innerHTML = 0 
    : highscore.innerHTML = JSON.parse(localStorage.getItem("highscore"));
}

function resetStyle() {
  body.style.backgroundColor = "#201F20";
  middleBox.innerHTML = "?";
  middleBox.style.width = "150px";
  input.style.backgroundColor = "#201F20";
  checkBtn.style.display = "block";
}

function reset() {
  h1.innerHTML = "Guess My Number !";
  input.value = null;
  displayMessage("Good luck!");
  score.innerHTML = "5";
  randomNum = generateRandN();
  resetStyle();
  getHighScore();
}

function resHs() {
  localStorage.removeItem("highscore");
  highscore.innerHTML = "0";
}

function gameover() {
  h1.innerHTML = "Game over !";
  checkBtn.style.display = "none";
  displayMessage("you failed!");
  input.value = null;
  score.innerHTML = "0";
}

document.addEventListener("DOMContentLoaded", getHighScore);
checkBtn.addEventListener("click", checkIfEmpty);
againBtn.addEventListener("click", reset);
resethighscore.addEventListener("click", resHs);
console.log(randomNum);