import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { AuthorizationStatus } from '../../../core/constants/const';

@Directive({
  selector: '[appSignOut]',
})
export class SignOutDirective {
  @Input({ required: true }) authStatus!: AuthorizationStatus;
  @Output() signedOut = new EventEmitter<void>();

  @HostListener('click')
  onSignOutClick() {
    if (this.authStatus === AuthorizationStatus.AUTH) {
      this.signedOut.emit();
    }
  }
}
