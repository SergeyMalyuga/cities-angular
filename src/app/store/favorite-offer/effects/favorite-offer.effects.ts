import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FavoriteOfferService} from '../../../core/services/favorite-offer.service';
import * as FavoriteActions from '../actions/favorite-offer.actions';
import {catchError, exhaustMap, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {adaptOfferToPreview} from '../../../core/adapters/offer.adapter';

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
        catchError((err: HttpErrorResponse) => of(FavoriteActions.loadFavoriteOffersFailure({error: err.message})))))));

  changeFavoriteOfferStatus$ = createEffect(() =>
    this.actions$.pipe(ofType(FavoriteActions.changeFavoriteOfferStatus),
      switchMap(({offerId, status}) =>
        this.favoriteOfferService.changeFavoriteStatus(offerId, status).pipe(map((favoriteOffer) =>
            FavoriteActions.changeFavoriteOfferStatusSuccess({favoriteOffer: adaptOfferToPreview(favoriteOffer)})),
          catchError((err: HttpErrorResponse) => of(FavoriteActions.changeFavoriteOfferStatusFailure({error: err.message})))))));
}
