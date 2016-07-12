import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {DateFormatPipe} from 'angular2-moment';
import {Messages} from 'api/collections';


@Component({
  templateUrl: 'build/pages/messages/messages.html',
  pipes: [DateFormatPipe]
})
export class MessagesPage extends MeteorComponent {
  static parameters = [[NavParams]]

  constructor(navParams) {
    super();

    this.isEven = false;
    this.activeChat = navParams.get('chat');

    this.title = this.activeChat.title;
    this.picture = this.activeChat.picture;

    this.autorun(() => {
      this.messages = this.findMessages();
    }, true);
  }

  findMessages() {
    return Messages.find({
      chatId: this.activeChat._id
    }, {
      sort: {createdAt: 1},
      transform: this::this.transformMessage
    });
  }

  transformMessage(message) {
    message.ownership = this.isEven ? 'mine' : 'other';
    this.isEven = !this.isEven;
    return message;
  }
}
