import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions/city.actions';
import { catchError, map, of } from 'rxjs';

@Injectable()
export class CityEffects {
  private actions$ = inject(Actions);

  changeCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeCity),
      map((action) => actions.changeCitySuccess({ city: action.city })),
      catchError(() =>
        of(actions.changeCityFailure({ error: 'Ошибка при изменении города' })),
      ),
    ),
  );
}
