import { Injectable } from '@angular/core';
import { Serie } from '../model/series';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  /** `serieURL`: Direccion especifica de la API a la que se le realizara peticiones*/
  //serieURL = 'http://localhost:8000/api/series/';
  serieURL = environment.URL + 'series/';

  constructor(private http: HttpClient, private token: TokenService) {}

  /**
   * `getHeaders`: Funcion se encargara de crear la cabecera de la solicitud para ser enviada
   * junto con los datos a la API
   * @returns `HttpHeaders` = Cabecera con los datos del token
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.token.getToken()}`,
    });
  }

  /**
   * `ListSeries`: La funcion se encarga de enviar una solitud a la API y obtener una lista de las series
   * que estan almacenadas en la base de datos
   *
   * @returns `list<Serie>` = Lista de todas las series
   */

  public ListSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.serieURL, {
      headers: this.getHeaders(),
    });
  }

  /**
   * `GetSerie`: La funcion se encarga de enviar una solitud a la API y obtener un solo registro
   * relacionado a una serie. Para ello se debe enviar un `id` por parametro para poder obtenerlo
   *
   * @param id : `number` = Id del registro
   * @returns `object<Serie>` = La serie correspondiente al ID
   */
  public GetSerie(id: number): Observable<Serie> {
    return this.http.get<Serie>(this.serieURL + id + '/', {
      headers: this.getHeaders(),
    });
  }

  /**
   * `PostSerie`: La funcion se encarga de enviar una solitud a la API y cargar un solo registro
   * relacionado a una serie. Para ello se debe enviar los datos correspondientes
   *
   * @param serie : `Serie` = Objeto de la clase `Serie` que contiene los datos para cargar el nuevo registro
   */
  public PostSerie(serie: Serie): Observable<any> {
    return this.http.post<any>(this.serieURL, serie, {
      headers: this.getHeaders(),
    });
  }

  /**
   * `UpdateSerie`: La funcion se encarga de enviar una solitud a la API y modificar un solo registro
   * relacionado a una serie. Para ello se debe enviar los datos correspondientes
   *
   * @param id : `number` = Id del registro
   * @param serie : `Serie` = Objeto de la clase `Serie` que contiene los datos que se quieren actualizar
   */
  public UpdateSerie(id: number, serie: Serie): Observable<any> {
    return this.http.put<any>(this.serieURL + id + '/', serie, {
      headers: this.getHeaders(),
    });
  }

  /**
   * `DeleteSerie`: La funcion se encarga de enviar una solitud a la API y eliminar un solo registro
   * relacionado a una serie. Para ello se debe enviar un `id` por parametro para poder realizarlo
   *
   * @param id : `number` = Id del registro
   */
  public DeleteSerie(id: number) {
    return this.http.delete<Serie>(this.serieURL + id + '/', {
      headers: this.getHeaders(),
    });
  }
}
