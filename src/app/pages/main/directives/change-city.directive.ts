import {Directive, EventEmitter, HostBinding, HostListener, Input, Output,} from '@angular/core';
import {City} from '../../../core/models/city';

@Directive({
  selector: '[appChangeCity]',
})
export class ChangeCityDirective {
  @Input({ required: true }) city!: City;
  @Input({ required: true }) currentCity!: City;
  @Output() cityChanged = new EventEmitter<City>();

  @HostBinding('class.tabs__item--active')
  get isActive() {
    return this.currentCity.name === this.city.name;
  }

  @HostListener('click', ['$event'])
  onChangeCity(evt: MouseEvent) {
    evt.preventDefault();
    this.cityChanged.emit(this.city);
  }
}
