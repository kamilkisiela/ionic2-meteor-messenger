import 'meteor-client-side';
import 'accounts-base-client-side';
import 'accounts-phone';
import 'api/methods';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {AppModule} from './app.module';


Tracker.autorun((computation) => {
  if (Meteor.loggingIn()) return;
  computation.stop();

  platformBrowserDynamic().bootstrapModule(AppModule);
});