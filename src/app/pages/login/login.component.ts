import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {login} from '../../store/user/actions/user.actions';
import {selectAuthStatus} from '../../store/app/selectors/app.selectors';
import {filter, Subject, take, takeUntil} from 'rxjs';
import {loadOffers} from '../../store/offer/actions/offer.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ReactiveFormsModule],
})
export class LoginComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private destroySubject = new Subject<void>();
  public readonly AppRoute = AppRoute;
  public loginGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).+$')],
    ],
  });

  onSubmit() {

    const {email, password} = this.loginGroup.value;
    if (this.loginGroup.valid) {
      if (email && password) {
        console.log(1);
        this.store.dispatch(login({email, password}));
        this.store
          .select(selectAuthStatus)
          .pipe(
            filter((status) => status === AuthorizationStatus.AUTH),
            take(1), takeUntil(this.destroySubject)
          )
          .subscribe(() => {
            console.log(3);
            this.store.dispatch(loadOffers());
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
}
