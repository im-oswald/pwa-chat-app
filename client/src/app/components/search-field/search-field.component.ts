import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {
  @Input() properties: any;

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
