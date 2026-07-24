import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { BehaviorService } from '../services/behavior/behavior.service';
import { BehaviorResult } from '../services/behavior/behavior.service.result';
import { LICENSE_APIKEY_ANDROID, LICENSE_APIKEY_IOS } from '../constants';
import { BehaviorConfiguration } from '../services/behavior/behavior.config';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HomePage implements OnInit
{
  behaviorService: BehaviorService;
  message: string                   = "";
  showError: boolean                = false;
  isDocumentDataSheetOpen: boolean  = false;

  constructor(
    public platform: Platform,
    behaviorService: BehaviorService,
    private changeDetection: ChangeDetectorRef,
    private loadingCtrl: LoadingController) 
  {  
    this.behaviorService = behaviorService;
  }

  ngOnInit(): void 
  {
    console.log("HomePage ngOnInit");
  }

  safeJsonParse(data: any) 
  {
    if (typeof data !== 'string') {
      return data;
    }

    try {
      return JSON.parse(data);
    } catch (e1) {
      try {
        // Segundo intento (doble serialización)
        return JSON.parse(JSON.parse(data));
      } catch (e2) {
        console.error('❌ JSON inválido:', data);
        throw e2;
      }
    }
  }

  reLaunchBehavior = async () => 
  {
    console.log("initializeBehavior starts...");
    
    this.message = '';
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
    )
    .finally(() => console.log("initializeBehavior ends."));
  }

  launchClearSessionData = async () => 
  {
    this.message = '';

    console.log("clearSessionData starts...");
    await this.behaviorService.clearSessionData()
    .then(
      (result: BehaviorResult) => console.log(result), 
      (err: any) => console.log(err)
    )
    .finally(() => console.log("clearSessionData ends."));
  }

  launchSetSessionId = async () => 
  {
    this.message = '';

    console.log("setSessionId starts...");
    await this.behaviorService.setSessionId("add sessionId...")
    .then(
      (result: BehaviorResult) => console.log(result), 
      (err: any) => console.log(err)
    )
    .finally(() => console.log("setSessionId ends."));
  }

  private printError(data: any)
  {
    this.message = data['errorType'].replace(/_/g, ' ');
  }
}