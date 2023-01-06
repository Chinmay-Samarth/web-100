import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDatesComponent } from './transaction-dates.component';

describe('TransactionDatesComponent', () => {
  let component: TransactionDatesComponent;
  let fixture: ComponentFixture<TransactionDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
