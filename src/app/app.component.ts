import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private customSubs: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.customSubs = this.userService.activatedEmitter.subscribe(didActivated => {
      this.userActivated = didActivated;
    });
  }

  ngOnDestroy(): void {
    if (this.customSubs) {
      this.customSubs.unsubscribe();
    }
  }
}
