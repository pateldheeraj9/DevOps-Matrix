import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberRemarksComponent } from './team-member-remarks.component';

describe('TeamMemberRemarksComponent', () => {
  let component: TeamMemberRemarksComponent;
  let fixture: ComponentFixture<TeamMemberRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMemberRemarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamMemberRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
