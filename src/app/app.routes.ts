import { Routes } from '@angular/router';
import { ClientsContainerComponent } from './views/clients/components/clients-container/clients-container.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full'
  },
  {
    path: 'clients',
    component: ClientsContainerComponent
  }
];
