import {ChangeDetectionStrategy, Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {ActivatedRoute} from '@angular/router';
import {Offer} from '../../core/models/offers';
import {OfferService} from '../../core/services/offer.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {of, switchMap} from 'rxjs';
import {CapitalizePipe} from '../../shared/pipes/capitilize.pipe';
import {Comment} from '../../core/models/comments';
import {CommentService} from '../../core/services/comment.service';

@Component({
  selector: 'app-offer',
  imports: [HeaderComponent, CapitalizePipe],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit {
  public offer = signal<Offer | null>(null);
  public offerId = signal<string | null>(null);
  public comments = signal<Comment[]>([]);
  public readonly Math = Math;
  private offerService = inject(OfferService);
  private commentService = inject(CommentService);
  private activatedRouter = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const id = this.offerId();
      if (id) {
        this.commentService.getComments(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(comments => this.comments.set(comments));
      }
    });
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.pipe(takeUntilDestroyed(this.destroyRef), switchMap(params => {
      const id = params.get('id');
      this.offerId.set(id);
      return id ? this.offerService.getOfferById(id) : of(null)
    })).subscribe((offer) => this.offer.set(offer));
  }
}
