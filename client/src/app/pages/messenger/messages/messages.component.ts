import { Component, Input } from '@angular/core';
import { User } from '@app/models';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  @Input() selectedUser: User;

  ngOnChanges(changes: any) {
    if (changes && changes.selectedUser) {
      this.selectedUser = changes.selectedUser.currentValue;
    }
  }
}
