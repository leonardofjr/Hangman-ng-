import { Component, OnInit } from '@angular/core';
import { WordsService } from '../words.service';
import { Words } from '../words';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  topRow: string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
  middleRow: string[] = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
  bottomRow: string[] =  ['z', 'x', 'c', 'v', 'b', 'n', 'm']

  playerInput: string = undefined;
  words: any[];
  word: String[] = [];
  revealedLetters: String[] = [];
  lettersPlayed: String[] = [];
  letterCount: number = 0;
  lives: number = 0;
  matchFound: boolean;
  gameOver: boolean = false;
  win: boolean = false;

  constructor(private wordsSerivce: WordsService) { }

  ngOnInit() {
    console.log(this.words);
    this.getWords();
    this.sliceWord();

  }

  getWords(): void {
    this.words = this.wordsSerivce.getWords();
  }

  chooseWord(): String {
    return this.words[Math.floor(Math.random() * this.words.length)]
  }

  sliceWord(): void {
    const temp = this.chooseWord();
    for (let i = 0; i < temp.length; i++) {
      this.word[i] = temp.charAt(i).toLowerCase();
    }
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
    if (this.gameOver === false) {
      this.lives++;
      document.getElementById('hangman-img').setAttribute('src', `./assets/imgs/${this.lives}.png`)
    }


    if (this.lives === 6) {
      this.gameOver = true;
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
    }
  }





}
