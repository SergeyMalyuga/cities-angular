import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal,} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Offer, OfferPreview} from '../../core/models/offers';
import {OfferService} from '../../core/services/offer.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError, forkJoin, of, switchMap} from 'rxjs';
import {CapitalizePipe} from '../../shared/pipes/capitilize.pipe';
import {Comment} from '../../core/models/comments';
import {CommentService} from '../../core/services/comment.service';
import {CommentComponent} from '../../features/comment/comment.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {
  selectAuthStatus,
  selectIsFavoriteOfferLoading,
  selectIsOfferFavorite,
} from '../../store/app/selectors/app.selectors';
import {AppRoute, AuthorizationStatus, FavoriteClass,} from '../../core/constants/const';
import {CommentFormComponent} from '../../features/comment-form/comment-form.component';
import {SortCommentsByDatePipe} from './pipes/sort-comments-by-date.pipe';
import {CardComponent} from '../../shared/card/card.component';
import {FirstThreePipe} from './pipes/first-three.pipe';
import {ToggleFavoriteDirective} from '../../shared/directives/toggle-favorite.directive';
import {changeFavoriteOfferStatus} from '../../store/favorite-offer/actions/favorite-offer.actions';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-offer',
  imports: [
    HeaderComponent,
    CapitalizePipe,
    CommentComponent,
    CommentFormComponent,
    SortCommentsByDatePipe,
    CardComponent,
    FirstThreePipe,
    ToggleFavoriteDirective,
    AsyncPipe,
  ],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit {
  public offer = signal<Offer | null>(null);
  public nearbyOffers = signal<OfferPreview[]>([]);
  public offerId = signal<string | null>(null);
  public comments = signal<Comment[]>([]);
  public commentsAmount = computed(() => this.comments().length);
  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UN_AUTH);
  public readonly Math = Math;
  public readonly AuthorizationStatus = AuthorizationStatus;
  public readonly FavoriteClass = FavoriteClass;
  private offerService = inject(OfferService);
  private commentService = inject(CommentService);
  private store = inject(Store<AppState>);
  private router = inject(Router);
  public isFavoriteOffersLoading$ = this.store.select(
    selectIsFavoriteOfferLoading,
  );
  private activatedRouter = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private isFavorite = signal<boolean>(false);

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
            nearbyOffers: this.offerService.getNearbyOffers(id),
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
          this.nearbyOffers.set(result.nearbyOffers);
        }
      });

    this.store
      .select(selectAuthStatus)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => this.authStatus.set(status));

    this.store
      .select(selectIsOfferFavorite)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((entities) => {
        const id = this.offerId();
        if (id !== null && entities[id] !== undefined) {
          this.isFavorite.set(entities[id].isFavorite);
        } else {
          this.isFavorite.set(false);
        }
      });
  }

  public onCommentAdded(comment: Comment): void {
    this.comments.update((comments) => {
      if (comment) {
        return [comment, ...comments];
      }
      return comments;
    });
  }

  public onFavoriteOfferToggled() {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      const id = this.offerId();
      if (id) {
        this.store.dispatch(
          changeFavoriteOfferStatus({
            offerId: id,
            status: Number(!this.isFavorite()),
          }),
        );
      }
    } else {
      this.router.navigate([AppRoute.LOGIN]);
    }
  }

  protected readonly AppRoute = AppRoute;
}
