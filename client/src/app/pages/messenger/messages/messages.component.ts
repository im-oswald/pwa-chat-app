import { Component, Input } from '@angular/core';
import { User } from '@app/models';
import { Utils } from '@src/utils';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  @Input() selectedUser: User;
  messageContent: string = '';
  messageProperties: Object = {
    placeholder: "Type a message",
  }

  ngOnChanges(changes: any) {
    if (changes && changes.selectedUser) {
      this.selectedUser = changes.selectedUser.currentValue;
    }
  }

  get nameInitials() {
    return Utils.getInitials(this.selectedUser.name, 2);
  }

  sendMessage(message: string) {

  }
}
