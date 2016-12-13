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
const game_module_1 = require('./game-module');
const Subject_1 = require('rxjs/Subject');
/**
 *
 * PatternService
 *
 * Create Patterns
 * Display Patterns
 * Validate Patterns
 *
 */
let PatternService = class PatternService {
    constructor() {
        // Observable validatePattern source
        this.validatePatternSource = new Subject_1.Subject;
        // Observable navItem stream
        this.validateItem$ = this.validatePatternSource.asObservable();
    }
    createPattern() {
        let pattern = [this.colorGenerator()];
        this.setPattern(pattern);
        this.turn = 1;
        return Promise.resolve(pattern);
    }
    updatePattern(pattern) {
        if (this.pattern === undefined) {
            let newPattern = [this.colorGenerator()];
            this.turn = 1;
            this.pattern = newPattern;
        }
        else {
            let newColor = this.colorGenerator();
            pattern.push(newColor);
            this.turn = 1;
            this.pattern = pattern;
        }
        return Promise.resolve(this.pattern);
    }
    /**
     * The validatePattern will take a Color and a turn (where turn = index+1)
     *
     * validatePattern will take check is Color == Color[turn]
     *
     *
     */
    validatePattern(color) {
        let turn = this.turn;
        if (color == undefined || turn == undefined) {
            //Should throw an exception, lazy
            this.validatePatternSource.error("No Pattern or Turn");
        }
        if (this.pattern !== undefined) {
            let patternIndex = turn - 1;
            let patternTurnColor = this.pattern[patternIndex];
            //if the Pattern Color matches input color
            if (patternTurnColor === color.valueOf()) {
                //If the Turn Number is at the length of turn
                if (turn === this.pattern.length) {
                    //once the pattern has been matched fully, turn should be zero
                    this.turn = undefined;
                    this.validatePatternSource.next(0);
                    return;
                }
                else {
                    this.turn = turn + 1;
                    this.validatePatternSource.next(1);
                    return;
                }
            }
            else {
                //If the pattern color doesnt match the input color
                this.validatePatternSource.next(2);
                this.validatePatternSource.error("INPUT DIDN'T MATCH PATTERN");
            }
        }
        //No pattern means a game hasnt been started
    }
    deletePattern() {
        this.pattern = undefined;
        return Promise.resolve(true);
    }
    generateTestPattern(size) {
        if (size === 0) {
            //go fuck yourself
            return undefined;
        }
        let pattern = new Array(size);
        for (var index = 0; index < size; index++) {
            pattern[index] = this.colorGenerator();
        }
        return pattern;
    }
    colorGenerator() {
        let colorIndex = Math.floor(Math.random() * 100);
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
    }
    getPattern() {
        return this.pattern;
    }
    setPattern(pattern) {
        this.pattern = pattern;
    }
    getTurn() {
        return this.turn;
    }
    setTurn(turn) {
        this.turn = turn;
    }
    resetTurn() {
        this.turn = 1;
    }
};
PatternService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], PatternService);
exports.PatternService = PatternService;
//# sourceMappingURL=pattern-service.js.map