function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000); // Angka 4 digit dari 1000-9999
}

function startGame() {
    score = 0;
    chances = 3;
    timer = 120;
    scoreDisplay.textContent = score;
    chancesDisplay.textContent = chances;
    startButton.disabled = true;

    gameBoard.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        const randomNumber = generateRandomNumber();
        box.textContent = randomNumber;

        box.addEventListener('click', () => {
            if (isDivisibleBy3(randomNumber)) {
                score++;
                scoreDisplay.textContent = score;
                box.classList.add('correct');
            } else {
                chances--;
                chancesDisplay.textContent = chances;
                box.classList.add('incorrect');
            }
            box.classList.add('clicked');
            if (chances <= 0) {
                endGame();
            }
        });
        gameBoard.appendChild(box);
    }

    gameInterval = setInterval(() => {
        timer--;
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    alert(`Game Over! Skor Anda: ${score} poin.`);
    startButton.disabled = false;
}

startButton.addEventListener('click', startGame);
