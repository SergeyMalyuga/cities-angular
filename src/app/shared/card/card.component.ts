import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitilize.pipe';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus, FavoriteClass} from '../../core/constants/const';
import {ToggleFavoriteDirective} from '../directives/toggle-favorite.directive';
import {AppState} from '../../core/models/app.state';
import {Store} from '@ngrx/store';
import {changeFavoriteOfferStatus} from '../../store/favorite-offer/actions/favorite-offer.actions';

@Component({
  selector: 'app-card',
  imports: [CapitalizePipe, RouterLink, ToggleFavoriteDirective],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input({required: true}) offer!: OfferPreview;
  @Input({required: true}) authStatus!: AuthorizationStatus;
  private store = inject(Store<AppState>);
  public readonly Math = Math;
  public readonly AppRoute = AppRoute;
  public readonly FavoriteClass = FavoriteClass;

  handleFavoriteToggled() {
    this.store.dispatch(changeFavoriteOfferStatus({offerId: this.offer.id, status: Number(!this.offer.isFavorite)}))
  }

  protected readonly AuthorizationStatus = AuthorizationStatus;
}
