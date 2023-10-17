import { Message, User } from "@app/models";

export class Utils {
  public static camelCaseToNormal(text: string): string {
    return text.replace(/([A-Z])/g, ' $1').trim();
  }

  public static trimString(text: string, count: number): string {
    if (!text) {
      return '';
    }

    return text.length > count ? `${text.substring(0, count)}...` : text;
  }

  public static getInitials(name: string, count: number): string {
    if (!name) {
      return '';
    }

    return name.split(' ').map(word => word[0]).join('').substring(0, count).toUpperCase();
  }

  public static addIsReceived(messages: Array<Message>, currentUser: User): Array<Message> {
    return messages.map(
      (msg: Message) => ({ ...msg, isReceived: msg.receiver === currentUser._id })
    );
  }

  public static groupMessages(messages: Array<Message>): Array<Array<Message>> {
    const groupedMessages = [];
    let currentGroup: Array<Message> = [];
    let currentMinute: any = null;

    messages.forEach((message: Message) => {
      const messageDate = new Date(message.date);
      const messageMinute = messageDate.getMinutes();

      if (messageMinute !== currentMinute || message.isReceived !== currentGroup[0]?.isReceived) {
        if (currentGroup.length > 0) {
          groupedMessages.push(currentGroup);
        }
        currentGroup = [message];
        currentMinute = messageMinute;
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      groupedMessages.push(currentGroup);
    }

    return groupedMessages;
  }

  public static getTimeDifference(dateTime: Date) {
    const currentDate: any = new Date();
    const targetDate: any = new Date(dateTime);
    const timeDifference = currentDate - targetDate;
  
    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);
  
    if (seconds < 60) {
      return seconds + "s";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return minutes + "m";
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return hours + "h";
    } else {
      const days = Math.floor(seconds / 86400);
      return days + "d";
    }
  }
}