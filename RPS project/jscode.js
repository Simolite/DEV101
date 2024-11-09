let userNum = 0;
let rdNum = 0;
let resultNum = 0;
let result='';
let pcMove ='';
let pilote_rnd = 0;
let counter = 0;
let piloteID;
score_verify();
function game(){
if (Math.random()<=1/3){
    rdNum = 1;
    pcMove = 'rock';
} else if (Math.random()<=2/3){
    rdNum = 2;
    pcMove = 'paper';
} else {
    rdNum = 3;
    pcMove = 'scissors';
};
resultNum = userNum - rdNum ;
if (resultNum === 0){
    result = `Tie both you and the computer picked <span> ${pcMove}</span>`;
    wlt.ties ++;
}else if (resultNum === 1 || resultNum === -2){
    result = `You Won !! you picked <span>${userMove}</span> and the coputer picked <span>${pcMove}</span>`;
    wlt.wins ++;
}else{
    result = `You lost you picked <span>${userMove}</span> and the coputer picked <span>${pcMove}</span>`;
    wlt.loses ++;
};
localStorage.setItem('wltN',JSON.stringify(wlt));
document.querySelector(".wins_text").innerHTML = wlt.wins;
document.querySelector(".loses_text").innerHTML = wlt.loses;
document.querySelector(".ties_text").innerHTML = wlt.ties;
round_details ();
return result,resultNum,userMove;
};
function rock(){
userMove='rock';
userNum=1;
game();
};
function paper(){
userMove='paper';
userNum=2;
game();
};
function scissors(){
userMove='scissors';
userNum=3;
game();
};
function score(){
score_verify();
wlt = JSON.parse(localStorage.getItem('wltN')) || {wins : 0,loses : 0,ties : 0};
alert(`You have won ${wlt.wins} times ,loste ${wlt.loses} times and tied ${wlt.ties} tiems`)
};
function resetScore(){
localStorage.removeItem('wltN');    
score_verify();    
document.querySelector(".wins_text").innerHTML = wlt.wins;
document.querySelector(".loses_text").innerHTML = wlt.loses;
document.querySelector(".ties_text").innerHTML = wlt.ties;
document.querySelector('.round_details').innerHTML= "Chose <span>rock</span> , <span>paper</span> or <span>scissors</span> to play the game";
};
let rps = {
rock,
paper,
scissors,
};
function score_verify (){
wlt = JSON.parse(localStorage.getItem('wltN')) || {wins : 0,loses : 0,ties : 0};
};
function score_updater () {
score_verify();
document.querySelector(".wins_text").innerHTML = wlt.wins;
document.querySelector(".loses_text").innerHTML = wlt.loses;
document.querySelector(".ties_text").innerHTML = wlt.ties;
};
function round_details () {
document.querySelector('.round_details').innerHTML= result;
document.querySelector('.user_move_icon').innerHTML= `<img src="icones/${userMove}.svg" alt="user_move_icon">`;document.querySelector('.pc_move_icon').innerHTML= `<img src="icones/${pcMove}.svg" alt="user_move_icon">`;
};
function auto_play(){
    pilote_rnd = Math.random();
    if(pilote_rnd <= 1/3){
        rps.rock();
    }else if (pilote_rnd <= 2/3){
        rps.paper();
    }else{
        rps.scissors();
    };
    counter++;
    return counter;
};
function auto_pilote (){
    document.querySelector(`.auto_pilote`).innerHTML=`<button onclick="stop_auto_pilote();"> Stop Auto Pilote</button>`;
    piloteID = setInterval(auto_play,1000);
    return piloteID;
};
function stop_auto_pilote(){
    document.querySelector(`.auto_pilote`).innerHTML=`<button onclick="auto_pilote();">Auto Pilote</button>`;
    clearInterval(piloteID);
    alert(`The auto pilote played ${counter} times`);
    return counter = 0;
};