let displayValue = '';
let bracketOpen = false; // Keeps track of the state of the bracket (open or close)

function appendToDisplay(value) {
  if (value === '(') {
    if (displayValue !== '' && !isOperator(displayValue.slice(-1))) {
      // Automatically add a multiplication (*) if opening parenthesis follows a digit or another opening parenthesis
      displayValue += '*';
    }
    displayValue += value;
    bracketOpen = !bracketOpen;
  } else if (value === ')') {
    if (bracketOpen && (isDigit(displayValue.slice(-1)) || displayValue.slice(-1) === ')')) {
      displayValue += value;
      bracketOpen = !bracketOpen;
    }
  } else {
    if (value === ')' && bracketOpen && (isDigit(displayValue.slice(-1)) || displayValue.slice(-1) === ')')) {
      // If closing parenthesis and bracket is open, add the closing parenthesis
      displayValue += value;
      bracketOpen = !bracketOpen;
    } else {
      displayValue += value;
    }
  }
  document.getElementById('result').value = displayValue;
}
function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

function isDigit(char) {
  return /\d/.test(char);
}

function clearDisplay() {
  displayValue = '';
  document.getElementById('result').value = displayValue;
}

function calculate() {
  try {
    const sanitizedValue = sanitizeInput(displayValue);
    const result = eval(sanitizedValue);
    displayValue = result.toString();
    document.getElementById('result').value = displayValue;
  } catch (error) {
    displayValue = '';
    document.getElementById('result').value = 'Error';
  }
}

function squareRoot() {
  try {
    const sanitizedValue = sanitizeInput(displayValue);
    const result = Math.sqrt(eval(sanitizedValue));
    displayValue = result.toString();
    document.getElementById('result').value = displayValue;
  } catch (error) {
    displayValue = '';
    document.getElementById('result').value = 'Error';
  }
}

function calculatePercentage() {
  try {
    const sanitizedValue = sanitizeInput(displayValue);
    const result = eval(sanitizedValue) / 100;
    displayValue = result.toString();
    document.getElementById('result').value = displayValue;
  } catch (error) {
    displayValue = '';
    document.getElementById('result').value = 'Error';
  }
}

function togglePlusMinus() {
  if (displayValue !== '') {
    if (displayValue.charAt(0) === '-') {
      displayValue = displayValue.substr(1);
    } else {
      displayValue = '-' + displayValue;
    }
    document.getElementById('result').value = displayValue;
  }
}

function deleteLastCharacter() {
  if (displayValue.charAt(displayValue.length - 1) === '(' || displayValue.charAt(displayValue.length - 1) === ')') {
    bracketOpen = !bracketOpen; // Toggle the state of the bracket
  }
  displayValue = displayValue.slice(0, -1);
  document.getElementById('result').value = displayValue;
}

function sanitizeInput(input) {
  // Remove any characters that are not digits, operators, dots, or parentheses
  const sanitizedInput = input.replace(/[^0-9+\-*/.%()]/g, '');
  return sanitizedInput;
}