import {Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output} from '@angular/core';
import {Bookmark} from '../../core/models/bookmark.model';

@Directive({
  selector: '[appToggleFavorite]',
})
export class ToggleFavoriteDirective {
  @Output() favoriteToggled = new EventEmitter<void>();
  @Input({required: true}) bookmarkConfig!: Bookmark;
  private elementRef = inject(ElementRef);

  @HostListener('click')
  onToggleBtnClick() {
    const target = this.elementRef.nativeElement as HTMLElement;
      target.classList.toggle(this.bookmarkConfig.activeClass);
  }
}
