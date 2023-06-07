import { TestBed } from '@angular/core/testing';

import { ChartVelocityService } from './services/chart-velocity.service';

describe('ChartVelocityService', () => {
  let service: ChartVelocityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartVelocityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
