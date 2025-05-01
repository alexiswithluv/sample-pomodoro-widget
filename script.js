let startingMinute = 0;
let isPaused = false;
let time = startingMinute * 60;
let refreshIntervalId = false;  

const pauseBtn = document.getElementById('icon-pause');
const countdownEl = document.getElementById('countdown');
const durationButtons = document.querySelectorAll('.duration-btn');
const resetBtn = document.getElementById('icon-restart');

function updateCountdown() {
    if (!isPaused) {
        if (time <= 0) {
            clearInterval(refreshIntervalId);
            refreshIntervalId = false;
            countdownEl.innerHTML = "00:00";
            text.textContent = 'Time is up! Take a break.';
            return;
        }

        text.textContent = 'you got this!';
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        countdownEl.innerHTML = `${minutes}:${seconds}`;
        time--;
    }
}


function startTimer(minutes){
    clearInterval(refreshIntervalId);
    time = minutes * 60;
    updateCountdown();
    refreshIntervalId = setInterval(updateCountdown, 1000);
}

durationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const minutes = parseInt(button.getAttribute('data-minutes'));
        startTimer(minutes);
    });
});



resetBtn.addEventListener('click', () =>{
    clearInterval(refreshIntervalId);
    refreshIntervalId = false;
    time = startingMinute * 60;

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
});

pauseBtn.addEventListener('click', () => {
    if (isPaused) {
        // Resume timer
        refreshIntervalId = setInterval(updateCountdown, 1000);
        isPaused = false;
        pauseBtn.src = 'assets/icon-pause.png';
    } else {
        // Pause timer
        clearInterval(refreshIntervalId);
        isPaused = true;
        pauseBtn.src = 'assets/icon-play.png';
    }
});
