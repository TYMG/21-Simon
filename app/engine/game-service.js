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
const core_1 = require('@angular/core');
const BehaviorSubject_1 = require('rxjs/BehaviorSubject');
const pattern_service_1 = require('./pattern-service');
const timer_service_1 = require('./timer-service');
/**
 *
 * GameService
 *
 */
let GameService = class GameService {
    constructor(patternService, timerService) {
        this.patternService = patternService;
        this.timerService = timerService;
        this.pattern = new Array(0);
    }
    ngOnInit() {
    }
    startGame() {
        let that = this;
        //set the level to 1
        this.level = 0;
        this.pattern = undefined;
        /**
         * gameOver will control a loop that will progress the game
         * while startLevel is returning true (which means the player completed the level)
         *      call start level
         *      when it returns, if true
         *          this.level++
        */
        this.gameSubject = new BehaviorSubject_1.BehaviorSubject(false);
        this.gameSubscription = this.gameSubject.subscribe({
            next: x => { let validateLevelResponseBound = this.validateLevelResponse.bind(that, x); validateLevelResponseBound(); },
            error: err => { let gameOverBound = this.gameOver.bind(that, err); gameOverBound(); },
        });
        let nextLevelBound = this.nextLevel.bind(that);
        nextLevelBound();
    }
    validateLevelResponse(levelResult) {
        if (levelResult) {
            let that = this;
            let nextLevelBound = this.nextLevel.bind(that);
            nextLevelBound();
        }
    }
    gameOver(err) {
        this.patternService.deletePattern().then(response => deleted(response));
        let deleted = function (result) {
            if (!result) {
            }
            console.log("GAME OVER");
            console.log("Reason: " + err);
            return;
        };
    }
    /**
     * The nextLevel will unsubscribe from the old global LevelMulticast if exists.
     * Create a new LevelMulticast set it to the global
     * Increment the level
     * Reset the turn (need a promise?)
     * Start New Clock
     *
     */
    nextLevel() {
        this.level++;
        let that = this;
        if (this.levelSubscription !== undefined) {
            this.levelSubscription.unsubscribe();
        }
        /**
         * The LevelMulticast should return the game Observable
         */
        // Observable validatePattern source
        this.levelSubject = new BehaviorSubject_1.BehaviorSubject(false);
        this.levelSubscription = this.levelSubject.subscribe({
            next: x => { let continueBound = that.continue.bind(that, x); continueBound(); },
            error: error => { let endGameBound = that.endGame.bind(that, error); endGameBound(); }
        });
        let createPatternSubscriptionBound = this.createPatternSubscription.bind(that);
        this.patternSubscription = createPatternSubscriptionBound();
        let updatePatternPromise = this.patternService.updatePattern.bind(this.patternService, that.pattern);
        let updatePatternPromiseThenable = updatePatternPromise();
        updatePatternPromiseThenable.then(pattern => {
            let displayPatternPromise = (pattern) => new Promise(resolve => {
                let completeResolve = function () {
                    return true;
                };
                let patternDisplaySubject = new BehaviorSubject_1.BehaviorSubject(0);
                let patternDisplaySubscription = patternDisplaySubject.subscribe({
                    complete: () => resolve(true)
                });
                this.pattern = pattern;
                this.displayPattern(0, undefined, pattern, patternDisplaySubscription);
            });
            let displayPatternPromiseBound = displayPatternPromise.bind(that, pattern);
            let displayPatternPromiseBoundThenable = displayPatternPromiseBound();
            displayPatternPromiseBoundThenable.then(x => {
                this.patternService.resetTurn();
                let newClockBound = this.newClock.bind(that);
                newClockBound();
            });
        });
    }
    continue(levelResult) {
        if (levelResult) {
            this.patternSubscription.unsubscribe();
            this.gameSubject.next(true);
            return;
        }
    }
    endGame(err) {
        this.patternSubscription.unsubscribe();
        this.gameSubject.error(err);
        return;
    }
    newClock() {
        let that = this;
        //Create the Multicast Clock
        let clockMultiCastBound = this.timerService.createClockMulticast.bind(this.timerService);
        let clockMultiCastBoundThenable = clockMultiCastBound();
        clockMultiCastBoundThenable = this.timerService.createClockMulticast().then(timer => {
            let createClockSubscriptionBound = createClockSubscription.bind(that, timer);
            createClockSubscriptionBound();
        });
        //the levelSsubscribe to the clockMulticast, if the clock emit an Error, kill the game
        let createClockSubscription = function (clockObservable) {
            this.clockSubscription = clockObservable.subscribe({
                error: (err) => this.levelSubject.error(err)
            });
        };
    }
    createPatternSubscription() {
        let that = this;
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
        let patternValidationSubject = this.patternService.validatePatternSource;
        let patternObserver = {
            next: x => { let validBound = this.validateResponse.bind(that, x); validBound(); },
            error: err => { let errorBound = this.validationError.bind(that, err); errorBound(); },
            complete: () => { let completeBound = this.completedPattern.bind(that); completeBound(); return; }
        };
        return patternValidationSubject.subscribe(patternObserver);
    }
    validationError(err) {
        console.log(err);
        this.levelSubject.error(err);
    }
    completedPattern() {
        this.clockSubscription = undefined;
        console.log("Pattern Validated");
        this.patternSubscription.unsubscribe();
        this.levelSubject.next(true);
    }
    /**
              * validateResponse will recieve a "good" or "bad" return
              */
    validateResponse(response) {
        let that = this;
        //killed the old clock
        this.clockSubscription.unsubscribe();
        if (response !== undefined) {
            if (response === 0) {
                console.log("Pattern Validated");
                this.patternSubscription.unsubscribe();
                setTimeout(function () {
                    that.levelSubject.next(true);
                }, 2000);
            }
            else if (response === 1) {
                //start the new one
                let newClockBound = this.newClock.bind(that);
                newClockBound();
            }
            else if (response === 2) {
                this.patternSubscription.error.bind(this, 'Bad Button');
            }
        }
    }
    /**
    * displayPattern is a recursive function that will turn on and off buttons based
    * on the pattern. It will timeOut then call itself. It should terminate when the
    * index is out of bounds
    *
    */
    displayPattern(index, prevColor, pattern, patternDisplaySubscription) {
        //check values
        //first case: the index is pattern.size; exit out of bounds
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
                that.displayPattern(index, undefined, pattern, patternDisplaySubscription);
            }, 500);
        }
        else {
            //once the pattern finishes, the GameClock should start
            if (index === pattern.length) {
                setTimeout(function () {
                    patternDisplaySubscription.complete();
                    return;
                }, 500);
            }
            else {
                //get next color
                let currColor = pattern[index];
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
                    that.displayPattern(index + 1, currColor, pattern, patternDisplaySubscription);
                }, 1000);
            }
        }
    }
};
GameService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [pattern_service_1.PatternService, timer_service_1.TimerService])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game-service.js.map