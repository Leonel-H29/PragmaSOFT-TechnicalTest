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

  public Login(loginUser: any): Observable<any> {
    return this.http.post<any>(this.authURL + 'login/', loginUser);
  }
}
