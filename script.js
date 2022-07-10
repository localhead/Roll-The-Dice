'use strict';

// Selecting Elements
/* 


*/
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

/* Если будет '#' вместо '.' - тогда будет обращение по АйДи*/
const score0El = document.querySelector('#score--0');
/* 
Выхватывание элемента по айди. Работает точно так же как и по классам 
По сути айди работает быстрее, но разница будет если счет идет на тысячи
*/
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice-img');

const btnRollDice = document.querySelector('.rolldice');
const btnNewGame = document.querySelector('.new-game');
const btnHold = document.querySelector('.hold');

/* КНОПКИ ДЛЯ МОДАЛЬНЫХ ОКОН */
const btnHowTo = document.querySelector('.header__rules-button');
const btnCloseModal = document.querySelector('.modal-screen__close-button');
const rulesModal = document.querySelector('.modal-screen');

//Меняем начальные значения элементов на экране
score0El.textContent = 0;
score1El.textContent = 0;

//varibales

const scores = [0, 0];
const pointsTillVict = [100, 100];
let currentScore = 0;
// Флаг для определения активного игрока
let activePlayer = 0; // 0 - first player, 1 - second player

// Флаг активности игры
let playing = true;
// Прячем кубик с экрана
diceEl.classList.add('hidden');

/* Функция переключения игорька */
const switchPlayer = function () {
  // обнуляем currentScore для бывшего активного игрока
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // добавляем непрозрачность для бывшего активного игрока, и убираем у следующего
  currentScore = 0;
  /* 
      Используем тернарный оператор для возможности
      переключений между игорьками в обе стороны 
  */
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Добавление класса при условии, что его нет
  player0El.classList.toggle('player--passive');
  player1El.classList.toggle('player--passive');
};

/* 



*/
//Rolling Dice function
btnRollDice.addEventListener('click', function () {
  if (playing === true) {
    // 1) Generating Random Dice roll

    // Random number from 0 -6
    const diceRand = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRand);

    // 2) Display the dice
    diceEl.classList.remove('hidden');

    // Paste the picture acordingly. Changing picture in JS
    diceEl.src = `./img/dice/dice-${diceRand}.png`;

    // 3) Check for rolled: 1) if true - add to current, switch to next player
    if (diceRand !== 1) {
      currentScore = currentScore + diceRand;

      // меняем контент на странице в зависимости от номера активного игрока
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Swith to next player
      switchPlayer();
    }
  }
});

// Hold the current score btn
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active's player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    pointsTillVict[activePlayer] -= currentScore;
    document.getElementById(`till-victory--${activePlayer}`).textContent =
      pointsTillVict[activePlayer];
    // check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document.querySelector(
        `.overall-score--${activePlayer}`
      ).style.backgroundColor = '#60b347';
      diceEl.classList.add('hidden');
      document.querySelector(
        `.current-points-content--${activePlayer}`
      ).style.backgroundColor = '#60b347';
      document.getElementById(`score--${activePlayer}`).style.color = '#fff';
      document.getElementById(`current--${activePlayer}`).textContent = '0';
      document.getElementById(`till-victory--${activePlayer}`).textContent =
        'Winner!';
    } else {
      // switch to the next player
      switchPlayer();
    }
    // finish the game
  }
});

// New Game btn
btnNewGame.addEventListener('click', function () {
  playing = true;

  diceEl.classList.remove('hidden');
  scores[0] = 0;
  scores[1] = 0;
  pointsTillVict[0] = 100;
  pointsTillVict[1] = 100;
  currentScore = 0;
  document.querySelector(
    `.overall-score--${activePlayer}`
  ).style.backgroundColor = '#fff';
  document.querySelector(
    `.current-points-content--${activePlayer}`
  ).style.backgroundColor = '#fff';
  document.getElementById(`score--${activePlayer}`).style.color = '#fc466b';
  score0El.textContent = '0';
  score1El.textContent = '0';
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  document.getElementById(`till-victory--${activePlayer}`).textContent = '0';
  switchPlayer();
});
/* 




*/
/* Modal windows */
btnHowTo.addEventListener('click', function () {
  rulesModal.classList.remove('hidden-mod');
  document.querySelector('.overlay').classList.remove('hidden');
});

btnCloseModal.addEventListener('click', function () {
  rulesModal.classList.add('hidden-mod');
  document.querySelector('.overlay').classList.add('hidden');
});

document.addEventListener('keydown', function (e) {
  console.log(e.key);

  if (e.key === 'Escape' && !rulesModal.classList.contains('hidden-mod')) {
    rulesModal.classList.add('hidden-mod');
    document.querySelector('.overlay').classList.add('hidden');
  }
});
