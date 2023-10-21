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
    this.eventService.onChatRead((chat: Chat) => {
      this.chats = this.chats.map((c) => ({
        ...c,
        ...(c.user._id === chat.user._id && {...chat})
      }));
    });

    this.eventService.onNewMessage((message: Message) => {
      this.chats = this.ammendDataToChat(message);
      this.newMessage = message;
      const isChatOpen = this.selectedUser?._id === message.sender;
      if (isChatOpen) {
        const chat = this.chats.find((chat) => chat.user._id === this.selectedUser?._id) || {} as Chat;
        this.readChat(chat, (chat: Chat) => console.log(`Read messages for ${chat.user.name}`));
      }
    });

    this.eventService.onNewChat((chat: Chat) => this.addNewChat(chat));

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

  readChat(chat: Chat, callback: Function = () => {}) {
    if (chat?.user?._id) {
      this.messageService.readMessages(chat.user._id).subscribe(() => callback(chat));
    }
  }

  addNewChat(chat: Chat) {
    const { sender, receiver } = chat;
    this.chats.unshift({
      ...chat,
      ...(sender?._id === this.currentUser._id && { user: receiver }),
      ...(receiver?._id === this.currentUser._id && { user: sender }),
    });
  }

  ammendDataToChat(message: Message): Array<Chat> {
    return this.chats.map((chat) => (
      {
        ...chat,
        ...([message.receiver, message.sender].includes(chat.user._id) && {lastMessage: message}),
        ...(message.receiver === this.currentUser._id && message.sender === chat.user._id && {unreadCount: chat.unreadCount + 1}),
        ...(message.receiver === chat.user._id && message.sender !== this.currentUser._id && {unreadCount: chat.unreadCount + 1})
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

  get unreadCount(): number {
    return this.chats.reduce((acc, chat) => acc + chat.unreadCount, 0);
  }

  openChat(chat: Chat) {
    this.readChat(chat, (chat: Chat) => this.userSelected.emit(chat.user));
  }
}
