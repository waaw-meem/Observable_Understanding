import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // WE USE SUBSCRIPTION BECAUSE SOME RXJS PACKAGES CONTINOUSLY RUNNING
  // DUE TO THIS WE IMPORT SUBSCRIPTION PACKAGE TO UNSUBSCRIBE THEM LATER
  // SOME PACKAGES UNSUBSCRIBE AUTOMATICALLY SUCH AS PARAMS AND HTTP
  // WE RARELY USED CUSTOM OBSERVABLE
  private firstObSubs: Subscription;

  constructor() { }

  ngOnInit(): void {

    // CUSTOM OBSERVABLE WE IMPORT OBSERVABLE FROM RXJS
    const customObservable = new Observable<number>(observer => {
      let count = 0;
      const intervalId = setInterval(() => {
        observer.next(count);
        if(count === 2){
          observer.complete()
        }
        if(count > 3){
          observer.error(new Error('Error found'));
        }
        count++;
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    });


    this.firstObSubs =   customObservable.pipe(map((data: number) => {
      return 'Round ' + data
    })).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('An error occurred:', error);
      },
      () => {
        console.log('Observable completed');
      }
    );
  }

  // UNSUBSCRIBE
  ngOnDestroy(): void {
    this.firstObSubs.unsubscribe();
  }
}
