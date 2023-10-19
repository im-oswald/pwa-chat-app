import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Chat, Message, User } from '@app/models';
import { AuthService, EventService, MessageService } from '@app/services';
import { Utils } from '@src/utils';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @ViewChild('addIcon') addIcon: ElementRef;
  @Output() userSelected = new EventEmitter<User>();
  @Input() selectedUser: User;
  chats: Array<Chat> = [];
  showUserDropdown: boolean = false;
  currentUser: User;
  messageSearchProperties: Object = {
    placeholder: "Search messages",
  }
  userSearchProperties: Object = {
    placeholder: "Search users",
  }
  newMessage: Message;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.eventService.onChatRead((chat) => {
      this.chats = this.chats.map((c) => ({
        ...c,
        ...(c.user._id === chat.user._id && {...chat})
      }));
    });

    this.eventService.onNewMessage((message) => {
      this.chats = this.ammendDataToChat(message);
    });

    this.authService.isDataStoredObserable().subscribe((isStored) => {
      if (isStored) {
        this.fetchUserData();
      }
    });
  }

  fetchUserData() {
    this.authService.fetchUserData().subscribe((data) => {
      this.currentUser = data as User;
      this.fetchChats();
    });
  }

  ammendDataToChat(message: Message): Array<Chat> {
    return this.chats.map((chat) => (
      {
        ...chat,
        ...([message.receiver, message.sender].includes(chat.user._id) && {lastMessage: message}),
        ...(message.receiver === this.currentUser._id && message.sender === chat.user._id && message.sender !== this.selectedUser._id && {unreadCount: chat.unreadCount + 1})
      }
    ));
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
    this.messageService.readMessages(chat.user._id).subscribe(() => {
      this.userSelected.emit(chat.user);
    });
  }
}
