import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal,} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {ActivatedRoute} from '@angular/router';
import {Offer} from '../../core/models/offers';
import {OfferService} from '../../core/services/offer.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError, forkJoin, of, switchMap} from 'rxjs';
import {CapitalizePipe} from '../../shared/pipes/capitilize.pipe';
import {Comment} from '../../core/models/comments';
import {CommentService} from '../../core/services/comment.service';
import {CommentComponent} from '../../features/comment/comment.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus} from '../../store/app/selectors/app.selectors';
import {AuthorizationStatus} from '../../core/constants/const';
import {CommentFormComponent} from '../../features/comment-form/comment-form.component';
import {SortCommentsByDatePipe} from './pipes/sort-comments-by-date.pipe';

@Component({
  selector: 'app-offer',
  imports: [HeaderComponent, CapitalizePipe, CommentComponent, CommentFormComponent, SortCommentsByDatePipe],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit {
  public offer = signal<Offer | null>(null);
  public offerId = signal<string | null>(null);
  public comments = signal<Comment[]>([]);
  public commentsAmount = computed(() => this.comments().length);
  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UN_AUTH);
  public readonly Math = Math;
  public readonly AuthorizationStatus = AuthorizationStatus;
  private offerService = inject(OfferService);
  private commentService = inject(CommentService);
  private store = inject(Store<AppState>);
  private activatedRouter = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.activatedRouter.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((params) => {
          const id = params.get('id');
          if (id === null) {
            return of(null);
          }
          this.offerId.set(id);
          return forkJoin({
            offer: this.offerService.getOfferById(id),
            comments: this.commentService.getComments(id),
          }).pipe(
            catchError((err) => {
              console.log(err);
              return of(null);
            }),
          );
        }),
      )
      .subscribe((result) => {
        if (result) {
          this.offer.set(result.offer);
          this.comments.set(result.comments);
        }
      });

    this.store
      .select(selectAuthStatus)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => this.authStatus.set(status));
  }


  public onCommentAdded(comment: Comment): void {
    this.comments.update(comments => {
      if (comment) {
        return [comment, ...comments];
      }
      return comments;
    })
  }
}
