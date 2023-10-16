import { Component, Input } from '@angular/core';
import { Message, User } from '@src/app/models';
import { Utils } from '@src/utils';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() chat: any;
  user: User;
  message: Message;

  ngOnInit() {
    this.user = this.chat.user;
    this.message = this.chat.lastMessage;
    debugger
  }

  get trimmedLastMessage(): string {
    return Utils.trimString(this.message.content, 40);
  }

  get nameInitials(): string {
    return Utils.getInitials(this.user.name, 2);
  }
}
