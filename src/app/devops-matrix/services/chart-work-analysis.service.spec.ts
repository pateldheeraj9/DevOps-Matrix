import { TestBed } from '@angular/core/testing';

import { ChartWorkAnalysisService } from './services/chart-work-analysis.service';

describe('ChartWorkAnalysisService', () => {
  let service: ChartWorkAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartWorkAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
