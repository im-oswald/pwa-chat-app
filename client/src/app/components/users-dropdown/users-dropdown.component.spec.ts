import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDropdownComponent } from './users-dropdown.component';

describe('UsersDropdownComponent', () => {
  let component: UsersDropdownComponent;
  let fixture: ComponentFixture<UsersDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
