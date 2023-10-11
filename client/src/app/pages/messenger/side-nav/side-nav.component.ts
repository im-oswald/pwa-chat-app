import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '@src/app/services';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @ViewChild('settingsIcon') settingsIcon: ElementRef;
  showMenu: boolean = false;

  constructor(private authService: AuthService) { }

  toggleMenu() {

    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.settingsIcon.nativeElement.classList.add('rotate');
    } else {
      this.settingsIcon.nativeElement.classList.remove('rotate');
    }
  }

  logout() {
    this.authService.clearToken();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menu = document.querySelector('.menu');
    const settings = document.querySelector('#settings');

    // Check if the click target is outside the menu and the settings icon
    if (!settings?.contains(target) && !menu?.contains(target)) {
      this.showMenu = false;
      this.settingsIcon.nativeElement.classList.remove('rotate');
    }
  }
}
