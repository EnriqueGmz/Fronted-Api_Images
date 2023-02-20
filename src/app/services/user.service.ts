import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URI: string = 'http://localhost:4000/api/v1/auth';

  constructor(private http: HttpClient) {}

  register(body: string): Observable<any> {
    return this.http.post(this.URI + '/register', body, {
      observe: 'response',
      headers: { 'content-type': 'application/json' },
    });
  }

  login(body: string): Observable<any> {
    return this.http.post(this.URI + '/login', body, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true,
    });
  }

  refresh(): Observable<any> {
    return this.http.post(this.URI + '/refresh', {}, { withCredentials: true });
  }

  sesion(): Observable<any> {
    return this.http.get(this.URI + '/protected', {
      headers: { 'content-type': 'aplication/json' },
    });
  }
}
