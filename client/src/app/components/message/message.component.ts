import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chat, Message, User } from '@src/app/models';
import { Utils } from '@src/utils';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() chat: any;
  @Output() onSelect = new EventEmitter<Chat>();
  user: User;
  message: Message;

  ngOnInit() {
    this.user = this.chat.user;
    this.message = this.chat.lastMessage;
  }

  get trimmedLastMessage(): string {
    return Utils.trimString(this.message.content, 40);
  }

  get nameInitials(): string {
    return Utils.getInitials(this.user.name, 2);
  }

  get formattedTimeDifference() {
    return Utils.getTimeDifference(this.message.date);
  }

  selectChat() {
    this.onSelect.emit(this.chat);
  }
}
