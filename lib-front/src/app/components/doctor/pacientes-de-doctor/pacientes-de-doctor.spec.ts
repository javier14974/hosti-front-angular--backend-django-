import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesDeDoctor } from './pacientes-de-doctor';

describe('PacientesDeDoctor', () => {
  let component: PacientesDeDoctor;
  let fixture: ComponentFixture<PacientesDeDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesDeDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesDeDoctor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
