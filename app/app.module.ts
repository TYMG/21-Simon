import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { GameBoardComponent } from './game-board.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    AppComponent, 
    GameBoardComponent
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
