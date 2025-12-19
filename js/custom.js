/* ==================================================
   CONTACT FORM HANDLER WITH VALIDATION
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const resultBox = document.getElementById("formResult");

  const fields = {
    name: { regex: /^[a-zA-Z\s]+$/, error: "Name must contain only letters." },
    surname: { regex: /^[a-zA-Z\s]+$/, error: "Surname must contain only letters." },
    email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: "Invalid email format." },
    phone: { regex: /^\+370\s6\d{2}\s\d{5}$/, error: "Phone must be in format +370 6xx xxxxx." },
    address: { regex: /.+/, error: "Address cannot be empty." },
    r1: { min: 1, max: 10, error: "Rating must be between 1 and 10." },
    r2: { min: 1, max: 10, error: "Rating must be between 1 and 10." },
    r3: { min: 1, max: 10, error: "Rating must be between 1 and 10." }
  };

  function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + "Error");
    const value = input.value.trim();
    let isValid = false;

    if (fields[fieldId].regex) {
      isValid = fields[fieldId].regex.test(value);
    } else if (fields[fieldId].min !== undefined) {
      const num = parseInt(value);
      isValid = !isNaN(num) && num >= fields[fieldId].min && num <= fields[fieldId].max;
    }

    if (isValid) {
      input.classList.remove("invalid");
      errorSpan.textContent = "";
    } else {
      input.classList.add("invalid");
      errorSpan.textContent = fields[fieldId].error;
    }
    return isValid;
  }

  function validateForm() {
    let allValid = true;
    Object.keys(fields).forEach(fieldId => {
      if (!validateField(fieldId)) allValid = false;
    });
    submitBtn.disabled = !allValid;
  }

  // Phone masking
  document.getElementById("phone").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("370")) {
      value = value.substring(3);
    }
    if (value.length > 9) value = value.substring(0, 9);
    let formatted = "+370 ";
    if (value.length > 2) {
      formatted += value.substring(0, 3) + " " + value.substring(3);
    } else {
      formatted += value;
    }
    e.target.value = formatted;
    validateField("phone");
  });

  // Add event listeners for validation
  Object.keys(fields).forEach(fieldId => {
    document.getElementById(fieldId).addEventListener("input", () => {
      validateField(fieldId);
      validateForm();
    });
  });

  if (form && submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      const name = document.getElementById("name").value.trim();
      const surname = document.getElementById("surname").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();

      const r1 = Number(document.getElementById("r1").value);
      const r2 = Number(document.getElementById("r2").value);
      const r3 = Number(document.getElementById("r3").value);

      const ratings = [r1, r2, r3];
      const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;

      const color =
        avg < 4 ? "red" :
        avg < 7 ? "orange" :
        "green";

      const data = {
        name,
        surname,
        email,
        phone,
        address,
        ratings,
        average: avg.toFixed(1)
      };

      console.log("Form Data:", data);

      if (resultBox) {
        resultBox.innerHTML = `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Surname:</strong> ${surname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p style="color:${color}; font-weight:600;">
            Rating Average: ${avg.toFixed(1)}
          </p>
        `;
      }

      alert("Form submitted successfully!");
      form.reset();
      // Reset errors
      Object.keys(fields).forEach(fieldId => {
        document.getElementById(fieldId + "Error").textContent = "";
        document.getElementById(fieldId).classList.remove("invalid");
      });
      submitBtn.disabled = true;
    });
  }

  /* ==================================================
     MEMORY GAME
  ================================================== */

  const symbols = ["🍎", "🚀", "🎧", "📘", "⚡", "🎮", "🐱", "🌙", "🎯", "💡", "🎵", "📸"];

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let moves = 0;
  let matches = 0;
  let timer = 0;
  let timerInterval = null;
  let totalPairs = 0;

  const board = document.getElementById("gameBoard");
  const movesEl = document.getElementById("moves");
  const matchesEl = document.getElementById("matches");
  const timerEl = document.getElementById("timer");
  const winMessage = document.getElementById("winMessage");
  const bestScoreEl = document.getElementById("bestScore");
  const difficultySelect = document.getElementById("difficulty");

  function startTimer() {
    clearInterval(timerInterval);
    timer = 0;
    if (timerEl) timerEl.textContent = timer;

    timerInterval = setInterval(() => {
      timer++;
      if (timerEl) timerEl.textContent = timer;
    }, 1000);
  }

  function createBoard(difficulty) {
    if (!board) return;

    board.innerHTML = "";
    moves = 0;
    matches = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    clearInterval(timerInterval);
    timer = 0;
    if (timerEl) timerEl.textContent = timer;

    if (movesEl) movesEl.textContent = moves;
    if (matchesEl) matchesEl.textContent = matches;
    if (winMessage) winMessage.textContent = "";

    totalPairs = difficulty === "easy" ? 6 : 12;

    board.style.gridTemplateColumns =
      difficulty === "easy" ? "repeat(4, 1fr)" : "repeat(6, 1fr)";

    const selectedSymbols = symbols.slice(0, totalPairs);
    const cards = [...selectedSymbols, ...selectedSymbols]
      .sort(() => Math.random() - 0.5);

    cards.forEach(symbol => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.symbol = symbol;
      card.addEventListener("click", () => flipCard(card));
      board.appendChild(card);
    });

    // Load best score
    const bestKey = `best-${difficulty}`;
    const best = localStorage.getItem(bestKey);
    if (bestScoreEl) bestScoreEl.textContent = best || "—";
  }

  function flipCard(card) {
    if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

    card.textContent = card.dataset.symbol;
    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    moves++;
    if (movesEl) movesEl.textContent = moves;

    checkMatch();
  }

  function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matches++;
      if (matchesEl) matchesEl.textContent = matches;
      resetTurn();

      if (matches === totalPairs) {
        winGame();
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        firstCard.textContent = "";
        secondCard.textContent = "";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetTurn();
      }, 1000);
    }
  }

  function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

  function winGame() {
    clearInterval(timerInterval);
    if (winMessage) winMessage.textContent = "🎉 You won the game!";

    const difficulty = difficultySelect.value;
    const bestKey = `best-${difficulty}`;
    const best = localStorage.getItem(bestKey);

    if (!best || moves < best) {
      localStorage.setItem(bestKey, moves);
      if (bestScoreEl) bestScoreEl.textContent = moves;
    }
  }

  document.getElementById("startGame")?.addEventListener("click", () => {
    createBoard(difficultySelect.value);
    startTimer();
  });

  document.getElementById("restartGame")?.addEventListener("click", () => {
    createBoard(difficultySelect.value);
    startTimer();
  });

  difficultySelect?.addEventListener("change", () => {
    createBoard(difficultySelect.value);
  });
});
