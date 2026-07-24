import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx'
import { BehaviorService } from './services/behavior/behavior.service';
import { BehaviorResult } from './services/behavior/behavior.service.result';
import { LICENSE_APIKEY_ANDROID, LICENSE_APIKEY_IOS } from './constants';
import { BehaviorConfiguration } from './services/behavior/behavior.config';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule], providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HTTP, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule 
{
  constructor(private platform: Platform, private behaviorService: BehaviorService) 
  {
    this.platform.ready().then(async () => 
    {
      console.log('initializeApp');
      setPrefersDarkMode();

      console.log("Behavior initialization starts.")
      const cfg: BehaviorConfiguration = {
        licenseKey: (this.platform.is('ios')) ? LICENSE_APIKEY_IOS : LICENSE_APIKEY_ANDROID,
        usernameField: '',
        passwordField: '',
        enableSupportLogs: true
      };

      await this.behaviorService.initializeBehavior(cfg)
      .then(
        (result: BehaviorResult) => console.log(result), 
        (err: any) => console.log(err)
      ).finally(
        () => console.log("initSession ends.")
      );
    });
  }
}

function setPrefersDarkMode() 
{
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  console.log("prefersDark", prefersDark);
  if (prefersDark.matches) 
  {
    document.body.classList.toggle('dark');
  }
}