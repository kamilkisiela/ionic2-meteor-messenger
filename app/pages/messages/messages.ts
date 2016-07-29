import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {Mongo} from 'meteor/mongo';
import {Chat, Message} from 'api/models';
import {Messages} from 'api/collections';


@Component({
  templateUrl: 'build/pages/messages/messages.html'
})
export class MessagesPage extends MeteorComponent {
  title: string;
  picture: string;
  messages: Mongo.Cursor<Message>;
  private isEven = false;
  private activeChat: Chat;

  constructor(navParams: NavParams) {
    super();

    this.activeChat = <Chat>navParams.get('chat');

    this.title = this.activeChat.title;
    this.picture = this.activeChat.picture;

    this.autorun(() => {
      this.messages = this.findMessages();
    }, true);
  }

  private findMessages(): Mongo.Cursor<Message> {
    return Messages.find({
      chatId: this.activeChat._id
    }, {
      sort: {createdAt: 1},
      transform: this.transformMessage.bind(this)
    });
  }

  private transformMessage(message): Message {
    message.ownership = this.isEven ? 'mine' : 'other';
    this.isEven = !this.isEven;
    return message;
  }
}