let playerScore = 0;
let computerScore = 0;
let ties = 0;
let gameOver = false;
const gameChoices = ['rock', 'paper', 'scissors'];

function playRound(playerSelection, computerChoice) {
    if (gameOver) return;

    let result = document.querySelector(".result");
    console.log(`Player chose: ${playerSelection}, Computer chose: ${computerChoice}`);
    
    if (playerSelection === computerChoice) {
        ties++;
        result.textContent = `It's a draw! Both chose ${playerSelection}.`;
    } else if (
        (playerSelection === "rock" && computerChoice === "scissors") ||
        (playerSelection === "paper" && computerChoice === "rock") ||
        (playerSelection === "scissors" && computerChoice === "paper")
    ) {
        playerScore++;
        result.textContent = `You win! ${playerSelection} beats ${computerChoice}.`;
    } else {
        computerScore++;
        result.textContent = `You lose! ${computerChoice} beats ${playerSelection}.`;
    }

    updateScoreboard();

    if (playerScore >= 5 || computerScore >= 5) {
        gameOver = true;
        displayFinalResult(playerScore >= 5 ? "You win the game!" : "Computer wins the game!");
    }
}

function updateScoreboard() {
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('draw-score').textContent = ties;
    document.getElementById('computer-score').textContent = computerScore;
}

function displayFinalResult(message) {
    const finalResultDiv = document.querySelector(".final-result");
    finalResultDiv.innerHTML = `
        <h2>${message}</h2>
        <button onclick="resetGame()">Play Again</button>
    `;
    document.querySelector(".result").textContent = '';
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    ties = 0;
    gameOver = false;
    updateScoreboard();
    document.querySelector(".final-result").innerHTML = "";
    document.querySelector(".result").textContent = '';
}

function computerPlay() {
    return gameChoices[Math.floor(Math.random() * gameChoices.length)];
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (!gameOver) {
                const playerSelection = button.id;
                const computerSelection = computerPlay();
                playRound(playerSelection, computerSelection);
            }
        });
    });

    updateScoreboard();
});
