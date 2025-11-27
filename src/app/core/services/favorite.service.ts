import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OfferPreview} from '../models/offers';
import {APIRoute, BASE_URL} from '../constants/const';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class FavoriteService {
  private http = inject(HttpClient);

  public getFavorites(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.FAVORITE}`);
  }

  public changeFavoriteStatus(offerId: string, status: number): Observable<OfferPreview> {
    return this.http.post<OfferPreview>(`${BASE_URL}/${APIRoute.FAVORITE}/${offerId}/${status}`, {offerId, status});
  }
}
