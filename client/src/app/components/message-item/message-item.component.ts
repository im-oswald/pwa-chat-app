import { Component, Input } from '@angular/core';
import { Message, User } from '@src/app/models';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent {
  @Input() messageGroup: Array<Message>;
  @Input() currentUser: User;
  @Input() selectedUser: User;
  message: Message;

  ngOnInit() {
    this.message = this.messageGroup[0];
  }
}
