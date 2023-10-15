import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message-field',
  templateUrl: './message-field.component.html',
  styleUrls: ['./message-field.component.scss']
})
export class MessageFieldComponent {
  @Input() properties: any;
  @Input() value: string;
  @Output() onSend = new EventEmitter<string>();

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  sendMessage() {
    if (!this.value) {
      return;
    }

    this.onSend.emit(this.value);
  }
}
