import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx'
import { CoreService } from './services/core/core.service';
import { CoreResult } from './services/core/core.service.core.result';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HTTP],
  bootstrap: [AppComponent],
})
export class AppModule 
{
  constructor(private platform: Platform, private coreService: CoreService) 
  {
    this.platform.ready().then(async () => 
    {
      console.log('initializeApp');
      setPrefersDarkMode();

      console.log("initSession starts.")
      await this.coreService.initSession()
      .then((result: CoreResult) => console.log(result), (err: any) => console.log(err)).finally(() => console.log("initSession ends."));
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