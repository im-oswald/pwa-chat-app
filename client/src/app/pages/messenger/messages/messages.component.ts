import { Component, Input } from '@angular/core';
import { Message, User } from '@app/models';
import { AuthService, MessageService } from '@src/app/services';
import { Utils } from '@src/utils';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  @Input() selectedUser: User;
  messages: Array<Array<Message>>;
  messageContent: string = '';
  currentUser: User;
  messageProperties: Object = {
    placeholder: "Type a message",
  }

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.authService.fetchUserData().subscribe((data) => {
      this.currentUser = data as User;
    });
  }

  fetchMessages() {
    const from = this.currentUser?._id;
    this.messageService.getMessages(this.selectedUser._id, from).subscribe((res) => {
      const messages = Utils.addIsReceived(res.messages, this.currentUser);
      this.messages = Utils.groupMessages(messages);
    });
  }

  ngOnChanges(changes: any) {
    if (changes && changes.selectedUser) {
      this.selectedUser = changes.selectedUser.currentValue;
      this.selectedUser && this.currentUser && this.fetchMessages();
    }
  }

  get nameInitials() {
    return Utils.getInitials(this.selectedUser.name, 2);
  }

  messageChange(message: string) {
    this.messageContent = message;
  }

  sendMessage(message: string) {
    const from = this.currentUser?._id;
    this.messageService.sendMessage({ message, from, to: this.selectedUser._id }).subscribe((res) => {
      this.messageContent = '';
    })
  }
}
