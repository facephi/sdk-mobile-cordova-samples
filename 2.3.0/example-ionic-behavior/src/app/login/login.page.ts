import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorService } from '../services/behavior/behavior.service';
import { BehaviorResult } from '../services/behavior/behavior.service.result';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class LoginPage implements AfterViewInit
{
  username: string = '';
  password: string = '';

  behaviorService: BehaviorService;

  constructor(private router: Router, behaviorService: BehaviorService) {
    this.behaviorService = behaviorService;
  }

  ngAfterViewInit(): void 
  {
    this.launchRegisterFields();
  }

  goHome = (): void => {
    this.launchSetPosition("home");
    this.router.navigateByUrl('/home');
  }

  onLogin = (): void => {
    console.log('login', { username: this.username, password: this.password });
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
          console.log(result.errorType);
        }
      },
      (err: any) => console.log(err)
    )
    .finally(() => console.log("setPosition ends."));
  }

  launchRegisterFields = async () => 
  {
    console.log("registerFields starts ...");
    
    const ionInputUser = document.getElementById('usernameInput') as HTMLIonInputElement | null;
    const ionInputPass = document.getElementById('passwordInput') as HTMLIonInputElement | null;
    if (!ionInputUser) {
      console.log('usernameInput not found');
      return;
    }
    if (!ionInputPass) {
      console.log('passwordInput not found');
      return;
    }

    const userInput = await ionInputUser.getInputElement();
    const passInput = await ionInputPass.getInputElement();

    this.behaviorService.initializeRegisterField(userInput, 'username');
    this.behaviorService.initializeRegisterField(passInput, 'password');
    
    console.log("registerFields ends ...");
  }
}
