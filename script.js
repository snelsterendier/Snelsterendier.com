let balance = localStorage.getItem("snelcoins");
if (balance === null) {
  balance = 666;
  localStorage.setItem("snelcoins", balance);
} else {
  balance = parseInt(balance);
}

function updateBalance() {
  document.getElementById("balance").textContent = `Balance: ${balance} 🪙`;
}
updateBalance();

function saveBalance() {
  localStorage.setItem("snelcoins", balance);
  updateBalance();
}

function playSlots() {
  if (balance < 50) return alert("Not enough SnelCoins!");
  balance -= 50;
  const symbols = ["🍕","🐸","👹","🦴","🪙","🥦"];
  const s1 = symbols[Math.floor(Math.random()*symbols.length)];
  const s2 = symbols[Math.floor(Math.random()*symbols.length)];
  const s3 = symbols[Math.floor(Math.random()*symbols.length)];
  document.getElementById("slots-display").textContent = `${s1} | ${s2} | ${s3}`;
  if (s1===s2 && s2===s3) balance += 300;
  else if (s1===s2 || s2===s3 || s1===s3) balance += 100;
  saveBalance();
}

function flipCoin(choice) {
  if (balance < 20) return alert("Not enough SnelCoins!");
  balance -= 20;
  const outcome = Math.random() < 0.5 ? "heads" : "tails";
  document.getElementById("coin-result").textContent = `It landed on ${outcome}.`;
  if (choice === outcome) balance += 40;
  saveBalance();
}

function rollDice() {
  if (balance < 30) return alert("Not enough SnelCoins!");
  const choice = parseInt(document.getElementById("dice-choice").value);
  if (choice < 1 || choice > 6) return alert("Pick 1–6.");
  balance -= 30;
  const roll = Math.floor(Math.random()*6) + 1;
  document.getElementById("dice-result").textContent = `You rolled a ${roll}`;
  if (roll === choice) balance += 180;
  saveBalance();
}

function cryCorner() {
  alert("😭 You cry. Nothing happens.");
}
