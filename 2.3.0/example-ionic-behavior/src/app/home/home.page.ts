import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class HomePage implements OnInit, AfterViewInit
{
  behaviorService: BehaviorService;
  message: string                   = "";
  textInput: string                 = "";
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

  async ngAfterViewInit(): Promise<void>
  {
    console.log("Behavior initialization starts.")
    const cfg: BehaviorConfiguration = {
      licenseKey: (this.platform.is('ios')) ? LICENSE_APIKEY_IOS : LICENSE_APIKEY_ANDROID,
      usernameField: '',
      passwordField: '',
      enableSupportLogs: true
    };

    await this.behaviorService.initializeBehavior(cfg)
    .then(
      async (result: BehaviorResult) =>  {
        console.log(result);
        if (result.finishStatus === 1)
        { 
          this.behaviorService.initializeRecordTouchEvent();
          const ionInput = document.getElementById('textInput') as HTMLIonInputElement | null;
          if (!ionInput) {
            console.log('textInput not found');
            return;
          }

          const nativeInput = await ionInput.getInputElement();
          this.behaviorService.initializeRegisterField(nativeInput, 'text');
        }
      },
      (err: any) => console.log(err)
    ).finally(
      () => console.log("initSession ends.")
    );
  }

  dismissKeyboard = (): void =>
  {
    const active = document.activeElement as HTMLElement | null;
    active?.blur();
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

  launchSetAutoLogoutAction = async () => 
  {
    this.message = '';

    console.log("setAutoLogoutAction starts...");
    await this.behaviorService.setAutoLogoutAction()
    .then(
      (result: BehaviorResult) => console.log(result), 
      (err: any) => console.log(err)
    )
    .finally(() => console.log("setAutoLogoutAction ends."));
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

  launchSetUserId = async () => 
  {
    this.message = '';

    console.log("setUserId starts...");
    await this.behaviorService.setUserId("add userId...")
    .then(
      (result: BehaviorResult) => console.log(result), 
      (err: any) => console.log(err)
    )
    .finally(() => console.log("setUserId ends."));
  }

  launchSetPosition = async () => 
  {
    this.message = '';

    console.log("setPosition starts...");
    await this.behaviorService.setPosition("add position...")
    
    .then(
      (result: BehaviorResult) => console.log(result), 
      (err: any) => console.log(err)
    )
    .finally(() => console.log("setPosition ends."));
  }

  private printError(data: any)
  {
    this.message = data['errorType'].replace(/_/g, ' ');
  }
}