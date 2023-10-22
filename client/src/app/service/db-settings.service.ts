import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbSettingsService {
  /** `authURL`: Direccion especifica de la API a la que se le realizara peticiones*/
  authURL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  /**
   * `Login`: La funcion se encarga de realizar la peticion al servidor para que el usuario pueda autenticarse.
   *@param loginUser : `any` = Parametro que contrendra las credenciales del usuario y la base de datos para conectarse.
   */
  public Login(loginUser: any): Observable<any> {
    return this.http.post<any>(this.authURL + 'login/', loginUser);
  }
}
