import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { GameBoardComponent } from './game-board.component';

import { PatternService } from './engine/pattern-service'
import { GameService } from './engine/game-service'
import { TimerService } from './engine/timer-service'


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    AppComponent, 
    GameBoardComponent
  ],
  providers: [ 
    PatternService ,
    GameService,
    TimerService
    ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
