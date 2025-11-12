import {Pipe, PipeTransform} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {City} from '../../../core/models/city';

@Pipe({
  name: 'offersByCity'
})
export class OffersByCityPipe implements PipeTransform {
  transform(value: OfferPreview[], city: City): OfferPreview[] {
    return value.filter((offer) => offer.city.name === city.name);
  }
}
