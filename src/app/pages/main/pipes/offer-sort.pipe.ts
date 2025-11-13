import { Pipe, PipeTransform } from '@angular/core';
import { OfferPreview } from '../../../core/models/offers';
import { SortType } from '../../../core/constants/const';

@Pipe({
  name: 'offerSort'
})
export class OfferSortPipe implements PipeTransform {
  transform(offers: OfferPreview[], sortType: SortType): OfferPreview[] {
    if (!offers?.length) return [];
    const offersCopy = [...offers,];

    switch (sortType) {
      case SortType.POPULAR: {
        return [...offers,];
      }
      case SortType.PRICE_LOW_TO_HIGH: {
        return offersCopy.sort((a, b) => a.price - b.price);
      }
      case SortType.PRICE_HIGH_TO_LOW: {
        return offersCopy.sort((a, b) => b.price - a.price);
      }
      case SortType.TOP_RATED_FIRST: {
        return offersCopy.sort((a, b) => b.rating - a.rating);
      }
      default:
        return offersCopy;
    }
  }
}
