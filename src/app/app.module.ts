import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { WordsService } from './words.service';

import 'rxjs/Rx';
import { SignInComponent } from './sign-in/sign-in.component';
@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: ' ', component: AppComponent },
      { path: 'game', component: GameComponent },
      { path: 'sign-in', component: SignInComponent }
    ])
  ],
  providers: [WordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
