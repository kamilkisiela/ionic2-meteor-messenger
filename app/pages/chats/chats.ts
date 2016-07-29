import {Component} from '@angular/core';
import {NavController, Popover} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {CalendarPipe} from 'angular2-moment';
import {Mongo} from 'meteor/mongo';
import {Chat, Message} from 'api/models';
import {Chats, Messages} from 'api/collections';
import {MessagesPage} from '../messages/messages';
import {ChatsOptionsPage} from '../chats-options/chats-options';


@Component({
  templateUrl: 'build/pages/chats/chats.html',
  pipes: [CalendarPipe]
})
export class ChatsPage extends MeteorComponent {
  chats: Mongo.Cursor<Chat>;

  constructor(private navCtrl: NavController) {
    super();

    this.autorun(() => {
      this.chats = this.findChats();
    });
  }

  removeChat(chat): void {
    Chats.remove(chat._id);
  }

  showMessages(chat): void {
    this.navCtrl.push(MessagesPage, {chat});
  }

  showOptions(): void {
    const popover = Popover.create(ChatsOptionsPage, {}, {
      cssClass: 'options-popover'
    });

    this.navCtrl.present(popover);
  }

  private findChats(): Mongo.Cursor<Chat>{
    const chats = Chats.find({}, {
      transform: this.transformChat.bind(this)
    });

    chats.observe({
      changed: (newChat, oldChat) => this.disposeChat(oldChat),
      removed: (chat) => this.disposeChat(chat)
    });

    return chats;
  }

  private transformChat(chat): Chat {
    chat.lastMessageComp = this.autorun(() => {
      chat.lastMessage = this.findLastMessage(chat);
    });

    return chat;
  }

  private findLastMessage(chat): Message {
    return Messages.findOne({
      chatId: chat._id
    }, {
      sort: {createdAt: -1}
    });
  }

  private disposeChat(chat): void {
    if (chat.lastMessageComp) {
      chat.lastMessageComp.stop();
    }
  }
}