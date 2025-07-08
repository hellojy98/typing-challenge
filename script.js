const quotes = [
  "EssentialTECH Malaysia is a community of employees passionate in upskilling their own careers as well as equipping our local community with STEM-based skills to succeed in this evolving world."
];

let startTime, interval, currentQuote;

const quoteEl = document.getElementById("quote-output");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const countdownEl = document.getElementById("countdown");
const resultEl = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");

function preloadQuote() {
  currentQuote = quotes[0];
  renderQuote(currentQuote);
}

function renderQuote(quote) {
  quoteEl.innerHTML = "";
  quote.split("").forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
    quoteEl.appendChild(span);
  });
}

function startCountdown() {
  inputEl.disabled = true;
  inputEl.value = "";
  submitBtn.disabled = true;
  resultEl.style.display = "none";
  timerEl.textContent = "0";
  countdownEl.textContent = "3";

  let count = 3;
  const countdown = setInterval(() => {
    count--;
    countdownEl.textContent = count > 0 ? count.toString() : "Go!";
    if (count <= 0) {
      clearInterval(countdown);
      countdownEl.textContent = "";
      startGame();
    }
  }, 1000);
}

function startGame() {
  currentQuote = quotes[0];
  renderQuote(currentQuote);

  inputEl.disabled = false;
  inputEl.placeholder = "Start typing...";
  inputEl.focus();
  startTime = Date.now();
  submitBtn.disabled = true;
  clearInterval(interval);
  interval = setInterval(updateTimer, 100);
}

function updateTimer() {
  const elapsed = (Date.now() - startTime) / 1000;
  timerEl.textContent = elapsed.toFixed(1);
}

function updateTypingFeedback() {
  const typed = inputEl.value;
  const quoteSpans = quoteEl.querySelectorAll("span");
  let allCorrect = true;

  for (let i = 0; i < quoteSpans.length; i++) {
    const char = typed[i];
    if (!char) {
      quoteSpans[i].className = "";
      allCorrect = false;
    } else if (char === quoteSpans[i].textContent) {
      quoteSpans[i].className = "correct";
    } else {
      quoteSpans[i].className = "incorrect";
      allCorrect = false;
    }
  }

  submitBtn.disabled = !(allCorrect && typed.length === currentQuote.length);
}

function endGame() {
  clearInterval(interval);
  inputEl.disabled = true;
  submitBtn.disabled = true;

  const finalTime = (Date.now() - startTime) / 1000;

  resultEl.innerHTML = `
    <h2>🎉 Finished!</h2>
    <p>⏱ Your final time: ${finalTime.toFixed(2)} seconds</p>
  `;
  resultEl.style.display = "block";
}

inputEl.addEventListener("input", () => {
  updateTimer();
  updateTypingFeedback();
});

submitBtn.addEventListener("click", endGame);

inputEl.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !submitBtn.disabled) {
    e.preventDefault();
    endGame();
  }
});

preloadQuote();
