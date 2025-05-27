let randomNumber = parseInt(Math.random() * 100 + 1);
let submit = document.querySelector('#submit');
let userInput = document.querySelector('#guessField');
let guessSlot = document.querySelector('.guesses');
let remaining = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');
let startOver = document.querySelector('.resultParas');

let p = document.createElement('p');
let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please enter a valid number!");
    } else if (guess < 1 || guess > 100) {
        alert("Please enter a number in range 1-100!");
    } else {
        prevGuess.push(guess);
        if (numGuess === 11) {
            cleanUpGuess(guess);
            displayMessage(`Game Over! The correct number was ${randomNumber}`);
            endGame();
        } else {
            cleanUpGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage("You guessed it right!");
        endGame();
    } else if (guess < randomNumber) {
        displayMessage("You guessed too low!");
    } else {
        displayMessage("You guessed too high!");
    }
}

function cleanUpGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', true);
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGameButton">Start new game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGameButton');
    newGameButton.addEventListener("click", function () {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}
