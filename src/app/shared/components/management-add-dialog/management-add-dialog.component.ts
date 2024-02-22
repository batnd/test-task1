import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Client } from 'src/app/views/clients/models/client.model';

@Component({
  selector: 'app-management-add-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './management-add-dialog.component.html',
  styleUrls: ['./management-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagementAddDialogComponent {
  @Output()
  public addNewClient: EventEmitter<Client> = new EventEmitter<Client>();
  @Output()
  public editClient: EventEmitter<Client> = new EventEmitter<Client>();

  private fb: FormBuilder = inject(FormBuilder);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  public showDialog: boolean = false;
  public formGroup: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    surname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.pattern(/^\+(7|8)\d{10}$/)]
  });
  public editMode: boolean = false;
  private userToEditId: number | null = null;

  get name() {
    return this.formGroup.get('name');
  }

  get surname() {
    return this.formGroup.get('surname');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get phone() {
    return this.formGroup.get('phone');
  }

  public closeDialog(): void {
    this.showDialog = false;
    this.clearForm();
  }

  public openDialog(): void {
    this.editMode = false;
    this.showDialog = true;
    this.cd.markForCheck();
  }

  public openDialogForEdit(clientToEdit: Client): void {
    this.editMode = true;
    this.showDialog = true;
    this.formGroup.setValue({
      name: clientToEdit.name,
      surname: clientToEdit.surname,
      email: clientToEdit.email,
      phone: clientToEdit.phone
    });
    if (clientToEdit.id) {
      this.userToEditId = clientToEdit.id;
    }
    this.cd.markForCheck();
  }

  public save(): void {
    if (this.formGroup.valid && !this.editMode) {
      this.addNewClient.emit(this.formGroup.value);
    }
    if (this.formGroup.valid && this.editMode) {
      this.editClient.emit({
        ...this.formGroup.value,
        id: this.userToEditId
      });
      this.userToEditId = null;
    }
  }

  public clearForm(): void {
    this.formGroup.reset();
  }
}
