import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementTableComponent } from 'src/app/shared/components/management-table/management-table.component';
import { Client } from 'src/app/views/clients/models/client.model';
import { Sort } from 'src/app/core/enums/sort.enum';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, ManagementTableComponent],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsListComponent {
  @Input('clients')
  public clientsProps: Client[] = [];

  @Output()
  public openDialogEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public openDialogWithClientEmit: EventEmitter<Client> = new EventEmitter<Client>();
  @Output()
  public openRemoveDialogEmit: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output()
  public onSortClientsEmit: EventEmitter<Sort> = new EventEmitter<Sort>();

  public openDialog(): void {
    this.openDialogEmit.emit(true);
  }

  public openDialogWithClient(client: Client): void {
    this.openDialogWithClientEmit.emit(client);
  }

  public openRemoveDialog(clientsToRemove: number[]): void {
    this.openRemoveDialogEmit.emit(clientsToRemove);
  }

  public sortClients(sortBy: Sort): void {
    this.onSortClientsEmit.emit(sortBy);
  }
}
