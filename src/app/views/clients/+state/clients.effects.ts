import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { clientsActions } from './clients.actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Client } from '../models/client.model';
import { Store } from '@ngrx/store';
import { selectClients } from './clients.selectors';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

export const loadClients$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    apiService: ApiService = inject(ApiService)
  ) => {
    return actions$.pipe(
      ofType(clientsActions.loadClients),
      switchMap(() => {
        return apiService.get<{ users: Client[] }>('/')
          .pipe(
            map(({ users }) => {
              const clientsWithId: Client[] = users.map((client: Client, index: number) => ({
                ...client,
                id: index + 1
              }));
              return clientsActions.loadClientsSuccess({ clients: clientsWithId });
            }),
            catchError((error) => {
              return of(clientsActions.loadClientsFailure({ error }));
            })
          );
      })
    );
  },
  { functional: true }
);

export const addClient$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    store: Store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(clientsActions.addClient),
      withLatestFrom(store.select(selectClients)),
      switchMap(([newClientToAdd, clientsList]) => {
        const newClientId: number = clientsList.reduce((max: number, client: Client) => Math.max(client.id || 0, max), 0) + 1;
        const newClient: Client = { ...newClientToAdd.client, id: newClientId };

        return of(clientsActions.addClientSuccess({ client: newClient }));
      })
    );
  },
  { functional: true }
);

export const saveClientsToLocalStorage$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    localStorageService: LocalStorageService = inject(LocalStorageService)
  ) => {
    return actions$.pipe(
      ofType(clientsActions.loadClientsSuccess),
      tap(({ clients }): void => {
        localStorageService.saveToLocalStorage<Client[]>('clients', clients);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const addClientToLocalStorage$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    localStorageService: LocalStorageService = inject(LocalStorageService)
  ) => {
    return actions$.pipe(
      ofType(clientsActions.addClientSuccess),
      tap(({ client }): void => {
        localStorageService.addClientToLocalStorage<Client>('clients', client);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const updateClientsToLocalStorage$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    localStorageService: LocalStorageService = inject(LocalStorageService)
  ) => {
    return actions$.pipe(
      ofType(clientsActions.updateClient),
      tap(({ client }): void => {
        localStorageService.updateClientInLocalStorage('clients', client);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const removeClientsFromLocalStorage$: FunctionalEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    localStorageService: LocalStorageService = inject(LocalStorageService)
  ) => {
    return actions$.pipe(
      ofType(clientsActions.removeClients),
      tap(({ clients }): void => {
        localStorageService.removeClients('clients', clients);
      })
    );
  },
  { functional: true, dispatch: false }
);
