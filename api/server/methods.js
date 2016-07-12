import {Meteor} from 'meteor/meteor';
import {Chats, Messages} from './collections';


Meteor.methods({
  addMessage(chatId, content) {
    const chatExists = !!Chats.find(chatId).count();

    if (!chatExists) throw new Meteor.Error('chat-not-exists',
      'Chat doesn\'t exist');

    Messages.insert({
      chatId: chatId,
      content: content,
      createdAt: new Date()
    });
  }
});