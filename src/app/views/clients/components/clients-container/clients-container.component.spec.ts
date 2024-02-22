import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsContainerComponent } from './clients-container.component';

describe('ClientsContainerComponent', () => {
  let component: ClientsContainerComponent;
  let fixture: ComponentFixture<ClientsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientsContainerComponent]
    });
    fixture = TestBed.createComponent(ClientsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
