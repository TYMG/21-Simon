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
/**
 *
 * GameService
 *
 */
var GameService = (function () {
    function GameService() {
    }
    GameService.prototype.createClockMulticast = function () {
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
        return Promise.resolve(multicasted);
    };
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
//# sourceMappingURL=timer-service.js.map