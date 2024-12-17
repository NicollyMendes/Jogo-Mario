const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');
const scoreDisplay = document.querySelector('.score'); 
const finalScoreDisplay = document.querySelector('.final-score'); 
const restartButton = document.querySelector('.restart-button'); 

let score = 0; 
let gameLoop; 

audioStart = new Audio('./src/soung/audio_theme.mp3');
audioGameOver = new Audio('./src/soung/audio_gameover.mp3');

const startGame = () => {
    pipe.classList.add('pipe-animation');
    start.style.display = 'none';
    gameOver.style.display = 'none';

    audioStart.play();
    audioStart.currentTime = 0;

    // Reinicia a pontuação
    score = 0;
    updateScore();

    // Inicia o loop
    if (gameLoop) clearInterval(gameLoop);
    loop();
}

const restartGame = () => {
    // Exibe o Mario novamente
    mario.src = './img/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';

    // Reinicia o cenário
    gameOver.style.display = 'none';
    pipe.style.left = '';
    pipe.style.right = '0';
    pipe.classList.add('pipe-animation'); // Pipe começa a animar de novo

    // Reinicia os áudios
    audioGameOver.pause();
    audioGameOver.currentTime = 0;

    audioStart.play();
    audioStart.currentTime = 0;

    // Remove qualquer classe de "pulo" que o Mario tenha
    mario.classList.remove('jump');

    // Reinicia a pontuação
    score = 0;
    updateScore();

    // Reinicia o loop do jogo
    if (gameLoop) clearInterval(gameLoop);
    loop();
}

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 800);
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
            // Se o jogador não perder, a pontuação aumenta
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

// Escutadores de eventos
document.addEventListener('keypress', e => {
    if (e.key === ' ') jump();
});

document.addEventListener('touchstart', e => {
    if (e.touches.length) jump();
});

document.addEventListener('keypress', e => {
    if (e.key === 'Enter') startGame();
});