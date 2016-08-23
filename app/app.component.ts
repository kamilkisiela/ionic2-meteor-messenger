import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {METEOR_PROVIDERS} from 'angular2-meteor';
import {Meteor} from 'meteor/meteor';
import {LoginPage} from './pages/login/login';
import {TabsPage} from './pages/tabs/tabs';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class Whatsapp {
  rootPage: any;

  constructor(platform: Platform) {
    this.rootPage = Meteor.user() ? TabsPage : LoginPage;

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
