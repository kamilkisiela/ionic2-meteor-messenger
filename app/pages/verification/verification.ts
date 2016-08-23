import {Component, NgZone} from '@angular/core';
import {App, AlertController, NavParams} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {Accounts} from 'meteor/accounts-base';
import {ProfilePage} from '../profile/profile';


@Component({
  templateUrl: 'build/pages/verification/verification.html'
})
export class VerificationPage extends MeteorComponent {
  code = '';
  phone: string;

  constructor(private app: App,
              private alertCtrl: AlertController,
              private zone: NgZone,
              navParams: NavParams) {
    super();

    this.phone = <string>navParams.get('phone');
  }

  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode == 13) {
      this.verify();
    }
  }

  verify(): void {
    Accounts.verifyPhone(this.phone, this.code, (e: Error) => {
      this.zone.run(() => {
        if (e) return this.handleError(e);

        this.app.getRootNav().setRoot(ProfilePage, {}, {
          animate: true
        });
      });
    });
  }

  private handleError(e: Error): void {
    console.error(e);

    const alert = this.alertCtrl.create({
      title: 'Oops!',
      message: e.message,
      buttons: ['OK']
    });

    alert.present();
  }
}
