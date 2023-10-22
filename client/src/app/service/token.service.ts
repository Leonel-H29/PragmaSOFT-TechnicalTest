import { Injectable } from '@angular/core';

const USER_KEY = 'auth_user';
const TOKEN_KEY = 'auth_token';
const DB_KEY = 'auth_db';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  /**
  La funcion elimina el valor anterior del `token` que este almacenado (si es que hay)
  y luego almacena el nuevo valor del `token` dentro de la variable de `auth_token`
  */
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  /**Obtengo el valor del `token`*/
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  /**
  La funcion elimina el valor anterior del `username` que este almacenado (si es que hay)
  y luego almacena el nuevo valor del `username` dentro de la variable `auth_user`
  */
  public setUsername(username: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, username);
  }
  /**Obtengo el valor del `username`*/
  public getUsername(): string {
    return sessionStorage.getItem(USER_KEY)!;
  }

  /**
  La funcion elimina el valor anterior del `database` que este almacenado (si es que hay)
  y luego almacena el nuevo valor del `database` dentro de la variable `auth_db`
  */
  public setDatabase(database: string): void {
    window.sessionStorage.removeItem(DB_KEY);
    window.sessionStorage.setItem(DB_KEY, database);
  }
  /**Obtengo el valor del `database`*/
  public getDatabase(): string {
    return sessionStorage.getItem(DB_KEY)!;
  }

  /**Cierro la sesion, borrando todas las credenciales almacenadas en el navegador */
  public Logout(): void {
    window.sessionStorage.clear();
  }

  /**Controlo si el usuario esta logueado, para me fijo si tiene todas las credenciales almacenadas */
  public isLogged() {
    return this.getDatabase() && this.getToken() && this.getUsername();
  }
}
