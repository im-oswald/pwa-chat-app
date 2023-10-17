import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from '@app/models';

@Directive({
  selector: '[scrollMessagesToBottom]'
})
export class ScrollMessagesToBottomDirective implements OnChanges {
  @Input() messages: Array<Array<Message>>;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages'] && changes['messages'].currentValue) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const scrollContainer = this.el.nativeElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    });
  }
}
