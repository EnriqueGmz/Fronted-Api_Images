import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URI: string = 'http://localhost:4000/api/v1/auth';\

  constructor(private http: HttpClient) {}

}
