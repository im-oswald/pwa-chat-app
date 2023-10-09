import { Component } from '@angular/core';
import { AuthService } from '@services/index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chat App';
  interval: ReturnType<typeof setTimeout>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: ToastrService
  ) { }

  ngOnInit() {
    this.interval = setInterval(this.authService.checkUserLoggedIn.bind(this.authService), 5000);
    this.authService.isLoggedIn.subscribe((loggedIn) => this.navigateOrStay(loggedIn));
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  navigateOrStay(loggedIn: boolean | undefined) {
    if (loggedIn == undefined)
      return;

    if (loggedIn) {
      this.router.navigate(['messenger']);
    } else {
      if (!/^\/login|signup$/.test(this.router.url)) {
        this.router.navigate(['login']);
        this.alertService.info('Login to proceed', 'Session Expired');
      }
    }
  }
}
