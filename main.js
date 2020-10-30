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

/**
 * @author Matteo Fattorini
 * coded on 28/10/2020
 */

//!elements

scoreResultEl = document.getElementById("scoreResult");
numberInputEl = document.getElementById("numberInput");
pushNumBtnEl = document.getElementById("pushNum");
easyDiffEl = document.getElementById("easy");
mediumDiffEl = document.getElementById("medium");
hardDiffEl = document.getElementById("hard");
scoreBoxEl = document.getElementById("scorebox");
titleEl = document.getElementById("title");
wrapperEl = document.getElementById("wrapper");
mineFieldEl = document.getElementById("mineField");

//!variabili generiche

var USERPICKS = [];
var PICKNUMB = 16;
var lost = false;
var SCORE = 0;
var COUNTER = 0;
easyCheck = false;
mediumCheck = false;
hardCheck = false;
TOPEASYSCORE = "4200";
TOPMEDIUMSCORE = "3200";
TOPHARDSCORE = "1700";

//!functions

/**
 * questa funzione serve a generare un numero random compreso fra due valori
 * @param {number} min è il valore minimo, compreso
 * @param {number} max è il valore massimo, compreso
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min + 1;
}

/**
 * Funzione che crea un array di x numeri random unici
 * @param {number} rangeMin minimo numero compreso
 * @param {number} rangeMax ultimo numero compreso
 * @param {number} elements numero di elementi
 */

function randomNumList(rangeMin, rangeMax, elements) {
  var arr = [];
  while (arr.length < elements) {
    var r = getRandomInt(rangeMin, rangeMax);
    if (arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }
  return arr;
}

//Cell generator

function createMinebox(n) {
  for (var i = 0; i <= n; i++) {
    var newBox = document.createElement("div");
    newBox.className = "minebox";
    newBox.value = i;
    mineFieldEl.appendChild(newBox);
  }
}

/**
 * funzione che si occupa di gestire il gioco
 * caselle verdi se numero sicuro, altrimenti rosse e finisce il gioco
 */

function playGame() {
  scoreResultEl.innerHTML = 0;
  mineClass = document.getElementsByClassName("minebox");
  for (var i = 0; i < mineClass.length; i++) {
    mineClass[i].addEventListener("click", function (event) {
      if (lost) {
        alert("hai perso");
      } else {
        if (computerPicks.includes(event.target.value)) {
          event.target.style.backgroundColor = "red";

          alert("hai perso :( ");
          lost = true;
          for (var i = 0; i < mineClass.length; i++) {
            if (computerPicks.includes(mineClass[i].value)) {
              mineClass[i].style.backgroundColor = "red";
            }
          }
        } else {
          event.target.style.backgroundColor = "green";
          SCORE += 50;
          scoreResultEl.innerHTML = SCORE;
        }
      }
    });
  }
}

//!difficoltà facile

easyDiffEl.addEventListener("click", function () {
  computerPicks = randomNumList(1, 100, PICKNUMB);
  createMinebox(99);
  playGame();
  wrapperEl.style.display = "none";
  scoreBoxEl.style.display = "block";
  mediumDiffEl.style.display = "none";
  easyDiffEl.style.display = "none";
  hardDiffEl.style.display = "none";
  titleEl.innerHTML = "FACILE";
  easyDiffEl.style.fontSize = "2.5rem";
  easyDiffEl.style.color = "green";
});

//!difficoltà media

mediumDiffEl.addEventListener("click", function () {
  computerPicks = randomNumList(1, 80, PICKNUMB);
  createMinebox(79);
  playGame();
  wrapperEl.style.display = "none";
  scoreBoxEl.style.display = "block";
  mediumDiffEl.style.display = "none";
  easyDiffEl.style.display = "none";
  hardDiffEl.style.display = "none";
  titleEl.innerHTML = "MEDIO";
  mediumDiffEl.style.fontSize = "2.5rem";
  mediumDiffEl.style.color = "tomato";
});

// !difficoltà difficile

hardDiffEl.addEventListener("click", function () {
  computerPicks = randomNumList(1, 50, PICKNUMB);
  createMinebox(49);
  playGame();
  wrapperEl.style.display = "none";
  scoreBoxEl.style.display = "block";
  mediumDiffEl.style.display = "none";
  easyDiffEl.style.display = "none";
  hardDiffEl.style.display = "none";
  titleEl.innerHTML = "DIFFICILE";
  hardDiffEl.style.fontSize = "2.5rem";
  hardDiffEl.style.color = "red";
});
