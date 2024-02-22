import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { clientsActions } from './clients.actions';
import { Observable } from 'rxjs';
import { Client } from 'src/app/views/clients/models/client.model';
import { selectClients } from './clients.selectors';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Sort } from 'src/app/core/enums/sort.enum';

@Injectable(
  { providedIn: 'root' }
)
export class ClientsFacade {
  private readonly store: Store = inject(Store);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  public clients$: Observable<Client[]> = this.store.select(selectClients);

  public loadClients(): void {
    const clientsExisting: Client[] | null = this.localStorageService.isClientsExistingInLocalStorage();
    if (clientsExisting) {
      this.store.dispatch(clientsActions.loadClientsSuccess({ clients: clientsExisting }));
    } else {
      this.store.dispatch(clientsActions.loadClients());
    }
  }

  public addClient(client: Client): void {
    this.store.dispatch(clientsActions.addClient({ client }));
  }

  public editClient(client: Client): void {
    this.store.dispatch(clientsActions.updateClient({ client }));
  }

  public removeClients(clientsToRemove: number[]): void {
    this.store.dispatch(clientsActions.removeClients({ clients: clientsToRemove }));
  }

  public sortClients(sortBy: Sort): void {
    this.store.dispatch(clientsActions.sortClients({ sortBy }));
  }
}
