# Calculator

A fully functional browser-based calculator built with vanilla HTML, CSS and JavaScript. No frameworks, no libraries, and no `eval()`. All the calculation logic is written from scratch.

**Live demo:** https://veronicafady22-stack.github.io/OIBSIP/WebDev-L2-calculator/

## Features

- Display screen showing the full expression and the current input or result
- Numeric buttons (0–9) and a decimal point
- Operators: addition (+), subtraction (−), multiplication (×), division (÷)
- Equals (=) button to evaluate the expression
- Clear (C) button to reset everything
- Backspace (⌫) button to delete the last entered character
- Percent (%) and sign toggle (±) buttons
- Division-by-zero protection: shows an error message instead of crashing
- Operator chaining with correct order of operations (e.g. `5 + 3 × 2 = 11`)
- Keyboard support
- Dark and light mode, with your choice remembered between visits

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `0`–`9`, `.` | Enter numbers |
| `+` `-` `*` `/` | Operators |
| `Enter` or `=` | Calculate |
| `Backspace` | Delete last character |
| `%` | Percent |
| `Esc` or `C` | Clear all |

## Tech stack

- **HTML5** for the structure
- **CSS3** with CSS Grid for the button layout and CSS variables for theming
- **JavaScript (vanilla)** with event listeners on all buttons, no inline `onclick` attributes

## How it works

The calculator stores the numbers and operators as a list of tokens, for example `[5, '+', 3, '×']`. When you press `=`, it evaluates the list in two passes: first multiplication and division, then addition and subtraction. This gives the correct order of operations without using `eval()`.

## Run locally

1. Clone or download this repository.
2. Open the `calculator` folder.
3. Open `index.html` in your browser.

No installation or build step is needed.

## Project structure

```
calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## What I learned

- Manipulating the DOM and handling events with `addEventListener`
- Building layouts with CSS Grid
- Managing state in plain JavaScript
- Implementing operator precedence without `eval()`
- Theming with CSS variables and saving preferences with `localStorage`

## Screenshots
Background: ![Calculator screenshot](img/operations.jpg)

**VERONICA FADY**
[GitHub](https://github.com/veronicafady22-stack)
