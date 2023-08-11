# Wangle: the Angular Wordle Clone

## Overview

Implement the popular word-guessing game, Wordle, as Web App developed with Angular. The application will consist of a user interface to input guesses, display feedback, and manage game logic.

## Functional Requirements

* Upon starting the game, the user should be presented with simple instructions on how to play the game.
* The game should generate a random, secret five-letter word to guess.
* A human player should be able to input at most 6 guesses for the secret word, as long as the guess is a valid five-letter word.
* The game should evaluate the user's guesses and provide feedback on the correctness of each letter by highlighting correct letters in the correct position in green, correct letters in the wrong position in yellow, and incorrect letters--not in the word--in red.
* The game should keep track of the player's progress--including the number of attempts remaining, the letters guessed, and the feedback recieved--and update the game state accordingly.
* Winning or losing the game should be identified and the app should close gracefully after the game ends.

## Technical Requirements

* This project will be generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.6.
* Use RxJS to manage game state and business logic.
* All business logic should have close to 100% test coverage with unit tests.
* The code should be well organized and follow the Four Rules of Simple Design.
* There should be no major violations of the SOLID principles in the code.

## Dependencies
* [Node.js](https://nodejs.org/) 20.5.0
* [Angular CLI](https://github.com/angular/angular-cli) 16.1.6

## Setup
1. [Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to your local computer.
2. Use your terminal to navigate into your new wardle folder and install project dependencies by running `ng build`.
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
4. Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).
