// JavaScript source code

//variables
//Document HTML
let hoursSection = document.getElementById("horas");
let minsSection = document.getElementById("minutos");
let secsSection = document.getElementById("segundos");

let playButton = document.getElementById("playButton");
let resetButton = document.getElementById("resetButton");

//functional variables
let hours = parseInt(hoursSection.innerHTML);
let mins = parseInt(minsSection.innerHTML);
let secs = parseInt(secsSection.innerHTML);
let intervalId;


function passToHTML() {
    hoursSection.innerHTML = hours < 10 ? '0' + hours : hours;
    minsSection.innerHTML = mins < 10 ? '0' + mins : mins;
    secsSection.innerHTML = secs < 10 ? '0' + secs : secs;
}

function timer() {
    if (secs == 0 && mins == 0 && hours == 0) {
        stop();
        return;
    }
    
    if (secs == 0) {
        secs = 59;
        if (mins == 0) {
            mins = 59;
            hours -= 1;
        } else mins -= 1;
    } else secs -= 1;

    passToHTML();
}
function start() {
    if (!intervalId) {
        intervalId = setInterval(timer, 1000);
        playButton.innerHTML = "Stop";
    }
    else {
        stop();
    }
}

function stop() {
    clearInterval(intervalId);
    intervalId = null;
    playButton.innerHTML = "Start";
}


playButton.addEventListener("click", start);
//resetButton.addEventListener("click", reset);


