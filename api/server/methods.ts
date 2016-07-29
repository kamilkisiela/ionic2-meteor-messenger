import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {Chats, Messages} from './collections';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});


Meteor.methods({
  addMessage(chatId: string, content: string): void {
    check(chatId, nonEmptyString);
    check(content, nonEmptyString);

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