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
var pattern_service_1 = require('./engine/pattern-service');
var game_module_1 = require('./engine/game-module');
var AppComponent = (function () {
    function AppComponent(patternService) {
        this.patternService = patternService;
        this.ACTIVE = "active";
        this.pattern = new Array(0);
        this.status = game_module_1.GameStatus.NOT_RUNNING;
    }
    AppComponent.prototype.startGame = function () {
        var _this = this;
        //Check if the game is started
        if (this.status === game_module_1.GameStatus.RUNNING) {
        }
        //Call Pattern Service to create the pattern
        this.patternService.createPattern().then(function (pattern) { return _this.pattern = pattern; });
        if (this.pattern.length === 0) {
        }
        //Change the status to RUNNING
        this.status = game_module_1.GameStatus.RUNNING;
        //Display the pattern
        var that = this;
        this.displayPattern(0, undefined, this.pattern);
        //Start the timer
        this.startTimer();
    };
    AppComponent.prototype.endGame = function () {
        //Set the game status to NOT_RUNNING
        this.status = game_module_1.GameStatus.NOT_RUNNING;
        //delete the pattern
        var result;
        this.patternService.deletePattern().then(function (response) { return result = response; });
        if (!result) {
        }
    };
    AppComponent.prototype.resetGame = function () {
        this.endGame();
        this.startGame();
    };
    AppComponent.prototype.startTimer = function () {
        var _this = this;
        //Start a timer with Zero Delay, that emits a number every second.
        this.timer = Rx_1.Observable.timer(0, 1000);
        this.timer.subscribe(function (t) { return _this.timeElapsed; });
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
        }
        else {
            //first case: the index is pattern.size; exit out of bounds
            if (index === pattern.length) {
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
    };
    AppComponent.prototype.startButtonClick = function ($event) {
        console.log($event);
        var pattern = this.patternService.generateTestPattern(2);
        this.displayPattern(0, undefined, pattern);
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