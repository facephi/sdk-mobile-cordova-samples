import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
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
  message = '';
  showError = false;

  constructor(
    private router: Router,
    public behaviorService: BehaviorService,
    private changeDetection: ChangeDetectorRef
  ) {}

  get user(): string {
    return this.behaviorService.userId;
  }

  private setError(message: string): void {
    this.message = message;
    this.showError = true;
    this.changeDetection.markForCheck();
  }

  launchSetPosition = async (position: string): Promise<void> => {
    console.log('Starting launchSetPosition...');
    this.showError = false;

    try {
      const result: BehaviorResult = await this.behaviorService.setPosition(position);
      console.log('setPosition result', result);

      if (result.finishStatus === this.behaviorService.finishError) {
        this.setError(result.errorMessage || result.errorType || 'Unknown error');
      }
    } catch (error) {
      console.log('Error setPosition', error);
      this.setError(String(error));
    } finally {
      console.log('End setPosition...');
    }
  };

  goToHome = async (): Promise<void> => {
    await this.launchSetPosition('Home');
    this.router.navigateByUrl('/home');
  };

  onLogout = async (): Promise<void> => {
    this.behaviorService.userId = '';
    await this.launchSetPosition('Login');
    this.router.navigateByUrl('/login');
  };
}
