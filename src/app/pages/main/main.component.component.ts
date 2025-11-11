import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HeaderComponentComponent} from '../../shared/header/header.component.component';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponentComponent
  ],
  templateUrl: './main.component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponentComponent {

}
