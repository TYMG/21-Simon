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
/**
 *
 * GameService
 *
 * Create Patterns
 * Display Patterns
 * Validate Patterns
 *
 */
var GameService = (function () {
    function GameService() {
    }
    GameService.prototype.createPattern = function () {
        if (this.pattern != undefined) {
            return undefined;
        }
        var pattern = [this.colorGenerator()];
        this.setPattern(pattern);
        return pattern;
    };
    GameService.prototype.updatePattern = function () {
        if (this.getPattern != undefined) {
            this.createPattern;
            return;
        }
        var newColor = this.colorGenerator();
        this.getPattern().push(newColor);
        return this.getPattern();
    };
    /**
     * The Read Pattern will take a Color and a turn
     *
     * readPattern will take check is Color == Color[turn]
     */
    GameService.prototype.readPattern = function (color, turn) {
        if (color == undefined || turn == undefined) {
            //Should throw an exception, lazy
            return false;
        }
        var patternTurnColor = this.pattern[turn];
        if (patternTurnColor.valueOf === color.valueOf) {
            return true;
        }
        return false;
    };
    GameService.prototype.deletePattern = function () {
    };
    GameService.prototype.colorGenerator = function () {
        var colorIndex = Math.floor(Math.random() * 100);
        switch (colorIndex % 4) {
            case 0:
                return game_module_1.Color.GREEN;
            case 1:
                return game_module_1.Color.RED;
            case 2:
                return game_module_1.Color.BLUE;
            case 3:
                return game_module_1.Color.YELLOW;
        }
        return undefined;
    };
    GameService.prototype.getPattern = function () {
        return this.pattern;
    };
    GameService.prototype.setPattern = function (pattern) {
        this.pattern = pattern;
    };
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
//# sourceMappingURL=pattern-service.js.map