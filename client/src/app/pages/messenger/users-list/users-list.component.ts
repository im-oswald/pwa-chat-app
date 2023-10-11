import { Component } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
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
}
