import {ChangeDetectionStrategy, Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {ActivatedRoute} from '@angular/router';
import {Offer} from '../../core/models/offers';
import {OfferService} from '../../core/services/offer.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {of, switchMap} from 'rxjs';

@Component({
  selector: 'app-offer',
  imports: [HeaderComponent],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit {
  public offer = signal<Offer | null>(null);
  public offerId = signal<string | null>(null);
  private offerService = inject(OfferService);
  private activatedRouter = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.activatedRouter.paramMap.pipe(takeUntilDestroyed(this.destroyRef), switchMap(params => {
      const id = params.get('id');
      this.offerId.set(id);
      return id ? this.offerService.getOfferById(id) : of(null)
    })).subscribe((offer) => this.offer.set(offer));
  }

  protected readonly Math = Math;
}
