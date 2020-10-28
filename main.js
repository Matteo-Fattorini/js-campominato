// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati
// In seguito deve chiedere all'utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L'utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all'utente un altro numero.
// La partita termina quando il giocatore inserisce un numero "vietato" o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha inserito un numero consentito.
// BONUS: (da fare solo se funziona tutto il resto)
// all'inizio il software richiede anche una difficoltà all'utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 =>  tra 1 e 80
// con difficoltà 2 => tra 1 e 50

//!elements

scoreResultEl = document.getElementById("scoreResult");
numberInputEl = document.getElementById("numberInput");
pushNumBtnEl = document.getElementById("pushNum");
easyDiffEl = document.getElementById("easy");
mediumDiffEl = document.getElementById("medium");
hardDiffEl = document.getElementById("hard");
scoreBoxEl = document.getElementById("scorebox");
titleEl = document.getElementById("title");

//!functions

// !funzione per creare un numero random

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//!funzione per generare 16 numeri
function randomNumList(rangeMin, rangeMax) {
  var randomNumbers = [];
  var setRandomNumbers = new Set();
  while (setRandomNumbers.size < 16) {
    randomNumbers.push(getRandomInt(rangeMin, rangeMax));
    setRandomNumbers = new Set(randomNumbers);
  }
  return Array.from(setRandomNumbers);
}

//!funzione per vedere se il numero è presente nella lista del pc

function isPresent(num1, array) {
  var toggle = false;
  if (array.includes(num1)) toggle = true;
  return toggle;
}

//!variabili generiche

var USERPICKS = [];
var lost = false;
var SCORE = 0;
var COUNTER = 0;
easyCheck = false;
mediumCheck = false;
hardCheck = false;

//!difficoltà facile
easyDiffEl.addEventListener("click", function () {
  easyCheck = true;
  computerPicks = randomNumList(1, 101);
  scoreBoxEl.style.display = "block";
  mediumDiffEl.style.display = "none";
  hardDiffEl.style.display = "none";
  easyDiffEl.innerHTML = "FACILE";
  easyDiffEl.style.fontSize = "2.5rem";
  easyDiffEl.style.color = "green";
});

//!difficoltà media

mediumDiffEl.addEventListener("click", function () {
  mediumCheck = true;
  computerPicks = randomNumList(1, 81);
  scoreBoxEl.style.display = "block";
  easyDiffEl.style.display = "none";
  hardDiffEl.style.display = "none";
  mediumDiffEl.innerHTML = "MEDIO";
  mediumDiffEl.style.fontSize = "2.5rem";
  mediumDiffEl.style.color = "tomato";
});

// !difficoltà difficile

hardDiffEl.addEventListener("click", function () {
  hardCheck = true;
  computerPicks = randomNumList(1, 51);
  scoreBoxEl.style.display = "block";
  easyDiffEl.style.display = "none";
  mediumDiffEl.style.display = "none";
  hardDiffEl.innerHTML = "DIFFICILE";
  hardDiffEl.style.fontSize = "2.5rem";
  hardDiffEl.style.color = "red";
});

pushNumBtnEl.addEventListener("click", function () {
  //!controlliamo che non abbia vinto

  if (easyCheck && SCORE.toString() == "4200") {
    alert("HAI COMPLETATO IL GIOCO!!");
  }
  if (hardCheck && SCORE.toString() == "1700") {
    alert("HAI COMPLETATO IL GIOCO!!");
  }
  if (mediumCheck && SCORE.toString() == "3200") {
    alert("HAI COMPLETATO IL GIOCO!!");
  }
  console.log(easyCheck);

  //!controlliamo che non abbia perso

  if (lost) {
    alert("Hai perso! Premi F5 per riprovare!");
  }

  //! controlliamo che non abbia già inserito il numero
  if (USERPICKS.includes(numberInputEl.value)) {
    alert("hai già inserito questo numero");
    SCORE -= 50;
  }

  //! controlliamo che abbia inserito un numero

  if (isNaN(numberInputEl.value)) {
    alert("Non hai inserito un numero!");
    SCORE -= 50;
  }

  console.log(computerPicks);

  if (computerPicks.includes(parseInt(numberInputEl.value))) {
    lost = true;
    title.innerHTML = "HAI PERSO!!";
    title.style.color = "red";
    title.style.fontSize = "3rem";
  }

  if (!lost) {
    USERPICKS.push(numberInputEl.value);
    title.innerHTML = "TI È ANDATA BENE...";
    SCORE += 50;
    scoreResultEl.innerHTML = SCORE;
  }
});

// verifichiamo che non abbia perso o vinto il gioco


