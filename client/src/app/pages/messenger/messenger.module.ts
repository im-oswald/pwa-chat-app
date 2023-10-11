import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { UserService } from '@app/services';
import {
  SideNavComponent,
  UsersListComponent,
  MessagesComponent,
  QuickAccessComponent,
  MessengerComponent,
} from '@app/pages/messenger';
import {
  MessageComponent,
  MenuComponent,
  UsersDropdownComponent,
  SearchFieldComponent
} from '@app/components';

@NgModule({
  declarations: [
    MessengerComponent,
    SideNavComponent,
    UsersListComponent,
    MessagesComponent,
    QuickAccessComponent,
    MessageComponent,
    MenuComponent,
    UsersDropdownComponent,
    SearchFieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    HttpClient,
    UserService,
  ]
})
export class MessengerModule { }
