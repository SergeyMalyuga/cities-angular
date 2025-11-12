import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {ToggleFormSortDirective} from './directives/toggle-form-sorting.directive';

@Component({
  selector: 'app-form-sorting',
  templateUrl: './form-sorting.component.html',
  imports: [
    ToggleFormSortDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSortingComponent {
  public isSortFormOpen: WritableSignal<boolean> = signal<boolean>(false);

  public onFormToggled() {
    this.isSortFormOpen.set(!this.isSortFormOpen())
  }
}
