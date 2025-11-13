import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { AppRoute, AuthorizationStatus } from '../../core/constants/const';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { selectAuthStatus } from '../../store/app/selectors/app.selectors';
import { Subject, takeUntil } from 'rxjs';
import { SignOutDirective } from './directives/sign-out.directive';
import { logout } from '../../store/user/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SignOutDirective],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UN_AUTH);
  public readonly AuthorizationStatus = AuthorizationStatus;
  public readonly AppRoute = AppRoute;
  private store = inject(Store<AppState>);
  private destroySubject = new Subject<void>();

  ngOnInit(): void {
    this.store
      .select(selectAuthStatus)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((authStatus: AuthorizationStatus) =>
        this.authStatus.set(authStatus),
      );
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  onSignedOut() {
    this.store.dispatch(logout());
  }
}
