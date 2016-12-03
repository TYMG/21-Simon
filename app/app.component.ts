import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


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

  private timer: Observable<number>;
  private timeElapsed: number;
  private timeLimit: number;
  private status: GameStatus;
  private difficulty: Difficulty;
  private pattern: Array<Color>;
  private level: number;
  private turn: number;

  private validationSubscription: Subscription;
  private validationObservable;

  private clockMulticast;
  private unsubscribed;

  constructor(private patternService: PatternService) {
    this.pattern = new Array<Color>(0);
    this.status = GameStatus.NOT_RUNNING;
    this.turn = 1;
  }

  ngOnInit() {
      
     
  }


  startGame() {
    //Check if the game is started
    /*  if (this.status === GameStatus.RUNNING) {
        //Ask if the user wants to reset the game;
      }*/
    /* Call Pattern Service to create the pattern, using Promise's then prevents the code from
    executing without the pattern */
    this.patternService.createPattern().then(pattern => newPattern(pattern));
    //Change the status to RUNNING
    //this.status = GameStatus.RUNNING;
    //Display the pattern
    let that = this;
    let newPattern = function (pattern) {
      that.displayPattern(0, undefined, pattern);
    }


    return;
  }


  /**
   * CreateTurn will 
   *    killClock if Active
   *    increment the turn by one
   *    start new clock
   */
  createTurn() {
    let that = this;
    if (that !== undefined) {
      that.killGameClock.bind(that);
    }
    let currentTurn = this.turn += 1;
    this.startGameClock();
  }

  /**
   * 
   * startGameClock takes in a turn
   */
  startGameClock() {

    let that = this;
 
    //Retrive the patternService validatePattern Subject
    let patternValidationSubject = this.patternService.validatePatternSource;
  /*
    Create a observer to subscribe to the Subject
    If the Game receives Err from PatternValidation  (Pattern is incorrect)
      The timer does not need to restart 
	    The game is over 
    So if the clock receives a next(turnNumber)
	    The button the player clicked was right.
	    The timer needs to restart and wait for input again
    If the clock receives a complete()
	    The player correctly entered a full pattern
	    Call next(Level Num)
    */

    let gameObserver = {
      next: x => that.validateResponse.bind(that,x),
      error: err => that.endGame.bind(that,err),
      complete: () => that.nextLevel.bind(that),
    };

    patternValidationSubject.subscribe(gameObserver);

    //Create the Multicast Clock
    this.clockMulticast = this.createClockMulticast();
    //subscribe to the clockMulticast, if the clock emit an Error, kill the game
    this.unsubscribed = this.clockMulticast.subscribe({
      error: (err) => this.endGame()
    });
    console.log("Test");
  }

  killGameClock(subscriber) {
    if (subscriber !== undefined) {
      subscriber.unsubscribe();
    }
  }

  /**
 * The createClockMulticast function will create a Clock Observable that contains a the setTimeout function
 * which will call Observer.Error after 3 secs
 *  
 * 
 */
  createClockMulticast() {
    var clockObservable = Observable.create(function (observer) {

      var intervalID = setTimeout(() => {
        observer.error('timeout');
      }, 3000);
      // Provide a way of canceling and disposing the interval resource
      return function unsubscribe() {
        //kill the timeOut
        clearTimeout(this.intervalID);
      }
    });
    let clockSubject = new BehaviorSubject<boolean>(false);
    /*
    refCount makes the multicasted Observable automatically start executing when the first subscriber arrives,
     and stop executing when the last subscriber leaves.
    */
    let multicasted = clockObservable.multicast(clockSubject).refCount();;
    return multicasted;
  }
     /**
       * validateResponse will recieve a "good" or "bad" return
       */
    validateResponse(response) {
      if (response !== undefined) {
        if (response === 'pass') {
          this.createTurn();
        } else if (response === 'fail') {
          this.endGame();
        }
      }
      return;
    }

    /**
     * nextLevel will 
     *    zero out the turn counter
     *    increment the level
     */
  nextLevel() {
      this.turn == 0;
      this.level += 1;
      let newPattern = this.patternService.updatePattern();
      newPattern.then(function (newPattern) {
        this.displayPattern(0, undefined, newPattern);
      });
    }

  endGame() {
    let unsubscribe = this.unsubscribed;
    this.killGameClock(unsubscribe);
    //Set the game status to NOT_RUNNING
    //that.status = GameStatus.NOT_RUNNING;
    //delete the pattern
    this.patternService.deletePattern().then(response => deleted(response));
    let deleted = function (result) {
      if (!result) {
        //Fatal Exception: 
      }
      console.log("GAME OVER");

    }
  }

  resetGame() {
    this.endGame();
    this.startGame();
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

      //Color.GREEN;
      document.getElementById('simon-button-top-left').style.backgroundColor = null;

      //Color.RED;
      document.getElementById('simon-button-top-right').style.backgroundColor = null;

      //Color.YELLOW;
      document.getElementById('simon-button-bottom-left').style.backgroundColor = null;

      //Color.BLUE;
      document.getElementById('simon-button-bottom-right').style.backgroundColor = null;

      /** 
       * call setTimout with much shorter time.
       * Have the timeOut have displayPattern again with same index,pattern, but no prevColor
       */
      setTimeout(function () {
        that.displayPattern(index, undefined, pattern);
      }, 500);
    } else {
      //first case: the index is pattern.size; exit out of bounds
      if (index === pattern.length) {
        //once the pattern finishes, the GameClock should start
        setTimeout(function () {
          that.startGameClock();
        }, 2000);
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
    let clickValue = $event.value - 1;
    this.patternService.validatePattern(clickValue, this.turn);
  }



  startButtonClick($event) {
    console.log($event);
    let that = this;
    let startGame = this.startGame;
    let startGameBound = startGame.bind(that);
    startGameBound();
  }
}
