import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { MessageService, UserService } from '@app/services';
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
  SearchFieldComponent,
  MessageFieldComponent,
  MessageItemComponent,
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
    MessageFieldComponent,
    MessageItemComponent,
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
    MessageService,
  ]
})
export class MessengerModule { }
