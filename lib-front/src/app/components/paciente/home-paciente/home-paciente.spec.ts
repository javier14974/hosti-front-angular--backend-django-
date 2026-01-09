import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePaciente } from './home-paciente';

describe('HomePaciente', () => {
  let component: HomePaciente;
  let fixture: ComponentFixture<HomePaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePaciente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
