import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {HeaderComponentComponent} from '../../shared/header/header.component.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {OfferPreview} from '../../core/models/offers';
import {selectOffers} from '../../store/app/selectors/app.selectors';
import {Subject, takeUntil} from 'rxjs';
import {CardComponent} from '../../shared/card/card.component';

@Component({
  selector: 'app-main',
  imports: [HeaderComponentComponent, CardComponent],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject: Subject<void> = new Subject<void>();
  public offers: WritableSignal<OfferPreview[]> = signal<OfferPreview[]>([]);
  public offerAmount = computed(() => this.offers().length);

  public ngOnInit(): void {
    this.store.select(selectOffers).pipe(takeUntil(this.destroySubject))
      .subscribe((offers: OfferPreview[]) => this.offers.set(offers))
  }
}
