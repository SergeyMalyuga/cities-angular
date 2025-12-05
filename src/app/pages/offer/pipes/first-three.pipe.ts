import {Pipe, PipeTransform} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';

@Pipe({ name: 'firstThree' })
export class FirstThreePipe implements PipeTransform {
  transform(offers: OfferPreview[]): OfferPreview[] {
    return offers?.slice(0, 3) ?? [];
  }
}
