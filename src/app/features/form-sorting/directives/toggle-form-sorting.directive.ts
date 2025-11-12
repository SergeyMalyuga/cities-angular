import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appToggleFormSort]',
})
export class ToggleFormSortDirective {
  @Output() formToggled: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('click')
  onMouseClick() {
    this.formToggled.emit();
  }

  @HostListener('keydown.enter')
  onEnterPress() {
    this.formToggled.emit();
  }
}
