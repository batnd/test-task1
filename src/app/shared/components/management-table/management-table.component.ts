import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from 'src/app/views/clients/models/client.model';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { Sort } from 'src/app/core/enums/sort.enum';

@Component({
  selector: 'app-management-table',
  standalone: true,
  imports: [CommonModule, OverlayscrollbarsModule],
  templateUrl: './management-table.component.html',
  styleUrls: ['./management-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagementTableComponent {
  protected readonly Sort = Sort;

  @Input('clients')
  public clientsProps: Client[] = [];

  @Output()
  public openDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public openDialogWithClient: EventEmitter<Client> = new EventEmitter<Client>();
  @Output()
  public openRemoveDialog: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output()
  public onSortClients: EventEmitter<Sort> = new EventEmitter<Sort>();

  public selectedClients: number[] = [];

  public sortClients(sortBy: Sort): void {
    this.onSortClients.emit(sortBy);
  }

  public addNewClient(): void {
    this.openDialog.emit(true);
  }

  public removeClients(): void {
    this.openRemoveDialog.emit(this.selectedClients);
    this.clearSelectedClients();
  }

  public editClient(client: Client): void {
    this.openDialogWithClient.emit(client);
  }

  public onClientsCheckboxChange(clientId: number | undefined, target: EventTarget | null): void {
    const input: HTMLInputElement = target as HTMLInputElement;
    if (input.checked && clientId) this.selectedClients.push(clientId);
    else this.selectedClients = this.selectedClients.filter((cId: number): boolean => cId !== clientId);
  }

  public onNameCheckboxChange(target: EventTarget | null): void {
    const input: HTMLInputElement = target as HTMLInputElement;
    if (input.checked) {
      this.selectedClients = this.clientsProps.map((client: Client) => client.id) as number[];
    } else {
      this.selectedClients = [];
    }
  }

  public clearSelectedClients(): void {
    this.selectedClients = [];
  }
}
