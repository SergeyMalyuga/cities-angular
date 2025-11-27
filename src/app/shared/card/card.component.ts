import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitilize.pipe';
import {RouterLink} from '@angular/router';
import {AppRoute, FavoriteClass} from '../../core/constants/const';
import {ToggleFavoriteDirective} from '../directives/toggle-favorite.directive';

@Component({
  selector: 'app-card',
  imports: [CapitalizePipe, RouterLink, ToggleFavoriteDirective],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input({ required: true }) offer!: OfferPreview;
  public readonly Math = Math;
  protected readonly AppRoute = AppRoute;
  protected readonly FavoriteClass = FavoriteClass;
}
