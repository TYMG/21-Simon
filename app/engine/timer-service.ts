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
export class GameService {
    
createClockMulticast(): Promise<Observable<boolean>> {
    var clockObservable = Observable.create(function (observer) {

      var intervalID = setTimeout(() => {
        observer.error('timeout');
      }, 3000);
      // Provide a way of canceling and disposing the interval resource
      return function unsubscribe() {
        //kill the timeOut
        clearTimeout(this.intervalID);
      }
    });
    let clockSubject = new BehaviorSubject<boolean>(false);
    /*
    refCount makes the multicasted Observable automatically start executing when the first subscriber arrives,
     and stop executing when the last subscriber leaves.
    */
    let multicasted = clockObservable.multicast(clockSubject).refCount();
    return Promise.resolve(multicasted);
  }

}