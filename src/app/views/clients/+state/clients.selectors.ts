import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CLIENTS_FEATURE_KEY, ClientsFeatureState } from './clients.reducer';

export const selectClientsState = createFeatureSelector<ClientsFeatureState>(CLIENTS_FEATURE_KEY);

export const selectClients = createSelector(
  selectClientsState,
  (state: ClientsFeatureState) => state.clients
);
