// --- SnelCoins Casino ---
// Persistent balance using localStorage
let balance = localStorage.getItem("snelcoins");
if (balance === null) {
  balance = 666; // starting fake money
  localStorage.setItem("snelcoins", balance);
} else {
  balance = parseInt(balance);
}

// Update balance display
function updateBalance() {
  document.getElementById("balance").innerHTML = `<strong>Balance:</strong> ${balance} 🪙`;
}
updateBalance();

// Save balance
function saveBalance() {
  localStorage.setItem("snelcoins", balance);
  updateBalance();
}

// --- Slot Machine ---
function playSlots() {
  const cost = 50;
  if (balance < cost) {
    alert("💀 You are broke. REPLACETHISABC laughs at your misery.");
    return;
  }
  balance -= cost;

  const symbols = ["🍕", "🐸", "👹", "🦴", "🪙", "🥦"];
  const slot1 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot2 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot3 = symbols[Math.floor(Math.random() * symbols.length)];

  document.getElementById("slots-display").textContent = `${slot1} | ${slot2} | ${slot3}`;

  if (slot1 === slot2 && slot2 === slot3) {
    balance += 300;
    alert("🎉 JACKPOT! You won 300 SnelCoins! REPLACETHISABC is furious.");
  } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
    balance += 100;
    alert("✨ Two of a kind! You won 100 SnelCoins.");
  } else {
    alert("❌ Nothing. REPLACETHISABC eats your hope.");
  }
  saveBalance();
}

// --- Coin Flip ---
function flipCoin(choice) {
  const cost = 20;
  if (balance < cost) {
    alert("💀 You are broke. REPLACETHISABC stole your lunch money.");
    return;
  }
  balance -= cost;

  const outcome = Math.random() < 0.5 ? "heads" : "tails";
  document.getElementById("coin-result").textContent = `It landed on ${outcome}.`;

  if (choice === outcome) {
    balance += 40;
    alert("👏 You guessed right! Double your fake money!");
  } else {
    alert("😂 Wrong guess. REPLACETHISABC wins again.");
  }
  saveBalance();
}

// --- Dice Roll ---
function rollDice() {
  const cost = 30;
  const choice = parseInt(document.getElementById("dice-choice").value);

  if (balance < cost) {
    alert("💀 No coins left. REPLACETHISABC bites your dice.");
    return;
  }
  if (choice < 1 || choice > 6) {
    alert("😒 Invalid choice. Pick a number 1–6.");
    return;
  }

  balance -= cost;
  const roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice-result").textContent = `You rolled a ${roll}.`;

  if (roll === choice) {
    balance += 180;
    alert(`🎲 Lucky! You rolled exactly ${roll} and won 180 SnelCoins.`);
  } else {
    alert("❌ Nope. REPLACETHISABC keeps your coins.");
  }
  saveBalance();
}

// --- Cry in the Corner ---
function cryCorner() {
  alert("😭 You cry in the corner. Nothing changes. REPLACETHISABC stares silently.");
}
