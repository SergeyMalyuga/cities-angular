import {ChangeDetectionStrategy, Component, EventEmitter, inject, OnDestroy, Output, signal,} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus, CITY_LOCATIONS} from '../../core/constants/const';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {login} from '../../store/user/actions/user.actions';
import {selectAuthStatus} from '../../store/app/selectors/app.selectors';
import {filter, Subject, take, takeUntil} from 'rxjs';
import {loadOffers} from '../../store/offer/actions/offer.actions';
import {City} from '../../core/models/city';
import {changeCity} from '../../store/city/actions/city.actions';
import {loadFavoriteOffers} from '../../store/favorite-offer/actions/favorite-offer.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ReactiveFormsModule],
})
export class LoginComponent implements OnDestroy {
  @Output() cityChanged = new EventEmitter<City>();

  private formBuilder = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private destroySubject = new Subject<void>();
  public randomLocation = signal<City>(this.getRandomLocation());
  public readonly AppRoute = AppRoute;
  public loginGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).+$')],
    ],
  });

  onSubmit() {
    const { email, password } = this.loginGroup.value;
    if (this.loginGroup.valid) {
      if (email && password) {
        this.store.dispatch(login({ email, password }));
        this.store
          .select(selectAuthStatus)
          .pipe(
            filter((status) => status === AuthorizationStatus.AUTH),
            take(1),
            takeUntil(this.destroySubject),
          )
          .subscribe(() => {
            this.store.dispatch(loadOffers());
            this.store.dispatch(loadFavoriteOffers());
            this.loginGroup.reset();
            this.router.navigate([AppRoute.MAIN]);
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  private getRandomLocation() {
    return CITY_LOCATIONS[Math.floor(Math.random() * CITY_LOCATIONS.length)];
  }

  public onCityChange(evt: MouseEvent) {
    evt.preventDefault();
    this.store.dispatch(changeCity({city: this.randomLocation()}));
    this.router.navigate([AppRoute.MAIN]);
  }
}
