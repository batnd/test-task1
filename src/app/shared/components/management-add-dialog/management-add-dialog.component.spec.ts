import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAddDialogComponent } from './management-add-dialog.component';

describe('ManagementAddDialogComponent', () => {
  let component: ManagementAddDialogComponent;
  let fixture: ComponentFixture<ManagementAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManagementAddDialogComponent]
    });
    fixture = TestBed.createComponent(ManagementAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
