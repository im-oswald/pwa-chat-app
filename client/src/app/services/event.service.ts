import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from "@src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private socket: any;
  private apiUrl: string = environment.apiUrl;

  constructor() {
    this.socket = io(this.apiUrl);
  }

  // Send a new message to the server
  sendNewMessage(message: any) {
    this.socket.emit('newMessage', message);
  }

  // Listen for new messages from the server
  onNewMessage(callback: (message: any) => void) {
    this.socket.on('newMessage', callback);
  }

  // Chat is read by the server
  onChatRead(callback: (data: any) => void) {
    this.socket.on('chatRead', callback);
  }

  // Pushed a new chat by server
  onNewChat(callback: (data: any) => void) {
    this.socket.on('newChat', callback);
  }
}
