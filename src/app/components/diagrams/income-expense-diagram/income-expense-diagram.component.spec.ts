import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseDiagramComponent } from './income-expense-diagram.component';

describe('IncomeExpenseDiagramComponent', () => {
  let component: IncomeExpenseDiagramComponent;
  let fixture: ComponentFixture<IncomeExpenseDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeExpenseDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpenseDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
