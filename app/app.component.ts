import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { GameService } from './engine/game-service'
import { PatternService } from './engine/pattern-service'
import { GameBoardComponent } from './game-board.component';
import { Color, GameStatus, Difficulty } from './engine/game-module'

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `<game-board (gamepadButtonEvent)="gameButtonClick($event)" (startButtonEvent)="startButtonClick($event)"></game-board>`,
  styleUrls: ["buttons.css"]
})

/**
 * 
 * The Game 
 * 
 */
export class AppComponent {
  
  constructor(private gameService: GameService,private patternService: PatternService) {
  }


  gameButtonClick($event) {
    console.log($event);
    let clickValue = $event.value - 1;
    this.patternService.validatePattern(clickValue);
  }



  startButtonClick($event) {
    console.log($event);
    this.gameService.startGame();
  }
}
