"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var pattern_service_1 = require('./engine/pattern-service');
var game_module_1 = require('./engine/game-module');
var AppComponent = (function () {
    function AppComponent(patternService) {
        this.patternService = patternService;
        this.ACTIVE = "active";
        this.pattern = new Array(0);
        this.status = game_module_1.GameStatus.NOT_RUNNING;
        this.turn = 1;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.startGame = function () {
        //Check if the game is started
        /*  if (this.status === GameStatus.RUNNING) {
            //Ask if the user wants to reset the game;
          }*/
        /* Call Pattern Service to create the pattern, using Promise's then prevents the code from
        executing without the pattern */
        this.patternService.createPattern().then(function (pattern) { return newPattern(pattern); });
        //Change the status to RUNNING
        //this.status = GameStatus.RUNNING;
        //Display the pattern
        var that = this;
        var newPattern = function (pattern) {
            that.displayPattern(0, undefined, pattern);
        };
        return;
    };
    /**
     * CreateTurn will
     *    killClock if Active
     *    increment the turn by one
     *    start new clock
     */
    AppComponent.prototype.createTurn = function () {
        var that = this;
        if (that !== undefined) {
            that.killGameClock.bind(that);
        }
        var currentTurn = this.turn += 1;
        this.startGameClock();
    };
    /**
     *
     * startGameClock takes in a turn
     */
    AppComponent.prototype.startGameClock = function () {
        var _this = this;
        var that = this;
        //Retrive the patternService validatePattern Subject
        var patternValidationSubject = this.patternService.validatePatternSource;
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
        var gameObserver = {
            next: function (x) { return that.validateResponse.bind(that, x); },
            error: function (err) { return that.endGame.bind(that, err); },
            complete: function () { return that.nextLevel.bind(that); },
        };
        patternValidationSubject.subscribe(gameObserver);
        //Create the Multicast Clock
        this.clockMulticast = this.createClockMulticast();
        //subscribe to the clockMulticast, if the clock emit an Error, kill the game
        this.unsubscribed = this.clockMulticast.subscribe({
            error: function (err) { return _this.endGame(); }
        });
        console.log("Test");
    };
    AppComponent.prototype.killGameClock = function (subscriber) {
        if (subscriber !== undefined) {
            subscriber.unsubscribe();
        }
    };
    /**
   * The createClockMulticast function will create a Clock Observable that contains a the setTimeout function
   * which will call Observer.Error after 3 secs
   *
   *
   */
    AppComponent.prototype.createClockMulticast = function () {
        var clockObservable = Rx_1.Observable.create(function (observer) {
            var intervalID = setTimeout(function () {
                observer.error('timeout');
            }, 3000);
            // Provide a way of canceling and disposing the interval resource
            return function unsubscribe() {
                //kill the timeOut
                clearTimeout(this.intervalID);
            };
        });
        var clockSubject = new BehaviorSubject_1.BehaviorSubject(false);
        /*
        refCount makes the multicasted Observable automatically start executing when the first subscriber arrives,
         and stop executing when the last subscriber leaves.
        */
        var multicasted = clockObservable.multicast(clockSubject).refCount();
        ;
        return multicasted;
    };
    /**
      * validateResponse will recieve a "good" or "bad" return
      */
    AppComponent.prototype.validateResponse = function (response) {
        if (response !== undefined) {
            if (response === 'pass') {
                this.createTurn();
            }
            else if (response === 'fail') {
                this.endGame();
            }
        }
        return;
    };
    /**
     * nextLevel will
     *    zero out the turn counter
     *    increment the level
     */
    AppComponent.prototype.nextLevel = function () {
        this.turn == 0;
        this.level += 1;
        var newPattern = this.patternService.updatePattern();
        newPattern.then(function (newPattern) {
            this.displayPattern(0, undefined, newPattern);
        });
    };
    AppComponent.prototype.endGame = function () {
        var unsubscribe = this.unsubscribed;
        this.killGameClock(unsubscribe);
        //Set the game status to NOT_RUNNING
        //that.status = GameStatus.NOT_RUNNING;
        //delete the pattern
        this.patternService.deletePattern().then(function (response) { return deleted(response); });
        var deleted = function (result) {
            if (!result) {
            }
            console.log("GAME OVER");
        };
    };
    AppComponent.prototype.resetGame = function () {
        this.endGame();
        this.startGame();
    };
    /**
     * displayPattern is a recursive function that will turn on and off buttons based
     * on the pattern. It will timeOut then call itself. It should terminate when the
     * index is out of bounds
     *
     */
    AppComponent.prototype.displayPattern = function (index, prevColor, pattern) {
        //check values
        if (index === undefined || prevColor === undefined) {
        }
        var that = this;
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
        }
        else {
            //first case: the index is pattern.size; exit out of bounds
            if (index === pattern.length) {
                //once the pattern finishes, the GameClock should start
                setTimeout(function () {
                    that.startGameClock();
                }, 2000);
                return;
            }
            //get next color
            var currColor_1 = pattern[index];
            //third case: remove prev color and find the next
            console.log("Activating Color: " + currColor_1);
            switch (currColor_1) {
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
                that.displayPattern(index + 1, currColor_1, pattern);
            }, 1000);
        }
    };
    AppComponent.prototype.failNotification = function () {
    };
    AppComponent.prototype.gameButtonClick = function ($event) {
        console.log($event);
        var clickValue = $event.value - 1;
        this.patternService.validatePattern(clickValue, this.turn);
    };
    AppComponent.prototype.startButtonClick = function ($event) {
        console.log($event);
        var that = this;
        var startGame = this.startGame;
        var startGameBound = startGame.bind(that);
        startGameBound();
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            template: "<game-board (gamepadButtonEvent)=\"gameButtonClick($event)\" (startButtonEvent)=\"startButtonClick($event)\"></game-board>",
            styleUrls: ["buttons.css"]
        }), 
        __metadata('design:paramtypes', [pattern_service_1.PatternService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map