import {ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, Output,} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {CommentService} from '../../core/services/comment.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Comment} from '../../core/models/comments';

@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent {
  @Input({ required: true }) public offerId!: string | null;
  @Output() commentAdded = new EventEmitter<Comment>();

  private formBuilder = inject(FormBuilder);
  private commentService = inject(CommentService);
  private destroyRef = inject(DestroyRef);
  public commentForm: FormGroup = this.formBuilder.group({
    rating: ['', [Validators.required]],
    comment: ['', [Validators.required, Validators.minLength(56)]],
  });

  public onSubmit() {
    if (this.commentForm.valid && this.offerId) {
      const { rating, comment } = this.commentForm.value;
      this.commentService
        .postComment(this.offerId, Number(rating), comment)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((comment) => this.commentAdded.emit(comment));
    }
  }
}
