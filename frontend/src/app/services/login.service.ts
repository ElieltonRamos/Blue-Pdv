import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../interfaces/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'localhost:3000/api';

  constructor(private client: HttpClient) { }

  login(username: string, password: string) {
    // return this.client.post<Token>(`${this.apiUrl}/login`, { username, password });
    return of({ token: 'asdf', username, password });
  }
}
