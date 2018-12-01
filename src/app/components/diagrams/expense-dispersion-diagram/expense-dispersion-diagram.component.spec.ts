import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDispersionDiagramComponent } from './expense-dispersion-diagram.component';

describe('ExpenseDispersionDiagramComponent', () => {
  let component: ExpenseDispersionDiagramComponent;
  let fixture: ComponentFixture<ExpenseDispersionDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseDispersionDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseDispersionDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
