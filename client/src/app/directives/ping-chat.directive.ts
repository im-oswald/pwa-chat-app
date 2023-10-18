import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Howl } from 'howler';
import { Message, User } from '@app/models';

@Directive({
  selector: '[pingChat]'
})
export class PingChatDirective implements OnChanges {
  newMessageSound = new Howl({ src: ['assets/sounds/new-message.mp3'] });
  sendMessageSound = new Howl({ src: ['assets/sounds/send-message.mp3'] });
  newOpenedChatMessageSound = new Howl({ src: ['assets/sounds/new-opened-chat-message.mp3'] });

  @Input() selectedUser: User;
  @Input() currentUser: User;
  @Input() newMessage: Message;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['newMessage'] && changes['newMessage'].currentValue && !changes['newMessage'].currentValue.beeped) {
      if (this.currentUser._id === this.newMessage.receiver) {
        if (this.selectedUser?._id === this.newMessage.sender) {
          // we received a message from the opened chat
          this.newOpenedChatMessageSound.play();
        } else {
          // we received a message from another chat
          this.newMessageSound.play();
        }
      }

      if (this.currentUser._id === this.newMessage.sender) {
        // we sent a message
        this.sendMessageSound.play();
      }

      this.newMessage.beeped = true;
    }
  }
}
