import { TestBed } from '@angular/core/testing';

import { TeamMemberDetailsService } from './team-member-details.service';

describe('TeamMemberDetailsService', () => {
  let service: TeamMemberDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMemberDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
