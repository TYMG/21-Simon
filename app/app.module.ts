import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { GameBoardComponent } from './game-board.component';

import { PatternService } from './engine/pattern-service'


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    AppComponent, 
    GameBoardComponent
  ],
  providers: [ PatternService ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
