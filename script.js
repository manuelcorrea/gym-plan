const SECRET = "nathamigue";
const STORAGE_KEY = "aufit-aquaboard-access";

const passwordShell = document.getElementById("password-shell");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");
const app = document.getElementById("app");

function unlockPage() {
  passwordShell.classList.add("hidden");
  app.classList.remove("hidden");
}

function lockPage() {
  passwordShell.classList.remove("hidden");
  app.classList.add("hidden");
}

if (window.localStorage.getItem(STORAGE_KEY) === "granted") {
  unlockPage();
} else {
  lockPage();
}

passwordForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value.trim() === SECRET) {
    window.localStorage.setItem(STORAGE_KEY, "granted");
    passwordError.textContent = "";
    unlockPage();
    return;
  }

  passwordError.textContent = "Contraseña incorrecta.";
  passwordInput.select();
});
