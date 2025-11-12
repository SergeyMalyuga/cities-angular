import {Pipe, PipeTransform} from '@angular/core';
import {CITY_LOCATIONS, DEFAULT_CITY} from '../../../core/constants/const';
import {City} from '../../../core/models/city';

@Pipe({
  name: 'cityByName'
})
export class CityByNamePipe implements PipeTransform {
  transform(value: string): City {
    const city = CITY_LOCATIONS.find((city: City) => city.name === value);
    return city ?? DEFAULT_CITY;
  }
}
