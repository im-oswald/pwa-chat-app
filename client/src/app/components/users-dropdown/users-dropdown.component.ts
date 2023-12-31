import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { UserService } from '@app/services';
import { Utils } from '@src/utils';
import { User } from '@app/models';

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './users-dropdown.component.html',
  styleUrls: ['./users-dropdown.component.scss']
})
export class UsersDropdownComponent {
  @ViewChild('dropdown') dropdown: ElementRef;
  @Input() showDropdown: boolean;
  @Input() searchProperties: any;
  @Output() toggleDropdown = new EventEmitter<void>();
  @Output() itemSelected = new EventEmitter<User>();
  items: Array<User> = [];
  searchTerm = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  toggle() {
    this.toggleDropdown.emit();
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.users(this.searchTerm).subscribe((response: any) => {
      this.items = response;
    });
  }

  selectItem(item: User) {
    this.toggle();
    this.itemSelected.emit(item);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = this.dropdown.nativeElement;
    const add = document.querySelector('.add-message');

    // Check if the click target is outside the menu and the settings icon
    if (!add?.contains(target) && !dropdown?.contains(target)) {
      this.toggle();
      this.dropdown.nativeElement.classList.remove('rotate');
    }
  }

  nameInitials(name: string)  {
    return Utils.getInitials(name, 2);
  }
}
