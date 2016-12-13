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
const game_service_1 = require('./engine/game-service');
const pattern_service_1 = require('./engine/pattern-service');
let AppComponent = class AppComponent {
    constructor(gameService, patternService) {
        this.gameService = gameService;
        this.patternService = patternService;
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
};
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        template: `<game-board (gamepadButtonEvent)="gameButtonClick($event)" (startButtonEvent)="startButtonClick($event)"></game-board>`,
        styleUrls: ["buttons.css"]
    }), 
    __metadata('design:paramtypes', [game_service_1.GameService, pattern_service_1.PatternService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map