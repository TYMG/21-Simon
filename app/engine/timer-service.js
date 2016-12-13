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
const Rx_1 = require('rxjs/Rx');
const BehaviorSubject_1 = require('rxjs/BehaviorSubject');
/**
 *
 * GameService
 *
 */
let TimerService = class TimerService {
    createClockMulticast() {
        var clockObservable = Rx_1.Observable.create(function (observer) {
            let timeoutClock = setTimeout(() => {
                console.log("TIME OUT");
                observer.error('timeout');
            }, 3000);
            // Provide a way of canceling and disposing the interval resource
            return function unsubscribe() {
                //kill the timeOut
                clearTimeout(timeoutClock);
            };
        });
        let clockSubject = new BehaviorSubject_1.BehaviorSubject(false);
        return Promise.resolve(clockObservable);
    }
};
TimerService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], TimerService);
exports.TimerService = TimerService;
//# sourceMappingURL=timer-service.js.map