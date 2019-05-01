import { Component, OnInit } from '@angular/core';
import { WordsService } from '../words.service';
import { Words } from '../words';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  topRow: string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  middleRow: string[] = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  bottomRow: string[] =  ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
  showHangman:boolean = true;
  playerInput: string = undefined;
  words;
  word: String[] = [];
  revealedLetters: String[] = [];
  lettersPlayed: String[] = [];
  letterCount: number = 0;
  lives: number = 0;
  matchFound: boolean;
  gameOver: boolean = false;
  win: boolean = false;
  showKeyboard: boolean = true;
  modalTitle: String;
  modalBody: String;

  constructor(private wordsSerivce: WordsService) { }

  ngOnInit() {
    this.showLogoutBtn();
    this.initGame();
  }
  resetGame() {
    this.lettersPlayed = [];
    this.letterCount = 0;
    this.lives = 0;
    this.win = false;
    this.gameOver = false;
    this.playerInput = undefined;
    this.revealedLetters = [];
    this.matchFound = undefined;
    this.words = undefined;
    this.word = [];
    this.showKeyboard = true;
    this.showHangman = true;
    this.initGame();
  }

  initGame() {
    this.chooseWord();

  }

  showLogoutBtn() {
    document.getElementById('logoutBtn').classList.remove('d-none');
  }

  chooseWord():void {
     this.wordsSerivce.getWords()
      .subscribe(
        res => {
          // Storing response
            this.words = res;
            // I'm choosing an item from the observable array by using the Math.random function
            this.words = res[Math.floor(Math.random() * this.words.length)];
            // Now that i've stored the word from the array I will  take every letter and store it in as an array
            for (let i = 0; i < this.words.word.length; i++) {
              this.word[i] = this.words.word.charAt(i).toLowerCase();
            }
        },
        err => {
          console.log(err.message);
        },
        () => {
          console.log("done");
        }
      )
  }


  process(e): void {
        this.matchFound = false;
        this.playerInput = e.target.innerHTML;
        if (this.gameOver === false) {
          if (!this.lettersPlayed.includes(this.playerInput)) {
              e.target.style.color = "#fff";
              e.target.style.background = "#444";
              this.lettersPlayed.push(this.playerInput);
              this.checkGuess();
              this.checkWin();
          }
        }

  }



  renderHangman(): void {
    if (this.showHangman) {

      if (this.gameOver === false) {
        this.lives++;
        document.getElementById('hangman-img').setAttribute('src', `./assets/imgs/${this.lives}.png`)
      }


      if (this.lives === 6) {
        this.gameOver = true;
        this.showKeyboard = false;
        this.showHangman = false;
        this.modalTitle = "You lose";
        this.modalBody = "You lose";
      }
    }

  }

  checkGuess(): void {
    this.word.forEach((letter, i) => {
      if (this.playerInput === letter) {
              document.getElementById(i.toString()).innerHTML = letter.toString().toUpperCase();
              this.revealedLetters.push(this.playerInput);
              this.matchFound = true;
            }
       })

      if (this.matchFound === false) {
        this.renderHangman();
      }    
    }

  checkWin(): void {
    if (this.revealedLetters.length === this.word.length) {
      this.gameOver = true;
      this.win = true;
      this.showKeyboard = false;
      this.showHangman = false;
      this.modalTitle = "You win";
      this.modalBody = "You win";
    }

  }





}
