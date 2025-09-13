const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const chancesDisplay = document.getElementById('chances');

let score = 0;
let chances = 3;
let timer = 120; // 2 menit
let gameInterval;
let isGameActive = false; // Status game

function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000); // Angka 4 digit dari 1000-9999
}

function isDivisibleBy3(number) {
    // Mengecek apakah jumlah digitnya habis dibagi 3
    // Ini adalah metode yang lebih efisien daripada modulo untuk bilangan besar
    const sumOfDigits = String(number).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    return sumOfDigits % 3 === 0;
}

// Fungsi untuk membuat dan mengisi papan permainan
function createGameBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        const randomNumber = generateRandomNumber();
        box.textContent = randomNumber;

        box.addEventListener('click', () => {
            // Abaikan klik jika game belum aktif atau kotak sudah diklik
            if (!isGameActive || box.classList.contains('clicked')) {
                return;
            }

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
}

// Fungsi untuk memulai timer dan status game
function startGame() {
    if (isGameActive) {
        return; // Mencegah game dimulai dua kali
    }

    score = 0;
    chances = 3;
    timer = 120;
    scoreDisplay.textContent = score;
    chancesDisplay.textContent = chances;
    startButton.disabled = true;
    isGameActive = true;

    // Reset warna dan klik pada semua kotak
    document.querySelectorAll('.box').forEach(box => {
        box.classList.remove('correct', 'incorrect', 'clicked');
    });

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
    isGameActive = false;
    alert(`Game Over! Skor Anda: ${score} poin.`);
    startButton.disabled = false;
}

// Panggil fungsi untuk membuat papan saat halaman dimuat
document.addEventListener('DOMContentLoaded', createGameBoard);

// Tambahkan event listener untuk tombol "Mulai Permainan"
startButton.addEventListener('click', () => {
    // Jika game sudah selesai, buat papan baru (reset)
    if (!isGameActive) {
        createGameBoard();
    }
    startGame();
});
