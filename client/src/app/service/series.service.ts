import { Injectable } from '@angular/core';
import { Serie } from '../model/series';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  serieURL = 'http://localhost:8000/api/series/';

  constructor(private http: HttpClient) {}

  public ListSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.serieURL);
  }

  /**
   * GetSerie
   */
  public GetSerie(id: number): Observable<Serie> {
    return this.http.get<Serie>(this.serieURL + id + '/');
  }

  /**
   * PostSerie
   */
  public PostSerie(serie: Serie): Observable<any> {
    return this.http.post<any>(this.serieURL, serie);
  }

  /**
   * UpdateSerie
   */
  public UpdateSerie(id: number, serie: Serie): Observable<any> {
    return this.http.put<any>(this.serieURL + id + '/', serie);
  }

  /**
   * DeleteSerie
   */
  public DeleteSerie(id: number) {
    return this.http.delete<Serie>(this.serieURL + id + '/');
  }
}
