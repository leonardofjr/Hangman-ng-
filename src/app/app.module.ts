import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { AboutComponent } from './about/about.component';
import { WordsService } from './words.service';

import 'rxjs/Rx';
@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'game', component: GameComponent },
      { path: 'about', component: AboutComponent }
    ])
  ],
  providers: [WordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
