import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {
  constructor(private platform: Platform) {
    this.platform.ready().then(async () => {
      console.log('initializeApp');
      setPrefersDarkMode();
    });
  }
}

function setPrefersDarkMode() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  console.log('prefersDark', prefersDark);
  if (prefersDark.matches) {
    document.body.classList.toggle('dark');
  }
}
