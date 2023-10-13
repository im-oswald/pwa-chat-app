import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {
  @Input() properties: any;
  @Input() value: string;
  @Output() onChange = new EventEmitter<any>();

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  get currentValue() {
    return this.value || '';
  }
}
