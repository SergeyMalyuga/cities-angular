import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus, selectFavoriteOffers} from '../../store/app/selectors/app.selectors';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SortedFavoriteOffers} from '../../core/models/sorted-favorite-offers';
import {FavoritesListItemComponent} from '../../features/favorites-list-item/favorites-list-item.component';
import {AuthorizationStatus} from '../../core/constants/const';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  imports: [HeaderComponent, FavoritesListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  public favoriteOffers = signal<SortedFavoriteOffers>(this.getSortedOffers());
  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);
  public  offersAmount = computed(() => {
    const offers = this.favoriteOffers();
    return Object.values(offers).reduce((total, city) => total + city.length, 0);
  })
  public readonly Object = Object;

  ngOnInit(): void {
    this.store.select(selectFavoriteOffers).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(offers => {
        const sortedOffers = this.getSortedOffers();
        offers.forEach(offer => {
          const city = offer.city.name.toLowerCase();
          if (this.isKeyOf(city)) {
            sortedOffers[city].push(offer);
          }
        })
        this.favoriteOffers.set(sortedOffers);
      });

    this.store.select(selectAuthStatus).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(status => this.authStatus.set(status));
  }

  public isKeyOf(arg: string): arg is keyof SortedFavoriteOffers {
    return arg in this.favoriteOffers();
  }

  private getSortedOffers(): SortedFavoriteOffers {
    return {
      paris: [],
      cologne: [],
      brussels: [],
      amsterdam: [],
      hamburg: [],
      dusseldorf: [],
    }
  }
}
