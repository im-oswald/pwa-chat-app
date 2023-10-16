import { Message } from "@app/models/Message";
import { User } from "@app/models/User";

export interface Chat {
  _id: string,
  lastMessage: Message,
  user: User,
};
