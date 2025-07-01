import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Client from '../interfaces/client';
import { PaginatedResponse } from '../interfaces/paginator';

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

  getClients(page: number, limit: number) {
    const params = { page: page.toString(), limit: limit.toString() };
    return this.client.get<PaginatedResponse<Client>>(`${this.apiUrl}/client`, { params });
  }

  createClient(client: Client) {
    return this.client.post<Client>(`${this.apiUrl}/client`, client);
  }

  deleteClient(id: number) {
    return this.client.delete(`${this.apiUrl}/client/${id}`);
  }
}
