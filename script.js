const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');
const scoreDisplay = document.querySelector('.score'); 
const finalScoreDisplay = document.querySelector('.final-score'); 
const restartButton = document.querySelector('.restart-button'); 

let score = 0; 
let gameLoop; 
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // Detecta se está em um dispositivo móvel

audioStart = new Audio('./src/soung/audio_theme.mp3');
audioGameOver = new Audio('./src/soung/audio_gameover.mp3');

const startGame = () => {
    pipe.classList.add('pipe-animation');
    start.style.display = 'none';
    gameOver.style.display = 'none';

    audioStart.play();
    audioStart.currentTime = 0;

    score = 0;
    updateScore();

    if (gameLoop) clearInterval(gameLoop);
    loop();
}

const restartGame = () => {
    mario.src = './img/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';

    gameOver.style.display = 'none';
    pipe.style.left = '';
    pipe.style.right = '0';
    pipe.classList.add('pipe-animation'); 

    audioGameOver.pause();
    audioGameOver.currentTime = 0;

    audioStart.play();
    audioStart.currentTime = 0;

    mario.classList.remove('jump');

    score = 0;
    updateScore();

    if (gameLoop) clearInterval(gameLoop);
    loop();
}

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');

        // Se for dispositivo móvel, aumenta a altura do pulo
        if (isMobile) {
            mario.style.animation = 'jump-mobile 1200ms ease-out';
        } else {
            mario.style.animation = 'jump 1000ms ease-out';
        }

        setTimeout(() => {
            mario.classList.remove('jump');
            mario.style.animation = ''; 
        }, 1200);
    }
}

const loop = () => {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.classList.remove('pipe-animation');
            pipe.style.left = `${pipePosition}px`;

            mario.classList.remove('jump');
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './img/game-over.png';
            mario.style.width = '80px';
            mario.style.marginLeft = '50px';

            stopAudioStart();
            audioGameOver.play();

            gameOver.style.display = 'flex';
            finalScoreDisplay.innerText = `Pontuação Final: ${score}`; 

            clearInterval(gameLoop);
        } else {
            score++;
            updateScore();
        }
    }, 10);
}

const stopAudioStart = () => {
    audioStart.pause();
}

const updateScore = () => {
    scoreDisplay.innerText = `Pontuação: ${score}`; 
}

document.addEventListener('keypress', e => {
    if (e.key === ' ') jump();
});

document.addEventListener('touchstart', e => {
    if (e.touches.length) jump();
});

document.addEventListener('keypress', e => {
    if (e.key === 'Enter') startGame();
});