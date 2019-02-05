import Home from './home.js';
import End from './end.js';
import Board from './board.js';
import { sound } from "./../data/sound.js"

const Game = (_ => {
    const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    // const words = ['Fortnite', 'Kush', 'ufc', 'Dab', 'Weed'];
    const words = ['fortnite', 'ufc', 'javascript', 'twitter', 'youtube']
    let chosenWord;
    let guessingWord;
    let lives;
    let guesses;

    // Cache the DOM
    const $hangman = document.querySelector(".hangman");


    const init = _ => {
        // 1. Choose Word
        chosenWord = chooseWord();
        // 2. Build out our guessing word to render
        guessingWord = Array(chosenWord.length).fill('_');
        guesses = [];
        lives = 7;
        // 3. Show Initial Page
        showInitialPage();
        listeners();
        Board.init();
    }

    const listeners = _ => {
        $hangman.addEventListener('click', _ => {
            if (event.target.matches('.hangman__letter')) {
                sound.click.play();
                check(event.target.innerHTML);
            }
            if (event.target.matches('.hangman__trigger')) {
                sound.click.play();
                Home.init();
            }
        })
    }

    const isAlreadyTaken = letter => {
        return guesses.includes(letter);
    }

    const check = guess => {
        // Check if taken
        if (isAlreadyTaken(guess)) return;
        guesses.push(guess);

        // Check if the guess exist in chosenWord
        if (chosenWord.includes(guess)) {
            // Update the guessing word
            updateGuessingWord(guess);
            // render();
        } else {
            lives--;
            // Update the board
            Board.setLives(lives);
            // render();
        }
        render();
        // Check if the game is over
        isGameOver();
    }

        const hasWon = _ => guessingWord.join('') === chosenWord;
        const hasLost = _ => lives <= 0;

    const isGameOver = _ => {
        // If won, alert('Win');
        if (hasWon()) {
            sound.win.play();
            End.setState({
                chosenWord,
                result: 'win'
            })
        }
        // If lost, alert('Lost');
        if (hasLost()) {
            sound.lose.play();
            End.setState({
                chosenWord,
                result: 'lose'
            })
        }
    }

    const render = _ => {
        document.querySelector('.hangman__lives').innerHTML = lives;
        document.querySelector('.hangman__word').innerHTML = guessingWord.join("");
        document.querySelector('.hangman__letters').innerHTML = createLetters();
    }

    const updateGuessingWord = letter => {
        chosenWord.split("").forEach((elem, index) => {
            if (elem === letter) {
                guessingWord[index] = elem;
            }
        })

    }

    const showInitialPage = _ => {
        let markup = "";
        markup += `
        <p class="hangman__stats">Lives:
            <span class="hangman__lives">${lives}</span>
        <p>
        <h1 class="hangman__title">Hangman</h1>
        <canvas class="hangman__board" height="155px"></canvas>
        <div class="hangman__word">${guessingWord.join("")}</div>
        <p class="hangman__instructions">Pick a letter below to guess the whole word.</p>
        <ul class="hangman__letters">
            ${createLetters()}
        </ul>
        <button class="button hangman__trigger">Main Menu</button>
        `
        $hangman.innerHTML = markup;
    }

    const createLetters = _ => {
        let markup = ``;
        letter.forEach(letter => {
            const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';
            markup += `
            <li class="hangman__letter ${isActive}">${letter}</li>
            `
        })
        return markup;
    }

    const chooseWord = _ => {
        let randNum = Math.floor(Math.random() * words.length)
        return words[randNum];
    }

    return {
        init
    }
})();

export default Game;