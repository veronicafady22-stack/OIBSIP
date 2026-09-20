const display = document.getElementById('display');
const expressionEl = document.getElementById('expression');
const themeToggle = document.getElementById('theme-toggle');

const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };

let tokens = [];              // مثال: [5, '+', 3, '*']
let currentInput = '0';       // الرقم اللي على الشاشة
let shouldResetInput = false; // الرقم الجاي يبدأ من جديد؟
let justEvaluated = false;    // لسه ضاغط =؟
let finishedExpression = '';  // المعادلة بعد ما تدوس =

/* ---------- العرض ---------- */

function buildExpression() {
  const text = tokens.map((t) => symbols[t] || t).join(' ');
  return tokens.length ? text + ' ' : '';
}

function updateDisplay() {
  display.textContent = currentInput;
  expressionEl.textContent = justEvaluated ? finishedExpression : buildExpression();
}

function clearAll() {
  tokens = [];
  currentInput = '0';
  shouldResetInput = false;
  justEvaluated = false;
  finishedExpression = '';
  updateDisplay();
}

function showError() {
  clearAll();
  currentInput = 'Error';
  updateDisplay();
}

/* ---------- الحساب ---------- */

function calculate(a, b, operator) {
  let result;
  switch (operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/':
      if (b === 0) return null; // قسمة على صفر
      result = a / b;
      break;
  }
  // عشان 0.1 + 0.2 ما تطلعش 0.30000000000000004
  return parseFloat(result.toFixed(10));
}

// أولوية العمليات: × ÷ الأول، وبعدين + −
function computeTokens(list) {
  // المرور الأول: × و ÷
  const stack = [list[0]];
  for (let i = 1; i < list.length; i += 2) {
    const op = list[i];
    const next = list[i + 1];

    if (op === '*' || op === '/') {
      const prev = stack.pop();
      const result = calculate(prev, next, op);
      if (result === null) return null;
      stack.push(result);
    } else {
      stack.push(op, next);
    }
  }

  // المرور التاني: + و −
  let result = stack[0];
  for (let i = 1; i < stack.length; i += 2) {
    result = calculate(result, stack[i + 1], stack[i]);
  }
  return result;
}

/* ---------- الإدخال ---------- */

function inputNumber(num) {
  if (currentInput === 'Error') clearAll();

  if (shouldResetInput) {
    currentInput = '0';
    shouldResetInput = false;
    if (justEvaluated) {
      justEvaluated = false;
      finishedExpression = '';
    }
  }

  if (num === '.') {
    if (currentInput.includes('.')) return; // نقطة واحدة بس
    currentInput += '.';
  } else if (currentInput === '0') {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (currentInput === 'Error') return;

  // لو دوست عملية ورا عملية: بدّل العلامة بس
  const lastToken = tokens[tokens.length - 1];
  if (tokens.length > 0 && typeof lastToken === 'string' && shouldResetInput) {
    tokens[tokens.length - 1] = op;
    updateDisplay();
    return;
  }

  if (justEvaluated) {
    justEvaluated = false;
    finishedExpression = '';
  }

  tokens.push(parseFloat(currentInput), op);
  shouldResetInput = true;
  updateDisplay();
}

function evaluate() {
  if (tokens.length === 0 || shouldResetInput) return;

  const lastNumber = parseFloat(currentInput);
  const result = computeTokens([...tokens, lastNumber]);
  if (result === null) return showError();

  finishedExpression = buildExpression() + lastNumber + ' =';
  tokens = [];
  currentInput = String(result);
  shouldResetInput = true;
  justEvaluated = true;
  updateDisplay();
}

function backspace() {
  if (currentInput === 'Error' || shouldResetInput) return;

  const isSingleChar = currentInput.length === 1;
  const isNegativeSingle = currentInput.length === 2 && currentInput[0] === '-';
  currentInput = (isSingleChar || isNegativeSingle) ? '0' : currentInput.slice(0, -1);
  updateDisplay();
}

function percent() {
  if (currentInput === 'Error') return;
  if (shouldResetInput && !justEvaluated) return; // لسه ما كتبتش رقم
  const value = parseFloat(currentInput) / 100;
  currentInput = String(parseFloat(value.toFixed(10)));
  updateDisplay();
}

function toggleSign() {
  if (currentInput === 'Error' || currentInput === '0') return;
  if (shouldResetInput && !justEvaluated) return;
  currentInput = currentInput.startsWith('-')
    ? currentInput.slice(1)
    : '-' + currentInput;
  updateDisplay();
}

/* ---------- الأزرار ---------- */

document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const { number, operator, action } = btn.dataset;

    if (number !== undefined) {
      inputNumber(number);
    } else if (operator !== undefined) {
      chooseOperator(operator);
    } else {
      switch (action) {
        case 'clear':     clearAll();   break;
        case 'backspace': backspace();  break;
        case 'percent':   percent();    break;
        case 'sign':      toggleSign(); break;
        case 'equals':    evaluate();   break;
      }
    }
  });
});

/* ---------- الكيبورد ---------- */

document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (/^[0-9.]$/.test(key)) {
    inputNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    e.preventDefault();
    chooseOperator(key);
  } else if (key === '%') {
    percent();
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault(); // عشان Enter ما يضغطش زرار متركّز عليه تاني
    evaluate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape' || (key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey)) {
    clearAll();
  }
});

/* ---------- Dark / Light mode ---------- */

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

let savedTheme = 'dark';
try {
  savedTheme = localStorage.getItem('calc-theme') || 'dark';
} catch (err) {
  // لو التخزين مش متاح، كمّل بالوضع الافتراضي
}
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try {
    localStorage.setItem('calc-theme', next);
  } catch (err) {
    // تجاهل
  }
});

updateDisplay();