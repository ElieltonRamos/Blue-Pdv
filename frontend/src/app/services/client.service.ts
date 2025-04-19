import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Client from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private client: HttpClient) { }

  findClientById(id: number) {
    return this.client.get<Client>(`${this.apiUrl}/client/${id}`);
  }

  findClientByName(name: string) {
    return this.client.get<Client[]>(`${this.apiUrl}/client/search/${name}`);
  }
}
