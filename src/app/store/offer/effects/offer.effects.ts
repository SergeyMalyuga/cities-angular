import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OfferService } from '../../../core/services/offer.service';
import * as actions from '../actions/offer.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { OfferPreview } from '../../../core/models/offers';

@Injectable()
export class OfferEffects {
  private actions$ = inject(Actions);
  private offerService: OfferService = inject(OfferService);

  loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadOffers),
      switchMap(() =>
        this.offerService.getOffers().pipe(
          map((offers: OfferPreview[]) =>
            actions.loadOffersSuccess({ offers }),
          ),
          catchError(() => of(actions.loadOffersFailure())),
        ),
      ),
    ),
  );
}
