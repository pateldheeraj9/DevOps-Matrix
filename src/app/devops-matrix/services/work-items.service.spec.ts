import { TestBed } from '@angular/core/testing';

import { WorkItemsService } from './services/work-items.service';

describe('WorkItemsService', () => {
  let service: WorkItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
