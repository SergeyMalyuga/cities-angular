import {ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit, signal} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitilize.pipe';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus, FavoriteClass} from '../../core/constants/const';
import {ToggleFavoriteDirective} from '../directives/toggle-favorite.directive';
import {AppState} from '../../core/models/app.state';
import {Store} from '@ngrx/store';
import {changeFavoriteOfferStatus} from '../../store/favorite-offer/actions/favorite-offer.actions';
import {selectIsFavoriteOfferLoading} from '../../store/app/selectors/app.selectors';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter} from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [CapitalizePipe, RouterLink, ToggleFavoriteDirective],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input({required: true}) offer!: OfferPreview;
  @Input({required: true}) authStatus!: AuthorizationStatus;
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);
  public isFavoriteBtnDisable = signal<boolean>(false);
  public readonly AuthorizationStatus = AuthorizationStatus;
  public readonly Math = Math;
  public readonly AppRoute = AppRoute;
  public readonly FavoriteClass = FavoriteClass;

  ngOnInit(): void {
    this.store.select(selectIsFavoriteOfferLoading).pipe(filter((isLoading) => !isLoading),
      takeUntilDestroyed(this.destroyRef)).subscribe(() => this.isFavoriteBtnDisable.set(false));
  }

  handleFavoriteToggled() {
    this.isFavoriteBtnDisable.set(true);
    this.store.dispatch(changeFavoriteOfferStatus({offerId: this.offer.id, status: Number(!this.offer.isFavorite)}));
  }
}
