const len = document.getElementById("length");//input length
//checkboxes
const upper = document.getElementById("upperCase");
const lower = document.getElementById("lowerCase");
const num = document.getElementById("number");
const sym = document.getElementById("symbol");
//output
const password = document.getElementById("passWord");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const togglePassword = document.getElementById("togglePassword");
//button
const btn = document.getElementById("generate");
//what to get
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const symbols = "!@#$%^&*()-_=+[{]}:;'<>.,?";
const numbers = "0123456789";

//generate fx
function generatePassword() {
  const myLength = parseInt(len.value);
  let choices = "";
  let finalWord = "";

  //Validate length
  if (isNaN(myLength) || myLength < 8 || myLength > 124) {
    password.textContent = "X Please enter a length between 8 and 124.";
    return;
  }

  //Build character set
  if (upper.checked) choices += alphabet;
  if (lower.checked) choices += lowerLetters;
  if (num.checked) choices += numbers;
  if (sym.checked) choices += symbols;

  if (choices === "") {
    password.textContent = "X Please select at least one character type.";
    return;
  }

  for (let i = 0; i < myLength; i++) {
    const randIndex = Math.floor(Math.random() * choices.length);
    finalWord += choices[randIndex];
  }

  password.textContent = finalWord;
  evaluateStrength(finalWord);
  togglePassword.checked = false;
  password.style.color = "transparent";
  password.style.textShadow = "0 0 8px rgba(255,255,255,0.5)"; 
  return finalWord;
}


btn.addEventListener('click', generatePassword);
btn.addEventListener("click", () => {
  // Add spin class to button
  btn.classList.add("spin");

  // Remove it after animation ends (so it can repeat next click)
  setTimeout(() => {
    btn.classList.remove("spin");
  }, 500); // Matches animation duration
});

//copy to clipboard button
const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", () => {
  const text = password.textContent.trim();

  if (!text) {
    alert("❌ No password to copy!");
    return;
  }

  navigator.clipboard.writeText(text)
  .then( () => {
    alert("✅ Password copied to clipboard!");
  })
  .catch(err => {
    alert("❌ Failed to copy password.");
    console.error(err);
  });
});

function evaluateStrength(password) {
  let score = 0;

  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Cap the score
  if (score > 4) score = 4;

  const strengthLevels = [
    { text: "Very Weak", color: "red", width: "25%" },
    { text: "Weak", color: "orange", width: "40%" },
    { text: "Medium", color: "gold", width: "60%" },
    { text: "Strong", color: "limegreen", width: "80%" },
    { text: "Very Strong", color: "green", width: "100%" },
  ];

  const level = strengthLevels[score];

  strengthBar.style.width = level.width;
  strengthBar.style.backgroundColor = level.color;
  strengthText.textContent = `Strength: ${level.text}`;
}

togglePassword.addEventListener("change", () => {
  if (togglePassword.checked) {
    // Show password
    password.style.color = "white";
  } else {
    // Hide password
    password.style.color = "transparent";
    password.style.textShadow = "0 0 8px rgba(255,255,255,0.5)";
  }
});