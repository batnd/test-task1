import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-remove-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './management-remove-dialog.component.html',
  styleUrls: ['./management-remove-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagementRemoveDialogComponent {
  @Output()
  public removeClientsEmit: EventEmitter<number[]> = new EventEmitter<number[]>();

  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  public showDialog: boolean = false;
  public clientsToRemove: number[] = [];

  public openDialog(clientsToRemove: number[]): void {
    this.showDialog = true;
    if (clientsToRemove.length > 0) {
      this.clientsToRemove = clientsToRemove;
    }
    this.cd.markForCheck();
  }

  public closeDialog(): void {
    this.clientsToRemove = [];
    this.showDialog = false;
  }

  public remove(): void {
    this.removeClientsEmit.emit(this.clientsToRemove);
    this.closeDialog();
  }
}
