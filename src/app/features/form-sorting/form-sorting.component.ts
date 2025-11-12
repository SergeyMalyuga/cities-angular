import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {ToggleFormSortDirective} from './directives/toggle-form-sorting.directive';
import {CloseFormSortingDirective} from './directives/close-form-sorting.directive';
import {SortType} from '../../core/constants/const';
import {SelectSortTypeDirective} from './directives/select-sort-type.directive';

@Component({
  selector: 'app-form-sorting',
  templateUrl: './form-sorting.component.html',
  imports: [
    ToggleFormSortDirective,
    CloseFormSortingDirective,
    SelectSortTypeDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSortingComponent {
  public isSortFormOpen: WritableSignal<boolean> = signal<boolean>(false);
  public currentSortType: WritableSignal<SortType> = signal<SortType>(SortType.POPULAR);

  public onFormToggled() {
    this.isSortFormOpen.set(!this.isSortFormOpen())
  }

  public onFormSortClosed() {
    this.isSortFormOpen.set(false);
  }

  public onSortTypeSelected(sortType: SortType) {
    this.isSortFormOpen.set(false);
    this.currentSortType.set(sortType);
  }

  protected readonly SortType = SortType;
}
