import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Client } from 'src/app/views/clients/models/client.model';
import { Sort } from 'src/app/core/enums/sort.enum';

export const clientsActions = createActionGroup({
  source: 'Clients Page',
  events: {
    loadClients: emptyProps(),
    loadClientsSuccess: props<{ clients: Client[] }>(),
    loadClientsFailure: props<{ error: Error }>(),

    addClient: props<{ client: Client }>(),
    addClientSuccess: props<{ client: Client }>(),
    addClientFailure: props<{ error: string }>(),

    updateClient: props<{ client: Client }>(),

    removeClients: props<{ clients: number[] }>(),

    sortClients: props<{ sortBy: Sort }>()
  }
});
