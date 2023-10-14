import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { User } from '@app/models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @ViewChild('addIcon') addIcon: ElementRef;
  @Output() userSelected = new EventEmitter<User>();
  users: Array<Object> = [
    {
      id: 0,
      name: 'Abraheem Asad',
      date: '2023-10-08T23:44:27.033+00:00',
      last_message: 'Hi this is just a testing message to check if the it fits in'
    },
    {
      id: 1,
      name: 'Fazal Rai',
      date: '2023-10-08T23:44:27.033+00:00',
      last_message: 'Hi this is just a testing message to check if the it fits in'
    },
  ];
  showUserDropdown: boolean = false;
  messageSearchProperties: Object = {
    placeholder: "Search messages",
  }
  userSearchProperties: Object = {
    placeholder: "Search users",
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  emitUser(user: User) {
    this.userSelected.emit(user);
  }
}
