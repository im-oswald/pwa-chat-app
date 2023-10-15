export interface Message {
  _id: string;
  content: string;
  receiver: string;
  sender: string;
  readAt: Date | null;
  date: Date;
  isReceived: boolean;
};
