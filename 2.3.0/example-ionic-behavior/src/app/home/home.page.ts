import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { BehaviorService } from '../services/behavior/behavior.service';
import { BehaviorResult } from '../services/behavior/behavior.service.result';
import { LICENSE_APIKEY_ANDROID, LICENSE_APIKEY_IOS, USER_ID } from '../constants';
import { BehaviorConfiguration } from '../services/behavior/behavior.config';
import { Fip360Service } from '../api/api-rest/fip360.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HomePage implements OnInit, AfterViewInit
{
  fip360Service: Fip360Service;
  behaviorService: BehaviorService;
  sessionId?: string | null         = null;
  message: string                   = "";
  textInput: string                 = "";
  showError: boolean                = false;
  isDocumentDataSheetOpen: boolean  = false;

  constructor(
    behaviorService: BehaviorService,
    fip360Service: Fip360Service,
    public platform: Platform,
    private changeDetection: ChangeDetectorRef,
    private loadingCtrl: LoadingController,
    private router: Router) 
  {  
    this.behaviorService  = behaviorService;
    this.fip360Service    = fip360Service;
  }

  ngOnInit(): void 
  {
    console.log("HomePage ngOnInit");
    this.launchGetSessionId();
  }

  async ngAfterViewInit(): Promise<void>
  {
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.launchInitialize();
  }

  goToLogin = (): void =>
  {
    this.launchSetPosition("Login");
    this.router.navigateByUrl('/login');
  }

  launchGetSessionId = async () => 
  {
    console.log("getSessionId starts...");

    this.fip360Service.getSessionId()
    .subscribe({
      next: (data: any) => {
        console.log(data);
        if (data && data.sessionId)
        {
          this.sessionId = data.sessionId;
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log("getSessionId ends.");
      }
    });
  } 

  launchInitialize = async () => 
  {
    console.log("initializeBehavior starts...");
    
    this.message = '';
    const cfg: BehaviorConfiguration = {
      licenseKey: (this.platform.is('ios')) ? LICENSE_APIKEY_IOS : LICENSE_APIKEY_ANDROID,
      enableSupportLogs: true
    };

    await this.behaviorService.initialize(cfg)
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

  launchCheckInitialization = async () => 
  {
    this.behaviorService.checkInitialization()
    .then(
      (result: BehaviorResult) => {
        console.log(result);
      },
      (err: any) => console.log(err)
    ).finally(
      () => console.log("checkInitialization ends.")
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
        if (result.finishStatus === 1)
        { 
          this.sessionId = null;
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
    await this.behaviorService.setSessionId(this.sessionId ? this.sessionId : this.behaviorService.generateUUID())
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
    //const encryptedUserId = await Encryptor.encryptUserId(USER_ID)
    const encryptedUserId   = USER_ID
    console.log("encryptedUserId", encryptedUserId);
    await this.behaviorService.setUserId(encryptedUserId)
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