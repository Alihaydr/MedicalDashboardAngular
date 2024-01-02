import { TestBed } from '@angular/core/testing';

import { StockreceiverGuard } from './stockreceiver.guard';

describe('StockreceiverGuard', () => {
  let guard: StockreceiverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StockreceiverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
