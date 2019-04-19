import { Injectable } from '@angular/core';
import { Words } from './words';
import { WORDS } from './mock-words';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WordsService {
  url = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }
  getWords() {
    return this.http.get(this.url + 'words');
  }
}
