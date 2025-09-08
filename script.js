// --- Fake Casino Logic ---
// Use localStorage so balance persists between refreshes
let balance = localStorage.getItem("snelcoins");
if (balance === null) {
  balance = 666; // starting balance
  localStorage.setItem("snelcoins", balance);
}

// Update balance on page load
function updateBalance() {
  document.getElementById("balance").innerHTML = `<strong>Balance:</strong> ${balance} 🪙`;
}
updateBalance();

// --- Button Actions ---

// Bet everything
function betEverything() {
  const outcome = Math.random();
  if (outcome < 0.2) {
    balance = parseInt(balance) * 2;
    alert("🔥 You won! Double chaos, double ranch. Humans scream in the distance.");
  } else {
    balance = 0;
    alert("💀 You lost it all. Snelsterendier is laughing at you.");
  }
  localStorage.setItem("snelcoins", balance);
  updateBalance();
}

// Beg for more coins
function begForMore() {
  const gift = Math.floor(Math.random() * 500) + 50;
  balance = parseInt(balance) + gift;
  alert(`🪙 A Glorp took pity and tossed you ${gift} SnelCoins. Don’t ask where they came from...`);
  localStorage.setItem("snelcoins", balance);
  updateBalance();
}

// Cry in the corner
function cryCorner() {
  alert("😭 You cry. Nothing happens. Snelsterendier stares at you awkwardly.");
}
