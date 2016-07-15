import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {Chats, Messages} from './collections';


const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
  updateProfile(profile) {
    if (!this.userId) throw new Meteor.Error('unauthorized',
      'User must be logged-in to create a new chat');

    check(profile, {
      name: nonEmptyString,
      picture: nonEmptyString
    });

    Meteor.users.update(this.userId, {
      $set: {profile}
    });
  },

  addMessage(chatId, content) {
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