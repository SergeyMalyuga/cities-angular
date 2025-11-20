import {Injectable} from '@angular/core';
import {Token} from '../models/token';
import {AUTH_TOKEN_KEY_NAME} from '../constants/const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public setToken(token: Token) {
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  }

  public getToken(): Token | null {
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    return token ?? null;
  }

  public removeToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  }
}
