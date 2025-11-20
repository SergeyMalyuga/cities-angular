import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Comment} from '../../core/models/comments';
import {MonthYearPipe} from './pipes/month-year.pipe';
import {FullDatePipe} from './pipes/full-date.pipe';

@Component({
  selector: 'app-comment',
  imports: [MonthYearPipe, FullDatePipe],
  templateUrl: './comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input({ required: true }) comment!: Comment;
}
