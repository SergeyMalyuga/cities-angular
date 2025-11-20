import {ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {ActivatedRoute} from '@angular/router';
import {Offer} from '../../core/models/offers';
import {OfferService} from '../../core/services/offer.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {forkJoin, of, switchMap} from 'rxjs';
import {CapitalizePipe} from '../../shared/pipes/capitilize.pipe';
import {Comment} from '../../core/models/comments';
import {CommentService} from '../../core/services/comment.service';
import {CommentComponent} from '../../features/comment/comment.component';

@Component({
  selector: 'app-offer',
  imports: [HeaderComponent, CapitalizePipe, CommentComponent],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit {
  public offer = signal<Offer | null>(null);
  public offerId = signal<string | null>(null);
  public comments = signal<Comment[]>([]);
  public commentsAmount = computed(() => this.comments.length);
  public readonly Math = Math;
  private offerService = inject(OfferService);
  private commentService = inject(CommentService);
  private activatedRouter = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.activatedRouter.paramMap.pipe(takeUntilDestroyed(this.destroyRef), switchMap(params => {
      const id = params.get('id');
      if (id === null) {
        return of(null);
      }
      this.offerId.set(id);
      return forkJoin({
        offer: this.offerService.getOfferById(id),
        comments: this.commentService.getComments(id),
      })
    })).subscribe((result) => {
      if (result) {
        this.offer.set(result.offer);
        this.comments.set(result.comments);
      }
    });
  }
}

