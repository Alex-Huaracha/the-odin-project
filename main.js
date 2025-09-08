// Basic arithmetic functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'Error';
  }
  return a / b;
}

function percentage(a) {
  return a / 100;
}

function operate(operator, a, b) {
  let result;
  switch (operator) {
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '×':
      result = multiply(a, b);
      break;
    case '÷':
      result = divide(a, b);
      break;
    default:
      return null;
  }

  if (typeof result === 'number' && !Number.isInteger(result)) {
    return Math.round(result * 100000000) / 100000000;
  }
  return result;
}

let firstNumber = '';
let operator = '';
let secondNumber = '';
let waitingForNewNumber = false;

const display = document.getElementById('display');
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
      button.addEventListener('click', () => handleButtonClick(buttonText));
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

function handleButtonClick(value) {
  if (isNumber(value)) {
    inputNumber(value);
  } else if (isOperator(value)) {
    inputOperator(value);
  } else if (value === '=') {
    calculate();
  } else if (value === 'AC') {
    clearAll();
  } else if (value === '.') {
    inputDecimal();
  } else if (value === '⌫') {
    deleteLast();
  } else if (value === '%') {
    if (display.value !== '0') {
      display.value = percentage(parseFloat(display.value));
      if (firstNumber && operator && !waitingForNewNumber) {
        secondNumber = display.value;
        const result = operate(
          operator,
          parseFloat(firstNumber),
          parseFloat(secondNumber)
        );
        display.value = result;
        firstNumber = result.toString();
        waitingForNewNumber = true;
      }
    }
  }
}

function isNumber(value) {
  return !isNaN(value) && value !== '.';
}

function isOperator(value) {
  return ['+', '-', '×', '÷', '%'].includes(value);
}

function inputNumber(num) {
  if (waitingForNewNumber) {
    display.value = num;
    waitingForNewNumber = false;
  } else {
    display.value = display.value === '0' ? num : display.value + num;
  }
}

function inputOperator(op) {
  if (firstNumber === '') {
    firstNumber = display.value;
  } else if (operator && !waitingForNewNumber) {
    secondNumber = display.value;
    const result = operate(
      operator,
      parseFloat(firstNumber),
      parseFloat(secondNumber)
    );
    display.value = result;
    firstNumber = result.toString();
  }

  operator = op;
  waitingForNewNumber = true;
}

function calculate() {
  if (firstNumber === '' || operator === '' || waitingForNewNumber) {
    return;
  }

  secondNumber = display.value;
  const result = operate(
    operator,
    parseFloat(firstNumber),
    parseFloat(secondNumber)
  );
  display.value = result;

  firstNumber = result.toString();
  operator = '';
  secondNumber = '';
  waitingForNewNumber = true;
}

function clearAll() {
  display.value = '0';
  firstNumber = '';
  operator = '';
  secondNumber = '';
  waitingForNewNumber = false;
}

function inputDecimal() {
  if (waitingForNewNumber) {
    display.value = '0.';
    waitingForNewNumber = false;
  } else if (!display.value.includes('.')) {
    display.value += '.';
  }
}

function deleteLast() {
  if (display.value.length > 1) {
    display.value = display.value.slice(0, -1);
  } else {
    display.value = '0';
  }
}

createButtons();
