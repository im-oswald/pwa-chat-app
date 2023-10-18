import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { MessageService, UserService, EventService } from '@app/services';
import { ScrollMessagesToBottomDirective, SelectChatDirective, PingChatDirective } from '@app/directives';
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
    ScrollMessagesToBottomDirective,
    SelectChatDirective,
    PingChatDirective,
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
    EventService,
  ]
})
export class MessengerModule { }
