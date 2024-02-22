import { Client } from 'src/app/views/clients/models/client.model';
import { LoadingStatus } from 'src/app/core/types/loading-status.type';
import { createFeature, createReducer, on } from '@ngrx/store';
import { clientsActions } from './clients.actions';
import { AddingStatus } from 'src/app/core/types/adding-status.type';
import { SortOrder } from 'src/app/core/types/sort-order.type';

export const CLIENTS_FEATURE_KEY = 'clients';

export interface ClientsFeatureState {
  clients: Client[]
  status: LoadingStatus,
  statusError: string | null
  addingClient: AddingStatus,
  addingClientError: string | null,
  sortOrder: {
    name: SortOrder,
    surname: SortOrder,
    email: SortOrder
  },
  lastSortedBy: string | null
}

export const initialState: ClientsFeatureState = {
  clients: [],
  status: 'init',
  statusError: null,
  addingClient: 'init',
  addingClientError: null,
  sortOrder: {
    name: 'asc',
    surname: 'asc',
    email: 'asc'
  },
  lastSortedBy: null
};

export const clientsFeature = createFeature({
  name: CLIENTS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(clientsActions.loadClients, (state: ClientsFeatureState) => ({
      ...state,
      status: 'loading' as LoadingStatus,
      statusError: null
    })),
    on(clientsActions.loadClientsSuccess, (state: ClientsFeatureState, { clients }) => ({
      ...state,
      clients: clients,
      status: 'loaded' as LoadingStatus
    })),
    on(clientsActions.loadClientsFailure, (state: ClientsFeatureState, { error }) => ({
      ...state,
      status: 'error' as LoadingStatus,
      statusError: error.message
    })),

    on(clientsActions.addClient, (state: ClientsFeatureState, { client }) => ({
      ...state,
      addingClient: 'inProgress' as AddingStatus,
      addingClientError: null
    })),
    on(clientsActions.addClientSuccess, (state: ClientsFeatureState, { client }) => ({
      ...state,
      clients: [...state.clients, client],
      addingClient: 'ok' as AddingStatus
    })),
    on(clientsActions.addClientFailure, (state: ClientsFeatureState, { error }) => ({
      ...state,
      addingClient: 'error' as AddingStatus,
      addingClientError: error
    })),

    on(clientsActions.updateClient, (state: ClientsFeatureState, { client }) => ({
      ...state,
      clients: state.clients.map((c: Client) => c.id === client.id ? { ...c, ...client } : c)
    })),

    on(clientsActions.removeClients, (state: ClientsFeatureState, { clients }) => ({
      ...state,
      clients: state.clients.filter((client: Client) => !clients.includes(client.id))
    })),

    on(clientsActions.sortClients, (state: ClientsFeatureState, { sortBy }) => {
      const isAsc: boolean = state.lastSortedBy !== sortBy || state.sortOrder[sortBy] === 'desc';
      const sortOrder: SortOrder = isAsc ? 'asc' : 'desc';

      const sortedClients: Client[] = [...state.clients].sort((a: Client, b: Client) => {
        const comparison: number = a[sortBy].localeCompare(b[sortBy]);
        return sortOrder === 'asc' ? comparison : -comparison;
      });

      return {
        ...state,
        clients: sortedClients,
        sortOrder: {
          ...state.sortOrder,
          [sortBy]: sortOrder
        },
        lastSortedBy: sortBy
      };
    })
  )
});
