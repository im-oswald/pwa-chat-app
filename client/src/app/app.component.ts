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

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: ToastrService
  ) { }

  ngOnInit() {
    this.authService.checkUserLoggedIn();
    this.authService.isLoggedIn.subscribe((loggedIn) => this.navigateOrStay(loggedIn));
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
