import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonTransactionComponent } from './update-person-transaction.component';

describe('UpdatePersonTransactionComponent', () => {
  let component: UpdatePersonTransactionComponent;
  let fixture: ComponentFixture<UpdatePersonTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePersonTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePersonTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
