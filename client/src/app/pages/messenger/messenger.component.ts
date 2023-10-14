import { Component } from '@angular/core';
import { User } from '@app/models';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent {
  selectedUser: User;

  userSelected(user: User) {
    this.selectedUser = user;
  }
}
