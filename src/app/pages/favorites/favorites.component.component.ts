import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponentComponent } from '../../shared/header/header.component.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.component.html',
  imports: [HeaderComponentComponent,],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponentComponent {}
