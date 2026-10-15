# Login Authentication System (Front-end, localStorage)

A simple client-side authentication system built with HTML, CSS, and vanilla JavaScript (Approach A).
Demo live :https://veronicafady22-stack.github.io/OIBSIP/WebDev-L2-Login%20Authentication%20System/register.html
## Features
- Registration with username/email and password
- Password rules: minimum 8 characters, at least 1 number
- Duplicate username/email detection (case-insensitive)
- Login with a generic error message that does not reveal which field was wrong
- Protected dashboard that redirects to the login page if opened without a session
- Logout button that clears the session
- Passwords are never stored in plain text: each one is hashed with SHA-256 and a random salt (Web Crypto API)
- Form validation on both pages (no empty submissions)

## Run
Open `register.html` in a browser, create an account, then log in.
If hashing fails when opening the files directly, serve the folder instead, for example `python -m http.server`, and visit `http://localhost:8000/register.html`.

## Files
- `register.html`, `login.html`, `dashboard.html`: the three pages
- `auth.js`: shared logic (storage, hashing, session, route guards)
- `style.css`: shared styles

## Note
This is a learning project. Because everything runs in the browser, it is not secure enough for real applications. Real authentication needs a server (for example Node.js + Express + bcrypt).
