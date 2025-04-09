const words = ['APPLE', 'BANANA', 'ORANGE', 'MANGO', 'GRAPE', 'Pear', 'Kiwi'];
const maxAttempts = 6;
let selectedWord = '';
let attemptsLeft = maxAttempts;
let correctGuesses = [];
let wrongGuesses = [];

document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    document.getElementById('try-again-button').addEventListener('click', initGame);
});

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    attemptsLeft = maxAttempts;
    correctGuesses = Array(selectedWord.length).fill('_');
    correctGuesses[0] = selectedWord[0]; // First letter
    correctGuesses[selectedWord.length - 1] = selectedWord[selectedWord.length - 1]; // Last letter
    wrongGuesses = [];
    
    document.getElementById('word-blanks').innerHTML = correctGuesses.map(letter => `<span class="blank">${letter}</span>`).join('');
    document.getElementById('alphabet-buttons').innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => `<button class="alphabet-button">${letter}</button>`).join('');
    document.getElementById('attempts-left').textContent = `Attempts left: ${attemptsLeft}`;
    document.getElementById('result-message').textContent = '';
    document.getElementById('try-again-button').style.display = 'none';
    
    document.querySelectorAll('.alphabet-button').forEach(button => {
        button.addEventListener('click', handleGuess);
    });
}

function handleGuess(event) {
    const letter = event.target.textContent;
    event.target.classList.add('disabled');
    event.target.disabled = true;
    
    if (selectedWord.includes(letter)) {
        selectedWord.split('').forEach((char, index) => {
            if (char === letter) {
                correctGuesses[index] = letter;
            }
        });
        document.getElementById('word-blanks').innerHTML = correctGuesses.map(letter => `<span class="blank">${letter}</span>`).join('');
        
        if (correctGuesses.join('') === selectedWord) {
            endGame(true);
        }
    } else {
        attemptsLeft--;
        wrongGuesses.push(letter);
        document.getElementById('attempts-left').textContent = `Attempts left: ${attemptsLeft}`;
        
        if (attemptsLeft === 0) {
            endGame(false);
        }
    }
}

function endGame(win) {
    document.getElementById('result-message').textContent = win ? `You won! Wrong attempts: ${wrongGuesses.length}` : `You lost! The word was: ${selectedWord}`;
    document.getElementById('try-again-button').style.display = 'block';
    
    document.querySelectorAll('.alphabet-button').forEach(button => {
        button.removeEventListener('click', handleGuess);
        button.disabled = true;
    });
}