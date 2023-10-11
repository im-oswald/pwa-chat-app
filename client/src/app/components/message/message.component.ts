import { Component, Input } from '@angular/core';
import { Utils } from '@src/utils';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() user: any;

  get trimmedLastMessage(): string {
    const message = this.user.last_message;
    
    return Utils.trimString(message, 40);
  }

  get nameInitials(): string {
    return Utils.getInitials(this.user.name, 2);
  }
}
