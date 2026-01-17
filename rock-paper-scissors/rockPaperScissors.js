let humanScore = 0;
let computerScore = 0;
let currentRound = 0;
const maxRounds = 5;

const getComputerChoice = () => {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const updatedScore = () => {
  document.querySelector('#user-score').textContent = humanScore;
  document.querySelector('#computer-score').textContent = computerScore;
};

const displayChoice = (choice, player) => {
  const displayElement = document.querySelector(`#${player}-display`);
  displayElement.innerHTML = `<img src="./images/icons/${choice}.png" alt="${choice}" />`;
};

const displayResult = (message, resultType) => {
  const resultElement = document.querySelector('#round-result');
  resultElement.innerHTML = '';

  const textElement = document.createElement('div');
  textElement.textContent = message;
  textElement.style.marginBottom = '1rem';
  resultElement.appendChild(textElement);

  // resultElement.textContent = message;
  resultElement.style.display = 'block';
  resultElement.style.padding = '2rem 3rem';

  const gifMap = {
    'user-win': './images/gif/user_win.gif',
    'user-round': './images/gif/user.gif',
    'computer-win': './images/gif/computer_win.gif',
    'computer-round': './images/gif/computer.gif',
    'game-tie': './images/gif/equal.gif',
  };

  if (gifMap[resultType]) {
    const imgElement = document.createElement('img');
    imgElement.src = gifMap[resultType];
    imgElement.alt = resultType;
    imgElement.style.width = '500px';
    imgElement.style.height = 'auto';
    imgElement.style.display = 'block';
    imgElement.style.margin = '0 auto';
    resultElement.appendChild(imgElement);
  }

  resultElement.style.display = 'block';

  setTimeout(() => {
    resultElement.style.display = 'none';
  }, 5000);
};

const checkGameWinner = () => {
  if (currentRound === maxRounds) {
    let message, resultType;

    if (humanScore > computerScore) {
      message = `You won the game! Final Score: ${humanScore}-${computerScore}`;
      resultType = 'user-win';
    } else if (computerScore > humanScore) {
      message = `Computer won the game! Final Score: ${humanScore}-${computerScore}`;
      resultType = 'computer-win';
    } else {
      message = `It's a tie game! Final Score: ${humanScore}-${computerScore}`;
      resultType = 'game-tie';
    }

    displayResult(message, resultType);
    disableButtons();
  }
};

const disableButtons = () => {
  document.querySelectorAll('.choice').forEach((button) => {
    button.disabled = true;
    button.style.cursor = 'not-allowed';
    button.style.opacity = '0.5';
  });
};

const playRound = (humanChoice, computerChoice) => {
  displayChoice(humanChoice, 'user');
  displayChoice(computerChoice, 'computer');

  currentRound++;

  if (humanChoice === computerChoice) {
    displayResult("It's a tie!", 'game-tie');
  } else if (
    (humanChoice === 'rock' && computerChoice === 'scissors') ||
    (humanChoice === 'paper' && computerChoice === 'rock') ||
    (humanChoice === 'scissors' && computerChoice === 'paper')
  ) {
    humanScore++;
    displayResult('You win this round!', 'user-round');
  } else {
    computerScore++;
    displayResult('Computer wins this round!', 'computer-round');
  }

  updatedScore();
  checkGameWinner();
};

document.querySelector('.choices').addEventListener('click', (event) => {
  const choice = event.target.closest('.choice');
  const img = choice.querySelector('img');
  if (img) {
    const userChoice = img.alt.toLowerCase();
    const computerChoice = getComputerChoice();
    playRound(userChoice, computerChoice);
  }
});
