import {Directive, EventEmitter, HostListener, Input, Output,} from '@angular/core';

@Directive({
  selector: '[appCloseFormSorting]',
})
export class CloseFormSortingDirective {
  @Input({ required: true }) isSortFormOpen!: boolean;
  @Output() formSortClosed: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('mouseleave')
  onMouseleave() {
    if (this.isSortFormOpen) {
      this.formSortClosed.emit();
    }
  }

  @HostListener('keydown.escape')
  onEscape() {
    if (this.isSortFormOpen) {
      this.formSortClosed.emit();
    }
  }
}
