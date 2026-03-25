const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let isAutoPlaying = false;
let intervalId;

const autoplayButtonElement = document.querySelector(".js-autoplay");

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const Move = pickComputermove();
      playGame(Move);
      autoplayButtonElement.innerHTML = "Stop Playing";
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoplayButtonElement.innerHTML = "Auto Play";
  }
}

updateScoreElement();

autoplayButtonElement.addEventListener("click", () => {
  autoplay();
});

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("Rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("Paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("Scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  } else if (event.key === "a") {
    autoplay();
  } else if (event.key === "Backspace") {
    resetScoreMessage();
  }
});

const resetMessageElement = document.querySelector(".js-reset-message");

document.querySelector(".js-reset").addEventListener("click", () => {
  resetScoreMessage();
});

function resetScoreMessage() {
  resetMessageElement.innerHTML = `Are you sure you want to reset the score ? 
  <button class='js-reset-yes-button confirm-reset-button'>Yes</button>
  <button class='js-reset-no-button confirm-reset-button'>No</button>`;
  document
    .querySelector(".js-reset-yes-button")
    .addEventListener("click", () => {
      resetScore();
      updateScoreElement();
      resetMessageElement.innerHTML = "";
    });
  document
    .querySelector(".js-reset-no-button")
    .addEventListener("click", () => {
      resetMessageElement.innerHTML = "";
    });
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
}

function playGame(playerMove) {
  const computerMove = pickComputermove();
  let result = "";
  if (playerMove == "Scissors") {
    if (computerMove === "Rock") {
      result = "You lose.";
    } else if (computerMove === "Paper") {
      result = "You win.";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
  } else if (playerMove == "Paper") {
    if (computerMove === "Rock") {
      result = "You win.";
    } else if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "You lose.";
    }
  } else if (playerMove == "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You lose.";
    } else if (computerMove === "Scissors") {
      result = "You win.";
    }
  }
  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-move").innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputermove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}
