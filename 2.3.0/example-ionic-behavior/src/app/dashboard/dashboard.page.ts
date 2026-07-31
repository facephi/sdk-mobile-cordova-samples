import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorService } from '../services/behavior/behavior.service';
import { BehaviorResult } from '../services/behavior/behavior.service.result';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DashboardPage {
  behaviorService: BehaviorService;

  constructor(private router: Router, behaviorService: BehaviorService) {
    this.behaviorService = behaviorService;
  }

  goLogin = (): void => {
    this.launchSetPosition('Login');
    this.router.navigateByUrl('/login');
  }

  goHome = (): void => {
    this.launchSetPosition('Home');
    this.router.navigateByUrl('/home');
  }

  launchSetPosition = async (screen: string) => {
    console.log('setPosition starts...');
    await this.behaviorService.setPosition(screen)
      .then(
        (result: BehaviorResult) => {
          console.log(result);
          if (result.finishStatus === 2) {
            console.log(result.errorType);
          }
        },
        (err: any) => console.log(err)
      )
      .finally(() => console.log('setPosition ends.'));
  }
}
