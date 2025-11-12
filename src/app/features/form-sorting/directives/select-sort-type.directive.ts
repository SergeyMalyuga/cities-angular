import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {SortType} from '../../../core/constants/const';

@Directive({
  selector: '[appSelectSortType]',
})

export class SelectSortTypeDirective {
  @Input({required: true}) sortType!: SortType;
  @Input({required: true}) currentSortType!: string;
  @Output() sortTypeSelected: EventEmitter<SortType> = new EventEmitter<SortType>();

  @HostBinding('class.places__option--active')
  get isSelected(): boolean {
    return this.currentSortType === this.sortType;
  }

  @HostListener('click')
  onSortTypeClick() {
    this.sortTypeSelected.emit(this.sortType);
  }
}
