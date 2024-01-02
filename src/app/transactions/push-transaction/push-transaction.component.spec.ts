import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushTransactionComponent } from './push-transaction.component';

describe('PushTransactionComponent', () => {
  let component: PushTransactionComponent;
  let fixture: ComponentFixture<PushTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
