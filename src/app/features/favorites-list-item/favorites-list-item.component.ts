import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CardComponent} from '../../shared/card/card.component';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {CapitalizePipe} from '../../shared/pipes/capitilize.pipe';

@Component({
  selector: 'app-favorites-list-item',
  templateUrl: './favorites-list-item.component.html',
  imports: [
    CardComponent,
    CapitalizePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesListItemComponent {
  @Input({required: true}) city!: string;
  @Input({required: true}) offers!: OfferPreview[];
  @Input({required: true}) authStatus!: AuthorizationStatus;
  protected readonly AppRoute = AppRoute;
}
