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
var game_module_1 = require('./game-module');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
/**
 *
 * PatternService
 *
 * Create Patterns
 * Display Patterns
 * Validate Patterns
 *
 */
var PatternService = (function () {
    function PatternService() {
        // Observable validatePattern source
        this.validatePatternSource = new BehaviorSubject_1.BehaviorSubject(0);
        // Observable navItem stream
        this.validateItem$ = this.validatePatternSource.asObservable();
    }
    PatternService.prototype.createPattern = function () {
        var pattern = [this.colorGenerator()];
        this.setPattern(pattern);
        return Promise.resolve(pattern);
    };
    PatternService.prototype.updatePattern = function () {
        if (this.getPattern != undefined) {
            this.createPattern;
            return;
        }
        var newColor = this.colorGenerator();
        this.getPattern().push(newColor);
        return Promise.resolve(this.getPattern());
    };
    /**
     * The validatePattern will take a Color and a turn (where turn = index+1)
     *
     * validatePattern will take check is Color == Color[turn]
     *
     *
     */
    PatternService.prototype.validatePattern = function (color, turn) {
        if (color == undefined || turn == undefined) {
            //Should throw an exception, lazy
            this.validatePatternSource.error("No Pattern or Turn");
        }
        if (this.pattern !== undefined) {
            var patternIndex = turn - 1;
            var patternTurnColor = this.pattern[patternIndex];
            //if the Pattern Color matches input color
            if (patternTurnColor === color.valueOf()) {
                //If the Turn Number is at the length of turn
                if (turn === this.pattern.length) {
                    this.validatePatternSource.complete();
                }
                else {
                    this.validatePatternSource.next(1);
                }
            }
            //If the pattern color doesnt match the input color
            this.validatePatternSource.next(2);
        }
        //No pattern means a game hasnt been started
        this.validatePatternSource.next(0);
    };
    PatternService.prototype.deletePattern = function () {
        this.pattern = new Array(0);
        return Promise.resolve(true);
    };
    PatternService.prototype.generateTestPattern = function (size) {
        if (size === 0) {
            //go fuck yourself
            return undefined;
        }
        var pattern = new Array(size);
        for (var index = 0; index < size; index++) {
            pattern[index] = this.colorGenerator();
        }
        return pattern;
    };
    PatternService.prototype.colorGenerator = function () {
        var colorIndex = Math.floor(Math.random() * 100);
        switch (colorIndex % 4) {
            case 0:
                return game_module_1.Color.GREEN;
            case 1:
                return game_module_1.Color.RED;
            case 2:
                return game_module_1.Color.YELLOW;
            case 3:
                return game_module_1.Color.BLUE;
        }
        return undefined;
    };
    PatternService.prototype.getPattern = function () {
        return this.pattern;
    };
    PatternService.prototype.setPattern = function (pattern) {
        this.pattern = pattern;
    };
    PatternService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PatternService);
    return PatternService;
}());
exports.PatternService = PatternService;
//# sourceMappingURL=pattern-service.js.map