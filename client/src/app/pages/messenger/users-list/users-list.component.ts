import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Chat, User } from '@app/models';
import { AuthService, MessageService } from '@app/services';
import { Utils } from '@src/utils';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @ViewChild('addIcon') addIcon: ElementRef;
  @Output() userSelected = new EventEmitter<User>();
  chats: Array<Chat> = [];
  showUserDropdown: boolean = false;
  currentUser: User;
  messageSearchProperties: Object = {
    placeholder: "Search messages",
  }
  userSearchProperties: Object = {
    placeholder: "Search users",
  }

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.fetchUserData().subscribe((data) => {
      this.currentUser = data as User;
      this.fetchChats();
    });
  }

  fetchChats() {
    this.messageService.getChatList().subscribe((response: any) => {
      const chats = response.chats;
      this.chats = chats.map((chat: Chat) => ({ ...chat, lastMessage: Utils.addIsReceived([chat.lastMessage], this.currentUser)[0] }));
    });
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  emitUser(user: User) {
    this.userSelected.emit(user);
  }

  openChat(chat: Chat) {
    this.userSelected.emit(chat.user);
  }
}
