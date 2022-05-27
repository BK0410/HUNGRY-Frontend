import { TestBed } from '@angular/core/testing';

import { TokenIncterceptorService } from './token-incterceptor.service';

describe('TokenIncterceptorService', () => {
  let service: TokenIncterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenIncterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
