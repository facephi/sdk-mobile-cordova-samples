import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { BehaviorService } from '../services/behavior/behavior.service';
import { BehaviorResult } from '../services/behavior/behavior.service.result';
import { LICENSE_APIKEY_ANDROID, LICENSE_APIKEY_IOS, USER_ID } from '../constants';
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
    private loadingCtrl: LoadingController,
    private router: Router) 
  {  
    this.behaviorService = behaviorService;
  }

  ngOnInit(): void 
  {
    console.log("HomePage ngOnInit");
  }

  async ngAfterViewInit(): Promise<void>
  {
    this.launchBehavior();
  }

  goToLogin = (): void =>
  {
    this.launchSetPosition("login");
    this.router.navigateByUrl('/login');
  }

  dismissKeyboard = (): void =>
  {
    const active = document.activeElement as HTMLElement | null;
    active?.blur();
  }

  launchBehavior = async () => 
  {
    console.log("initializeBehavior starts...");
    
    this.message = '';
    const cfg: BehaviorConfiguration = {
      licenseKey: (this.platform.is('ios')) ? LICENSE_APIKEY_IOS : LICENSE_APIKEY_ANDROID,
      enableSupportLogs: true
    };

    await this.behaviorService.initializeBehavior(cfg)
    .then(
      async (result: BehaviorResult) =>  {
        console.log(result);
        if (result.finishStatus === 2)
        { 
          this.printError(result.errorType);
        }
      },
      (err: any) => console.log(err)
    ).finally(
      () => console.log("initSession ends.")
    );
  }

  launchClearSessionData = async () => 
  {
    console.log("clearSessionData starts...");
    await this.behaviorService.clearSessionData()
    .then(
      (result: BehaviorResult) => {
        console.log(result);
        if (result.finishStatus === 2)
        { 
          this.printError(result.errorType);
        }
      },
      (err: any) => console.log(err)
    )
    .finally(() => console.log("clearSessionData ends."));
  }

  launchSetAutoLogoutAction = async () => 
  {
    console.log("setAutoLogoutAction starts...");
    await this.behaviorService.setAutoLogoutAction()
    .then(
      (result: BehaviorResult) => {
        console.log(result);
        if (result.finishStatus === 2)
        { 
          this.printError(result.errorType);
        }
      },
      (err: any) => console.log(err)
    )
    .finally(() => console.log("setAutoLogoutAction ends."));
  }

  launchSetSessionId = async () => 
  {
    console.log("setSessionId starts...");
    await this.behaviorService.setSessionId(this.behaviorService.generateUUID())
    .then(
      (result: BehaviorResult) => {
        console.log(result);
        if (result.finishStatus === 2)
        { 
          this.printError(result.errorType);
        }
      },
      (err: any) => console.log(err)
    )
    .finally(() => console.log("setSessionId ends."));
  }

  launchSetUserId = async () => 
  {
    console.log("setUserId starts...");
    await this.behaviorService.setUserId(USER_ID)
    .then(
      (result: BehaviorResult) => {
        console.log(result);
        if (result.finishStatus === 2)
        { 
          this.printError(result.errorType);
        }
      },
      (err: any) => console.log(err)
    )
    .finally(() => console.log("setUserId ends."));
  }

  launchSetPosition = async (screen: string) => 
  {
    console.log("setPosition starts...");
    await this.behaviorService.setPosition(screen)
    .then(
      (result: BehaviorResult) => {
        console.log(result);
        if (result.finishStatus === 2)
        { 
          this.printError(result.errorType);
        }
      },
      (err: any) => console.log(err)
    )
    .finally(() => console.log("setPosition ends."));
  }

  private printError(msj: string)
  {
    this.message = msj.replace(/_/g, ' ');
  }
}