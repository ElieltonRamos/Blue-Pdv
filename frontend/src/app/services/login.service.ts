import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User, { Token } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private client: HttpClient) {}

  login(username: string, password: string) {
    return this.client.post<Token>(`${this.apiUrl}/user/login`, {
      username,
      password,
    });
  }

  createUser(user: User) {
    return this.client.post<User>(`${this.apiUrl}/user/create`, user);
  }
}
