import { sound } from './../data/sound.js'
import Home from './home.js'

const How = (_ => {
    // Cache DOM
    const $hangman = document.querySelector('.hangman')

    const init = _ => {
        render();
        listeners();
    }

    const render = _ => {
        let markup =`
            <h1 class="hangman__title">Instructions</h1>
            <ul class="how">
            <li>Alright here is how you play!</li>
                <li>When you start a new game, the game will automatically choose a random word.</li>
                <li>Your job is to guess the chosen word completely by guessing a letter at a time by clicking on the buttons.</li>
                <li>If you successfully guess the word within 7 tries, you win or else you</li>
                <li>if you lose, you will be hanged without mercy.</li>
            </ul>
            <button class="button hangman__trigger">Main Menu</button>
            `
            $hangman.innerHTML = markup;
    }

    const listeners = _ => {
        document.querySelector(".hangman__trigger").addEventListener('click', _ => {
            sound.click.play();
            Home.init();

        })
    }

    return {
        init
    }
})();

export default How;