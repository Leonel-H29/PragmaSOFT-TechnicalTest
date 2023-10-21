import { Injectable } from '@angular/core';

const USER_KEY = 'auth_user';
const TOKEN_KEY = 'auth_token';
const DB_KEY = 'auth_db';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  /*
  La funcion elimina  el valor token que este almacenado (si es que hay)
  y luego almacena el token dentro de la variable 'token'el valor de
  */
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  /*
  La funcion elimina el valor deusername que este almacenado (si es que hay)
  y luego almacena el username dentro de la variable 'username'
  */
  public setUsername(username: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USER_KEY)!;
  }

  /*
  La funcion elimina el valor de database que este almacenado (si es que hay)
  y luego almacena el username dentro de la variable 'username'
  */
  public setDatabase(database: string): void {
    window.sessionStorage.removeItem(DB_KEY);
    window.sessionStorage.setItem(DB_KEY, database);
  }

  public getDatabase(): string {
    return sessionStorage.getItem(DB_KEY)!;
  }

  public Logout(): void {
    window.sessionStorage.clear();
  }
}
