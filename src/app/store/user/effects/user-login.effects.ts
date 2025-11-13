import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { User } from '../../../core/models/user';
import { AuthService } from '../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserLoginEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map((user: User) => {
            this.authService.setToken(user.token);
            return UserActions.loginSuccess({ user });
          }),
          catchError((err: HttpErrorResponse) =>
            of(UserActions.loginFailure({ error: this.getErrorMessage(err) })),
          ),
        ),
      ),
    ),
  );

  private getErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 401:
        return 'Неверный email или пароль';
      case 500:
        return 'Сервер недоступен';
      default:
        return 'Ошибка при входе';
    }
  }
}
