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
      button.className = getButtonClass(buttonText);
      rowDiv.appendChild(button);
    });

    buttonsContainer.appendChild(rowDiv);
  });
}

function getButtonClass(text) {
  if (['÷', '×', '-', '+', '='].includes(text)) return 'operator';
  if (['C', '±', '%'].includes(text)) return 'function';
  if (text === '0') return 'zero';
  return 'number';
}

createButtons();
