import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../core/services/auth.service';

@Injectable()
export class UserLogoutEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() =>
        this.userService.removeUser().pipe(
          map(() => {
            this.authService.removeToken();
            return UserActions.logoutSuccess();
          }),
          catchError((err: HttpErrorResponse) =>
            of(UserActions.logoutFailure({ error: this.getErrorMessage(err) })),
          ),
        ),
      ),
    ),
  );

  private getErrorMessage(error: HttpErrorResponse) {
    switch (error.status) {
      case 401:
        return 'Не удалось выйти из системы';
      case 500:
        return 'Сервер недоступен';
      default:
        return 'Ошибка при выходе из системы';
    }
  }
}
