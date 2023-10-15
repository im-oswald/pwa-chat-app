import { Component, Input } from '@angular/core';
import { User } from '@app/models';
import { AuthService, MessageService } from '@src/app/services';
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

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnChanges(changes: any) {
    if (changes && changes.selectedUser) {
      this.selectedUser = changes.selectedUser.currentValue;
    }
  }

  get nameInitials() {
    return Utils.getInitials(this.selectedUser.name, 2);
  }

  messageChange(message: string) {
    this.messageContent = message;
  }

  sendMessage(message: string) {
    this.authService.fetchUserData().subscribe((data) => {
      const user =  data as User;
      const from = user?._id;
      this.messageService.sendMessage({ message, from, to: this.selectedUser._id }).subscribe((res) => {
        this.messageContent = '';
      })
    });
  }
}
