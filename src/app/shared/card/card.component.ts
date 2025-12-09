import {ChangeDetectionStrategy, Component, inject, Input,} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitilize.pipe';
import {Router, RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus, FavoriteClass,} from '../../core/constants/const';
import {ToggleFavoriteDirective} from '../directives/toggle-favorite.directive';
import {AppState} from '../../core/models/app.state';
import {Store} from '@ngrx/store';
import {changeFavoriteOfferStatus} from '../../store/favorite-offer/actions/favorite-offer.actions';
import {selectIsFavoriteOfferLoading} from '../../store/app/selectors/app.selectors';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CapitalizePipe, RouterLink, ToggleFavoriteDirective, AsyncPipe],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input({ required: true }) offer!: OfferPreview;
  @Input({ required: true }) authStatus!: AuthorizationStatus;
  @Input({ required: true }) pageType!: AppRoute;

  private store = inject(Store<AppState>);
  private router = inject(Router);
  public isFavoriteOffersLoading$ = this.store.select(
    selectIsFavoriteOfferLoading,
  );
  public readonly AuthorizationStatus = AuthorizationStatus;
  public readonly Math = Math;
  public readonly AppRoute = AppRoute;
  public readonly FavoriteClass = FavoriteClass;

  handleFavoriteToggled() {
    if (this.authStatus === AuthorizationStatus.AUTH) {
      this.store.dispatch(
        changeFavoriteOfferStatus({
          offerId: this.offer.id,
          status: Number(!this.offer.isFavorite),
        }),
      );
    } else {
      this.router.navigate([AppRoute.LOGIN]);
    }
  }
}
