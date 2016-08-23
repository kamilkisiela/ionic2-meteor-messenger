import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ionicProviders} from 'ionic-angular';
import {METEOR_PROVIDERS} from 'angular2-meteor';
import {Whatsapp} from './app.component';


@NgModule({
  imports: [BrowserModule],
  declarations: [Whatsapp],
  bootstrap: [Whatsapp],
  providers: [ionicProviders(), METEOR_PROVIDERS]
})
export class AppModule {}
