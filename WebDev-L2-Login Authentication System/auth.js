// Shared helpers for register / login / dashboard pages.
// Approach A: front-end only, users and session live in localStorage.
const USERS_KEY = "auth-users";      // { "<lowercase id>": { username, salt, hash, createdAt } }
const SESSION_KEY = "auth-session";  // { username, loginAt }

// ---------- Storage ----------
function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch (e) { return fallback; }
}
function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
const getUsers = () => readJSON(USERS_KEY, {});
const saveUsers = (users) => writeJSON(USERS_KEY, users);
const getSession = () => readJSON(SESSION_KEY, null);
const setSession = (username) => writeJSON(SESSION_KEY, { username, loginAt: Date.now() });
const clearSession = () => localStorage.removeItem(SESSION_KEY);

// ---------- Hashing (SHA-256 with a random salt, via the Web Crypto API) ----------
function toHex(buffer) {
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}
function randomSalt() {
  return toHex(crypto.getRandomValues(new Uint8Array(16)));
}
async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(salt + password);
  return toHex(await crypto.subtle.digest("SHA-256", data));
}

// ---------- UI helpers ----------
function showMessage(el, text, type) {
  el.textContent = text;
  el.className = "msg " + type;
}
function normalise(id) {
  return id.trim().toLowerCase();
}

// ---------- Route guards ----------
// Dashboard: only for logged-in users. Everyone else is sent to the login page.
function requireLogin() {
  const session = getSession();
  if (!session || !getUsers()[normalise(session.username)]) {
    clearSession();
    window.location.replace("login.html");
    return null;
  }
  return session;
}
// Login / register: skip them if the user is already logged in.
function redirectIfLoggedIn() {
  if (getSession()) window.location.replace("dashboard.html");
}
