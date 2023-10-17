import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { User } from '@app/models';

@Directive({
  selector: '[selectChat]'
})
export class SelectChatDirective implements OnChanges {
  @Input() selectedUser: User;
  @Input() user: User;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue && this.user._id === this.selectedUser._id) {
      this.selectChat();
    }
  }

  removeOtherActives() {
    // Get all elements with the specified class
    const elements = document.querySelectorAll('.active');

    // Remove the class from each element
    elements.forEach(element => this.renderer.removeClass(element, 'active'));
  }

  selectChat() {
    this.removeOtherActives();
    this.el.nativeElement.classList.add('active');
  }
}
