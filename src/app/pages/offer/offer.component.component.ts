import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponentComponent } from '../../shared/header/header.component.component';

@Component({
  selector: 'app-offer',
  imports: [HeaderComponentComponent,],
  templateUrl: './offer.component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferComponentComponent {}
