import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementRemoveDialogComponent } from './management-remove-dialog.component';

describe('ManagementRemoveDialogComponent', () => {
  let component: ManagementRemoveDialogComponent;
  let fixture: ComponentFixture<ManagementRemoveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManagementRemoveDialogComponent]
    });
    fixture = TestBed.createComponent(ManagementRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
