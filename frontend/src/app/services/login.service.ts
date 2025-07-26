import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User, { Token } from '../interfaces/user';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.apiUrl;

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

  getUsers() {
    return this.client.get<User[]>(`${this.apiUrl}/user`);
  }

  editUser(id: number, user:User) {
    return this.client.put<User>(`${this.apiUrl}/user/edit/${id}`, user)
  }

  deleteUser(id: number) {
    return this.client.delete<User>(`${this.apiUrl}/user/delete/${id}`);
  }

}
