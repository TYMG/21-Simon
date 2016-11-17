import { Component, Output,EventEmitter} from '@angular/core';
@Component({
  moduleId: module.id,
  selector: 'game-board',
  templateUrl: "game-board.html",

})

/**
 * 
 * The GameBoardComponent will handle the inputs from the board
 * 
 */
export class GameBoardComponent {
    @Output() gamepadButtonEvent = new EventEmitter();
    @Output() startButtonEvent = new EventEmitter();

    constructor() {}

    simonButtonClick(buttonIndex){
      this.gamepadButtonEvent.emit({
        value: buttonIndex
      })
    }

    simonStartButton(){
      this.startButtonEvent.emit({
        value: true
      })
    }
 }