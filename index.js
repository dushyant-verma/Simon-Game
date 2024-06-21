const buttons = document.querySelectorAll('.btn');
const scoreDisplay = document.querySelector('.score');
const startBtn = document.querySelector('.start');
const strictCheckbox = document.getElementById('strict');

let sequence = [];
let userSequence = [];
let level = 1;
let isPlaying = false;
let strictMode = false;

function playSound(color) {
    const audio = new Audio();
    switch (color) {
        case 'green':
            audio.src = 'Audio files/level-up-bonus-sequence-1-186890.mp3';
            break;
        case 'red':
            audio.src = 'Audio files/collect-points-190037.mp3';
            break;
        case 'yellow':
            audio.src = 'Audio files/game-bonus-144751.mp3';
            break;
        case 'blue':
            audio.src = 'Audio files/level-up-bonus-sequence-2-186891.mp3';
            break;
    }
    audio.play();
}

function lightButton(color, delay) {
    setTimeout(() => {
        const button = document.querySelector(`.${color}`);
        button.classList.add('active');
        playSound(color);
        setTimeout(() => button.classList.remove('active'), 300);
    }, delay);
}

function generateSequence() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    level++;
    scoreDisplay.textContent = `Score: ${level - 1}`;
}

function playSequence() {
    for (let i = 0; i < sequence.length; i++) {
        lightButton(sequence[i], i * 500);
    }
}

function handleUserInput(event) {
    if (!isPlaying) return;

    const clickedColor = event.target.classList[1];
    userSequence.push(clickedColor);
    playSound(clickedColor);

    if (!checkUserSequence()) {
        if (strictMode) {
            alert('Game Over!');
            resetGame();
        } else {
            alert('Wrong move! Try again.');
            userSequence = [];
            playSequence();
        }
        return;
    }

    if (userSequence.length === sequence.length) {
        userSequence = [];
        setTimeout(() => {
            generateSequence();
            playSequence();
        }, 1000);
    }
}

function checkUserSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

function resetGame() {
    sequence = [];
    userSequence = [];
    level = 1;
    isPlaying = false;
    scoreDisplay.textContent = 'Score: 0';
}

function startGame() {
    resetGame();
    strictMode = strictCheckbox.checked;
    isPlaying = true;
    generateSequence();
    playSequence();
}

startBtn.addEventListener('click', startGame);
buttons.forEach(button => button.addEventListener('click', handleUserInput));
