import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPaciente } from './registrar-paciente';

describe('RegistrarPaciente', () => {
  let component: RegistrarPaciente;
  let fixture: ComponentFixture<RegistrarPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPaciente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
