import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullTransactionComponent } from './pull-transaction.component';

describe('PullTransactionComponent', () => {
  let component: PullTransactionComponent;
  let fixture: ComponentFixture<PullTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PullTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PullTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
