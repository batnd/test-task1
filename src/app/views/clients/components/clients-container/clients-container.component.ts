import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsListComponent } from 'src/app/views/clients/components/clients-list/clients-list.component';
import {
  ManagementAddDialogComponent
} from 'src/app/shared/components/management-add-dialog/management-add-dialog.component';
import { ClientsFacade } from '../../+state/clients.facade';
import { Observable } from 'rxjs';
import { Client } from 'src/app/views/clients/models/client.model';
import {
  ManagementRemoveDialogComponent
} from 'src/app/shared/components/management-remove-dialog/management-remove-dialog.component';
import { Sort } from 'src/app/core/enums/sort.enum';

@Component({
  selector: 'app-clients-container',
  standalone: true,
  imports: [CommonModule, ClientsListComponent, ManagementAddDialogComponent, ManagementRemoveDialogComponent],
  templateUrl: './clients-container.component.html',
  styleUrls: ['./clients-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsContainerComponent implements OnInit {
  @ViewChild(ManagementAddDialogComponent, { static: true })
  public modalDialog!: ManagementAddDialogComponent;
  @ViewChild(ManagementRemoveDialogComponent, { static: true })
  public modalRemoveDialog!: ManagementRemoveDialogComponent;

  private readonly clientsFacade: ClientsFacade = inject(ClientsFacade);

  public clients$: Observable<Client[]> = this.clientsFacade.clients$;

  ngOnInit(): void {
    this.clientsFacade.loadClients();
  }

  public openDialog(): void {
    this.modalDialog.openDialog();
  }

  public openDialogForEdit(client: Client): void {
    this.modalDialog.openDialogForEdit(client);
  }

  public addNewClient(client: Client): void {
    this.clientsFacade.addClient(client);
    this.modalDialog.closeDialog();
    this.modalDialog.clearForm();
  }

  public editClient(client: Client): void {
    this.clientsFacade.editClient(client);
    this.modalDialog.closeDialog();
    this.modalDialog.clearForm();
  }

  public openRemoveDialog(clientsToRemove: number[]): void {
    this.modalRemoveDialog.openDialog(clientsToRemove);
  }

  public removeClients(clientsToRemove: number[]): void {
    this.clientsFacade.removeClients(clientsToRemove);
  }

  public sortClients(sortBy: Sort): void {
    this.clientsFacade.sortClients(sortBy);
  }
}
