import { TestBed } from '@angular/core/testing';

import { ViewLoanService } from './view-loan.service';

describe('ViewLoanService', () => {
  let service: ViewLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
