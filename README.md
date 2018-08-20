# Memory Game Project

## Table of Contents

* How to play the game
* Issues

## How to play the game

Open the `index.html` file and the browser will open the game page. Once you click any card the timer will begin and the clicked card will get opened.
Your goal is to find every two matched cards. 
 You win when you find all the matched Cards. When you click a card it will get opened. When you click another card it will get opened and compared with the previous opened card:
 * If they are the same they stay opened and their color changes.
 * If they don't match they get closed (That's where memory is involved to remember where different cards are).
 
every two cards comparison counts as a move and you get star rated according to the number of moves you make:
 * If your moves reached 11 (or more) your rate drops to 2 stars out of 3.
 * If moves reached 17 (or more) your rate drops to only one stars out of 3.
 
 When you win a modal will show up showing you:
 * A congratulations mesage.
 * Your time
 * Your star rate.
 * The number of moves you've made.
 
 ## Issues
 
 when you open any two cards, wait until they get compared because if you tried to quickly open a third or more cards while they are getting compared a strange behaviour could occur.
