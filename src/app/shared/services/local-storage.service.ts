import { Injectable } from '@angular/core';
import { Client } from 'src/app/views/clients/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public saveToLocalStorage<T>(field: string, value: T): void {
    localStorage.setItem(field, JSON.stringify(value));
  }

  public addClientToLocalStorage<T>(field: string, value: T): void {
    const currentItemInLocalStorage = JSON.parse(localStorage.getItem(field) || '[]');
    currentItemInLocalStorage.push(value);

    this.saveToLocalStorage(field, currentItemInLocalStorage);
  }

  public updateClientInLocalStorage(field: string, client: Client): void {
    const clientsFromLocalStorage: string | null = localStorage.getItem(field);
    let clients: Client[] = clientsFromLocalStorage ? JSON.parse(clientsFromLocalStorage) : [];

    const updatedClients: Client[] = clients.map((c: Client) => c.id === client.id ? { ...c, ...client } : c);
    this.saveToLocalStorage(field, updatedClients);
  }

  public removeClients(field: string, clientsToRemove: number[]): void {
    const clientsFromLocalStorage: string | null = localStorage.getItem(field);
    let clients: Client[] = clientsFromLocalStorage ? JSON.parse(clientsFromLocalStorage) : [];

    const updatedClients: Client[] = clients.filter((c: Client) => !clientsToRemove.includes(c.id));
    this.saveToLocalStorage(field, updatedClients);
  }

  public isClientsExistingInLocalStorage(): Client[] | null {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    if (clients.length > 0) return clients;
    else return null;
  }
}
