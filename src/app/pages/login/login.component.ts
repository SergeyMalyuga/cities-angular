import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../core/constants/const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink
  ]
})
export class LoginComponent {
  protected readonly AppRoute = AppRoute;
}
