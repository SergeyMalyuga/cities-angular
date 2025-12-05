import {ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, signal,} from '@angular/core';
import {AppRoute, AuthorizationStatus, DEFAULT_USER,} from '../../core/constants/const';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus, selectFavoriteOffers, selectUser,} from '../../store/app/selectors/app.selectors';
import {Subject, takeUntil} from 'rxjs';
import {SignOutDirective} from './directives/sign-out.directive';
import {logout} from '../../store/user/actions/user.actions';
import {User} from '../../core/models/user';
import {OfferPreview} from '../../core/models/offers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SignOutDirective],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UN_AUTH);
  public user = signal<User | undefined>(DEFAULT_USER);
  public favoriteOffers = signal<OfferPreview[]>([]);
  public favoriteOffersAmount = computed(() => this.favoriteOffers().length);
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
    this.store
      .select(selectUser)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((user: User | undefined) => this.user.set(user));
    this.store
      .select(selectFavoriteOffers)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((favoriteOffers) => this.favoriteOffers.set(favoriteOffers));
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  onSignedOut() {
    this.store.dispatch(logout());
  }
}
