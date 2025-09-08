const buttonsContainer = document.querySelector('.buttons');

const buttonConfig = [
  ['AC', '( )', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '⌫', '='],
];

function createButtons() {
  buttonConfig.forEach((row) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'button-row';

    row.forEach((buttonText) => {
      const button = document.createElement('button');
      button.textContent = buttonText;
      rowDiv.appendChild(button);
    });

    buttonsContainer.appendChild(rowDiv);
  });
}

createButtons();
