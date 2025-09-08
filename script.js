/* script.js
   Robust SnelCoins logic: uses event listeners (no inline onclick),
   updates UI, saves to localStorage, and provides accessible messages.
*/

(() => {
  const STORAGE_KEY = "snelcoins";
  const DEFAULT_BALANCE = 1337;

  // Game costs / payouts
  const COSTS = { slots: 50, coin: 20, dice: 30 };
  const PAYOUTS = { slotsThree: 300, slotsTwo: 100, coinWin: 40, diceWin: 180 };

  // Elements (will be filled in init)
  let el = {};

  // Safe numeric parse for stored balance
  function loadBalance() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const n = Number(raw);
    if (!Number.isFinite(n)) return DEFAULT_BALANCE;
    return Math.max(0, Math.trunc(n));
  }

  function saveBalance(bal) {
    localStorage.setItem(STORAGE_KEY, String(bal));
  }

  // Message helper
  function setText(target, message) {
    if (!target) return;
    target.textContent = message;
  }

  // UI update helper
  function updateUI(state) {
    setText(el.balance, `Balance: ${state.balance} 🪙`);
    // small enabling/disabling of buttons for UX
    el.spinBtn.disabled = state.balance < COSTS.slots;
    el.headsBtn.disabled = state.balance < COSTS.coin;
    el.tailsBtn.disabled = state.balance < COSTS.coin;
    el.rollBtn.disabled = state.balance < COSTS.dice;
  }

  // Initialize state & UI
  const state = { balance: loadBalance() };

  // Game logic
  function playSlots() {
    const cost = COSTS.slots;
    if (state.balance < cost) {
      alert("💀 Not enough SnelCoins. Snelsterendier mocks you for being such a poor little Snorpinoti.");
      return;
    }
    state.balance -= cost;

    const symbols = ["🍕", "🐸", "👹", "🦴", "🪙", "🥦"];
    const s1 = symbols[Math.floor(Math.random() * symbols.length)];
    const s2 = symbols[Math.floor(Math.random() * symbols.length)];
    const s3 = symbols[Math.floor(Math.random() * symbols.length)];

    // show reels
    setText(el.slotsDisplay, `${s1} | ${s2} | ${s3}`);

    // evaluate
    if (s1 === s2 && s2 === s3) {
      state.balance += PAYOUTS.slotsThree;
      alert("🎉 JACKPOT! You won 300 SnelCoins! REPLACETHISABC is shocked.");
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
      state.balance += PAYOUTS.slotsTwo;
      alert("✨ Two of a kind! You won 100 SnelCoins.");
    } else {
      alert("❌ Nothing. Snelsterendier swipes your hope.");
    }
    saveBalance(state.balance);
    updateUI(state);
  }

  function flipCoin(choice) {
    const cost = COSTS.coin;
    if (state.balance < cost) {
      alert("💀 Not enough SnelCoins to bet. How poor can you be?");
      return;
    }
    state.balance -= cost;
    const outcome = Math.random() < 0.5 ? "heads" : "tails";
    setText(el.coinResult, `It landed on ${outcome}.`);
    if (choice === outcome) {
      state.balance += PAYOUTS.coinWin;
      alert("👏 Right guess! You win 40 SnelCoins.");
    } else {
      alert("😂 Wrong guess. Snelsterendier cackles.");
    }
    saveBalance(state.balance);
    updateUI(state);
  }

  function rollDice() {
    const cost = COSTS.dice;
    const choice = Number(el.diceChoice.value);
    if (!Number.isFinite(choice) || choice < 1 || choice > 6) {
      alert("Pick a number between 1 and 6.");
      return;
    }
    if (state.balance < cost) {
      alert("💀 You can't afford the dice.");
      return;
    }
    state.balance -= cost;
    const roll = Math.floor(Math.random() * 6) + 1;
    setText(el.diceResult, `You rolled a ${roll}.`);
    if (roll === choice) {
      state.balance += PAYOUTS.diceWin;
      alert(`🎲 Lucky! You rolled ${roll} and won ${PAYOUTS.diceWin} SnelCoins.`);
    } else {
      alert("❌ Not it. Snelsterendier takes the coins. (And your dignity)");
    }
    saveBalance(state.balance);
    updateUI(state);
  }

  function cryCorner() {
    alert("😭 You cry in the corner. Nothing happens. Snelsterendier watches silently, waiting to eat.");
  }

  function resetBalance() {
    const ok = confirm("Reset your balance to 0 SnelCoins? This cannot be undone.");
    if (!ok) return;
    state.balance = DEFAULT_BALANCE;
    saveBalance(state.balance);
    updateUI(state);
    alert("✅ Balance reset. Don't blow it all on feet pics.");
  }

  function begForMore() {
    const gift = Math.floor(Math.random() * 451) + 50; // 50 - 500
    state.balance += gift;
    saveBalance(state.balance);
    updateUI(state);
    alert(`🪙 A cute cockroach handed you ${gift} SnelCoins. He does it gladly.`);
  }

  // Attach event listeners after DOM is ready
  function initDOM() {
    // cache elements
    el.balance = document.getElementById("balance");
    el.slotsDisplay = document.getElementById("slots-display");
    el.spinBtn = document.getElementById("spin-btn");
    el.headsBtn = document.getElementById("heads-btn");
    el.tailsBtn = document.getElementById("tails-btn");
    el.coinResult = document.getElementById("coin-result");
    el.diceChoice = document.getElementById("dice-choice");
    el.rollBtn = document.getElementById("roll-btn");
    el.diceResult = document.getElementById("dice-result");
    el.cryBtn = document.getElementById("cry-btn");
    el.resetBtn = document.getElementById("reset-btn");
    el.begBtn = document.getElementById("beg-btn");

    // bind
    if (el.spinBtn) el.spinBtn.addEventListener("click", playSlots);
    if (el.headsBtn) el.headsBtn.addEventListener("click", () => flipCoin("heads"));
    if (el.tailsBtn) el.tailsBtn.addEventListener("click", () => flipCoin("tails"));
    if (el.rollBtn) el.rollBtn.addEventListener("click", rollDice);
    if (el.cryBtn) el.cryBtn.addEventListener("click", cryCorner);
    if (el.resetBtn) el.resetBtn.addEventListener("click", resetBalance);
    if (el.begBtn) el.begBtn.addEventListener("click", begForMore);

    // initial UI reflect
    updateUI(state);
  }

  // If script loaded with "defer", DOM is already parsed; but guard with DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDOM);
  } else {
    initDOM();
  }
})();
