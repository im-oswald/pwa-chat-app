import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './users-dropdown.component.html',
  styleUrls: ['./users-dropdown.component.scss']
})
export class UsersDropdownComponent {
  @ViewChild('dropdown') dropdown: ElementRef;
  @Input() showDropdown: boolean;
  @Output() toggleDropdown = new EventEmitter<void>();
  items = [
    'Item 1',
    'Item 2',
    'Item 3',
  ];

  filteredItems: string[] = [];
  searchTerm = '';
  dropdownProperties: any = {
    placeholder: "Search users",
  }

  toggle() {
    this.toggleDropdown.emit();
  }

  onSearchChange() {
    this.filteredItems = this.items.filter((item) =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectItem(item: string) {
    this.searchTerm = item;
    this.toggle();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menu = this.dropdown.nativeElement;
    const add = document.querySelector('.add-message');

    // Check if the click target is outside the menu and the settings icon
    if (!add?.contains(target) && !menu?.contains(target)) {
      this.toggle();
      this.dropdown.nativeElement.classList.remove('rotate');
    }
  }
}
