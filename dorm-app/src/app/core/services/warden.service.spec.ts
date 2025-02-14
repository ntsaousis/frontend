import { TestBed } from '@angular/core/testing';

import { WardenService } from './warden.service';

describe('WardenService', () => {
  let service: WardenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WardenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
