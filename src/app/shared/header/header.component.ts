import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal,} from '@angular/core';
import {AppRoute, AuthorizationStatus, DEFAULT_USER} from '../../core/constants/const';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus, selectUser} from '../../store/app/selectors/app.selectors';
import {Subject, takeUntil} from 'rxjs';
import {SignOutDirective} from './directives/sign-out.directive';
import {logout} from '../../store/user/actions/user.actions';
import {User} from '../../core/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SignOutDirective],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UN_AUTH);
  public user = signal<User | undefined>(DEFAULT_USER);
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
    this.store.select(selectUser).pipe(takeUntil(this.destroySubject))
      .subscribe((user: User | undefined) => this.user.set(user));
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  onSignedOut() {
    this.store.dispatch(logout());
  }
}
