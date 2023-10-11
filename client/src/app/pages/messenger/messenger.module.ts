import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { UserService } from '@app/services';
import {
  SideNavComponent,
  UsersListComponent,
  MessagesComponent,
  QuickAccessComponent,
  MessengerComponent
} from '@app/pages/messenger';
import { MessageComponent, MenuComponent } from '@app/components';

@NgModule({
  declarations: [
    MessengerComponent,
    SideNavComponent,
    UsersListComponent,
    MessagesComponent,
    QuickAccessComponent,
    MessageComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    UserService,
  ]
})
export class MessengerModule { }