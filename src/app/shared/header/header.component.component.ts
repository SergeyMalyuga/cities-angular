import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal
} from '@angular/core';
import { AppRoute, AuthorizationStatus } from '../../core/constants/const';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink,]
})
export class HeaderComponentComponent {
  public authStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.UN_AUTH);
  protected readonly AuthorizationStatus = AuthorizationStatus;
  protected readonly AppRoute = AppRoute;
}
