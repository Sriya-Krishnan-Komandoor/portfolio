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

  // Phone masking - STRICT: Only allows +370 6xx xxxxx
  const phoneInput = document.getElementById("phone");
  
  // Auto-fill +370 6 when field is focused and empty
  phoneInput.addEventListener("focus", (e) => {
    if (e.target.value === "") {
      e.target.value = "+370 6";
    }
  });

  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value;
    
    // Extract only digits
    let digits = value.replace(/\D/g, "");
    
    // Force it to start with 3706
    if (!digits.startsWith("3706")) {
      // If user tries to change the 6, reset to +370 6
      e.target.value = "+370 6";
      validateField("phone");
      return;
    }
    
    // Remove 3706 prefix to get remaining digits
    let remaining = digits.substring(4);
    
    // Limit to 7 more digits (total: 370 + 6 + 7 = 11 digits)
    if (remaining.length > 7) {
      remaining = remaining.substring(0, 7);
    }
    
    // Format as +370 6xx xxxxx
    let formatted = "+370 6";
    if (remaining.length > 0) {
      formatted += remaining.substring(0, 2);
      if (remaining.length > 2) {
        formatted += " " + remaining.substring(2);
      }
    }
    
    e.target.value = formatted;
    validateField("phone");
  });

  // Add event listeners for validation
  Object.keys(fields).forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (input && fieldId !== "phone") {
      input.addEventListener("input", () => {
        validateField(fieldId);
        validateForm();
      });
    }
  });

  // Phone validation on input (already handled above)
  phoneInput.addEventListener("input", validateForm);

  if (form && submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Validate all fields first
      let allValid = true;
      Object.keys(fields).forEach(fieldId => {
        if (!validateField(fieldId)) allValid = false;
      });

      if (!allValid) {
        alert("Please fill in all fields correctly!");
        return;
      }

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

      // Determine color based on average
      let color;
      let emoji;
      if (avg <= 4) {
        color = "#ff4444";
        emoji = "😞";
      } else if (avg <= 7) {
        color = "#ff9500";
        emoji = "😊";
      } else {
        color = "#00c851";
        emoji = "🎉";
      }

      console.log("Average:", avg, "Color:", color);

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

      // Create backdrop
      const backdrop = document.createElement('div');
      backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        animation: fadeIn 0.3s ease;
      `;
      backdrop.innerHTML = `<style>@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }</style>`;

      // Create custom styled popup
      const popup = document.createElement('div');
      popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.7);
        background: linear-gradient(135deg, #1e2430 0%, #0f1115 100%);
        padding: 40px 50px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.8);
        z-index: 10000;
        text-align: center;
        border: 2px solid ${color};
        animation: popupAppear 0.4s ease forwards;
      `;

      popup.innerHTML = `
        <style>
          @keyframes popupAppear {
            to { transform: translate(-50%, -50%) scale(1); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        <div style="
          width: 120px;
          height: 120px;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, ${color}, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: spin 2s linear infinite;
          position: relative;
        ">
          <div style="
            width: 100px;
            height: 100px;
            background: #1e2430;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            font-weight: 800;
            color: ${color};
          ">
            ${avg.toFixed(1)}
          </div>
        </div>
        <h2 style="color: #00c851; margin: 20px 0 10px; font-size: 28px;">
          ✓ Form Submitted Successfully!
        </h2>
        <p style="color: #e6e9ef; font-size: 18px; margin-bottom: 10px;">
          Average Rating: <span style="color: ${color}; font-weight: 700;">${avg.toFixed(1)}</span> ${emoji}
        </p>
        <p style="color: #9aa3b2; font-size: 16px; margin-bottom: 25px;">
          ${name} ${surname}
        </p>
        <button onclick="this.parentElement.parentElement.remove(); document.querySelector('.popup-backdrop')?.remove()" style="
          background: #00c851;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          Got it! ✓
        </button>
      `;

      backdrop.className = 'popup-backdrop';
      backdrop.appendChild(popup);
      document.body.appendChild(backdrop);

      // Also display in result box with proper format
      if (resultBox) {
        resultBox.innerHTML = `
          <div style="background: var(--bg-surface); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
            <h3 style="color: var(--accent-color); margin-bottom: 1rem;">Form Results</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Surname:</strong> ${surname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <hr style="border-color: rgba(255,255,255,0.1); margin: 1.5rem 0;">
            <p style="font-size: 1.3rem; margin-top: 1rem;">
              <strong>${name} ${surname}:</strong> 
              <span style="color: ${color}; font-weight: 700; font-size: 1.5rem;">
                ${avg.toFixed(1)}
              </span> ${emoji}
            </p>
          </div>
        `;
        resultBox.style.display = "block";
      }
      
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

    // Load best score from localStorage
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
    if (winMessage) winMessage.textContent = `🎉 You won in ${moves} moves and ${timer} seconds!`;

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
    const difficulty = difficultySelect.value;
    const bestKey = `best-${difficulty}`;
    const best = localStorage.getItem(bestKey);
    if (bestScoreEl) bestScoreEl.textContent = best || "—";
  });
});
