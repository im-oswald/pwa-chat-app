import { Message } from "@app/models/Message";
import { User } from "@app/models/User";

export interface Chat {
  lastMessage: Message,
  user: User,
  unreadCount: number,
};
