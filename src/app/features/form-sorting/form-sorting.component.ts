import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { ToggleFormSortDirective } from './directives/toggle-form-sorting.directive';
import { CloseFormSortingDirective } from './directives/close-form-sorting.directive';
import { SortType } from '../../core/constants/const';
import { SelectSortTypeDirective } from './directives/select-sort-type.directive';

@Component({
  selector: 'app-form-sorting',
  templateUrl: './form-sorting.component.html',
  imports: [
    ToggleFormSortDirective,
    CloseFormSortingDirective,
    SelectSortTypeDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSortingComponent {
  @Output() sortChanged: EventEmitter<SortType> = new EventEmitter<SortType>();
  @Input({ required: true }) set currentSortType(sortType: SortType) {
    this._currentSortType = sortType;
  }

  public get currentSortType() {
    return this._currentSortType;
  }
  private _currentSortType!: SortType;

  public isSortFormOpen: WritableSignal<boolean> = signal<boolean>(false);

  public onFormToggled() {
    this.isSortFormOpen.set(!this.isSortFormOpen());
  }

  public onFormSortClosed() {
    this.isSortFormOpen.set(false);
  }

  public onSortTypeSelected(sortType: SortType) {
    this.isSortFormOpen.set(false);
    this.sortChanged.emit(sortType);
  }

  protected readonly SortType = SortType;
}
