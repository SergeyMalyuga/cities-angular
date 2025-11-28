import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FavoriteOfferService} from '../../../core/services/favorite-offer.service';
import * as FavoriteActions from '../actions/favorite-offer.actions';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class FavoriteOfferEffects {
  private actions$ = inject(Actions);
  private favoriteOfferService = inject(FavoriteOfferService);

  getFavoriteOffers$ = createEffect(() =>
    this.actions$.pipe(ofType(FavoriteActions.loadFavoriteOffers), exhaustMap(() => this.favoriteOfferService.getFavorites()
      .pipe(map(favoriteOffers => FavoriteActions.loadFavoriteOffersSuccess({favoriteOffers})),
        catchError((err: HttpErrorResponse) => of(FavoriteActions.loadFavoriteOffersFailure({error: err.message})))))))
}
