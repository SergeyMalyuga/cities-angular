import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {HeaderComponentComponent} from '../../shared/header/header.component.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {OfferPreview} from '../../core/models/offers';
import {selectOffers} from '../../store/app/selectors/app.selectors';
import {Subject, takeUntil} from 'rxjs';
import {CardComponent} from '../../shared/card/card.component';
import {City} from '../../core/models/city';
import {CityName, DEFAULT_CITY, SortType} from '../../core/constants/const';
import {OffersByCityPipe} from './pipes/offers-by-city.pipe';
import {ChangeCityDirective} from './directives/change-city.directive';
import {CityByNamePipe} from './pipes/city-by-name.pipe';
import {changeCity} from '../../store/city/actions/city.actions';
import {FormSortingComponent} from '../../features/form-sorting/form-sorting.component';
import {OfferSortPipe} from './pipes/offer-sort.pipe';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponentComponent,
    CardComponent,
    OffersByCityPipe,
    ChangeCityDirective,
    CityByNamePipe,
    FormSortingComponent,
    OfferSortPipe,
  ],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject: Subject<void> = new Subject<void>();
  public offers: WritableSignal<OfferPreview[]> = signal<OfferPreview[]>([]);
  public currentCity: WritableSignal<City> = signal<City>(DEFAULT_CITY);
  public currentSortType: WritableSignal<SortType> = signal<SortType>(
    SortType.POPULAR
  );
  public readonly CityName = CityName;

  public ngOnInit(): void {
    this.store
      .select(selectOffers)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((offers: OfferPreview[]) => this.offers.set(offers));
  }

  public onCityChanged(city: City): void {
    this.currentCity.set(city);
    this.store.dispatch(changeCity({ city }));
  }

  public onSortTypeChanged(sortType: SortType): void {
    this.currentSortType.set(sortType);
  }
}
