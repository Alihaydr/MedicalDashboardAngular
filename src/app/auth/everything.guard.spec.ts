import { TestBed } from '@angular/core/testing';

import { EverythingGuard } from './everything.guard';

describe('EverythingGuard', () => {
  let guard: EverythingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EverythingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
