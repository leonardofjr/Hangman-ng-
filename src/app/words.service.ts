import { Injectable } from '@angular/core';
import { Words } from './words';
import { WORDS } from './mock-words';
@Injectable()
export class WordsService {

  constructor() { }
  getWords(): Words[] {
    return WORDS;
  }
}
