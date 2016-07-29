declare module 'api/models' {
  interface Profile {
    name?: string;
    picture?: string;
  }

  interface Chat {
    _id?: string;
    title?: string;
    picture?: string;
    lastMessage?: Message;
    lastMessageComp?: Tracker.Computation;
  }

  interface Message {
    _id?: string;
    chatId?: string;
    senderId?: string;
    ownership?: string;
    content?: string;
    createdAt?: Date;
  }
}