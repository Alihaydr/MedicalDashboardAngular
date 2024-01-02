import { TestBed } from '@angular/core/testing';

import { StocksupplierGuard } from './stocksupplier.guard';

describe('StocksupplierGuard', () => {
  let guard: StocksupplierGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StocksupplierGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
