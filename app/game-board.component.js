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
var GameBoardComponent = (function () {
    function GameBoardComponent() {
        this.gamepadButtonEvent = new core_1.EventEmitter();
        this.startButtonEvent = new core_1.EventEmitter();
    }
    GameBoardComponent.prototype.simonButtonClick = function (buttonIndex) {
        this.gamepadButtonEvent.emit({
            value: buttonIndex
        });
    };
    GameBoardComponent.prototype.simonStartButton = function () {
        this.startButtonEvent.emit({
            value: true
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GameBoardComponent.prototype, "gamepadButtonEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GameBoardComponent.prototype, "startButtonEvent", void 0);
    GameBoardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'game-board',
            templateUrl: "game-board.html",
        }), 
        __metadata('design:paramtypes', [])
    ], GameBoardComponent);
    return GameBoardComponent;
}());
exports.GameBoardComponent = GameBoardComponent;
//# sourceMappingURL=game-board.component.js.map