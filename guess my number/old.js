const body = document.body;
const inp = document.querySelector('#numInp');
const checkBtn = document.querySelector('.check-btn');
const res = document.querySelector('.high-or-low');
const score = document.getElementById('scs');
const highscore = document.getElementById('hss');
const middleBox = document.querySelector('.middle-box');
const againBtn = document.querySelector('.again');
const resethighscore = document.querySelector('.upper-paragraph');
const h1 = document.querySelector('#h1')

function generateRandN(){
    let rand = Math.trunc(Math.random() * 50);
    if (rand === 0){
        rand = Math.trunc(Math.random() * 50);
    };
    return rand;
}
let randRes = generateRandN();

function checkIfCompatible(){
    if (!inp.value){res.innerHTML = 'Please inter a number first'}
    else if (score.innerHTML == '1'){
        if (inp.value == randRes){
            youWin()
        }else gameover()
    }
    else{
        let closeDistance;
        if (inp.value < randRes){
            closeDistance = randRes - inp.value; // too low
            
        }else if (inp.value > randRes){
            closeDistance = inp.value - randRes; //too high  
        }
    
    
        if(inp.value == randRes){
            youWin()
    
        }else if (inp.value > randRes){
            resetStyle ()
            decreceScore()
            if(closeDistance <= '5'){
                res.innerHTML = 'you\'re close but still high'
            }else{
                res.innerHTML = 'Too high '
            }
        }else if (inp.value < randRes) {
            resetStyle ()
            decreceScore()
            if(closeDistance >= '5'){
                res.innerHTML = 'Too low'
            }else{
                res.innerHTML = 'you\'re close but still low'
            }
        }
    
    
    }
}
function youWin(){
    res.innerHTML = 'Correct number !'
    body.style.backgroundColor = '#56AA3F';
    middleBox.innerHTML = inp.value;
    inp.style.backgroundColor = '#56AA3F'
    checkBtn.style.display = 'none'
    inp.value = null;
    saveHighScore();
}

function decreceScore(){
    score.innerHTML-= 1;
}

function saveHighScore(){
    let hsArr;
    if (!localStorage.getItem('highscore')){
        hsArr = [];
    }
    else {
        hsArr = JSON.parse(localStorage.getItem('highscore'));
    }
    if (Number(highscore.innerHTML) < Number(score.innerHTML)){
        highscore.innerHTML = score.innerHTML;
        hsArr[0] = highscore.innerHTML;
        localStorage.setItem('highscore' , JSON.stringify(hsArr))
    }else false;

}

function getHighScore(){
    if (localStorage.getItem('highscore') === null){
        highscore.innerHTML = 0;
    }else{
        highscore.innerHTML = JSON.parse(localStorage.getItem('highscore'))
    }
}

function resetStyle (){
    body.style.backgroundColor = '#201F20'
    middleBox.innerHTML = '?'
    middleBox.style.width = '150px';
    inp.style.backgroundColor = '#201F20'
    checkBtn.style.display = 'block'
}

function reset(){
    h1.innerHTML = 'Guess my number !'
    inp.value = null;
    res.innerHTML = 'Good luck!';
    score.innerHTML = '5';
    randRes = generateRandN();
    resetStyle ()
    getHighScore()
    
}

function resHs(){
    localStorage.removeItem('highscore')
    highscore.innerHTML = '0';
}
function gameover(){
h1.innerHTML = 'Game over !'
checkBtn.style.display = 'none'
res.innerHTML = 'you failed!'
inp.value = null;
score.innerHTML = '0'
}

document.addEventListener("DOMContentLoaded", getHighScore);
checkBtn.addEventListener('click' , checkIfCompatible);
againBtn.addEventListener('click' , reset)
resethighscore.addEventListener('click' , resHs)

