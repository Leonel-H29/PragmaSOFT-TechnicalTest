import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

const TOKEN_KEY = 'connection';

@Injectable({
  providedIn: 'root',
})
export class DbSettingsService {
  authURL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  public Login(loginUser: User): Observable<User> {
    return this.http.post<User>(this.authURL + 'login', loginUser);
  }

  /*
  La funcion elimina la el token que este almacenado (si es que hay)
  y luego almacena el token dentro de la variable 'token'
  */
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public Logout(): void {
    window.sessionStorage.clear();
  }
}
