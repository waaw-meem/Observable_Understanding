import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  firstObSubs: Subscription;

  constructor() { }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.firstObSubs.unsubscribe();
  }
}
