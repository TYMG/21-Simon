import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * 
 * GameService
 * 
 */
@Injectable()
export class TimerService {

private timer;    

createClockMulticast(): Promise<Observable<boolean>> {
    var clockObservable = Observable.create(function (observer) {

      let timeoutClock = setTimeout(() => {
          console.log("TIME OUT")
        observer.error('timeout');
      }, 3000);
      // Provide a way of canceling and disposing the interval resource
      return function unsubscribe() {
        //kill the timeOut
        clearTimeout(timeoutClock);
      }
    });
    let clockSubject = new BehaviorSubject<boolean>(false);
    return Promise.resolve(clockObservable);
  }

}