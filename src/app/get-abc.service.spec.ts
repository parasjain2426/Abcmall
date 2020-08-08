import { TestBed } from '@angular/core/testing';

import { GetAbcService } from './get-abc.service';

describe('GetAbcService', () => {
  let service: GetAbcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAbcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
