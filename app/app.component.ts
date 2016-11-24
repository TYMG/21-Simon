import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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
  private ACTIVE: string = "active";

  //Retrive all the HTML Elements
  private redButton: HTMLElement;
  private blueButton: HTMLElement;
  private greenButton: HTMLElement;
  private yellowButton: HTMLElement;

  private timer: Observable<number>;
  private timeElapsed: number;
  private timeLimit: number;
  private status: GameStatus;
  private difficulty: Difficulty;
  private pattern: Array<Color>;
  private level: number;

  constructor(private patternService: PatternService) {
    this.pattern = new Array<Color>(0);
    this.status = GameStatus.NOT_RUNNING;
  }

  startGame() {
    //Check if the game is started
    if (this.status === GameStatus.RUNNING) {
      //Ask if the user wants to reset the game;
    }
    //Call Pattern Service to create the pattern
    this.patternService.createPattern().then(pattern => this.pattern = pattern);
    if (this.pattern.length === 0) {
      //failed
    }
    //Change the status to RUNNING
    this.status = GameStatus.RUNNING;
    //Display the pattern
    let that = this;
    this.displayPattern(0, undefined, this.pattern);
    //Start the timer
    this.startTimer();
  }

  endGame() {
    //Set the game status to NOT_RUNNING
    this.status = GameStatus.NOT_RUNNING;
    //delete the pattern
    let result;
    this.patternService.deletePattern().then(response => result = response);
    if (!result) {
      //Fatal Exception: 
    }
  }

  resetGame() {
    this.endGame();
    this.startGame();
  }

  startTimer() {
    //Start a timer with Zero Delay, that emits a number every second.
    this.timer = Observable.timer(0, 1000);
    this.timer.subscribe(t => this.timeElapsed);
  }




  /**
   * displayPattern is a recursive function that will turn on and off buttons based 
   * on the pattern. It will timeOut then call itself. It should terminate when the
   * index is out of bounds
   * 
   */
  displayPattern(index, prevColor, pattern: Array<Color>) {
    //check values
    if (index === undefined || prevColor === undefined) {
      //fail
    }
    let that = this;
    //remove prev color if exists
    if (prevColor !== undefined) {
      console.log("Deactivating Color: " + prevColor);
      switch (prevColor) {
        case 0:
          //Color.GREEN;
          document.getElementById('simon-button-top-left').style.backgroundColor = "rgba(0, 128, 0, .6)";
          break;
        case 1:
          //Color.RED;
          document.getElementById('simon-button-top-right').style.backgroundColor = "rgba(255,0,0,.6)";
          break;
        case 2:
          //Color.YELLOW;
          document.getElementById('simon-button-bottom-left').style.backgroundColor = "rgba(255,255,0,.6)";
          break;
        case 3:
          //Color.BLUE;
          document.getElementById('simon-button-bottom-right').style.backgroundColor = "rgba(9,60,255,.6)";
          break;
      }
    /** 
     * call setTimout with much shorter time.
     * Have the timeOut have displayPattern again with same index,pattern, but no prevColor
     */
       setTimeout(function () {
        that.displayPattern(index, undefined, pattern);
      }, 500);
    }else{
    //first case: the index is pattern.size; exit out of bounds
    if (index === pattern.length) {
      return;
    }
        //get next color
    let currColor: Color = pattern[index];
    //third case: remove prev color and find the next
    console.log("Activating Color: " + currColor);
    switch (currColor) {
      case 0:
        //Color.GREEN;
        document.getElementById('simon-button-top-left').style.backgroundColor = "rgba(0, 128, 0, 1)";
        break;
      case 1:
        //Color.RED;
        document.getElementById('simon-button-top-right').style.backgroundColor = "rgba(255,0,0,1)";
        break;
      case 2:
        //Color.YELLOW;
        document.getElementById('simon-button-bottom-left').style.backgroundColor = "rgba(255,255,0,1)";
        break;
      case 3:
        //Color.BLUE;
        document.getElementById('simon-button-bottom-right').style.backgroundColor = "rgba(9,60,255,1)";
        break;
    }
    //call setTimout with displayPattern with the index incremented
    setTimeout(function () {
      that.displayPattern(index + 1, currColor, pattern);
    }, 1000);
    }
  }

  failNotification() {

  }

  gameButtonClick($event) {
    console.log($event);
  }
  startButtonClick($event) {

    console.log($event);
    let pattern = this.patternService.generateTestPattern(2);
    this.displayPattern(0, undefined, pattern);
  }
}
