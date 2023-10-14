import { Component } from '@angular/core';
import { AuthService, DBService } from '@app/services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chat App';
  interval: ReturnType<typeof setTimeout> | undefined;
  isLoading: boolean = true;
  loginThrottling: number = 60000;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: ToastrService,
    private dbService: DBService,
  ) { }

  ngOnInit() {
    this.dbService.onDBReady().subscribe((isDBReady) => {
      if (isDBReady) {
        this.authService.checkUserLoggedIn();
        this.authService.isLoggedInObseravable().subscribe((loggedIn) => this.watchLoggedIn(loggedIn));
      }
    })
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  watchLoggedIn(loggedIn: boolean | undefined) {
    if (loggedIn == undefined)
      return;

    this.isLoading = false;

    if (loggedIn) {
      if (this.interval == undefined) {
        this.interval = setInterval(this.authService.checkUserLoggedIn.bind(this.authService), this.loginThrottling);
      }
    } else {
      this.clearInterval()
    }
    
    this.navigateOrStay(loggedIn);
  }

  navigateOrStay(loggedIn: boolean) {
    if (loggedIn) {
      this.router.navigate(['messenger']);
    } else {
      if (!/^\/login|signup$/.test(this.router.url)) {
        this.router.navigate(['login']);
        this.alertService.info('Login to proceed', 'Session Killed');
      }
    }
  }
}
